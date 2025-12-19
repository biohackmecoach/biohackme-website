"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPDF = exports.getPaymentStatus = exports.handlePaymentSuccess = exports.createCheckoutSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const email_sender_1 = require("./email-sender");
// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp();
}
// Initialize Stripe lazily to avoid deployment issues
let stripe = null;
const getStripe = () => {
    if (!stripe) {
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
};
// Create a checkout session for masterclass payment
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be authenticated to create a payment session.");
    }
    const { priceId, mode = 'payment', userId, userEmail, productType } = data;
    if (!priceId) {
        throw new functions.https.HttpsError("invalid-argument", "Price ID is required.");
    }
    try {
        const sessionConfig = {
            payment_method_types: ['card'],
            mode: mode,
            success_url: `${data.successUrl || 'https://biohackme.com.au/payment-success'}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: data.cancelUrl || 'https://biohackme.com.au/payment-cancelled',
            customer_email: userEmail || context.auth.token.email,
            billing_address_collection: 'required',
            automatic_tax: {
                enabled: true // Enable automatic tax calculation
            },
            metadata: {
                userId: userId || context.auth.uid,
                productType: productType || 'masterclass'
            }
        };
        if (mode === 'payment') {
            sessionConfig.line_items = [{
                    price: priceId,
                    quantity: 1,
                }];
        }
        else if (mode === 'subscription') {
            sessionConfig.line_items = [{
                    price: priceId,
                    quantity: 1,
                }];
        }
        const session = await getStripe().checkout.sessions.create(sessionConfig);
        // Store session info in Firestore for tracking
        await admin.firestore().collection('payments').doc(session.id).set({
            sessionId: session.id,
            userId: userId || context.auth.uid,
            userEmail: userEmail || context.auth.token.email,
            priceId: priceId,
            productType: productType || 'masterclass',
            status: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return {
            sessionId: session.id,
            url: session.url,
        };
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        throw new functions.https.HttpsError("internal", "Failed to create checkout session");
    }
});
/**
 * IMPROVED WEBHOOK HANDLER
 * This version sends immediate emails with download links
 * No reliance on Mailchimp automation delays
 */
exports.handlePaymentSuccess = functions.https.onRequest(async (req, res) => {
    var _a, _b, _c;
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // Log webhook received
    console.log('✅ Webhook received at:', new Date().toISOString());
    let event;
    try {
        event = getStripe().webhooks.constructEvent(req.rawBody, sig, webhookSecret);
        console.log('✅ Webhook signature verified');
    }
    catch (err) {
        console.error('❌ Webhook signature verification failed:', err);
        res.status(400).send(`Webhook signature verification failed: ${err}`);
        return;
    }
    // Log webhook event
    await admin.firestore().collection('webhook_logs').add({
        eventType: event.type,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        sessionId: event.data.object.id || null,
        status: 'received'
    });
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('💳 Processing payment for session:', session.id);
        try {
            console.log('🔍 Step 1: Getting customer email...');
            // Get customer email from session
            const customerEmail = session.customer_email || ((_a = session.customer_details) === null || _a === void 0 ? void 0 : _a.email);
            if (!customerEmail) {
                console.error('❌ No customer email found in session');
                res.status(400).send('No customer email');
                return;
            }
            console.log('✅ Customer email found:', customerEmail);
            console.log('🔍 Step 2: Creating user in Firestore...');
            // Step 1: Create or update user in Firestore
            const userRef = admin.firestore().collection('users').doc();
            const userId = userRef.id;
            await userRef.set({
                email: customerEmail,
                stripeCustomerId: session.customer,
                access: {
                    masterclass: true,
                    masterclassDate: admin.firestore.FieldValue.serverTimestamp()
                },
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            console.log('✅ User created in Firestore:', userId);
            // Step 2: Create payment record
            await admin.firestore().collection('payments').doc(session.id).set({
                sessionId: session.id,
                userId: userId,
                userEmail: customerEmail,
                stripeCustomerId: session.customer,
                paymentIntentId: session.payment_intent,
                amountPaid: session.amount_total,
                currency: session.currency,
                productType: 'masterclass',
                status: 'completed',
                completedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Payment recorded');
            // Step 3: Add to Mailchimp with tags
            try {
                const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
                const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
                const DATACENTER = MAILCHIMP_API_KEY === null || MAILCHIMP_API_KEY === void 0 ? void 0 : MAILCHIMP_API_KEY.split('-')[1];
                if (MAILCHIMP_API_KEY && AUDIENCE_ID) {
                    const emailHash = require('crypto').createHash('md5').update(customerEmail.toLowerCase()).digest('hex');
                    // Step 3a: Create/update member
                    const memberUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`;
                    console.log('📧 Step 3a: Creating/updating Mailchimp member');
                    const memberResponse = await fetch(memberUrl, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email_address: customerEmail,
                            status_if_new: 'subscribed',
                            status: 'subscribed'
                        }),
                    });
                    if (!memberResponse.ok) {
                        const errorText = await memberResponse.text();
                        console.error('❌ Mailchimp member creation failed:', memberResponse.status, errorText);
                    }
                    else {
                        console.log('✅ Mailchimp member created/updated');
                        // Step 3b: Add tags (separate API call required)
                        const tagsUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}/tags`;
                        console.log('📧 Step 3b: Adding tags to Mailchimp member');
                        const tagsResponse = await fetch(tagsUrl, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tags: [
                                    { name: 'masterclass-customer', status: 'active' },
                                    { name: 'paid-customer', status: 'active' },
                                    { name: 'high-value-customer', status: 'active' }
                                ]
                            }),
                        });
                        if (!tagsResponse.ok) {
                            const errorText = await tagsResponse.text();
                            console.error('❌ Mailchimp tags failed:', tagsResponse.status, errorText);
                        }
                        else {
                            console.log('✅ Mailchimp tags applied successfully');
                        }
                    }
                }
                else {
                    console.log('⚠️  Mailchimp credentials not configured');
                }
            }
            catch (mailchimpError) {
                console.error('⚠️  Mailchimp error (non-critical):', mailchimpError);
            }
            // Step 4: Generate PDF access token
            const pdfToken = await (0, email_sender_1.createPDFAccessToken)(customerEmail, 'masterclass');
            const pdfDownloadLink = (0, email_sender_1.generatePDFDownloadLink)(pdfToken);
            console.log('✅ PDF access token generated:', pdfToken);
            // Step 5: Send immediate welcome email with download links
            const accessLink = `https://biohackme.com.au/masterclass-access?email=${encodeURIComponent(customerEmail)}`;
            const loginInstructions = `Your masterclass is accessible at any time using this email: ${customerEmail}. Simply visit the access link above and you'll be automatically logged in.`;
            const emailSent = await (0, email_sender_1.sendMasterclassWelcomeEmail)({
                email: customerEmail,
                firstName: (_c = (_b = session.customer_details) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.split(' ')[0],
                accessLink: accessLink,
                pdfDownloadLink: pdfDownloadLink,
                loginInstructions: loginInstructions
            });
            if (emailSent) {
                console.log('✅ Welcome email sent successfully');
            }
            else {
                console.error('⚠️  Email sending failed (will rely on Mailchimp automation)');
            }
            // Step 6: Log successful processing
            await admin.firestore().collection('webhook_logs').add({
                eventType: event.type,
                sessionId: session.id,
                customerEmail: customerEmail,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                status: 'processed_successfully',
                emailSent: emailSent,
                accessGranted: true
            });
            console.log('✅ Webhook processing complete for:', customerEmail);
            res.json({
                received: true,
                processed: true,
                email_sent: emailSent
            });
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorStack = error instanceof Error ? error.stack : '';
            console.error('❌ Error processing payment completion:', errorMessage);
            console.error('❌ Error stack:', errorStack);
            // Log detailed error
            await admin.firestore().collection('webhook_logs').add({
                eventType: event.type,
                sessionId: session.id,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                status: 'error',
                error: errorMessage,
                errorStack: errorStack
            });
            res.status(500).json({
                error: 'Processing failed',
                message: errorMessage,
                details: process.env.NODE_ENV === 'development' ? errorStack : 'Check logs'
            });
            return;
        }
    }
    res.json({ received: true });
    return;
});
// Get payment status
exports.getPaymentStatus = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
    }
    const { sessionId } = data;
    if (!sessionId) {
        throw new functions.https.HttpsError("invalid-argument", "Session ID is required.");
    }
    try {
        const paymentDoc = await admin.firestore().collection('payments').doc(sessionId).get();
        if (!paymentDoc.exists) {
            throw new functions.https.HttpsError("not-found", "Payment session not found.");
        }
        const paymentData = paymentDoc.data();
        // Only return payment data if it belongs to the requesting user
        if ((paymentData === null || paymentData === void 0 ? void 0 : paymentData.userId) !== context.auth.uid) {
            throw new functions.https.HttpsError("permission-denied", "Access denied.");
        }
        return {
            status: paymentData.status,
            productType: paymentData.productType,
            createdAt: paymentData.createdAt,
            completedAt: paymentData.completedAt || null,
        };
    }
    catch (error) {
        console.error("Error getting payment status:", error);
        throw new functions.https.HttpsError("internal", "Failed to get payment status");
    }
});
/**
 * Download handler for PDF resources
 * Validates token and serves PDF
 */
exports.downloadPDF = functions.https.onRequest(async (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(400).send('Token required');
        return;
    }
    try {
        // Verify token
        const tokenQuery = await admin.firestore()
            .collection('download_tokens')
            .where('token', '==', token)
            .where('used', '==', false)
            .limit(1)
            .get();
        if (tokenQuery.empty) {
            res.status(404).send('Invalid or expired token');
            return;
        }
        const tokenDoc = tokenQuery.docs[0];
        const tokenData = tokenDoc.data();
        // Check expiry if set
        if (tokenData.expiresAt && tokenData.expiresAt.toDate() < new Date()) {
            res.status(410).send('Token expired');
            return;
        }
        // Mark token as used (optional - remove if you want reusable links)
        // await tokenDoc.ref.update({ used: true });
        // Redirect to PDF in Firebase Storage or serve directly
        const pdfPath = 'masterclass-resources/biohacking-basics-guide.pdf';
        const bucket = admin.storage().bucket();
        const file = bucket.file(pdfPath);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 3600000, // 1 hour
        });
        res.redirect(url);
    }
    catch (error) {
        console.error('Error processing download:', error);
        res.status(500).send('Download failed');
    }
});
//# sourceMappingURL=stripe.js.map
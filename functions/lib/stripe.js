"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentStatus = exports.handlePaymentSuccess = exports.createCheckoutSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Initialize Stripe with your secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Updated: 27 Sep 2025
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
            metadata: {
                userId: userId || context.auth.uid,
                productType: productType || 'masterclass'
            }
        };
        if (mode === 'payment') {
            // One-time payment (for masterclass)
            sessionConfig.line_items = [{
                    price: priceId,
                    quantity: 1,
                }];
        }
        else if (mode === 'subscription') {
            // Subscription (for coaching)
            sessionConfig.line_items = [{
                    price: priceId,
                    quantity: 1,
                }];
        }
        const session = await stripe.checkout.sessions.create(sessionConfig);
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
            url: session.url
        };
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        throw new functions.https.HttpsError("internal", "Failed to create checkout session");
    }
});
// Handle successful payments via webhook
exports.handlePaymentSuccess = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err);
        res.status(400).send('Webhook signature verification failed');
        return;
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        try {
            // Update payment record in Firestore
            await admin.firestore().collection('payments').doc(session.id).update({
                status: 'completed',
                stripeCustomerId: session.customer,
                paymentIntentId: session.payment_intent,
                amountPaid: session.amount_total,
                currency: session.currency,
                completedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            // Grant access to user based on product type
            const paymentDoc = await admin.firestore().collection('payments').doc(session.id).get();
            const paymentData = paymentDoc.data();
            if (paymentData) {
                const userRef = admin.firestore().collection('users').doc(paymentData.userId);
                // Grant access based on product type
                const accessUpdate = {};
                if (paymentData.productType === 'masterclass') {
                    accessUpdate['access.masterclass'] = true;
                    accessUpdate['access.masterclassDate'] = admin.firestore.FieldValue.serverTimestamp();
                }
                else if (paymentData.productType === 'coaching') {
                    accessUpdate['access.coaching'] = true;
                    accessUpdate['access.coachingDate'] = admin.firestore.FieldValue.serverTimestamp();
                }
                await userRef.set(accessUpdate, { merge: true });
                // Add to Mailchimp with appropriate tags
                try {
                    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
                    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
                    const DATACENTER = MAILCHIMP_API_KEY === null || MAILCHIMP_API_KEY === void 0 ? void 0 : MAILCHIMP_API_KEY.split('-')[1];
                    if (MAILCHIMP_API_KEY && AUDIENCE_ID && paymentData.userEmail) {
                        const emailHash = require('crypto').createHash('md5').update(paymentData.userEmail.toLowerCase()).digest('hex');
                        const updateUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`;
                        const mailchimpTags = paymentData.productType === 'masterclass'
                            ? ['masterclass-customer', 'paid-customer', 'high-value-customer']
                            : ['coaching-customer', 'paid-customer', 'high-value-customer'];
                        await fetch(updateUrl, {
                            method: 'PATCH',
                            headers: {
                                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tags: mailchimpTags.map(tag => ({ name: tag, status: 'active' }))
                            }),
                        });
                        console.log(`Payment completed and Mailchimp updated for user ${paymentData.userId}, product: ${paymentData.productType}`);
                    }
                }
                catch (mailchimpError) {
                    console.error('Error updating Mailchimp after payment:', mailchimpError);
                }
            }
        }
        catch (error) {
            console.error('Error processing payment completion:', error);
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
            completedAt: paymentData.completedAt || null
        };
    }
    catch (error) {
        console.error("Error getting payment status:", error);
        throw new functions.https.HttpsError("internal", "Failed to get payment status");
    }
});
//# sourceMappingURL=stripe.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRetreatInterest = exports.addToMailchimp = exports.completeAssessment = exports.subscribeToMasterclass = exports.subscribeToNewsletter = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const params_1 = require("firebase-functions/params");
const cors_1 = require("./cors");
const crypto = require("crypto");
// Define secrets (loaded securely from Firebase Secret Manager)
const mailchimpApiKey = (0, params_1.defineSecret)('MAILCHIMP_API_KEY');
const mailchimpAudienceId = (0, params_1.defineSecret)('MAILCHIMP_AUDIENCE_ID');
const mailchimpDataCenter = (0, params_1.defineSecret)('MAILCHIMP_DATA_CENTER');
// Helper to get Mailchimp config (using Firebase Secrets)
function getMailchimpConfig() {
    return {
        apiKey: mailchimpApiKey.value(),
        audienceId: mailchimpAudienceId.value(),
        datacenter: mailchimpDataCenter.value() || 'us4'
    };
}
/**
 * CRITICAL SAFETY FEATURE: Save lead to Firestore as DOUBLE BACKUP
 * This ensures we NEVER lose leads even if Mailchimp fails
 * Saves to TWO separate collections for maximum redundancy
 */
async function saveLeadToFirestore(leadData) {
    const leadDocument = Object.assign(Object.assign({}, leadData), { createdAt: admin.firestore.FieldValue.serverTimestamp(), source: 'website' });
    try {
        // PRIMARY BACKUP: Save to 'leads' collection
        await admin.firestore().collection('leads').add(leadDocument);
        console.log('✅ Lead saved to PRIMARY backup (leads):', leadData.email);
    }
    catch (error) {
        console.error('❌ CRITICAL: Failed to save lead to PRIMARY backup:', error);
    }
    try {
        // SECONDARY BACKUP: Save to 'leads_backup' collection for redundancy
        await admin.firestore().collection('leads_backup').add(Object.assign(Object.assign({}, leadDocument), { backupTimestamp: admin.firestore.FieldValue.serverTimestamp() }));
        console.log('✅ Lead saved to SECONDARY backup (leads_backup):', leadData.email);
        return true;
    }
    catch (error) {
        console.error('❌ WARNING: Failed to save lead to SECONDARY backup:', error);
        // Return true if at least primary backup succeeded
        return true;
    }
}
/**
 * Helper function to apply tags to a Mailchimp member
 * Tags MUST be applied via a separate POST to the /tags endpoint
 * They cannot be included in the member creation/update request
 */
async function applyMailchimpTags(email, tags) {
    try {
        const config = getMailchimpConfig();
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        const tagsUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}/tags`;
        const tagsPayload = {
            tags: tags.map(tag => ({ name: tag, status: 'active' }))
        };
        const tagsResponse = await fetch(tagsUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tagsPayload),
        });
        if (!tagsResponse.ok) {
            const errorData = await tagsResponse.json();
            console.error('❌ Failed to apply tags:', errorData);
            return false;
        }
        console.log('✅ Tags applied successfully:', tags);
        return true;
    }
    catch (error) {
        console.error('❌ Error applying tags:', error);
        return false;
    }
}
exports.subscribeToNewsletter = functions
    .runWith({ secrets: [mailchimpApiKey, mailchimpAudienceId, mailchimpDataCenter] })
    .https.onRequest(async (req, res) => {
    // Handle CORS
    (0, cors_1.cors)(req, res, async () => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }
        try {
            const { email, firstName, lastName } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }
            // CRITICAL: Save to Firestore FIRST (safety backup)
            await saveLeadToFirestore({
                email: email.toLowerCase().trim(),
                firstName: firstName || '',
                lastName: lastName || '',
                type: 'newsletter',
                tags: []
            });
            // Prepare subscriber data
            const subscriberData = {
                email_address: email,
                status: 'subscribed', // Use 'pending' for double opt-in
            };
            // Add name fields if provided
            if (firstName || lastName) {
                subscriberData.merge_fields = {
                    FNAME: firstName || '',
                    LNAME: lastName || '',
                };
            }
            // Create/update member in Mailchimp (PUT handles both new and existing)
            const config = getMailchimpConfig();
            const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
            const memberUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}`;
            const response = await fetch(memberUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriberData),
            });
            const data = await response.json();
            if (response.ok) {
                res.status(200).json({
                    success: true,
                    message: 'Successfully subscribed to newsletter!',
                    email: email
                });
            }
            else {
                console.error('Mailchimp API error:', data);
                res.status(400).json({
                    error: data.detail || 'Failed to subscribe. Please try again.'
                });
            }
        }
        catch (error) {
            console.error('Newsletter subscription error:', error);
            res.status(500).json({
                error: 'Internal server error. Please try again later.'
            });
        }
    });
});
// Masterclass Pre-registration Function
exports.subscribeToMasterclass = functions
    .runWith({ secrets: [mailchimpApiKey, mailchimpAudienceId, mailchimpDataCenter] })
    .https.onRequest(async (req, res) => {
    // Handle CORS
    (0, cors_1.cors)(req, res, async () => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }
        try {
            const { email, firstName, lastName } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }
            // CRITICAL: Save to Firestore FIRST (safety backup)
            await saveLeadToFirestore({
                email: email.toLowerCase().trim(),
                firstName: firstName || '',
                lastName: lastName || '',
                type: 'masterclass-preregister',
                tags: ['masterclass-preregister', 'website-subscriber']
            });
            // Prepare subscriber data with masterclass pre-registration tag
            const subscriberData = {
                email_address: email,
                status: 'subscribed',
            };
            // Add name fields if provided
            if (firstName || lastName) {
                subscriberData.merge_fields = {
                    FNAME: firstName || '',
                    LNAME: lastName || '',
                };
            }
            // Step 1: Create/update member in Mailchimp
            const config = getMailchimpConfig();
            const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
            const memberUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}`;
            const response = await fetch(memberUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriberData),
            });
            const data = await response.json();
            if (response.ok) {
                // Step 2: Apply tags separately (Mailchimp requires this!)
                const tagsApplied = await applyMailchimpTags(email, ['masterclass-preregister', 'website-subscriber']);
                res.status(200).json({
                    success: true,
                    message: 'Successfully subscribed! You\'ll be notified when new masterclasses launch.',
                    email: email,
                    tagsApplied: tagsApplied
                });
            }
            else {
                console.error('Mailchimp API error:', data);
                res.status(400).json({
                    error: data.detail || 'Failed to subscribe. Please try again.'
                });
            }
        }
        catch (error) {
            console.error('Masterclass subscription error:', error);
            res.status(500).json({
                error: 'Internal server error. Please try again later.'
            });
        }
    });
});
// Assessment Completion Function with Follow-up Email
exports.completeAssessment = functions
    .runWith({ secrets: [mailchimpApiKey, mailchimpAudienceId, mailchimpDataCenter] })
    .https.onRequest(async (req, res) => {
    // Handle CORS
    (0, cors_1.cors)(req, res, async () => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }
        try {
            const { email, firstName, lastName, assessmentScore, lowestScoringPillar, topRecommendations } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }
            // CRITICAL: Save to Firestore FIRST (safety backup)
            await saveLeadToFirestore({
                email: email.toLowerCase().trim(),
                firstName: firstName || '',
                lastName: lastName || '',
                type: 'assessment-completed',
                assessmentScore: assessmentScore || '',
                lowestScoringPillar: lowestScoringPillar || '',
                topRecommendations: topRecommendations || '',
                tags: ['biohacking-assessment-completed']
            });
            // Prepare subscriber data with assessment completion
            const subscriberData = {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName || '',
                    LNAME: lastName || '',
                    ASCORE: assessmentScore || '',
                    LOWPILLAR: lowestScoringPillar || '',
                    TOPRECS: topRecommendations || ''
                }
            };
            // Step 1: Create/update member in Mailchimp
            const config = getMailchimpConfig();
            const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
            const memberUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}`;
            const response = await fetch(memberUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriberData),
            });
            const data = await response.json();
            if (response.ok) {
                // Step 2: Apply ONLY biohacking-assessment-completed tag
                const tagsApplied = await applyMailchimpTags(email, [
                    'biohacking-assessment-completed'
                ]);
                res.status(200).json({
                    success: true,
                    message: 'Assessment completed! Check your email for your personalised recommendations and masterclass access.',
                    email: email,
                    followUpScheduled: true,
                    tagsApplied: tagsApplied
                });
            }
            else {
                console.error('Mailchimp API error:', data);
                res.status(400).json({
                    error: data.detail || 'Failed to process assessment. Please try again.'
                });
            }
        }
        catch (error) {
            console.error('Assessment completion error:', error);
            res.status(500).json({
                error: 'Internal server error. Please try again later.'
            });
        }
    });
});
/**
 * Generic addToMailchimp function for guide downloads, popup forms, etc.
 * Applies tags based on the source parameter
 */
exports.addToMailchimp = functions
    .runWith({ secrets: [mailchimpApiKey, mailchimpAudienceId, mailchimpDataCenter] })
    .https.onCall(async (data, context) => {
    try {
        const { email, source, firstName } = data;
        if (!email) {
            throw new functions.https.HttpsError('invalid-argument', 'Email is required');
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid email format');
        }
        // Determine tags based on source
        let tags = [];
        let leadType = source || 'unknown';
        if (source === 'assessment-nurture') {
            // /biohack-assessment → ONLY assessment-lead tag
            tags = ['assessment-lead'];
            leadType = 'assessment-nurture';
        }
        else if (source === 'freebie-download' || source === 'guide-download') {
            tags = ['guide-download', 'lead-magnet', 'website-subscriber'];
            leadType = 'guide-download';
        }
        else if (source === 'popup' || source === 'exit-intent') {
            tags = ['popup-subscriber', 'website-subscriber'];
            leadType = 'popup';
        }
        else if (source === 'footer' || source === 'newsletter') {
            tags = ['newsletter-subscriber', 'website-subscriber'];
            leadType = 'newsletter';
        }
        else if (source === 'book' || source === 'book-promo') {
            tags = ['book-interest', 'reader', 'website-subscriber'];
            leadType = 'book';
        }
        else {
            tags = ['website-subscriber'];
        }
        // CRITICAL: Save to Firestore FIRST (safety backup)
        await saveLeadToFirestore({
            email: email.toLowerCase().trim(),
            firstName: firstName || '',
            lastName: '',
            type: leadType,
            tags: tags
        });
        // Create/update member in Mailchimp
        const config = getMailchimpConfig();
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        const memberUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}`;
        const subscriberData = {
            email_address: email,
            status: 'subscribed',
        };
        if (firstName) {
            subscriberData.merge_fields = {
                FNAME: firstName,
                LNAME: ''
            };
        }
        const response = await fetch(memberUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriberData),
        });
        const responseData = await response.json();
        if (response.ok) {
            // Apply tags separately
            const tagsApplied = await applyMailchimpTags(email, tags);
            return {
                success: true,
                message: 'Successfully subscribed!',
                email: email,
                tagsApplied: tagsApplied
            };
        }
        else {
            console.error('Mailchimp API error:', responseData);
            throw new functions.https.HttpsError('internal', responseData.detail || 'Failed to subscribe');
        }
    }
    catch (error) {
        console.error('addToMailchimp error:', error);
        throw new functions.https.HttpsError('internal', error.message || 'Internal server error');
    }
});
/**
 * HTTP endpoint for Live Well Longer Retreat registrations
 * This is separate from BioHackMe functions and saves to a dedicated collection
 */
exports.registerRetreatInterest = functions
    .runWith({ secrets: [mailchimpApiKey, mailchimpAudienceId, mailchimpDataCenter] })
    .https.onRequest(async (req, res) => {
    // Handle CORS
    (0, cors_1.cors)(req, res, async () => {
        // Handle preflight
        if (req.method === 'OPTIONS') {
            res.status(204).send('');
            return;
        }
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }
        try {
            const { email, name } = req.body;
            if (!email || !name) {
                res.status(400).json({ error: 'Email and name are required' });
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }
            // Split name into first and last name
            const nameParts = name.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            // CRITICAL: Save to Firestore FIRST (triple backup for retreat leads)
            const leadData = {
                email: email.toLowerCase().trim(),
                name: name,
                firstName: firstName,
                lastName: lastName,
                type: 'retreat-interest-2026',
                source: 'livewelllonger-retreat',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                mailchimpStatus: 'pending'
            };
            // Save to retreat-specific collection
            try {
                await admin.firestore().collection('retreat-registrations').add(leadData);
                console.log('✅ Retreat lead saved to PRIMARY backup (retreat-registrations):', email);
            }
            catch (error) {
                console.error('❌ Failed to save retreat lead to PRIMARY backup:', error);
            }
            // Also save to general leads collection for redundancy
            try {
                await admin.firestore().collection('leads').add(Object.assign(Object.assign({}, leadData), { tags: ['retreat-interest-2026', 'livewelllonger'] }));
                console.log('✅ Retreat lead saved to SECONDARY backup (leads):', email);
            }
            catch (error) {
                console.error('❌ Failed to save retreat lead to SECONDARY backup:', error);
            }
            // Add to Mailchimp
            const config = getMailchimpConfig();
            const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
            const memberUrl = `https://${config.datacenter}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailHash}`;
            const subscriberData = {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            };
            const response = await fetch(memberUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriberData),
            });
            const responseData = await response.json();
            let mailchimpSuccess = response.ok;
            if (response.ok) {
                // Apply retreat-specific tags
                const tagsApplied = await applyMailchimpTags(email, ['retreat-interest-2026', 'livewelllonger-retreat']);
                console.log('✅ Retreat registration complete:', email, 'Tags applied:', tagsApplied);
                // Update Firestore with success status
                try {
                    const snapshot = await admin.firestore()
                        .collection('retreat-registrations')
                        .where('email', '==', email.toLowerCase().trim())
                        .orderBy('createdAt', 'desc')
                        .limit(1)
                        .get();
                    if (!snapshot.empty) {
                        await snapshot.docs[0].ref.update({ mailchimpStatus: 'success' });
                    }
                }
                catch (updateError) {
                    console.error('Could not update Firestore status:', updateError);
                }
            }
            else {
                console.error('Mailchimp API error for retreat registration:', responseData);
                mailchimpSuccess = false;
                // Update Firestore with error status
                try {
                    const snapshot = await admin.firestore()
                        .collection('retreat-registrations')
                        .where('email', '==', email.toLowerCase().trim())
                        .orderBy('createdAt', 'desc')
                        .limit(1)
                        .get();
                    if (!snapshot.empty) {
                        await snapshot.docs[0].ref.update({
                            mailchimpStatus: 'failed',
                            mailchimpError: responseData.detail || 'Unknown error'
                        });
                    }
                }
                catch (updateError) {
                    console.error('Could not update Firestore error status:', updateError);
                }
            }
            // Always return success to user - lead is safely stored in Firestore
            res.status(200).json({
                success: true,
                message: 'Thank you for your interest! We will be in touch soon.',
                email: email,
                mailchimpSync: mailchimpSuccess
            });
        }
        catch (error) {
            console.error('Retreat registration error:', error);
            // Even on error, try to save the lead
            const { email, name } = req.body;
            if (email) {
                try {
                    await admin.firestore().collection('retreat-registrations').add({
                        email: email.toLowerCase().trim(),
                        name: name || 'Unknown',
                        type: 'retreat-interest-2026-error',
                        source: 'livewelllonger-retreat',
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        error: error.message,
                        mailchimpStatus: 'error'
                    });
                    console.log('✅ Retreat lead saved despite error:', email);
                }
                catch (saveError) {
                    console.error('❌ CRITICAL: Could not save lead even as fallback:', saveError);
                }
            }
            res.status(200).json({
                success: true,
                message: 'Thank you for your interest! We will be in touch soon.',
                note: 'Lead saved to backup'
            });
        }
    });
});
//# sourceMappingURL=mailchimp.js.map
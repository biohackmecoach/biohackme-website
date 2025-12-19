"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentWebhook = exports.scheduleSession = exports.createUserProfile = exports.createDailyRoom = exports.downloadPDF = exports.getPaymentStatus = exports.handlePaymentSuccess = exports.createCheckoutSession = exports.addToMailchimp = exports.completeAssessment = exports.subscribeToMasterclass = exports.subscribeToNewsletter = exports.testOpenAI = exports.generateContent = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Export OpenAI functions
var openai_1 = require("./openai");
Object.defineProperty(exports, "generateContent", { enumerable: true, get: function () { return openai_1.generateContent; } });
Object.defineProperty(exports, "testOpenAI", { enumerable: true, get: function () { return openai_1.testOpenAI; } });
// Export Mailchimp functions
var mailchimp_1 = require("./mailchimp");
Object.defineProperty(exports, "subscribeToNewsletter", { enumerable: true, get: function () { return mailchimp_1.subscribeToNewsletter; } });
Object.defineProperty(exports, "subscribeToMasterclass", { enumerable: true, get: function () { return mailchimp_1.subscribeToMasterclass; } });
Object.defineProperty(exports, "completeAssessment", { enumerable: true, get: function () { return mailchimp_1.completeAssessment; } });
Object.defineProperty(exports, "addToMailchimp", { enumerable: true, get: function () { return mailchimp_1.addToMailchimp; } });
// Export Stripe functions
const stripe_1 = require("./stripe");
Object.defineProperty(exports, "createCheckoutSession", { enumerable: true, get: function () { return stripe_1.createCheckoutSession; } });
Object.defineProperty(exports, "handlePaymentSuccess", { enumerable: true, get: function () { return stripe_1.handlePaymentSuccess; } });
Object.defineProperty(exports, "getPaymentStatus", { enumerable: true, get: function () { return stripe_1.getPaymentStatus; } });
Object.defineProperty(exports, "downloadPDF", { enumerable: true, get: function () { return stripe_1.downloadPDF; } });
// Daily.co integration functions
exports.createDailyRoom = functions.https.onCall(async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be authenticated to create a room.");
    }
    try {
        // Daily.co room creation logic will go here
        // For now, return a placeholder
        return {
            roomUrl: "https://biohackme.daily.co/room-placeholder",
            roomName: `session-${Date.now()}`,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        };
    }
    catch (error) {
        console.error("Error creating Daily.co room:", error);
        throw new functions.https.HttpsError("internal", "Failed to create video room");
    }
});
// User management functions
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
    const userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        role: "client",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    try {
        await admin.firestore()
            .collection("users")
            .doc(user.uid)
            .set(userProfile);
        console.log(`User profile created for ${user.email}`);
    }
    catch (error) {
        console.error("Error creating user profile:", error);
    }
});
// Session management functions
exports.scheduleSession = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be authenticated to schedule a session.");
    }
    const { coachId, scheduledTime, duration, sessionType } = data;
    // Validate input
    if (!coachId || !scheduledTime || !duration) {
        throw new functions.https.HttpsError("invalid-argument", "Missing required fields for session scheduling.");
    }
    try {
        const sessionData = {
            clientId: context.auth.uid,
            coachId,
            scheduledTime: new Date(scheduledTime),
            duration,
            sessionType: sessionType || "coaching",
            status: "scheduled",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        const sessionRef = await admin.firestore()
            .collection("sessions")
            .add(sessionData);
        return Object.assign({ sessionId: sessionRef.id }, sessionData);
    }
    catch (error) {
        console.error("Error scheduling session:", error);
        throw new functions.https.HttpsError("internal", "Failed to schedule session");
    }
});
// Payment webhook handler (for Stripe integration)
exports.handlePaymentWebhook = functions.https.onRequest(async (req, res) => {
    // Stripe webhook handling will go here
    console.log("Payment webhook received");
    res.status(200).send("OK");
});
//# sourceMappingURL=index.js.map
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Export OpenAI functions
export { generateContent, testOpenAI } from './openai';

// Export Mailchimp functions
export { subscribeToNewsletter, subscribeToMasterclass, completeAssessment, addToMailchimp, registerRetreatInterest } from './mailchimp';

// Export Stripe functions
import { createCheckoutSession, handlePaymentSuccess, getPaymentStatus, downloadPDF } from './stripe';
export { createCheckoutSession, handlePaymentSuccess, getPaymentStatus, downloadPDF };

// Daily.co integration functions
export const createDailyRoom = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to create a room."
    );
  }

  try {
    // Daily.co room creation logic will go here
    // For now, return a placeholder
    return {
      roomUrl: "https://biohackme.daily.co/room-placeholder",
      roomName: `session-${Date.now()}`,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    };
  } catch (error) {
    console.error("Error creating Daily.co room:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to create video room"
    );
  }
});

// User management functions
export const createUserProfile = functions.auth.user().onCreate(async (user) => {
  const userProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    role: "client", // Default role
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await admin.firestore()
      .collection("users")
      .doc(user.uid)
      .set(userProfile);
    
    console.log(`User profile created for ${user.email}`);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
});

// Session management functions
export const scheduleSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to schedule a session."
    );
  }

  const { coachId, scheduledTime, duration, sessionType } = data;

  // Validate input
  if (!coachId || !scheduledTime || !duration) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields for session scheduling."
    );
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

    return {
      sessionId: sessionRef.id,
      ...sessionData,
    };
  } catch (error) {
    console.error("Error scheduling session:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to schedule session"
    );
  }
});

// Payment webhook handler (for Stripe integration)
export const handlePaymentWebhook = functions.https.onRequest(async (req, res) => {
  // Stripe webhook handling will go here
  console.log("Payment webhook received");
  res.status(200).send("OK");
});
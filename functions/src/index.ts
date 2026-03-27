import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Export OG Middleware for social media crawlers
export { ogMiddleware } from './ogMiddleware';

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
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret not configured");
    res.status(500).send("Webhook secret not configured");
    return;
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.error("No Stripe signature header");
    res.status(400).send("Missing signature");
    return;
  }

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    console.log(`Stripe webhook verified: ${event.type}`);

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Payment successful:', event.data.object.id);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', event.data.object.id);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// The Upgrade registration notification (HTTP endpoint)
export const notifyUpgradeRegistration = functions.https.onRequest(async (req, res) => {
  // Enable CORS - restrict to known origins
  const allowedOrigins = [
    'https://biohackme.com.au',
    'https://www.biohackme.com.au',
    'https://biohackme-app-379de.web.app',
    'https://biohackme-com-au.web.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    console.log(`✅ The Upgrade registration from: ${email}`);
    res.status(200).json({ success: true, message: 'Registration recorded' });
  } catch (error) {
    console.error('Error processing upgrade registration:', error);
    res.status(500).json({ error: 'Failed to process registration' });
  }
});

// Firestore trigger - sends notification when new upgrade registration is added
export const onUpgradeRegistration = functions.firestore
  .document('upgrade_registrations/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;

    console.log(`🎉 NEW UPGRADE REGISTRATION: ${email}`);

    // Save to admin notifications for tracking
    await admin.firestore().collection('admin_notifications').add({
      type: 'upgrade_registration',
      email: email,
      message: `New interest in The Upgrade program from: ${email}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    });

    // Email notification will be sent via the existing system
    // Check Firebase console > Firestore > admin_notifications for all leads

    return null;
  });
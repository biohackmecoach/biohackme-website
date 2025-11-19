# Security Notice

## Firebase API Keys

This repository contains Firebase client-side API keys (prefixed with `VITE_FIREBASE_`).

**These are NOT secret keys.**

As per [Firebase official documentation](https://firebase.google.com/docs/projects/api-keys):

> "Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources. They're just used to identify your Firebase project."

### Security Model

Our application security is provided by:

1. **Firebase Security Rules** - Control access to Firestore and Storage
2. **Firebase Authentication** - Verify user identity
3. **Server-side API validation** - Firebase Functions validate all requests

### What IS Secret (and not in this repo)

The following are kept secure in environment variables and NEVER committed:

- Stripe Secret Keys (server-side only)
- Mailchimp API Keys (server-side only)
- OpenAI API Keys (server-side only)
- Firebase Admin SDK keys (server-side only)

### Reporting Security Issues

If you discover a security vulnerability, please email: hello@biohackme.com.au

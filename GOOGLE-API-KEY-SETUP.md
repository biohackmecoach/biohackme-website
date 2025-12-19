# How to Secure Your Firebase API Key (Respond to Google Warning)

## What Happened

Google detected your Firebase client API key in the GitHub repository.

**This is NOT a critical security issue** - Firebase client keys are designed to be public. However, Google recommends adding restrictions.

## Steps to Fix the Warning

### Step 1: Add API Key Restrictions in Google Cloud Console

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials?project=biohackme-app-379de

2. **Find your API key:**
   - Look for key starting with `AIzaSyB8ldJZ7oUdyur0DbkcnjW4QAf27wOpMPM`
   - Click on it to edit

3. **Add Application Restrictions:**
   - Select "HTTP referrers (web sites)"
   - Add these referrer URLs:
     ```
     https://biohackme.com.au/*
     https://biohackme-com-au.web.app/*
     https://biohackme-app-379de.web.app/*
     https://biohackme-app-379de.firebaseapp.com/*
     http://localhost:5173/*
     http://localhost:*
     ```

4. **Add API Restrictions:**
   - Click "Restrict key"
   - Select these APIs:
     - Cloud Firestore API
     - Firebase Installations API
     - Identity Toolkit API
     - Token Service API
     - Cloud Storage
     - Firebase Management API

5. **Save** the restrictions

### Step 2: Acknowledge the Warning

Reply to Google's email:
```
We have added HTTP referrer restrictions and API restrictions to the API key as recommended. This is a Firebase client-side key which is intended to be publicly visible and is protected by Firebase Security Rules.
```

### Step 3: Monitor Usage

Check your Firebase Console regularly:
- https://console.firebase.google.com/project/biohackme-app-379de/usage

## Why This is Safe

Firebase client API keys work differently than traditional API keys:

1. **Designed to be public** - Every Firebase web app has the key visible in the browser
2. **Protected by Security Rules** - Your Firestore and Storage rules control access
3. **Protected by Authentication** - Users must sign in to access protected data
4. **Quota limits** - Firebase has built-in abuse prevention

## References

- [Firebase: Using API Keys](https://firebase.google.com/docs/projects/api-keys)
- [Google Cloud: Best practices for API keys](https://cloud.google.com/docs/authentication/api-keys)

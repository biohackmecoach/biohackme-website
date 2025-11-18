# Firebase Setup Instructions for BiohackMe

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it: **biohackme-coach**
4. Enable Google Analytics (for GA4 integration)
5. Select or create a Google Analytics account

## Step 2: Login to Firebase CLI

Run this command and login with your Google account:
```bash
firebase login
```

## Step 3: Link the Project

After logging in, run:
```bash
firebase use biohackme-coach
```

If the project doesn't exist yet, create it first:
```bash
firebase projects:create biohackme-coach
```

## Step 4: Build the Project

Build the React app for production:
```bash
npm run build
```

## Step 5: Deploy to Firebase

Deploy the built app:
```bash
firebase deploy --only hosting
```

## Step 6: Set up Custom Domain (Optional)

1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Add: biohackme.co.nz or biohackme.com.au
4. Follow DNS verification steps

## Firebase Configuration Files Created:

### firebase.json
- Configured for single-page React app
- Redirects set up:
  - `/copy-of-contact` → `/about` (301 redirect)
  - `/post/:id` → `/blog/:id` (301 redirect)
- Cache headers for optimal performance
- Security headers configured

### .firebaserc
- Project ID: biohackme-coach

## Next Steps After Deployment:

1. **Google Analytics 4**: Will be automatically set up when you enable it during project creation
2. **Google Search Console**: Add the Firebase hosting URL
3. **Update all internal links**: Change `/copy-of-contact` to `/about` in the codebase

## Build & Deploy Commands Summary:

```bash
# Build the React app
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# View your deployed site
firebase hosting:channel:deploy preview
```

## Important URLs:

- Firebase Console: https://console.firebase.google.com/project/biohackme-coach
- Hosting URL: https://biohackme-coach.web.app
- Alternative URL: https://biohackme-coach.firebaseapp.com
# API Setup Guide for BiohackMe CRM Integration

## 🔵 Google Forms API Setup

### Step 1: Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (use the same account that owns your forms)
3. Create a new project or select an existing one:
   - Click "Select a project" at the top
   - Click "New Project"
   - Name it "BiohackMe CRM" or similar
   - Click "Create"

### Step 2: Enable Google Forms API
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google Forms API"
3. Click on "Google Forms API" 
4. Click the "Enable" button
5. Also enable "Google Drive API" (needed for form access)

### Step 3: Create API Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "API key"
3. Copy the API key that appears
4. Click "RESTRICT KEY" for security:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Forms API" and "Google Drive API"
   - Click "Save"

### Step 4: Set Up OAuth (for form access)
1. Still in "Credentials", click "+ CREATE CREDENTIALS" → "OAuth client ID"
2. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "BiohackMe CRM"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue" through all steps
3. Create OAuth client ID:
   - Application type: "Web application"
   - Name: "BiohackMe CRM"
   - Authorized redirect URIs: `http://localhost:5174/admin`
   - Click "Create"
4. Copy the Client ID and Client Secret

### Step 5: Get Your Google Form IDs
1. Open each of your Google Forms
2. Look at the URL - it will be like: `https://docs.google.com/forms/d/[FORM_ID]/edit`
3. Copy the FORM_ID part for each form:
   - Client intake form ID
   - Biohacking assessment form ID
   - Weekly check-in form ID
   - Free guide download form ID

---

## 🟣 Fathom AI API Setup

### Step 1: Access Fathom Account
1. Log in to your [Fathom account](https://fathom.video/)
2. Go to your account settings (click your profile picture)

### Step 2: Navigate to Integrations
1. In the left sidebar, look for "Integrations" or "API"
2. If you don't see it, contact Fathom support to enable API access
3. Some Fathom plans may require upgrading for API access

### Step 3: Generate API Key
1. Click "Generate API Key" or "Create New Key"
2. Give it a name: "BiohackMe CRM"
3. Copy the API key (save it securely - you won't see it again)

### Step 4: Get Workspace Information
1. In your Fathom dashboard, note your workspace name/ID
2. This is usually visible in the URL or account settings
3. Copy your workspace identifier

### Step 5: Set Up Webhook (Optional)
1. If available, set up a webhook URL for real-time updates
2. Use: `https://yourapp.com/api/fathom-webhook` (we'll set this up later)
3. Select events: "Recording completed", "Transcript ready"

---

## ⚙️ Environment Variables Setup

### Step 1: Create Environment File
1. In your project root folder, create a file called `.env.local`
2. Add the following variables with your actual values:

```bash
# Google Forms API Configuration
REACT_APP_GOOGLE_FORMS_API_KEY=your_google_api_key_here
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:5174/admin

# Your Google Form IDs (get from form URLs)
REACT_APP_INTAKE_FORM_ID=your_intake_form_id_here
REACT_APP_ASSESSMENT_FORM_ID=your_assessment_form_id_here
REACT_APP_FEEDBACK_FORM_ID=your_feedback_form_id_here
REACT_APP_FREEBIE_FORM_ID=your_freebie_form_id_here

# Fathom AI Configuration
REACT_APP_FATHOM_API_KEY=your_fathom_api_key_here
REACT_APP_FATHOM_WORKSPACE_ID=your_fathom_workspace_id_here
REACT_APP_FATHOM_WEBHOOK_URL=https://yourapp.com/api/fathom-webhook

# Optional: Calendar Integration
REACT_APP_CALENDAR_API_KEY=your_calendar_api_key_here
REACT_APP_CALENDAR_ID=your_calendar_id_here
```

### Step 2: Restart Your Development Server
1. Stop your current server (Ctrl+C)
2. Run `npm run dev` again
3. The app will now load your API credentials

---

## 🔒 Security Best Practices

### For Production Deployment:
1. **Never commit `.env.local` to git** (it's automatically ignored)
2. **Use different credentials for production**
3. **Set up proper domain restrictions** in Google Cloud Console
4. **Use HTTPS URLs** for all redirect URIs in production
5. **Regularly rotate API keys**

### API Rate Limits:
- **Google Forms API**: 1,000 requests per 100 seconds per user
- **Fathom API**: Check your plan limits (usually 100-1000 requests/hour)

---

## 🧪 Testing Your Setup

### Test Google Forms:
1. Go to `http://localhost:5174/admin`
2. Click "Google Forms" in the sidebar
3. You should see your connected forms
4. Submit a test form response
5. Check if it appears in the CRM

### Test Fathom:
1. Go to any client profile
2. Click "Fathom Sessions"
3. Try starting a test recording
4. Check if recordings sync properly

---

## ❗ Troubleshooting

### Google Forms Issues:
- **"API not enabled"**: Make sure you enabled Google Forms API in Cloud Console
- **"Access denied"**: Check your OAuth consent screen configuration
- **"Invalid form ID"**: Verify you copied the correct ID from the form URL

### Fathom Issues:
- **"Invalid API key"**: Contact Fathom support to verify API access is enabled
- **"Workspace not found"**: Double-check your workspace ID
- **"Rate limit exceeded"**: Wait and try again, or upgrade your Fathom plan

### General Issues:
- **Environment variables not loading**: Restart the development server
- **CORS errors**: Make sure redirect URIs are properly configured
- **SSL errors in development**: Use `http://localhost:5174` (not https)

---

## 📞 Support Contacts

### Google Cloud Support:
- [Google Cloud Console Help](https://cloud.google.com/support)
- [Google Forms API Documentation](https://developers.google.com/forms)

### Fathom Support:
- [Fathom Help Center](https://help.fathom.video/)
- Email: support@fathom.video
- Note: API access may require contacting them directly

---

## ✅ Checklist

Before proceeding, make sure you have:

**Google Setup:**
- [ ] Google Cloud project created
- [ ] Google Forms API enabled
- [ ] Google Drive API enabled
- [ ] API key generated and restricted
- [ ] OAuth client ID created
- [ ] All form IDs collected

**Fathom Setup:**
- [ ] Fathom API key generated
- [ ] Workspace ID identified
- [ ] Webhook URL configured (optional)

**Environment Setup:**
- [ ] `.env.local` file created
- [ ] All environment variables added
- [ ] Development server restarted
- [ ] APIs tested successfully

Once you have all these credentials, let me know and I'll help you configure the live connections!
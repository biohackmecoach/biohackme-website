# Incident Report - November 19, 2025

## Summary
BiohackMe website went down (blank white screen) during API security remediation work. Site was restored by deploying the working static HTML backup.

## Timeline

### 1. Initial Security Issue
- **Problem:** Mailchimp API key was exposed in GitHub repository
- **File:** `functions/subscribeToNewsletter.js` contained hardcoded API key
- **Impact:** Mailchimp automatically revoked the key
- **Resolution:**
  - Moved API keys to `.env` file
  - Updated all Firebase Functions to use environment variables
  - User provided new API key
  - Redeployed Firebase Functions successfully

### 2. Website Outage
- **Problem:** After multiple deployments, production site showed blank white screen
- **Root Cause:** React production build was not including environment variables, causing Firebase initialization to fail
- **User Impact:** Business website completely non-functional
- **Resolution:** Deployed static HTML backup from `dist-working/` folder

### 3. Google API Warning (Secondary Issue)
- **Problem:** Google Cloud detected Firebase client API key in GitHub
- **Key:** `AIzaSyB8ldJZ7oUdyur0DbkcnjW4QAf27wOpMPM`
- **Important:** This is NORMAL and EXPECTED for Firebase client keys
- **Documentation:** Created `GOOGLE-API-KEY-SETUP.md` with explanation
- **Action Required:** Add HTTP referrer restrictions (optional security enhancement)

## What Went Wrong

1. **No Staging Environment:** Changes were deployed directly to production without testing
2. **Build Process Issue:** Vite production builds were not including `.env` variables
3. **No Monitoring:** No alerts when site went down
4. **Multiple Deployments:** Made situation worse by deploying multiple broken builds
5. **Confusion Between Versions:** React app vs static HTML versions

## What Went Right

1. **Static Backup Existed:** `dist-working/` folder had a working version
2. **Quick Rollback:** Once identified, static version was deployed immediately
3. **API Security Fixed:** All sensitive credentials now properly secured in `.env` files
4. **Firebase Functions Working:** Newsletter subscriptions now secure and functional

## Prevention Measures

### Immediate Actions Needed:

1. **Set Up Staging Environment**
   - Create Firebase hosting channel for staging
   - Test all deployments in staging before production
   - Command: `firebase hosting:channel:deploy staging`

2. **Fix React Build Process**
   - Investigate why environment variables aren't included in production build
   - Test production build locally before deploying
   - Document correct build process

3. **Set Up Monitoring**
   - Use UptimeRobot or similar service
   - Alert to hello@biohackme.com.au if site is down
   - Check every 5 minutes

4. **Deployment Checklist**
   - See `DEPLOYMENT-CHECKLIST.md`
   - Must be followed for every production deployment

5. **Emergency Rollback Documentation**
   - See `EMERGENCY-ROLLBACK.md`
   - Quick reference for restoring working version

### Long-term Improvements:

1. **Automated Testing**
   - Set up CI/CD with GitHub Actions
   - Run tests before allowing deployment
   - Check for environment variable issues

2. **Better Git Workflow**
   - Use feature branches
   - Require pull requests
   - Never commit directly to main

3. **Security Scanning**
   - Set up GitHub secret scanning
   - Use git-secrets to prevent committing credentials
   - Regular security audits

## Files Changed During Incident

### Security Fixes (Completed):
- `functions/subscribeToNewsletter.js` - Now uses environment variables
- `functions/addToMailchimp.js` - Now uses environment variables
- `functions/src/mailchimp.ts` - Now uses environment variables
- `functions/.env` - Contains secured API keys (gitignored)
- `functions/package.json` - Upgraded to Node.js 20

### Site Restoration:
- `dist/index.html` - Restored from `dist-working/index.html`

### Documentation Created:
- `SECURITY.md` - Explains Firebase API key visibility
- `GOOGLE-API-KEY-SETUP.md` - Instructions for API restrictions
- `INCIDENT-REPORT-NOV-19-2025.md` - This file

## Current Status

✅ **Website:** Live and functional at https://biohackme.com.au
✅ **Mailchimp Integration:** Secured with environment variables
✅ **Firebase Functions:** Deployed and working with Node.js 20
⚠️ **React Build:** Not working - stick with static HTML for now
⚠️ **Staging Environment:** Not set up yet
⚠️ **Monitoring:** Not set up yet

## Recommendations

1. **DON'T** attempt to deploy the React version until build issue is resolved
2. **DO** set up staging environment before next deployment
3. **DO** set up uptime monitoring immediately
4. **DO** test all deployments in staging first
5. **DO** follow deployment checklist every time

## Questions for User

1. Do you want to keep the simple static HTML site, or fix the React version?
2. Which monitoring service would you prefer (UptimeRobot is free)?
3. Should we set up automatic daily backups?

---

**Prepared by:** Claude Code
**Date:** November 19, 2025
**Severity:** Critical (business website down)
**Resolution Time:** Approximately 2 hours
**Business Impact:** Lost traffic/conversions during downtime

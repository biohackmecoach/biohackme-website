# Deployment Safety Checklist

**IMPORTANT:** Follow this checklist for EVERY production deployment to prevent outages.

## Pre-Deployment Checklist

### 1. Code Changes
- [ ] All changes committed to Git
- [ ] No sensitive credentials in code (check with `git diff`)
- [ ] No API keys hardcoded (should be in `.env` files)
- [ ] `.env` file updated with all required variables
- [ ] Dependencies up to date (`npm audit` shows no critical issues)

### 2. Local Testing
- [ ] Development server works (`npm run dev`)
- [ ] Production build completes without errors (`npm run build`)
- [ ] Production build tested locally:
  ```bash
  npm run build
  npx serve dist
  ```
- [ ] All pages load correctly in local production build
- [ ] All forms work in local production build
- [ ] No console errors in browser
- [ ] Mobile responsive (test at 360px width)

### 3. Environment Variables
- [ ] All required `VITE_*` variables set in `.env`
- [ ] Firebase config variables present
- [ ] Mailchimp API credentials in `functions/.env`
- [ ] No undefined values in production build

### 4. Firebase Functions
- [ ] Functions build successfully (`npm run build` in functions folder)
- [ ] All environment variables set (`firebase functions:config:get`)
- [ ] Node.js version is 20 (check `functions/package.json`)

## Staging Deployment

### 5. Deploy to Staging First
```bash
# Deploy to staging channel
firebase hosting:channel:deploy staging --expires 7d

# Test the staging URL
# Should output: https://biohackme-app-379de--staging-RANDOM.web.app
```

### 6. Test Staging Environment
- [ ] Staging URL loads correctly
- [ ] All navigation links work
- [ ] All forms submit successfully
- [ ] Newsletter subscription works
- [ ] Contact forms send emails
- [ ] Mobile version works
- [ ] No console errors
- [ ] Performance acceptable (run Lighthouse)

### 7. User Acceptance Testing
- [ ] Share staging URL with user for approval
- [ ] Wait for explicit approval before production deployment
- [ ] Address any issues found

## Production Deployment

### 8. Create Backup
```bash
# Create a backup of current live site
mkdir -p backups
timestamp=$(date +%Y%m%d-%H%M%S)
cp -r dist "backups/dist-backup-$timestamp"
echo "Backup created: backups/dist-backup-$timestamp"
```

### 9. Deploy to Production
```bash
# Deploy to production
firebase deploy --only hosting

# If deploying functions too:
firebase deploy
```

### 10. Post-Deployment Verification
- [ ] https://biohackme.com.au loads correctly
- [ ] https://biohackme-com-au.web.app loads correctly
- [ ] Test all critical pages:
  - [ ] Home page
  - [ ] Contact page
  - [ ] Freebie page
  - [ ] Talks page
  - [ ] About page
- [ ] Test newsletter subscription with real email
- [ ] Check mobile version
- [ ] Run Lighthouse audit (score > 90)
- [ ] No console errors in browser
- [ ] Forms working correctly

### 11. Monitoring
- [ ] Check uptime monitor (if set up)
- [ ] Monitor for 15 minutes after deployment
- [ ] Check Firebase Hosting metrics
- [ ] Check Firebase Functions logs for errors

## If Something Goes Wrong

### STOP AND ROLLBACK

If you see any issues:
1. **DO NOT** try to fix forward with another deployment
2. **DO** immediately follow the Emergency Rollback procedure
3. See: `EMERGENCY-ROLLBACK.md`

## Common Issues and Solutions

### Issue: Blank White Screen
**Cause:** Environment variables not loaded
**Solution:** Check `.env` file and rebuild
```bash
# Verify .env has all variables
cat .env
# Rebuild with environment check
npm run build
```

### Issue: Firebase Not Initialized
**Cause:** Missing Firebase config in build
**Solution:** Ensure all `VITE_FIREBASE_*` variables are set in `.env`

### Issue: Forms Not Submitting
**Cause:** Firebase Functions not deployed or broken
**Solution:** Deploy functions and check logs
```bash
firebase deploy --only functions
firebase functions:log
```

### Issue: 404 Errors
**Cause:** Routing not configured
**Solution:** Check `firebase.json` rewrites configuration

## Deployment Commands Reference

```bash
# Local development
npm run dev

# Production build
npm run build

# Test production build locally
npx serve dist

# Deploy to staging
firebase hosting:channel:deploy staging

# Deploy to production (hosting only)
firebase deploy --only hosting

# Deploy everything (hosting + functions)
firebase deploy

# Deploy specific function
firebase deploy --only functions:subscribeToNewsletter

# View deployment history
firebase hosting:releases:list

# Rollback to previous version (see EMERGENCY-ROLLBACK.md)
```

## Approval Sign-off

Before production deployment:
- [ ] Developer has completed all checklist items
- [ ] Staging tested and approved
- [ ] User/stakeholder approval received
- [ ] Backup created
- [ ] Ready to deploy

**Deployed by:** _______________
**Date:** _______________
**Time:** _______________
**Staging URL tested:** _______________
**Approved by:** _______________

---

**Remember:** A few extra minutes of testing can prevent hours of downtime.

# 🚨 CRITICAL DEPLOYMENT GUIDE
## Never Let This Happen Again

**Created:** December 6, 2025
**Backup Location:** `backups/CRITICAL-DEPLOYMENT-backup-2025-12-06.tar.gz`

---

## What Went Wrong Today

### Issue 1: Webhook Not Sending Emails ❌
**Problem:** Customers bought the masterclass but received NO emails and weren't added to Mailchimp.

**Root Cause:** The improved `handlePaymentSuccess` webhook handler was updated in the code BUT NEVER DEPLOYED to Firebase Functions.

**Impact:** Unknown number of customers didn't get access to what they paid for.

### Issue 2: PDF Downloads Not Working ❌
**Problem:** The automatic PDF download "set up weeks ago" never worked.

**Root Cause:**
1. Webhook wasn't deployed (so no emails sent)
2. PDF download route should be in React app at `/download/:token`, not a Firebase Function

---

## The Golden Rule

### ⚠️ NEVER MARK WORK AS COMPLETE UNLESS:

1. ✅ **ALL** functions are deployed (not just one)
2. ✅ Deployment is verified in Firebase Console
3. ✅ Webhook tested with real/test payment
4. ✅ Customer actually receives email
5. ✅ All functionality works end-to-end

---

## Complete Deployment Process

### Step 1: Before Making Changes
```bash
# Create a backup FIRST
cd "/Users/camilla/biohackme-ai-business-team 3"
tar -czf "backups/backup-$(date +%Y-%m-%d).tar.gz" functions/src functions/lib firebase.json .env
```

### Step 2: Make Your Changes
- Edit code in `functions/src/`
- Test locally if possible

### Step 3: Deploy EVERYTHING
```bash
# Use the deployment script (deploys ALL functions + hosting)
./deploy-all.sh

# OR manually:
cd functions
npx tsc
cd ..
firebase deploy --only functions
firebase deploy --only hosting
```

### Step 4: Verify Deployment
```bash
# Check ALL functions are deployed
firebase functions:list

# Run health check
./check-webhook-health.sh
```

### Step 5: Test End-to-End

**For Stripe Payments:**
1. Go to Stripe Dashboard → Toggle to Test Mode
2. Use test payment link or create new test session
3. Complete payment with test card: `4242 4242 4242 4242`
4. Verify:
   - ✅ Webhook fires (check Stripe Dashboard → Webhooks)
   - ✅ Email received at test email address
   - ✅ User created in Firestore
   - ✅ Mailchimp tag applied
   - ✅ PDF download link works

### Step 6: Monitor First Real Payment
After deploying to production:
- Watch Firebase logs closely for first payment
- Verify customer gets email immediately
- Check Stripe webhook shows 200 OK response

---

## Critical Functions That MUST Be Deployed

When making payment-related changes, these functions MUST be deployed together:

1. **`handlePaymentSuccess`** - The webhook handler (MOST CRITICAL)
2. **`createCheckoutSession`** - Creates payment sessions
3. **`getPaymentStatus`** - Checks payment status

**Never deploy just ONE of these!** They work together.

---

## Quick Reference Commands

```bash
# Full deployment (use this by default)
./deploy-all.sh

# Check webhook health
./check-webhook-health.sh

# View recent logs
firebase functions:log --only handlePaymentSuccess

# List all deployed functions
firebase functions:list

# Create backup before changes
tar -czf "backups/backup-$(date +%Y-%m-%d).tar.gz" functions/src functions/lib firebase.json .env
```

---

## What's Currently Deployed (Dec 6, 2025)

### Working Functions ✅
- `handlePaymentSuccess` - Sends emails, adds to Mailchimp, grants access
- `createCheckoutSession` - With automatic tax collection
- `getPaymentStatus` - Returns payment status
- `subscribeToNewsletter` - Newsletter signup
- `subscribeToMasterclass` - Masterclass signup
- `completeAssessment` - Assessment completion
- `addToMailchimp` - Manual Mailchimp addition

### Current Webhook Configuration
- **URL:** `https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess`
- **Event:** `checkout.session.completed`
- **Secret:** `whsec_btt6owFNM2pLe0l2tBebkCrpjqoXQZve`

### Payment Configuration
- **Payment Link:** `https://buy.stripe.com/28EaEZ9op29YcRZ3YG5Ne06`
- **Product ID:** `prod_T7hcgKH4geByja`
- **Tax Collection:** Enabled with billing address collection
- **Price:** $27 USD

---

## Emergency Rollback

If something breaks after deployment:

```bash
# 1. Check what went wrong
firebase functions:log --only handlePaymentSuccess

# 2. Restore from backup
cd "/Users/camilla/biohackme-ai-business-team 3"
tar -xzf backups/CRITICAL-DEPLOYMENT-backup-2025-12-06.tar.gz

# 3. Redeploy
./deploy-all.sh

# 4. Verify it works
./check-webhook-health.sh
```

---

## Testing Checklist

### Before Every Payment-Related Deployment:

- [ ] All code changes reviewed
- [ ] TypeScript compiles without errors
- [ ] Backup created
- [ ] ALL functions deployed (not just one)
- [ ] Verified in `firebase functions:list`
- [ ] Webhook health check passes
- [ ] Test mode payment completed successfully
- [ ] Test email received
- [ ] Stripe webhook shows 200 OK
- [ ] Firebase logs show no errors

### After First Real Payment:

- [ ] Customer received email immediately
- [ ] Customer has access in Firestore
- [ ] Mailchimp tag applied correctly
- [ ] No errors in Firebase logs
- [ ] Stripe webhook shows successful delivery

---

## Contact & Monitoring

- **Firebase Console:** https://console.firebase.google.com/project/biohackme-app-379de
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Function Logs:** `firebase functions:log --only handlePaymentSuccess`

---

## Lessons Learned

1. **Deploy ALL functions, never just one**
2. **Test end-to-end before marking complete**
3. **Verify customer actually receives email**
4. **Check Stripe webhook status after deployment**
5. **Monitor first real payment closely**
6. **Create backups before making changes**
7. **Use the deployment scripts, don't skip steps**
8. **Mailchimp tags require TWO separate API calls** (Dec 6, 2025):
   - First: PUT to `/lists/{id}/members/{hash}` to create/update member
   - Second: POST to `/lists/{id}/members/{hash}/tags` to add tags
   - You CANNOT set tags in the PUT request - Mailchimp ignores them!

---

## PDF Download Implementation

**IMPORTANT:** PDF downloads are handled by the React app, NOT a Firebase Function.

**How it works:**
1. Webhook creates download token in Firestore (`download_tokens` collection)
2. Email includes link: `https://biohackme.com.au/download/{token}`
3. React app handles `/download/:token` route
4. App validates token with Firestore
5. App redirects to Firebase Storage signed URL

**To implement PDF download in React app:**
1. Add route: `/download/:token`
2. Validate token exists in Firestore `download_tokens` collection
3. Get Firebase Storage file: `masterclass-resources/biohacking-basics-guide.pdf`
4. Generate signed URL and redirect

---

**Remember:** The customer paid for this. They deserve to receive what they bought immediately and reliably. No excuses.

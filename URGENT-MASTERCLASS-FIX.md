# URGENT: Masterclass Payment Issue - Customer Not Receiving Access

**Date:** November 24, 2025
**Status:** CRITICAL - Customer paid but received nothing

## Root Cause
Stripe webhook is NOT configured to send events to Firebase function. When customers pay:
- ✅ Payment goes through successfully
- ❌ Firebase function never receives notification
- ❌ No email sent
- ❌ No masterclass access granted
- ❌ No PDF delivered

## Immediate Actions Required

### 1. Configure Stripe Webhook (DO THIS NOW)

Go to Stripe Dashboard and add webhook endpoint:

**Webhook URL:**
```
https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess
```

**Events to subscribe to:**
- `checkout.session.completed`
- `payment_intent.succeeded`

**Steps:**
1. Log into Stripe Dashboard (https://dashboard.stripe.com)
2. Go to Developers → Webhooks
3. Click "Add endpoint"
4. Enter URL: `https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess`
5. Select events: `checkout.session.completed`
6. Save and verify webhook secret matches `.env`: `whsec_btt6owFNM2pLe0l2tBebkCrpjqoXQZve`

### 2. Manually Grant Access to Affected Customer

**Need from you:**
- Customer's email address
- Payment confirmation from Stripe

**I will:**
1. Add them to Mailchimp with 'masterclass-customer' tag
2. Send manual welcome email with access link
3. Grant Firestore access
4. Send PDF resources

### 3. Set Up Mailchimp Automation

Create automation in Mailchimp:
- **Trigger:** When contact is tagged with 'masterclass-customer'
- **Email 1 (Immediate):** Welcome + Access Link + Login Instructions
- **Email 2 (1 day):** PDF Resources + Getting Started Guide
- **Email 3 (7 days):** Check-in + Support Offer

## Prevention Checklist

### Technical Safeguards
- [ ] Webhook endpoint configured in Stripe
- [ ] Webhook endpoint URL matches Firebase function
- [ ] Webhook secret in Firebase env matches Stripe
- [ ] Test webhook with Stripe's webhook testing tool
- [ ] Set up webhook monitoring/alerts
- [ ] Add backup email notification system
- [ ] Create admin dashboard to see pending payments

### Process Safeguards
- [ ] Daily check of Stripe dashboard for new payments
- [ ] Daily check of webhook logs in Firebase
- [ ] Weekly test of complete purchase flow
- [ ] Automated alert if no webhook received within 24 hours of payment
- [ ] Backup manual process if webhook fails

### Monitoring Setup
```javascript
// Add to Firebase Functions - sends alert if webhook hasn't fired
const checkWebhookHealth = functions.pubsub.schedule('every 1 hours').onRun(async () => {
  const lastWebhook = await admin.firestore()
    .collection('webhook_logs')
    .orderBy('timestamp', 'desc')
    .limit(1)
    .get();

  const lastWebhookTime = lastWebhook.docs[0]?.data().timestamp;
  const hoursSinceLastWebhook = (Date.now() - lastWebhookTime) / (1000 * 60 * 60);

  if (hoursSinceLastWebhook > 24) {
    // Send alert email
    console.error('ALERT: No webhooks received in 24+ hours');
  }
});
```

## What the Customer Should Receive

After payment, within 5 minutes:
1. **Stripe receipt** (from Stripe, not us)
2. **Welcome email** with:
   - Masterclass access link: https://biohackme.com.au/masterclass-access
   - Login instructions
   - Support contact
3. **PDF resources email** (can be separate or included)
4. **Access granted** in their account at biohackme.com.au

## Testing Checklist

Before considering this resolved:
- [ ] Make test purchase using Stripe test mode
- [ ] Verify webhook fires in Firebase logs
- [ ] Confirm Mailchimp tags applied
- [ ] Verify automated email sent
- [ ] Check Firestore access granted
- [ ] Test login to masterclass page works
- [ ] Verify PDF download link works

## Emergency Contact Process

If webhook fails again:
1. Check Stripe webhook logs immediately
2. Check Firebase function logs
3. Manually process payment using script: `/scripts/manual-grant-access.sh`
4. Contact customer within 1 hour with access

## Files to Check/Create

- `/Users/camilla/biohackme-ai-business-team 3/functions/src/stripe.ts` - Webhook handler
- `/Users/camilla/biohackme-ai-business-team 3/functions/.env` - Webhook secret
- Create: `/scripts/manual-grant-access.sh` - Manual processing script
- Create: `/scripts/test-payment-flow.sh` - End-to-end test

## Next Steps

1. **You:** Configure Stripe webhook (5 minutes)
2. **You:** Provide affected customer's email
3. **Me:** Manually grant access to customer
4. **Me:** Set up monitoring and alerts
5. **Both:** Test complete flow
6. **Me:** Create backup systems

---

**This is fixable and preventable. Let's do both right now.**

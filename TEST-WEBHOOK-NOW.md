# Test Your Webhook RIGHT NOW

## Step 1: Send Test Webhook from Stripe (2 minutes)

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com/test/webhooks
2. **Click on your webhook endpoint** (the one pointing to handlePaymentSuccess)
3. **Click "Send test webhook"**
4. **Select event type:** `checkout.session.completed`
5. **Click "Send test webhook"**

You should see:
- ✅ Response: 200 (success)
- ✅ Or an error message that helps us debug

## Step 2: Check Firebase Logs (30 seconds)

Open Terminal and run:
```bash
cd "/Users/camilla/biohackme-ai-business-team 3"
firebase functions:log --only handlePaymentSuccess
```

You should see:
- Log entries showing webhook received
- Either success or specific error messages

## Step 3: Check Mailchimp (1 minute)

If the test webhook included a valid email:
1. Go to Mailchimp audience
2. Search for the test email
3. Verify `masterclass-customer` tag was applied

## What If It Fails?

**If you see "Payment not found" error:**
- ✅ This is EXPECTED for test webhooks
- The function is working correctly
- It's just looking for a payment record that doesn't exist in test

**If you see "Mailchimp API error":**
- Check your Mailchimp API key in functions/.env
- Key might be expired or disabled

**If you see no logs:**
- Webhook might not be configured correctly
- Double-check the URL in Stripe dashboard

## Expected Test Result

For a test webhook, you'll likely see:
```
Payment record not found for session: cs_test_...
```

This is GOOD! It means:
- ✅ Webhook is firing
- ✅ Function is receiving it
- ✅ Function is processing it
- ✅ Just needs a real payment to complete

## Real Purchase Test

For the ULTIMATE test:
1. Use Stripe test mode
2. Make a test purchase using test card: 4242 4242 4242 4242
3. Watch the logs in real-time
4. Verify customer gets added to Mailchimp
5. Verify automation triggers

Run this in Terminal while testing:
```bash
firebase functions:log --only handlePaymentSuccess --tail
```

This shows logs in real-time as they happen!

# Stripe Setup Guide for BiohackMe

## What's Already Built ✅
- Complete Stripe integration code in `/functions/src/stripe.ts`
- PaymentButton component in `/src/components/PaymentButton.tsx`
- Payment success/cancelled pages
- Webhook handling for payment completion
- User access management after payment

## Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification process
3. Set up your business profile with:
   - Business name: BiohackMe
   - Business type: Educational Services
   - Country: Australia
   - Currency: AUD

## Step 2: Get API Keys
1. In Stripe Dashboard → Developers → API Keys
2. Copy these keys (we'll need them):
   - **Publishable key** (starts with `pk_live_` or `pk_test_`)
   - **Secret key** (starts with `sk_live_` or `sk_test_`)

## Step 3: Create Products & Prices
1. In Stripe Dashboard → Products
2. Create product: **"Biohacking Basics Masterclass"**
   - Name: Biohacking Basics Masterclass
   - Description: Master the fundamentals of biohacking
   - Price: $47 AUD (one-time payment)
   - Copy the **Price ID** (starts with `price_`)

## Step 4: Configure Firebase Functions
Run these commands to set the Stripe keys:

```bash
# Set test keys first
firebase functions:config:set stripe.secret_key="sk_test_YOUR_SECRET_KEY"
firebase functions:config:set stripe.publishable_key="pk_test_YOUR_PUBLISHABLE_KEY"

# Deploy functions with new config
firebase deploy --only functions
```

## Step 5: Set Up Webhook
1. In Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess`
4. Select event: `checkout.session.completed`
5. Copy the **Webhook Secret** (starts with `whsec_`)
6. Set webhook secret:
```bash
firebase functions:config:set stripe.webhook_secret="whsec_YOUR_WEBHOOK_SECRET"
firebase deploy --only functions
```

## Step 6: Update Frontend Configuration
1. Add Stripe publishable key to your app
2. Update the price ID in your payment buttons

Let me create the environment configuration for you:

```javascript
// In your payment component, use this price ID:
const MASTERCLASS_PRICE_ID = "price_YOUR_PRICE_ID_HERE"
```

## Step 7: Test the Payment Flow
1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future date for expiry
3. Any 3-digit CVC
4. Test the complete flow:
   - Assessment completion
   - Payment button click
   - Stripe checkout
   - Payment success page
   - User access granted

## Step 8: Go Live
When ready for real payments:
1. Replace test keys with live keys
2. Update webhook URL to live endpoint
3. Test with real (small amount) transaction

## Payment Flow Summary
1. User completes assessment
2. Clicks "Purchase Masterclass"
3. Redirected to Stripe checkout
4. Payment processed by Stripe
5. Webhook notifies our system
6. User granted access to masterclass
7. User added to Mailchimp with "paid customer" tags

## What Happens After Payment ✅
- User record updated in Firestore with masterclass access
- User tagged in Mailchimp as "masterclass-customer" and "paid-customer"
- User redirected to success page with masterclass access
- Email automation can trigger for paid customers

## Security Features Built-in ✅
- User authentication required
- Payment verification via webhooks
- Secure API key management
- Transaction logging in Firestore

## Next Steps for You:
1. Create Stripe account
2. Get API keys and Price ID
3. Run the Firebase config commands above
4. Test payment flow
5. Go live!

## Need Help?
- Stripe docs: https://stripe.com/docs
- Test cards: https://stripe.com/docs/testing#cards
- Webhook testing: Use Stripe CLI or dashboard
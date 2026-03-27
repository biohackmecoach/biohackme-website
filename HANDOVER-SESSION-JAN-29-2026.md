# Handover Notes - January 29, 2026

## Session Summary
Worked on Stripe/Mailchimp integration fixes and explored Moltbot AI assistant setup.

---

## Completed Tasks

### 1. Stripe Webhook - DNA Package Tags Fixed ✅

**Problem**: DNA package purchases ($699) were not getting the correct Mailchimp tag.

**Root Causes Fixed**:
- Tag name mismatch: Code used `dna-package-customer` but Mailchimp had `DNA package customer`
- Detection range didn't account for GST: $699 + 10% GST = $768.90 was outside the original range

**Changes Made** (`functions/src/stripe.ts`):
```typescript
// Updated detection ranges (includes GST)
if (amountPaid >= 69000 && amountPaid <= 80000) {
  productType = 'dna-package';  // $699 + GST = $768.90
} else if (amountPaid >= 2500 && amountPaid <= 3500) {
  productType = 'masterclass';  // $27 + GST = $29.70
} else if (amountPaid >= 150000) {
  productType = 'coaching-program';  // $1500 + GST = $1650
}

// Simplified to ONE tag per product (user's request)
const productTags = {
  'masterclass': ['masterclass-customer'],
  'dna-package': ['DNA package customer'],  // Exact Mailchimp tag name
  'coaching-program': ['coaching-customer'],
  'other': ['paid-customer']
};
```

**Deployed**: Firebase Functions updated and live.

### 2. Mailchimp Automation for DNA Package ✅

**User set up in Mailchimp**:
- Trigger: Tag `DNA package customer` added
- Action: Send welcome email ("I'll be in touch to get more details")

**Flow**:
```
Stripe Payment → Webhook → Firebase Function → Mailchimp Tag → Automation Email
```

---

## Stripe Products Reference

| Product | Price | Price ID | Detection Range |
|---------|-------|----------|-----------------|
| DNA Coaching Package | $699 AUD | `price_1SVl9mS7I1xax6zdO0zK7OFL` | $690-$800 |
| Biohacking Masterclass | $27 AUD | `price_1STUmxS7I1xax6zddXflIEHc` | $25-$35 |
| Optimise Your Life | $1,500 AUD | `price_1S2VOSS7I1xax6zdDxxCJPj2` | $1,500+ |

---

## Moltbot AI Assistant (Partially Set Up)

**What is it**: Personal AI assistant that connects to WhatsApp, Telegram, Discord, etc.

**Installed at**: `/Users/camilla/moltbot-assistant`

**Status**:
- ✅ Repository cloned
- ✅ Dependencies installed (`pnpm install`)
- ✅ Built (`pnpm build`)
- ❌ Onboarding not completed (requires interactive Terminal session)

**To complete setup later**:
```bash
cd /Users/camilla/moltbot-assistant
pnpm moltbot onboard --install-daemon
```

**Easier alternatives**:
1. Download macOS app from https://molt.bot
2. One-click deploy to Railway: https://railway.app/template/moltbot

---

## AWS Setup (Not Completed)

**User's AWS Account**: 319255955539 (Camilla Thompson)

**What was attempted**: Deploy Moltbot to AWS EC2 for security isolation

**Status**: AWS CLI downloaded but not installed (requires sudo password in Terminal)

**To complete later**:
```bash
# Install AWS CLI
sudo installer -pkg /tmp/AWSCLIV2.pkg -target /

# Then configure
aws configure
# Enter: Access Key, Secret Key, Region (ap-southeast-2), Output (json)
```

---

## Previous Session Fixes (Still Active)

From earlier in this session:
- ✅ SEO canonical URLs fixed (BlogPostPage.tsx, BiohackAssessmentPage.tsx)
- ✅ Mobile responsiveness fixed on Talks page
- ✅ Firebase redirects added (/privacy, /biohack-assessment)
- ✅ npm vulnerabilities reduced (40 → 37)
- ✅ Videos folder gitignored (too large for Git)

---

## Files Modified This Session

| File | Change |
|------|--------|
| `functions/src/stripe.ts` | Fixed DNA tag name + GST detection range |

---

## Environment Info

- **Node.js**: v24.6.0
- **pnpm**: v10.23.0
- **Firebase Project**: biohackme-app-379de
- **Webhook URL**: `https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess`

---

## Next Steps (When Ready)

1. **Test DNA purchase flow**: Make a test purchase to verify tag + email automation
2. **Complete Moltbot setup**: Run onboarding wizard in Terminal (or use macOS app)
3. **AWS deployment**: Optional - install AWS CLI and deploy to EC2

---

## Quick Commands Reference

```bash
# Deploy Firebase Functions
cd "/Users/camilla/biohackme-ai-business-team 3"
firebase deploy --only functions

# Build and deploy website
npm run build && firebase deploy --only hosting

# Run Moltbot (when set up)
cd /Users/camilla/moltbot-assistant
pnpm moltbot gateway --verbose
```

---

*Generated: January 29, 2026*

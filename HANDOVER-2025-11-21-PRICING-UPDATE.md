# BioHackMe Pricing Update - November 21, 2025

## DNA Coaching Package Price Change

### Summary
Updated DNA Methylation Testing Package pricing from **$599 to $699**

---

## Changes Made

### Files Modified

#### 1. DNAPackagePage.tsx (`src/pages/DNAPackagePage.tsx`)
**Meta Tags Updated:**
- Title: `DNA Methylation Testing Australia $699`
- Description: `$699 Australia-wide`
- Open Graph title: `DNA Methylation Testing Package $699`
- Twitter title: `DNA Methylation Testing Australia $699`
- Product price amount: `699`

**Schema.org Structured Data:**
- Offer price: `"price": "699"`
- FAQ question: `What's included in the $699 DNA testing package?`
- FAQ answer: `The $699 package includes...`

**Visible Pricing (2 locations):**
- Hero section: `$699`
- Bottom CTA: `$699`

**Stripe Payment Links (2 locations):**
- Updated from: `https://buy.stripe.com/7sY28tdEFbKy19h7aS5Ne04`
- Updated to: `https://buy.stripe.com/4gMaEZ589eWKdW3fHo5Ne07`

#### 2. HomePage.tsx (`src/pages/HomePage.tsx`)
**Schema.org:**
- DNA Methylation Testing Package offer price: `"price": "699"`

#### 3. CoachingServicesPage.tsx (`src/pages/CoachingServicesPage.tsx`)
**Meta Tags:**
- Description: `DNA testing from $699`
- Open Graph description: `DNA packages from $699`

**Schema.org:**
- DNA Methylation Package offer price: `"price": "699"`

**FAQ:**
- Answer text: `Our DNA Methylation Package costs $699 + GST`

**Visible Pricing:**
- Price display: `$699 + GST`

---

## Stripe Configuration

### New Payment Details
- **Price ID:** `price_1SVl9mS7I1xax6zdO0zK7OFL`
- **Payment Link:** `https://buy.stripe.com/4gMaEZ589eWKdW3fHo5Ne07`
- **Amount:** $699 AUD
- **Product:** DNA Methylation Testing Package

### Old Payment Link (Replaced)
- **Old Link:** `https://buy.stripe.com/7sY28tdEFbKy19h7aS5Ne04`
- **Old Amount:** $599 AUD

---

## Deployment Details

### Build Process
```bash
npm run build
```
- Build time: ~2.3 seconds
- Bundle size: ~2.4 MB total
- No errors or warnings

### Deployment
```bash
firebase deploy --only hosting
```

**Deployed to:**
- ✅ https://biohackme-com-au.web.app
- ✅ https://biohackme-app-379de.web.app

**Deployment Status:** Successfully completed

---

## Testing Checklist

### Pre-Deployment ✅
- [x] All $599 instances found and updated to $699
- [x] Meta tags updated (SEO)
- [x] Schema.org structured data updated
- [x] FAQ text updated
- [x] Visible prices updated
- [x] Stripe payment links updated
- [x] Build successful

### Post-Deployment ✅
- [x] Website accessible
- [x] New pricing visible on DNA package page
- [x] Stripe payment link working
- [x] Buy Now buttons functional

---

## Search Terms Updated

All instances of the following were updated across the site:
- `$599` → `$699`
- `599` (in schema/meta) → `699`
- Old Stripe link → New Stripe link

---

## SEO Impact

### Pages Affected
1. DNA Package Page (`/dna-package`)
2. Home Page (`/`)
3. Coaching Services Page (`/coaching`)

### SEO Elements Updated
- Page titles
- Meta descriptions
- Open Graph tags
- Twitter card tags
- Schema.org Product markup
- Schema.org FAQ markup

---

## Project Information

**Project Path:** `/Users/camilla/biohackme-ai-business-team 3`

**Firebase Project:** `biohackme-app-379de`

**Git Status:** Changes ready to commit (if needed)

---

## Quick Reference

### Development
```bash
cd "/Users/camilla/biohackme-ai-business-team 3"
npm run dev
```

### Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

### Rollback (if needed)
Previous pricing was $599. To rollback:
1. Search for `699` in the three modified files
2. Replace with `599`
3. Update Stripe link back to old link
4. Rebuild and redeploy

---

## Notes

- User updated Stripe pricing configuration separately
- All website pricing now matches Stripe at $699
- No other functionality changed
- Site performance unaffected

---

**Update completed and deployed successfully! ✅**

*Last updated: November 21, 2025*

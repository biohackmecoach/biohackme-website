# Handover Notes - February 5, 2026

## Session Summary

Major updates to TheUpgradePage.tsx, Firestore backup across all forms, Well Leader pricing update, and site-wide color consistency fixes.

---

## Changes Made (In Order)

### 1. Firestore Backup for ALL Forms
**Files changed:**
- `src/utils/mailchimp.ts` - Added `backupToFirestore()` utility function
- `src/pages/TheUpgradePage.tsx` - Backup via `subscribeToMailchimp` (source: `theupgrade`)
- `src/pages/FreebiePage.tsx` - Added backup (source: `freebie-download`)
- `src/components/BiohackAssessment.jsx` - Added backup (source: `assessment-nurture`)
- `src/components/SevenPillarsAssessment.tsx` - Added backup (source: `seven-pillars-assessment`)
- `src/components/MailchimpNewsletter.tsx` - Added backup (source: `newsletter`)
- `src/components/MasterclassPreregister.tsx` - Added backup (source: `masterclass-preregister`)
- `src/pages/GuidePage.tsx` - Added backup (source: `guide-download`)
- `src/pages/PopupPage.tsx` - Added backup (source: `popup-guide-download`)

**How it works:** Every form submission now writes to Firestore `leads` collection (email, source, timestamp, extras) BEFORE calling Mailchimp. All 10 forms covered.

### 2. Apply Button - Single CTA Flow
**File:** `src/pages/TheUpgradePage.tsx`
- Hero now shows single "Apply for The Upgrade" button
- Clicking reveals email input + "Submit Application" button
- Submits to Mailchimp with tag `theupgrade`
- Shows success confirmation after submission
- Uses `showEmailForm` state to toggle

### 3. Well Leader Price Update
**Files changed:**
- `src/pages/CoachingSessionsPage.tsx` - Display price: $1,900 → **$2,500** +GST
- `src/pages/CoachingSessionsPage.tsx` - Schema markup: "1900" → "2500"
- `src/pages/HomePage.tsx` - Schema markup: "1900" → "2500"

### 4. Upgrade Page - Section Color Overhaul
**File:** `src/pages/TheUpgradePage.tsx`

Final section color scheme (top to bottom):
| # | Section | Background |
|---|---------|------------|
| 1 | Hero | `bg-ocean` (navy) |
| 2 | Mirror Moment | `bg-white` |
| 3 | Carmen Testimonial | `bg-ocean` (navy) |
| 4 | This is YOUR Upgrade | `bg-sky/10` (light blue) |
| 5 | The Upgrade Method | `bg-white` (cards are `bg-ocean`) |
| 6 | This is for you if | `bg-ocean` (navy, white text, glass cards) |
| 7 | What's Included | `bg-gradient ocean→sky` |
| 8 | Why Only 10 People | `bg-sky/10` (light blue) |
| 9 | What If This Doesn't Work | `bg-ocean` (navy, white text) |
| 10 | About Camilla | `bg-white` |
| 11 | Testimonials | `bg-sky/10` (light blue) |
| 12 | Investment + Final CTA | `bg-gradient ocean→sky` |
| 13 | FAQ | `bg-white` (cards `bg-sky/10`) |

### 5. Value Stack - Color Swap
**File:** `src/pages/TheUpgradePage.tsx`
- Total program value ($5,794) - now on blue box (`bg-sky/30`, rounded top)
- Your investment ($4,500) - now on white box (rounded bottom, shadow, ocean text)

### 6. Mobile Optimization
**File:** `src/pages/TheUpgradePage.tsx`
- What's Included items: stacked layout on mobile (icon+text above, value below)
- Price text: `text-3xl sm:text-5xl` scaling
- Section padding: `py-12 md:py-20` (reduced from py-32)
- CTA buttons: smaller padding and font on mobile
- Value stack box: responsive padding and font sizes

### 7. Banner Size Reduction
**File:** `src/pages/TheUpgradePage.tsx`
- Hero: `min-h-[70vh]` → `min-h-[55vh]`, tighter padding
- All sections: `md:py-32` (128px) → `md:py-20` (80px)
- What's Included heading: `text-5xl` → `text-4xl`, reduced margins

---

## Current State of Key Files

### TheUpgradePage.tsx (~949 lines)
- Single-button email capture → Mailchimp (tag: `theupgrade`)
- Firestore backup via `subscribeToMailchimp`
- 13 sections with alternating navy/light blue/white backgrounds
- Value stack split into blue top / white bottom boxes
- Mobile-optimized throughout
- Bottom CTA: "Buy Your Upgrade" → Stripe link
- Second CTA: "Let's Talk About Your Upgrade" → Calendly

### Brand Colors (Tailwind)
- `ocean: #022D4E` (primary navy)
- `sky: #8FC1E3` (medium blue)
- `ice: #f8fafc` (very light blue)
- `cloud: #F3F5F6` (off-white)
- `charcoal: #161616` (dark text)

### Mailchimp Integration
All 10 forms working and tested:
1. TheUpgradePage - `subscribeToMailchimp` (tag: theupgrade)
2. FreebiePage - `subscribeToNewsletter` (tags: guide-download)
3. GuidePage - `subscribeToNewsletter` (tags: guide-download)
4. PopupPage - `subscribeToNewsletter` (tags: guide-download, meta-ads-lead)
5. BiohackAssessment - `completeAssessment` (tag: assessment-nurture)
6. SevenPillarsAssessment - `completeAssessment` (tag: seven-pillars-assessment)
7. SleepAssessment - `subscribeToMailchimp` (tag: sleep-assessment)
8. EnvironmentAssessment - `subscribeToMailchimp` (tag: environment-assessment)
9. MailchimpNewsletter - `subscribeToNewsletter` (tag: newsletter)
10. MasterclassPreregister - `subscribeToMasterclass` (tag: masterclass-preregister)

All 10 also backup to Firestore `leads` collection.

### Sitemap
`public/sitemap.xml` - includes all coaching pages:
- `/coaching`, `/coaching-sessions`, `/the-upgrade`, `/dna-package`, `/sleep-assessment`, `/environment-assessment`

---

## Deployment
- Build: `npm run build` (Vite, ~4s)
- Deploy: `firebase deploy --only hosting`
- Targets: `biohackme-app-379de` + `biohackme-com-au`
- Live: https://www.biohackme.com.au

---

## Known Issues / Notes
- Browser caching can delay visibility of changes - hard refresh (Cmd+Shift+R) needed
- Browserslist data is 6 months old (cosmetic warning, no impact)
- `bg-sky/10` uses Tailwind opacity modifier on custom color - works correctly
- THE UPGRADE logo is a JPG (`/public/images/the-upgrade-logo.jpg`) - cropped version from Desktop

# Handover Notes - February 6, 2026

## Session Summary

Major restructuring of TheUpgradePage.tsx - section reordering, content updates, and added 3 lifestyle images.

---

## Changes Made (In Order)

### 1. About Camilla - Converted to Bullet Points
**File:** `src/pages/TheUpgradePage.tsx`
- Shortened from 4 paragraphs to bullet point credentials
- ICF Coach, Nutritionist, Author, Award, Media features

### 2. FAQ - Converted to Accordion
**File:** `src/pages/TheUpgradePage.tsx`
- Added `openFaq` state with ChevronDown icon
- Click to expand/collapse each question
- Shortened answers to 1-2 lines each

### 3. Section Reordering
**File:** `src/pages/TheUpgradePage.tsx`
- Moved "This is for you if" ABOVE "The Upgrade Method"
- Moved Carmen testimonial to AFTER "This is YOUR Upgrade"

### 4. Color Panel Fixes
Fixed alternating backgrounds for proper visual flow:
| # | Section | Background |
|---|---------|------------|
| 1 | Hero | navy (bg-ocean) |
| 2 | Mirror Moment | white |
| 3 | This is YOUR Upgrade | light blue (bg-sky/10) |
| 4 | Carmen Testimonial | navy |
| 5 | This is for you if | white |
| 6 | The Upgrade Method | navy |
| 7 | What's Included | gradient |
| 8 | Why Only 10 | white |
| 9 | About Camilla | light blue |
| 10 | Testimonials | white |
| 11 | Investment CTA | gradient |
| 12 | FAQ | light blue |

### 5. Camilla's Quote Added to Method Section
**File:** `src/pages/TheUpgradePage.tsx`
- Added: "I've reduced my own biological age by 11 years through simple foundational biohacks. I know this works."
- Placed at bottom of The Upgrade Method section in glass-effect box

### 6. Copy Updates
- "Build" phase → "Optimise"
- Method intro: "This is a 3-phase system I have developed to achieve real, measurable results."
- "This is the upgrade" → "This is the UPGRADE"
- "By application only." moved to separate line with ocean color

### 7. Three Lifestyle Images Added
**New files in `/public/images/`:**
- `the-upgrade-hero.jpg` - Man with green smoothie
- `the-upgrade-runner.jpg` - Woman running
- `the-upgrade-fitness.jpg` - Yoga mat, water bottle, dumbbell

**Placement:**
1. **Mirror Moment section** ("Are you ageing faster...") - Man with smoothie, left side
2. **"This is for you if" section** - Woman running, right side
3. **"Why Only 10" section** - Fitness equipment, right side (image first on mobile)

All images use:
- `aspect-square` for clean square crop
- `rounded-2xl` for modern rounded corners
- Two-column grid layout with text
- Responsive stacking on mobile

---

## Current Section Order (Top to Bottom)

1. Hero (navy) - Logo, headline, email signup
2. Mirror Moment (white) - "Are you ageing faster" + man with smoothie image
3. This is YOUR Upgrade (light blue) - Program intro + test cards
4. Carmen Testimonial (navy) - KPMG quote
5. This is for you if (white) - 4 qualification points + runner image
6. The Upgrade Method (navy) - 3 phases + Camilla's 11-year quote
7. What's Included (gradient) - Package items + value stack
8. Why Only 10 (white) - Exclusivity + fitness image (image first on mobile)
9. About Camilla (light blue) - Bullet credentials
10. Testimonials (white) - 3 client cards
11. Investment + Final CTA (gradient) - $4,500, Stripe + Calendly buttons
12. FAQ (light blue) - Accordion style

---

## File Summary

### TheUpgradePage.tsx (~970 lines)
- Email capture with `showEmailForm` state
- FAQ accordion with `openFaq` state
- 3 lifestyle images in two-column layouts
- All sections with proper alternating backgrounds

### New Images
- `/public/images/the-upgrade-hero.jpg`
- `/public/images/the-upgrade-runner.jpg`
- `/public/images/the-upgrade-fitness.jpg`

---

## Deployment
- Build: `npm run build` (Vite, ~4s)
- Deploy: `firebase deploy --only hosting`
- Live: https://www.biohackme.com.au/the-upgrade

---

## Notes
- Browser caching - hard refresh (Cmd+Shift+R) needed to see changes
- Mobile ordering: "Why Only 10" image appears before text on mobile using Tailwind `order-1 md:order-2`
- All images are square aspect ratio for consistency

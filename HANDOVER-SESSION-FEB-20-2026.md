# Handover Notes — Feb 20, 2026

## Session Summary
Created QR code landing pages for BiohackMe — a hidden `/links` hub page and a `/coaching-programs` sub-page.

## What Was Done

### 1. Created `/links` — LinksPage.tsx
- **New file:** `src/pages/LinksPage.tsx`
- Hidden landing page (noindex, nofollow) for QR code scanning
- Hero with Camilla's name/tagline + social follow icons (Instagram, Facebook, YouTube, LinkedIn, TikTok)
- 6 offering cards in 2-col mobile / 3-col desktop grid:
  1. My Book → `/my-book`
  2. Free Guide → `/freebie`
  3. Speaking & Talks → `/talks`
  4. Coaching Programs → `/coaching-programs`
  5. Masterclass → `/masterclass`
  6. Retreats → `https://www.livewelllongerretreats.com/` (external link)
- Uses lucide-react icons, framer-motion animations, ocean/ice/cloud theme

### 2. Created `/coaching-programs` — CoachingLinksPage.tsx
- **New file:** `src/pages/CoachingLinksPage.tsx`
- Similar layout to LinksPage but focused on coaching
- 4 coaching program cards in 2-col grid:
  1. Optimise Your Life → `/optimise-your-life`
  2. The Upgrade → `/the-upgrade`
  3. DNA Package → `/dna-package`
  4. Coaching Sessions → `/coaching-sessions`
- Also noindex, nofollow

### 3. Modified `src/App.tsx`
- Added lazy imports for `LinksPage` and `CoachingLinksPage`
- Added routes: `/links` and `/coaching-programs`

### 4. Modified `firebase.json`
- Added explicit rewrites for `/links` and `/coaching-programs` to `index.html` in BOTH hosting configs (biohackme-app-379de and biohackme-com-au)
- This was needed because the catch-all `**` rewrite goes to a non-existent `ogMiddleware` function, causing blank screens for any new SPA routes

## Known Issue
- **Blank screen on `/links`**: The `ogMiddleware` Cloud Function referenced in firebase.json rewrites doesn't have a valid endpoint deployed. New SPA routes need explicit `/index.html` rewrites added to firebase.json to work. This is a workaround — the proper fix would be to either deploy the ogMiddleware function or replace the catch-all with a standard SPA rewrite to `index.html`.

## Files Changed
- `src/pages/LinksPage.tsx` (new)
- `src/pages/CoachingLinksPage.tsx` (new)
- `src/App.tsx` (modified — 2 lazy imports + 2 routes)
- `firebase.json` (modified — 2 rewrites added in both hosting configs)

## Deployed
- Built and deployed to Firebase Hosting (both sites)
- Live URLs:
  - `https://www.biohackme.com.au/links`
  - `https://www.biohackme.com.au/coaching-programs`

## Backup
- `backup-links-page-feb20.tar.gz` — contains LinksPage.tsx, CoachingLinksPage.tsx, App.tsx, firebase.json

## Next Steps
- Verify pages render correctly in browser (user reported blank screen — may need hard refresh or CDN cache to clear)
- Consider deploying the `ogMiddleware` function or replacing the catch-all rewrite with `index.html` fallback to avoid needing per-route rewrites
- Generate QR code pointing to `https://www.biohackme.com.au/links`
- Changes have NOT been committed to git yet

# BiohackMe Website - Backup & Handover Documentation
**Date:** 13 October 2025
**Last Deployment:** 12 October 2025, 21:24 GMT
**Project:** BiohackMe Health Coaching Website

---

## 🎯 Recent Changes Implemented

### 1. Coaching Sessions Page Updates
**File:** `src/pages/CoachingSessionsPage.tsx`

#### Changes Made:
- **Badge:** Changed from "EXECUTIVE COACHING" to "WELLBEING COACHING" (line 87)
- **Heading:** Updated from "Wellbeing Coaching for Leaders" to "Personalised Coaching Sessions" (lines 90-92)
- **Description:** Made generic (not leader-specific) to appeal to broader audience (lines 95-97)
- **Executive Coaching Card:** Replaced 15-minute check-in with "Executive Coaching - Cost TBC" (lines 222-269)
  - Badge: "EXEC"
  - Price: "TBC"
  - Features: 12-week leadership program, wellbeing survey, personalized action plan
  - Button: "ENQUIRE NOW" → /contact

#### Top 3 Service Boxes Now Show:
1. **60-Minute Session** - $285 AUD
2. **30-Minute Session** - $150 AUD
3. **Executive Coaching** - TBC

#### Detailed Programs Below:
- The Well Leader (12-week program for leaders)
- 12-Week Wellbeing Coaching Program (general)

---

### 2. Homepage SEO Optimization
**File:** `src/pages/HomePage.tsx`

#### Enhanced SEO Elements:

**Title Tag (line 24):**
```
Biohacking Coach Australia | DNA Testing & Health Optimization Sydney | Camilla
```

**Meta Description (line 25):**
```
Australia's leading biohacking coach specializing in DNA methylation testing,
MTHFR analysis & personalized health optimization. Camilla - Expert nutritionist
& longevity coach. Transform your health with data-driven biohacking strategies.
Sydney & Australia-wide.
```

**Keywords Added (30+ keywords, line 26):**
- DNA methylation testing Australia
- MTHFR testing Sydney
- COMT gene testing
- functional medicine Australia
- biological age testing
- epigenetics Australia
- sleep optimization coach
- metabolic health coach
- performance optimization coach
- red light therapy Sydney
- contrast therapy
- ice bath coaching
- breathwork coach Australia
- infrared sauna therapy
- women's health biohacking
- executive health coaching
- nationally recognised nutritionist

**Schema.org Structured Data (lines 90-136):**
- Expanded serviceType from 6 to 14 services
- Added priceRange: "$-$$"
- Added makesOffer schema with 3 service packages:
  1. DNA Methylation Testing Package - $599 AUD
  2. 3-Month Health Transformation Program
  3. Executive Wellbeing Coaching - $1,900 AUD

---

### 3. Footer Social Media Icon Fix
**File:** `src/components/Footer.tsx`

#### Changes Made (lines 13-24):
- Parent div: Added `flex flex-col items-center lg:items-start`
- Social icons: Changed spacing from `space-x-2 sm:space-x-4` to `space-x-3 sm:space-x-4`
- Result: Logo and social icons now properly centered on mobile, left-aligned on desktop

---

## 🔄 Redirect Configuration

### Active Redirects:
1. **Server-side** (firebase.json, lines 79-82):
   ```
   /coaching → /superchargeyourlife
   ```

2. **Client-side** (App.tsx, line 84):
   ```
   /superchargeyourlife → /optimise-your-life
   ```

3. **Redirect Chain:**
   ```
   /coaching → /superchargeyourlife → /optimise-your-life
   ```

**Status:** ✅ All redirects working correctly

---

## 🚀 Deployment Information

### Firebase Hosting:
- **Project ID:** biohackme-app-379de
- **Primary URL:** https://biohackme-com-au.web.app
- **Secondary URL:** https://biohackme-app-379de.web.app
- **Console:** https://console.firebase.google.com/project/biohackme-app-379de/overview

### Last Deployment:
```bash
firebase deploy --only hosting
```

**Timestamp:** 12 October 2025, 21:24 GMT

### Deployment Commands:
```bash
# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Deploy specific site
firebase deploy --only hosting:biohackme-com-au
```

---

## 💾 Cache Configuration

### Current Cache Settings (firebase.json):

**HTML Files:**
- Cache-Control: `max-age=3600` (1 hour)

**JavaScript/CSS Files:**
- Cache-Control: `max-age=31536000, immutable` (1 year)

### Cache Clearing Methods:

1. **Hard Refresh (Chrome DevTools):**
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

2. **Clear Browsing Data:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Select "Cached images and files"

3. **Cache-Busting URL:**
   ```
   https://biohackme.com.au?v=20251013
   ```

4. **Different Browser:**
   - Test in browser without existing cache

5. **Wait for CDN:**
   - HTML updates: 1 hour
   - JS/CSS updates: May take longer due to CDN

---

## 🐛 Known Issues

### 1. Video Not Loading on Homepage
**Status:** ⚠️ PENDING FIX

**User Report:** "video on homepage not loading at all"

**Action Required:**
- Investigate HomePage.tsx video element
- Check video source path
- Verify video file exists in public directory
- Test video playback
- Add fallback/poster image if needed

---

## 📁 Project Structure

```
biohackme-ai-business-team 3/
├── src/
│   ├── components/
│   │   ├── Footer.tsx                 ✅ Recently updated
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.tsx               ✅ Recently updated (SEO)
│   │   ├── CoachingSessionsPage.tsx   ✅ Recently updated
│   │   ├── OptimiseYourLifePage.tsx
│   │   ├── DNAPackagePage.tsx
│   │   └── ...
│   ├── App.tsx                        ✅ Contains redirects
│   └── main.tsx
├── public/
│   ├── images/
│   ├── logo-white.png
│   └── ...
├── firebase.json                      ✅ Hosting config
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Technical Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **SEO:** React Helmet Async
- **Animations:** Framer Motion
- **Hosting:** Firebase Hosting
- **Forms:** React Hook Form
- **Icons:** Lucide React

---

## 📊 SEO Strategy

### Goal: Front Page of Google 🎯

### Keywords Targeting:
1. **Primary:** biohacking coach Australia
2. **Secondary:** DNA methylation testing Australia
3. **Long-tail:** MTHFR testing Sydney, functional medicine Australia

### Structured Data:
- ✅ LocalBusiness schema
- ✅ Service offerings with pricing
- ✅ Breadcrumb navigation
- ✅ Organization information

### Next Steps:
1. Continue blog content creation
2. Build backlinks from health/wellness sites
3. Local SEO optimization (Google My Business)
4. Video content optimization (once fixed)

**Timeline:** 2-3 months for page 1 ranking with consistent effort

---

## 🔗 Important URLs

### Live Sites:
- **Main:** https://biohackme.com.au
- **Firebase Primary:** https://biohackme-com-au.web.app
- **Firebase Secondary:** https://biohackme-app-379de.web.app

### Social Media:
- **Instagram:** https://www.instagram.com/biohackmecoach/
- **Facebook:** https://www.facebook.com/profile.php?id=61556971331791
- **YouTube:** https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw
- **TikTok:** https://www.tiktok.com/@biohackmecoach

### Contact:
- **Email:** hello@biohackme.com.au
- **Location:** Sydney, Australia

---

## 📝 Content Guidelines

### Australian English:
- Use British/Australian spelling: optimise, personalised, organised
- Currency: AUD
- Location references: Sydney, Australia

### Brand Voice:
- Professional yet approachable
- Data-driven and science-backed
- Empowering and transformative
- Inclusive (not just for executives/leaders)

### Color Palette:
- **Ocean:** Primary brand color (dark blue)
- **Sky:** Secondary (lighter blue)
- **Ice:** Accent color (lightest blue/white)
- **White:** Text on dark backgrounds

---

## 🚨 Pending Tasks

### Immediate Priority:
1. ⚠️ **Fix video loading issue on homepage**
2. ✅ Verify all changes after cache clears (tomorrow)

### Future Enhancements:
1. Additional blog content for SEO
2. Performance optimization (video compression)
3. A/B testing for conversion optimization
4. Email capture optimization
5. Testimonials section expansion

---

## 💻 Development Commands

### Install Dependencies:
```bash
npm install
```

### Local Development:
```bash
npm run dev
```
Opens at: http://localhost:5173

### Build Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Deploy to Firebase:
```bash
firebase deploy --only hosting
```

### Check Firebase Projects:
```bash
firebase projects:list
```

---

## 🔐 Access & Credentials

**Note:** All Firebase credentials are stored in `.firebaserc` and require Google account authentication.

**Firebase CLI Login:**
```bash
firebase login
```

---

## 📞 Support Resources

### Documentation:
- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Tailwind:** https://tailwindcss.com
- **Firebase:** https://firebase.google.com/docs/hosting
- **React Router:** https://reactrouter.com

### Key Contacts:
- **Developer:** Claude Code (Anthropic AI Assistant)
- **Owner:** Camilla Thompson
- **Website:** BiohackMe.com.au

---

## 📈 Performance Metrics

### Current Status:
- ✅ Mobile-optimized
- ✅ SEO-optimized (30+ keywords)
- ✅ Schema.org structured data
- ✅ Social media integration
- ✅ Fast loading (Vite build)
- ⚠️ Video loading (needs fix)

### Lighthouse Goals:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🎉 Recent Wins

1. ✅ Coaching page restructured for broader appeal
2. ✅ World-class SEO optimization with 30+ keywords
3. ✅ Enhanced Schema.org structured data with pricing
4. ✅ Footer social icons properly centered
5. ✅ All redirects working correctly
6. ✅ Mobile-optimized responsive design
7. ✅ Fast deployment pipeline

---

## 📅 Change Log

### 12 October 2025:
- Updated CoachingSessionsPage messaging (WELLBEING COACHING)
- Added Executive Coaching card with TBC pricing
- Enhanced HomePage SEO (30+ keywords)
- Expanded Schema.org structured data
- Fixed Footer social media icon alignment
- Deployed to production

### Previous Sessions:
- Initial website setup
- Content migration
- SEO foundation
- Mobile optimization
- Firebase hosting configuration

---

## 🆘 Troubleshooting

### "Changes not visible after deployment"
**Solution:** Cache issue. Use hard refresh (DevTools method above) or wait 1 hour.

### "Redirect not working"
**Solution:** Check both App.tsx (client-side) and firebase.json (server-side). Clear cache.

### "Video not loading"
**Solution:** PENDING - needs investigation (see Known Issues section)

### "Build fails"
**Solution:**
```bash
npm install
npm run build
```
Check for TypeScript errors in terminal.

---

## 📦 Backup Information

**This Document:** HANDOVER_BACKUP_2025-10-13.md
**Location:** /Users/camilla/biohackme-ai-business-team 3/

**Contains:**
- All recent changes
- Deployment information
- Cache configuration
- Known issues
- Technical documentation
- SEO strategy
- Development commands

**Version Control:** Git repository (if initialized)

---

## ✅ Handover Checklist

- [x] CoachingSessionsPage updated with new messaging
- [x] HomePage SEO optimized with 30+ keywords
- [x] Schema.org structured data enhanced
- [x] Footer social icons centered
- [x] All changes deployed to production
- [x] Redirects verified and working
- [x] Documentation created
- [ ] Video loading issue resolved (PENDING)
- [ ] Cache cleared for user verification (waiting 24h)

---

**End of Handover Documentation**

*Built with 💙 by Camilla Thompson*
*Technical Implementation by Claude Code (Anthropic)*

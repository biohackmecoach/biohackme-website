# Project: BiohackMe React + Firebase
# Generated: 2025-02-03

## 🚨 CRITICAL GUARDRAILS
- **URL PRESERVATION**: NEVER break existing URLs - all must redirect or work
- **MOBILE-FIRST**: Start every component at 360px viewport
- **DEBUGGING**: 15 min max per issue, then implement workaround
- **CLEAN CODEBASE**: Temp files ONLY in /temp/, docs ONLY in /docs/
- **FEATURES**: Check project_plan.md before adding anything new
- **ARCHITECTURE**: These decisions are FINAL:
  - React 18 with Vite (not Create React App or Next.js)
  - TypeScript for type safety
  - Firebase services only (no other backend)
  - Tailwind CSS for styling (no other CSS frameworks)
  - Stripe for billing/subscriptions
  - Pre-rendering with react-snap for SEO
- **SCRAPING**: Content from BOTH local and live sources required
- **AI AGENTS**: Must support existing /agents/ folder structure

## 🤖 AUTOMATION SETTINGS
- Press Shift+Tab to enable auto-accept mode for this session
- Pre-approved file operations in: /src/*, /tests/*, /docs/*
- Auto-allowed: read any project file, write to /temp/
- Git operations allowed: add, commit (no push without confirmation)
- For fully autonomous work: claude --dangerously-skip-permissions

## 🎯 CURRENT SPRINT
- Focus: Security automation and monitoring setup
- COMPLETED: Stripe $27 payment integration (Nov 15, 2025)
- NEXT: GitHub Actions for security scanning and updates
- SEO Status: Awaiting content migration

## 📝 LAST SESSION (Nov 15, 2025)
- ✅ Updated Stripe payment link to $27 masterclass
- ✅ Fixed pricing from $47 to $27 launch offer
- ✅ Deployed and tested payment flow
- ✅ Created handover notes: HANDOVER-SESSION-NOV-15-2025.md
- **Backup**: backup-stripe-payment-nov15.tar.gz

## 🛑 DEVIATION PROTOCOL
Before changing course, you MUST:
1. Document why in DECISIONS.md
2. Update project_plan.md
3. Add checkpoint to todo list
4. Consider: "Is this fixing or breaking SEO?"
5. For URL changes: Create 301 redirect FIRST

## 📊 SEO CHECKPOINTS
- [ ] All pages have unique title tags
- [ ] Meta descriptions on every page
- [ ] Schema markup implemented
- [ ] XML sitemap generated
- [ ] Robots.txt configured
- [ ] Open Graph tags present
- [ ] Page speed < 2 seconds
- [ ] Core Web Vitals green
- [ ] Mobile-friendly test passed
- [ ] All images have alt text

## 📱 MOBILE CHECKPOINTS
- [ ] Works at 360px viewport
- [ ] Touch targets 44px minimum
- [ ] No horizontal scroll at any width
- [ ] Images responsive with srcset
- [ ] Forms mobile-friendly with proper input types
- [ ] Navigation usable on mobile
- [ ] Text readable without zooming
- [ ] Content prioritized for mobile
- [ ] Loading states for slow connections
- [ ] Offline fallback page

## 🔧 DEBUG PROTOCOL
Attempt 1: Try obvious fix
Attempt 2: Check different approach
Attempt 3: STOP - log issue, implement workaround
- Log to: /docs/debug-log.md
- Workaround in: /temp/workarounds/
- Create issue in project_plan.md

## 🧽 CLEANUP PROTOCOL
After EVERY debug session:
1. Move ALL test files to /temp/
2. Delete commented-out code
3. Remove console.logs
4. Consolidate duplicate files
5. Run: find . -name "*.tmp" -delete

Before EVERY commit:
1. Check no files in root that belong in subdirs
2. Verify /temp/ is in .gitignore
3. Ensure all docs are in /docs/
4. Delete any .test.js files from src/
5. Run Prettier on all files
6. Check for unused dependencies

## 🧹 CODEBASE CLEANLINESS
- ALL temporary files go in /temp/ folder (gitignored)
- Documentation ONLY in /docs/ (except README.md)
- Clean up after EVERY debugging session
- No test files in root directory
- Delete commented-out code before committing
- Consolidate similar files
- Remove console.logs before marking task complete
- One component per file, properly named
- If creating test data: /temp/test-data/
- If debugging creates files: DELETE or move to /temp/

## 📜 SCRIPT NAMING STANDARDS
ALWAYS use these exact names:
- start-app.sh - Starts the Next.js application
- stop-app.sh - Stops the application
- setup.sh - Initial project setup
- test.sh - Runs test suite
- build.sh - Builds for production
- deploy.sh - Deploys to Firebase Hosting
- clean.sh - Cleanup temporary files
- dev.sh - Development mode with hot reload
- scrape.sh - Run content scraper
NEVER: run.sh, server.sh, launch.sh, init.sh

## 🔗 URL PRESERVATION MAP
CRITICAL: These URLs must work exactly:
- / → Homepage
- /blog → Blog listing page
- /blog/* → Individual blog posts
- /contact → Contact page
- /copy-of-contact → Redirect to /about
- /freebie → Lead magnet download
- /my-book → Book sales page
- /media → Media/press page
- /superchargeyourlife → Coaching program
- /talks → Speaking engagements
- /post/* → Redirect to /blog/*

## 🤖 AI AGENT INTEGRATION POINTS
The following agents need API endpoints:
1. SEO Audit Agent - GET /api/seo/audit
2. Content Optimization Agent - POST /api/content/optimize
3. Technical SEO Agent - GET /api/seo/technical
4. Book Sales Agent - POST /api/book/track
5. Coaching Conversion Agent - POST /api/coaching/convert
6. Email Nurture Agent - POST /api/email/send
7. Social Media Agent - POST /api/social/post
8. Lead Generation Agent - POST /api/leads/capture
9. Performance Analytics Agent - GET /api/analytics/performance
10. Orchestrator Supreme - GET /api/orchestrator/status

## 📈 PERFORMANCE TARGETS
From MASTER_PLAN.md requirements:
- Domain Authority: 15 → 40 (6 months)
- Indexed Pages: 2 → 50+ (1 month)
- Organic Traffic: +500% (3 months)
- Page Speed: <2 seconds (2 weeks)
- Core Web Vitals: All Green (2 weeks)
- Book Sales: 10x increase (2 months)
- Coaching Program: 10 clients/month (3 months)

## 🔐 SECURITY REQUIREMENTS
- Firebase Security Rules configured
- Environment variables in .env.local
- API keys never in code
- CORS properly configured
- Rate limiting on APIs
- Input validation on all forms
- XSS protection enabled
- CSRF tokens for forms
- Content Security Policy headers
- HTTPS enforced

## 📝 COMMIT MESSAGE FORMAT
Use conventional commits:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- perf: Performance improvement
- test: Adding tests
- chore: Maintenance
- seo: SEO improvements
- content: Content updates

Example: "feat: implement blog post scraper with Puppeteer"

## 🚀 DEPLOYMENT CHECKLIST
Before deploying to Firebase:
- [ ] All environment variables set
- [ ] Build passes without errors
- [ ] Lighthouse score > 95
- [ ] All URLs tested
- [ ] Forms working
- [ ] Analytics configured
- [ ] Sitemap submitted
- [ ] Security headers set
- [ ] Error pages configured
- [ ] Backup created

## 📞 EMERGENCY CONTACTS
- Project questions: Check MASTER_PLAN.md
- Technical issues: Review this file
- Business goals: See /agents/README.md
- Deployment: Firebase documentation
- SEO requirements: Google Search Console

Remember: This project directly impacts business revenue. Every decision should consider SEO impact and conversion optimization.
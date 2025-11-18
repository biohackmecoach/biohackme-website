# 🚀 TERMINAL HANDOFF: BiohackMe React + Firebase Implementation

## ✅ Project Setup Complete!

The BiohackMe React + Firebase project has been successfully configured using the Ultimate Prompt Maker framework. All necessary files, scripts, and documentation have been created.

## 📁 Project Location
```bash
cd /Users/tony/biohackme-ai-business-team
```

## 🎯 Your Mission
Recreate biohackme.com.au using React 18 + Vite + Firebase with:
- 100% URL preservation for SEO
- Content scraped from local + live sources
- Mobile-first responsive design (360px minimum)
- AI agent integration for automation
- 99% SEO score target

## 📋 Quick Start Commands

### Step 1: Navigate to Project
```bash
cd /Users/tony/biohackme-ai-business-team
```

### Step 2: Read Critical Documentation
```bash
# Read guardrails first (MANDATORY)
cat CLAUDE.md

# Then read the execution prompt
cat biohackme_prompt.md

# Review the project plan
cat project_plan.md
```

### Step 3: Initial Setup
```bash
# Make scripts executable (if needed)
chmod +x scripts/*.sh
chmod +x upload.sh

# Run initial setup
./scripts/setup.sh
```

### Step 4: Start Development
```bash
# Option A: Development mode with hot reload
./scripts/dev.sh

# Option B: Scrape content first
./scripts/scrape.sh

# Option C: For autonomous work
# Press Shift+Tab to enable auto-accept mode
# Or use: claude --dangerously-skip-permissions
```

## 📂 Project Structure
```
/Users/tony/biohackme-ai-business-team/
├── 📄 Core Documentation
│   ├── biohackme_prompt.md     # Your main execution prompt
│   ├── CLAUDE.md               # Persistent guardrails (READ FIRST!)
│   ├── project_plan.md         # Detailed task checklist
│   ├── README.md               # Project overview
│   ├── MASTER_PLAN.md          # Business objectives & AI strategy
│   └── DESIGN_REQUIREMENTS.md  # Visual design specifications
│
├── 📜 Scripts (all executable)
│   ├── scripts/
│   │   ├── setup.sh           # Initial project setup
│   │   ├── dev.sh             # Development server
│   │   ├── start-app.sh       # Production server
│   │   ├── stop-app.sh        # Stop application
│   │   ├── build.sh           # Production build
│   │   ├── test.sh            # Run tests
│   │   └── scrape.sh          # Content scraper
│   └── upload.sh              # GitHub repository setup
│
├── 🎨 Design Assets
│   └── designs/
│       ├── mockups/           # Upload designs here
│       ├── screenshots/       # Reference screenshots
│       └── approved/          # Approved designs
│
├── 🤖 AI Agents (existing)
│   └── agents/
│       ├── seo-team/
│       ├── revenue-team/
│       └── content-team/
│
└── 💻 Development
    ├── src/                   # Source code
    ├── docs/                  # Documentation
    └── temp/                  # Temporary files (gitignored)
```

## 🔑 Critical Requirements

### 1. URL Preservation (MANDATORY)
Every URL from the original site MUST work:
- / → Homepage
- /blog → Blog listing
- /contact → Contact page
- /copy-of-contact → Redirect to /about
- /freebie → Lead magnet
- /my-book → Book page
- /superchargeyourlife → Coaching program
- /talks → Speaking page

### 2. Content Sources
- Local: `/Users/tony/Downloads/us.sitesucker.mac.sitesucker-pro/www.biohackme.com.au/`
- Live: `https://www.biohackme.com.au`
- Merge both sources for complete content

### 3. Mobile-First Development
- Start EVERY component at 360px viewport
- Test at: 360px, 768px, 1280px
- Touch targets minimum 44px

### 4. SEO Targets (from MASTER_PLAN.md)
- 99% SEO score
- 50+ pages indexed within 1 month
- Page speed < 2 seconds
- All Core Web Vitals green

## 🛠️ Technology Stack
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Firebase (Firestore, Functions, Hosting)
- **Billing**: Stripe Subscription API
- **Deployment**: Firebase CLI + Custom Scripts
- **Monitoring**: GCP APIs + Custom Dashboard
- **SEO**: Pre-rendering with react-snap + dynamic meta tags
- **Scraping**: Puppeteer

## 📈 First Sprint Tasks
From project_plan.md, your immediate focus:

1. **Day 1**: Project Setup
   - [ ] Initialize React 18 with Vite and TypeScript
   - [ ] Configure Firebase services
   - [ ] Set up environment variables
   - [ ] Install dependencies

2. **Day 2**: Content Scraping
   - [ ] Run `./scripts/scrape.sh`
   - [ ] Parse local HTML files
   - [ ] Scrape live site for missing content
   - [ ] Store in Firestore

## ⚠️ Important Reminders

### Before EVERY Session
1. Read CLAUDE.md for guardrails
2. Check project_plan.md for current sprint
3. Review MASTER_PLAN.md for business context

### During Development
- Mobile-first: Always start at 360px
- Debug timeout: 15 minutes max
- Clean code: temp files in /temp/, docs in /docs/
- Test URLs: Ensure all original URLs work

### After Debugging
1. Move test files to /temp/
2. Delete commented code
3. Remove console.logs
4. Run cleanup protocol

## 🚀 Automation Options

### For Faster Development
```bash
# Enable auto-accept mode for this session
# Press Shift+Tab when prompted

# Or for fully autonomous work:
claude --dangerously-skip-permissions "complete Phase 1 tasks from project_plan.md"
```

### Pre-Approved Operations
- File operations in: /src/*, /tests/*, /docs/*
- Reading any project file
- Writing to /temp/ directory
- Git add and commit (no push without confirmation)

## 📊 Success Metrics
Track these as you work:
- [ ] All URLs preserved (no 404s)
- [ ] Mobile-first at 360px
- [ ] Content migration complete
- [ ] SEO meta tags on all pages
- [ ] Forms working with Firebase
- [ ] AI agent endpoints created
- [ ] Page load < 2 seconds
- [ ] Lighthouse score > 95

## 🆘 If You Get Stuck

### Debugging Issues?
- Check CLAUDE.md Debug Protocol
- 15 minute limit then workaround
- Log to /docs/debug-log.md

### Architecture Questions?
- Consult MASTER_PLAN.md
- Review existing /agents/ implementations
- Check DESIGN_REQUIREMENTS.md

### SEO Requirements?
- See MASTER_PLAN.md KPIs
- Target 99% SEO score
- Focus on Core Web Vitals

## 🎯 Your Immediate Next Steps

1. **Navigate to project**:
   ```bash
   cd /Users/tony/biohackme-ai-business-team
   ```

2. **Read the guardrails**:
   ```bash
   cat CLAUDE.md
   ```

3. **Start with setup**:
   ```bash
   ./scripts/setup.sh
   ```

4. **Begin development**:
   ```bash
   ./scripts/dev.sh
   ```

## 📝 Final Notes

- This project directly impacts business revenue
- Every decision should consider SEO impact
- The AI Business Team depends on this foundation
- Client: Camilla Thompson (BiohackMe Coach)
- Target launch: February 15, 2025

---

**YOU ARE NOW READY TO BEGIN!**

Remember: This is not just a rebuild - it's a strategic upgrade to dominate "biohacking australia" search results and achieve 10x book sales.

Good luck! 🚀

*Generated by Ultimate Prompt Maker on 2025-02-03*
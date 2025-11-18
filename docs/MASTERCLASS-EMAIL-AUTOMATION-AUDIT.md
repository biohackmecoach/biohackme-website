# Masterclass Email Automation Audit & Setup Guide

## Overview
You have **10 masterclasses** total - 1 live, 9 coming soon. Here's what email automations you need for each.

---

## Current Masterclass Status

| Masterclass | Status | Price | Email Automation Needed |
|------------|--------|-------|------------------------|
| Biohacking Basics (Foundation) | ✅ LIVE | $47 AUD | 4 automations |
| Biohack Your Brain | 🟡 Coming Soon | $97 AUD | 2 automations |
| Biohack Your Sleep | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Environment | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Relationships | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Body | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Health | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Energy | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Mood | 🟡 Coming Soon | $97 AUD | 1 automation |
| Biohack Your Behaviour Change | 🟡 Coming Soon | $97 AUD | 1 automation |

---

## Email Automations Needed

### 1. BIOHACKING BASICS (LIVE) - 4 Automations

#### A. Assessment Completion Email ✅ EXISTS
**Trigger:** Tag `biohacking-assessment-completed` is added
**Status:** Already set up (Oct 1, 2025)
**Content:**
- Personalized assessment results
- Score and lowest pillar
- Top recommendations
- CTA to purchase Biohacking Basics Masterclass

#### B. Purchase Confirmation & Course Access ❌ MISSING
**Trigger:** Tag `masterclass-purchased` is added (OR Stripe webhook)
**Status:** NOT SET UP - CODE COMMENTED OUT
**Content:**
- Thank you for purchase
- **Course access instructions** (KEY MISSING PIECE)
- How to watch the masterclass
- What to expect
- Support email

**Where to Send Video:**
**Option 1: Embed in Email** (Not Recommended)
- Loom videos can't be fully embedded in email
- Only shows thumbnail + link

**Option 2: Send Loom Link** (RECOMMENDED)
- ✅ Email contains: "Access Your Masterclass" button
- ✅ Button links to: Loom video URL
- ✅ OR link to: `/masterclass-access` page on your website
- ✅ That page embeds the Loom video

**Option 3: Host on Your Website** (BEST)
- Create `/masterclass-access` page
- User logs in (Firebase Auth)
- Page checks if they purchased (Firestore)
- If purchased → Show all modules with Loom embeds
- If not purchased → Redirect to payment

**RECOMMENDATION:** Use Option 3 - Host on website with login

#### C. Assessment Lead Nurture Sequence ✅ EXISTS
**Trigger:** Tag `assessment-lead` is added
**Status:** Already set up (Oct 1, 2025)
**Emails:**
- Day 1: Common mistakes after assessment
- Day 3: Pillar-specific quick wins
- Day 7: Strategy call invitation

#### D. Masterclass Pre-Registration ✅ EXISTS
**Trigger:** Tag `masterclass-preregister` is added
**Status:** Already set up (Oct 1, 2025)
**Content:**
- Welcome to masterclass waitlist
- What to expect
- Notify when new masterclasses launch

---

### 2. BRAIN MASTERCLASS (Coming Soon) - 2 Automations

#### A. Brain Assessment Completion ✅ CODE FIXED TODAY
**Trigger:** Tag `biohacking-assessment-completed` + focus `brain-health`
**Status:** Code deployed Oct 5, but Mailchimp automation may not exist
**Content:**
- Brain assessment results
- Memory/cognitive recommendations
- CTA to pre-register for Brain Masterclass (coming soon)

**ACTION NEEDED:** Create Mailchimp automation for brain-specific results

#### B. "Notify Me" Pre-Registration ❌ NOT SET UP
**Trigger:** User clicks "Coming Soon - Notify Me" button
**Status:** Button exists but does nothing
**Content:**
- Thanks for your interest
- Be first to know when Brain Masterclass launches
- Early bird discount offer

**ACTION NEEDED:**
1. Make button collect email
2. Add tag `brain-masterclass-waitlist`
3. Create automation for this tag

---

### 3. ALL OTHER MASTERCLASSES (Coming Soon) - 1 Automation Each

For Sleep, Environment, Relationships, Body, Health, Energy, Mood, Behaviour Change:

#### "Notify Me" Pre-Registration ❌ NOT SET UP
**Trigger:** User clicks "Coming Soon - Notify Me" on each masterclass
**Status:** Buttons exist but do nothing
**Content:**
- Thanks for registering interest
- Notify when that specific masterclass launches
- Early bird offer

**ACTION NEEDED:**
1. Make buttons collect email + add tag (e.g., `sleep-masterclass-waitlist`)
2. Create 8 separate automations (one per masterclass)

---

## Priority Setup Tasks

### 🔴 URGENT (Before Launch)

#### 1. Biohacking Basics Purchase Email
**Why Urgent:** People are buying RIGHT NOW and getting NO email with course access

**Setup Steps:**
1. **Fix Stripe webhook** in `/functions/lib/stripe.js` (lines 106-109)
   - Uncomment Mailchimp code
   - Add user to Mailchimp with tag `masterclass-purchased`

2. **Create Mailchimp Automation:**
   - Trigger: Tag `masterclass-purchased` added
   - Email: Purchase confirmation + course access

3. **Email Content Must Include:**
   ```
   Subject: 🎉 Welcome to Biohacking Basics Masterclass!

   Hi *|FNAME|*,

   Thank you for investing in your health! Your payment has been processed.

   ACCESS YOUR MASTERCLASS:
   [Big Button: Watch Masterclass Now]
   Link: https://www.biohackme.com.au/masterclass-access

   OR direct Loom link:
   https://www.loom.com/share/[YOUR-LOOM-ID]

   WHAT'S INCLUDED:
   - 6 video modules (30 minutes total)
   - Downloadable worksheets
   - Biohacking Wheel Assessment
   - 30-Day Action Plan
   - Lifetime access

   NEXT STEPS:
   1. Watch Module 1: Welcome & My Health Story
   2. Download your Biohacking Wheel worksheet
   3. Complete the 7 Pillars Framework

   Questions? Reply to this email.

   To your health,
   Camilla
   ```

#### 2. Create `/masterclass-access` Page
**Why:** Customers need somewhere to actually WATCH the masterclass

**What to Build:**
- New page: `/src/pages/MasterclassAccessPage.tsx`
- Check if user is logged in (Firebase Auth)
- Check if user purchased (Firestore `users/{uid}/access/masterclass`)
- If yes → Show all modules with Loom embeds
- If no → "Purchase Required" message + link to buy

**Loom Embed Code:**
```tsx
<div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
  <iframe
    src="https://www.loom.com/embed/YOUR-LOOM-ID"
    frameBorder="0"
    allowFullScreen
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
  />
</div>
```

---

### 🟡 IMPORTANT (Before Promoting)

#### 3. "Coming Soon - Notify Me" Functionality
**Why:** 9 masterclasses have buttons that do nothing

**Setup Steps:**

**A. Update Brain Masterclass Button** (and others)
Currently: Just a button that does nothing
Need: Opens email capture modal

**Code to Add:**
```tsx
// In MasterclassPage.tsx
const [showNotifyModal, setShowNotifyModal] = useState(false)

<button onClick={() => setShowNotifyModal(true)}>
  Coming Soon - Notify Me
</button>

{showNotifyModal && (
  <NotifyMeModal
    masterclassId="biohack-brain"
    onClose={() => setShowNotifyModal(false)}
  />
)}
```

**B. Create NotifyMeModal Component**
- Collects: Email, First Name
- Calls Firebase Function: `subscribeToMasterclassWaitlist`
- Adds Mailchimp tag: `{masterclass-id}-waitlist`

**C. Create Mailchimp Automations**
Create 9 automations (one per coming-soon masterclass):

| Masterclass | Tag | Automation Name |
|------------|-----|-----------------|
| Brain | `brain-masterclass-waitlist` | Brain Masterclass Waitlist |
| Sleep | `sleep-masterclass-waitlist` | Sleep Masterclass Waitlist |
| Environment | `environment-masterclass-waitlist` | Environment Masterclass Waitlist |
| Relationships | `relationships-masterclass-waitlist` | Relationships Masterclass Waitlist |
| Body | `body-masterclass-waitlist` | Body Masterclass Waitlist |
| Health | `health-masterclass-waitlist` | Health Masterclass Waitlist |
| Energy | `energy-masterclass-waitlist` | Energy Masterclass Waitlist |
| Mood | `mood-masterclass-waitlist` | Mood Masterclass Waitlist |
| Behaviour Change | `behaviour-masterclass-waitlist` | Behaviour Change Masterclass Waitlist |

**Email Template for Waitlist:**
```
Subject: You're on the list for {Masterclass Name}!

Hi *|FNAME|*,

Thanks for your interest in the {Masterclass Name}!

You'll be the FIRST to know when it launches (expected Q1 2026).

WAITLIST BONUSES:
✅ Early bird pricing (save $30)
✅ Exclusive pre-launch content
✅ Priority access before public launch

In the meantime, check out Biohacking Basics:
[Link to Biohacking Basics]

Stay tuned!
Camilla
```

---

### 🟢 NICE TO HAVE (Post-Launch)

#### 4. Biohacking Basics Welcome Sequence
**Trigger:** Tag `masterclass-purchased`
**Emails:**
- Day 0: Immediate - Course access (already covered above)
- Day 1: Welcome + Getting started tips
- Day 3: Check-in + Module 3 highlight
- Day 7: Habit formation support
- Day 14: Request testimonial/feedback
- Day 30: Upgrade to coaching program offer

#### 5. Abandoned Cart Email
**Trigger:** User visits checkout page but doesn't purchase
**Timeline:** 1 hour, 24 hours, 72 hours
**Content:** Reminder + objection handling

---

## Video Hosting: Email vs Website

### ❌ DON'T: Embed Full Video in Email
**Why Not:**
- Most email clients don't support video
- Loom videos won't play inline
- Large file sizes
- Deliverability issues

### ✅ DO: Send Link to Video

**Option A: Direct Loom Link**
```
Email contains button/link →
https://www.loom.com/share/YOUR-LOOM-ID
```
**Pros:** Simple, immediate
**Cons:** Anyone with link can access, no tracking

**Option B: Link to Your Website (RECOMMENDED)**
```
Email contains button/link →
https://www.biohackme.com.au/masterclass-access →
User logs in →
Check if purchased →
Show embedded Loom videos
```
**Pros:**
- ✅ Secure (only purchasers can access)
- ✅ Track who watches
- ✅ Professional experience
- ✅ Can add worksheets, resources
- ✅ Can upsell other products

**Cons:** Need to build the page

---

## Implementation Checklist

### Phase 1: Fix Existing (This Week)
- [ ] Uncomment Stripe webhook Mailchimp code
- [ ] Create `masterclass-purchased` tag automation
- [ ] Write purchase confirmation email with access link
- [ ] Build `/masterclass-access` page
- [ ] Test purchase flow end-to-end
- [ ] Manually send course access to anyone who already purchased

### Phase 2: Coming Soon Features (This Month)
- [ ] Build `NotifyMeModal` component
- [ ] Create Firebase Function: `subscribeToMasterclassWaitlist`
- [ ] Update all 9 "Coming Soon" buttons to open modal
- [ ] Create 9 Mailchimp waitlist automations
- [ ] Test waitlist flow for each masterclass

### Phase 3: Nurture & Optimization (Next Quarter)
- [ ] Create welcome sequence for purchasers
- [ ] Set up abandoned cart emails
- [ ] Create launch announcement emails for waitlists
- [ ] Build customer testimonial request automation
- [ ] Create coaching program upsell sequence

---

## Files to Create/Update

### New Files Needed:
1. `/src/pages/MasterclassAccessPage.tsx` - Course viewing page
2. `/src/components/NotifyMeModal.tsx` - Waitlist signup modal
3. `/functions/lib/subscribeToMasterclassWaitlist.js` - Waitlist Firebase Function

### Files to Update:
1. `/functions/lib/stripe.js` - Uncomment lines 106-109, implement Mailchimp
2. `/src/pages/MasterclassPage.tsx` - Add NotifyMe modal functionality
3. `/src/App.tsx` - Add route for `/masterclass-access`

---

## Questions to Answer

1. **Where is your Loom video hosted?**
   - Need the Loom share link for Biohacking Basics Masterclass
   - Format: `https://www.loom.com/share/[VIDEO-ID]`

2. **Do you want login required for course access?**
   - Option A: Anyone with link can watch (less secure)
   - Option B: Must be logged in + purchased (more secure)
   - **RECOMMENDATION:** Option B

3. **Do you have all 6 module videos recorded?**
   - Module 1: Welcome & My Health Story
   - Module 2: WTF is Biohacking?
   - Module 3: The 7 Pillars Framework
   - Module 4: DNA, Epigenetics & Longevity
   - Module 5: Who Do You Want to Be?
   - Module 6: Future You & Next Steps

4. **Do worksheet PDFs exist?**
   - Biohacking Wheel
   - 7-Day Energy Boost Challenge
   - 7 Pillars Foundation Guide
   - DNA Testing Guide
   - Anchor & Amplify Habit Workbook
   - 30-Day Biohack Tracker

5. **When do you want to launch the other 9 masterclasses?**
   - This determines waitlist email content and urgency

---

## Estimated Time to Complete

| Task | Time Required | Priority |
|------|--------------|----------|
| Fix purchase email automation | 2 hours | 🔴 URGENT |
| Build masterclass access page | 4 hours | 🔴 URGENT |
| Test purchase flow | 1 hour | 🔴 URGENT |
| Create NotifyMe functionality | 3 hours | 🟡 Important |
| Create 9 waitlist automations | 2 hours | 🟡 Important |
| Welcome sequence emails | 3 hours | 🟢 Nice to have |
| Abandoned cart flow | 2 hours | 🟢 Nice to have |

**Total Critical Path:** ~7 hours
**Total Complete System:** ~17 hours

---

## Next Steps

1. **Provide Loom link** for Biohacking Basics Masterclass
2. **Decide:** Email with Loom link OR build access page?
3. **I can build** the masterclass access page if you want
4. **I can fix** the Stripe webhook to send purchase emails
5. **I can create** NotifyMe modal for waitlists

Let me know what you want to tackle first!

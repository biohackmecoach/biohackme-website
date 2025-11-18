# Implementation Priority Checklist

## 🔴 CRITICAL - DO BEFORE LAUNCH (7 hours)

### 1. Purchase Confirmation Email System (2 hours)
**Status:** ❌ NOT SET UP
**Impact:** Customers buying masterclass get NO email with access instructions

**Files to Update:**
- `/functions/lib/stripe.js` - Lines 106-109 (uncomment & implement)

**Steps:**
1. Uncomment Mailchimp integration code in stripe.js
2. Add users to Mailchimp with tags: `masterclass-purchased`, `paid-customer`
3. Store merge fields: Product name, purchase date, price
4. Create Mailchimp automation:
   - Trigger: Tag `masterclass-purchased` added
   - Send immediately
   - Include: Thank you, access link, support email

**Quick Alternative (15 min):**
- Enable Stripe automated emails in Dashboard → Settings → Emails
- Customize "Successful payment" template
- Add link to: https://www.biohackme.com.au/masterclass-access

---

### 2. Masterclass Access Page (4 hours)
**Status:** ❌ DOES NOT EXIST
**Impact:** Buyers have nowhere to watch purchased content

**Files to Create:**
- `/src/pages/MasterclassAccessPage.tsx`
- `/src/components/ModulePlayer.tsx` (optional)

**Files to Update:**
- `/src/App.tsx` - Add route for `/masterclass-access`

**Implementation:**
```tsx
// Check if user logged in (Firebase Auth)
// Query Firestore for user purchase: users/{uid}/purchases
// If purchased → Show all modules with Loom embeds
// If not purchased → Redirect to /payment-checkout
```

**Loom Embed Code:**
```tsx
<iframe
  src="https://www.loom.com/embed/YOUR-LOOM-ID?speed=1"
  frameBorder="0"
  allowFullScreen
  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
/>
```

---

### 3. Test Purchase Flow End-to-End (1 hour)
1. Make test purchase in Stripe test mode
2. Verify purchase confirmation email received
3. Click access link → Should load masterclass access page
4. Verify all 6 modules display with Loom videos
5. Check Mailchimp tags applied correctly
6. Verify Firestore purchase record created

---

## 🟡 IMPORTANT - BEFORE PROMOTING (5 hours)

### 4. "Coming Soon - Notify Me" Functionality (3 hours)

**Files to Create:**
- `/src/components/NotifyMeModal.tsx`
- `/functions/lib/subscribeToMasterclassWaitlist.js`

**Files to Update:**
- `/src/pages/MasterclassPage.tsx` - Add modal state and handlers

**Implementation:**

**A. NotifyMeModal Component:**
```tsx
interface NotifyMeModalProps {
  masterclassId: string
  masterclassName: string
  onClose: () => void
}

// Collect: Email, First Name
// Call Firebase Function: subscribeToMasterclassWaitlist
// Add Mailchimp tag: {masterclassId}-waitlist
```

**B. Update MasterclassPage.tsx:**
```tsx
const [showNotifyModal, setShowNotifyModal] = useState(false)
const [selectedMasterclass, setSelectedMasterclass] = useState(null)

// Change "Coming Soon" button:
<button onClick={() => {
  setSelectedMasterclass(masterclass)
  setShowNotifyModal(true)
}}>
  Coming Soon - Notify Me
</button>

{showNotifyModal && (
  <NotifyMeModal
    masterclassId={selectedMasterclass.id}
    masterclassName={selectedMasterclass.title}
    onClose={() => setShowNotifyModal(false)}
  />
)}
```

**C. Firebase Function:**
```javascript
exports.subscribeToMasterclassWaitlist = functions.https.onRequest(async (req, res) => {
  const { email, firstName, masterclassId } = req.body

  const subscriberData = {
    email_address: email,
    status: 'subscribed',
    merge_fields: { FNAME: firstName },
    tags: [`${masterclassId}-waitlist`, 'masterclass-interest']
  }

  // Add to Mailchimp...
})
```

---

### 5. Create 9 Mailchimp Waitlist Automations (2 hours)

**Automations to Create:**

| Masterclass | Tag | Email Subject |
|------------|-----|---------------|
| Brain | `brain-masterclass-waitlist` | You're on the Brain Masterclass waitlist! |
| Sleep | `sleep-masterclass-waitlist` | You're on the Sleep Masterclass waitlist! |
| Environment | `environment-masterclass-waitlist` | You're on the Environment Masterclass waitlist! |
| Relationships | `relationships-masterclass-waitlist` | You're on the Relationships Masterclass waitlist! |
| Body | `body-masterclass-waitlist` | You're on the Body Masterclass waitlist! |
| Health | `health-masterclass-waitlist` | You're on the Health Masterclass waitlist! |
| Energy | `energy-masterclass-waitlist` | You're on the Energy Masterclass waitlist! |
| Mood | `mood-masterclass-waitlist` | You're on the Mood Masterclass waitlist! |
| Behaviour Change | `behaviour-masterclass-waitlist` | You're on the Behaviour Change Masterclass waitlist! |

**Email Template:**
```
Subject: You're on the {Masterclass Name} waitlist! 🎉

Hi *|FNAME|*,

Thanks for your interest in the {Masterclass Name}!

You'll be the FIRST to know when it launches (expected Q1 2026).

WAITLIST BONUSES:
✅ Early bird pricing (save $30 AUD)
✅ Exclusive pre-launch content
✅ Priority access before public launch

Expected Launch: Q1 2026

In the meantime, check out Biohacking Basics Masterclass:
https://www.biohackme.com.au/payment-checkout?product=biohacking-foundation&price=47&currency=AUD

Stay tuned!
Camilla Barnes
Founder, BiohackMe
```

---

## 🟢 NICE TO HAVE - POST LAUNCH (5 hours)

### 6. Welcome Sequence for Purchasers (3 hours)

**Trigger:** Tag `masterclass-purchased`

**Email Journey:**
- Day 0: Purchase confirmation (covered in #1)
- Day 1: Welcome + Getting started guide
- Day 3: Check-in + Module 3 highlight
- Day 7: Habit formation support
- Day 14: Request testimonial/feedback
- Day 30: Upgrade to coaching program offer

---

### 7. Abandoned Cart Emails (2 hours)

**Trigger:** User visits `/payment-checkout` but doesn't complete purchase

**Timeline:**
- 1 hour: "Did you forget something?"
- 24 hours: "Still interested? Here's what you're missing..."
- 72 hours: "Last chance - offer expires soon"

**Implementation:** Track checkout page visits in Firebase Analytics, create segment in Mailchimp

---

## QUESTIONS TO ANSWER BEFORE STARTING

### Critical Information Needed:

1. **Loom Video URLs**
   - Module 1: Welcome & My Health Story - ?
   - Module 2: WTF is Biohacking? - ?
   - Module 3: The 7 Pillars Framework - ?
   - Module 4: DNA, Epigenetics & Longevity - ?
   - Module 5: Who Do You Want to Be? - ?
   - Module 6: Future You & Next Steps - ?

2. **Worksheet PDFs**
   - Biohacking Wheel - Exists? URL?
   - 7-Day Energy Boost Challenge - Exists? URL?
   - 7 Pillars Foundation Guide - Exists? URL?
   - DNA Testing Guide - Exists? URL?
   - Anchor & Amplify Habit Workbook - Exists? URL?
   - 30-Day Biohack Tracker - Exists? URL?

3. **Access Strategy**
   - Option A: Direct Loom link in email (simple, less secure)
   - Option B: Hosted access page with login (secure, better UX) ✅ RECOMMENDED

4. **Launch Timeline**
   - When do you want to launch the other 9 masterclasses?
   - Affects waitlist email urgency and early bird pricing

---

## ESTIMATED TIME

| Task | Time | Priority |
|------|------|----------|
| Purchase email automation | 2 hours | 🔴 URGENT |
| Masterclass access page | 4 hours | 🔴 URGENT |
| Test purchase flow | 1 hour | 🔴 URGENT |
| NotifyMe functionality | 3 hours | 🟡 Important |
| 9 waitlist automations | 2 hours | 🟡 Important |
| Welcome sequence | 3 hours | 🟢 Nice to have |
| Abandoned cart | 2 hours | 🟢 Nice to have |

**Total Critical Path:** 7 hours
**Total Complete System:** 17 hours

---

## NEXT STEPS

**I can start working on any of these immediately. Which would you like me to tackle first?**

**My Recommendation:**
1. Fix purchase email system (2 hours) - Quick win, stops customers from being confused
2. Build masterclass access page (4 hours) - Gives buyers somewhere to watch content
3. Test everything works (1 hour) - Verify the flow
4. Then move to waitlist functionality

**OR if you prefer the quick option:**
- Enable Stripe automated emails (15 min) - Temporary solution
- Build access page (4 hours)
- Then fix proper Mailchimp integration later

Let me know what you'd like to prioritize!

# Masterclass Waitlist Email Automation Setup

## Overview

When users click "Coming Soon - Notify Me" on any masterclass, they should:
1. Get added to Mailchimp with a waitlist tag
2. Receive a "You're on the waitlist!" email
3. Get notified when that masterclass launches

---

## Current Status

❌ **NOT SET UP YET** - The "Coming Soon - Notify Me" buttons don't currently do anything

We need to:
1. Make the buttons functional
2. Create 9 Mailchimp automations (one per masterclass)

---

## Step 1: Create Mailchimp Waitlist Automations

You need to create **9 separate automations** in Mailchimp:

### Automation #1: Brain Masterclass Waitlist

1. **In Mailchimp:**
   - Click **Automations** > **Create** > **Custom**
   - Choose **Send email when tag is added**
   - Trigger tag: `brain-masterclass-waitlist`
   - Name: "Brain Masterclass Waitlist"

2. **Email Settings:**
   - Send immediately (no delay)
   - Only send once per subscriber

3. **Email Template:**

**Subject:** 🧠 You're on the Brain Masterclass waitlist!

**Body:**
```
Hi *|FNAME|*,

Thanks for your interest in the Biohack Your Brain Masterclass! 🧠

You're now on the exclusive waitlist and you'll be the FIRST to know when it launches.

WHAT'S COMING:
✅ Memory optimization techniques
✅ Cognitive performance hacks
✅ Brain nutrition essentials
✅ Neuroplasticity strategies
✅ Focus and concentration tools

EXPECTED LAUNCH: Q1 2026

WAITLIST BONUSES:
🎁 Early bird pricing - save $30 AUD
🎁 Exclusive pre-launch content
🎁 Priority access before public launch

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IN THE MEANTIME...

Start your biohacking journey TODAY with Biohacking Basics:

[BUTTON: Get Biohacking Basics - $47 AUD]
Link: https://www.biohackme.com.au/payment-checkout?product=biohacking-foundation&price=47&currency=AUD

Perfect foundation before the Brain Masterclass launches!

Stay tuned,
Camilla Barnes
Founder, BiohackMe

P.S. We'll send you exclusive brain health tips while you wait 💡
```

4. **After Email Sent:**
   - Add tag: `brain-waitlist-email-sent`

---

### Automation #2-9: Repeat for Other Masterclasses

Create the same automation for each masterclass:

| Masterclass | Trigger Tag | Email Subject |
|------------|-------------|---------------|
| Sleep | `sleep-masterclass-waitlist` | 😴 You're on the Sleep Masterclass waitlist! |
| Environment | `environment-masterclass-waitlist` | 🌿 You're on the Environment Masterclass waitlist! |
| Relationships | `relationships-masterclass-waitlist` | 💕 You're on the Relationships Masterclass waitlist! |
| Body | `body-masterclass-waitlist` | 💪 You're on the Body Masterclass waitlist! |
| Health | `health-masterclass-waitlist` | 🏥 You're on the Health Masterclass waitlist! |
| Energy | `energy-masterclass-waitlist` | ⚡ You're on the Energy Masterclass waitlist! |
| Mood | `mood-masterclass-waitlist` | 😊 You're on the Mood Masterclass waitlist! |
| Behaviour Change | `behaviour-masterclass-waitlist` | 🎯 You're on the Behaviour Change Masterclass waitlist! |

**Email Template (adjust for each topic):**

Replace the "WHAT'S COMING" section with relevant content for each masterclass:

- **Sleep:** Sleep optimization, circadian rhythm, recovery techniques
- **Environment:** Toxin reduction, air quality, lighting optimization
- **Relationships:** Connection strategies, communication tools, boundary setting
- **Body:** Movement, fitness, body composition optimization
- **Health:** Disease prevention, longevity, immune system
- **Energy:** Mitochondrial health, ATP production, fatigue elimination
- **Mood:** Emotional regulation, neurotransmitter balance, mental wellness
- **Behaviour Change:** Habit formation, willpower, lasting transformation

---

## Step 2: Make "Coming Soon" Buttons Functional

Currently the buttons don't work. I need to add functionality.

**Options:**

### Option A: Simple Email Capture (Quick - 30 min)

Make buttons open a modal that collects:
- Email address
- First name
- Calls Firebase Function to add to Mailchimp

### Option B: Link to Pre-Registration Page (Easier - 5 min)

Change buttons to link to a Google Form or Mailchimp signup form.

**Which do you prefer?**

---

## Quick Setup: Using Mailchimp Signup Forms

**If you want this live in 5 minutes:**

### For Each Masterclass:

1. **Create Mailchimp Signup Form:**
   - In Mailchimp: **Audience** > **Signup forms** > **Form builder**
   - Create embedded form
   - Add hidden field that sets tag (e.g., `brain-masterclass-waitlist`)
   - Get the form URL

2. **Update Button Links:**
   - Change "Coming Soon - Notify Me" buttons to link to form
   - E.g., `https://mailchimp.com/signup-forms/brain-waitlist`

**Pros:** Live in 5 minutes, no code needed
**Cons:** Takes users away from your site

---

## Better Setup: On-Site Email Capture Modal

**I can build this for you (30 minutes):**

### What I'll Create:

1. **NotifyMeModal Component**
   - Pops up when user clicks "Coming Soon - Notify Me"
   - Collects email + first name
   - Sends to Firebase Function
   - Shows success message

2. **Firebase Function**
   - Adds user to Mailchimp
   - Applies correct waitlist tag
   - Returns success/error

3. **Update MasterclassPage.tsx**
   - Add modal functionality to all 9 buttons
   - Pass correct masterclass ID to modal

**Should I build this now?**

---

## Testing Checklist

After setup, test each automation:

- [ ] Manually add tag `brain-masterclass-waitlist` to test email
- [ ] Verify email received within 2 minutes
- [ ] Check all links work
- [ ] Verify merge fields populate (name)
- [ ] Test on mobile device
- [ ] Repeat for all 9 masterclasses

---

## Quick Start Guide

**To get this live TODAY:**

**Option 1: Mailchimp Forms (5 min per masterclass)**
1. Create 9 Mailchimp signup forms
2. Update button links
3. Create 9 automations
4. Test

**Option 2: Custom Modal (30 min total + your automation setup)**
1. I build NotifyMeModal component
2. I create Firebase Function
3. You create 9 Mailchimp automations
4. Test

**Which option do you prefer?**

---

## What Happens After Launch

When you're ready to launch a masterclass:

1. **Notify the Waitlist:**
   - Create Mailchimp campaign
   - Send to segment with tag `brain-masterclass-waitlist`
   - Email: "It's here! Brain Masterclass is LIVE"
   - Include early bird discount code

2. **Update Website:**
   - Change status from "Coming Soon" to "Available Now"
   - Update button to "Get Instant Access"
   - Link to payment checkout

---

## Next Steps

**Tell me:**
1. Do you want the quick Mailchimp form option or custom modal?
2. Should I build the NotifyMeModal component now?
3. Or do you want to manually create the 9 Mailchimp forms first?

I can have the custom modal built and deployed in 30 minutes, then you just need to create the 9 Mailchimp automations (about 15 min each = 2.5 hours total).

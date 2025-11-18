# $47 Biohacking Basics Purchase Email - Quick Setup

## What Happens Now When Someone Pays $47

✅ Payment processes via Stripe
✅ Access granted in Firestore database
✅ User automatically added to Mailchimp with tag: `masterclass-customer`
❌ **NO EMAIL SENT** ← This is what we're fixing!

---

## Step-by-Step: Create Mailchimp Automation (15 minutes)

### 1. Log into Mailchimp

- Go to mailchimp.com
- Log in
- Select audience: **e84f95f298**

### 2. Create New Automation

1. Click **Automations** in left menu
2. Click **Create**
3. Choose **Custom**
4. Select **Send email when tag is added**

### 3. Set Up Trigger

**Trigger Settings:**
- Tag: `masterclass-customer`
- Workflow name: "Biohacking Basics Purchase Confirmation"
- Send: Immediately (no delay)
- Who can enter: All subscribers (no filters needed)

Click **Begin**

### 4. Design Email

Click **Design Email**

**Email Settings:**
- Email name: "Masterclass Access Email"
- Subject line: `🎉 Welcome to Biohacking Basics Masterclass!`
- Preview text: `Your masterclass + resources inside`
- From name: Camilla Barnes
- From email: hello@biohackme.com.au (or your preferred email)

### 5. Email Template

**Use this template - copy and paste into Mailchimp:**

```
Hi *|FNAME|*,

🎉 Thank you for investing in your health!

Your payment has been processed and you now have LIFETIME ACCESS to the Biohacking Basics Masterclass.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📺 WATCH YOUR MASTERCLASS:

[INSERT BIG BUTTON HERE]
Button text: "Access Masterclass Now"
Button link: [YOUR LOOM VIDEO URL]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 INSIDE THE MASTERCLASS:

Module 1: Welcome & My Health Story
Module 2: WTF is Biohacking?
Module 3: The 7 Pillars Framework
Module 4: DNA, Epigenetics & Longevity
Module 5: Who Do You Want to Be?
Module 6: Future You & Next Steps

Total Time: 30 minutes of transformation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 YOUR NEXT STEPS:

1. Click the button above to watch Module 1
2. Take notes on what resonates with you
3. Complete the action steps at the end
4. Start your 30-day biohacking journey!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ QUESTIONS?

Reply to this email - I'm here to support your journey!

To your health,
Camilla Barnes
Founder, BiohackMe
www.biohackme.com.au

P.S. Want to go deeper? I offer 1:1 coaching for personalized biohacking strategies. Reply "COACHING" to learn more.
```

### 6. Design the Button

In Mailchimp email editor:

1. Add a **Button** block
2. Button text: **Access Masterclass Now** or **Watch Masterclass**
3. Button link: `[YOUR LOOM VIDEO URL HERE]` ← **You need to provide this**
4. Button style:
   - Background color: `#0EA5E9` (sky blue) or `#1E6BB8` (ocean blue)
   - Text color: White
   - Size: Large
   - Border radius: Rounded

### 7. Save and Activate

1. Click **Save and Continue**
2. Review your email
3. **Send test email to yourself** ← IMPORTANT!
4. Check the test email:
   - Does it look good?
   - Does the button work?
   - Does Loom video play?
5. If all good, click **Start Workflow**

---

## What I Need From You

### CRITICAL: Loom Video URL

Where is your Biohacking Basics Masterclass video?

**Format should be:**
`https://www.loom.com/share/[VIDEO-ID]`

**Questions:**
1. Is it ONE long video with all 6 modules?
2. OR 6 separate videos (one per module)?
3. Do you have the Loom link ready?

**If you have 6 separate videos:**
You could either:
- Link to all 6 in the email
- Create a simple landing page with all 6 videos
- I can build a `/masterclass-access` page with all videos

---

## Testing Before Launch

### Manual Test:

1. **Add yourself to test:**
   - In Mailchimp, go to **Audience**
   - Find your email
   - Add tag: `masterclass-customer`
   - Wait 2-3 minutes
   - Check your inbox

2. **Verify:**
   - Email arrives
   - Subject line correct
   - Your name shows (not *|FNAME|*)
   - Button is clickable
   - Loom video loads and plays
   - Email looks good on mobile

3. **Remove test tag:**
   - Remove `masterclass-customer` tag from your email
   - This prevents you from entering the automation again

---

## If You Don't Have Loom URL Yet

### Option A: Simple Text Link (5 min)
Instead of button, just add:
```
Click here to access your masterclass:
https://www.loom.com/share/YOUR-VIDEO-ID
```

### Option B: Coming Soon Message (5 min)
```
Your masterclass will be delivered to your inbox within 24 hours.
Check your email tomorrow for access!
```

### Option C: I Build Access Page (30 min)
I can create a `/masterclass-access` page where:
- User logs in
- Page checks if they purchased
- Shows all 6 module videos
- Looks professional
- You can update videos anytime

**Which option do you prefer?**

---

## After Activation

Once the automation is live:

**Every time someone pays $47:**
1. Stripe processes payment ✅
2. User added to Mailchimp with tag `masterclass-customer` ✅
3. Mailchimp automation triggers ✅
4. Email sent immediately with Loom link ✅
5. Customer can start watching! ✅

---

## Monitoring

**Check regularly:**
- Mailchimp **Reports** > **Automations**
- View "Biohacking Basics Purchase Confirmation"
- See how many emails sent
- Check open rates
- Monitor clicks on Loom link

**Good benchmarks:**
- Open rate: 60-80% (purchase emails have high open rates)
- Click rate: 40-60% (people want to access what they paid for!)

---

## Next Action Items

**For You:**
1. [ ] Provide Loom video URL
2. [ ] Log into Mailchimp
3. [ ] Create automation with trigger `masterclass-customer`
4. [ ] Copy email template above
5. [ ] Add Loom URL to button
6. [ ] Test by adding tag to your email
7. [ ] Activate automation

**Estimated time:** 15 minutes (if you have Loom URL)

---

## Need Help?

**If you're stuck on:**
1. **Mailchimp automation creation** → Video tutorial: https://mailchimp.com/help/create-an-automation/
2. **Don't have Loom URL** → Tell me and I'll build a proper access page
3. **Want me to test it** → Give me access and I can verify it works
4. **Email design help** → I can create a better designed HTML version

**Ready to set this up?**

**Just tell me:**
- Do you have the Loom video URL? If yes, what is it?
- Do you want to set up the Mailchimp automation yourself, or need help?

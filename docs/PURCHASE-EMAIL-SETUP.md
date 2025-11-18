# Purchase Confirmation Email Setup - URGENT

## Current Status ✅

**Good news:** The Stripe webhook is ALREADY configured to add purchasers to Mailchimp!

When someone buys the Biohacking Basics Masterclass:
1. ✅ Payment processes via Stripe
2. ✅ Access granted in Firestore
3. ✅ User added to Mailchimp with tags:
   - `masterclass-customer`
   - `paid-customer`
   - `high-value-customer`

**What's Missing:** The Mailchimp automation to send the email

---

## Step-by-Step: Create Mailchimp Automation

### 1. Log into Mailchimp
- Go to mailchimp.com
- Log in to your account
- Select your audience: **e84f95f298**

### 2. Create Purchase Confirmation Automation

1. Click **Automations** in the main menu
2. Click **Create** > **Custom**
3. Choose **Send email when tag is added**
4. Set trigger tag: `masterclass-customer`
5. Name it: "Biohacking Basics Purchase Confirmation"

### 3. Email Settings

**Send Time:**
- Immediately (no delay)
- Only send once per subscriber

**Who Can Enter:**
- All subscribers with tag `masterclass-customer`
- No filters needed

### 4. Email Content Template

**Subject:** 🎉 Welcome to Biohacking Basics Masterclass!

**Preview Text:** Your masterclass access + all resources inside

**Email Body:**
```
Hi *|FNAME|*,

🎉 Thank you for investing in your health!

Your payment has been processed successfully and you now have LIFETIME ACCESS to the Biohacking Basics Masterclass.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📺 WATCH YOUR MASTERCLASS NOW:

[BIG BUTTON: Access Masterclass]
Link: [YOUR LOOM VIDEO URL HERE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 DOWNLOAD YOUR RESOURCES:

✅ Biohacking Wheel Assessment
   [Link to PDF]

✅ 7-Day Energy Boost Challenge
   [Link to PDF]

✅ 7 Pillars Foundation Guide
   [Link to PDF]

✅ DNA Testing Guide
   [Link to PDF]

✅ Anchor & Amplify Habit Workbook
   [Link to PDF]

✅ 30-Day Biohack Tracker
   [Link to PDF]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 WHAT'S INSIDE THE MASTERCLASS:

Module 1: Welcome & My Health Story (5 min)
Module 2: WTF is Biohacking? (4 min)
Module 3: The 7 Pillars Framework (6 min)
Module 4: DNA, Epigenetics & Longevity (5 min)
Module 5: Who Do You Want to Be? (4 min)
Module 6: Future You & Next Steps (6 min)

Total: 30 minutes of transformation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 NEXT STEPS:

1. Watch Module 1: Welcome & My Health Story
2. Download your Biohacking Wheel worksheet
3. Complete the 7 Pillars Framework exercise
4. Track your progress with the 30-Day Tracker

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ QUESTIONS?

Reply to this email or contact me at:
hello@biohackme.com.au

I'm here to support your biohacking journey!

To your health,
Camilla Barnes
Founder, BiohackMe

P.S. Want to go deeper? I'm opening limited spots for 1:1 coaching. Reply "COACHING" to learn more.
```

### 5. Design Tips

**Button Styling:**
- Use Mailchimp's button block
- Background color: Ocean blue (#1E6BB8) or Sky blue (#0EA5E9)
- Text: White, bold, uppercase
- Size: Large
- Text: "ACCESS MASTERCLASS NOW"

**Section Breaks:**
- Use horizontal dividers between sections
- Or use the ━━━ character for visual breaks

**Branding:**
- Add BiohackMe logo at top
- Use brand colors: Ocean (#1E6BB8), Sky (#0EA5E9)
- Font: Sans-serif, clean and modern

### 6. Add Tags After Sending

After the email is sent, automatically add tag:
- `masterclass-welcome-sent`

This helps you track who received the welcome email.

---

## What You Need to Provide

Before you can finish setting up this email, I need:

### 1. Loom Video URL
**Format:** `https://www.loom.com/share/[VIDEO-ID]`

Is it:
- One long video with all 6 modules?
- OR 6 separate Loom videos (one per module)?

### 2. PDF Download Links

Do you have these PDFs created and hosted somewhere?
- Biohacking Wheel Assessment
- 7-Day Energy Boost Challenge
- 7 Pillars Foundation Guide
- DNA Testing Guide
- Anchor & Amplify Habit Workbook
- 30-Day Biohack Tracker

**Options for hosting PDFs:**
- Upload to Google Drive (set to "Anyone with link can view")
- Upload to Dropbox (create public link)
- Host on your website (e.g., biohackme.com.au/downloads/biohacking-wheel.pdf)
- Use Firebase Storage (I can help set this up)

---

## Alternative: Simpler Version (If PDFs Don't Exist Yet)

If you don't have the PDFs ready, here's a simplified email:

**Subject:** 🎉 Your Biohacking Basics Masterclass is Ready!

```
Hi *|FNAME|*,

Thank you for purchasing the Biohacking Basics Masterclass! 🎉

Your payment has been processed and you now have lifetime access.

📺 WATCH YOUR MASTERCLASS:

[BIG BUTTON: Start Learning Now]
Link: [LOOM VIDEO URL]

Inside you'll discover:
✅ The 7 Pillars of Biohacking
✅ How to optimize your energy
✅ Simple daily habits for longevity
✅ Your personalized health roadmap

Questions? Just reply to this email.

To your health,
Camilla
```

---

## Testing the Automation

### Before Going Live:

1. **Test the automation:**
   - Go to your Mailchimp audience
   - Find your own email
   - Manually add tag `masterclass-customer`
   - Wait 2-3 minutes
   - Check if you receive the email

2. **Verify all links work:**
   - Loom video plays
   - PDFs download correctly
   - Reply email goes to correct address

3. **Check on mobile:**
   - Email displays correctly on iPhone/Android
   - Buttons are tappable
   - Images load quickly

### After Going Live:

Monitor the automation:
- Check daily for bounces or errors
- Reply to any customer questions quickly
- Update content based on feedback

---

## Current Mailchimp Environment Variables

The Firebase Function is using these:
- `MAILCHIMP_API_KEY` - Already configured
- `MAILCHIMP_AUDIENCE_ID` - Already configured (e84f95f298)

Tags being added on purchase:
- `masterclass-customer` ← **USE THIS AS TRIGGER**
- `paid-customer`
- `high-value-customer`

---

## Next Steps

**To complete this setup:**

1. ✅ Stripe webhook working (DONE)
2. ✅ Mailchimp integration active (DONE)
3. ❌ **YOU NEED TO DO:** Create Mailchimp automation with trigger `masterclass-customer`
4. ❌ **YOU NEED TO DO:** Provide Loom video URL
5. ❌ **YOU NEED TO DO:** Provide PDF download links (or confirm they don't exist yet)
6. ❌ **YOU NEED TO DO:** Test the automation

**Estimated time:** 15-30 minutes (depending on whether PDFs are ready)

---

## Quick Wins

**If you want something live TODAY:**

**Option 1: Just Loom Link (5 minutes)**
- Create simple email with just Loom video link
- No PDFs needed
- Get customers access immediately

**Option 2: Loom + Promise PDFs Later (10 minutes)**
- Send Loom link now
- Say "Workbooks coming to your inbox within 24 hours"
- Gives you time to create/upload PDFs

**Option 3: Full Experience (30 minutes)**
- Create/upload all PDFs
- Build complete email with everything
- Best customer experience

---

## Need Help?

If you need help:
1. Creating the Mailchimp automation → Watch: https://mailchimp.com/help/create-an-automation/
2. Uploading PDFs → I can set up Firebase Storage
3. Recording Loom videos → Let me know what script you need
4. Testing the flow → I can guide you step-by-step

**Let me know:**
- Do you have the Loom video URL?
- Do the PDFs exist? If so, where are they?
- Do you want me to help create a PDF hosting solution?

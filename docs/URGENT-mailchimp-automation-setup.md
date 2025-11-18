# URGENT: Mailchimp Email Automation Setup

## Problem
Users completing assessments are NOT receiving emails because Mailchimp automations haven't been created yet.

The Firebase Function is working correctly - it's adding users to Mailchimp with the right tags. But there are no automations configured in Mailchimp to send emails when these tags are added.

## What Tags Are Being Added

When users complete assessments, these tags are automatically added to their Mailchimp profile:

- `biohacking-assessment-completed` - Main trigger for assessment results email
- `assessment-lead` - Adds to nurture sequence
- `masterclass-nurture` - Masterclass promotion emails
- `focus-[pillar-name]` - Specific pillar content (e.g., `focus-brain-health`)

## Step-by-Step Setup in Mailchimp

### 1. Log into Mailchimp
- Go to mailchimp.com
- Log in to your account
- Select your audience: **e84f95f298**

### 2. Create Assessment Results Email Automation

#### Option A: Create Single Automation for All Assessments

1. Click **Automations** in the main menu
2. Click **Create** > **Custom**
3. Choose **Send email when tag is added**
4. Set trigger tag: `biohacking-assessment-completed`
5. Name it: "Assessment Results Email"

#### Email Content Should Include:
- Subject: "🎯 Your BiohackMe Assessment Results Are Here!"
- Personalized greeting using merge fields: `*|FNAME|*`
- Assessment score: `*|ASCORE|*`
- Lowest scoring pillar: `*|LOWPILLAR|*`
- Top recommendations: `*|TOPRECS|*`
- CTA to Biohacking Basics Masterclass
- Link: https://www.biohackme.com.au/payment-checkout?product=biohacking-foundation&price=47&currency=AUD

#### Settings:
- Send immediately (no delay)
- Only send once per subscriber
- Add tag after sending: `assessment-results-sent`

### 3. Create Follow-Up Nurture Sequence

Create a second automation:
1. Trigger: Tag `masterclass-nurture` is added
2. Delay: 3 days after tag added
3. Email: Masterclass benefits + testimonials
4. Delay: 4 more days (Day 7 total)
5. Email: Final reminder with urgency

### 4. Masterclass Purchase Confirmation

When someone purchases the masterclass via Stripe:
1. They should receive course access email
2. This needs to be set up in Stripe or via Firebase Function

## Merge Fields Available

These fields can be used in your email templates:

- `*|FNAME|*` - First name
- `*|LNAME|*` - Last name
- `*|EMAIL|*` - Email address
- `*|ASCORE|*` - Assessment score (percentage)
- `*|LOWPILLAR|*` - Lowest scoring pillar name
- `*|TOPRECS|*` - Top 3 recommendations (semicolon separated)

## Testing the Automations

1. Go to your live site: www.biohackme.com.au
2. Complete the Biohacking Basics Assessment with a test email
3. Check if you receive the email within 5 minutes
4. Verify merge fields populate correctly
5. Test all links in the email

## Quick Temporary Solution

If you need emails to go out TODAY before setting up automations:

1. Go to Mailchimp Audience
2. Filter by tag: `biohacking-assessment-completed`
3. Select all subscribers with this tag
4. Send a one-time email campaign with assessment results template
5. Manually send to Keith Payne and any other recent completions

## Checking Who Needs Emails

To find users who completed assessments but didn't get emails:

1. In Mailchimp, go to Audience
2. Click **Manage Audience** > **View contacts**
3. Click **New Segment**
4. Filter: Has tag `biohacking-assessment-completed`
5. AND does NOT have tag `assessment-results-sent`

These people need emails sent manually.

## For Masterclass Purchases

Currently there is NO email automation for masterclass purchases. You need to:

1. Set up Stripe webhook to notify when payment succeeds
2. Create Firebase Function to:
   - Add Mailchimp tag: `masterclass-purchased`
   - Send course access email with login details
3. Create Mailchimp automation:
   - Trigger: Tag `masterclass-purchased` added
   - Email: Welcome email + course access instructions

## Priority Actions

**BEFORE LAUNCH:**
1. ✅ Create automation for `biohacking-assessment-completed` tag
2. ✅ Test with your own email
3. ✅ Manually send emails to Keith Payne and recent users
4. Create Stripe purchase → email flow
5. Test entire flow end-to-end

## Need Help?

Mailchimp Support: https://mailchimp.com/help/
Or watch: https://www.youtube.com/watch?v=... (Mailchimp automation tutorial)


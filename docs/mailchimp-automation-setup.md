# Mailchimp Assessment Automation Setup Guide

## Overview
This guide explains how to set up automated email sequences in Mailchimp that will send personalized assessment results and masterclass CTAs to users who complete the assessments on BiohackMe.

## Current Implementation
The website currently tags users in Mailchimp with these tags when they complete assessments:
- `environment-assessment`
- `sleep-assessment`
- `brain-assessment`

## Step 1: Create Assessment Result Email Templates

### 1.1 Environment Assessment Results Email
Create an email template with:
- **Subject**: "🌿 Your Environment Optimisation Results Are Here!"
- **Content**:
  - Personalized greeting
  - Summary of their assessment results
  - Key recommendations from their assessment
  - Strong CTA to Environment Masterclass
  - Link to retake assessment: `https://www.biohackme.com.au/environment-assessment`

### 1.2 Sleep Assessment Results Email
Create an email template with:
- **Subject**: "😴 Your Sleep Optimisation Blueprint Is Ready"
- **Content**:
  - Personalized greeting
  - Summary of their sleep assessment results
  - Top sleep biohacking recommendations
  - Strong CTA to Sleep Masterclass
  - Link to retake assessment: `https://www.biohackme.com.au/sleep-assessment`

### 1.3 Brain Assessment Results Email
Create an email template with:
- **Subject**: "🧠 Your Brain Optimisation Results + Next Steps"
- **Content**:
  - Personalized greeting
  - Summary of their brain assessment results
  - Key cognitive enhancement recommendations
  - Strong CTA to Brain Masterclass or Coaching Program
  - Link to retake assessment: `https://www.biohackme.com.au/brain-assessment`

## Step 2: Set Up Automation Workflows

### 2.1 Environment Assessment Automation
1. Go to **Automations** > **Create** > **Customer Journey**
2. Set trigger: **Tag is added** > Select `environment-assessment` tag
3. Add delay: **15 minutes** (immediate follow-up)
4. Add email: Select Environment Assessment Results email template
5. Set conditions: Only send to subscribers who don't have `environment-results-sent` tag
6. Add tag: `environment-results-sent` after email is sent

### 2.2 Sleep Assessment Automation
1. Create new automation with trigger: **Tag is added** > `sleep-assessment`
2. Add 15-minute delay
3. Add Sleep Assessment Results email
4. Add condition to prevent duplicate sends
5. Tag with `sleep-results-sent`

### 2.3 Brain Assessment Automation
1. Create new automation with trigger: **Tag is added** > `brain-assessment`
2. Add 15-minute delay
3. Add Brain Assessment Results email
4. Add condition to prevent duplicate sends
5. Tag with `brain-results-sent`

## Step 3: Follow-up Masterclass Sequence

### 3.1 Create Follow-up Series (Optional Enhancement)
After the initial results email, create a 3-email nurture sequence:

**Day 1**: Assessment results (immediate)
**Day 3**: "Still struggling with [sleep/environment/brain health]?" - Educational content + masterclass CTA
**Day 7**: "Last chance to join the masterclass at early bird pricing" - Urgency + final CTA

## Step 4: Masterclass CTA Optimization

Each results email should include:
- **Clear value proposition**: What they'll learn in the masterclass
- **Urgency/Scarcity**: Limited spots or time-sensitive pricing
- **Social proof**: Testimonials or success stories
- **Direct link**: `https://www.biohackme.com.au/masterclass`
- **Personal touch**: "Based on your assessment results, this masterclass will help you..."

## Step 5: Testing and Optimization

### Testing Checklist:
- [ ] Complete each assessment with test email
- [ ] Verify automation triggers correctly
- [ ] Check email content renders properly
- [ ] Test all links work correctly
- [ ] Confirm tags are applied properly
- [ ] Test unsubscribe functionality

### Optimization:
- Monitor open rates (aim for 25%+)
- Track click-through rates (aim for 5%+)
- Monitor masterclass conversion rates
- A/B test email subject lines
- Test different CTA button text and placement

## Step 6: Advanced Segmentation (Future Enhancement)

Create segments based on assessment scores:
- **High Performers** (85%+ scores): Focus on advanced biohacking techniques
- **Moderate Performers** (50-84% scores): Focus on foundational improvements
- **Beginners** (<50% scores): Focus on basic lifestyle changes and coaching

## Technical Notes

The current Mailchimp integration uses:
- **List ID**: e84f95f298
- **User ID**: 8a04dd2b9d4f2f7e2e577c7bc
- **Source tracking**: MMERGE1 field
- **Form submission method** (not API)

For enhanced functionality, consider upgrading to Mailchimp API integration to:
- Send assessment scores and detailed results
- Better error handling and confirmation
- More sophisticated tagging and segmentation

## Monitoring and Analytics

Track these key metrics:
- Assessment completion rates
- Email open rates by assessment type
- Masterclass conversion rates from each assessment
- Revenue attribution from assessment-driven traffic
- Unsubscribe rates from assessment emails

## Troubleshooting

Common issues:
- **Emails not sending**: Check automation is active and trigger conditions
- **Wrong template**: Verify correct email template is selected in automation
- **Duplicate emails**: Ensure prevention tags are properly configured
- **Broken links**: Test all links in assessment results emails
- **Low engagement**: Review email timing, subject lines, and content relevance

## Next Steps

1. Create the email templates in Mailchimp
2. Set up the three automation workflows
3. Test with personal email addresses
4. Monitor performance for first week
5. Optimize based on engagement metrics
6. Consider upgrading to API integration for better data flow

This automation system will significantly increase masterclass signups and provide immediate value to assessment takers while they're most engaged.
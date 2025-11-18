# Mailchimp Email Tagging Verification Guide

## Overview
This guide helps you verify that the "Download Your Guide" form on the Freebie page is properly tagging emails in Mailchimp with the source "freebie-download".

## Current Implementation
The form now submits source tracking via **4 different field names** to maximize compatibility:
1. `MMERGE1` - Standard Mailchimp custom field #1
2. `MERGE1` - Alternative naming convention
3. `SOURCE` - Custom field if named "SOURCE" in Mailchimp
4. `REFERRER` - Referrer tracking field

**Source Value:** `freebie-download`

## How to Verify in Mailchimp Dashboard

### Step 1: Check if Custom Fields Exist
1. Log into your Mailchimp account
2. Go to **Audience** → **Audience dashboard**
3. Click **Settings** → **Audience fields and *|MERGE|* tags**
4. Look for a custom field that might be called:
   - "Source"
   - "Referrer"
   - "Lead Source"
   - Or any field with merge tag `MERGE1` or `MMERGE1`

### Step 2: Test a Subscription
1. Go to www.biohackme.com.au/freebie
2. Enter a test email (use one you have access to)
3. Submit the form
4. Check your email for confirmation (if double opt-in is enabled)

### Step 3: Verify the Contact in Mailchimp
1. In Mailchimp, go to **Audience** → **All contacts**
2. Search for the test email you just submitted
3. Click on the contact to view their profile
4. Check if any custom field contains "freebie-download"

## If Source Tracking Isn't Working

### Option A: Create a Custom Field (Recommended)
1. Go to **Audience** → **Settings** → **Audience fields and *|MERGE|* tags**
2. Click **Add A Field**
3. Choose **Text** field type
4. Name it "Source" or "Lead Source"
5. The merge tag will be auto-assigned (e.g., `MERGE1`, `MERGE2`, etc.)
6. Note the merge tag name
7. If it's not `MERGE1`, update line 54 in `/src/utils/mailchimp.ts` to match

### Option B: Use Mailchimp Tags (Better for Segmentation)
Tags are more flexible than custom fields. However, tags require API access (can't be set via form submission).

**To implement tags properly, you would need:**
1. Mailchimp API key
2. Backend API endpoint to handle subscriptions
3. Server-side Mailchimp API calls

### Option C: Use Mailchimp Groups
1. Go to **Audience** → **Signup forms** → **Form builder**
2. Create a new Group called "Lead Source"
3. Add options like "Freebie Download", "Contact Form", etc.
4. Get the group field name (format: `group[GROUPID][BITVALUE]`)
5. Update `mailchimp.ts` with the correct group field name

## Current Mailchimp Configuration

**Audience ID:** `e84f95f298`
**User ID:** `8a04dd2b9d4f2f7e2e577c7bc`
**List URL:** `https://biohackme.us4.list-manage.com`

## Recommended Next Steps

1. ✅ **Deploy the updated code** (includes 4 tracking methods)
2. ✅ **Test the form** with a real email submission
3. ✅ **Check Mailchimp** to see if any of the 4 field names worked
4. ⚠️ **If nothing worked:** Create a custom "Source" field in Mailchimp
5. 🚀 **For better tracking:** Consider implementing Mailchimp API integration

## Benefits of Proper Source Tracking

When working correctly, you'll be able to:
- See which leads came from the freebie download
- Segment your audience by source
- Track conversion rates from different lead magnets
- Create automated email sequences based on source
- Measure ROI of different lead generation strategies

## Testing Checklist

- [ ] Updated `mailchimp.ts` with multiple tracking methods
- [ ] Built and deployed the updated code
- [ ] Tested form submission with test email
- [ ] Checked Mailchimp for the test contact
- [ ] Verified if any custom field contains "freebie-download"
- [ ] If not working: Created custom field in Mailchimp
- [ ] Re-tested after creating custom field
- [ ] Documented which field name works in project notes

## Troubleshooting

**Issue:** Form submits but opens blank page
**Solution:** This is normal - form submission uses `target="_blank"` to avoid navigation away from your site

**Issue:** Can't find the contact in Mailchimp
**Solution:**
- Check if double opt-in is enabled (they need to confirm email first)
- Check spam folder for confirmation email
- Wait a few minutes for Mailchimp to process

**Issue:** Contact exists but no source field
**Solution:** The field name doesn't match. Create custom field in Mailchimp (see Option A above)

## Contact for Questions
If you need help with Mailchimp configuration, check:
- Mailchimp Support: https://mailchimp.com/help/
- Mailchimp API Docs: https://mailchimp.com/developer/

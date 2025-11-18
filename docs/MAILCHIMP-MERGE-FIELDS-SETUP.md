# Mailchimp Merge Fields Setup - CRITICAL FIX

## What Was Wrong

The Firebase Functions were sending merge field data (ASCORE, LOWPILLAR, TOPRECS) but:
1. The email hash was using Base64 instead of MD5 (FIXED - just deployed)
2. The merge fields don't exist in Mailchimp audience settings (YOU NEED TO FIX THIS)

## STEP 1: Create Merge Fields in Mailchimp (10 minutes)

### 1. Log into Mailchimp
- Go to: https://mailchimp.com
- Log in

### 2. Go to Audience Settings
1. Click **Audience** in the left menu
2. Click **All contacts**
3. Click **Settings** dropdown (top right)
4. Select **Audience fields and *|MERGE|* tags**

### 3. Create These Merge Fields

Click **Add A Field** for each one:

#### Field 1: Assessment Score
- **Field label:** Assessment Score
- **Field type:** Text
- **Merge tag:** ASCORE
- **Default value:** (leave blank)
- **Make this field required:** No
- **Make this field public:** No
- Click **Save Field**

#### Field 2: Lowest Pillar
- **Field label:** Lowest Scoring Pillar
- **Field type:** Text
- **Merge tag:** LOWPILLAR
- **Default value:** (leave blank)
- **Make this field required:** No
- **Make this field public:** No
- Click **Save Field**

#### Field 3: Top Recommendations
- **Field label:** Top Recommendations
- **Field type:** Text
- **Merge tag:** TOPRECS
- **Default value:** (leave blank)
- **Make this field required:** No
- **Make this field public:** No
- Click **Save Field**

### 4. Verify Fields Created

You should now see in your merge fields list:
- FNAME (already exists)
- LNAME (already exists)
- ASCORE (new)
- LOWPILLAR (new)
- TOPRECS (new)

---

## STEP 2: Add Data to Keith's Contact (5 minutes)

Since Keith already completed the assessment, you need to manually add his data:

### 1. Find Keith in Mailchimp
1. Go to **Audience** > **All contacts**
2. Search for: Keith Payne's email
3. Click on his contact

### 2. Edit His Merge Fields
1. Scroll to **Merge fields** section
2. Click **Edit**
3. Fill in the fields (you'll need to check his assessment results):
   - ASCORE: His score (e.g., "42/84" or "50%")
   - LOWPILLAR: His lowest scoring pillar (e.g., "Sleep" or "Nutrition")
   - TOPRECS: Top 3 recommendations separated by semicolons

Example:
```
ASCORE: 42/84
LOWPILLAR: Sleep
TOPRECS: Set consistent bedtime; No screens before bed; Keep room cool
```

4. Click **Save**

### 3. Manually Trigger the Automation
1. Go to **Audience** > Find Keith's contact
2. Click **Add/Remove tags**
3. Remove tag: biohacking-assessment-completed
4. Wait 5 seconds
5. Add tag: biohacking-assessment-completed
6. This will re-trigger the automation with correct merge fields

---

## STEP 3: Test With Your Own Email (5 minutes)

### 1. Add Yourself to Mailchimp
1. Go to your live website
2. Complete the assessment with a test email (your personal email)
3. Check if you receive the email

### 2. Verify Merge Fields Populated
Open the email and check:
- Does it show your actual score (not *|ASCORE|*)?
- Does it show your actual pillar (not *|LOWPILLAR|*)?
- Does it show your recommendations (not *|TOPRECS|*)?

If YES - everything is working!
If NO - continue to troubleshooting below.

---

## STEP 4: Update Your Automation Emails (Optional)

If merge fields still don't work reliably, use this fallback approach:

### Default Value Approach

In your Mailchimp email, use default values:

```
YOUR RESULTS:
*|ASCORE:Your assessment results|*
*|LOWPILLAR:your focus area|*
```

This shows the merge field IF it exists, otherwise shows the default text.

---

## What the Firebase Fix Did

I just deployed a fix that changed:

**OLD (broken):**
```javascript
const emailHash = Buffer.from(email.toLowerCase()).toString('base64');
```

**NEW (fixed):**
```javascript
const crypto = require('crypto');
const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
```

Mailchimp requires MD5 hash, not Base64. This is why existing subscribers weren't getting merge fields updated.

---

## Testing the Complete Flow

### 1. New User Test
1. Go to: www.biohackme.com.au
2. Complete assessment with new email
3. Check email received
4. Verify merge fields populated correctly

### 2. Existing User Test (Keith)
1. Manually add merge field values to Keith's contact
2. Remove and re-add the tag to trigger automation
3. Check if new email has correct values

---

## What Firebase Is Now Sending

When someone completes an assessment, Firebase sends to Mailchimp:

```json
{
  "email_address": "keith@example.com",
  "status": "subscribed",
  "merge_fields": {
    "FNAME": "Keith",
    "LNAME": "Payne",
    "ASCORE": "42/84",
    "LOWPILLAR": "Sleep",
    "TOPRECS": "Set consistent bedtime; No screens before bed; Keep room cool"
  },
  "tags": [
    "biohacking-assessment-completed",
    "assessment-lead",
    "masterclass-nurture"
  ]
}
```

This will ONLY work if the merge fields (ASCORE, LOWPILLAR, TOPRECS) exist in Mailchimp.

---

## Troubleshooting

### Merge fields still showing as *|ASCORE|*

**Cause:** Merge fields don't exist in Mailchimp
**Fix:** Follow STEP 1 above to create them

### Email not sending at all

**Cause:** Automation not active or wrong trigger tag
**Fix:**
1. Check automation is "Active" not "Paused"
2. Verify trigger tag is exactly: biohacking-assessment-completed

### New users get merge fields but Keith doesn't

**Cause:** Keith's contact was created before merge fields existed
**Fix:** Manually add values to Keith's contact (STEP 2 above)

### Merge fields are blank/empty

**Cause:** Assessment not sending data or Firebase Function error
**Fix:**
1. Check Firebase Functions logs: firebase functions:log
2. Look for "Assessment completion error" messages
3. Verify assessment is calling completeAssessment function

---

## Quick Summary

**What I Fixed (deployed):**
- MD5 hash for updating existing Mailchimp subscribers
- Now Firebase can properly update merge fields for existing contacts

**What YOU Need to Do:**
1. Create merge fields in Mailchimp (ASCORE, LOWPILLAR, TOPRECS)
2. Manually add Keith's data to his contact
3. Re-trigger automation for Keith
4. Test with new assessment completion

**Time Required:** 20 minutes total

---

## After Setup Is Complete

Future assessments will automatically:
1. User completes assessment
2. Firebase sends data to Mailchimp with merge fields
3. Mailchimp adds/updates contact
4. Automation triggers with personalized merge fields
5. User receives email with their specific score, pillar, and recommendations

No more *|ASCORE|* showing as literal text!

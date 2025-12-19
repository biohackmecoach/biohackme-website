# Mailchimp Automation Testing Plan
**Date:** December 19, 2025
**Purpose:** Test all automation flows before launching Meta ads

## ✅ Testing Checklist

### 1. Freebie Guide Download
- **URL:** https://www.biohackme.com.au/freebie
- **Expected Tags:** `guide-download`, `lead-magnet`, `website-subscriber`
- **Automation:** "Freebie Guide"
- **Test Email:** _____________
- **Status:** ⬜ Pending

**Test Steps:**
1. Go to https://www.biohackme.com.au/freebie
2. Enter test email address
3. Submit form
4. Check Mailchimp → Audience → Search for email
5. Verify tags: `guide-download`, `lead-magnet`, `website-subscriber`
6. Check if automation email was sent
7. Record result below

**Result:**
- Tags applied: ⬜ Yes ⬜ No
- Automation triggered: ⬜ Yes ⬜ No
- Email received: ⬜ Yes ⬜ No
- Notes: ___________

---

### 2. Assessment Lead Nurture Sequence (Main Assessment)
- **URL:** https://www.biohackme.com.au/assessment
- **Expected Tags:** `assessment-lead`
- **Automation:** "Assessment Lead Nurture Sequence"
- **Test Email:** _____________
- **Status:** ⬜ Pending

**Test Steps:**
1. Go to https://www.biohackme.com.au/assessment
2. Complete consent screen
3. Rate all 8 pillars
4. Click "Calculate My Results"
5. Verify full results display (all 8 pillars + top 3 priorities)
6. Enter test email address
7. Click "Get My Results Now"
8. Verify success message with "Download / Print Results" button
9. Check Mailchimp → Audience → Search for email
10. Verify tag: `assessment-lead`
11. Check if automation email was sent
12. Record result below

**Result:**
- Form works: ⬜ Yes ⬜ No
- Results display correctly: ⬜ Yes ⬜ No
- Tags applied: ⬜ Yes ⬜ No
- Automation triggered: ⬜ Yes ⬜ No
- Email received: ⬜ Yes ⬜ No
- Notes: ___________

---

### 3. Assessment Lead Nurture Sequence (Biohack Assessment)
- **URL:** https://www.biohackme.com.au/biohack-assessment
- **Expected Tags:** `assessment-lead`
- **Automation:** "Assessment Lead Nurture Sequence"
- **Test Email:** _____________
- **Status:** ⬜ Pending

**Test Steps:**
1. Go to https://www.biohackme.com.au/biohack-assessment
2. Complete consent screen
3. Rate all 8 pillars
4. Click "Calculate My Results"
5. Verify full results display
6. Enter test email address
7. Click "Get My Results Now"
8. Check Mailchimp → Audience → Search for email
9. Verify tag: `assessment-lead`
10. Check if automation email was sent
11. Record result below

**Result:**
- Form works: ⬜ Yes ⬜ No
- Results display correctly: ⬜ Yes ⬜ No
- Tags applied: ⬜ Yes ⬜ No
- Automation triggered: ⬜ Yes ⬜ No
- Email received: ⬜ Yes ⬜ No
- Notes: ___________

---

### 4. Biohacking Assessment Results (Foundation Assessment)
- **URL:** https://www.biohackme.com.au/masterclass/biohacking-foundation-assessment
- **Expected Tags:** `biohacking-assessment-completed`
- **Automation:** "Biohacking Assessment Results"
- **Test Email:** _____________
- **Status:** ⬜ Pending

**Test Steps:**
1. Go to https://www.biohackme.com.au/masterclass/biohacking-foundation-assessment
2. Complete 7-pillar assessment
3. Enter test email address
4. Submit form
5. Check Mailchimp → Audience → Search for email
6. Verify tag: `biohacking-assessment-completed`
7. Check if automation email was sent
8. Record result below

**Result:**
- Form works: ⬜ Yes ⬜ No
- Tags applied: ⬜ Yes ⬜ No
- Automation triggered: ⬜ Yes ⬜ No
- Email received: ⬜ Yes ⬜ No
- Notes: ___________

---

## 🔍 How to Check in Mailchimp

### Method 1: Check Tags on Individual Contact
1. Log in to Mailchimp
2. Go to **Audience** → **All contacts**
3. Search for your test email address
4. Click on the contact
5. Scroll down to **Tags** section
6. Verify the expected tags are present

### Method 2: Check Automation Activity
1. Log in to Mailchimp
2. Go to **Automations**
3. Find the automation you're testing
4. Click **View Report**
5. Check **Recent Activity** to see if it triggered
6. Verify email was sent to your test address

### Method 3: Check Email Inbox
1. Check the inbox of your test email address
2. Look for automation emails from Mailchimp
3. Verify the content is correct
4. Check timing (should be immediate or within minutes)

---

## 📋 Testing Best Practices

1. **Use Real Test Emails:** Use actual email addresses you can access (e.g., yourname+test1@gmail.com, yourname+test2@gmail.com)

2. **Clear Previous Tests:** Before testing, you may want to:
   - Archive old test contacts in Mailchimp
   - Or use fresh email addresses for each test

3. **Test in Order:** Test in this order:
   - Freebie (simplest)
   - Assessment (main)
   - Biohack Assessment
   - Foundation Assessment

4. **Document Issues:** If something doesn't work, note:
   - What happened vs. what you expected
   - Error messages (if any)
   - Screenshots if helpful

5. **Wait Time:** After submitting form:
   - Tags should appear in Mailchimp within 10-30 seconds
   - Automation emails may take 1-5 minutes to send

---

## 🚨 Common Issues & Fixes

### Issue: Form submits but no tags appear in Mailchimp
**Possible Causes:**
- Firestore saved lead but Mailchimp API call failed
- Mailchimp API key/secrets not configured
- Network timeout

**How to Check:**
1. Open browser console (F12)
2. Look for error messages
3. Check Firestore → "leads" collection to see if lead was saved

**Fix:**
- Check Firebase Functions logs for errors
- Verify Mailchimp secrets are set correctly

### Issue: Tags appear but automation doesn't trigger
**Possible Causes:**
- Automation is paused in Mailchimp
- Automation trigger conditions don't match
- Contact already in automation (can't re-enter)

**Fix:**
- Check Mailchimp → Automations → Verify status is "Active"
- Check trigger conditions match the tags exactly
- Use a fresh email that hasn't been in this automation before

### Issue: Form doesn't submit / shows error
**Possible Causes:**
- Firebase Functions not deployed
- CORS error
- Required field missing

**Fix:**
- Check browser console for errors
- Verify Firebase Functions are deployed and running
- Check all required fields are filled

---

## ✅ Final Checklist Before Launching Meta Ads

- [ ] All 4 automation flows tested successfully
- [ ] Test emails received for all automations
- [ ] Tags confirmed in Mailchimp for all flows
- [ ] Forms work smoothly on desktop
- [ ] Forms work smoothly on mobile
- [ ] No console errors in browser
- [ ] Firestore backup working (check "leads" collection)
- [ ] Email copy reviewed and approved
- [ ] Unsubscribe links working in emails
- [ ] All URLs are correct and accessible
- [ ] Meta Pixel tracking verified (if applicable)

---

**Tester:** _______________
**Date Completed:** _______________
**Ready for Launch:** ⬜ Yes ⬜ No

**Notes:**

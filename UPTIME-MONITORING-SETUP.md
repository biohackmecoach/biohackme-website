# Uptime Monitoring Setup Guide

**Purpose:** Get instant alerts when your website goes down, so you can fix issues immediately.

## Recommended Service: UptimeRobot (FREE)

UptimeRobot is free for up to 50 monitors and checks your site every 5 minutes.

### Step 1: Create Account

1. Go to: https://uptimerobot.com
2. Click "Register for FREE"
3. Use your email: `hello@biohackme.com.au`
4. Verify your email address

### Step 2: Add Website Monitor

1. Click "+ Add New Monitor"
2. Configure as follows:

**Monitor Type:** HTTP(s)

**Friendly Name:** BiohackMe Production Site

**URL:** `https://biohackme.com.au`

**Monitoring Interval:** 5 minutes (free tier)

**Monitor Timeout:** 30 seconds

**Alert Contacts:** Add your email `hello@biohackme.com.au`

3. Click "Create Monitor"

### Step 3: Add Alert Contacts

1. Go to "My Settings" → "Alert Contacts"
2. Add these notification methods:

**Email:**
- Email: `hello@biohackme.com.au`
- Get alerts for: Down + Up events
- Click "Add Alert Contact"

**Optional - SMS:**
- If you want text message alerts, add your phone number
- Note: May require paid plan for SMS

### Step 4: Configure Alert Settings

**Alert When:**
- ✅ Monitor goes DOWN
- ✅ Monitor goes UP (to confirm recovery)
- ⬜ SSL certificate expires (optional)

**Alert After:**
- Select: "Immediately"
- This means you get an alert as soon as the check fails

**Alert Repeat:**
- Select: "Every time down"
- This reminds you if the site stays down

### Step 5: Verify Setup

1. After creating the monitor, UptimeRobot will immediately check your site
2. You should see a green "Up" status within a minute
3. To test alerts:
   - Click on the monitor
   - Click "Edit"
   - Temporarily change URL to `https://biohackme.com.au/this-does-not-exist`
   - Wait 5 minutes
   - You should receive a "DOWN" alert email
   - Change URL back to `https://biohackme.com.au`
   - You should receive an "UP" alert email

## Alternative Services

### Option 2: Pingdom (Paid, but more features)

1. Go to: https://www.pingdom.com
2. Free trial available, then $10/month
3. More detailed performance reports
4. Checks from multiple locations worldwide

### Option 3: StatusCake (FREE)

1. Go to: https://www.statuscake.com
2. Free plan available
3. Similar to UptimeRobot
4. UK-based company

### Option 4: Google Cloud Monitoring (FREE with Firebase)

Since you're already using Firebase:

```bash
# Install Google Cloud SDK (if not already installed)
# On Mac:
brew install --cask google-cloud-sdk

# Set up monitoring
gcloud init
gcloud monitoring uptime-checks create biohackme-uptime \
  --resource-type=uptime-url \
  --host=biohackme.com.au \
  --path=/ \
  --period=5m
```

## What to Monitor

### Essential Monitors:

1. **Main Domain**
   - URL: `https://biohackme.com.au`
   - Check: Every 5 minutes

2. **Homepage Content**
   - URL: `https://biohackme.com.au`
   - Keyword: "BiohackMe" (ensure page actually loads)

3. **Critical Form Endpoint** (optional)
   - URL: `https://us-central1-biohackme-app-379de.cloudfunctions.net/subscribeToNewsletter`
   - Check: Every 15 minutes

### Advanced Monitors (if using paid plan):

4. **SSL Certificate**
   - Alert 30 days before expiration
   - Firebase handles this automatically, but good to monitor

5. **Page Load Time**
   - Alert if page takes > 3 seconds to load
   - Helps catch performance issues

## Alert Response Plan

### When You Receive a DOWN Alert:

1. **Verify it's really down**
   - Open https://biohackme.com.au in incognito browser
   - Try from your phone (different network)
   - Check: https://downforeveryoneorjustme.com/biohackme.com.au

2. **If site is really down:**
   - Follow: `EMERGENCY-ROLLBACK.md`
   - Deploy last working version immediately

3. **Check Firebase Status**
   - Visit: https://status.firebase.google.com
   - If Firebase is down, wait for them to fix it

4. **Check recent changes**
   - Did you deploy recently?
   - Check: `firebase hosting:releases:list`
   - Rollback if needed

5. **Document the incident**
   - Create incident report (see `INCIDENT-REPORT-NOV-19-2025.md` as template)
   - Note time down, time recovered, cause, resolution

### When You Receive an UP Alert:

1. **Verify site is actually working**
   - Test critical pages
   - Try submitting a form
   - Check mobile version

2. **Document resolution**
   - What was the issue?
   - How long was it down?
   - What fixed it?

## Monitoring Dashboard

### UptimeRobot Dashboard Features:

- **Response Time Graph:** See how fast your site loads over time
- **Uptime Percentage:** Shows your reliability (aim for 99.9%+)
- **Incident Logs:** Track all downtime events
- **Public Status Page:** Share uptime stats with customers (optional)

### Creating a Public Status Page (Optional):

1. In UptimeRobot, go to "Status Pages"
2. Click "Add Status Page"
3. Select monitors to display
4. Customize with your branding
5. Get a public URL to share: `status.biohackme.com.au` (requires DNS setup)

## Maintenance Mode

If you're doing planned maintenance:

1. Log into UptimeRobot
2. Click on the monitor
3. Click "Pause Monitoring"
4. Do your maintenance
5. Resume monitoring when done

This prevents false alarms during intentional downtime.

## Integration with Other Tools

### Email Filters (Gmail):

Create a filter for UptimeRobot emails:
- From: `alert@uptimerobot.com`
- Subject: contains "DOWN"
- Action: Star it, Mark as important, Send SMS via Gmail

### Slack Integration (if you use Slack):

1. In UptimeRobot: My Settings → Integrations
2. Add Slack webhook URL
3. Get instant notifications in Slack channel

## Cost

### Free Tier (Recommended to Start):
- UptimeRobot: FREE (50 monitors, 5-minute checks)
- StatusCake: FREE (10 monitors)
- Google Cloud: FREE (with Firebase)

### Paid Tier (If You Need More):
- UptimeRobot Pro: $7/month (1-minute checks, SMS alerts)
- Pingdom: $10/month (advanced features)

## Success Metrics

After setup, you should see:

- ✅ 99.9%+ uptime
- ✅ < 2 second average response time
- ✅ Immediate alerts when issues occur
- ✅ Historical data for troubleshooting

## Next Steps

1. [ ] Create UptimeRobot account
2. [ ] Add BiohackMe monitor
3. [ ] Configure email alerts
4. [ ] Test alerts by changing URL
5. [ ] Set up alert response plan
6. [ ] Document in team procedures

---

**Prepared by:** Claude Code
**Date:** November 19, 2025

**Support Links:**
- UptimeRobot Help: https://uptimerobot.com/help/
- StatusCake Docs: https://www.statuscake.com/kb/

# 🚀 QUICK RESUME COMMANDS

**When you restart your computer, run these commands to immediately check deployment status:**

## 1. Check if changes are actually live:
```bash
# Navigate to project
cd /Users/camilla/biohackme-ai-business-team\ 3

# Check deployment status
firebase hosting:channel:list

# Force re-deploy if needed
npm run build && firebase deploy --only hosting
```

## 2. Test the specific fixes:

### Test Coaching Image (should be square):
Visit: https://www.biohackme.com.au/superchargeyourlife

### Test Assessment Persistence:
1. Go to: https://www.biohackme.com.au/environment-assessment
2. Complete assessment and enter email
3. Refresh page - should show results, not blank assessment

### Test Assessment Links on Masterclass:
Visit: https://www.biohackme.com.au/masterclass
Look for "Start Sleep Assessment" and "Start Environment Assessment" buttons

## 3. If changes still not visible:

```bash
# Hard cache clear in browser:
# Mac: Cmd + Shift + R
# PC: Ctrl + Shift + R

# Or try incognito mode
# Or try different browser entirely
```

## 4. Verify what's actually deployed:
```bash
# Check Firebase console
firebase hosting:sites:list

# See last deployment time
firebase hosting:channel:list --site biohackme-com-au
```

## 5. Emergency re-deploy:
```bash
npm run build
firebase deploy --only hosting
```

**The code changes ARE committed and deployed. Issue is likely browser caching preventing you from seeing updates.**
# Emergency Rollback Procedure

**Use this guide when the production website is down or broken.**

## Quick Rollback (5 minutes)

### Option 1: Deploy Static HTML Backup (Fastest)

If you have the `dist-working` folder with a working static HTML site:

```bash
# Navigate to project
cd "/Users/camilla/biohackme-ai-business-team 3"

# Copy working version to dist
cp -r dist-working/* dist/

# Deploy immediately
firebase deploy --only hosting
```

**Wait 30-60 seconds**, then verify:
- https://biohackme.com.au
- https://biohackme-com-au.web.app

### Option 2: Use Firebase Hosting Rollback

Firebase keeps your deployment history. To rollback to a previous version:

```bash
# List recent deployments
firebase hosting:releases:list

# Note the version number you want to rollback to
# Example output:
# Version: abc123xyz (deployed 2 hours ago)
# Version: def456uvw (deployed 1 day ago)

# Rollback is not directly supported, but you can clone a previous version
# See instructions in Firebase Console:
# https://console.firebase.google.com/project/biohackme-app-379de/hosting
```

### Option 3: Deploy from Git Commit

If you know which git commit was working:

```bash
# List recent commits
git log --oneline -10

# Find the working commit (example: abc123)
# Create a temporary branch
git checkout -b emergency-rollback

# Reset to working commit
git reset --hard abc123

# Build and deploy
npm run build
firebase deploy --only hosting

# Return to main branch after
git checkout main
```

## Verification Steps

After rolling back, verify these critical functions:

1. **Homepage loads:** https://biohackme.com.au
2. **Navigation works:** Check all menu links
3. **Forms work:** Try newsletter subscription
4. **Mobile works:** Test on phone or resize browser to 360px
5. **No errors:** Open browser console (F12) and check for errors

## If Rollback Fails

### Nuclear Option: Deploy Minimal Site

If all else fails, deploy a minimal holding page:

```bash
cd "/Users/camilla/biohackme-ai-business-team 3"

# Create minimal index.html in dist
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BiohackMe - Biohacking Australia</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #022D4E 0%, #0EA5E9 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.5rem; margin-bottom: 2rem; }
        a {
            display: inline-block;
            background: white;
            color: #022D4E;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin: 0.5rem;
        }
        a:hover { transform: scale(1.05); transition: 0.2s; }
    </style>
</head>
<body>
    <div>
        <h1>BiohackMe</h1>
        <p>Australia's Leading Biohacking Coach</p>
        <p>Optimize Your Life, One Biohack at a Time</p>
        <a href="mailto:hello@biohackme.com.au">Contact: hello@biohackme.com.au</a>
        <a href="https://calendly.com/biohackme" target="_blank">Book a Session</a>
        <p style="margin-top: 2rem; font-size: 1rem; opacity: 0.8;">
            Instagram: <a href="https://www.instagram.com/biohackmecoach/" style="color: white; text-decoration: underline;">@biohackmecoach</a>
        </p>
    </div>
</body>
</html>
EOF

# Deploy minimal site
firebase deploy --only hosting
```

This minimal page ensures:
- Your domain shows SOMETHING (not a 404)
- Contact information is visible
- Professional appearance
- SEO doesn't completely break

## Post-Rollback Actions

Once the site is stable:

1. **Notify stakeholders** that site is restored
2. **Document what happened** in incident report
3. **DO NOT attempt to redeploy** until you understand the root cause
4. **Test the broken version locally** to identify the issue
5. **Fix the issue in a staging environment** before attempting production again

## Prevention

To avoid needing emergency rollbacks:

1. **Always use staging environment first**
   ```bash
   firebase hosting:channel:deploy staging
   ```

2. **Keep `dist-working` updated** with latest working production build
   ```bash
   # After successful deployment
   cp -r dist dist-working
   ```

3. **Set up monitoring** to catch issues immediately
   - UptimeRobot: https://uptimerobot.com
   - StatusCake: https://www.statuscake.com

4. **Follow the deployment checklist**
   - See `DEPLOYMENT-CHECKLIST.md`

## Key Files to Keep Safe

Always have backups of:
- `dist-working/` - Last known working build
- `.env` - Environment variables
- `functions/.env` - Firebase Functions environment variables
- `firebase.json` - Hosting configuration

## Firebase Console Quick Links

- **Project Console:** https://console.firebase.google.com/project/biohackme-app-379de
- **Hosting Releases:** https://console.firebase.google.com/project/biohackme-app-379de/hosting
- **Functions Logs:** https://console.firebase.google.com/project/biohackme-app-379de/functions/logs

## Support

If you're stuck:
- Check Firebase Status: https://status.firebase.google.com
- Firebase Support: https://firebase.google.com/support
- Check project documentation: `INCIDENT-REPORT-NOV-19-2025.md`

---

**Remember:** When the site is down, speed is more important than perfection. Get a working version deployed first, investigate later.

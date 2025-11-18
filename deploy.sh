#!/bin/bash

# BiohackMe Reliable Deployment Script
# Fixes cache issues and ensures updates go live immediately

echo "🚀 BiohackMe Reliable Deployment Starting..."

# Step 1: Clean build
echo "🧹 Cleaning previous build..."
rm -rf dist/
npm run build

# Step 2: Generate unique cache-busting timestamp
TIMESTAMP=$(date +%s)
echo "📅 Cache-bust timestamp: $TIMESTAMP"

# Step 3: Modify index.html to add cache-busting
echo "🔄 Adding cache-busting to deployment..."
sed -i.bak "s/<title>/<meta name=\"deploy-timestamp\" content=\"$TIMESTAMP\"><title>/" dist/index.html

# Step 4: Deploy to Firebase with force flag
echo "🚁 Deploying to Firebase..."
firebase deploy --only hosting --force

# Step 5: Verify deployment
echo "✅ Verifying deployment..."
sleep 5

# Check if new timestamp is live
LIVE_TIMESTAMP=$(curl -s "https://www.biohackme.com.au" | grep -o 'deploy-timestamp" content="[0-9]*"' | grep -o '[0-9]*')

if [ "$LIVE_TIMESTAMP" = "$TIMESTAMP" ]; then
    echo "✅ SUCCESS: Deployment verified live!"
    echo "🌐 Site: https://www.biohackme.com.au"
    echo "⏰ Deployed at: $(date)"
else
    echo "⚠️  WARNING: Deployment may still be propagating..."
    echo "🔄 Try hard refresh (Ctrl+F5) in 2-3 minutes"
fi

# Step 6: Cleanup
rm dist/index.html.bak 2>/dev/null || true

echo "🎉 Deployment script completed!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Wait 2-3 minutes for CDN propagation"
echo "2. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)"
echo "3. Test in incognito mode"
echo "4. If still cached, wait 5 minutes - CDN will update"
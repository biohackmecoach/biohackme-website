#!/bin/bash
# Safe Deployment Script for BiohackMe
# This script ensures we test before deploying to production

set -e  # Exit on error

echo "🚀 BiohackMe Safe Deployment Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check for uncommitted changes
echo "📋 Step 1: Checking for uncommitted changes..."
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
    git status -s
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo -e "${GREEN}✓ Git status check complete${NC}"
echo ""

# Step 2: Run build
echo "🔨 Step 2: Building production bundle..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# Step 3: Deploy to staging first
echo "🧪 Step 3: Deploying to STAGING for testing..."
firebase hosting:channel:deploy staging --expires 7d
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Staging deployment failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Staging deployment successful${NC}"
echo ""

# Get staging URL
STAGING_URL=$(firebase hosting:channel:list 2>/dev/null | grep "staging" | awk '{print $5}')
echo -e "${YELLOW}📱 STAGING URL: ${STAGING_URL}${NC}"
echo ""

# Step 4: Manual testing prompt
echo "⏸️  Step 4: TEST THE STAGING SITE NOW"
echo "=================================="
echo "Open the staging URL above in your browser"
echo "Test the following:"
echo "  ☐ Homepage loads correctly"
echo "  ☐ Navigation works"
echo "  ☐ Forms work (newsletter, contact)"
echo "  ☐ No console errors"
echo "  ☐ Mobile view looks good"
echo ""
read -p "Does staging look good? Deploy to PRODUCTION? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled. Staging remains live for testing.${NC}"
    exit 0
fi
echo ""

# Step 5: Deploy to production
echo "🚀 Step 5: Deploying to PRODUCTION..."
firebase deploy --only hosting
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Production deployment failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Production deployment successful!${NC}"
echo ""

# Step 6: Verify production
echo "✅ Step 6: Verifying production deployment..."
echo "Production URLs:"
echo "  🌐 https://biohackme.com.au"
echo "  🌐 https://biohackme-com-au.web.app"
echo ""
echo -e "${GREEN}Wait 1-2 minutes for CDN cache to clear, then:${NC}"
echo "  1. Open site in incognito mode"
echo "  2. Check it loads correctly"
echo "  3. Clear your regular browser cache"
echo ""

# Success
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}════════════════════════════════════${NC}"
echo ""
echo "📊 Next steps:"
echo "  • Monitor site for next 10 minutes"
echo "  • Check forms are working"
echo "  • Test on mobile device"
echo ""

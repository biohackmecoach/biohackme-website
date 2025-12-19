#!/bin/bash
# Daily Health Check for BioHackMe Masterclass System
# Run this every day to ensure webhook is working

echo "╔═══════════════════════════════════════════╗"
echo "║   BIOHACKME DAILY HEALTH CHECK            ║"
echo "╚═══════════════════════════════════════════╝"
echo ""
echo "Date: $(date)"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd "/Users/camilla/biohackme-ai-business-team 3"

# Check 1: Is the function deployed?
echo "1️⃣  Checking if handlePaymentSuccess is deployed..."
FUNCTION_EXISTS=$(firebase functions:list 2>&1 | grep -c "handlePaymentSuccess")

if [ "$FUNCTION_EXISTS" -gt 0 ]; then
    echo -e "${GREEN}   ✅ Function is deployed${NC}"
else
    echo -e "${RED}   ❌ ALERT: Function is NOT deployed!${NC}"
    echo "   Run: firebase deploy --only functions:handlePaymentSuccess"
    exit 1
fi

# Check 2: Can we reach the function?
echo ""
echo "2️⃣  Checking if function is accessible..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    "https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess" \
    -H "Content-Type: application/json" \
    -d '{}' \
    --max-time 10)

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}   ✅ Function is accessible (400 = signature check working)${NC}"
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}   ✅ Function is accessible${NC}"
else
    echo -e "${RED}   ❌ ALERT: Function returned $HTTP_CODE${NC}"
    exit 1
fi

# Check 3: Any recent webhook errors?
echo ""
echo "3️⃣  Checking for recent webhook errors..."
RECENT_ERRORS=$(firebase functions:log --only handlePaymentSuccess 2>&1 | \
    grep -i "error" | \
    head -5 | \
    wc -l)

if [ "$RECENT_ERRORS" -gt 0 ]; then
    echo -e "${YELLOW}   ⚠️  Found $RECENT_ERRORS recent errors${NC}"
    echo "   Run: firebase functions:log --only handlePaymentSuccess"
else
    echo -e "${GREEN}   ✅ No recent errors${NC}"
fi

# Check 4: Check Stripe webhook status (manual check needed)
echo ""
echo "4️⃣  Stripe Webhook Check (Manual):"
echo "   Go to: https://dashboard.stripe.com/webhooks"
echo "   Verify:"
echo "   - Webhook is ENABLED"
echo "   - URL: https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess"
echo "   - Event: checkout.session.completed"

# Check 5: Mailchimp API key valid?
echo ""
echo "5️⃣  Checking Mailchimp API configuration..."
if grep -q "MAILCHIMP_API_KEY" functions/.env; then
    echo -e "${GREEN}   ✅ Mailchimp API key configured${NC}"
else
    echo -e "${YELLOW}   ⚠️  Mailchimp API key not found in .env${NC}"
fi

# Summary
echo ""
echo "═══════════════════════════════════════════"
echo "📊 HEALTH CHECK COMPLETE"
echo "═══════════════════════════════════════════"
echo ""
echo "If all checks passed, your system is healthy! ✅"
echo ""
echo "Next check in 24 hours. Set up automatic daily checks:"
echo "  crontab -e"
echo "  Add: 0 9 * * * /Users/camilla/biohackme-ai-business-team\\ 3/scripts/daily-health-check.sh"
echo ""

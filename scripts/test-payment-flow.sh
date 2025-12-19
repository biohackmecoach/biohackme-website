#!/bin/bash
# Test Complete Payment Flow
# This script helps verify the entire payment and access flow

echo "╔═══════════════════════════════════════════╗"
echo "║   PAYMENT FLOW TEST                       ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "This script will help you test the complete payment flow."
echo ""

# Step 1: Check Stripe webhook configuration
echo "1️⃣  CHECKING STRIPE WEBHOOK CONFIGURATION"
echo "   ────────────────────────────────────────"
echo "   Go to: https://dashboard.stripe.com/webhooks"
echo ""
echo "   ✓ Verify endpoint exists:"
echo "     https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess"
echo ""
echo "   ✓ Verify events selected:"
echo "     • checkout.session.completed"
echo ""
read -p "   Is webhook configured? (y/n): " webhook_configured

if [ "$webhook_configured" != "y" ]; then
    echo -e "${RED}   ❌ Configure webhook first!${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Webhook configured${NC}"
echo ""

# Step 2: Test payment link
echo "2️⃣  TESTING PAYMENT LINK"
echo "   ────────────────────────────────────────"
echo "   Payment Link: https://buy.stripe.com/28EaEZ9op29YcRZ3YG5Ne06"
echo ""
echo "   📝 Action Required:"
echo "   1. Open the payment link in a browser"
echo "   2. Use Stripe test card: 4242 4242 4242 4242"
echo "   3. Use any future expiry date and any CVC"
echo "   4. Complete the test purchase"
echo ""
read -p "   Did test purchase complete? (y/n): " purchase_complete

if [ "$purchase_complete" != "y" ]; then
    echo -e "${RED}   ❌ Fix payment link first!${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Payment completed${NC}"
echo ""

# Step 3: Check Firebase logs
echo "3️⃣  CHECKING FIREBASE WEBHOOK LOGS"
echo "   ────────────────────────────────────────"
echo "   Checking for webhook execution..."
cd "/Users/camilla/biohackme-ai-business-team 3"
firebase functions:log --only handlePaymentSuccess --limit 5

echo ""
read -p "   Do you see webhook logs? (y/n): " logs_found

if [ "$logs_found" != "y" ]; then
    echo -e "${RED}   ❌ Webhook not firing! Check Stripe configuration.${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Webhook is firing${NC}"
echo ""

# Step 4: Check Firestore
echo "4️⃣  CHECKING FIRESTORE PAYMENT RECORD"
echo "   ────────────────────────────────────────"
echo "   📝 Action Required:"
echo "   1. Go to Firebase Console: https://console.firebase.google.com"
echo "   2. Navigate to Firestore Database"
echo "   3. Check 'payments' collection"
echo "   4. Find your test payment"
echo "   5. Verify status = 'completed'"
echo ""
read -p "   Is payment status 'completed'? (y/n): " payment_completed

if [ "$payment_completed" != "y" ]; then
    echo -e "${RED}   ❌ Payment not marked as completed${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Payment completed in Firestore${NC}"
echo ""

# Step 5: Check Mailchimp
echo "5️⃣  CHECKING MAILCHIMP TAGS"
echo "   ────────────────────────────────────────"
echo "   📝 Action Required:"
echo "   1. Go to Mailchimp: https://mailchimp.com/audience"
echo "   2. Search for your test email"
echo "   3. Check for tags:"
echo "      • masterclass-customer"
echo "      • paid-customer"
echo "      • high-value-customer"
echo ""
read -p "   Are Mailchimp tags applied? (y/n): " tags_applied

if [ "$tags_applied" != "y" ]; then
    echo -e "${YELLOW}   ⚠️  Tags not applied - check Mailchimp API key${NC}"
else
    echo -e "${GREEN}   ✅ Mailchimp tags applied${NC}"
fi
echo ""

# Step 6: Check email automation
echo "6️⃣  CHECKING EMAIL AUTOMATION"
echo "   ────────────────────────────────────────"
echo "   📝 Action Required:"
echo "   1. Check test email inbox"
echo "   2. Look for welcome email with:"
echo "      • Masterclass access link"
echo "      • PDF resources"
echo "      • Login instructions"
echo ""
read -p "   Did email arrive? (y/n): " email_received

if [ "$email_received" != "y" ]; then
    echo -e "${YELLOW}   ⚠️  Set up Mailchimp automation:${NC}"
    echo "      Trigger: Tag 'masterclass-customer' added"
    echo "      Action: Send welcome email with access info"
else
    echo -e "${GREEN}   ✅ Email automation working${NC}"
fi
echo ""

# Final summary
echo "═══════════════════════════════════════════"
echo "📊 TEST SUMMARY"
echo "═══════════════════════════════════════════"
echo ""

if [ "$webhook_configured" = "y" ] && [ "$purchase_complete" = "y" ] && [ "$logs_found" = "y" ] && [ "$payment_completed" = "y" ]; then
    echo -e "${GREEN}✅ PAYMENT FLOW: WORKING${NC}"
    echo ""
    echo "✓ Stripe webhook configured"
    echo "✓ Payment processing"
    echo "✓ Webhook firing"
    echo "✓ Firestore updating"

    if [ "$tags_applied" = "y" ] && [ "$email_received" = "y" ]; then
        echo "✓ Mailchimp integration"
        echo "✓ Email automation"
        echo ""
        echo -e "${GREEN}🎉 SYSTEM FULLY OPERATIONAL!${NC}"
    else
        echo ""
        echo -e "${YELLOW}⚠️  PARTIAL SUCCESS${NC}"
        echo "Payment flow works, but email automation needs setup."
        echo ""
        echo "Next step: Configure Mailchimp automation"
    fi
else
    echo -e "${RED}❌ PAYMENT FLOW: BROKEN${NC}"
    echo ""
    echo "Fix required issues above before going live."
fi

echo ""
echo "═══════════════════════════════════════════"

#!/bin/bash

# Webhook Health Check Script
# Checks if webhook is working and shows recent activity

set -e

echo "🔍 Checking webhook health..."
echo ""

# Check if function is deployed
echo "1️⃣ Checking if handlePaymentSuccess is deployed..."
FUNCTION_EXISTS=$(firebase functions:list 2>&1 | grep "handlePaymentSuccess" || echo "")

if [ -z "$FUNCTION_EXISTS" ]; then
    echo "❌ ERROR: handlePaymentSuccess function is NOT deployed!"
    echo "   Run: ./deploy-all.sh to deploy it"
    exit 1
else
    echo "✅ Function is deployed"
fi

echo ""
echo "2️⃣ Function URL:"
echo "   https://us-central1-biohackme-app-379de.cloudfunctions.net/handlePaymentSuccess"

echo ""
echo "3️⃣ Recent function logs (last 50 lines):"
echo "   Looking for errors..."
firebase functions:log --only handlePaymentSuccess 2>&1 | tail -50

echo ""
echo "4️⃣ Next steps to verify webhook:"
echo "   • Go to Stripe Dashboard → Developers → Webhooks"
echo "   • Find 'BiohackMe Payment Success Handler'"
echo "   • Click 'Send test webhook' to verify it's working"
echo "   • Check for 200 OK response"
echo ""
echo "✅ Health check complete!"

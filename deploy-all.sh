#!/bin/bash

# Complete deployment script for BiohackMe
# Ensures ALL functions and hosting are deployed

set -e  # Exit on any error

echo "🚀 Starting complete deployment..."

# Navigate to project root
cd "/Users/camilla/biohackme-ai-business-team 3"

echo ""
echo "📦 Step 1: Building functions..."
cd functions
npx tsc
cd ..

echo ""
echo "📤 Step 2: Deploying ALL Firebase functions..."
firebase deploy --only functions

echo ""
echo "🌐 Step 3: Deploying hosting..."
firebase deploy --only hosting

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔍 Verifying deployed functions..."
firebase functions:list

echo ""
echo "✅ ALL DONE! All functions and hosting are now live."

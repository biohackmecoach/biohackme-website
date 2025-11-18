#!/bin/bash
# Start the BiohackMe Next.js application

echo "🚀 Starting BiohackMe React + Vite application..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for environment variables
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env not found. Creating from template..."
    cp .env.example .env
    echo "Please configure your Firebase and Stripe credentials in .env"
fi

# Build and preview production
echo "Building for production..."
npm run build

echo "Starting production preview on port 4173..."
npm run preview

echo "✅ Application running at http://localhost:3000"
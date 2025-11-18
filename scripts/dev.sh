#!/bin/bash
# Development mode with hot reload

echo "🔧 Starting BiohackMe in development mode with Vite..."

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

# Start Vite development server with hot reload
echo "Starting Vite development server with hot reload..."
npm run dev

echo "✅ Development server running at http://localhost:5173"
echo "📝 Changes will auto-reload"
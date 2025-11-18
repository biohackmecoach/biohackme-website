#!/bin/bash
# Build for production

echo "🏗️ Building BiohackMe for production with Vite..."

# Check for environment variables
if [ ! -f ".env" ]; then
    echo "❌ Error: .env not found"
    echo "Please create .env with Firebase and Stripe credentials"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist
rm -rf .vite

# Run production build
echo "📦 Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📊 Build output in dist/ directory"
    
    # Show build size
    echo ""
    echo "📏 Build size analysis:"
    du -sh dist/
    
    # Run react-snap for pre-rendering
    echo ""
    echo "📸 Pre-rendering pages for SEO..."
    npm run postbuild
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
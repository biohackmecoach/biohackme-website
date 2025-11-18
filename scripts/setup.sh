#!/bin/bash
# Initial project setup

echo "🔧 Setting up BiohackMe React + Firebase project..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Firebase tools globally if not present
if ! command -v firebase &> /dev/null; then
    echo "🔥 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p src/app
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/images
mkdir -p docs
mkdir -p temp
mkdir -p firebase/functions
mkdir -p scraper

# Create .env from template
if [ ! -f ".env" ]; then
    echo "🔐 Creating environment configuration..."
    cat > .env.example << 'EOL'
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
VITE_STRIPE_PRICE_ID=your-stripe-price-id

# Firebase Functions URL (for local dev: http://localhost:5001)
VITE_FIREBASE_FUNCTIONS_URL=your-functions-url
EOL
    cp .env.example .env
    echo "⚠️  Please update .env with your Firebase and Stripe credentials"
fi

# Create package.json for Vite project
if [ ! -f "package.json" ]; then
    echo "📦 Creating package.json..."
    cat > package.json << 'EOL'
{
  "name": "biohackme-react-firebase",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "postbuild": "react-snap",
    "test": "vitest",
    "firebase:emulators": "firebase emulators:start",
    "deploy": "npm run build && firebase deploy"
  },
  "reactSnap": {
    "inlineCss": true,
    "skipThirdPartyRequests": true
  }
}
EOL
fi

# Create .gitignore if not exists
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOL'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Vite
dist/
.vite/

# Production
build/
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Temporary files
temp/
*.tmp
*.log

# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log
EOL
fi

# Initialize Git if not already
if [ ! -d ".git" ]; then
    echo "📚 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: BiohackMe React + Firebase setup"
fi

# Make all scripts executable
echo "🔐 Making scripts executable..."
chmod +x scripts/*.sh

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your Firebase and Stripe credentials"
echo "2. Run './scripts/dev.sh' to start development"
echo "3. Run './scripts/scrape.sh' to migrate content"
echo ""
echo "Happy coding! 🚀"
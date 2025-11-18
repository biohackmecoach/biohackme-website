#!/bin/bash
# Run test suite

echo "🧪 Running BiohackMe test suite..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run linter
echo "🔍 Running ESLint..."
npm run lint

# Run type checking
echo "📝 Running TypeScript type check..."
npx tsc --noEmit

# Run unit tests
echo "🧪 Running unit tests..."
npm run test

# Run Lighthouse audit if in development
if [ "$1" == "--lighthouse" ]; then
    echo "🏁 Running Lighthouse audit..."
    npm run lighthouse
fi

echo "✅ All tests completed!"
#!/bin/bash
# Stop the BiohackMe application

echo "🛑 Stopping BiohackMe application..."

# Kill any process running on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Kill any next or node processes related to the project
pkill -f "next-server" 2>/dev/null
pkill -f "next dev" 2>/dev/null

echo "✅ Application stopped"
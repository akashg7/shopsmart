#!/bin/bash
# ============================================
# ShopSmart Project Setup Script (Idempotent)
# This script can be run multiple times safely.
# ============================================

set -e

echo "🚀 Setting up ShopSmart project..."

# Create required directories (idempotent with -p)
mkdir -p server/logs
mkdir -p client/dist

# ── Server Setup ──
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# ── Client Setup ──
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# ── Root (Testing) Setup ──
echo "📦 Installing root (Playwright) dependencies..."
npm install

# ── Environment files ──
# Copy .env.example to .env only if .env doesn't already exist (-n flag)
if [ ! -f server/.env ]; then
  if [ -f server/.env.example ]; then
    cp -n server/.env.example server/.env
    echo "📝 Created server/.env from .env.example"
  else
    echo "⚠️  No server/.env.example found. Please create server/.env manually."
  fi
else
  echo "✅ server/.env already exists, skipping."
fi

# ── Install Playwright browsers ──
echo "🎭 Installing Playwright browsers..."
npx playwright install --with-deps

echo ""
echo "✅ Setup complete! You can now run:"
echo "   cd server && npm run dev    # Start backend"
echo "   cd client && npm run dev    # Start frontend"
echo "   npm run test                # Run all tests"

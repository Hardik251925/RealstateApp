#!/bin/bash
# PropTrade — Auto Deploy Script
# For: https://github.com/Hardik251925/RealstateApp

set -e

echo "🚀 PropTrade Deployment Script"
echo "================================"
echo ""

# Check if we're in proptrade-web folder
if [ ! -f "index.html" ] || [ ! -f ".nojekyll" ]; then
  echo "❌ Error: Run this script from inside the 'proptrade-web/' folder"
  echo "   Files expected: index.html, .nojekyll, css/, js/, etc."
  exit 1
fi

# Check git installed
if ! command -v git &> /dev/null; then
  echo "❌ Git installed nahi hai. Install karo:"
  echo "   Mac:    brew install git"
  echo "   Ubuntu: sudo apt install git"
  echo "   Windows: https://git-scm.com/download/win"
  exit 1
fi

echo "📦 Initializing git repo..."
rm -rf .git
git init -q
git checkout -b main 2>/dev/null || git checkout main

echo "📝 Adding all files..."
git add .
git -c user.email="deploy@proptrade.local" -c user.name="PropTrade Deploy" commit -q -m "PropTrade Milestone 1 — Initial deploy"

echo "🔗 Connecting to your repo..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Hardik251925/RealstateApp.git

echo ""
echo "📤 Pushing to GitHub..."
echo "   (GitHub username + Personal Access Token maange tab daalo)"
echo "   Token banao: https://github.com/settings/tokens (scope: repo)"
echo ""

git push -u origin main --force

echo ""
echo "✅ Push complete!"
echo ""
echo "📋 Next step — GitHub Pages enable karo:"
echo "   https://github.com/Hardik251925/RealstateApp/settings/pages"
echo ""
echo "   Branch: main, Folder: / (root), Save"
echo ""
echo "🎉 1-2 min mein live URL milegi:"
echo "   https://hardik251925.github.io/RealstateApp/"
echo ""

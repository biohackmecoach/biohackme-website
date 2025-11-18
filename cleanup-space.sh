#!/bin/bash

echo "🧹 BioHackMe Space Cleanup Script"
echo "=================================="
echo ""

# 1. Remove old handover notes (keep latest 3)
echo "📋 Cleaning old handover notes..."
rm -f HANDOVER_NOTES_Sept30.md
rm -f HANDOVER_MOBILE_FIXES_SEP21_2025.md
rm -f HANDOVER_NOTES.md
rm -f SESSION_HANDOVER.md
rm -f HANDOVER_DOCUMENT.md
rm -f "Tony Handover.md"
rm -f FINAL_HANDOVER_NOTES_SEP2025.md
rm -f FINAL_MASTERCLASS_HANDOVER_SEP27_2025.md
rm -f CRITICAL_HANDOVER_NOTES.md
rm -rf HANDOVER/
echo "✅ Old handover notes removed"

# 2. Clean dist folder (can be rebuilt)
echo ""
echo "🗑️  Cleaning dist folder..."
rm -rf dist/
echo "✅ Dist folder cleaned (run 'npm run build' to rebuild)"

# 3. Clean git history (CAREFUL!)
echo ""
echo "🗂️  Cleaning git history..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive
echo "✅ Git history cleaned"

# 4. Clean npm cache
echo ""
echo "📦 Cleaning npm cache..."
npm cache clean --force
echo "✅ NPM cache cleaned"

# 5. Remove any .DS_Store files
echo ""
echo "🍎 Removing .DS_Store files..."
find . -name ".DS_Store" -delete
echo "✅ .DS_Store files removed"

echo ""
echo "=================================="
echo "✅ Cleanup Complete!"
echo ""
echo "Space saved:"
du -sh . 2>/dev/null

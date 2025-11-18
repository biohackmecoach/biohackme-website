#!/bin/bash
# Verification script for BiohackMe Ultimate Prompt Setup

echo "🔍 Verifying BiohackMe Ultimate Prompt Setup..."
echo "================================================"

PROJECT_DIR="/Users/camilla/biohackme-ai-business-team 3"
ERRORS=0

# Check core files
echo "📄 Checking core files..."
FILES=(
    "biohackme_prompt.md"
    "CLAUDE.md"
    "project_plan.md"
    "README.md"
    "DESIGN_REQUIREMENTS.md"
    ".gitignore"
    "upload.sh"
)

for file in "${FILES[@]}"; do
    if [ -f "$PROJECT_DIR/$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        ((ERRORS++))
    fi
done

# Check scripts
echo ""
echo "📜 Checking scripts..."
SCRIPTS=(
    "setup.sh"
    "start-app.sh"
    "stop-app.sh"
    "dev.sh"
    "build.sh"
    "test.sh"
    "scrape.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$PROJECT_DIR/scripts/$script" ]; then
        echo "✅ scripts/$script exists"
        # Make executable
        chmod +x "$PROJECT_DIR/scripts/$script" 2>/dev/null
    else
        echo "❌ scripts/$script missing"
        ((ERRORS++))
    fi
done

# Check directories
echo ""
echo "📁 Checking directories..."
DIRS=(
    "src"
    "docs"
    "temp"
    "scripts"
    "agents"
    "designs"
    "designs/mockups"
    "designs/screenshots"
    "designs/approved"
)

for dir in "${DIRS[@]}"; do
    if [ -d "$PROJECT_DIR/$dir" ]; then
        echo "✅ $dir/ exists"
    else
        echo "❌ $dir/ missing"
        ((ERRORS++))
    fi
done

# Check existing content
echo ""
echo "📊 Checking existing content..."
if [ -f "$PROJECT_DIR/MASTER_PLAN.md" ]; then
    echo "✅ MASTER_PLAN.md found"
else
    echo "⚠️  MASTER_PLAN.md not found (expected in existing project)"
fi

if [ -d "$PROJECT_DIR/agents" ]; then
    agent_count=$(find "$PROJECT_DIR/agents" -type f -name "*.js" -o -name "*.md" | wc -l)
    echo "✅ Agents directory contains $agent_count files"
fi

# Summary
echo ""
echo "================================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ VERIFICATION PASSED - All components present!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Navigate to project: cd $PROJECT_DIR"
    echo "2. Run setup: ./scripts/setup.sh"
    echo "3. Start scraping: ./scripts/scrape.sh"
    echo "4. Begin development: ./scripts/dev.sh"
    echo ""
    echo "🚀 Terminal Handoff Command:"
    echo "cd $PROJECT_DIR && cat CLAUDE.md && cat biohackme_prompt.md"
else
    echo "❌ VERIFICATION FAILED - $ERRORS issues found"
    echo "Please review and fix the issues above"
fi

echo "================================================"
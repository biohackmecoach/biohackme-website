#!/bin/bash
# Setup Daily Health Check - Run Once to Configure

echo "╔═══════════════════════════════════════════╗"
echo "║   SETUP DAILY HEALTH CHECK                ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Get the script path
SCRIPT_PATH="/Users/camilla/biohackme-ai-business-team 3/scripts/daily-health-check.sh"

# Make sure script is executable
chmod +x "$SCRIPT_PATH"

echo "Setting up daily health check to run every morning at 9 AM..."
echo ""

# Create the cron job entry
CRON_JOB="0 9 * * * $SCRIPT_PATH >> /Users/camilla/biohackme-ai-business-team\ 3/logs/health-check.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "daily-health-check.sh"; then
    echo "⚠️  Daily health check is already set up!"
    echo ""
    echo "Current schedule:"
    crontab -l | grep "daily-health-check.sh"
    echo ""
    read -p "Do you want to update it? (y/n): " UPDATE

    if [ "$UPDATE" != "y" ]; then
        echo "Skipping setup."
        exit 0
    fi

    # Remove old entry
    crontab -l | grep -v "daily-health-check.sh" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo ""
echo "✅ Daily health check is now set up!"
echo ""
echo "📅 Schedule: Every day at 9:00 AM"
echo "📝 Logs saved to: /Users/camilla/biohackme-ai-business-team 3/logs/health-check.log"
echo ""
echo "To view your scheduled jobs:"
echo "  crontab -l"
echo ""
echo "To view health check logs:"
echo "  tail -f /Users/camilla/biohackme-ai-business-team\\ 3/logs/health-check.log"
echo ""
echo "To run health check manually right now:"
echo "  $SCRIPT_PATH"
echo ""
echo "✅ Setup complete! Health check will run automatically every morning."
echo ""

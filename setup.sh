#!/bin/bash

# BiohackMe AI Business Team - Setup Script
# This script creates the complete folder structure and initial agents

echo "🚀 Creating BiohackMe AI Business Team Structure..."

# Create main directories
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/{orchestrator,agents,shared,reports}
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/orchestrator/{schedules,handoffs,monitoring}
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/agents/{seo-team,revenue-team,content-team,intelligence-team}
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/shared/{api-keys,knowledge-base,templates}
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/reports/{daily,weekly,alerts}

# Create SEO Team agents
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/agents/seo-team/{seo-audit-agent,content-optimizer-agent,technical-seo-agent,backlink-agent,local-seo-agent}

# Create Revenue Team agents  
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/agents/revenue-team/{book-sales-agent,coaching-conversion-agent,email-nurture-agent,lead-generation-agent}

# Create Content Team agents
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/agents/content-team/{blog-content-agent,social-media-agent,video-script-agent,pr-media-agent}

# Create Intelligence Team agents
mkdir -p "/Users/camilla/biohackme-ai-business-team 3"/agents/intelligence-team/{competitor-analysis-agent,market-research-agent,analytics-agent,customer-intelligence-agent}

echo "✅ Folder structure created successfully!"

# Create workspace subdirectories for each agent
for agent_dir in "/Users/camilla/biohackme-ai-business-team 3"/agents/*/*/; do
    mkdir -p "$agent_dir"{config,workspace,scripts,logs}
    mkdir -p "$agent_dir"workspace/{temp,data,reports}
    echo "📁 Created workspace for $(basename $agent_dir)"
done

echo "🎯 BiohackMe AI Business Team structure ready!"
echo "📍 Location: /Users/camilla/biohackme-ai-business-team 3/"
echo ""
echo "Next steps:"
echo "1. Run individual agent setup scripts"
echo "2. Configure API keys in /shared/api-keys/"
echo "3. Start the orchestrator"

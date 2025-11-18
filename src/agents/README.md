# 🤖 BiohackMe AI Agents

This folder contains all the AI-powered agents for the BiohackMe platform. Each agent is a specialized tool designed to optimize different aspects of the business.

## 📊 Available Agents

### 1. **SEO Agent** (`SEOAgent.tsx`)
- **Purpose**: Site-wide SEO optimization and monitoring
- **Features**: Page audits, keyword analysis, sitemap generation, meta tag optimization
- **Access**: `/seo-agent`

### 2. **Masterclass Agent** (`MasterclassAgent.tsx`)  
- **Purpose**: Masterclass promotion and assessment-driven lead generation
- **Features**: Free biohacking assessments, personalized recommendations, social content
- **Access**: `/masterclass-agent`

### 3. **LinkedIn Lead Agent** (`LinkedInLeadAgent.tsx`)
- **Purpose**: B2B coaching client acquisition through LinkedIn
- **Features**: Lead scoring, content strategy, automated outreach, pipeline management
- **Access**: `/linkedin-agent`

### 4. **Grok Connection** (`GrokConnection.tsx`)
- **Purpose**: AI platform integrations and API management
- **Features**: Connect Grok/OpenAI/LinkedIn APIs, test capabilities, manage keys
- **Access**: `/grok-connection`

## 🔧 Supporting Files

### **AI Insights Engine** (`../utils/aiInsights.ts`)
- Core AI functionality powering all agents
- Lead scoring algorithms
- Content generation templates
- Market trend analysis
- Competitor intelligence

## 🎯 Agent Integration Points

All agents are designed to work together:

1. **SEO Agent** → optimizes content for search engines
2. **Masterclass Agent** → converts traffic to assessment leads  
3. **LinkedIn Agent** → nurtures leads into coaching clients
4. **Grok Connection** → powers AI insights across all agents

## 🚀 Usage

Each agent can be accessed via its dedicated URL:
- `http://localhost:5173/seo-agent`
- `http://localhost:5173/masterclass-agent`
- `http://localhost:5173/linkedin-agent`
- `http://localhost:5173/grok-connection`

## 📈 Performance Targets

- **SEO Agent**: Improve domain authority from 15 → 40
- **Masterclass Agent**: 34.2% assessment-to-sale conversion
- **LinkedIn Agent**: Generate 8+ coaching clients per quarter
- **Grok Connection**: Enable real-time AI insights and automation

## 🔐 Security

All agents are configured with:
- No-index meta tags (private tools)
- API key encryption
- Rate limiting
- Input validation
- CORS protection

---

**Built for Camilla Thompson | BiohackMe Australia**  
*Optimizing executive health through science-backed biohacking*
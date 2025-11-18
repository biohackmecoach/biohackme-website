// OpenAI Client for BiohackMe AI Platform
// Real AI integration for content generation and analysis

interface OpenAIConfig {
  apiKey: string
  baseURL?: string
  organization?: string
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: ChatMessage
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface LinkedInProfile {
  name: string
  title: string
  company: string
  industry: string
  location: string
  recentPosts?: string[]
}

export class OpenAIClient {
  private apiKey: string
  private baseURL: string

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey || import.meta.env.VITE_OPENAI_API_KEY
    this.baseURL = config.baseURL || 'https://api.openai.com/v1'

    console.log('OpenAI Client Initialization:', {
      hasApiKey: !!this.apiKey,
      apiKeyLength: this.apiKey?.length || 0,
      baseURL: this.baseURL
    })

    if (!this.apiKey) {
      throw new Error('OpenAI API key is required. Check your .env.local file.')
    }
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    try {
      console.log('Making OpenAI request:', {
        endpoint,
        model: data.model,
        hasApiKey: !!this.apiKey
      })

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('OpenAI Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('OpenAI API Error Response:', errorText)

        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: { message: errorText } }
        }

        throw new Error(`OpenAI API error (${response.status}): ${errorData.error?.message || response.statusText}`)
      }

      const result = await response.json()
      console.log('OpenAI Success:', { model: result.model, usage: result.usage })
      return result
    } catch (error) {
      console.error('OpenAI API request failed:', error)
      throw error
    }
  }

  async generateLinkedInPost(theme: string, targetAudience: string = 'Australian executives'): Promise<{
    hook: string
    content: string[]
    cta: string
    hashtags: string[]
  }> {
    const systemPrompt = `You are a LinkedIn content strategist for Camilla Thompson, Australia's leading biohacking expert who works with executives at companies like Canva, KPMG, and Lendlease.

Create engaging LinkedIn posts that:
- Use Australian English spelling (optimise, analyse, etc.)
- Target ${targetAudience}
- Focus on biohacking for performance, not generic wellness
- Include specific metrics and results when possible
- Reference corporate clients for social proof
- Use professional, authoritative tone
- Avoid buzzwords, focus on science-backed results`

    const userPrompt = `Create a LinkedIn post about: ${theme}

Format the response as JSON with these exact fields:
{
  "hook": "Opening line that grabs attention",
  "content": ["Array", "of", "content", "lines"],
  "cta": "Call to action",
  "hashtags": ["array", "of", "hashtags"]
}`

    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    })

    try {
      const content = response.choices[0].message.content
      const parsed = JSON.parse(content)
      return parsed
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error)
      throw new Error('Failed to generate LinkedIn post')
    }
  }

  async analyzeLeadProfile(profile: LinkedInProfile): Promise<{
    coachingFit: number
    painPoints: string[]
    reasoning: string
    outreachAngle: string
  }> {
    const systemPrompt = `You are an AI assistant helping Camilla Thompson (Australia's leading biohacking expert) analyze LinkedIn prospects for coaching fit.

Analyze prospects based on:
- Seniority level (C-suite, VP, Director = higher scores)
- Industry (Tech, Finance, Consulting, Healthcare = higher scores) 
- Location (Australia/NZ = higher scores)
- Wellness interest indicators in posts/bio
- Company size and growth stage

Return coaching fit score 0-100 and strategic insights.`

    const userPrompt = `Analyze this LinkedIn profile for biohacking coaching fit:

Name: ${profile.name}
Title: ${profile.title}
Company: ${profile.company}
Industry: ${profile.industry}
Location: ${profile.location}
Recent Posts: ${profile.recentPosts?.join(', ') || 'None available'}

Return JSON with:
{
  "coachingFit": 0-100,
  "painPoints": ["array of likely pain points"],
  "reasoning": "explanation of score",
  "outreachAngle": "best approach for first contact"
}`

    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 500
    })

    try {
      const content = response.choices[0].message.content
      const parsed = JSON.parse(content)
      return parsed
    } catch (error) {
      console.error('Failed to parse lead analysis:', error)
      throw new Error('Failed to analyze lead profile')
    }
  }

  async generateOutreachMessage(profile: LinkedInProfile, outreachAngle: string): Promise<string> {
    const systemPrompt = `You are writing LinkedIn connection requests and messages for Camilla Thompson, Australia's leading biohacking expert who helps executives optimize their performance.

Key points:
- Professional but warm tone
- Reference their specific role/company
- Offer value, don't just pitch
- Keep initial message under 300 characters for connection requests
- Use Australian English spelling
- Include subtle social proof (other executives she's helped)
- Focus on performance/results, not general wellness`

    const userPrompt = `Write a LinkedIn connection request for:

Name: ${profile.name}
Title: ${profile.title}
Company: ${profile.company}
Industry: ${profile.industry}
Outreach Angle: ${outreachAngle}

Keep it under 300 characters and personalized.`

    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    return response.choices[0].message.content.trim()
  }

  async generateContentStrategy(recentPosts: string[]): Promise<{
    insights: string[]
    recommendations: string[]
    contentIdeas: string[]
  }> {
    const systemPrompt = `You are an AI content strategist analyzing LinkedIn performance for Camilla Thompson's biohacking business.

Analyze content patterns and provide:
- Performance insights based on engagement patterns
- Strategic recommendations for Australian executive audience
- Specific content ideas that would drive coaching inquiries

Focus on content that positions Camilla as the go-to biohacking expert for high-performing executives.`

    const userPrompt = `Analyze these recent LinkedIn posts and provide strategy insights:

Recent Posts:
${recentPosts.join('\n\n---\n\n')}

Return JSON with:
{
  "insights": ["performance insights"],
  "recommendations": ["strategic recommendations"], 
  "contentIdeas": ["specific content ideas"]
}`

    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.6,
      max_tokens: 600
    })

    try {
      const content = response.choices[0].message.content
      const parsed = JSON.parse(content)
      return parsed
    } catch (error) {
      console.error('Failed to parse content strategy:', error)
      throw new Error('Failed to generate content strategy')
    }
  }

  async analyzeTrends(context: string = 'Australian executive wellness'): Promise<{
    trends: string[]
    opportunities: string[]
    threats: string[]
  }> {
    const systemPrompt = `You are an AI market analyst for the Australian executive wellness and biohacking market.

Provide insights on:
- Current trends in executive wellness/biohacking
- Market opportunities for premium coaching services
- Potential threats or challenges
- Focus on Australian market specifically

Base insights on current market data and executive behavior patterns.`

    const userPrompt = `Analyze current market trends for: ${context}

Consider:
- Post-COVID executive wellness priorities
- Australian corporate culture
- Biohacking adoption among professionals
- Competition in executive coaching space

Return JSON with:
{
  "trends": ["current market trends"],
  "opportunities": ["business opportunities"],
  "threats": ["potential challenges"]
}`

    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 500
    })

    try {
      const content = response.choices[0].message.content
      const parsed = JSON.parse(content)
      return parsed
    } catch (error) {
      console.error('Failed to parse trend analysis:', error)
      throw new Error('Failed to analyze trends')
    }
  }

  // General content generation method
  async generateContent(prompt: string, options: {
    model?: string;
    temperature?: number;
    maxTokens?: number
  } = {}): Promise<string> {
    const {
      model = 'gpt-4',
      temperature = 0.7,
      maxTokens = 1500
    } = options

    try {
      const response = await this.makeRequest('/chat/completions', {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant helping with business and lead generation tasks. Provide accurate, helpful responses in the requested format.'
          },
          { role: 'user', content: prompt }
        ],
        temperature,
        max_tokens: maxTokens
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Failed to generate content:', error)
      throw new Error('Failed to generate content with OpenAI')
    }
  }

  // Test connection to OpenAI
  async testConnection(): Promise<{ success: boolean; model: string; usage?: any }> {
    try {
      const response = await this.makeRequest('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'Hello! Just testing the connection. Please respond with "Connection successful"' }
        ],
        max_tokens: 50
      })

      return {
        success: true,
        model: response.model,
        usage: response.usage
      }
    } catch (error) {
      return {
        success: false,
        model: 'connection-failed'
      }
    }
  }
}

// Create singleton instance
export const openaiClient = new OpenAIClient({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

// Export types for use in other files
export type { LinkedInProfile, ChatMessage, OpenAIResponse }
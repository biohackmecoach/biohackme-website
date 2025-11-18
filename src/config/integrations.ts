// Integration Configuration for Real API Connections
// Replace these with your actual API credentials

export const integrationsConfig = {
  // Fathom AI Configuration
  fathom: {
    // Get these from your Fathom account settings
    apiKey: process.env.REACT_APP_FATHOM_API_KEY || '',
    workspaceId: process.env.REACT_APP_FATHOM_WORKSPACE_ID || '',
    webhookUrl: process.env.REACT_APP_FATHOM_WEBHOOK_URL || '',
    baseUrl: 'https://api.fathom.video/v1',
    
    // Fathom API endpoints
    endpoints: {
      meetings: '/meetings',
      recordings: '/recordings',
      transcripts: '/transcripts',
      summaries: '/summaries'
    }
  },

  // Google Forms Configuration
  googleForms: {
    // Get these from Google Cloud Console
    apiKey: process.env.REACT_APP_GOOGLE_FORMS_API_KEY || '',
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || 'http://localhost:5174/admin',
    
    // Google Forms API endpoints
    baseUrl: 'https://forms.googleapis.com/v1',
    endpoints: {
      forms: '/forms',
      responses: '/forms/{formId}/responses'
    },

    // Your actual Google Forms
    forms: {
      intake: process.env.REACT_APP_INTAKE_FORM_ID || '1FAIpQLScI4eqTlBCn2GWIF0j6SzkxhZHdhrbScxgvvpA311rV0IA1VA',
      assessment: process.env.REACT_APP_ASSESSMENT_FORM_ID || '1FAIpQLScI4eqTlBCn2GWIF0j6SzkxhZHdhrbScxgvvpA311rV0IA1VA',
      feedback: process.env.REACT_APP_FEEDBACK_FORM_ID || '1FAIpQLScI4eqTlBCn2GWIF0j6SzkxhZHdhrbScxgvvpA311rV0IA1VA',
      freebie: process.env.REACT_APP_FREEBIE_FORM_ID || '1FAIpQLScI4eqTlBCn2GWIF0j6SzkxhZHdhrbScxgvvpA311rV0IA1VA'
    }
  },

  // Calendar Integration (for scheduling)
  calendar: {
    provider: 'google', // or 'outlook', 'calendly'
    apiKey: process.env.REACT_APP_CALENDAR_API_KEY || '',
    calendarId: process.env.REACT_APP_CALENDAR_ID || '',
    timeZone: 'Australia/Sydney'
  }
}

// API Helper Functions
export class FathomAPI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = integrationsConfig.fathom.apiKey
    this.baseUrl = integrationsConfig.fathom.baseUrl
  }

  async getMeetings(workspaceId: string) {
    const response = await fetch(`${this.baseUrl}${integrationsConfig.fathom.endpoints.meetings}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }

  async getRecording(meetingId: string) {
    const response = await fetch(`${this.baseUrl}${integrationsConfig.fathom.endpoints.recordings}/${meetingId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }

  async getTranscript(meetingId: string) {
    const response = await fetch(`${this.baseUrl}${integrationsConfig.fathom.endpoints.transcripts}/${meetingId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
}

export class GoogleFormsAPI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = integrationsConfig.googleForms.apiKey
    this.baseUrl = integrationsConfig.googleForms.baseUrl
  }

  async getFormResponses(formId: string) {
    const response = await fetch(
      `${this.baseUrl}/forms/${formId}/responses?key=${this.apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  }

  async getForm(formId: string) {
    const response = await fetch(
      `${this.baseUrl}/forms/${formId}?key=${this.apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  }
}

// Environment Variables Setup Instructions
export const setupInstructions = {
  fathom: {
    steps: [
      '1. Go to your Fathom account settings',
      '2. Navigate to API & Integrations',
      '3. Generate a new API key',
      '4. Copy your Workspace ID',
      '5. Set up webhook URL for real-time updates',
      '6. Add these to your .env.local file:'
    ],
    envVars: [
      'REACT_APP_FATHOM_API_KEY=your_fathom_api_key',
      'REACT_APP_FATHOM_WORKSPACE_ID=your_workspace_id',
      'REACT_APP_FATHOM_WEBHOOK_URL=https://yourapp.com/api/fathom-webhook'
    ]
  },
  googleForms: {
    steps: [
      '1. Go to Google Cloud Console',
      '2. Create a new project or select existing',
      '3. Enable Google Forms API',
      '4. Create credentials (API key)',
      '5. Get your Google Form IDs from form URLs',
      '6. Add these to your .env.local file:'
    ],
    envVars: [
      'REACT_APP_GOOGLE_FORMS_API_KEY=your_google_api_key',
      'REACT_APP_GOOGLE_CLIENT_ID=your_client_id',
      'REACT_APP_INTAKE_FORM_ID=your_intake_form_id',
      'REACT_APP_ASSESSMENT_FORM_ID=your_assessment_form_id',
      'REACT_APP_FEEDBACK_FORM_ID=your_feedback_form_id',
      'REACT_APP_FREEBIE_FORM_ID=your_freebie_form_id'
    ]
  }
}
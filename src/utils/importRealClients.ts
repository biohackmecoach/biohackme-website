// Import real client data from Google Forms
// This script fetches actual form responses and creates proper client records

interface GoogleFormResponse {
  responseId: string
  createTime: string
  answers: { [questionId: string]: { textAnswers?: { answers: Array<{ value: string }> } } }
}

interface GoogleForm {
  formId: string
  info: {
    title: string
    description: string
  }
  items: Array<{
    itemId: string
    title: string
    questionItem?: {
      question: {
        questionId: string
      }
    }
  }>
}

interface ClientData {
  id: string
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'prospect'
  program: 'Supercharge Your Life' | 'Masterclass' | 'Consultation' | 'Book Reader'
  joinDate: string
  lastContact: string
  notes: string
  files: any[]
  progressData: {
    biohackingWheel: {
      sleep: number
      mood: number
      body: number
      environment: number
      energy: number
      relationships: number
      health: number
      brain: number
      date: string
    }
    goals: string[]
    achievements: string[]
    challengeAreas: string[]
  }
}

export class GoogleFormsClientImporter {
  private apiKey: string
  private formId: string

  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_FORMS_API_KEY || ''
    this.formId = process.env.REACT_APP_INTAKE_FORM_ID || ''
  }

  async fetchFormStructure(): Promise<GoogleForm | null> {
    try {
      const response = await fetch(
        `https://forms.googleapis.com/v1/forms/${this.formId}?key=${this.apiKey}`
      )
      
      if (!response.ok) {
        console.error('Failed to fetch form structure:', response.status, response.statusText)
        return null
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching form structure:', error)
      return null
    }
  }

  async fetchFormResponses(): Promise<GoogleFormResponse[]> {
    try {
      const response = await fetch(
        `https://forms.googleapis.com/v1/forms/${this.formId}/responses?key=${this.apiKey}`
      )
      
      if (!response.ok) {
        console.error('Failed to fetch form responses:', response.status, response.statusText)
        return []
      }
      
      const data = await response.json()
      return data.responses || []
    } catch (error) {
      console.error('Error fetching form responses:', error)
      return []
    }
  }

  private extractAnswerValue(answer: any): string {
    if (answer?.textAnswers?.answers?.[0]?.value) {
      return answer.textAnswers.answers[0].value
    }
    return ''
  }

  private parseClientFromResponse(response: GoogleFormResponse, form: GoogleForm): ClientData {
    const answers = response.answers || {}
    
    // Create a mapping of question titles to answers
    const responseMap: { [key: string]: string } = {}
    
    form.items.forEach(item => {
      if (item.questionItem?.question.questionId) {
        const questionId = item.questionItem.question.questionId
        const answer = answers[questionId]
        if (answer) {
          responseMap[item.title] = this.extractAnswerValue(answer)
        }
      }
    })

    // Extract key information (adapt these field names to match your actual form)
    const name = responseMap['Full Name'] || responseMap['Name'] || responseMap['Your Name'] || 'Unknown Client'
    const email = responseMap['Email'] || responseMap['Email Address'] || responseMap['Your Email'] || ''
    const phone = responseMap['Phone'] || responseMap['Phone Number'] || responseMap['Contact Number'] || ''
    const healthGoals = responseMap['Health Goals'] || responseMap['What are your main health goals?'] || ''
    const challenges = responseMap['Health Challenges'] || responseMap['Current Health Challenges'] || ''
    const experience = responseMap['Previous Experience'] || responseMap['Biohacking Experience'] || ''
    
    // Parse any numeric ratings for biohacking wheel
    const sleepRating = this.parseRating(responseMap['Sleep Quality'] || responseMap['Sleep Score'])
    const energyRating = this.parseRating(responseMap['Energy Level'] || responseMap['Energy Score'])
    const moodRating = this.parseRating(responseMap['Mood'] || responseMap['Mood Score'])
    const healthRating = this.parseRating(responseMap['Overall Health'] || responseMap['Health Score'])

    // Create comprehensive notes from all responses
    const allResponses = Object.entries(responseMap)
      .filter(([_, value]) => value.trim())
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n\n')

    return {
      id: `client_${response.responseId}`,
      name: name,
      email: email,
      phone: phone,
      status: 'prospect',
      program: 'Book Reader',
      joinDate: new Date(response.createTime).toLocaleDateString(),
      lastContact: new Date(response.createTime).toLocaleDateString(),
      notes: `Imported from Google Form: ${form.info.title}\nSubmitted: ${new Date(response.createTime).toLocaleDateString()}\n\n${allResponses}`,
      files: [],
      progressData: {
        biohackingWheel: {
          sleep: sleepRating,
          mood: moodRating,
          body: 5, // Default if not provided
          environment: 5,
          energy: energyRating,
          relationships: 5,
          health: healthRating,
          brain: 5,
          date: new Date(response.createTime).toLocaleDateString()
        },
        goals: healthGoals ? [healthGoals] : [],
        achievements: [],
        challengeAreas: challenges ? [challenges] : []
      }
    }
  }

  private parseRating(value: string | undefined): number {
    if (!value) return 5
    
    // Extract number from string (handles "8/10", "8 out of 10", "8", etc.)
    const match = value.match(/(\d+)/)
    if (match) {
      const num = parseInt(match[1])
      // If it's out of 10, keep as is, if out of 5, scale to 10
      return num <= 10 ? num : Math.min(num, 10)
    }
    
    return 5 // Default middle rating
  }

  async importAllClients(): Promise<ClientData[]> {
    console.log('🔄 Starting client import from Google Forms...')
    
    // Fetch form structure first
    const form = await this.fetchFormStructure()
    if (!form) {
      console.error('❌ Failed to fetch form structure')
      return []
    }

    console.log(`✅ Form loaded: ${form.info.title}`)
    
    // Fetch all responses
    const responses = await this.fetchFormResponses()
    console.log(`📋 Found ${responses.length} form responses`)

    if (responses.length === 0) {
      console.log('⚠️ No responses found. This could be due to:')
      console.log('1. Form has no responses yet')
      console.log('2. API permissions issue - may need OAuth setup')
      console.log('3. Form ID is incorrect')
      return []
    }

    // Convert responses to client data
    const clients = responses.map(response => 
      this.parseClientFromResponse(response, form)
    )

    console.log(`✅ Successfully imported ${clients.length} clients`)
    console.log('Client names:', clients.map(c => c.name).join(', '))

    return clients
  }

  // Save to localStorage for immediate use
  async importAndSaveClients(): Promise<void> {
    const clients = await this.importAllClients()
    
    if (clients.length > 0) {
      // Save to localStorage
      localStorage.setItem('biohackme_clients', JSON.stringify(clients))
      console.log(`💾 Saved ${clients.length} clients to localStorage`)
      
      // Trigger a page refresh to show new data
      window.location.reload()
    } else {
      console.log('⚠️ No clients imported - check console for errors')
    }
  }
}

// Export singleton instance
export const clientImporter = new GoogleFormsClientImporter()
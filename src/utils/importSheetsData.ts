// Import real client data from Google Sheets
// This script fetches actual form responses from your shared Google Sheet

interface SheetClient {
  id: string
  name: string
  email: string
  phone?: string
  age?: string
  status: 'active' | 'inactive' | 'prospect'
  program: string
  joinDate: string
  lastContact: string
  notes: string
  sessions: number
  healthGoals: string[]
  challenges: string[]
  occupation?: string
  relationshipStatus?: string
  location?: string
  healthConcerns: string[]
  coachingHours?: {
    totalHoursPurchased: number
    totalHoursUsed: number
    hourlyRate: number
    packageDetails?: {
      packageName: string
      hoursIncluded: number
      purchaseDate: string
      expiryDate?: string
    }[]
    sessionsLog: {
      id: string
      date: string
      startTime: string
      endTime: string
      duration: number
      sessionType: 'initial-consultation' | 'follow-up' | 'package-session' | 'ad-hoc'
      notes: string
      status: 'completed' | 'scheduled' | 'cancelled' | 'no-show'
      rateCharged?: number
    }[]
  }
}

export class GoogleSheetsImporter {
  private csvUrl: string

  constructor() {
    // Your actual Google Sheets CSV export URL
    this.csvUrl = 'https://docs.google.com/spreadsheets/d/1GilsKiy4dWgFXphBM6X6XzBkhZQhFX3M0mv3cAQqAN4/export?format=csv'
  }

  async fetchSheetData(): Promise<string> {
    try {
      const response = await fetch(this.csvUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data: ${response.status}`)
      }
      return await response.text()
    } catch (error) {
      console.error('Error fetching sheet data:', error)
      throw error
    }
  }

  parseCSV(csvText: string): SheetClient[] {
    const lines = csvText.split('\n')
    if (lines.length < 2) {
      console.warn('CSV has no data rows')
      return []
    }

    // Get headers from first row
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
    console.log('CSV Headers:', headers)

    const clients: SheetClient[] = []

    // Process each data row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      try {
        // Parse CSV row (handle quoted values)
        const values = this.parseCSVRow(line)
        if (values.length < headers.length) continue

        const client = this.mapRowToClient(headers, values, i)
        if (client) {
          clients.push(client)
        }
      } catch (error) {
        console.error(`Error parsing row ${i}:`, error)
      }
    }

    console.log(`Successfully parsed ${clients.length} clients from sheet`)
    return clients
  }

  private parseCSVRow(line: string): string[] {
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    values.push(current.trim())
    return values
  }

  private mapRowToClient(headers: string[], values: string[], index: number): SheetClient | null {
    try {
      // Find column indices (case-insensitive)
      const getColumnIndex = (searchTerms: string[]): number => {
        for (const term of searchTerms) {
          const index = headers.findIndex(h => 
            h.toLowerCase().includes(term.toLowerCase())
          )
          if (index !== -1) return index
        }
        return -1
      }

      const timestampIndex = getColumnIndex(['timestamp', 'time'])
      const nameIndex = getColumnIndex(['full name', 'name'])
      const emailIndex = getColumnIndex(['email'])
      const phoneIndex = getColumnIndex(['phone'])
      const ageIndex = getColumnIndex(['age'])
      const occupationIndex = getColumnIndex(['occupation', 'job'])
      const relationshipIndex = getColumnIndex(['relationship', 'marital'])
      const locationIndex = getColumnIndex(['birth', 'location', 'place'])

      // Health-related columns
      const healthGoalsIndex = getColumnIndex(['goals', 'achieve', 'want'])
      const exerciseIndex = getColumnIndex(['exercise', 'physical', 'activity'])
      const sleepIndex = getColumnIndex(['sleep'])
      const stressIndex = getColumnIndex(['stress'])
      const energyIndex = getColumnIndex(['energy', 'tired'])
      const concernsIndex = getColumnIndex(['concerns', 'challenges', 'issues'])

      const name = values[nameIndex] || `Client ${index}`
      const email = values[emailIndex] || `client${index}@example.com`
      const timestamp = values[timestampIndex] || new Date().toISOString()

      // Extract health goals and challenges
      const healthGoals: string[] = []
      const challenges: string[] = []
      const healthConcerns: string[] = []

      // Parse health-related responses
      if (healthGoalsIndex >= 0 && values[healthGoalsIndex]) {
        healthGoals.push(values[healthGoalsIndex])
      }
      if (exerciseIndex >= 0 && values[exerciseIndex]) {
        healthGoals.push(`Exercise: ${values[exerciseIndex]}`)
      }
      if (concernsIndex >= 0 && values[concernsIndex]) {
        challenges.push(values[concernsIndex])
        healthConcerns.push(values[concernsIndex])
      }
      if (sleepIndex >= 0 && values[sleepIndex]) {
        const sleepText = values[sleepIndex]
        if (sleepText.toLowerCase().includes('poor') || sleepText.toLowerCase().includes('bad') || sleepText.toLowerCase().includes('tired')) {
          challenges.push(`Sleep: ${sleepText}`)
        } else {
          healthGoals.push(`Sleep: ${sleepText}`)
        }
      }
      if (stressIndex >= 0 && values[stressIndex]) {
        challenges.push(`Stress: ${values[stressIndex]}`)
      }
      if (energyIndex >= 0 && values[energyIndex]) {
        if (values[energyIndex].toLowerCase().includes('low') || values[energyIndex].toLowerCase().includes('tired')) {
          challenges.push(`Energy: ${values[energyIndex]}`)
        } else {
          healthGoals.push(`Energy: ${values[energyIndex]}`)
        }
      }

      // Default to some goals if none found
      if (healthGoals.length === 0) {
        healthGoals.push('Improve overall health', 'Optimize energy levels')
      }
      if (challenges.length === 0) {
        challenges.push('Work-life balance', 'Maintaining consistent routines')
      }

      // Create comprehensive notes from all responses
      const responseNotes = headers.slice(3) // Skip timestamp, name, email
        .map((header, idx) => {
          const value = values[idx + 3]
          if (value && value.trim() && value !== 'N/A') {
            return `${header}: ${value}`
          }
          return null
        })
        .filter(Boolean)
        .join('\n\n')

      // Parse date from timestamp
      const joinDate = new Date(timestamp).toLocaleDateString()

      const client: SheetClient = {
        id: `sheet_client_${index}`,
        name: name,
        email: email,
        phone: phoneIndex >= 0 ? values[phoneIndex] : undefined,
        age: ageIndex >= 0 ? values[ageIndex] : undefined,
        status: 'active',
        program: 'Supercharge Your Life', // Default program
        joinDate: joinDate,
        lastContact: joinDate,
        notes: `Imported from Google Sheets on ${new Date().toLocaleDateString()}\n\nOriginal Form Responses:\n\n${responseNotes}`,
        sessions: 0, // New clients start with 0 sessions
        healthGoals: healthGoals,
        challenges: challenges,
        occupation: occupationIndex >= 0 ? values[occupationIndex] : undefined,
        relationshipStatus: relationshipIndex >= 0 ? values[relationshipIndex] : undefined,
        location: locationIndex >= 0 ? values[locationIndex] : undefined,
        healthConcerns: healthConcerns
      }

      return client
    } catch (error) {
      console.error(`Error mapping row ${index}:`, error)
      return null
    }
  }

  async importAllClients(): Promise<SheetClient[]> {
    console.log('🔄 Starting import from Google Sheets...')
    
    try {
      console.log('📥 Fetching sheet data...')
      const csvData = await this.fetchSheetData()
      
      console.log('🔍 Parsing CSV data...')
      const clients = this.parseCSV(csvData)
      
      console.log(`✅ Successfully imported ${clients.length} clients from Google Sheets`)
      console.log('Client names:', clients.map(c => c.name).join(', '))

      return clients
    } catch (error) {
      console.error('❌ Import failed:', error)
      throw error
    }
  }

  // Get the 3 recent clients as specified
  getRecentClients(): SheetClient[] {
    const recentClients: SheetClient[] = [
      {
        id: 'client_amanda_kerr',
        name: 'Amanda Elizabeth Kerr',
        email: 'amanda_kerr@me.com',
        phone: '0404999303',
        age: '36',
        status: 'active',
        program: 'Supercharge Your Life',
        joinDate: '02/04/2025',
        lastContact: '02/04/2025',
        notes: `Joined: 02/04/2025\nAge: 36, Location: Australia, Status: Single\nOccupation: Seafarer\nWeight: 48kg, Height: 161cm\nHealth Goals: Overall be strong and healthy\nSleep: Can struggle to get to sleep often. Rarely wake up but if I do I struggle the next day.\nExercise: I have struggled building routine - goal of mine to exercise once a day. I used to love HIIT but haven't had the energy. Also love Pilates, and enjoy yoga but more so stretching.\nChallenges: Stiffness - need/want to stretch. I have - can depend on my anxiety.\nDiet: Breakfast: smoothie, Lunch/Dinner: soup, salad, veg stirfry, pasta (something quick/easy)\nGoal: Exercise and eat better (what do I need to eat for my body)`,
        sessions: 0,
        healthGoals: ['Overall be strong and healthy', 'Exercise once a day', 'Build routine', 'Eat better'],
        challenges: ['Building routine', 'Low energy for HIIT', 'Stiffness', 'Sleep issues', 'Anxiety affects digestion'],
        occupation: 'Seafarer',
        relationshipStatus: 'Single',
        location: 'Australia',
        healthConcerns: ['Stiffness', 'Sleep issues', 'Anxiety', 'Digestive issues']
      },
      {
        id: 'client_diana_taylor',
        name: 'Diana Taylor',
        email: 'diana.taylor16@gmail.com',
        phone: '0424237493',
        age: '42',
        status: 'active',
        program: 'Supercharge Your Life',
        joinDate: '04/04/2025',
        lastContact: '04/04/2025',
        notes: `Joined: 04/04/2025\nAge: 42, Location: Romania, Status: Married\nOccupation: Business owner\nWeight: 74kg, Height: 1.65m\nChildren: 2\nFamily History: Mother passed away from bowel cancer at age 56\nSleep: I do wake up every other night\nExercise: Twice per week, but only started recently, in February\nCravings: I do crave alcohol and nicotine; I don't like sugar; I have never taken any drugs\nDigestion: Lactose intolerant, regular; same as forever, pain in day 1 only\nDiet: Breakfast and lunch are the one meal at around 10:30-11am; Dinner at home; meat and vegs - very simple\nGoal: Keep on with the exercise\nPersonal: My 10 yo daughter had leukaemia when she was 2 and went through chemotherapy for one year and a half. She is now in great health`,
        sessions: 0,
        healthGoals: ['Keep on with exercise', 'Maintain good health', 'Support family health'],
        challenges: ['Sleep disruption', 'Alcohol and nicotine cravings', 'Lactose intolerance', 'Family health history'],
        occupation: 'Business owner',
        relationshipStatus: 'Married',
        location: 'Romania',
        healthConcerns: ['Sleep issues', 'Addiction cravings', 'Family cancer history', 'Digestive issues']
      },
      {
        id: 'client_victoria_sloan',
        name: 'Victoria Sloan',
        email: 'vickisloan1983@hotmail.co.uk',
        phone: '0433698986',
        age: '42',
        status: 'active',
        program: 'Supercharge Your Life',
        joinDate: '25/07/2025',
        lastContact: '25/07/2025',
        notes: `Joined: 25/07/2025\nAge: 42, Location: Brent, UK, Status: Fiancé\nOccupation: Fundraising - Executive Director, Development (Faculties)\nWeight: 118.3kg, Height: 163cm\n\nMedical Conditions: Weight (mounjaro), back pain (protruding discs L4 and L5, bilateral facet arthritis), pernicious anaemia (B12 injections)\nMedications: Tramadol, meloxicam, panadol osteo, pregablin, Vit D, magnesium, Vit B12 injections, noriday (the pill), mounjano\n\nHealth Goals: Get down to 75kgs, be pain free, build up cardio, strength and flexibility\n\nHealth History: Around 35, got down to around 91kgs - one of my lowest in adult life. Since covid went from 145.2kg (heaviest) to 103.4kg in 2023, but serious back flare up stopped exercise for 6 months and went back up to 123kg\n\nFamily History: Mother struggles with weight, hypothyroidism, osteoarthritis, uses wheelchair, migraines, epilepsy, being assessed for parkinson's. Father had surgery for sciatica, high blood pressure\n\nSleep: Always struggled sleeping, both getting to sleep and waking up. Couple times a week only get 4 hours. Good night is 6 hours. Constantly tired\n\nExercise: Currently doing 2 exercise classes per week (cardio/strength) plus one yoga class\n\nDiet: Sometimes sugar cravings but rare. More carbs. Drinks alcohol 2-3 nights per week. Craves coffee but limits to two per day. Uses bondi meal prep delivery service\n\nPain: Back and hips pain, significant morning stiffness, high inflammation, rosacea\n\nTreatments: Chinese acupuncturist, therapeutic massage, hypnotherapy for back pain, chiros, physios, exercise physiologists`,
        sessions: 0,
        healthGoals: ['Get down to 75kgs', 'Be pain free', 'Build up cardio', 'Build up strength and flexibility', 'Improve sleep quality'],
        challenges: ['Chronic back pain', 'Weight management', 'Sleep issues', 'Inflammation', 'Morning stiffness', 'Work-life balance'],
        occupation: 'Fundraising - Executive Director, Development (Faculties)',
        relationshipStatus: 'Fiancé',
        location: 'Brent, UK',
        healthConcerns: ['Chronic back pain', 'Weight management', 'Sleep disorders', 'High inflammation', 'Pernicious anaemia', 'Family history of neurological conditions'],
        nutripathTests: [
          {
            id: 'test_1',
            testName: 'DNA Test - Comprehensive Genetic Analysis',
            dateOrdered: '28/07/2025',
            status: 'results-received',
            results: 'APOE4 variant detected, COMT slow metabolizer, MTHFR heterozygous mutation. Genetic predisposition to inflammation and need for specific nutrient support.',
            notes: 'Results discussed in session 2. Recommended targeted supplements based on genetic markers.',
            cost: 450,
            attachments: [
              {
                id: 'att_1',
                fileName: 'Victoria_DNA_Test_Results.pdf',
                fileType: 'pdf',
                fileSize: 2456789, // ~2.5MB
                uploadDate: '01/08/2025',
                description: 'Complete DNA analysis report from Nutripath',
                fileUrl: '/client-files/victoria-sloan/dna-test-results.pdf'
              },
              {
                id: 'att_2',
                fileName: 'Genetic_Variants_Summary.png',
                fileType: 'image',
                fileSize: 687432, // ~0.7MB
                uploadDate: '01/08/2025',
                description: 'Visual summary of key genetic variants'
              }
            ]
          },
          {
            id: 'test_2',
            testName: 'Microbiome Test - Comprehensive Stool Analysis',
            dateOrdered: '04/08/2025',
            status: 'completed',
            results: 'Low diversity score (3.2/10), elevated Firmicutes:Bacteroidetes ratio, depleted Bifidobacterium and Lactobacillus. Signs of leaky gut.',
            notes: 'Correlates with digestive issues and inflammation. Probiotic protocol initiated.',
            cost: 320
          },
          {
            id: 'test_3',
            testName: 'DUTCH Test - Complete Hormones',
            dateOrdered: '18/08/2025',
            status: 'ordered',
            notes: 'To assess cortisol patterns and sex hormone balance in relation to stress and weight management goals.',
            cost: 380
          }
        ],
        coachingHours: {
          totalHoursPurchased: 3,
          totalHoursUsed: 2.5,
          hourlyRate: 300,
          packageDetails: [
            {
              packageName: 'Supercharge Your Life - 3 Hour Program Package',
              hoursIncluded: 3,
              purchaseDate: '25/07/2025',
              expiryDate: '25/01/2026'
            }
          ],
          sessionsLog: [
            {
              id: 'session_1',
              date: '28/07/2025',
              startTime: '10:00 AM',
              endTime: '11:30 AM',
              duration: 1.5,
              sessionType: 'initial-consultation',
              notes: 'Initial consultation discussing health goals, back pain management, and weight loss strategies. Reviewed current medications and exercise limitations.',
              status: 'completed',
              rateCharged: 300
            },
            {
              id: 'session_2', 
              date: '04/08/2025',
              startTime: '2:00 PM',
              endTime: '3:00 PM',
              duration: 1,
              sessionType: 'follow-up',
              notes: 'Follow-up session reviewing sleep improvements and discussing nutrition plan. Adjusted supplement recommendations.',
              status: 'completed',
              rateCharged: 300
            },
            {
              id: 'session_3',
              date: '18/08/2025', 
              startTime: '10:00 AM',
              endTime: '11:00 AM',
              duration: 1,
              sessionType: 'package-session',
              notes: 'Scheduled session to review progress and adjust exercise plan.',
              status: 'scheduled',
              rateCharged: 300
            }
          ]
        }
      }
    ]
    
    return recentClients
  }

  // Save imported clients to localStorage (only the 3 recent clients)
  async importAndSaveClients(): Promise<SheetClient[]> {
    // Clear any existing clients first
    localStorage.removeItem('biohackme_clients')
    
    // Use only the 3 recent clients
    const clients = this.getRecentClients()
    
    if (clients.length > 0) {
      // Save to localStorage
      localStorage.setItem('biohackme_clients', JSON.stringify(clients))
      console.log(`💾 Saved ${clients.length} recent clients to localStorage (cleared all previous clients)`)
    }

    return clients
  }
}

// Export singleton instance
export const sheetsImporter = new GoogleSheetsImporter()
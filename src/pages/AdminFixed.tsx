import { useState, useEffect } from 'react'
import { xeroIntegration, syncClientWithXero } from '../utils/xeroIntegration'
import { fileManager, formatFileSize } from '../utils/fileManager'
import { Helmet } from 'react-helmet-async'
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Video,
  Settings,
  Plus,
  Search,
  Filter,
  BarChart3,
  Upload,
  Clock
} from 'lucide-react'

interface Client {
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
  healthGoals: string[] // Legacy field - will be migrated to goals
  challenges: string[]
  healthConcerns?: string[]
  occupation?: string
  relationshipStatus?: string
  location?: string
  nextSession?: string
  sessionHistory: SessionRecord[]
  billing?: BillingInfo
  nutripathTests?: NutripathTest[]
  toniReferrals?: ToniReferral[]
  coachingHours?: CoachingHours
  // New smart progress tracking fields
  goals?: ClientGoal[]
  actionPoints?: ActionPoint[]
  progressNotes?: ProgressNote[]
  overallProgressScore?: number // 0-100 based on goal achievements
}

interface SessionRecord {
  id: string
  date: string
  time: string
  duration: string
  notes: string
  type: 'consultation' | 'follow-up' | 'assessment'
  status: 'completed' | 'scheduled' | 'cancelled'
}

interface BillingInfo {
  totalCharged: number
  totalPaid: number
  outstandingAmount: number
  xeroContactId?: string
  invoices: Invoice[]
}

interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  description: string
  xeroInvoiceId?: string
}

interface NutripathTest {
  id: string
  testName: string
  dateOrdered: string
  status: 'ordered' | 'completed' | 'results-received' | 'discussed'
  results?: string
  notes?: string
  cost?: number
  attachments?: TestAttachment[]
}

interface TestAttachment {
  id: string
  fileName: string
  fileType: 'pdf' | 'image' | 'document'
  fileSize: number
  uploadDate: string
  description?: string
  fileUrl?: string // For storing file path or URL
}

interface ToniReferral {
  id: string
  dateReferred: string
  reason: string
  status: 'referred' | 'appointment-booked' | 'completed' | 'ongoing'
  notes?: string
  outcome?: string
}

interface CoachingHours {
  totalHoursPurchased: number
  totalHoursUsed: number
  hourlyRate: number
  packageDetails?: {
    packageName: string
    hoursIncluded: number
    purchaseDate: string
    expiryDate?: string
  }[]
  sessionsLog: CoachingSession[]
}

interface CoachingSession {
  id: string
  date: string
  startTime: string
  endTime: string
  duration: number // in hours (e.g., 1.5 for 1 hour 30 minutes)
  sessionType: 'initial-consultation' | 'follow-up' | 'package-session' | 'ad-hoc'
  notes: string
  status: 'completed' | 'scheduled' | 'cancelled' | 'no-show'
  rateCharged?: number
  linkedGoals?: string[] // IDs of goals this session addresses
  actionPoints?: ActionPoint[]
  progressNotes?: ProgressNote[]
}

interface ClientGoal {
  id: string
  title: string
  description: string
  category: 'nutrition' | 'fitness' | 'sleep' | 'stress' | 'energy' | 'weight' | 'other'
  priority: 'high' | 'medium' | 'low'
  targetDate?: string
  status: 'not-started' | 'in-progress' | 'achieved' | 'paused' | 'discontinued'
  progressPercentage: number // 0-100
  createdDate: string
  achievedDate?: string
  milestones: Milestone[]
  relatedSessions: string[] // Session IDs
  notes?: string
}

interface Milestone {
  id: string
  title: string
  description?: string
  targetDate?: string
  achievedDate?: string
  status: 'pending' | 'achieved' | 'overdue'
  notes?: string
}

interface ActionPoint {
  id: string
  description: string
  assignedDate: string
  dueDate?: string
  completedDate?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  linkedGoalId?: string
  notes?: string
}

interface ProgressNote {
  id: string
  date: string
  content: string
  type: 'observation' | 'improvement' | 'challenge' | 'achievement' | 'feedback'
  linkedGoalId?: string
  attachments?: string[]
}

export default function AdminFixed() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [clientCount, setClientCount] = useState(0)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState('')
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [showHoursModal, setShowHoursModal] = useState(false)
  const [isXeroConnected, setIsXeroConnected] = useState(false)
  const [isConnectingXero, setIsConnectingXero] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set())
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [clientChanges, setClientChanges] = useState<{[key: string]: any}>({})
  const [fileRefreshTrigger, setFileRefreshTrigger] = useState(0)
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set())
  const [showAllSessionsModal, setShowAllSessionsModal] = useState(false)
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState('')

  // Goals and progress tracking state
  const [showGoalsModal, setShowGoalsModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<ClientGoal | null>(null)
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [selectedGoalForProgress, setSelectedGoalForProgress] = useState<string | null>(null)

  // State for files and storage info
  const [clientFiles, setClientFiles] = useState<any[]>([])
  const [storageInfo, setStorageInfo] = useState<any>({
    totalFiles: 0,
    totalSizeMB: '0.00',
    localStorageMB: '0.00',
    indexedDBMB: '0.00',
    localStoragePercent: 0,
    isLocalStorageNearLimit: false
  })

  // Get client files with refresh trigger to force updates
  const loadClientFiles = async (clientId: string) => {
    try {
      // fileRefreshTrigger is used to force re-evaluation
      const files = await fileManager.getClientFiles(clientId)
      console.log(`📁 Files for client ${clientId}:`, files.length, files)
      setClientFiles(files)
      
      // Also update storage info
      const storage = await fileManager.getStorageInfo()
      setStorageInfo(storage)
    } catch (error) {
      console.error('Error loading client files:', error)
      // Fallback to sync method
      const files = fileManager.getClientFilesSync(clientId)
      setClientFiles(files)
    }
  }

  // Load files when client or refresh trigger changes
  useEffect(() => {
    if (selectedClient) {
      loadClientFiles(selectedClient.id)
    }
  }, [selectedClient?.id, fileRefreshTrigger])

  // Load existing clients or set up the 3 recent clients
  useEffect(() => {
    // Check Xero connection status
    setIsXeroConnected(xeroIntegration.isConnected())
    
    // Load existing client data
    const saved = localStorage.getItem('biohackme_clients')
    if (saved) {
      try {
        const clientData = JSON.parse(saved)
        // Add session history to existing clients if not present
        const clientsWithSessions = clientData.map((client: any) => ({
          ...client,
          sessionHistory: client.sessionHistory || [],
          nextSession: client.nextSession || '',
          billing: client.billing || undefined,
          nutripathTests: client.nutripathTests || [],
          toniReferrals: client.toniReferrals || [],
          coachingHours: client.coachingHours || undefined
        }))
        setClients(clientsWithSessions)
        setClientCount(clientsWithSessions.length)
      } catch (error) {
        console.error('Error loading clients:', error)
        setClients([])
        setClientCount(0)
      }
    } else {
      // No existing data, create Victoria Sloan as default client
      const defaultClients = [
        {
          id: 'victoria-sloan',
          name: 'Victoria Sloan',
          email: 'victoria.sloan@gmail.com',
          phone: '+61 400 000 000',
          age: '35',
          status: 'active' as const,
          program: 'Signature Coaching Program',
          joinDate: new Date().toLocaleDateString(),
          lastContact: new Date().toLocaleDateString(),
          notes: 'Premium coaching client with comprehensive health goals',
          sessions: 0,
          healthGoals: ['Increase energy', 'Optimize nutrition', 'Better sleep'],
          challenges: ['Busy schedule', 'Stress management'],
          healthConcerns: ['Low energy', 'Poor sleep quality'],
          occupation: 'Executive',
          relationshipStatus: 'Married',
          location: 'Sydney, Australia',
          sessionHistory: [],
          nextSession: '',
          nutripathTests: [],
          toniReferrals: [],
          coachingHours: {
            purchased: 10,
            used: 0,
            remaining: 10,
            purchaseDate: new Date().toLocaleDateString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            sessionsLog: []
          },
          // Smart progress tracking fields
          goals: [
            {
              id: 'goal-1',
              title: 'Increase Daily Energy Levels',
              description: 'Achieve consistent energy throughout the day without afternoon crashes',
              category: 'energy',
              priority: 'high',
              targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'in-progress',
              progressPercentage: 25,
              createdDate: new Date().toLocaleDateString(),
              milestones: [
                {
                  id: 'milestone-1',
                  title: 'Complete nutrition assessment',
                  status: 'achieved',
                  achievedDate: new Date().toLocaleDateString()
                },
                {
                  id: 'milestone-2',
                  title: 'Implement morning routine',
                  status: 'pending'
                }
              ],
              relatedSessions: [],
              notes: 'Focus on morning routine and afternoon nutrition timing'
            },
            {
              id: 'goal-2',
              title: 'Optimize Sleep Quality',
              description: 'Achieve 7-8 hours of deep, restorative sleep nightly',
              category: 'sleep',
              priority: 'high',
              targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'in-progress',
              progressPercentage: 40,
              createdDate: new Date().toLocaleDateString(),
              milestones: [
                {
                  id: 'milestone-3',
                  title: 'Establish bedtime routine',
                  status: 'achieved',
                  achievedDate: new Date().toLocaleDateString()
                },
                {
                  id: 'milestone-4',
                  title: 'Reduce screen time before bed',
                  status: 'pending'
                }
              ],
              relatedSessions: []
            },
            {
              id: 'goal-3',
              title: 'Stress Management Mastery',
              description: 'Develop effective stress management techniques for high-pressure work environment',
              category: 'stress',
              priority: 'medium',
              targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'not-started',
              progressPercentage: 0,
              createdDate: new Date().toLocaleDateString(),
              milestones: [
                {
                  id: 'milestone-5',
                  title: 'Learn breathing techniques',
                  status: 'pending'
                },
                {
                  id: 'milestone-6',
                  title: 'Implement daily meditation',
                  status: 'pending'
                }
              ],
              relatedSessions: []
            }
          ],
          actionPoints: [
            {
              id: 'action-1',
              description: 'Take magnesium supplement 30 mins before bed',
              assignedDate: new Date().toLocaleDateString(),
              status: 'in-progress',
              priority: 'high',
              linkedGoalId: 'goal-2',
              notes: 'Start with 200mg, increase to 400mg if needed'
            },
            {
              id: 'action-2',
              description: 'Complete 7-day food and energy diary',
              assignedDate: new Date().toLocaleDateString(),
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'pending',
              priority: 'high',
              linkedGoalId: 'goal-1'
            }
          ],
          progressNotes: [
            {
              id: 'note-1',
              date: new Date().toLocaleDateString(),
              content: 'Client very motivated and engaged. Already making dietary changes. Reported better morning energy after removing afternoon coffee.',
              type: 'improvement',
              linkedGoalId: 'goal-1'
            }
          ],
          overallProgressScore: 32
        },
        {
          id: 'diana-taylor',
          name: 'Diana Taylor',
          email: 'diana.taylor@example.com',
          phone: '+61 400 000 001',
          age: '42',
          status: 'active' as const,
          program: 'Premium Health Optimization',
          joinDate: new Date().toLocaleDateString(),
          lastContact: new Date().toLocaleDateString(),
          notes: 'Executive focused on longevity and performance optimization',
          sessions: 0,
          healthGoals: ['Weight management', 'Cognitive enhancement', 'Hormone optimization'],
          challenges: ['Travel schedule', 'High stress'],
          healthConcerns: ['Metabolic health', 'Sleep quality'],
          occupation: 'CEO',
          relationshipStatus: 'Single',
          location: 'Melbourne, Australia',
          sessionHistory: [],
          nextSession: '',
          nutripathTests: [],
          toniReferrals: [],
          coachingHours: {
            purchased: 20,
            used: 0,
            remaining: 20,
            purchaseDate: new Date().toLocaleDateString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            sessionsLog: []
          },
          // Smart progress tracking fields
          goals: [
            {
              id: 'diana-goal-1',
              title: 'Optimize Metabolic Health',
              description: 'Improve insulin sensitivity and metabolic markers through targeted nutrition and lifestyle interventions',
              category: 'nutrition',
              priority: 'high',
              targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'not-started',
              progressPercentage: 0,
              createdDate: new Date().toLocaleDateString(),
              milestones: [
                {
                  id: 'diana-milestone-1',
                  title: 'Complete comprehensive metabolic panel',
                  status: 'pending'
                },
                {
                  id: 'diana-milestone-2',
                  title: 'Implement time-restricted eating',
                  status: 'pending'
                }
              ],
              relatedSessions: []
            },
            {
              id: 'diana-goal-2',
              title: 'Executive Performance Enhancement',
              description: 'Optimize cognitive function and decision-making capacity for high-pressure leadership role',
              category: 'brain',
              priority: 'high',
              targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: 'not-started',
              progressPercentage: 0,
              createdDate: new Date().toLocaleDateString(),
              milestones: [
                {
                  id: 'diana-milestone-3',
                  title: 'Establish morning cognitive routine',
                  status: 'pending'
                },
                {
                  id: 'diana-milestone-4',
                  title: 'Implement nootropic protocol',
                  status: 'pending'
                }
              ],
              relatedSessions: []
            }
          ],
          actionPoints: [
            {
              id: 'diana-action-1',
              description: 'Schedule comprehensive executive health assessment',
              assignedDate: new Date().toLocaleDateString(),
              status: 'pending',
              priority: 'high',
              linkedGoalId: 'diana-goal-1'
            },
            {
              id: 'diana-action-2',
              description: 'Begin 16:8 intermittent fasting protocol',
              assignedDate: new Date().toLocaleDateString(),
              status: 'pending',
              priority: 'medium',
              linkedGoalId: 'diana-goal-1'
            }
          ],
          progressNotes: [],
          overallProgressScore: 0
        }
      ]
      setClients(defaultClients)
      setClientCount(defaultClients.length)
      localStorage.setItem('biohackme_clients', JSON.stringify(defaultClients))
    }
  }, [])

  // Xero connection functions
  const handleConnectXero = () => {
    const authUrl = xeroIntegration.getAuthorizationUrl()
    window.location.href = authUrl
  }

  const handleDisconnectXero = () => {
    xeroIntegration.disconnect()
    setIsXeroConnected(false)
    // Update clients to remove billing info
    const updatedClients = clients.map(client => ({
      ...client,
      billing: undefined
    }))
    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
  }

  const syncClientBilling = async (client: Client) => {
    if (!isXeroConnected) return

    setIsConnectingXero(true)
    try {
      const billing = await syncClientWithXero(client)
      if (billing) {
        const updatedClients = clients.map(c => 
          c.id === client.id ? { ...c, billing } : c
        )
        setClients(updatedClients)
        localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
      }
    } catch (error) {
      console.error('Error syncing billing:', error)
    } finally {
      setIsConnectingXero(false)
    }
  }

  // File upload handler
  const handleFileUpload = async (file: File, category: string, clientId: string) => {
    console.log('📎 Uploading file:', { fileName: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`, category, clientId })
    const uploadId = `${category}_${Date.now()}_${Math.random()}`
    setUploadingFiles(prev => new Set(prev).add(uploadId))

    try {
      const clientFile = await fileManager.uploadFile(
        clientId,
        file,
        `${category} - ${file.name}`,
        category as any,
        undefined // Don't tie to specific test, this is general document upload
      )
      
      console.log('✅ File uploaded successfully:', clientFile)

      // For general document uploads, we don't need to update client data 
      // as files are managed separately by fileManager
      
      // Force refresh of file display
      setFileRefreshTrigger(prev => prev + 1)
      
      console.log('✅ File uploaded and display refreshed:', clientFile.fileName)
    } catch (error) {
      console.error('❌ File upload failed:', error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      if (errorMessage.includes('too large')) {
        alert(`❌ File too large!\n\n${file.name} is ${(file.size / (1024 * 1024)).toFixed(1)}MB\nMaximum file size is 2MB.\n\nPlease compress your file or use a smaller version.`)
      } else if (errorMessage.includes('Storage')) {
        alert(`❌ Storage full!\n\nPlease delete some files first, then try uploading again.\n\nGo to the file sections below and delete files you no longer need.`)
      } else {
        alert(`❌ Upload failed!\n\n${errorMessage}\n\nTry again or contact support if the problem persists.`)
      }
    } finally {
      setUploadingFiles(prev => {
        const newSet = new Set(prev)
        newSet.delete(uploadId)
        return newSet
      })
    }
  }

  // Delete attachment handler
  const handleDeleteAttachment = (attachmentId: string, testId: string, clientId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      fileManager.deleteFile(attachmentId)
      
      // Update client data
      const updatedClients = clients.map(client => {
        if (client.id === clientId && client.nutripathTests) {
          const updatedTests = client.nutripathTests.map(test => {
            if (test.id === testId && test.attachments) {
              return {
                ...test,
                attachments: test.attachments.filter(att => att.id !== attachmentId)
              }
            }
            return test
          })
          return { ...client, nutripathTests: updatedTests }
        }
        return client
      })

      setClients(updatedClients)
      localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    }
  }

  const handleImport = async () => {
    setIsImporting(true)
    setImportStatus('Loading your 3 recent clients...')
    
    try {
      const { sheetsImporter } = await import('../utils/importSheetsData')
      
      setImportStatus('Loading recent clients...')
      const importedClients = await sheetsImporter.importAndSaveClients()
      
      if (importedClients.length === 0) {
        setImportStatus('No clients found in sheet.')
        setIsImporting(false)
        return
      }

      setImportStatus(`Successfully loaded ${importedClients.length} recent clients!`)
      
      // Convert to our client format with session history
      const clients: Client[] = importedClients.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        age: client.age,
        status: client.status,
        program: client.program,
        joinDate: client.joinDate,
        lastContact: client.lastContact,
        notes: client.notes,
        sessions: client.sessions,
        healthGoals: client.healthGoals,
        challenges: client.challenges,
        healthConcerns: client.healthConcerns,
        occupation: client.occupation,
        relationshipStatus: client.relationshipStatus,
        location: client.location,
        nextSession: '',
        sessionHistory: [],
        billing: undefined,
        nutripathTests: [],
        toniReferrals: [],
        coachingHours: undefined
      }))

      setClients(clients)
      setClientCount(clients.length)
      localStorage.setItem('biohackme_clients', JSON.stringify(clients))
      
      setTimeout(() => {
        setImportStatus('')
        setIsImporting(false)
        setActiveTab('clients')
      }, 2000)
      
    } catch (error) {
      console.error('Import error:', error)
      setImportStatus('Import failed. Check console for details.')
      setIsImporting(false)
    }
  }

  const scheduleSession = (client: Client, sessionData: { date: string; time: string; type: string }) => {
    const newSession: SessionRecord = {
      id: `session_${Date.now()}`,
      date: sessionData.date,
      time: sessionData.time,
      duration: '60 minutes',
      notes: '',
      type: sessionData.type as any,
      status: 'scheduled'
    }

    const updatedClients = clients.map(c => 
      c.id === client.id 
        ? { 
            ...c, 
            nextSession: `${sessionData.date} at ${sessionData.time}`,
            sessionHistory: [...c.sessionHistory, newSession]
          }
        : c
    )
    
    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    setShowSessionModal(false)
  }

  const handleHoursSetup = (hoursData: any) => {
    const updatedClients = clients.map(c => 
      c.id === hoursData.client 
        ? { 
            ...c, 
            coachingHours: {
              totalHoursPurchased: parseFloat(hoursData.totalHours),
              totalHoursUsed: 0,
              hourlyRate: parseFloat(hoursData.hourlyRate),
              packageDetails: [{
                packageName: hoursData.packageName,
                hoursIncluded: parseFloat(hoursData.totalHours),
                purchaseDate: hoursData.purchaseDate
              }],
              sessionsLog: []
            }
          }
        : c
    )
    
    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    setShowHoursModal(false)
  }

  // Smart goal linking function - analyzes session notes and links to relevant goals
  const analyzeSessionForGoals = (notes: string, clientGoals: ClientGoal[]) => {
    const notesLower = notes.toLowerCase()
    const linkedGoals: string[] = []
    
    // Keywords for different goal categories
    const keywords = {
      energy: ['energy', 'tired', 'fatigue', 'vitality', 'alertness', 'wake up', 'morning'],
      sleep: ['sleep', 'insomnia', 'rest', 'bedtime', 'wake up', 'tired', 'melatonin'],
      nutrition: ['diet', 'eating', 'food', 'meal', 'nutrition', 'supplement', 'vitamin'],
      fitness: ['exercise', 'workout', 'movement', 'activity', 'strength', 'cardio', 'gym'],
      stress: ['stress', 'anxiety', 'calm', 'meditation', 'breathing', 'overwhelmed', 'pressure'],
      weight: ['weight', 'pounds', 'kg', 'body fat', 'metabolism', 'appetite']
    }
    
    // Find goals that match session content
    clientGoals.forEach(goal => {
      const categoryKeywords = keywords[goal.category as keyof typeof keywords] || []
      const titleWords = goal.title.toLowerCase().split(' ')
      
      // Check if session notes mention this goal category or title
      const hasKeyword = categoryKeywords.some(keyword => notesLower.includes(keyword))
      const hasTitleMatch = titleWords.some(word => word.length > 3 && notesLower.includes(word))
      
      if (hasKeyword || hasTitleMatch) {
        linkedGoals.push(goal.id)
      }
    })
    
    return linkedGoals
  }

  const handleSessionSubmit = (sessionData: any) => {
    console.log('📝 Session form submitted with data:', sessionData)
    
    // Smart goal linking
    const targetClient = clients.find(c => c.id === sessionData.client)
    const linkedGoals = targetClient?.goals ? analyzeSessionForGoals(sessionData.notes, targetClient.goals) : []
    
    const newSession: SessionRecord = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: sessionData.date,
      time: sessionData.time,
      duration: sessionData.duration,
      notes: sessionData.notes,
      type: sessionData.type as 'consultation' | 'follow-up' | 'assessment',
      status: 'completed',
      linkedGoals: linkedGoals
    }
    
    console.log('🎯 Smart linking found goals:', linkedGoals)

    console.log('✅ New session created:', newSession)

    const newCoachingSession = {
      id: `coaching_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: sessionData.date,
      startTime: sessionData.time,
      endTime: '', // Could be calculated from duration if needed
      duration: parseFloat(sessionData.duration),
      sessionType: sessionData.type as 'initial-consultation' | 'follow-up' | 'package-session' | 'ad-hoc',
      notes: sessionData.notes,
      status: 'completed' as const,
      rateCharged: 300, // Default rate, could be dynamic
      linkedGoals: linkedGoals,
      actionPoints: [], // Can be populated from session notes analysis
      progressNotes: []
    }

    const targetClientId = sessionData.client
    console.log('🎯 Looking for client ID:', targetClientId)
    console.log('📋 Available clients:', clients.map(c => ({ id: c.id, name: c.name })))

    const updatedClients = clients.map(c => {
      if (c.id === targetClientId) {
        console.log('✅ Found matching client, updating:', c.name)
        
        // Update goals with session relationships
        const updatedGoals = c.goals?.map(goal => {
          if (linkedGoals.includes(goal.id)) {
            return {
              ...goal,
              relatedSessions: [...goal.relatedSessions, newSession.id]
            }
          }
          return goal
        }) || []
        
        // Auto-generate progress note if goals were linked
        const sessionProgressNotes = linkedGoals.length > 0 ? [{
          id: `auto-note-${Date.now()}`,
          date: sessionData.date,
          content: `Session addressed ${linkedGoals.length} goal(s). Notes: ${sessionData.notes.substring(0, 100)}${sessionData.notes.length > 100 ? '...' : ''}`,
          type: 'observation' as const,
          linkedGoalId: linkedGoals[0] // Link to primary goal
        }] : []
        
        const updatedClient = { 
          ...c, 
          nextSession: `${sessionData.date} at ${sessionData.time}`,
          sessionHistory: [...c.sessionHistory, newSession],
          goals: updatedGoals,
          progressNotes: [...(c.progressNotes || []), ...sessionProgressNotes],
          coachingHours: c.coachingHours ? {
            ...c.coachingHours,
            totalHoursUsed: c.coachingHours.totalHoursUsed + parseFloat(sessionData.duration),
            sessionsLog: [...c.coachingHours.sessionsLog, newCoachingSession]
          } : {
            totalHoursPurchased: 0,
            totalHoursUsed: parseFloat(sessionData.duration),
            hourlyRate: 300,
            sessionsLog: [newCoachingSession]
          }
        }
        
        console.log('🎯 Updated client with linked goals and progress notes')
        console.log('📊 Updated client session history length:', updatedClient.sessionHistory.length)
        return updatedClient
      }
      return c
    })
    
    console.log('💾 Saving updated clients to localStorage and state')
    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    
    // Force refresh the selected client if it's the one we updated
    const updatedSelectedClient = updatedClients.find(c => c.id === targetClientId)
    if (updatedSelectedClient && selectedClient?.id === targetClientId) {
      console.log('🔄 Refreshing selected client display')
      setSelectedClient(updatedSelectedClient)
    }
    
    setShowSessionModal(false)
    console.log('✅ Session saved successfully!')
  }

  // Handle updating existing session notes
  const handleUpdateSessionNotes = (sessionId: string, newNotes: string) => {
    if (!selectedClient) return

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id && client.coachingHours?.sessionsLog) {
        const updatedSessions = client.coachingHours.sessionsLog.map(session => 
          session.id === sessionId ? { ...session, notes: newNotes } : session
        )
        return {
          ...client,
          coachingHours: {
            ...client.coachingHours,
            sessionsLog: updatedSessions
          }
        }
      }
      return client
    })

    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    
    // Update selected client
    const updatedSelectedClient = updatedClients.find(c => c.id === selectedClient.id)
    if (updatedSelectedClient) {
      setSelectedClient(updatedSelectedClient)
    }

    setEditingSessionId(null)
    setEditingNotes('')
  }

  // Handle checkbox changes
  const handleCheckboxChange = (clientId: string, field: string, value: boolean) => {
    setClientChanges(prev => ({
      ...prev,
      [clientId]: {
        ...prev[clientId],
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }

  // Save client changes
  const saveClientChanges = (clientId: string) => {
    const changes = clientChanges[clientId]
    if (!changes) return

    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const updatedClient = { ...client }

        // Handle nutripath tests checkboxes
        if (changes.dnaTest !== undefined || changes.microbiomeTest !== undefined || changes.dutchTest !== undefined) {
          const tests = []
          if (changes.dnaTest) {
            tests.push({
              id: `dna_${Date.now()}`,
              testName: 'DNA Test',
              dateOrdered: new Date().toISOString().split('T')[0],
              status: 'ordered' as const,
              attachments: []
            })
          }
          if (changes.microbiomeTest) {
            tests.push({
              id: `microbiome_${Date.now()}`,
              testName: 'Microbiome Test',
              dateOrdered: new Date().toISOString().split('T')[0],
              status: 'ordered' as const,
              attachments: []
            })
          }
          if (changes.dutchTest) {
            tests.push({
              id: `dutch_${Date.now()}`,
              testName: 'DUTCH Test',
              dateOrdered: new Date().toISOString().split('T')[0],
              status: 'ordered' as const,
              attachments: []
            })
          }
          updatedClient.nutripathTests = [...(updatedClient.nutripathTests || []), ...tests]
        }

        // Handle Toni referral checkbox
        if (changes.toniReferral !== undefined) {
          if (changes.toniReferral) {
            // Adding a referral
            const referral = {
              id: `toni_${Date.now()}`,
              dateReferred: new Date().toISOString().split('T')[0],
              reason: 'General referral',
              status: 'referred' as const,
              notes: 'Referred to Toni Naturopath'
            }
            updatedClient.toniReferrals = [...(updatedClient.toniReferrals || []), referral]
            console.log('✅ Added Toni referral for client:', updatedClient.name)
          } else {
            // Removing referral (unchecked) - clear all referrals
            updatedClient.toniReferrals = []
            console.log('❌ Cleared Toni referrals for client:', updatedClient.name)
          }
        }

        return updatedClient
      }
      return client
    })

    setClients(updatedClients)
    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
    
    // Clear changes for this client - this allows multiple tests to be added
    setClientChanges(prev => {
      const newChanges = { ...prev }
      delete newChanges[clientId]
      return newChanges
    })
    
    setHasUnsavedChanges(Object.keys(clientChanges).length > 1)
    
    console.log('✅ Test results saved! You can now add more tests by ticking the checkboxes again.')
    
    // Update selected client if it's the current one
    if (selectedClient?.id === clientId) {
      const updatedSelectedClient = updatedClients.find(c => c.id === clientId)
      if (updatedSelectedClient) {
        setSelectedClient(updatedSelectedClient)
      }
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'sessions', label: 'Sessions', icon: Video },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <>
      <Helmet>
        <title>BiohackMe Admin</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shadow-md backdrop-blur">
                <img 
                  src="/images/biohackme-logo-white.png" 
                  alt="BiohackMe Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'block'
                  }}
                />
                <span className="text-white font-bold text-xl hidden">BM</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">BiohackMe</h1>
                <p className="text-emerald-100">Client Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white/90 backdrop-blur rounded-xl shadow-xl border border-emerald-100 p-6 mr-8">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${ 
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-102'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1">
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-xl shadow-md border border-emerald-100">
                      <h3 className="text-sm text-emerald-600 font-medium">Total Clients</h3>
                      <p className="text-3xl font-bold text-gray-900">{clientCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-teal-50 p-6 rounded-xl shadow-md border border-teal-100">
                      <h3 className="text-sm text-teal-600 font-medium">Recent Prospects</h3>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-blue-100">
                      <h3 className="text-sm text-blue-600 font-medium">Xero Integration</h3>
                      <p className={`text-2xl font-bold ${isXeroConnected ? 'text-green-600' : 'text-gray-400'}`}>
                        {isXeroConnected ? 'Connected' : 'Not Connected'}
                      </p>
                      {!isXeroConnected && (
                        <button 
                          onClick={handleConnectXero}
                          className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Connect Now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab('import')}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
                      >
                        Import Recent Clients
                      </button>
                      <button
                        onClick={() => setActiveTab('calendar')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                      >
                        Schedule Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Import */}
              {activeTab === 'import' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Import Clients</h2>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Google Sheets Integration</h3>
                        <p className="text-sm text-gray-600">Load your 3 recent client profiles</p>
                      </div>
                      <button
                        onClick={handleImport}
                        disabled={isImporting}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isImporting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Importing...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Import Recent Clients</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {importStatus && (
                      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                        <p className="text-blue-700 text-sm">{importStatus}</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Source: Google Sheets</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>URL: docs.google.com/spreadsheets/d/1GilsKiy4d...</p>
                        <p>Format: CSV Export</p>
                        <p>Expected: 3 recent client responses</p>
                        <p>Data: Names, emails, health goals, challenges</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Clients */}
              {activeTab === 'clients' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Clients ({clientCount})</h2>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search clients..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Client</span>
                      </button>
                    </div>
                  </div>
                  
                  {clientCount === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                      <p className="text-gray-600 mb-4">Import your clients from Google Sheets to get started.</p>
                      <button
                        onClick={() => setActiveTab('import')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Import Clients
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Client Directory</h3>
                      </div>
                      
                      <div className="divide-y divide-gray-200">
                        {filteredClients.map((client) => (
                          <div 
                            key={client.id} 
                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedClient(client)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  {client.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{client.name}</h4>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                    <div className="flex items-center">
                                      <Mail className="w-3 h-3 mr-1" />
                                      {client.email}
                                    </div>
                                    {client.phone && (
                                      <div className="flex items-center">
                                        <Phone className="w-3 h-3 mr-1" />
                                        {client.phone}
                                      </div>
                                    )}
                                    {client.nextSession && (
                                      <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Next: {client.nextSession}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  client.status === 'active' ? 'bg-green-100 text-green-800' :
                                  client.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {client.status}
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                  {client.sessions} sessions
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Client Profile Detail View */}
              {selectedClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                      <button 
                        onClick={() => setSelectedClient(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Contact & Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-400 mr-2" />
                              <span>{selectedClient.email}</span>
                            </div>
                            {selectedClient.phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                <span>{selectedClient.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <span>Joined: {selectedClient.joinDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Program Details</h3>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Program: </span>
                              <span className="font-medium">{selectedClient.program}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Status: </span>
                              <span className={`font-medium ${
                                selectedClient.status === 'active' ? 'text-green-600' :
                                selectedClient.status === 'prospect' ? 'text-yellow-600' :
                                'text-gray-600'
                              }`}>
                                {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Sessions: </span>
                              <span className="font-medium">{selectedClient.sessions}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Health Goals */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Health Goals
                        </h3>
                        <div className="space-y-2">
                          {selectedClient.healthGoals.map((goal, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenges */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          Current Challenges
                        </h3>
                        <div className="space-y-2">
                          {selectedClient.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Health Concerns (if available) */}
                      {selectedClient.healthConcerns && selectedClient.healthConcerns.length > 0 && (
                        <div className="bg-red-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            Health Concerns
                          </h3>
                          <div className="space-y-2">
                            {selectedClient.healthConcerns.map((concern, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{concern}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      {(selectedClient.occupation || selectedClient.relationshipStatus || selectedClient.location || selectedClient.age) && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            {selectedClient.age && (
                              <div>
                                <span className="text-gray-600">Age: </span>
                                <span>{selectedClient.age}</span>
                              </div>
                            )}
                            {selectedClient.occupation && (
                              <div>
                                <span className="text-gray-600">Occupation: </span>
                                <span>{selectedClient.occupation}</span>
                              </div>
                            )}
                            {selectedClient.relationshipStatus && (
                              <div>
                                <span className="text-gray-600">Relationship: </span>
                                <span>{selectedClient.relationshipStatus}</span>
                              </div>
                            )}
                            {selectedClient.location && (
                              <div>
                                <span className="text-gray-600">Location: </span>
                                <span>{selectedClient.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Coaching Hours Tracking */}
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-4 h-4 bg-emerald-500 rounded mr-2 flex items-center justify-center">
                            <span className="text-white text-xs">⏱</span>
                          </div>
                          Coaching Hours Tracking
                        </h3>
                        
                        {selectedClient.coachingHours ? (
                          <div className="space-y-4">
                            {/* Hours Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-xs text-gray-600">Hours Purchased</div>
                                <div className="text-lg font-semibold text-emerald-600">
                                  {selectedClient.coachingHours.totalHoursPurchased}h
                                </div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-xs text-gray-600">Hours Used</div>
                                <div className="text-lg font-semibold text-blue-600">
                                  {selectedClient.coachingHours.totalHoursUsed}h
                                </div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-xs text-gray-600">Hours Remaining</div>
                                <div className="text-lg font-semibold text-orange-600">
                                  {(selectedClient.coachingHours.totalHoursPurchased - selectedClient.coachingHours.totalHoursUsed).toFixed(1)}h
                                </div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-xs text-gray-600">Hourly Rate</div>
                                <div className="text-lg font-semibold text-gray-800">
                                  ${selectedClient.coachingHours.hourlyRate}/h
                                </div>
                              </div>
                            </div>

                            {/* Package Details */}
                            {selectedClient.coachingHours.packageDetails && selectedClient.coachingHours.packageDetails.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Packages Purchased</h4>
                                <div className="space-y-2 max-h-24 overflow-y-auto">
                                  {selectedClient.coachingHours.packageDetails.map((pkg, index) => (
                                    <div key={index} className="bg-white rounded p-2 border text-sm">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <span className="font-medium">{pkg.packageName}</span>
                                          <span className="text-gray-500 ml-2">({pkg.hoursIncluded}h)</span>
                                        </div>
                                        <div className="text-right text-xs text-gray-600">
                                          <div>Purchased: {pkg.purchaseDate}</div>
                                          {pkg.expiryDate && <div>Expires: {pkg.expiryDate}</div>}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Recent Sessions Log */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recent Sessions</h4>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {selectedClient.coachingHours.sessionsLog
                                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                  .slice(0, 5)
                                  .map((session) => (
                                    <div key={session.id} className="bg-white rounded p-3 border">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <div className="font-medium text-sm">{session.date}</div>
                                          <div className="text-xs text-gray-600">
                                            {session.startTime} - {session.endTime} ({session.duration}h)
                                          </div>
                                          <div className="text-xs text-gray-500 capitalize">
                                            {session.sessionType.replace('-', ' ')}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <span className={`text-xs px-2 py-1 rounded-full ${
                                            session.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            session.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                            session.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                          }`}>
                                            {session.status}
                                          </span>
                                          {session.rateCharged && (
                                            <div className="text-xs text-gray-600 mt-1">
                                              ${session.rateCharged}/h
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        {editingSessionId === session.id ? (
                                          <div className="space-y-2">
                                            <textarea
                                              value={editingNotes}
                                              onChange={(e) => setEditingNotes(e.target.value)}
                                              className="w-full text-xs font-mono border border-blue-300 rounded p-2 bg-blue-50 focus:outline-none focus:border-blue-500"
                                              rows={4}
                                              placeholder="Add or update session notes..."
                                            />
                                            <div className="flex gap-2">
                                              <button
                                                onClick={() => handleUpdateSessionNotes(session.id, editingNotes)}
                                                className="text-xs px-2 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                              >
                                                Save Notes
                                              </button>
                                              <button
                                                onClick={() => {
                                                  setEditingSessionId(null)
                                                  setEditingNotes('')
                                                }}
                                                className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <>
                                            {session.notes ? (
                                              <div className="group">
                                                <div className="text-xs text-gray-600 bg-blue-50 rounded p-2 border border-blue-100 font-mono leading-relaxed whitespace-pre-wrap">
                                                  📝 {session.notes}
                                                </div>
                                                <button
                                                  onClick={() => {
                                                    setEditingSessionId(session.id)
                                                    setEditingNotes(session.notes || '')
                                                  }}
                                                  className="text-xs text-blue-600 hover:text-blue-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                  ✏️ Edit notes
                                                </button>
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => {
                                                  setEditingSessionId(session.id)
                                                  setEditingNotes('')
                                                }}
                                                className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200"
                                              >
                                                + Add session notes
                                              </button>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              
                              {selectedClient.coachingHours.sessionsLog.length > 5 && (
                                <button 
                                  onClick={() => setShowAllSessionsModal(true)}
                                  className="text-xs text-emerald-600 hover:text-emerald-700 mt-2"
                                >
                                  View All Sessions ({selectedClient.coachingHours.sessionsLog.length} total)
                                </button>
                              )}
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-2">
                              <button 
                                onClick={() => setShowSessionModal(true)}
                                className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
                              >
                                Log Session
                              </button>
                              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                Add Package
                              </button>
                              <button 
                                onClick={() => setShowAllSessionsModal(true)}
                                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                              >
                                View All Sessions
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <p className="text-sm">No coaching hours recorded yet</p>
                            <div className="mt-3 space-x-2">
                              <button 
                                onClick={() => setShowHoursModal(true)}
                                className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
                              >
                                Set Up Hours Tracking
                              </button>
                              <button 
                                onClick={() => setShowSessionModal(true)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                              >
                                Log First Session
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Session History */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          Session History
                        </h3>
                        {selectedClient.sessionHistory && selectedClient.sessionHistory.length > 0 ? (
                          <div className="space-y-3">
                            {selectedClient.sessionHistory.map((session) => (
                              <div key={session.id} className="bg-white rounded p-3 border">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <span className="font-medium text-sm">{session.date}</span>
                                    <span className="text-gray-500 text-sm ml-2">{session.time}</span>
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    session.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    session.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {session.status}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-600 mb-1">
                                  {session.type} • {session.duration}
                                </div>
                                {session.notes && (
                                  <div className="mt-3">
                                    <div className="text-xs font-medium text-gray-600 mb-2 flex items-center justify-between">
                                      <span>📝 Session Notes</span>
                                      {session.notes.length > 150 && (
                                        <button
                                          onClick={() => {
                                            const newExpanded = new Set(expandedNotes)
                                            if (expandedNotes.has(session.id)) {
                                              newExpanded.delete(session.id)
                                            } else {
                                              newExpanded.add(session.id)
                                            }
                                            setExpandedNotes(newExpanded)
                                          }}
                                          className="text-blue-600 hover:text-blue-800 text-xs"
                                        >
                                          {expandedNotes.has(session.id) ? 'Collapse' : 'Expand'}
                                        </button>
                                      )}
                                    </div>
                                    <div className={`text-sm text-gray-700 bg-blue-50 rounded-lg p-3 border border-blue-100 font-mono leading-relaxed whitespace-pre-wrap ${
                                      !expandedNotes.has(session.id) && session.notes.length > 150 
                                        ? 'max-h-20 overflow-hidden relative' 
                                        : ''
                                    }`}>
                                      {session.notes}
                                      {!expandedNotes.has(session.id) && session.notes.length > 150 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-blue-50 to-transparent"></div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No sessions recorded yet</p>
                        )}
                      </div>

                      {/* Client Documents */}
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                          Client Documents & Files
                        </h3>
                        
                        <div className="space-y-4">
                          {/* Enhanced Multi-File Upload Section */}
                          <div className="bg-white rounded p-4 border border-indigo-200">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900">Upload Documents</h4>
                              <div className="text-xs text-gray-500">
                                {clientFiles.length} files uploaded
                              </div>
                            </div>

                            {/* Category-Based Upload */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              {/* Test Results */}
                              <div className="border border-green-200 rounded-lg p-3 hover:border-green-300 transition-colors">
                                <input
                                  type="file"
                                  id={`test-results-upload-${selectedClient.id}`}
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                  multiple
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || [])
                                    console.log('🧪 Test Results: Selected files:', files.map(f => f.name))
                                    
                                    // Upload files sequentially to avoid issues
                                    for (const file of files) {
                                      await handleFileUpload(file, 'test-results', selectedClient.id)
                                    }
                                    
                                    // Reset the input so the same files can be selected again if needed
                                    e.target.value = ''
                                  }}
                                />
                                <label 
                                  htmlFor={`test-results-upload-${selectedClient.id}`}
                                  className="cursor-pointer block text-center"
                                >
                                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-green-600 text-sm">🧪</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-800">Test Results</div>
                                  <div className="text-xs text-gray-500">Multiple files</div>
                                </label>
                              </div>

                              {/* Session Notes */}
                              <div className="border border-blue-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                                <input
                                  type="file"
                                  id={`session-notes-upload-${selectedClient.id}`}
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                                  multiple
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || [])
                                    console.log('📝 Session Notes: Selected files:', files.map(f => f.name))
                                    
                                    // Upload files sequentially to avoid issues
                                    for (const file of files) {
                                      await handleFileUpload(file, 'session-notes', selectedClient.id)
                                    }
                                    
                                    // Reset the input so the same files can be selected again if needed
                                    e.target.value = ''
                                  }}
                                />
                                <label 
                                  htmlFor={`session-notes-upload-${selectedClient.id}`}
                                  className="cursor-pointer block text-center"
                                >
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-blue-600 text-sm">📝</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-800">Session Notes</div>
                                  <div className="text-xs text-gray-500">Multiple files</div>
                                </label>
                              </div>

                              {/* Contracts */}
                              <div className="border border-purple-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                                <input
                                  type="file"
                                  id={`contracts-upload-${selectedClient.id}`}
                                  accept=".pdf,.doc,.docx"
                                  multiple
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || [])
                                    console.log('📋 Contracts: Selected files:', files.map(f => f.name))
                                    
                                    // Upload files sequentially to avoid issues
                                    for (const file of files) {
                                      await handleFileUpload(file, 'contracts', selectedClient.id)
                                    }
                                    
                                    // Reset the input so the same files can be selected again if needed
                                    e.target.value = ''
                                  }}
                                />
                                <label 
                                  htmlFor={`contracts-upload-${selectedClient.id}`}
                                  className="cursor-pointer block text-center"
                                >
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-purple-600 text-sm">📋</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-800">Contracts</div>
                                  <div className="text-xs text-gray-500">Multiple files</div>
                                </label>
                              </div>

                              {/* Other Documents */}
                              <div className="border border-orange-200 rounded-lg p-3 hover:border-orange-300 transition-colors">
                                <input
                                  type="file"
                                  id={`other-docs-upload-${selectedClient.id}`}
                                  accept="*"
                                  multiple
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || [])
                                    console.log('📁 Other Documents: Selected files:', files.map(f => f.name))
                                    
                                    // Upload files sequentially to avoid issues
                                    for (const file of files) {
                                      await handleFileUpload(file, 'other', selectedClient.id)
                                    }
                                    
                                    // Reset the input so the same files can be selected again if needed
                                    e.target.value = ''
                                  }}
                                />
                                <label 
                                  htmlFor={`other-docs-upload-${selectedClient.id}`}
                                  className="cursor-pointer block text-center"
                                >
                                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-orange-600 text-sm">📁</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-800">Other Docs</div>
                                  <div className="text-xs text-gray-500">Multiple files</div>
                                </label>
                              </div>
                            </div>

                            {/* Storage Usage Indicator */}
                            <div className="bg-gray-50 rounded-lg p-3 border mb-4">
                              <div className="text-xs font-medium text-gray-700 mb-2">📊 Storage Usage</div>
                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  <div>Total: {storageInfo.totalFiles} files</div>
                                  <div>Combined: {storageInfo.totalSizeMB}MB</div>
                                  <div>💾 Local: {storageInfo.localStorageMB}MB</div>
                                  <div>📚 Large: {storageInfo.indexedDBMB}MB</div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs text-gray-600">
                                    <span>LocalStorage Usage</span>
                                    <span>{storageInfo.localStoragePercent}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full transition-all ${
                                        storageInfo.localStoragePercent > 90 ? 'bg-red-500' :
                                        storageInfo.localStoragePercent > 70 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                      }`}
                                      style={{ width: `${Math.min(storageInfo.localStoragePercent, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                {storageInfo.isLocalStorageNearLimit && (
                                  <div className="text-xs text-amber-600 flex items-center">
                                    ⚠️ LocalStorage nearly full! Large files will use IndexedDB automatically.
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Bulk Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                              <input
                                type="file"
                                id={`bulk-upload-${selectedClient.id}`}
                                accept="*"
                                multiple
                                className="hidden"
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files || [])
                                  console.log('⬆️ Bulk Upload: Selected files:', files.map(f => f.name))
                                  for (const file of files) {
                                    await handleFileUpload(file, 'general', selectedClient.id)
                                  }
                                  e.target.value = ''
                                }}
                              />
                              <label 
                                htmlFor={`bulk-upload-${selectedClient.id}`}
                                className="cursor-pointer block"
                              >
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                  <span className="text-indigo-600 text-lg">⬆️</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800 mb-1">Upload Multiple Files at Once</div>
                                <div className="text-xs text-gray-500">
                                  Click here to select multiple files<br/>
                                  Supports: PDF, Images, Documents, and more
                                </div>
                              </label>
                            </div>
                          </div>

                          {/* Enhanced Client Files Display */}
                          {/* fileRefreshTrigger is used to force re-render when files change */}
                          {clientFiles.length > 0 ? (
                            <div className="bg-white rounded p-4 border border-indigo-200" key={fileRefreshTrigger}>
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium text-gray-900">
                                  Client Files ({clientFiles.length})
                                </h4>
                                <button 
                                  onClick={() => {
                                    if (confirm('Delete all files for this client?')) {
                                      clientFiles.forEach(async file => {
                                        await fileManager.deleteFile(file.id)
                                      })
                                      setFileRefreshTrigger(prev => prev + 1)
                                    }
                                  }}
                                  className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                  Delete All Files
                                </button>
                              </div>

                              {/* Files grouped by category */}
                              <div className="space-y-4 max-h-64 overflow-y-auto">
                                {/* Group files by category */}
                                {['test-results', 'session-notes', 'contracts', 'other', 'general'].map(category => {
                                  const categoryFiles = clientFiles
                                    .filter(file => {
                                      console.log(`🔍 Checking file: ${file.fileName}, category: ${file.category}, matches ${category}:`, file.category === category)
                                      return file.category === category
                                    })
                                    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                                  
                                  console.log(`📂 Category ${category}: ${categoryFiles.length} files`)
                                  if (categoryFiles.length === 0) return null

                                  const categoryInfo: Record<string, { name: string, color: string }> = {
                                    'test-results': { name: '🧪 Test Results', color: 'green' },
                                    'session-notes': { name: '📝 Session Notes', color: 'blue' },
                                    'contracts': { name: '📋 Contracts', color: 'purple' },
                                    'other': { name: '📁 Other Documents', color: 'orange' },
                                    'general': { name: '📄 General Files', color: 'gray' }
                                  }

                                  return (
                                    <div key={category} className="border border-gray-200 rounded-lg p-3">
                                      <h5 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                                        {categoryInfo[category]?.name || category} 
                                        <span className="ml-2 text-xs text-gray-500">({categoryFiles.length})</span>
                                      </h5>
                                      <div className="space-y-2">
                                        {categoryFiles.map((file) => (
                                          <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded p-2 border">
                                            <div className="flex items-center space-x-3">
                                              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                                                file.fileType === 'pdf' ? 'bg-red-100 text-red-600' :
                                                file.fileType === 'image' ? 'bg-blue-100 text-blue-600' :
                                                'bg-gray-100 text-gray-600'
                                              }`}>
                                                {file.fileType === 'pdf' ? 'PDF' :
                                                 file.fileType === 'image' ? 'IMG' : 'DOC'}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">{file.fileName}</p>
                                                <p className="text-xs text-gray-500">
                                                  {formatFileSize(file.fileSize)} • {file.uploadDate}
                                                </p>
                                                {file.description && (
                                                  <p className="text-xs text-gray-600 italic truncate">{file.description}</p>
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex space-x-1">
                                              <button 
                                                onClick={() => fileManager.viewFile(file.id)}
                                                className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                title="View file"
                                              >
                                                👁
                                              </button>
                                              <button 
                                                onClick={() => {
                                                  if (confirm(`Delete ${file.fileName}?`)) {
                                                    fileManager.deleteFile(file.id)
                                                    setFileRefreshTrigger(prev => prev + 1)
                                                    console.log('🗑️ File deleted and display refreshed')
                                                  }
                                                }}
                                                className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                title="Delete file"
                                              >
                                                🗑
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white rounded p-4 border border-indigo-200 text-center py-8">
                              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6 text-indigo-600" />
                              </div>
                              <p className="text-sm text-gray-600 mb-1">No files uploaded yet</p>
                              <p className="text-xs text-gray-400">
                                Use the upload sections above to add multiple files<br/>
                                for test results, session notes, contracts, and more
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          Notes
                        </h3>
                        <div className="bg-white rounded p-3 border">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedClient.notes}</pre>
                        </div>
                      </div>

                      {/* Billing & Invoicing */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-2 flex items-center justify-center">
                            <span className="text-white text-xs">$</span>
                          </div>
                          Billing & Invoicing (Xero Integration)
                        </h3>
                        {selectedClient.billing ? (
                          <div className="space-y-4">
                            {/* Summary */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-sm text-gray-600">Total Charged</div>
                                <div className="text-lg font-semibold text-gray-900">
                                  ${selectedClient.billing.totalCharged.toFixed(2)}
                                </div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-sm text-gray-600">Total Paid</div>
                                <div className="text-lg font-semibold text-green-600">
                                  ${selectedClient.billing.totalPaid.toFixed(2)}
                                </div>
                              </div>
                              <div className="bg-white rounded p-3 text-center">
                                <div className="text-sm text-gray-600">Outstanding</div>
                                <div className={`text-lg font-semibold ${
                                  selectedClient.billing.outstandingAmount > 0 ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  ${selectedClient.billing.outstandingAmount.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            
                            {/* Invoices */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recent Invoices</h4>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {selectedClient.billing.invoices.map((invoice) => (
                                  <div key={invoice.id} className="bg-white rounded p-2 border flex justify-between items-center">
                                    <div>
                                      <span className="font-medium text-sm">{invoice.invoiceNumber}</span>
                                      <span className="text-gray-500 text-xs ml-2">{invoice.date}</span>
                                      <div className="text-xs text-gray-600">{invoice.description}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-medium text-sm">${invoice.amount.toFixed(2)}</div>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {invoice.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => window.open(`https://go.xero.com/Contacts/View/${selectedClient.billing?.xeroContactId}`, '_blank')}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                              >
                                View in Xero
                              </button>
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                Create Invoice
                              </button>
                              <button 
                                onClick={() => syncClientBilling(selectedClient)}
                                disabled={isConnectingXero}
                                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                              >
                                {isConnectingXero ? 'Syncing...' : 'Sync Data'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <p className="text-sm">
                              {isXeroConnected ? 
                                'No billing data found for this client' : 
                                'Connect to Xero to view billing information'
                              }
                            </p>
                            {isXeroConnected ? (
                              <button 
                                onClick={() => syncClientBilling(selectedClient)}
                                disabled={isConnectingXero}
                                className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                              >
                                {isConnectingXero ? 'Syncing...' : 'Sync with Xero'}
                              </button>
                            ) : (
                              <button 
                                onClick={handleConnectXero}
                                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                              >
                                Connect to Xero
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Goals & Progress Tracking */}
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-900 flex items-center">
                            <BarChart3 className="w-5 h-5 text-emerald-600 mr-2" />
                            Goals & Progress Tracking
                            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                              {selectedClient.overallProgressScore}% Complete
                            </span>
                          </h3>
                          <button 
                            onClick={() => setShowAddGoalModal(true)}
                            className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 flex items-center"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Goal
                          </button>
                        </div>

                        {selectedClient.goals && selectedClient.goals.length > 0 ? (
                          <div className="space-y-4">
                            {selectedClient.goals.map((goal) => (
                              <div key={goal.id} className="bg-white rounded-lg p-4 border border-emerald-100 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <h4 className="font-medium text-gray-900 mr-2">{goal.title}</h4>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        goal.status === 'achieved' ? 'bg-green-100 text-green-700' :
                                        goal.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                        goal.status === 'not-started' ? 'bg-gray-100 text-gray-700' :
                                        goal.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {goal.status.replace('-', ' ')}
                                      </span>
                                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                        goal.priority === 'high' ? 'bg-red-50 text-red-600' :
                                        goal.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                                        'bg-gray-50 text-gray-600'
                                      }`}>
                                        {goal.priority} priority
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{goal.progressPercentage}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full transition-all duration-300 ${
                                            goal.progressPercentage >= 80 ? 'bg-green-500' :
                                            goal.progressPercentage >= 50 ? 'bg-blue-500' :
                                            goal.progressPercentage >= 25 ? 'bg-yellow-500' :
                                            'bg-gray-400'
                                          }`}
                                          style={{ width: `${goal.progressPercentage}%` }}
                                        ></div>
                                      </div>
                                    </div>

                                    {/* Milestones */}
                                    {goal.milestones && goal.milestones.length > 0 && (
                                      <div className="mb-3">
                                        <h5 className="text-xs font-medium text-gray-700 mb-2">Milestones:</h5>
                                        <div className="space-y-1">
                                          {goal.milestones.map((milestone) => (
                                            <div key={milestone.id} className="flex items-center text-xs">
                                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                                milestone.status === 'achieved' ? 'bg-green-500' :
                                                milestone.status === 'overdue' ? 'bg-red-500' :
                                                'bg-gray-300'
                                              }`}></div>
                                              <span className={milestone.status === 'achieved' ? 'text-green-700 line-through' : 'text-gray-600'}>
                                                {milestone.title}
                                              </span>
                                              {milestone.achievedDate && (
                                                <span className="ml-2 text-green-600">✓ {milestone.achievedDate}</span>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Target Date */}
                                    {goal.targetDate && (
                                      <div className="text-xs text-gray-500 mb-2">
                                        Target: {goal.targetDate}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex flex-col space-y-1 ml-4">
                                    <button 
                                      onClick={() => {
                                        setEditingGoal(goal)
                                        setShowGoalsModal(true)
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      onClick={() => {
                                        setSelectedGoalForProgress(goal.id)
                                        setShowProgressModal(true)
                                      }}
                                      className="text-xs text-emerald-600 hover:text-emerald-800"
                                    >
                                      Update Progress
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Weekly Summary */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                              <h5 className="font-medium text-gray-900 mb-2 text-sm flex items-center">
                                <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                                This Week's Focus
                              </h5>
                              {selectedClient.actionPoints && selectedClient.actionPoints.length > 0 ? (
                                <div className="space-y-2">
                                  {selectedClient.actionPoints.filter(ap => ap.status !== 'completed').slice(0, 3).map((actionPoint) => (
                                    <div key={actionPoint.id} className="flex items-start">
                                      <div className={`w-2 h-2 rounded-full mr-2 mt-1.5 ${
                                        actionPoint.priority === 'high' ? 'bg-red-500' :
                                        actionPoint.priority === 'medium' ? 'bg-yellow-500' :
                                        'bg-gray-400'
                                      }`}></div>
                                      <span className="text-xs text-gray-700">{actionPoint.description}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-gray-500">No active action points</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm font-medium mb-2">No goals set yet</p>
                            <p className="text-xs mb-4">Set up structured goals to track progress and achieve better outcomes</p>
                            <button 
                              onClick={() => setShowAddGoalModal(true)}
                              className="px-4 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
                            >
                              Create First Goal
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Nutripath Tests */}
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          Nutripath Test Orders
                        </h3>
                        {selectedClient.nutripathTests && selectedClient.nutripathTests.length > 0 ? (
                          <div className="space-y-3">
                            {selectedClient.nutripathTests.map((test) => (
                              <div key={test.id} className="bg-white rounded p-3 border">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium text-sm">{test.testName}</h4>
                                    <p className="text-xs text-gray-600">Ordered: {test.dateOrdered}</p>
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    test.status === 'results-received' ? 'bg-green-100 text-green-700' :
                                    test.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                    test.status === 'discussed' ? 'bg-purple-100 text-purple-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {test.status.replace('-', ' ')}
                                  </span>
                                </div>
                                {test.cost && (
                                  <p className="text-xs text-gray-600 mb-1">Cost: ${test.cost.toFixed(2)}</p>
                                )}
                                {test.results && (
                                  <div className="bg-gray-50 rounded p-2 mt-2">
                                    <p className="text-xs font-medium text-gray-700">Results:</p>
                                    <p className="text-xs text-gray-600">{test.results}</p>
                                  </div>
                                )}
                                {test.notes && (
                                  <p className="text-xs text-gray-600 mt-1 italic">{test.notes}</p>
                                )}
                                
                                {/* File Attachments */}
                                {test.attachments && test.attachments.length > 0 && (
                                  <div className="mt-3">
                                    <h5 className="text-xs font-medium text-gray-700 mb-2">Test Results Files:</h5>
                                    <div className="space-y-1">
                                      {test.attachments.map((attachment) => (
                                        <div key={attachment.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                                          <div className="flex items-center space-x-2">
                                            <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                                              attachment.fileType === 'pdf' ? 'bg-red-100 text-red-600' :
                                              attachment.fileType === 'image' ? 'bg-blue-100 text-blue-600' :
                                              'bg-gray-100 text-gray-600'
                                            }`}>
                                              {attachment.fileType === 'pdf' ? 'PDF' :
                                               attachment.fileType === 'image' ? 'IMG' : 'DOC'}
                                            </div>
                                            <div>
                                              <p className="text-xs font-medium text-gray-800">{attachment.fileName}</p>
                                              <p className="text-xs text-gray-500">
                                                {formatFileSize(attachment.fileSize)} • {attachment.uploadDate}
                                              </p>
                                              {attachment.description && (
                                                <p className="text-xs text-gray-600 italic">{attachment.description}</p>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex space-x-1">
                                            <button 
                                              onClick={() => fileManager.viewFile(attachment.id)}
                                              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                              View
                                            </button>
                                            <button 
                                              onClick={() => handleDeleteAttachment(attachment.id, test.id, selectedClient.id)}
                                              className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* File Upload Section */}
                                <div className="mt-3 pt-2 border-t border-gray-200">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="file"
                                      id={`file-upload-${test.id}`}
                                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file && selectedClient) {
                                          handleFileUpload(file, test.id, selectedClient.id)
                                        }
                                      }}
                                    />
                                    <label 
                                      htmlFor={`file-upload-${test.id}`}
                                      className="cursor-pointer text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1"
                                    >
                                      <span>📎</span>
                                      <span>Attach Results</span>
                                    </label>
                                    <button className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                                      Upload File
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Order Tests - Simple Checkboxes */}
                            <div className="mt-4 pt-4 border-t border-purple-200">
                              <h4 className="text-xs font-medium text-gray-700 mb-3">Order Tests (Tick to order)</h4>
                              <div className="grid grid-cols-1 gap-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.dnaTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'dnaTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">DNA Test</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.microbiomeTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'microbiomeTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">Microbiome Test</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.dutchTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'dutchTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">DUTCH Test</span>
                                </label>
                              </div>
                              <div className="mt-3 text-xs text-gray-500">
                                💡 Tip: After clicking Save Changes, you can tick these boxes again to order more tests
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 text-gray-500">
                            <p className="text-sm text-center mb-3">No Nutripath tests ordered yet</p>
                            <div className="bg-white rounded p-3 border">
                              <h4 className="text-xs font-medium text-gray-700 mb-3">Order Tests (Tick to order)</h4>
                              <div className="grid grid-cols-1 gap-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.dnaTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'dnaTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">DNA Test</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.microbiomeTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'microbiomeTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">Microbiome Test</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    checked={clientChanges[selectedClient.id]?.dutchTest || false}
                                    onChange={(e) => handleCheckboxChange(selectedClient.id, 'dutchTest', e.target.checked)}
                                  />
                                  <span className="text-sm text-gray-700">DUTCH Test</span>
                                </label>
                              </div>
                              <div className="mt-3 text-xs text-gray-500">
                                💡 Tip: After clicking Save Changes, you can tick these boxes again to order more tests
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Toni Naturopath Referral */}
                      <div className="bg-teal-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                          Toni Naturopath Referral
                        </h3>
                        <div className="bg-white rounded p-3 border">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              checked={
                                clientChanges[selectedClient.id]?.toniReferral || 
                                (selectedClient.toniReferrals && selectedClient.toniReferrals.length > 0) || 
                                false
                              }
                              onChange={(e) => handleCheckboxChange(selectedClient.id, 'toniReferral', e.target.checked)}
                            />
                            <span className="text-sm text-gray-700">Referred to Toni</span>
                          </label>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        {/* Unsaved changes indicator */}
                        {clientChanges[selectedClient.id] && Object.keys(clientChanges[selectedClient.id]).length > 0 && (
                          <div className="flex items-center text-amber-600 text-sm">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                            <span>Unsaved changes</span>
                          </div>
                        )}
                        
                        <div className="flex space-x-3">
                          {/* Save button - always show */}
                          <button 
                            onClick={() => saveClientChanges(selectedClient.id)}
                            className={`px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2 font-medium ${
                              clientChanges[selectedClient.id] && Object.keys(clientChanges[selectedClient.id]).length > 0 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            }`}
                          >
                            <span>💾</span>
                            <span>Save Changes</span>
                          </button>
                          
                          <button 
                            onClick={() => setShowSessionModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Schedule Session</span>
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span>Start Video Call</span>
                          </button>
                          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                            Edit Notes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Integration */}
              {activeTab === 'calendar' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Calendar Integration</h2>
                    <button 
                      onClick={() => setShowSessionModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Schedule Session</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Sessions */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
                      
                      <div className="space-y-3">
                        {clients
                          .filter(c => c.nextSession)
                          .map(client => (
                            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                  {client.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                                  <p className="text-sm text-gray-600">{client.nextSession}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Video className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-800">
                                  <Phone className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        
                        {clients.filter(c => c.nextSession).length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>No sessions scheduled yet</p>
                            <button 
                              onClick={() => setShowSessionModal(true)}
                              className="text-blue-600 hover:text-blue-800 mt-2"
                            >
                              Schedule your first session
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Schedule */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold mb-4">Quick Schedule</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Client
                          </label>
                          <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                            <option>Choose a client...</option>
                            {clients.map(client => (
                              <option key={client.id} value={client.id}>
                                {client.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input 
                            type="date" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <input 
                            type="time" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        
                        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                          Schedule Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other sections remain the same */}
              {!['dashboard', 'import', 'clients', 'calendar'].includes(activeTab) && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">This section is under development.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Log Coaching Session</h3>
              <button 
                onClick={() => setShowSessionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const sessionData = {
                client: formData.get('client') as string,
                date: formData.get('date') as string,
                time: formData.get('time') as string,
                duration: formData.get('duration') as string,
                type: formData.get('type') as string,
                notes: formData.get('notes') as string
              }
              handleSessionSubmit(sessionData)
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select name="client" required className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue={selectedClient?.id || ''}>
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id} selected={client.id === selectedClient?.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input 
                    name="date"
                    type="date" 
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input 
                    name="time"
                    type="time" 
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <select name="duration" required className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select Duration</option>
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="2.5">2.5 hours</option>
                    <option value="3">3 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Type
                  </label>
                  <select name="type" required className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="initial-consultation">Initial Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="package-session">Package Session</option>
                    <option value="ad-hoc">Ad-hoc</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Session Notes (Copy & Paste Friendly)
                </label>
                <textarea 
                  name="notes"
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono"
                  placeholder="Add detailed session notes here...

• Client concerns/questions
• Progress updates  
• Action items
• Next session plans
• Any observations

You can copy and paste from other documents or type directly."
                />
                <div className="text-xs text-gray-500 mt-1">
                  💡 These notes will be saved with the session and visible in the session history for easy reference
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Log Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hours Setup Modal */}
      {showHoursModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Set Up Hours Tracking</h3>
              <button 
                onClick={() => setShowHoursModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const hoursData = {
                client: formData.get('client') as string,
                packageName: formData.get('packageName') as string,
                totalHours: formData.get('totalHours') as string,
                hourlyRate: formData.get('hourlyRate') as string,
                purchaseDate: formData.get('purchaseDate') as string
              }
              handleHoursSetup(hoursData)
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select name="client" required className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Name
                </label>
                <input 
                  name="packageName"
                  type="text" 
                  required
                  defaultValue="Supercharge Your Life - 3 Hour Program Package"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Hours
                  </label>
                  <input 
                    name="totalHours"
                    type="number" 
                    step="0.5"
                    min="0"
                    required
                    defaultValue="3"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly Rate ($)
                  </label>
                  <input 
                    name="hourlyRate"
                    type="number"
                    min="0"
                    required
                    defaultValue="300"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date
                </label>
                <input 
                  name="purchaseDate"
                  type="date" 
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowHoursModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Set Up Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View All Sessions Modal */}
      {showAllSessionsModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                All Sessions - {selectedClient.name}
              </h3>
              <button 
                onClick={() => setShowAllSessionsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedClient.coachingHours?.sessionsLog && selectedClient.coachingHours.sessionsLog.length > 0 ? (
                selectedClient.coachingHours.sessionsLog.map((session, index) => (
                  <div key={`${session.date}-${index}`} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex space-x-4">
                        <span className="font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-600">{session.time}</span>
                        <span className="text-sm text-emerald-600 font-medium">{session.duration}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        session.type === 'consultation' ? 'bg-blue-100 text-blue-800' :
                        session.type === 'follow-up' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      {editingSessionId === session.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            className="w-full text-sm font-mono border border-gray-300 rounded p-3 bg-white focus:outline-none focus:border-emerald-500"
                            rows={6}
                            placeholder="Add or update session notes..."
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateSessionNotes(session.id, editingNotes)}
                              className="text-sm px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                              Save Notes
                            </button>
                            <button
                              onClick={() => {
                                setEditingSessionId(null)
                                setEditingNotes('')
                              }}
                              className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {session.notes ? (
                            <div className="group">
                              <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border">
                                {session.notes.length > 200 && !expandedNotes.has(`${session.date}-${index}`) ? (
                                  <>
                                    {session.notes.substring(0, 200)}...
                                    <button
                                      onClick={() => setExpandedNotes(prev => new Set(prev).add(`${session.date}-${index}`))}
                                      className="text-emerald-600 hover:text-emerald-700 ml-2 font-sans"
                                    >
                                      Show more
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {session.notes}
                                    {session.notes.length > 200 && (
                                      <button
                                        onClick={() => setExpandedNotes(prev => {
                                          const newSet = new Set(prev)
                                          newSet.delete(`${session.date}-${index}`)
                                          return newSet
                                        })}
                                        className="text-emerald-600 hover:text-emerald-700 ml-2 font-sans"
                                      >
                                        Show less
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setEditingSessionId(session.id)
                                  setEditingNotes(session.notes || '')
                                }}
                                className="text-sm text-emerald-600 hover:text-emerald-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ✏️ Edit notes
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingSessionId(session.id)
                                setEditingNotes('')
                              }}
                              className="text-sm text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded border border-emerald-200"
                            >
                              + Add session notes
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No sessions logged yet
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAllSessionsModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Goal Modal */}
      {(showAddGoalModal || (showGoalsModal && editingGoal)) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingGoal ? 'Edit Goal' : 'Add New Goal'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddGoalModal(false)
                  setShowGoalsModal(false)
                  setEditingGoal(null)
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newGoal: ClientGoal = {
                id: editingGoal?.id || `goal-${Date.now()}`,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as ClientGoal['category'],
                priority: formData.get('priority') as ClientGoal['priority'],
                targetDate: formData.get('targetDate') as string || undefined,
                status: editingGoal?.status || 'not-started',
                progressPercentage: editingGoal?.progressPercentage || 0,
                createdDate: editingGoal?.createdDate || new Date().toLocaleDateString(),
                milestones: editingGoal?.milestones || [],
                relatedSessions: editingGoal?.relatedSessions || [],
                notes: formData.get('notes') as string || undefined
              }
              
              if (selectedClient) {
                const updatedGoals = editingGoal
                  ? selectedClient.goals?.map(g => g.id === editingGoal.id ? newGoal : g) || []
                  : [...(selectedClient.goals || []), newGoal]
                
                const updatedClient = { ...selectedClient, goals: updatedGoals }
                const updatedClients = clients.map(c => c.id === selectedClient.id ? updatedClient : c)
                
                setClients(updatedClients)
                setSelectedClient(updatedClient)
                localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
              }
              
              setShowAddGoalModal(false)
              setShowGoalsModal(false)
              setEditingGoal(null)
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingGoal?.title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., Increase daily energy levels"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingGoal?.category || 'other'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="nutrition">Nutrition</option>
                    <option value="fitness">Fitness</option>
                    <option value="sleep">Sleep</option>
                    <option value="stress">Stress Management</option>
                    <option value="energy">Energy</option>
                    <option value="weight">Weight Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    defaultValue={editingGoal?.priority || 'medium'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Date (Optional)
                  </label>
                  <input
                    name="targetDate"
                    type="date"
                    defaultValue={editingGoal?.targetDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingGoal?.description}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Describe what success looks like for this goal..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  defaultValue={editingGoal?.notes}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Additional notes or specific strategies..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddGoalModal(false)
                    setShowGoalsModal(false)
                    setEditingGoal(null)
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Update Modal */}
      {showProgressModal && selectedGoalForProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Update Progress
              </h3>
              <button 
                onClick={() => {
                  setShowProgressModal(false)
                  setSelectedGoalForProgress(null)
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            {(() => {
              const goal = selectedClient?.goals?.find(g => g.id === selectedGoalForProgress)
              if (!goal) return null
              
              return (
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const newProgress = parseInt(formData.get('progress') as string)
                  const statusUpdate = formData.get('status') as ClientGoal['status']
                  const progressNote = formData.get('progressNote') as string
                  
                  if (selectedClient) {
                    const updatedGoals = selectedClient.goals?.map(g => {
                      if (g.id === selectedGoalForProgress) {
                        return {
                          ...g,
                          progressPercentage: newProgress,
                          status: statusUpdate,
                          achievedDate: newProgress === 100 ? new Date().toLocaleDateString() : g.achievedDate
                        }
                      }
                      return g
                    }) || []
                    
                    // Add progress note if provided
                    const updatedProgressNotes = [...(selectedClient.progressNotes || [])]
                    if (progressNote.trim()) {
                      updatedProgressNotes.push({
                        id: `note-${Date.now()}`,
                        date: new Date().toLocaleDateString(),
                        content: progressNote,
                        type: 'observation',
                        linkedGoalId: selectedGoalForProgress
                      })
                    }
                    
                    // Calculate overall progress score
                    const avgProgress = updatedGoals.reduce((sum, g) => sum + g.progressPercentage, 0) / updatedGoals.length
                    
                    const updatedClient = { 
                      ...selectedClient, 
                      goals: updatedGoals,
                      progressNotes: updatedProgressNotes,
                      overallProgressScore: Math.round(avgProgress)
                    }
                    const updatedClients = clients.map(c => c.id === selectedClient.id ? updatedClient : c)
                    
                    setClients(updatedClients)
                    setSelectedClient(updatedClient)
                    localStorage.setItem('biohackme_clients', JSON.stringify(updatedClients))
                  }
                  
                  setShowProgressModal(false)
                  setSelectedGoalForProgress(null)
                }}>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Progress: {goal.progressPercentage}%
                    </label>
                    <input
                      name="progress"
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={goal.progressPercentage}
                      className="w-full"
                      onChange={(e) => {
                        const slider = e.target as HTMLInputElement
                        const label = slider.parentElement?.querySelector('label')
                        if (label) {
                          label.textContent = `Progress: ${slider.value}%`
                        }
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={goal.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="achieved">Achieved</option>
                      <option value="paused">Paused</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Progress Note (Optional)
                    </label>
                    <textarea
                      name="progressNote"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="What progress was made? Any challenges or wins?"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProgressModal(false)
                        setSelectedGoalForProgress(null)
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                      Update Progress
                    </button>
                  </div>
                </form>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}
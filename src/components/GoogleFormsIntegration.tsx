import { useState, useEffect } from 'react'
import { 
  FileText,
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Eye,
  Plus,
  RefreshCw,
  Database
} from 'lucide-react'
import { clientImporter } from '../utils/importRealClients'

interface FormSubmission {
  id: string
  formId: string
  formName: string
  submitterEmail: string
  submitterName?: string
  submissionDate: string
  responses: { [key: string]: any }
  status: 'new' | 'processed' | 'client-created'
  clientId?: string
}

interface GoogleForm {
  id: string
  name: string
  description: string
  url: string
  type: 'intake' | 'assessment' | 'feedback' | 'survey'
  fields: string[]
  submissionCount: number
  lastSubmission?: string
}

interface GoogleFormsIntegrationProps {
  onClientCreate: (formData: any) => void
}

export default function GoogleFormsIntegration({ onClientCreate }: GoogleFormsIntegrationProps) {
  const [forms, setForms] = useState<GoogleForm[]>([])
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [selectedForm, setSelectedForm] = useState<GoogleForm | null>(null)
  const [showSubmissions, setShowSubmissions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<string>('')

  useEffect(() => {
    // In real implementation, check Google Forms API connection
    setIsConnected(true)
    loadForms()
    loadSubmissions()
  }, [])

  const loadForms = () => {
    // Mock forms data - in real implementation, fetch from Google Forms API
    const mockForms: GoogleForm[] = [
      {
        id: 'form_1',
        name: 'BiohackMe Initial Client Intake',
        description: 'Comprehensive intake form for new coaching clients',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScI4eqTlBCn2GWIF0j6SzkxhZHdhrbScxgvvpA311rV0IA1VA/viewform',
        type: 'intake',
        fields: [
          'Full Name',
          'Email Address',
          'Phone Number',
          'Age',
          'Current Health Goals',
          'Health Challenges',
          'Previous Biohacking Experience',
          'Lifestyle Assessment',
          'Preferred Contact Method'
        ],
        submissionCount: 15,
        lastSubmission: '2024-03-02'
      },
      {
        id: 'form_2',
        name: 'Biohacking Wheel Assessment',
        description: '8-pillar self-assessment tool',
        url: 'https://forms.google.com/your-assessment-form',
        type: 'assessment',
        fields: [
          'Sleep Quality (1-10)',
          'Mood Stability (1-10)',
          'Physical Fitness (1-10)',
          'Environment Quality (1-10)',
          'Energy Levels (1-10)',
          'Relationships (1-10)',
          'Overall Health (1-10)',
          'Brain Function (1-10)',
          'Priority Areas',
          'Current Challenges'
        ],
        submissionCount: 8,
        lastSubmission: '2024-03-01'
      },
      {
        id: 'form_3',
        name: 'Weekly Progress Check-in',
        description: 'Weekly client progress and feedback form',
        url: 'https://forms.google.com/your-checkin-form',
        type: 'feedback',
        fields: [
          'Energy Levels This Week',
          'Sleep Quality Changes',
          'Protocol Adherence',
          'Challenges Faced',
          'Wins and Improvements',
          'Questions for Next Session',
          'Overall Satisfaction'
        ],
        submissionCount: 23,
        lastSubmission: '2024-03-02'
      },
      {
        id: 'form_4',
        name: 'Free Guide Download',
        description: 'Lead magnet form for 7 Pillars guide',
        url: 'https://forms.google.com/your-freebie-form',
        type: 'survey',
        fields: [
          'Full Name',
          'Email Address',
          'Biggest Health Challenge',
          'How did you find us?',
          'Interested in coaching?'
        ],
        submissionCount: 47,
        lastSubmission: '2024-03-02'
      }
    ]
    setForms(mockForms)
  }

  const loadSubmissions = () => {
    // Mock submissions data
    const mockSubmissions: FormSubmission[] = [
      {
        id: 'sub_1',
        formId: 'form_1',
        formName: 'BiohackMe Initial Client Intake',
        submitterEmail: 'jenny.smith@email.com',
        submitterName: 'Jenny Smith',
        submissionDate: '2024-03-02T14:30:00',
        status: 'new',
        responses: {
          'Full Name': 'Jenny Smith',
          'Email Address': 'jenny.smith@email.com',
          'Phone Number': '+61 423 555 789',
          'Age': '34',
          'Current Health Goals': 'Improve energy levels, better sleep, weight management',
          'Health Challenges': 'Chronic fatigue, irregular sleep patterns, stress from work',
          'Previous Biohacking Experience': 'Beginner - tried meditation apps and basic supplements',
          'Lifestyle Assessment': 'Busy professional, irregular meal times, limited exercise',
          'Preferred Contact Method': 'Email'
        }
      },
      {
        id: 'sub_2',
        formId: 'form_2',
        formName: 'Biohacking Wheel Assessment',
        submitterEmail: 'mark.johnson@example.com',
        submitterName: 'Mark Johnson',
        submissionDate: '2024-03-01T10:15:00',
        status: 'processed',
        clientId: '2',
        responses: {
          'Sleep Quality (1-10)': '6',
          'Mood Stability (1-10)': '7',
          'Physical Fitness (1-10)': '8',
          'Environment Quality (1-10)': '7',
          'Energy Levels (1-10)': '6',
          'Relationships (1-10)': '8',
          'Overall Health (1-10)': '7',
          'Brain Function (1-10)': '8',
          'Priority Areas': 'Sleep optimization, energy management',
          'Current Challenges': 'Inconsistent sleep schedule due to shift work'
        }
      },
      {
        id: 'sub_3',
        formId: 'form_4',
        formName: 'Free Guide Download',
        submitterEmail: 'sarah.williams@gmail.com',
        submitterName: 'Sarah Williams',
        submissionDate: '2024-03-01T16:45:00',
        status: 'new',
        responses: {
          'Full Name': 'Sarah Williams',
          'Email Address': 'sarah.williams@gmail.com',
          'Biggest Health Challenge': 'Low energy and poor sleep quality',
          'How did you find us?': 'Instagram',
          'Interested in coaching?': 'Maybe in the future'
        }
      }
    ]
    setSubmissions(mockSubmissions)
  }

  const refreshSubmissions = async () => {
    setIsLoading(true)
    // In real implementation, fetch latest submissions from Google Forms API
    setTimeout(() => {
      loadSubmissions()
      setIsLoading(false)
    }, 1000)
  }

  const importRealClients = async () => {
    setIsImporting(true)
    setImportStatus('Connecting to Google Forms API...')
    
    try {
      setImportStatus('Fetching form structure...')
      const form = await clientImporter.fetchFormStructure()
      
      if (!form) {
        setImportStatus('❌ Could not access form. Check API credentials.')
        setIsImporting(false)
        return
      }

      setImportStatus('Loading all form responses...')
      const clients = await clientImporter.importAllClients()
      
      if (clients.length === 0) {
        setImportStatus('⚠️ No responses found. This may need OAuth setup for private forms.')
        setIsImporting(false)
        return
      }

      setImportStatus(`✅ Found ${clients.length} clients! Importing to CRM...`)
      
      // Import each client
      clients.forEach(client => {
        onClientCreate(client)
      })

      setImportStatus(`🎉 Successfully imported ${clients.length} clients to your CRM!`)
      
      setTimeout(() => {
        setImportStatus('')
        setIsImporting(false)
      }, 3000)
      
    } catch (error) {
      console.error('Import error:', error)
      setImportStatus('❌ Import failed. Check console for details.')
      setIsImporting(false)
    }
  }

  const createClientFromSubmission = (submission: FormSubmission) => {
    // Extract client data from form submission
    const clientData = {
      name: submission.submitterName || submission.responses['Full Name'] || 'Unknown',
      email: submission.submitterEmail || submission.responses['Email Address'],
      phone: submission.responses['Phone Number'] || submission.responses['Phone'] || '',
      status: 'prospect' as const,
      program: 'Book Reader' as const,
      joinDate: new Date().toLocaleDateString(),
      lastContact: new Date().toLocaleDateString(),
      notes: `Created from Google Form: ${submission.formName}\n\nForm Responses:\n${Object.entries(submission.responses).map(([key, value]) => `${key}: ${value}`).join('\n')}`,
      files: [],
      progressData: {
        biohackingWheel: {
          sleep: parseInt(submission.responses['Sleep Quality (1-10)']) || 5,
          mood: parseInt(submission.responses['Mood Stability (1-10)']) || 5,
          body: parseInt(submission.responses['Physical Fitness (1-10)']) || 5,
          environment: parseInt(submission.responses['Environment Quality (1-10)']) || 5,
          energy: parseInt(submission.responses['Energy Levels (1-10)']) || 5,
          relationships: parseInt(submission.responses['Relationships (1-10)']) || 5,
          health: parseInt(submission.responses['Overall Health (1-10)']) || 5,
          brain: parseInt(submission.responses['Brain Function (1-10)']) || 5,
          date: new Date().toLocaleDateString()
        },
        goals: submission.responses['Current Health Goals'] ? [submission.responses['Current Health Goals']] : [],
        achievements: [],
        challengeAreas: submission.responses['Health Challenges'] ? [submission.responses['Health Challenges']] : []
      }
    }

    // Update submission status
    const updatedSubmissions = submissions.map(s => 
      s.id === submission.id ? { ...s, status: 'client-created' as const } : s
    )
    setSubmissions(updatedSubmissions)

    // Call parent function to create client
    onClientCreate(clientData)
  }

  const viewSubmissionDetails = (submission: FormSubmission) => {
    alert(`Submission Details:\n\n${Object.entries(submission.responses).map(([key, value]) => `${key}: ${value}`).join('\n')}`)
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Google Forms</h3>
          <p className="text-gray-600 mb-4">
            Connect your Google account to automatically sync form submissions into your CRM.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Connect Google Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Forms Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Connected Google Forms</h3>
          <div className="flex space-x-3">
            <button
              onClick={importRealClients}
              disabled={isImporting}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50"
            >
              <Database className={`w-4 h-4 ${isImporting ? 'animate-pulse' : ''}`} />
              <span>{isImporting ? 'Importing...' : 'Import All 19 Clients'}</span>
            </button>
            <button
              onClick={refreshSubmissions}
              disabled={isLoading}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Import Status */}
        {importStatus && (
          <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
            <p className="text-blue-700 text-sm">{importStatus}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms.map((form) => (
            <div key={form.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{form.name}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  form.type === 'intake' ? 'bg-green-100 text-green-800' :
                  form.type === 'assessment' ? 'bg-blue-100 text-blue-800' :
                  form.type === 'feedback' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {form.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{form.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{form.submissionCount} submissions</span>
                <span>Last: {form.lastSubmission}</span>
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Form</span>
                </a>
                <button
                  onClick={() => {
                    setSelectedForm(form)
                    setShowSubmissions(true)
                  }}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
                >
                  <Eye className="w-3 h-3" />
                  <span>View Submissions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Form Submissions</h3>
        
        <div className="space-y-3">
          {submissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {(submission.submitterName || submission.submitterEmail).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {submission.submitterName || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">{submission.formName}</p>
                  <p className="text-xs text-gray-500">{new Date(submission.submissionDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  submission.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                  submission.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {submission.status === 'new' ? 'New' :
                   submission.status === 'processed' ? 'Processed' :
                   'Client Created'}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => viewSubmissionDetails(submission)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {submission.status === 'new' && (
                    <button
                      onClick={() => createClientFromSubmission(submission)}
                      className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs hover:bg-green-700"
                    >
                      <Users className="w-3 h-3" />
                      <span>Create Client</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Analytics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {submissions.filter(s => s.status === 'new').length}
            </div>
            <div className="text-sm text-blue-800">New Submissions</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter(s => s.status === 'client-created').length}
            </div>
            <div className="text-sm text-green-800">Clients Created</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {forms.reduce((acc, form) => acc + form.submissionCount, 0)}
            </div>
            <div className="text-sm text-purple-800">Total Submissions</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((submissions.filter(s => s.status === 'client-created').length / submissions.length) * 100)}%
            </div>
            <div className="text-sm text-orange-800">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { 
  Calendar,
  Clock,
  Mic,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Square,
  Download
} from 'lucide-react'

interface FathomSession {
  id: string
  clientId: string
  title: string
  date: string
  duration: string
  status: 'scheduled' | 'recording' | 'processing' | 'completed'
  transcript?: string
  summary?: string
  actionItems?: string[]
  recordingUrl?: string
  fathomMeetingId?: string
}

interface FathomIntegrationProps {
  clientId: string
  clientName: string
  onSessionComplete: (session: FathomSession) => void
}

export default function FathomIntegration({ clientId, clientName, onSessionComplete }: FathomIntegrationProps) {
  const [sessions, setSessions] = useState<FathomSession[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentSession, setCurrentSession] = useState<FathomSession | null>(null)
  const [showScheduler, setShowScheduler] = useState(false)

  // Mock Fathom API connection status
  useEffect(() => {
    // In a real implementation, check if Fathom API is connected
    setIsConnected(true)
    loadSessions()
  }, [clientId])

  const loadSessions = () => {
    // Mock session data - in real implementation, fetch from Fathom API
    const mockSessions: FathomSession[] = [
      {
        id: '1',
        clientId,
        title: `Coaching Session - ${clientName}`,
        date: '2024-03-01T10:00:00',
        duration: '45 minutes',
        status: 'completed',
        transcript: 'This is where the full transcript would appear. Fathom would provide detailed transcription of the entire coaching session including both coach and client dialogue.',
        summary: 'Client discussed sleep optimization challenges and progress on morning routine. Key focus areas include maintaining consistent bedtime and reducing blue light exposure.',
        actionItems: [
          'Implement blue light blocking glasses after 8 PM',
          'Track sleep quality for next 2 weeks',
          'Schedule follow-up session for sleep protocol review'
        ],
        recordingUrl: 'https://fathom.video/recording/abc123',
        fathomMeetingId: 'fathom_abc123'
      },
      {
        id: '2',
        clientId,
        title: `Initial Consultation - ${clientName}`,
        date: '2024-02-15T14:00:00',
        duration: '60 minutes',
        status: 'completed',
        transcript: 'Initial consultation transcript covering health history, current challenges, and goal setting for the biohacking journey.',
        summary: 'Comprehensive intake session covering health history, current lifestyle, and biohacking goals. Client interested in improving energy levels and sleep quality.',
        actionItems: [
          'Complete biohacking wheel assessment',
          'Begin morning sunlight exposure routine',
          'Eliminate caffeine after 2 PM'
        ],
        recordingUrl: 'https://fathom.video/recording/def456',
        fathomMeetingId: 'fathom_def456'
      },
      {
        id: '3',
        clientId,
        title: `Weekly Check-in - ${clientName}`,
        date: '2024-03-08T11:00:00',
        duration: '30 minutes',
        status: 'processing',
        fathomMeetingId: 'fathom_ghi789'
      }
    ]
    setSessions(mockSessions)
  }

  const startRecording = () => {
    // In real implementation, start Fathom recording via API
    const newSession: FathomSession = {
      id: Date.now().toString(),
      clientId,
      title: `Coaching Session - ${clientName}`,
      date: new Date().toISOString(),
      duration: 'Recording...',
      status: 'recording',
      fathomMeetingId: `fathom_${Date.now()}`
    }
    
    setCurrentSession(newSession)
    setIsRecording(true)
    setSessions([newSession, ...sessions])
  }

  const stopRecording = () => {
    if (currentSession) {
      // In real implementation, stop Fathom recording and trigger processing
      const updatedSession = {
        ...currentSession,
        status: 'processing' as const,
        duration: '45 minutes'
      }
      
      setSessions(sessions.map(s => s.id === currentSession.id ? updatedSession : s))
      setCurrentSession(null)
      setIsRecording(false)
      
      // Simulate processing delay
      setTimeout(() => {
        const completedSession = {
          ...updatedSession,
          status: 'completed' as const,
          transcript: 'Session transcript will appear here once Fathom completes processing...',
          summary: 'AI-generated summary will be available shortly...',
          actionItems: ['Action items will be extracted automatically'],
          recordingUrl: 'https://fathom.video/recording/new123'
        }
        
        setSessions(sessions.map(s => s.id === updatedSession.id ? completedSession : s))
        onSessionComplete(completedSession)
      }, 3000)
    }
  }

  const uploadToClient = async (session: FathomSession) => {
    // In real implementation, upload session data to client profile
    console.log('Uploading session to client profile:', session)
    
    // Create file entries for transcript, summary, and recording
    const files = [
      {
        id: Date.now().toString(),
        name: `${session.title} - Transcript.txt`,
        type: 'session-notes' as const,
        uploadDate: new Date().toLocaleDateString(),
        size: '12 KB',
        url: '#',
        content: session.transcript
      },
      {
        id: (Date.now() + 1).toString(),
        name: `${session.title} - Summary.pdf`,
        type: 'session-notes' as const,
        uploadDate: new Date().toLocaleDateString(),
        size: '8 KB',
        url: '#',
        content: session.summary
      }
    ]
    
    // Trigger upload to client profile
    onSessionComplete(session)
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Fathom AI</h3>
          <p className="text-gray-600 mb-4">
            Connect your Fathom account to automatically capture and transcribe coaching sessions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Connect Fathom Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recording Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Recording</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isRecording ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-600 font-medium">Recording in progress</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop Recording</span>
                </button>
              </>
            ) : (
              <button
                onClick={startRecording}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            Client: {clientName}
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session History</h3>
        
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.duration}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    session.status === 'completed' ? 'bg-green-100 text-green-800' :
                    session.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    session.status === 'recording' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {session.status}
                  </span>
                  
                  {session.status === 'completed' && (
                    <button
                      onClick={() => uploadToClient(session)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload to Client</span>
                    </button>
                  )}
                </div>
              </div>

              {session.status === 'completed' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Summary */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">AI Summary</h5>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {session.summary}
                    </p>
                  </div>
                  
                  {/* Action Items */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Action Items</h5>
                    <ul className="space-y-1">
                      {session.actionItems?.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {session.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>View Transcript</span>
                      </button>
                      
                      {session.recordingUrl && (
                        <a
                          href={session.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
                        >
                          <Play className="w-4 h-4" />
                          <span>Watch Recording</span>
                        </a>
                      )}
                    </div>
                    
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              {session.status === 'processing' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                    <p className="ml-3 text-sm text-yellow-800">
                      Fathom is processing your recording. Transcript and summary will be available shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowScheduler(true)}
            className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md p-4 hover:bg-gray-50"
          >
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Schedule Session</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md p-4 hover:bg-gray-50">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">View All Notes</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md p-4 hover:bg-gray-50">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Upload Manual Notes</span>
          </button>
        </div>
      </div>

      {/* Scheduling Modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Schedule Session</h3>
              <button 
                onClick={() => setShowScheduler(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input 
                  type="text" 
                  value={clientName} 
                  disabled 
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="consultation">Consultation</option>
                  <option value="coaching">Coaching Session</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="assessment">Assessment Review</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Session goals, preparation notes, etc."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowScheduler(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In real implementation, schedule session via calendar API
                  console.log('Session scheduled')
                  setShowScheduler(false)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
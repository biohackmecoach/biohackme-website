import { useState, useEffect } from 'react'
import { 
  Video, 
  Upload, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Calendar,
  Users,
  Clock,
  Mic,
  Settings
} from 'lucide-react'

interface MeetingSession {
  id: string
  clientId: string
  clientName: string
  title: string
  date: string
  duration: string
  status: 'scheduled' | 'recording' | 'completed' | 'uploaded'
  recordingUrl?: string
  transcriptFile?: File
  notes?: string
  actionItems?: string[]
  driveFileId?: string
}

interface GoogleMeetIntegrationProps {
  clientId?: string
  onSessionComplete?: (session: MeetingSession) => void
}

export default function GoogleMeetIntegration({ clientId, onSessionComplete }: GoogleMeetIntegrationProps) {
  const [sessions, setSessions] = useState<MeetingSession[]>([])
  const [selectedSession, setSelectedSession] = useState<MeetingSession | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    loadMockSessions()
  }, [])

  const loadMockSessions = () => {
    const mockSessions: MeetingSession[] = [
      {
        id: 'meet_1',
        clientId: '1',
        clientName: 'Sarah Johnson',
        title: 'Initial Biohacking Consultation',
        date: '2024-03-02',
        duration: '45 minutes',
        status: 'completed',
        recordingUrl: 'https://drive.google.com/file/d/mock-recording-1',
        notes: 'Discussed sleep optimization strategies, supplement protocol review',
        actionItems: [
          'Start magnesium glycinate 400mg before bed',
          'Install blue light blocking glasses',
          'Track HRV for 1 week',
          'Schedule follow-up in 2 weeks'
        ]
      },
      {
        id: 'meet_2',
        clientId: '2',
        clientName: 'Mark Johnson',
        title: 'Weekly Progress Check-in',
        date: '2024-03-01',
        duration: '30 minutes',
        status: 'completed',
        recordingUrl: 'https://drive.google.com/file/d/mock-recording-2',
        notes: 'Great progress on sleep quality, energy levels improving',
        actionItems: [
          'Continue current protocol',
          'Add cold exposure routine',
          'Book biometric testing'
        ]
      }
    ]
    setSessions(mockSessions)
  }

  const handleFileUpload = async (sessionId: string, file: File, type: 'recording' | 'transcript' | 'notes') => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Simulate upload delay
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      
      // Update session with uploaded file
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'uploaded' as const }
          : session
      ))

      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        setShowUploadModal(false)
        
        if (onSessionComplete) {
          const session = sessions.find(s => s.id === sessionId)
          if (session) onSessionComplete(session)
        }
      }, 1000)
    }, 2000)
  }

  const startNewSession = () => {
    const newSession: MeetingSession = {
      id: `meet_${Date.now()}`,
      clientId: clientId || '1',
      clientName: 'New Session',
      title: 'Coaching Session',
      date: new Date().toISOString().split('T')[0],
      duration: '0 minutes',
      status: 'scheduled'
    }
    setSessions(prev => [newSession, ...prev])
    setSelectedSession(newSession)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Google Meet Integration</h3>
            <p className="text-sm text-gray-600">Record, transcribe and manage your coaching sessions</p>
          </div>
          <button
            onClick={startNewSession}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-blue-900 mb-2">📹 How to Record Google Meet Sessions (FREE)</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>1. <strong>Enable Recording:</strong> In Google Meet, click the three dots → "Record meeting"</p>
            <p>2. <strong>Auto-Save:</strong> Recordings automatically save to your Google Drive</p>
            <p>3. <strong>Import Here:</strong> Upload recordings and transcripts to client profiles</p>
            <p>4. <strong>AI Transcription:</strong> Use Google's free transcription or upload your own</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {sessions.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-sm text-green-800">Completed Sessions</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.filter(s => s.status === 'scheduled').length}
            </div>
            <div className="text-sm text-blue-800">Scheduled</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {sessions.reduce((acc, s) => acc + parseInt(s.duration.split(' ')[0]) || 0, 0)}
            </div>
            <div className="text-sm text-purple-800">Total Minutes</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {sessions.filter(s => s.actionItems?.length).length}
            </div>
            <div className="text-sm text-orange-800">Action Items</div>
          </div>
        </div>
      </div>

      {/* Session List */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{session.clientName}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.duration}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  session.status === 'completed' ? 'bg-green-100 text-green-800' :
                  session.status === 'recording' ? 'bg-red-100 text-red-800' :
                  session.status === 'uploaded' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {session.status === 'completed' ? 'Completed' :
                   session.status === 'recording' ? 'Recording' :
                   session.status === 'uploaded' ? 'Uploaded' :
                   'Scheduled'}
                </span>

                <div className="flex space-x-2">
                  {session.recordingUrl && (
                    <a
                      href={session.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      title="View Recording"
                    >
                      <Play className="w-4 h-4" />
                    </a>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedSession(session)
                      setShowUploadModal(true)
                    }}
                    className="text-gray-600 hover:text-gray-800"
                    title="Upload Files"
                  >
                    <Upload className="w-4 h-4" />
                  </button>

                  {session.notes && (
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="text-gray-600 hover:text-gray-800"
                      title="View Notes"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Session Files</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">{selectedSession.title}</h4>
                <p className="text-sm text-gray-600">Client: {selectedSession.clientName}</p>
                <p className="text-sm text-gray-600">Date: {new Date(selectedSession.date).toLocaleDateString()}</p>
              </div>

              {isUploading ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">Uploading files...</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{uploadProgress}% complete</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📹 Recording File (from Google Drive)
                    </label>
                    <input
                      type="file"
                      accept="video/*,audio/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(selectedSession.id, file, 'recording')
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📄 Transcript File (optional)
                    </label>
                    <input
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(selectedSession.id, file, 'transcript')
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📝 Session Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Add your session notes here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={selectedSession.notes}
                    />
                  </div>
                </div>
              )}

              {!isUploading && (
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleFileUpload(selectedSession.id, new File([], 'mock'), 'notes')}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save to Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Session Details */}
      {selectedSession && !showUploadModal && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Session Details</h3>
            <button
              onClick={() => setSelectedSession(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Client:</span>
                <p className="font-medium">{selectedSession.clientName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Duration:</span>
                <p className="font-medium">{selectedSession.duration}</p>
              </div>
            </div>

            {selectedSession.notes && (
              <div>
                <span className="text-sm text-gray-600">Notes:</span>
                <p className="mt-1 text-gray-900">{selectedSession.notes}</p>
              </div>
            )}

            {selectedSession.actionItems && selectedSession.actionItems.length > 0 && (
              <div>
                <span className="text-sm text-gray-600">Action Items:</span>
                <ul className="mt-1 space-y-1">
                  {selectedSession.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-900">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
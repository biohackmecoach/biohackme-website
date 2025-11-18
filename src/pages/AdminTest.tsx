import { useState, useEffect } from 'react'
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
  Upload
} from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'prospect'
  program: string
  joinDate: string
  lastContact: string
  notes: string
  sessions: number
  healthGoals: string[]
  challenges: string[]
}

export default function AdminTest() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [clientCount, setClientCount] = useState(0)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState('')

  // Load clients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('biohackme_clients')
    if (saved) {
      try {
        const clientData = JSON.parse(saved)
        setClients(clientData)
        setClientCount(clientData.length)
      } catch (error) {
        console.error('Error loading clients:', error)
      }
    }
  }, [])

  const handleImport = async () => {
    setIsImporting(true)
    setImportStatus('Fetching data from Google Sheets...')
    
    try {
      // Dynamic import to avoid build issues
      const { sheetsImporter } = await import('../utils/importSheetsData')
      
      setImportStatus('Parsing client data...')
      const importedClients = await sheetsImporter.importAllClients()
      
      if (importedClients.length === 0) {
        setImportStatus('No clients found in sheet.')
        setIsImporting(false)
        return
      }

      setImportStatus(`Successfully imported ${importedClients.length} real clients!`)
      
      // Convert to our client format
      const clients: Client[] = importedClients.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        status: client.status,
        program: client.program,
        joinDate: client.joinDate,
        lastContact: client.lastContact,
        notes: client.notes,
        sessions: client.sessions,
        healthGoals: client.healthGoals,
        challenges: client.challenges
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

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>BiohackMe Admin</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">BiohackMe Admin</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white rounded-lg shadow-sm p-4 mr-8">
              <div className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'clients', label: 'Clients', icon: Users },
                  { id: 'import', label: 'Import', icon: Upload },
                  { id: 'analytics', label: 'Analytics', icon: FileText },
                  { id: 'sessions', label: 'Sessions', icon: Video },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded text-sm font-medium ${ 
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
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
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-sm text-gray-600">Total Clients</h3>
                      <p className="text-3xl font-bold text-gray-900">{clientCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-sm text-gray-600">Form Responses</h3>
                      <p className="text-3xl font-bold text-gray-900">19</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-sm text-gray-600">Status</h3>
                      <p className="text-3xl font-bold text-green-600">Active</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <button
                      onClick={() => setActiveTab('import')}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
                    >
                      Import 19 Clients from Google Forms
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'import' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Import Clients</h2>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Google Sheets Integration</h3>
                        <p className="text-sm text-gray-600">Import your real client data from Google Sheets</p>
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
                            <span>Import Real Clients</span>
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
                        <p>Expected: 12 real client responses</p>
                        <p>Data: Names, emails, health goals, challenges</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                      <p className="text-gray-600 mb-4">Import your clients from Google Forms to get started.</p>
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
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Client Directory</h3>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Filter className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
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
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {client.program}
                                </div>
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

              {/* Client Detail Modal */}
              {selectedClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                      <button
                        onClick={() => setSelectedClient(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Contact Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{selectedClient.email}</span>
                          </div>
                          {selectedClient.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{selectedClient.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Joined {selectedClient.joinDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Program Info */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Program Details</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Status: </span>
                            <span className={`font-medium ${
                              selectedClient.status === 'active' ? 'text-green-600' :
                              selectedClient.status === 'prospect' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`}>
                              {selectedClient.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Program: </span>
                            <span className="font-medium">{selectedClient.program}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Sessions: </span>
                            <span className="font-medium">{selectedClient.sessions}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Contact: </span>
                            <span className="font-medium">{selectedClient.lastContact}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Goals */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Health Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.healthGoals.map((goal, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Current Challenges</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.challenges.map((challenge, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            {challenge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{selectedClient.notes}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Video className="w-4 h-4" />
                        <span>Google Meet</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Add Notes</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics */}
              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Active Clients</h3>
                          <p className="text-2xl font-bold text-gray-900">
                            {clients.filter(c => c.status === 'active').length}
                          </p>
                          <p className="text-xs text-green-600">+12% from last month</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Video className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
                          <p className="text-2xl font-bold text-gray-900">
                            {clients.reduce((sum, c) => sum + c.sessions, 0)}
                          </p>
                          <p className="text-xs text-green-600">+8% from last month</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <BarChart3 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                          <p className="text-2xl font-bold text-gray-900">73%</p>
                          <p className="text-xs text-green-600">+5% from last month</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Program Distribution</h3>
                    <div className="space-y-3">
                      {['Supercharge Your Life', 'Masterclass', 'Book Reader', 'Consultation'].map((program) => {
                        const count = clients.filter(c => c.program === program).length
                        const percentage = clients.length > 0 ? Math.round((count / clients.length) * 100) : 0
                        return (
                          <div key={program} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{program}</span>
                            <div className="flex items-center space-x-3">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12">{count} ({percentage}%)</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Sessions */}
              {activeTab === 'sessions' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Google Meet Sessions</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Session</span>
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Session Management</h3>
                      <p className="text-sm text-gray-600">Record and manage your coaching sessions</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-blue-900 mb-2">How to Record Sessions</h4>
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>1. Start your Google Meet call</p>
                          <p>2. Click the three dots menu → "Record meeting"</p>
                          <p>3. Recording automatically saves to your Google Drive</p>
                          <p>4. Upload recording and notes to client profiles here</p>
                        </div>
                      </div>

                      <div className="text-center text-gray-500 py-8">
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
                        <p className="text-gray-600 mb-4">
                          Start recording your coaching sessions with Google Meet.
                        </p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Schedule First Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Google Forms API</h4>
                            <p className="text-sm text-gray-600">Connected - Form ID: 1opF-H...</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Connected
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Google Meet Integration</h4>
                            <p className="text-sm text-gray-600">Free recording via Google Drive</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                      
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Export Client Data</span>
                            <Upload className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Download all client information as CSV</p>
                        </button>

                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Backup Settings</span>
                            <Settings className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Configure automatic data backups</p>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">✓</div>
                          <div className="text-sm text-green-800 font-medium">CRM Active</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">✓</div>
                          <div className="text-sm text-green-800 font-medium">API Connected</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{clientCount}</div>
                          <div className="text-sm text-blue-800 font-medium">Clients Loaded</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
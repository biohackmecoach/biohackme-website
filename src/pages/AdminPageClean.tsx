import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  Database,
  Video,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader
} from 'lucide-react'
import { clientImporter } from '../utils/importRealClients'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  status: string
  program: string
  joinDate: string
  notes: string
}

export default function AdminPageClean() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState('')
  const [clientCount, setClientCount] = useState(0)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const savedClients = localStorage.getItem('biohackme_clients')
    if (savedClients) {
      try {
        const clientData = JSON.parse(savedClients)
        setClients(clientData)
        setClientCount(clientData.length)
      } catch (error) {
        console.error('Error loading clients:', error)
      }
    }
  }, [])

  const handleImportClients = async () => {
    setIsImporting(true)
    setImportStatus('Connecting to Google Forms API...')
    
    try {
      setImportStatus('Fetching form structure...')
      const form = await clientImporter.fetchFormStructure()
      
      if (!form) {
        setImportStatus('Could not access form. Check API credentials in Settings.')
        setIsImporting(false)
        return
      }

      setImportStatus('Loading form responses...')
      const importedClients = await clientImporter.importAllClients()
      
      if (importedClients.length === 0) {
        setImportStatus('No responses found. This may need OAuth setup for private forms.')
        setIsImporting(false)
        return
      }

      setImportStatus(`Found ${importedClients.length} clients. Importing to CRM...`)
      
      localStorage.setItem('biohackme_clients', JSON.stringify(importedClients))
      setClients(importedClients)
      setClientCount(importedClients.length)

      setImportStatus(`Successfully imported ${importedClients.length} clients to your CRM.`)
      
      setTimeout(() => {
        setImportStatus('')
        setIsImporting(false)
        setActiveSection('clients')
      }, 2000)
      
    } catch (error) {
      console.error('Import error:', error)
      setImportStatus('Import failed. Check console for details.')
      setIsImporting(false)
    }
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'google-forms', label: 'Google Forms', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <>
      <Helmet>
        <title>BiohackMe Admin - Dashboard</title>
        <meta name="description" content="Admin dashboard for BiohackMe CRM and analytics" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">BiohackMe Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">CRM Dashboard</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 mr-8 h-fit">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1">
              {/* Dashboard */}
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Total Clients</h3>
                          <p className="text-2xl font-bold text-gray-900">{clientCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
                          <p className="text-2xl font-bold text-gray-900">0</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Form Responses</h3>
                          <p className="text-2xl font-bold text-gray-900">19</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <BarChart3 className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-600">Analytics</h3>
                          <p className="text-2xl font-bold text-gray-900">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveSection('google-forms')}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 text-left transition-all shadow-sm"
                      >
                        <div className="flex items-center mb-2">
                          <Database className="w-5 h-5 mr-2" />
                          <h4 className="font-semibold">Import Clients</h4>
                        </div>
                        <p className="text-sm opacity-90">Import 19 clients from Google Forms</p>
                      </button>

                      <button
                        onClick={() => setActiveSection('clients')}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 text-left transition-all shadow-sm"
                      >
                        <div className="flex items-center mb-2">
                          <Users className="w-5 h-5 mr-2" />
                          <h4 className="font-semibold">Manage Clients</h4>
                        </div>
                        <p className="text-sm opacity-90">View and edit client profiles</p>
                      </button>

                      <button
                        onClick={() => setActiveSection('settings')}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 text-left transition-all shadow-sm"
                      >
                        <div className="flex items-center mb-2">
                          <Video className="w-5 h-5 mr-2" />
                          <h4 className="font-semibold">Google Meet</h4>
                        </div>
                        <p className="text-sm opacity-90">Setup session recording</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Google Forms */}
              {activeSection === 'google-forms' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Google Forms Integration</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Import Client Data</h3>
                        <p className="text-sm text-gray-600">19 form responses ready to import</p>
                      </div>
                      <button 
                        onClick={handleImportClients}
                        disabled={isImporting}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all"
                      >
                        {isImporting ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Importing...</span>
                          </>
                        ) : (
                          <>
                            <Database className="w-4 h-4" />
                            <span>Import All Clients</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {importStatus && (
                      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                        <div className="flex items-center">
                          {isImporting ? (
                            <Loader className="w-4 h-4 animate-spin text-blue-600 mr-2" />
                          ) : importStatus.includes('Successfully') ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          ) : importStatus.includes('failed') || importStatus.includes('Could not') ? (
                            <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                          ) : (
                            <div className="w-4 h-4 mr-2" />
                          )}
                          <p className="text-sm text-gray-700">{importStatus}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Form Details</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Form ID: 1opF-HEYVrwRoWMkS88S6EI1xejZjQBAAXssj92iaZoc</p>
                        <p>API Key: Configured</p>
                        <p>Responses Available: 19</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Clients */}
              {activeSection === 'clients' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Clients ({clientCount})</h2>
                    {clientCount > 0 && (
                      <div className="text-sm text-gray-500">
                        {clientCount} total clients
                      </div>
                    )}
                  </div>
                  
                  {clients.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                      <p className="text-gray-600 mb-4">
                        Import your 19 clients from Google Forms to get started.
                      </p>
                      <button
                        onClick={() => setActiveSection('google-forms')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                      >
                        Import Clients
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Client Directory</h3>
                        <p className="text-sm text-gray-600">Imported from Google Forms</p>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {clients.map((client, index) => (
                          <div key={client.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  {client.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{client.name || 'Unknown'}</h4>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {client.status || 'prospect'}
                                </span>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Joined {client.joinDate}
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

              {/* Settings */}
              {activeSection === 'settings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Google Meet Integration</h3>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-green-800">No API Setup Required</h4>
                      </div>
                      <p className="text-green-700 mt-1">
                        Google Meet integration works without API credentials or paid plans.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Recording Setup</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</div>
                            <span>Start Google Meet call</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</div>
                            <span>Click three dots menu</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</div>
                            <span>Select "Record meeting"</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</div>
                            <span>Recording saves to Google Drive</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">CRM Integration</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</div>
                            <span>Go to client profile</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</div>
                            <span>Click "Google Meet Sessions"</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</div>
                            <span>Upload recording and notes</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</div>
                            <span>Add session summary</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other sections */}
              {!['dashboard', 'google-forms', 'clients', 'settings'].includes(activeSection) && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">This section is under development.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
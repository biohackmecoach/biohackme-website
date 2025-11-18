import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { clientImporter } from '../utils/importRealClients'

export default function AdminPageSimple() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState('')
  const [clientCount, setClientCount] = useState(0)
  const [clients, setClients] = useState<any[]>([])

  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedClients = localStorage.getItem('biohackme_clients')
    if (savedClients) {
      const clientData = JSON.parse(savedClients)
      setClients(clientData)
      setClientCount(clientData.length)
    }
  }, [])

  const handleImportClients = async () => {
    setIsImporting(true)
    setImportStatus('🔄 Connecting to Google Forms API...')
    
    try {
      setImportStatus('📋 Fetching form structure...')
      const form = await clientImporter.fetchFormStructure()
      
      if (!form) {
        setImportStatus('❌ Could not access form. Check API credentials.')
        setIsImporting(false)
        return
      }

      setImportStatus('📥 Loading all form responses...')
      const clients = await clientImporter.importAllClients()
      
      if (clients.length === 0) {
        setImportStatus('⚠️ No responses found. This may need OAuth setup for private forms.')
        setIsImporting(false)
        return
      }

      setImportStatus(`✅ Found ${clients.length} clients! Importing to CRM...`)
      
      // Save to localStorage
      localStorage.setItem('biohackme_clients', JSON.stringify(clients))
      setClients(clients)
      setClientCount(clients.length)

      setImportStatus(`🎉 Successfully imported ${clients.length} clients to your CRM!`)
      
      setTimeout(() => {
        setImportStatus('')
        setIsImporting(false)
        setActiveSection('clients') // Switch to clients view
      }, 3000)
      
    } catch (error) {
      console.error('Import error:', error)
      setImportStatus('❌ Import failed. Check console for details.')
      setIsImporting(false)
    }
  }

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
                <span className="text-sm text-gray-600">Welcome back!</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-6 mr-8">
              <div className="space-y-2">
                {[
                  { id: 'dashboard', label: '📊 Dashboard' },
                  { id: 'clients', label: '👥 Clients' },
                  { id: 'analytics', label: '📈 Analytics' },
                  { id: 'google-forms', label: '📝 Google Forms' },
                  { id: 'settings', label: '⚙️ Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1">
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600">Total Clients</h3>
                      <p className="text-3xl font-bold text-gray-900">{clientCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
                      <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600">Form Submissions</h3>
                      <p className="text-3xl font-bold text-gray-900">19</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600">Website Views</h3>
                      <p className="text-3xl font-bold text-gray-900">1,234</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveSection('google-forms')}
                        className="bg-emerald-600 text-white p-4 rounded-lg hover:bg-emerald-700 text-left"
                      >
                        <h4 className="font-semibold">Import 19 Clients</h4>
                        <p className="text-sm opacity-90">From Google Forms</p>
                      </button>
                      <button
                        onClick={() => setActiveSection('clients')}
                        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left"
                      >
                        <h4 className="font-semibold">Manage Clients</h4>
                        <p className="text-sm opacity-90">View and edit profiles</p>
                      </button>
                      <button
                        onClick={() => setActiveSection('settings')}
                        className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 text-left"
                      >
                        <h4 className="font-semibold">Setup Google Meet</h4>
                        <p className="text-sm opacity-90">Free recording integration</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'google-forms' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Google Forms Integration</h2>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Import Your 19 Clients</h3>
                      <button 
                        onClick={handleImportClients}
                        disabled={isImporting}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isImporting ? 'Importing...' : 'Import All Clients'}
                      </button>
                    </div>
                    
                    {importStatus && (
                      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                        <p className="text-blue-700 text-sm">{importStatus}</p>
                      </div>
                    )}
                    
                    <p className="text-gray-600">
                      Your Google Form has 19 responses ready to import into the CRM.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'clients' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Clients ({clientCount})</h2>
                  
                  {clients.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-600">
                        No clients imported yet. Go to Google Forms to import your 19 clients.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Imported Clients</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {clients.map((client, index) => (
                          <div key={client.id || index} className="p-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                  {client.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{client.name || 'Unknown'}</h4>
                                  <p className="text-sm text-gray-600">{client.email}</p>
                                  {client.phone && <p className="text-xs text-gray-500">{client.phone}</p>}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {client.status || 'prospect'}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  Joined: {client.joinDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Google Meet Setup (FREE)</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">✅ No API Setup Required!</h4>
                      <p className="text-green-700">
                        Google Meet integration works without any API credentials or paid plans.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!['dashboard', 'google-forms', 'clients', 'settings'].includes(activeSection) && (
                <div className="text-center text-gray-500 mt-20">
                  <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                  <p>This section is under development.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
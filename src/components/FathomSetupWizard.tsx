import { useState } from 'react'
import { CheckCircle2, AlertCircle, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react'

interface FathomSetupWizardProps {
  onComplete: (credentials: { apiKey: string; workspaceId: string }) => void
}

export default function FathomSetupWizard({ onComplete }: FathomSetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [apiKey, setApiKey] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null)

  const steps = [
    {
      title: 'Access Fathom Account',
      description: 'Log into your Fathom account and check API availability'
    },
    {
      title: 'Get API Credentials',
      description: 'Generate your API key and find your workspace ID'
    },
    {
      title: 'Enter Credentials',
      description: 'Add your Fathom API credentials to connect'
    },
    {
      title: 'Test Connection',
      description: 'Verify your credentials work correctly'
    }
  ]

  const handleVerifyConnection = async () => {
    if (!apiKey || !workspaceId) {
      setVerificationStatus('error')
      return
    }

    setIsVerifying(true)
    setVerificationStatus(null)

    try {
      // Test API connection (this would be a real API call in production)
      const response = await fetch(`https://api.fathom.video/v1/meetings`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setVerificationStatus('success')
        setTimeout(() => {
          onComplete({ apiKey, workspaceId })
        }, 1500)
      } else {
        setVerificationStatus('error')
      }
    } catch (error) {
      console.error('Fathom API test failed:', error)
      setVerificationStatus('error')
    } finally {
      setIsVerifying(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">🟣 Fathom AI Setup</h2>
          <p className="text-gray-600 mt-2">
            Connect your Fathom account to automatically import coaching session recordings and transcripts
          </p>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${ 
                  index + 1 < currentStep ? 'bg-green-500 text-white' :
                  index + 1 === currentStep ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1 < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-2 ${ 
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important: API Access Required</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Fathom API access typically requires a paid plan. Free accounts may not have API access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Step 1: Log into Fathom</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Go to <a href="https://fathom.video/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">fathom.video <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                  <li>Log in with your account</li>
                  <li>Check if you see "API" or "Integrations" in your settings menu</li>
                </ol>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Don't see API options?</strong> Contact Fathom support at support@fathom.video to request API access.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                I have access to Fathom settings
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Step 2: Get Your API Credentials</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-800">Get API Key:</h5>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>In Fathom, go to Settings → API/Integrations</li>
                    <li>Click "Generate API Key" or "Create New Key"</li>
                    <li>Name it "BiohackMe CRM"</li>
                    <li>Copy the API key (save it securely!)</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-gray-800">Find Workspace ID:</h5>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Look at your Fathom URL when logged in</li>
                    <li>Format: app.fathom.video/workspace/<strong>[ID]</strong>/meetings</li>
                    <li>Or check in Account Settings for workspace info</li>
                    <li>Copy the workspace identifier</li>
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Example:</h5>
                <code className="text-sm text-gray-600">
                  URL: https://app.fathom.video/workspace/abc123def456/meetings<br/>
                  Workspace ID: abc123def456
                </code>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  I have my credentials
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Step 3: Enter Your Fathom Credentials</h4>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                    Fathom API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Fathom API key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="workspaceId" className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="workspaceId"
                      value={workspaceId}
                      onChange={(e) => setWorkspaceId(e.target.value)}
                      placeholder="abc123def456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => copyToClipboard(workspaceId)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!apiKey || !workspaceId}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Connection
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Step 4: Test Your Connection</h4>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Your Credentials:</h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">API Key:</span> 
                    <span className="ml-2 font-mono">{apiKey.substring(0, 8)}...{apiKey.substring(apiKey.length - 4)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Workspace ID:</span> 
                    <span className="ml-2 font-mono">{workspaceId}</span>
                  </div>
                </div>
              </div>

              {verificationStatus === 'success' && (
                <div className="flex items-center space-x-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>✅ Connection successful! Fathom is now connected to your CRM.</span>
                </div>
              )}

              {verificationStatus === 'error' && (
                <div className="flex items-center space-x-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p>❌ Connection failed. Please check:</p>
                    <ul className="text-sm mt-1 list-disc list-inside">
                      <li>API key is correct and active</li>
                      <li>Workspace ID is accurate</li>
                      <li>Your Fathom account has API access enabled</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyConnection}
                  disabled={isVerifying || verificationStatus === 'success'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Testing...' : verificationStatus === 'success' ? 'Connected!' : 'Test Connection'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
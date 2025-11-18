import { useState } from 'react'
import { 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Eye, 
  EyeOff,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

interface APISetupWizardProps {
  onComplete: () => void
}

export default function APISetupWizard({ onComplete }: APISetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showApiKey, setShowApiKey] = useState(false)
  const [credentials, setCredentials] = useState({
    googleApiKey: '',
    googleClientId: '',
    googleClientSecret: '',
    intakeFormId: '',
    assessmentFormId: '',
    feedbackFormId: '',
    freebieFormId: '',
    fathomApiKey: '',
    fathomWorkspaceId: ''
  })

  const steps = [
    {
      id: 1,
      title: 'Google Cloud Console Setup',
      description: 'Create project and enable APIs',
      icon: '🔵'
    },
    {
      id: 2,
      title: 'Google API Credentials',
      description: 'Generate API keys and OAuth',
      icon: '🔑'
    },
    {
      id: 3,
      title: 'Google Form IDs',
      description: 'Extract form IDs from URLs',
      icon: '📋'
    },
    {
      id: 4,
      title: 'Fathom API Setup',
      description: 'Get Fathom credentials',
      icon: '🟣'
    },
    {
      id: 5,
      title: 'Environment Configuration',
      description: 'Add credentials to app',
      icon: '⚙️'
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Google Cloud Console Setup</h3>
        <ol className="space-y-2 text-sm text-blue-800">
          <li>1. Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google Cloud Console</a></li>
          <li>2. Sign in with your Google account</li>
          <li>3. Create a new project called "BiohackMe CRM"</li>
          <li>4. Enable "Google Forms API" in API Library</li>
          <li>5. Also enable "Google Drive API"</li>
        </ol>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="step1-complete"
          onChange={(e) => e.target.checked && markStepComplete(1)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="step1-complete" className="text-sm text-gray-700">
          I've completed the Google Cloud Console setup
        </label>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Generate API Credentials</h3>
        <ol className="space-y-2 text-sm text-green-800 mb-4">
          <li>1. Go to "APIs & Services" → "Credentials"</li>
          <li>2. Click "+ CREATE CREDENTIALS" → "API key"</li>
          <li>3. Copy the API key and paste it below</li>
          <li>4. Create OAuth client ID for web application</li>
          <li>5. Add redirect URI: <code className="bg-white px-1 rounded">http://localhost:5174/admin</code></li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Google API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={credentials.googleApiKey}
              onChange={(e) => setCredentials({...credentials, googleApiKey: e.target.value})}
              placeholder="AIzaSyC..."
              className="w-full p-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-2 flex space-x-1">
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OAuth Client ID</label>
          <input
            type="text"
            value={credentials.googleClientId}
            onChange={(e) => setCredentials({...credentials, googleClientId: e.target.value})}
            placeholder="123456789..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="step2-complete"
          onChange={(e) => e.target.checked && markStepComplete(2)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="step2-complete" className="text-sm text-gray-700">
          I've generated and entered my Google API credentials
        </label>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">Extract Google Form IDs</h3>
        <p className="text-sm text-purple-800 mb-2">
          Open each Google Form and copy the ID from the URL:
        </p>
        <code className="text-xs bg-white px-2 py-1 rounded block">
          https://docs.google.com/forms/d/[FORM_ID]/edit
        </code>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Intake Form ID</label>
          <input
            type="text"
            value={credentials.intakeFormId}
            onChange={(e) => setCredentials({...credentials, intakeFormId: e.target.value})}
            placeholder="1FAIpQLSe..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Form ID</label>
          <input
            type="text"
            value={credentials.assessmentFormId}
            onChange={(e) => setCredentials({...credentials, assessmentFormId: e.target.value})}
            placeholder="1FAIpQLSe..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Check-in Form ID</label>
          <input
            type="text"
            value={credentials.feedbackFormId}
            onChange={(e) => setCredentials({...credentials, feedbackFormId: e.target.value})}
            placeholder="1FAIpQLSe..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Free Guide Form ID</label>
          <input
            type="text"
            value={credentials.freebieFormId}
            onChange={(e) => setCredentials({...credentials, freebieFormId: e.target.value})}
            placeholder="1FAIpQLSe..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="step3-complete"
          onChange={(e) => e.target.checked && markStepComplete(3)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="step3-complete" className="text-sm text-gray-700">
          I've entered all my Google Form IDs
        </label>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-900 mb-2">Fathom AI Setup</h3>
        <ol className="space-y-2 text-sm text-indigo-800">
          <li>1. Log in to your <a href="https://fathom.video" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Fathom account</a></li>
          <li>2. Go to Account Settings → Integrations/API</li>
          <li>3. Generate an API key named "BiohackMe CRM"</li>
          <li>4. Copy your workspace ID from the dashboard</li>
          <li className="text-orange-700">⚠️ Note: API access may require contacting Fathom support</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fathom API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={credentials.fathomApiKey}
              onChange={(e) => setCredentials({...credentials, fathomApiKey: e.target.value})}
              placeholder="fathom_api_..."
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Workspace ID</label>
          <input
            type="text"
            value={credentials.fathomWorkspaceId}
            onChange={(e) => setCredentials({...credentials, fathomWorkspaceId: e.target.value})}
            placeholder="workspace_123..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-yellow-800">
          <strong>Can't find API settings?</strong> Contact Fathom support at support@fathom.video to enable API access for your account.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="step4-complete"
          onChange={(e) => e.target.checked && markStepComplete(4)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="step4-complete" className="text-sm text-gray-700">
          I've entered my Fathom credentials (or will set up later)
        </label>
      </div>
    </div>
  )

  const renderStep5 = () => {
    const envContent = `# Google Forms API Configuration
REACT_APP_GOOGLE_FORMS_API_KEY=${credentials.googleApiKey}
REACT_APP_GOOGLE_CLIENT_ID=${credentials.googleClientId}
REACT_APP_GOOGLE_CLIENT_SECRET=${credentials.googleClientSecret}
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:5174/admin

# Your Google Form IDs
REACT_APP_INTAKE_FORM_ID=${credentials.intakeFormId}
REACT_APP_ASSESSMENT_FORM_ID=${credentials.assessmentFormId}
REACT_APP_FEEDBACK_FORM_ID=${credentials.feedbackFormId}
REACT_APP_FREEBIE_FORM_ID=${credentials.freebieFormId}

# Fathom AI Configuration
REACT_APP_FATHOM_API_KEY=${credentials.fathomApiKey}
REACT_APP_FATHOM_WORKSPACE_ID=${credentials.fathomWorkspaceId}
REACT_APP_FATHOM_WEBHOOK_URL=https://yourapp.com/api/fathom-webhook

# Optional: Calendar Integration
REACT_APP_CALENDAR_API_KEY=your_calendar_api_key_here
REACT_APP_CALENDAR_ID=your_calendar_id_here`

    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">Environment Configuration</h3>
          <ol className="space-y-2 text-sm text-green-800">
            <li>1. Create a file called <code className="bg-white px-1 rounded">.env.local</code> in your project root</li>
            <li>2. Copy the configuration below into that file</li>
            <li>3. Save the file and restart your development server</li>
            <li>4. Test the integration in your admin dashboard</li>
          </ol>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">.env.local</span>
            <button
              onClick={() => copyToClipboard(envContent)}
              className="flex items-center space-x-1 text-gray-400 hover:text-green-400"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
          <pre className="whitespace-pre-wrap">{envContent}</pre>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Security Important</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Never commit the .env.local file to Git (it's automatically ignored)</li>
            <li>• Use different credentials for production deployment</li>
            <li>• Regularly rotate your API keys for security</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="step5-complete"
            onChange={(e) => e.target.checked && markStepComplete(5)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="step5-complete" className="text-sm text-gray-700">
            I've created the .env.local file and restarted the server
          </label>
        </div>

        <div className="pt-4">
          <button
            onClick={onComplete}
            disabled={completedSteps.length < 5}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Complete Setup & Test Integration
          </button>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Progress Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Integration Setup</h2>
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                completedSteps.includes(step.id) 
                  ? 'bg-green-500 text-white' 
                  : currentStep === step.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {completedSteps.includes(step.id) ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 ${
                  completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 py-6">
        {renderCurrentStep()}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <button
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
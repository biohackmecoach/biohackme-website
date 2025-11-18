import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { xeroIntegration } from '../utils/xeroIntegration'

export default function XeroCallback() {
  const [status, setStatus] = useState('Processing authorization...')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          setStatus(`Authorization failed: ${error}`)
          setTimeout(() => navigate('/admin'), 3000)
          return
        }

        if (!code) {
          setStatus('No authorization code received')
          setTimeout(() => navigate('/admin'), 3000)
          return
        }

        setStatus('Exchanging authorization code for access token...')
        
        const tokens = await xeroIntegration.exchangeCodeForToken(code)
        
        if (tokens.access_token) {
          setStatus('Successfully connected to Xero! Redirecting...')
          setTimeout(() => navigate('/admin'), 2000)
        } else {
          setStatus('Failed to get access token')
          setTimeout(() => navigate('/admin'), 3000)
        }
      } catch (error) {
        console.error('Xero callback error:', error)
        setStatus(`Connection failed: ${error}`)
        setTimeout(() => navigate('/admin'), 3000)
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="mb-4">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Connecting to Xero
        </h2>
        
        <p className="text-gray-600 text-sm">
          {status}
        </p>
        
        <div className="mt-6">
          <button 
            onClick={() => navigate('/admin')}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Return to Admin Panel
          </button>
        </div>
      </div>
    </div>
  )
}
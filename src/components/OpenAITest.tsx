import React, { useState } from 'react'
import { openaiClient } from '../utils/openaiClient'
import { CheckCircle, AlertCircle, RefreshCw, Zap } from 'lucide-react'

const OpenAITest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testOpenAI = async () => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      console.log('Testing OpenAI connection...')
      console.log('Environment check:', {
        hasViteOpenAIKey: !!import.meta.env.VITE_OPENAI_API_KEY,
        keyLength: import.meta.env.VITE_OPENAI_API_KEY?.length || 0,
        keyStart: import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 10) || 'none'
      })

      // Test basic connection
      const connectionTest = await openaiClient.testConnection()
      console.log('Connection test result:', connectionTest)

      if (connectionTest.success) {
        // Test LinkedIn post generation
        const linkedinPost = await openaiClient.generateLinkedInPost(
          'executive energy optimization for Australian business leaders'
        )
        console.log('LinkedIn post generated:', linkedinPost)

        setTestResult({
          connection: connectionTest,
          linkedinPost: linkedinPost,
          status: 'success'
        })
      } else {
        setTestResult({
          connection: connectionTest,
          status: 'failed'
        })
      }
    } catch (err) {
      console.error('OpenAI test error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-blue-500" />
          OpenAI Integration Test
        </h2>
        
        <button
          onClick={testOpenAI}
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Testing OpenAI...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Test OpenAI Connection</span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">Error:</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {testResult && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg border ${testResult.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center space-x-2 mb-2">
                {testResult.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${testResult.status === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  Connection {testResult.status === 'success' ? 'Successful' : 'Failed'}
                </span>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(testResult.connection, null, 2)}
                </pre>
              </div>
            </div>

            {testResult.linkedinPost && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-3">Generated LinkedIn Post:</h3>
                <div className="space-y-3">
                  <div>
                    <strong className="text-sm text-blue-700">Hook:</strong>
                    <p className="text-gray-700 italic">"{testResult.linkedinPost.hook}"</p>
                  </div>
                  <div>
                    <strong className="text-sm text-blue-700">Content:</strong>
                    <div className="text-gray-700 whitespace-pre-line">
                      {testResult.linkedinPost.content.join('\n')}
                    </div>
                  </div>
                  <div>
                    <strong className="text-sm text-blue-700">CTA:</strong>
                    <p className="text-gray-700">{testResult.linkedinPost.cta}</p>
                  </div>
                  <div>
                    <strong className="text-sm text-blue-700">Hashtags:</strong>
                    <p className="text-blue-600">{testResult.linkedinPost.hashtags.join(' ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OpenAITest
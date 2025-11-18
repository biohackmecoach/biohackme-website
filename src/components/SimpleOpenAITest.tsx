import React, { useState } from 'react'

const SimpleOpenAITest: React.FC = () => {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setResult('')

    try {
      // Check environment variable
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      console.log('API Key Check:', {
        exists: !!apiKey,
        length: apiKey?.length || 0,
        starts: apiKey?.substring(0, 10) || 'none'
      })

      if (!apiKey) {
        setResult('❌ API Key not found in environment')
        return
      }

      // Direct API test
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: 'Say "Hello from OpenAI!"' }
          ],
          max_tokens: 20
        })
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Success:', data)
        setResult(`✅ SUCCESS: ${data.choices[0].message.content}`)
      } else {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        setResult(`❌ FAILED (${response.status}): ${errorText}`)
      }

    } catch (error) {
      console.error('Test error:', error)
      setResult(`❌ ERROR: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold mb-4">Simple OpenAI Test</h1>

        <div className="mb-4">
          <p><strong>API Key Status:</strong> {import.meta.env.VITE_OPENAI_API_KEY ? '✅ Loaded' : '❌ Missing'}</p>
          <p><strong>Key Length:</strong> {import.meta.env.VITE_OPENAI_API_KEY?.length || 0}</p>
        </div>

        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {loading ? 'Testing...' : 'Test OpenAI API'}
        </button>

        {result && (
          <div className="p-4 bg-gray-100 rounded">
            <pre className="text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleOpenAITest
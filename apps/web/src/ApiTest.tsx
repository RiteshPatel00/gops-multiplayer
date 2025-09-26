import { useState } from 'react'

interface ApiResponse {
  message: string;
  game: string;
  timestamp: string;
  status: string;
  service: string;
}

function ApiTest() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testSpringBootAPI = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null)

    try {
      const credentials = btoa('admin:password')

      const response = await fetch('http://localhost:8080/api/health', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      })

      const data: ApiResponse = await response.json();
      setApiResponse(data);

    }

    catch (err) {
      setError('Error occured')
      console.log('API Error', err)
    }

    finally {
      setLoading(false);
    }

  }

  const testHelloEndpoint = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null)

    try {
      const credentials = btoa('admin:password')

      const response = await fetch('http://localhost:8080/api/hello', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      })

      const data: ApiResponse = await response.json();
      setApiResponse(data);

    }

    catch (err) {
      setError('Error occured')
      console.log('API Error', err)
    }

    finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Spring Boot API Test
        </h1>

        {/* API Test Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">API Endpoints</h2>

          <div className="space-y-4">
            <button
              onClick={testSpringBootAPI}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
              }`}
            >
              {loading ? 'Testing...' : 'Test /api/health'}
            </button>

            <button
              onClick={testHelloEndpoint}
              disabled={loading}
              className={`ml-4 px-6 py-3 rounded-lg font-semibold transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white'
              }`}
            >
              {loading ? 'Testing...' : 'Test /api/hello'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <div className="flex items-center text-blue-600">
              <div className="animate-spin mr-2">🔄</div>
              <span>Calling Spring Boot API...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
            <h3 className="font-bold text-red-800 mb-2">❌ Error:</h3>
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {/* Success State */}
        {apiResponse && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800 mb-4">✅ API Response:</h3>
            <div className="bg-white p-4 rounded border font-mono text-sm">
              {apiResponse.message && <div><strong>Message:</strong> {apiResponse.message}</div>}
              {apiResponse.game && <div><strong>Game:</strong> {apiResponse.game}</div>}
              {apiResponse.status && <div><strong>Status:</strong> {apiResponse.status}</div>}
              {apiResponse.service && <div><strong>Service:</strong> {apiResponse.service}</div>}
              {apiResponse.timestamp && <div><strong>Timestamp:</strong> {apiResponse.timestamp}</div>}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default ApiTest
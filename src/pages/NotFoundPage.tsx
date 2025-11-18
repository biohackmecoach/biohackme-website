import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Helmet>
        <title>404 - Page Not Found - BiohackMe</title>
        <meta name="description" content="The page you're looking for could not be found." />
      </Helmet>
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  )
}
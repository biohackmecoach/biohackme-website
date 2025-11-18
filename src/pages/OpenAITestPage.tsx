import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import OpenAITest from '../components/OpenAITest'

export default function OpenAITestPage() {
  return (
    <div className="min-h-screen bg-ice font-montserrat">
      <Helmet>
        <title>OpenAI Integration Test | BiohackMe</title>
        <meta name="description" content="Test OpenAI API integration for AI-powered content generation and lead analysis." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-20">
        <OpenAITest />
      </div>
      
      <Footer />
    </div>
  )
}
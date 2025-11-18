import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GrokConnection from '../agents/GrokConnection'

export default function GrokConnectionPage() {
  return (
    <div className="min-h-screen bg-ice font-montserrat">
      <Helmet>
        <title>AI Platform Connections | BiohackMe</title>
        <meta name="description" content="Connect Grok, OpenAI, and LinkedIn APIs to power your AI-driven lead generation and content creation platform." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-20">
        <GrokConnection />
      </div>
      
      <Footer />
    </div>
  )
}
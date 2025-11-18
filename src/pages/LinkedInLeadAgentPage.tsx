import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LinkedInLeadAgent from '../agents/LinkedInLeadAgent'

export default function LinkedInLeadAgentPage() {
  return (
    <div className="min-h-screen bg-ice font-montserrat">
      <Helmet>
        <title>LinkedIn Lead Generation Agent | BiohackMe</title>
        <meta name="description" content="AI-powered LinkedIn lead generation for coaching clients with Grok integration and automated outreach." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-20">
        <LinkedInLeadAgent />
      </div>
      
      <Footer />
    </div>
  )
}
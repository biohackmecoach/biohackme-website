import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MasterclassAgent from '../agents/MasterclassAgent'

export default function MasterclassAgentPage() {
  return (
    <div className="min-h-screen bg-ice font-montserrat">
      <Helmet>
        <title>Masterclass Agent | BiohackMe Management</title>
        <meta name="description" content="Advanced masterclass management with assessment-driven social promotion and content creation tools." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-20">
        <MasterclassAgent />
      </div>
      
      <Footer />
    </div>
  )
}
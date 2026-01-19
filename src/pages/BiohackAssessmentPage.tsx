import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BiohackAssessment from '../components/BiohackAssessment'

export default function BiohackAssessmentPage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Interactive Biohacking Assessment | BiohackMe - 8 Pillar Health Framework</title>
        <meta name="description" content="Discover your unique health baseline with Camilla's proven 8-pillar biohacking framework. Get personalised recommendations in 2 minutes." />
        <meta name="keywords" content="biohacking assessment, health assessment, 8 pillar framework, personalised health, biohacking blueprint" />
        <meta property="og:title" content="Interactive Biohacking Assessment | BiohackMe" />
        <meta property="og:description" content="Discover your unique health baseline with Camilla's proven 8-pillar biohacking framework." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/assessment" />
        <link rel="canonical" href="https://www.biohackme.com.au/assessment" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interactive Biohacking Assessment | BiohackMe" />
        <meta name="twitter:description" content="Discover your unique health baseline with Camilla's proven 8-pillar biohacking framework." />
      </Helmet>
      
      <Header />
      
      <BiohackAssessment />
    </div>
  )
}
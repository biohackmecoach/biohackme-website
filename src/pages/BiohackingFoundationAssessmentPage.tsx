import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SevenPillarsAssessment from '../components/SevenPillarsAssessment'

export default function BiohackingFoundationAssessmentPage() {
  return (
    <>
      <Helmet>
        <title>Biohacking Basics Assessment | BiohackMe</title>
        <meta name="description" content="Discover where you stand across the fundamental pillars of biohacking. Get your personalized baseline and recommendations." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice to-cloud">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/masterclass"
              className="inline-flex items-center text-ocean hover:text-sky transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Masterclasses
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-ocean mb-4">
              Biohacking Basics Assessment
            </h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Discover where you stand across the fundamental pillars of biohacking. Get your personalized baseline and recommendations.
            </p>
          </motion.div>

          {/* Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SevenPillarsAssessment />
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}
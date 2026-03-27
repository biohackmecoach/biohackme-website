import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowUpCircle, Dna, CalendarCheck } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const programs = [
  {
    title: 'Optimise Your Life',
    description: 'A complete biohacking coaching program to transform your health',
    to: '/optimise-your-life',
    icon: Sparkles,
  },
  {
    title: 'The Upgrade',
    description: 'Take your performance to the next level',
    to: '/the-upgrade',
    icon: ArrowUpCircle,
  },
  {
    title: 'DNA Package',
    description: 'Personalised coaching based on your unique DNA',
    to: '/dna-package',
    icon: Dna,
  },
  {
    title: 'Coaching Sessions',
    description: 'One-on-one sessions tailored to your goals',
    to: '/coaching-sessions',
    icon: CalendarCheck,
  },
]

export default function CoachingLinksPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Helmet>
        <title>Coaching Programs | BiohackMe</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Explore Camilla's coaching programs — Optimise Your Life, The Upgrade, DNA Package, and one-on-one sessions." />
      </Helmet>

      <Header />

      <div className="max-w-3xl mx-auto px-4 py-12 pt-20 sm:pt-36 md:pt-40">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-ocean mt-4 md:mt-8 mb-3">
            Coaching Programs
          </h1>
          <p className="text-lg text-ocean/70">
            Find the right program for your biohacking journey.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid grid-cols-2 gap-4">
          {programs.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            >
              <Link
                to={item.to}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-ocean/10 bg-gradient-to-b from-ice/50 to-cloud/50 shadow-sm hover:shadow-md hover:border-ocean/25 transition-all group h-full"
              >
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center mb-3 group-hover:bg-ocean/20 transition-colors">
                  <item.icon className="w-6 h-6 text-ocean" />
                </div>
                <h2 className="font-bold text-ocean text-sm sm:text-base mb-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-ocean/60">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

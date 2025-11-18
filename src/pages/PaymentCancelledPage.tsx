import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PaymentCancelledPage() {
  return (
    <>
      <Helmet>
        <title>Payment Cancelled | BiohackMe</title>
        <meta name="description" content="Payment was cancelled. You can try again or contact us for assistance." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice to-cloud py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              <XCircle className="w-24 h-24 text-orange-500 mx-auto mb-4" />
            </motion.div>

            <h1 className="text-4xl font-bold text-ocean mb-4">
              Payment Cancelled
            </h1>

            <p className="text-lg text-charcoal/80 mb-8">
              No worries! Your payment was cancelled and no charges were made to your account.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-ocean mb-4">
                💭 Changed Your Mind?
              </h3>
              <p className="text-charcoal/70 mb-6">
                That's totally fine! You can always come back and purchase when you're ready.
                Your assessment results will still be here waiting for you.
              </p>

              <div className="space-y-4">
                <p className="text-sm text-charcoal/60">
                  <strong>Remember:</strong> You still have access to:
                </p>
                <ul className="text-charcoal/70 text-sm space-y-2 text-left max-w-md mx-auto">
                  <li>• Your free assessment results</li>
                  <li>• Basic biohacking recommendations</li>
                  <li>• Free resources and guides</li>
                  <li>• Newsletter with weekly tips</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Go Back */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/biohacking-foundation-assessment"
                  className="group bg-gradient-to-r from-ocean to-sky text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:scale-105 transition-transform">
                    🏠 Back to Assessment
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    Review your results and try again
                  </p>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="bg-white border-2 border-ocean p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block group"
                >
                  <h3 className="text-lg font-semibold text-ocean mb-2 group-hover:scale-105 transition-transform">
                    💬 Need Help?
                  </h3>
                  <p className="text-charcoal/70 text-sm mb-3">
                    Questions about the masterclass or payment?
                  </p>
                  <MessageCircle className="w-5 h-5 text-ocean group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud rounded-xl p-6">
              <h3 className="text-lg font-semibold text-ocean mb-3">✨ Special Offer</h3>
              <p className="text-charcoal/70 text-sm mb-4">
                Ready to invest in your health? The masterclass includes:
              </p>
              <ul className="text-charcoal/70 text-sm space-y-1 text-left max-w-md mx-auto">
                <li>• 30+ minutes of premium content</li>
                <li>• Downloadable action plans</li>
                <li>• Bonus biohacking checklists</li>
                <li>• Lifetime access</li>
                <li>• Exclusive bonus materials</li>
              </ul>
            </div>

            <p className="text-sm text-charcoal/60 mt-8">
              Questions? Contact us at{' '}
              <a href="mailto:hello@biohackme.com.au" className="text-ocean hover:text-sky">
                hello@biohackme.com.au
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}
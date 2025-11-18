import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Download } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getFunctions, httpsCallable } from 'firebase/functions'

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus(sessionId)
    }
  }, [sessionId])

  const checkPaymentStatus = async (sessionId: string) => {
    try {
      const functions = getFunctions()
      const getPaymentStatus = httpsCallable(functions, 'getPaymentStatus')
      const result = await getPaymentStatus({ sessionId })
      setPaymentStatus(result.data)
    } catch (error) {
      console.error('Error checking payment status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Payment Successful | BiohackMe</title>
        <meta name="description" content="Thank you for your purchase! Your payment has been processed successfully." />
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
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
            </motion.div>

            <h1 className="text-4xl font-bold text-ocean mb-4">
              Payment Successful!
            </h1>

            <p className="text-lg text-charcoal/80 mb-8">
              Thank you for purchasing the Biohacking Basics Masterclass! Your payment has been processed and you now have lifetime access to your content.
            </p>

            {loading ? (
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <div className="animate-pulse">
                  <div className="h-4 bg-charcoal/10 rounded mb-3"></div>
                  <div className="h-4 bg-charcoal/10 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            ) : paymentStatus ? (
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-ocean mb-4">
                  {paymentStatus.productType === 'masterclass' ? 'Masterclass Access Granted' : 'Coaching Access Granted'}
                </h3>
                <p className="text-charcoal/70">
                  {paymentStatus.productType === 'masterclass'
                    ? 'You can now access the full Biohacking Basics Masterclass and all bonus materials.'
                    : 'Welcome to the coaching program! You will receive an email shortly with next steps.'
                  }
                </p>
              </div>
            ) : null}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Access Your Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/masterclass-access"
                  className="group bg-gradient-to-r from-ocean to-sky text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:scale-105 transition-transform">
                    Watch Your Masterclass
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    Access your exclusive biohacking content now
                  </p>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Download Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-white border-2 border-ocean p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-ocean mb-2">
                    Download Resources
                  </h3>
                  <p className="text-charcoal/70 text-sm mb-3">
                    Get your bonus materials and worksheets
                  </p>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/resources/BIOHACKING-BASICS-MASTERCLASS.pdf';
                      link.download = 'Biohacking-Basics-Masterclass.pdf';
                      link.click();
                    }}
                    className="flex items-center gap-2 text-ocean hover:text-sky transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Now</span>
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-ice to-cloud rounded-xl p-6">
              <h3 className="text-lg font-semibold text-ocean mb-3">What's Next?</h3>
              <ul className="text-charcoal/70 text-sm space-y-2 text-left max-w-md mx-auto">
                <li>• Check your email for receipt and access details</li>
                <li>• Join our exclusive customer community</li>
                <li>• Schedule your complimentary strategy session</li>
                <li>• Download the companion workbook</li>
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
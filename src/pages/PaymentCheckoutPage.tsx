import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CreditCard, Lock, ArrowLeft } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { stripePromise } from '../config/stripe'

export default function PaymentCheckoutPage() {
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setProduct(searchParams.get('product') || 'Biohacking Basics Masterclass')
    setPrice(searchParams.get('price') || '47')
    setCurrency(searchParams.get('currency') || 'AUD')
  }, [searchParams])

  const handlePayment = async () => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }

      // Use the masterclass price ID from environment variables
      const priceId = import.meta.env.VITE_STRIPE_MASTERCLASS_PRICE_ID

      if (!priceId) {
        throw new Error('Stripe payment not configured. Please contact hello@biohackme.com.au')
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment-checkout?product=${encodeURIComponent(product)}&price=${price}&currency=${currency}`,
      })

      if (error) {
        throw error
      }

    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed. Please try again or contact hello@biohackme.com.au')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice via-cloud to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link to="/masterclass" className="flex items-center text-ocean hover:text-sky transition-colors text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden xs:inline">Back to Masterclass</span>
              <span className="xs:hidden">Back</span>
            </Link>
            <div className="text-lg sm:text-2xl font-montserrat font-light text-ocean">
              BiohackMe
            </div>
            <div className="flex items-center text-ocean text-xs sm:text-sm">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Secure Checkout</span>
              <span className="sm:hidden">Secure</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-3 sm:mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-base sm:text-lg text-charcoal/80">
              You're one step away from accessing your masterclass
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-sky/20"
            >
              <h2 className="text-xl sm:text-2xl font-montserrat font-light text-ocean mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="border-b border-ocean/10 pb-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-ocean mb-2">{product}</h3>
                    <p className="text-sm text-charcoal/70 mb-4">
                      Complete masterclass with lifetime access
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-ocean">
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                        30+ minutes of expert content
                      </div>
                      <div className="flex items-center text-ocean">
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                        Downloadable resources & worksheets
                      </div>
                      <div className="flex items-center text-ocean">
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                        Lifetime access to all materials
                      </div>
                      <div className="flex items-center text-ocean">
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                        Certificate of completion
                      </div>
                    </div>
                  </div>

                  <div className="bg-ice/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm sm:text-base text-charcoal/70">
                      <span>Subtotal:</span>
                      <span>${(parseFloat(price) / 1.1).toFixed(2)} {currency}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-charcoal/70">
                      <span>GST (10%):</span>
                      <span>${(parseFloat(price) - parseFloat(price) / 1.1).toFixed(2)} {currency}</span>
                    </div>
                    <hr className="border-ocean/20" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-bold text-ocean">Total:</span>
                      <span className="text-xl sm:text-2xl font-bold text-ocean">${price} {currency}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-charcoal/60 text-center">
                      One-time payment
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs sm:text-sm text-charcoal/60">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  <span>Secure payment powered by Stripe</span>
                </div>
                <p>💳 All major cards accepted • 🔒 SSL encrypted • 📱 Mobile friendly</p>
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-sky/20"
            >
              <h2 className="text-xl sm:text-2xl font-montserrat font-light text-ocean mb-4 sm:mb-6">
                Complete Payment
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Primary Payment Button */}
                <div className="border-2 border-ocean rounded-xl p-6 bg-gradient-to-r from-ocean/5 to-sky/5">
                  <div className="text-center">
                    <h3 className="font-medium text-ocean mb-2 flex items-center justify-center flex-wrap gap-2">
                      <CreditCard className="w-5 h-5" />
                      Secure Card Payment
                      <span className="text-xs bg-ocean text-white px-2 py-1 rounded-full">INSTANT ACCESS</span>
                    </h3>
                    <p className="text-sm text-charcoal/70 mb-4">
                      Pay securely with any credit or debit card
                    </p>
                    <div className="text-xs text-charcoal/60 mb-6">
                      💳 All major cards accepted • 🔒 SSL encrypted • ⚡ Instant access
                    </div>

                    <motion.button
                      onClick={handlePayment}
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : undefined}
                      whileTap={!loading ? { scale: 0.98 } : undefined}
                      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${
                        loading
                          ? 'bg-charcoal/20 text-charcoal/60 cursor-not-allowed'
                          : 'bg-gradient-to-r from-ocean to-sky text-white hover:shadow-xl'
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Pay ${price} {currency} Now
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-charcoal/50">
                      <Lock className="w-3 h-3" />
                      <span>Powered by Stripe - Industry-leading security</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-ice/50 rounded-lg">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs text-charcoal/70 font-medium">SSL Encrypted</div>
                  </div>
                  <div className="p-3 bg-ice/50 rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs text-charcoal/70 font-medium">Instant Access</div>
                  </div>
                  <div className="p-3 bg-ice/50 rounded-lg">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-xs text-charcoal/70 font-medium">Secure Payment</div>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">✨</div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">30-Day Money-Back Guarantee</h4>
                      <p className="text-sm text-green-700">
                        Not satisfied? Get a full refund within 30 days, no questions asked.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-ice/50 rounded-xl border border-ocean/10">
                  <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                    <Lock className="w-4 h-4 mr-2" />
                    Your Security & Privacy
                  </h4>
                  <p className="text-xs text-charcoal/70">
                    All payments are processed securely through Stripe. We never store your payment information.
                    You'll receive immediate access to your masterclass after payment confirmation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Back to Masterclass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/masterclass"
              className="inline-flex items-center text-ocean hover:text-sky transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Masterclass Details
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
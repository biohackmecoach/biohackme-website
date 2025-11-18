import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PaymentButton from '../components/PaymentButton'

export default function PaymentTestPage() {
  return (
    <>
      <Helmet>
        <title>Payment Test | BiohackMe</title>
        <meta name="description" content="Test Stripe payment integration for masterclass purchases" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice to-cloud py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-ocean mb-8 text-center">
              Payment Test
            </h1>

            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-ocean mb-4">
                Test Stripe Integration
              </h2>
              <p className="text-charcoal/80 mb-6">
                This is a test page to verify our Stripe payment integration is working correctly.
              </p>

              <div className="bg-gradient-to-r from-ice to-cloud rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-ocean mb-2">Configuration Status:</h3>
                <ul className="text-sm text-charcoal/80 space-y-1">
                  <li>✅ Stripe Publishable Key: Configured</li>
                  <li>✅ Stripe Secret Key: Deployed to Functions</li>
                  <li>✅ Product Price ID: {import.meta.env.VITE_STRIPE_MASTERCLASS_PRICE_ID}</li>
                  <li>✅ Webhook Secret: Configured</li>
                </ul>
              </div>

              <PaymentButton
                priceId={import.meta.env.VITE_STRIPE_MASTERCLASS_PRICE_ID}
                productType="masterclass"
                amount={4700} // $47.00 in cents
                title="Biohacking Basics Masterclass"
                description="Complete biohacking foundation course"
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-ocean mb-3">Test Instructions:</h3>
              <div className="text-sm text-charcoal/80 space-y-2">
                <p><strong>Test Card:</strong> 4242 4242 4242 4242</p>
                <p><strong>Expiry:</strong> Any future date</p>
                <p><strong>CVC:</strong> Any 3-digit number</p>
                <p><strong>Expected Flow:</strong></p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Click "Get Instant Access"</li>
                  <li>Redirect to Stripe Checkout</li>
                  <li>Complete test payment</li>
                  <li>Redirect to success page</li>
                  <li>User access granted via webhook</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
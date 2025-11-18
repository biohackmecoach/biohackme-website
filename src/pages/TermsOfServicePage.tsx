import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FileText } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | BiohackMe</title>
        <meta name="description" content="BioHackMe Terms of Service - Terms and conditions for using our website, assessments, and educational services." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice to-cloud">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-ocean text-center mb-4">Terms of Service</h1>
              <p className="text-charcoal/60 text-center">Last updated: October 2025</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
              <section>
                <p className="text-lg text-charcoal leading-relaxed">
                  Welcome to BioHackMe. By accessing or using our website, assessments, masterclasses, or services, you agree to be bound by these Terms of Service. Please read them carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">1. Acceptance of Terms</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  By using BioHackMe's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
                <p className="text-charcoal leading-relaxed">
                  If you do not agree to these terms, please do not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">2. Services Provided</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  BioHackMe provides:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li>Educational content about biohacking, health optimization, and wellness</li>
                  <li>Online assessments and personalized recommendations</li>
                  <li>Masterclasses, courses, and digital products</li>
                  <li>One-on-one coaching services (subject to separate agreements)</li>
                  <li>Resources, guides, and tools for health optimization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">3. Medical Disclaimer</h2>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                  <p className="text-charcoal font-semibold mb-3">IMPORTANT MEDICAL DISCLAIMER</p>
                  <p className="text-charcoal leading-relaxed mb-3">
                    The information provided by BioHackMe is for <strong>educational and informational purposes only</strong> and is not intended as medical advice, diagnosis, or treatment.
                  </p>
                  <p className="text-charcoal leading-relaxed mb-3">
                    <strong>You should not rely on this information as a substitute for professional medical advice, diagnosis, or treatment.</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">4. User Responsibilities</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the services for lawful purposes only</li>
                  <li>Not share your account access with others</li>
                  <li>Not attempt to interfere with or disrupt our services</li>
                  <li>Respect intellectual property rights</li>
                  <li>Consult with healthcare professionals before implementing any health recommendations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">5. Intellectual Property</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  All content on BioHackMe, including but not limited to text, graphics, logos, images, videos, audio clips, digital downloads, and software, is the property of BioHackMe or its content suppliers and is protected by Australian and international copyright laws.
                </p>
                <p className="text-charcoal leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from any content without explicit written permission from BioHackMe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">6. Payments and Refunds</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  <strong>Payments:</strong> All payments for products and services are processed securely through our payment providers. Prices are listed in Australian Dollars (AUD) unless otherwise stated.
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  <strong>Refunds:</strong> Due to the digital nature of our products, all sales are final unless otherwise stated in the specific product terms or required by law. If you believe you're entitled to a refund, please contact us at hello@biohackme.com.au within 14 days of purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">7. Limitation of Liability</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  To the fullest extent permitted by law, BioHackMe and its directors, employees, and affiliates shall not be liable for any:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li>Health outcomes, injuries, or adverse effects resulting from implementing recommendations</li>
                  <li>Indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Errors or omissions in content</li>
                  <li>Interruption or unavailability of services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">8. Privacy and Data Protection</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  Your use of our services is also governed by our{' '}
                  <a href="/privacy-policy" className="text-ocean underline hover:text-sky font-medium">
                    Privacy Policy
                  </a>
                  , which explains how we collect, use, and protect your personal information in accordance with the <em>Privacy Act 1988 (Cth)</em>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">9. Third-Party Links</h2>
                <p className="text-charcoal leading-relaxed">
                  Our website may contain links to third-party websites or services. BioHackMe is not responsible for the content, privacy practices, or terms of service of any third-party sites. We recommend reviewing their terms before using their services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">10. Termination</h2>
                <p className="text-charcoal leading-relaxed">
                  We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">11. Changes to Terms</h2>
                <p className="text-charcoal leading-relaxed">
                  We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms on this page with an updated "Last updated" date. Your continued use of the services after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">12. Governing Law</h2>
                <p className="text-charcoal leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">13. Contact Information</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-ice/50 rounded-xl p-6">
                  <p className="text-charcoal font-semibold mb-2">BioHackMe</p>
                  <p className="text-charcoal">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:hello@biohackme.com.au" className="text-ocean underline hover:text-sky">
                      hello@biohackme.com.au
                    </a>
                  </p>
                  <p className="text-charcoal">
                    <strong>Website:</strong>{' '}
                    <a href="https://www.biohackme.com.au" className="text-ocean underline hover:text-sky">
                      www.biohackme.com.au
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <div className="bg-ice/50 rounded-xl p-6 border-2 border-ocean/20">
                  <p className="text-sm text-charcoal/80 leading-relaxed">
                    By using BioHackMe's services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}

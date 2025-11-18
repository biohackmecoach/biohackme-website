import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | BiohackMe</title>
        <meta name="description" content="BioHackMe Privacy Policy - How we collect, use, and protect your personal information in line with Australian Privacy Principles." />
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
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-ocean text-center mb-4">Privacy Policy</h1>
              <p className="text-charcoal/60 text-center">Last updated: October 2025</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
              <section>
                <p className="text-lg text-charcoal leading-relaxed">
                  At BioHackMe, your privacy matters. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website, masterclasses, assessments, or other educational services.
                </p>
                <p className="text-lg text-charcoal leading-relaxed mt-4">
                  We're committed to safeguarding your data in line with the <strong>Australian Privacy Principles (APPs)</strong> set out in the <em>Privacy Act 1988 (Cth)</em>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">1. What Information We Collect</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  We may collect the following types of information when you use our site or complete an assessment:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li><strong>Personal information</strong> such as your name, email address, and contact details.</li>
                  <li><strong>Health-related information</strong> that you choose to provide through our Biohacking Foundation Assessment or other wellbeing tools (e.g. sleep, energy, or lifestyle data).</li>
                  <li><strong>Technical information</strong> such as browser type, device details, and site usage analytics collected through cookies or similar tools.</li>
                </ul>
                <p className="text-charcoal leading-relaxed mt-4">
                  You can choose not to provide certain information, but it may limit your ability to access certain features or personalised results.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">2. How We Use Your Information</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li>Generate your personalised results and recommendations from the Biohacking Foundation Assessment.</li>
                  <li>Deliver masterclasses, resources, and wellbeing tools you've signed up for.</li>
                  <li>Communicate with you about updates, events, or related offers (only if you've opted in).</li>
                  <li>Improve our content, website experience, and educational services.</li>
                </ul>
                <p className="text-charcoal leading-relaxed mt-4">
                  All data is used for <strong>educational and informational purposes only</strong> and does not constitute medical advice, diagnosis, or treatment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">3. Consent</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  Before submitting any assessment or form, you'll be asked to confirm that you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal">
                  <li>Understand your data will be used to generate personalised educational results; and</li>
                  <li>Have read and agree to this Privacy Policy.</li>
                </ul>
                <p className="text-charcoal leading-relaxed mt-4">
                  You can withdraw consent at any time by contacting us at{' '}
                  <a href="mailto:hello@biohackme.com.au" className="text-ocean underline hover:text-sky">
                    hello@biohackme.com.au
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">4. Data Security</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  We take reasonable steps to protect your personal information from misuse, loss, unauthorised access, modification, or disclosure.
                </p>
                <p className="text-charcoal leading-relaxed">
                  All data is stored securely using password-protected systems and reputable third-party services that comply with Australian and international privacy standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">5. Data Retention and Access</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  We retain your data only for as long as necessary to fulfil the purpose it was collected for.
                </p>
                <p className="text-charcoal leading-relaxed">
                  You may request a copy of your data or ask us to delete it at any time by emailing{' '}
                  <a href="mailto:hello@biohackme.com.au" className="text-ocean underline hover:text-sky">
                    hello@biohackme.com.au
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">6. Third-Party Services</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  Our website may contain links to third-party platforms (for example, video hosting or assessment tools).
                </p>
                <p className="text-charcoal leading-relaxed">
                  We do not control or take responsibility for the privacy practices of these external websites. We recommend reviewing their policies before submitting personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">7. Cookies and Analytics</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  BioHackMe uses cookies and analytics tools to understand how visitors interact with our site. This helps us improve the experience and content we provide.
                </p>
                <p className="text-charcoal leading-relaxed">
                  You can disable cookies through your browser settings if you prefer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">8. Marketing Communications</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  If you choose to subscribe to our updates, you consent to receiving emails from BioHackMe.
                </p>
                <p className="text-charcoal leading-relaxed">
                  You can unsubscribe at any time using the link in the email or by contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">9. International Users and Global Privacy Compliance</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  BioHackMe is based in Australia and all personal data is securely stored on Australian servers.
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  However, if you are accessing this website or completing an assessment from outside Australia, you acknowledge that your information will be collected and processed in Australia.
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  We handle all personal data in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  If you are located in the European Union (EU), United Kingdom (UK), or other regions with specific privacy rights (such as the United States), we also comply with applicable local data protection regulations, including GDPR and CCPA principles.
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  This means you are entitled to the same rights, including the right to:
                </p>
                <ul className="list-disc list-inside text-charcoal leading-relaxed mb-4 ml-4">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Withdraw consent to processing</li>
                  <li>Request a copy of your data (data portability)</li>
                  <li>Lodge a complaint with your local data authority</li>
                </ul>
                <p className="text-charcoal leading-relaxed">
                  To exercise these rights, please contact{' '}
                  <a href="mailto:hello@biohackme.com.au" className="text-ocean underline hover:text-sky">
                    hello@biohackme.com.au
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">10. Updates to This Policy</h2>
                <p className="text-charcoal leading-relaxed">
                  We may occasionally update this Privacy Policy to reflect changes in legal requirements or our services. Any updates will be published on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean mb-4">11. Contact Us</h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  If you have questions, feedback, or would like to access or correct your personal information, please contact:
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
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, ArrowRight, Info } from 'lucide-react'

export default function DNAPackagePage() {
  return (
    <>
      <Helmet>
        <title>DNA Methylation Testing Australia $699 | NutriPATH Genetic Test | BioHackMe</title>
        <meta name="description" content="Unlock your genetic blueprint with DNA methylation testing. Understand MTHFR, COMT & detox genes. NutriPATH lab analysis + personalised health plan. Results consultation included. Test once, use for life. $699 Australia-wide." />
        <meta name="keywords" content="DNA methylation test Australia, MTHFR testing, COMT gene test, genetic testing Australia, NutriPATH methylation test, detoxification genes, nutrient metabolism genes, genetic health testing, personalised nutrition, epigenetics Australia, functional medicine testing, methylation SNPs, genetic wellness test" />
        <meta property="og:title" content="DNA Methylation Testing Package $699 | Genetic Health Testing Australia" />
        <meta property="og:description" content="Discover how your genes affect nutrient metabolism, detoxification and cellular health. NutriPATH lab test + expert consultation with Camilla." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://www.biohackme.com.au/dna-package" />
        <meta property="product:price:amount" content="699" />
        <meta property="product:price:currency" content="AUD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNA Methylation Testing Australia $699" />
        <meta name="twitter:description" content="Unlock your genetic blueprint. MTHFR, COMT & detox genes. NutriPATH lab + personalised health plan." />
        <link rel="canonical" href="https://www.biohackme.com.au/dna-package" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "DNA Methylation Testing Package",
            "description": "Comprehensive DNA methylation genetic testing with NutriPATH laboratory analysis and personalised health consultation",
            "brand": {
              "@type": "Brand",
              "name": "BioHackMe"
            },
            "offers": {
              "@type": "Offer",
              "price": "699",
              "priceCurrency": "AUD",
              "availability": "https://schema.org/InStock",
              "url": "https://www.biohackme.com.au/dna-package"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "47"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is DNA methylation testing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNA methylation testing analyses specific genes that affect how your body processes nutrients, detoxifies and maintains cellular health. It examines key genes like MTHFR, COMT, and others involved in methylation pathways to provide insights into your unique genetic blueprint."
                }
              },
              {
                "@type": "Question",
                "name": "What's included in the $699 DNA testing package?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The $699 package includes: NutriPATH Methylation Genetic Test with laboratory analysis, comprehensive analysis of key methylation genes (MTHFR, COMT, detoxification genes), a results consultation with Camilla Thompson, and a personalised health and nutrition plan based on your genetic profile."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to get my DNA test results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After you mail back your cheek swab sample, NutriPATH laboratory processes your sample in 3-4 weeks. You'll receive your kit in 3-5 business days after ordering. Once results are ready, you'll schedule a consultation with Camilla to review your comprehensive methylation genetic profile."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to fast before taking the DNA test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No fasting required. The DNA methylation test is a simple cheek swab that can be done at any time of day. It takes just 2 minutes to complete and comes with a prepaid envelope for mailing back to the laboratory."
                }
              },
              {
                "@type": "Question",
                "name": "Is DNA methylation testing a diagnostic test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this is not a diagnostic test. DNA methylation testing identifies genetic variants to help personalise nutrition and lifestyle strategies for optimal health. It does not diagnose, treat, cure or prevent any disease. The information is for educational purposes only."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need a naturopath referral for DNA testing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A naturopath referral may be needed for further support and supplementation recommendations based on your results. Camilla will provide guidance during your results consultation and can refer you to trusted practitioners when appropriate."
                }
              },
              {
                "@type": "Question",
                "name": "What if I'm already taking supplements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Perfect! During your consultation, we'll review your current supplement regimen and provide recommendations based on your genetic profile. Many people discover they're taking the wrong forms of nutrients for their genetics, which is why DNA testing can help optimise your supplement strategy."
                }
              },
              {
                "@type": "Question",
                "name": "Who should get DNA methylation testing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNA methylation testing is ideal if you: take supplements but aren't sure if they're the right forms for your body, experience chronic fatigue or brain fog, struggle with chemical sensitivities or difficulty detoxifying, have unexplained hormone imbalances or mood issues, want to understand your nutrient requirements at a genetic level, or are committed to personalised, science-backed health optimisation."
                }
              },
              {
                "@type": "Question",
                "name": "Will my DNA test results change over time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, your genes don't change. This is a one-time investment. Test once and use these genetic insights for life to make informed health decisions. Your DNA methylation profile remains constant, making this valuable information you can reference throughout your lifetime."
                }
              },
              {
                "@type": "Question",
                "name": "What genes are tested in the methylation panel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The NutriPATH Methylation Genetic Test analyses key genes including MTHFR (affects folate metabolism), COMT (affects neurotransmitter breakdown and oestrogen metabolism), detoxification genes, and other genes involved in nutrient metabolism, energy production, and cellular health. Your comprehensive report provides analysis of all relevant methylation pathway genes."
                }
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.biohackme.com.au"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "DNA Testing Package",
                "item": "https://www.biohackme.com.au/dna-package"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ocean via-sky to-ice min-h-[60vh] flex items-center pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Your Genetic Blueprint
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-4">
              Discover how your genes affect nutrient metabolism, detoxification and cellular health
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Are you taking supplements but not seeing results? Struggling with unexplained fatigue or chemical sensitivities? Your genes hold the answers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="inline-block bg-white rounded-full px-8 py-4 shadow-xl">
                <p className="text-4xl font-bold text-ocean">$699</p>
              </div>
              <a
                href="https://buy.stripe.com/4gMaEZ589eWKdW3fHo5Ne07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-ocean px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 shadow-xl"
              >
                BUY NOW
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean mb-8">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {[
                  'NutriPATH Methylation Genetic Test (laboratory analysis)',
                  'Comprehensive analysis of key methylation genes',
                  'Results consultation with Camilla',
                  'Personalised health and nutrition plan'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start bg-ice/30 rounded-xl p-6">
                    <CheckCircle className="w-6 h-6 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <span className="text-charcoal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Test */}
            <div className="bg-gradient-to-br from-ice/50 to-cloud/50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-ocean mb-8 text-center">Why Test Your Methylation Genes?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Stop Guessing With Supplements',
                    description: 'Discover which nutrient forms your body can actually use and which ones are wasting your money.'
                  },
                  {
                    title: 'Understand Your Detoxification Capacity',
                    description: 'Learn how well your body eliminates toxins and what support it needs to function optimally.'
                  },
                  {
                    title: 'Optimise Energy & Mental Clarity',
                    description: 'Identify why you might struggle with fatigue, brain fog or mood issues at a genetic level.'
                  },
                  {
                    title: 'Get Truly Personalised Nutrition',
                    description: 'Your genes don\'t change. Test once and use these insights for life to make informed health decisions.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-bold text-lg text-ocean mb-2">{item.title}</h3>
                    <p className="text-charcoal/80 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Is This For */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-ocean text-center">Who Is This For?</h2>
              <p className="text-center text-lg text-charcoal/70 mb-6">This test is perfect if you:</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  'Take supplements but aren\'t sure if they\'re the right forms for your body',
                  'Experience chronic fatigue, brain fog or low energy',
                  'Struggle with chemical sensitivities or difficulty detoxifying',
                  'Have unexplained hormone imbalances or mood issues',
                  'Want to understand your nutrient requirements at a genetic level',
                  'Are committed to personalised, science-backed health optimisation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                    <span className="text-charcoal/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-ice rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-ocean text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: '1', title: 'Order Your Test', desc: 'Receive your kit in 3-5 business days' },
                  { step: '2', title: 'Simple Cheek Swab', desc: 'Takes 2 minutes, mail back in prepaid envelope' },
                  { step: '3', title: 'Laboratory Analysis', desc: 'NutriPATH processes your sample (3-4 weeks)' },
                  { step: '4', title: 'Get Your Results', desc: 'Comprehensive methylation genetic profile' },
                  { step: '5', title: 'Results Consultation', desc: 'Review your results with Camilla' },
                  { step: '6', title: 'Implement & Thrive', desc: 'Follow your customised health protocol' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl">{item.step}</span>
                    </div>
                    <h3 className="font-bold text-lg text-charcoal mb-2">{item.title}</h3>
                    <p className="text-charcoal/70 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What Is Methylation */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-ocean text-center">What Is Methylation & Why Does It Matter?</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed max-w-3xl mx-auto text-center">
                Methylation is a biochemical process that happens billions of times per second in every cell of your body. It's essential for:
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  'Detoxification - Eliminating toxins, chemicals and waste products',
                  'Energy Production - Supporting mitochondrial function',
                  'DNA Repair - Maintaining healthy genes and cellular function',
                  'Neurotransmitter Production - Making serotonin, dopamine and mood regulators',
                  'Hormone Metabolism - Processing and clearing hormones properly',
                  'Immune Function - Supporting your body\'s defence systems'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <span className="text-charcoal/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Camilla's Story */}
            <div className="bg-gradient-to-br from-ocean/5 to-sky/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-ocean mb-6 text-center">Camilla's Personal Story</h2>
              <blockquote className="text-lg text-charcoal/80 italic leading-relaxed mb-6">
                "After years of unexplained health issues and inflammation following mould exposure, genetic testing finally gave me answers. I discovered I carry the HLA-DR mould gene, plus COMT and PEMT variants affecting my oestrogen metabolism and choline production.
                <br /><br />
                I also found out I have an <strong className="text-ocean not-italic">MTHFR variant</strong>, which means my body struggles to detoxify properly. This was a game-changer — it explained why I was so sensitive to environmental toxins and why standard supplements weren't working for me. I needed specific methylated forms of B vitamins that my body could actually use.
                <br /><br />
                Understanding my genetic variants allowed me to create a targeted protocol that actually worked for my body. Today, at 48, my biological age is 38 and I'm in the top percentile for low inflammation.
                <br /><br />
                If you've tried everything and nothing's working, your genes might hold the missing piece."
              </blockquote>
              <p className="text-center text-ocean font-semibold">— Camilla, Founder of BioHackMe</p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-ocean to-sky rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Decode Your Methylation Genes?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Stop struggling with generic health advice that doesn't work for your unique biology. Get genetic clarity and a personalised plan designed specifically for you.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="bg-white rounded-2xl px-8 py-6 shadow-xl">
                  <p className="text-4xl font-bold text-ocean mb-1">$699</p>
                  <p className="text-sm text-charcoal/60">Complete package • One-time investment</p>
                </div>
                <a
                  href="https://buy.stripe.com/4gMaEZ589eWKdW3fHo5Ne07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-ocean px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
                >
                  BUY NOW
                  <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                Test by <a href="https://nutripath.com.au/product/methylation-genetic-test-8009/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">NutriPATH</a> • NATA accredited Australian laboratory
              </p>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-ocean text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: 'What is methylation genetic testing?',
                    a: 'It analyses specific genes that affect how your body processes nutrients, detoxifies and maintains cellular health.'
                  },
                  {
                    q: 'Do I need to fast?',
                    a: 'No. It\'s a simple cheek swab that can be done any time of day.'
                  },
                  {
                    q: 'Is this a diagnostic test?',
                    a: 'No. This test identifies genetic variants to help personalise nutrition and lifestyle strategies for optimal health.'
                  },
                  {
                    q: 'What if I\'m already taking supplements?',
                    a: 'Perfect! We\'ll review your current approach and provide recommendations based on your genetic profile.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-ice/20 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-ocean mb-2">{item.q}</h3>
                    <p className="text-charcoal/80 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-charcoal/80">
                  <p className="font-bold mb-2">Important Disclaimer</p>
                  <p className="mb-2">
                    This genetic test identifies variants in genes related to methylation pathways. It does not diagnose, treat, cure or prevent any disease. The information is for educational purposes only.
                  </p>
                  <p className="mb-2">
                    <strong>Naturopath Referral:</strong> A referral to a qualified naturopath may be needed for further support and supplementation recommendations based on your results. Camilla will provide guidance during your results consultation and can refer you to trusted practitioners when appropriate.
                  </p>
                  <p>
                    Always consult your GP or qualified healthcare practitioner before making changes to your diet, supplements or health regimen. Tests processed by NutriPATH, a NATA accredited Australian laboratory.
                  </p>
                </div>
              </div>
            </div>

            {/* Want Ongoing Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-ocean/10">
              <h2 className="text-2xl font-bold text-ocean mb-4 text-center">Want Ongoing Support?</h2>
              <p className="text-charcoal/70 mb-6 text-center">
                Once you have your results and personalised plan, you may want additional support to implement and refine your strategy.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-ocean mb-2">Additional Coaching Sessions</h3>
                  <p className="text-sm text-charcoal/70 mb-4">
                    Continue working with Camilla to optimise your protocol and track your progress.
                  </p>
                  <a
                    href="/coaching-sessions"
                    className="inline-flex items-center text-ocean hover:text-sky font-medium"
                  >
                    Learn more about coaching sessions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-ocean mb-2">Optimise Your Life Program</h3>
                  <p className="text-sm text-charcoal/70 mb-4">
                    Ready for comprehensive transformation? Join Camilla's signature 3-month program.
                  </p>
                  <a
                    href="/optimise-your-life"
                    className="inline-flex items-center text-ocean hover:text-sky font-medium"
                  >
                    Explore the program
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

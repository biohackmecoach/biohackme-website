import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, RotateCcw, Download } from 'lucide-react'
import PDFDownload from './PDFDownload'
import CustomVideoPlayer from './CustomVideoPlayer'

interface AssessmentData {
  [key: string]: number
}

const assessmentQuestions = [
  // Nutrition (7 questions)
  { pillar: 'Nutrition', question: 'I eat a balanced diet with plenty of whole foods (vegetables, fruits, lean proteins).' },
  { pillar: 'Nutrition', question: 'I avoid processed foods and excessive sugar most of the time.' },
  { pillar: 'Nutrition', question: 'I stay adequately hydrated throughout the day.' },
  { pillar: 'Nutrition', question: 'I pay attention to portion sizes and eat mindfully.' },
  { pillar: 'Nutrition', question: 'I take supplements when needed (based on deficiencies or health goals).' },
  { pillar: 'Nutrition', question: 'I limit alcohol consumption to moderate levels.' },
  { pillar: 'Nutrition', question: 'I plan my meals ahead of time to maintain healthy eating habits.' },

  // Sleep (4 questions)
  { pillar: 'Sleep', question: 'I get 7-9 hours of quality sleep most nights.' },
  { pillar: 'Sleep', question: 'I have a consistent sleep schedule (same bedtime and wake time).' },
  { pillar: 'Sleep', question: 'I feel rested and energized when I wake up.' },
  { pillar: 'Sleep', question: 'I have a relaxing bedtime routine that helps me wind down.' },

  // Gut Health (3 questions)
  { pillar: 'Gut Health', question: 'I rarely experience digestive issues like bloating, gas, or irregular bowel movements.' },
  { pillar: 'Gut Health', question: 'I include probiotic-rich foods or supplements in my diet.' },
  { pillar: 'Gut Health', question: 'I manage stress effectively, as I know it impacts my gut health.' },

  // Mindset (4 questions)
  { pillar: 'Mindset', question: 'I practice stress management techniques (meditation, deep breathing, etc.).' },
  { pillar: 'Mindset', question: 'I maintain a positive outlook and can bounce back from setbacks.' },
  { pillar: 'Mindset', question: 'I set clear goals and work consistently toward achieving them.' },
  { pillar: 'Mindset', question: 'I regularly engage in activities that bring me joy and fulfillment.' },

  // Movement (4 questions)
  { pillar: 'Movement', question: 'I engage in regular physical activity (at least 150 minutes of moderate exercise per week).' },
  { pillar: 'Movement', question: 'I include both cardio and strength training in my routine.' },
  { pillar: 'Movement', question: 'I make an effort to move throughout the day, avoiding prolonged sitting.' },
  { pillar: 'Movement', question: 'I enjoy the physical activities I do and look forward to them.' },

  // Recovery (3 questions)
  { pillar: 'Recovery', question: 'I take rest days and allow my body time to recover between intense workouts.' },
  { pillar: 'Recovery', question: 'I use recovery techniques like stretching, massage, or sauna when possible.' },
  { pillar: 'Recovery', question: 'I listen to my body and adjust my activity level based on how I feel.' },

  // Hydration (3 questions)
  { pillar: 'Hydration', question: 'I drink at least 8 glasses of water per day.' },
  { pillar: 'Hydration', question: 'I monitor my urine colour to ensure I\'m adequately hydrated.' },
  { pillar: 'Hydration', question: 'I increase my water intake when I exercise or in hot weather.' }
]

const pillars = ['Nutrition', 'Sleep', 'Gut Health', 'Mindset', 'Movement', 'Recovery', 'Hydration']

const getScoreInterpretation = (score: number) => {
  if (score >= 68) return { level: 'Excellent', color: 'text-green-600', description: 'You\'re doing exceptionally well across all biohacking pillars! Keep up the great work.' }
  if (score >= 51) return { level: 'Good', color: 'text-blue-600', description: 'You have a solid foundation in most areas with room for some improvements.' }
  if (score >= 34) return { level: 'Fair', color: 'text-yellow-600', description: 'You\'re on the right track but there are several areas where you can make meaningful improvements.' }
  return { level: 'Needs Improvement', color: 'text-red-600', description: 'Focus on building better habits across multiple pillars for optimal health and performance.' }
}

const getPillarInterpretation = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 80) return { level: 'Strong', color: 'text-green-600' }
  if (percentage >= 60) return { level: 'Good', color: 'text-blue-600' }
  if (percentage >= 40) return { level: 'Fair', color: 'text-yellow-600' }
  return { level: 'Needs Focus', color: 'text-red-600' }
}

export default function SevenPillarsAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AssessmentData>({})
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({ email: '', firstName: '' })
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showConsentScreen, setShowConsentScreen] = useState(true)
  const [initialPrivacyConsent, setInitialPrivacyConsent] = useState(false)
  const [initialMarketingConsent, setInitialMarketingConsent] = useState(false)
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const handleConsentSubmit = () => {
    if (!initialPrivacyConsent) {
      alert('Please agree to the privacy policy to start the assessment')
      return
    }
    setShowConsentScreen(false)
  }

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowEmailForm(true)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.firstName) {
      alert('Please fill in all fields')
      return
    }

    if (!privacyConsent) {
      alert('Please agree to the privacy policy to receive your results')
      return
    }

    try {
      const { pillarScores, totalScore } = calculateResults()
      const lowestScores = getLowestScores()
      const lowestScoringPillar = lowestScores.length > 0 ? lowestScores[0][0] : ''
      const topRecommendations = lowestScores.slice(0, 3).map(([pillar]) => pillar).join(', ')

      // Call Firebase Function to complete assessment and add to Mailchimp
      try {
        const response = await fetch('https://us-central1-biohackme-app-379de.cloudfunctions.net/completeAssessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            firstName: formData.firstName.trim(),
            assessmentScore: totalScore,
            lowestScoringPillar,
            topRecommendations
          }),
        })

        const result = await response.json()

        if (response.ok && result.success) {
          console.log('Assessment completed and user added to Mailchimp:', result)
        } else {
          console.error('Failed to process assessment:', result.error || 'Unknown error')
          // Still proceed to show results even if Mailchimp fails
        }
      } catch (emailError) {
        console.error('Assessment API call failed:', emailError)
        // Still proceed to show results even if there's a network error
      }

      // Show results
      setShowResults(true)
      setShowEmailForm(false)

    } catch (error) {
      console.error('Error:', error)
      // Even if there's an error, show the results
      setShowResults(true)
      setShowEmailForm(false)
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setShowEmailForm(false)
    setFormData({ email: '', firstName: '' })
  }

  const calculateResults = () => {
    const pillarScores: { [key: string]: { score: number; maxScore: number } } = {}

    pillars.forEach(pillar => {
      pillarScores[pillar] = { score: 0, maxScore: 0 }
    })

    assessmentQuestions.forEach((q, index) => {
      const answer = answers[index] || 0
      pillarScores[q.pillar].score += answer
      pillarScores[q.pillar].maxScore += 3
    })

    const totalScore = Object.values(pillarScores).reduce((sum, pillar) => sum + pillar.score, 0)
    const maxTotalScore = Object.values(pillarScores).reduce((sum, pillar) => sum + pillar.maxScore, 0)

    return { pillarScores, totalScore, maxTotalScore }
  }

  const getLowestScores = () => {
    const { pillarScores } = calculateResults()
    return Object.entries(pillarScores)
      .map(([pillar, scores]) => [pillar, (scores.score / scores.maxScore) * 100])
      .sort((a, b) => (a[1] as number) - (b[1] as number))
  }

  if (showEmailForm) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-ocean mb-4">Get Your Personalized Results</h3>
          <p className="text-charcoal/80">Enter your details to receive your comprehensive assessment results and personalised recommendations.</p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent"
            />
          </div>

          {/* Privacy Consent Checkboxes */}
          <div className="space-y-3 text-sm text-charcoal/80">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                required
                className="mt-1 mr-3 w-5 h-5 flex-shrink-0 text-ocean focus:ring-ocean rounded cursor-pointer"
              />
              <span>
                I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                <a href="/privacy-policy" className="text-ocean underline hover:text-sky" target="_blank" rel="noopener noreferrer">
                  BioHackMe Privacy Policy
                </a>
                . I understand this information is for educational purposes only and does not constitute medical advice. *
              </span>
            </label>

            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 mr-3 w-5 h-5 flex-shrink-0 text-ocean focus:ring-ocean rounded cursor-pointer"
              />
              <span>
                I'd like to receive occasional updates, resources, and offers from BioHackMe.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-ocean to-sky text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all duration-300"
          >
            Get My Results
          </button>
        </form>
      </div>
    )
  }

  if (showResults) {
    const { pillarScores, totalScore, maxTotalScore } = calculateResults()
    const interpretation = getScoreInterpretation(totalScore)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-ocean mb-4">Your 7 Pillars Assessment Results</h3>
          <div className={`text-2xl font-bold ${interpretation.color} mb-2`}>
            {totalScore}/{maxTotalScore} - {interpretation.level}
          </div>
          <p className="text-charcoal/80 text-lg">{interpretation.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(pillarScores).map(([pillar, scores]) => {
            const pillarInterpretation = getPillarInterpretation(scores.score, scores.maxScore)
            const percentage = (scores.score / scores.maxScore) * 100

            return (
              <div key={pillar} className="bg-gradient-to-r from-ice to-cloud rounded-xl p-6">
                <h4 className="text-lg font-semibold text-ocean mb-2">{pillar}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-charcoal">{scores.score}/{scores.maxScore}</span>
                  <span className={`font-semibold ${pillarInterpretation.color}`}>
                    {pillarInterpretation.level}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-ocean to-sky h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-ice to-cloud rounded-xl p-6 mb-8">
          <h4 className="text-xl font-semibold text-ocean mb-4">What's Next?</h4>
          <div className="space-y-3 text-charcoal/80">
            <p>• Focus on your lowest-scoring pillars first for maximum impact</p>
            <p>• Get the complete Biohacking Basics Masterclass for detailed strategies</p>
            <p>• Consider one-on-one coaching for personalised guidance</p>
            <p>• Start implementing small changes in your weakest areas</p>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-ice border-2 border-ocean/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-ocean flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div className="text-sm text-charcoal">
              <p className="font-semibold mb-2 text-ocean">Important Medical Disclaimer</p>
              <p className="leading-relaxed">
                This assessment is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment.
                The recommendations provided are general wellness suggestions and should not replace professional medical advice.
                Always consult with a qualified healthcare professional before making any changes to your health routine, diet, exercise program,
                or if you have any medical conditions or concerns. If you are experiencing a medical emergency, please contact emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Masterclass Purchase Section */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-lg border-2 border-ocean/20">
          <div className="text-center">
            <h4 className="text-2xl font-semibold text-ocean mb-4">Ready to Transform Your Health?</h4>
            <p className="text-charcoal/80 mb-6">
              Get the complete Biohacking Basics Masterclass with detailed strategies, worksheets, and action plans for each pillar.
            </p>

            <div className="bg-gradient-to-r from-ice/50 to-cloud/50 rounded-xl p-6 mb-6">
              <h5 className="text-xl font-semibold text-ocean mb-3">What You'll Get:</h5>
              <div className="grid md:grid-cols-2 gap-3 text-left text-charcoal/80">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Complete 25-minute masterclass video</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>7 Pillars Foundation Guide</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Biohacking Wheel Life Audit</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Anchor & Amplify Habit Workbook</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>30-Day Biohack Tracker</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Lifetime access to all materials</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-ocean mb-2">
                $47 AUD
              </div>
              <div className="text-sm text-charcoal/60">One-time payment • Lifetime access</div>
            </div>

            <a
              href="/payment-checkout?product=biohacking-foundation&price=47&currency=AUD"
              className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transition-all duration-300"
            >
              Get Your Masterclass Now
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetAssessment}
            className="flex items-center justify-center px-6 py-3 border border-ocean text-ocean rounded-lg hover:bg-ocean hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-ocean to-sky text-white rounded-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Results
          </button>
        </div>
      </motion.div>
    )
  }

  // Show consent screen first
  if (showConsentScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-ocean mb-4">Before You Begin</h3>
          <p className="text-charcoal/80 leading-relaxed">
            Please read and agree to the following before starting your Biohacking Assessment.
          </p>
        </div>

        <div className="bg-ice/50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-ocean mb-4">Consent</h4>

          <div className="space-y-4 text-sm text-charcoal/80">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={initialPrivacyConsent}
                onChange={(e) => setInitialPrivacyConsent(e.target.checked)}
                className="mt-1 mr-3 w-5 h-5 flex-shrink-0 text-ocean focus:ring-ocean rounded cursor-pointer"
              />
              <span className="leading-relaxed">
                I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                <a href="/privacy-policy" className="text-ocean underline hover:text-sky font-medium" target="_blank" rel="noopener noreferrer">
                  BioHackMe Privacy Policy
                </a>
                . I understand this information is for educational purposes only and does not constitute medical advice.
              </span>
            </label>

            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={initialMarketingConsent}
                onChange={(e) => setInitialMarketingConsent(e.target.checked)}
                className="mt-1 mr-3 w-5 h-5 flex-shrink-0 text-ocean focus:ring-ocean rounded cursor-pointer"
              />
              <span className="leading-relaxed">
                I'd like to receive occasional updates, resources, and offers from BioHackMe.
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={handleConsentSubmit}
          disabled={!initialPrivacyConsent}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
            initialPrivacyConsent
              ? 'bg-gradient-to-r from-ocean to-sky text-white hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Assessment
        </button>

        {!initialPrivacyConsent && (
          <p className="text-sm text-charcoal/60 text-center mt-4">
            Please agree to the privacy policy to begin the assessment
          </p>
        )}
      </motion.div>
    )
  }

  const question = assessmentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-charcoal/60">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </span>
          <span className="text-sm font-medium text-ocean">
            {question.pillar}
          </span>
        </div>

        <div className="w-full bg-cloud rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-ocean to-sky h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h3 className="text-xl font-semibold text-charcoal mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {[
            { value: 3, label: 'Yes, I do this consistently', color: 'from-green-500 to-green-600' },
            { value: 2, label: 'Sometimes', color: 'from-yellow-500 to-yellow-600' },
            { value: 1, label: 'No, rarely or never', color: 'from-red-500 to-red-600' }
          ].map(({ value, label, color }) => (
            <motion.button
              key={value}
              onClick={() => handleAnswer(value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 text-left bg-gradient-to-r ${color} text-white rounded-lg font-medium flex items-center justify-between hover:shadow-lg transition-all duration-200`}
            >
              <span>{label}</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
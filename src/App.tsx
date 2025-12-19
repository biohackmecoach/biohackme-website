import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, lazy, Suspense } from 'react'
import { forceWWWRedirect, setCanonicalURL } from './utils/wwwRedirect'

// Lazy load all pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const FreebiePage = lazy(() => import('./pages/FreebiePage'))
const CoachingPage = lazy(() => import('./pages/CoachingPage'))
const CoachingServicesPage = lazy(() => import('./pages/CoachingServicesPage'))
const OptimiseYourLifePage = lazy(() => import('./pages/OptimiseYourLifePage'))
const CoachingSessionsPage = lazy(() => import('./pages/CoachingSessionsPage'))
const DNAPackagePage = lazy(() => import('./pages/DNAPackagePage'))
const ConsultancyPage = lazy(() => import('./pages/ConsultancyPage'))
const TalksPage = lazy(() => import('./pages/TalksPage'))
const MediaPage = lazy(() => import('./pages/MediaPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AppPage = lazy(() => import('./pages/AppPage'))
const BiohackAssessmentPage = lazy(() => import('./pages/BiohackAssessmentPage'))
const BrainAssessmentPage = lazy(() => import('./pages/BrainAssessmentPage'))
const SleepAssessment = lazy(() => import('./pages/SleepAssessment'))
const EnvironmentAssessment = lazy(() => import('./pages/EnvironmentAssessment'))
const SEOAgentPage = lazy(() => import('./pages/SEOAgentPage'))
const MasterclassAgentPage = lazy(() => import('./pages/MasterclassAgentPage'))
const LinkedInLeadAgentPage = lazy(() => import('./pages/LinkedInLeadAgentPage'))
const GrokConnectionPage = lazy(() => import('./pages/GrokConnectionPage'))
const OpenAITestPage = lazy(() => import('./pages/OpenAITestPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const MasterclassPage = lazy(() => import('./pages/MasterclassPage'))
const CourseViewPage = lazy(() => import('./pages/CourseViewPage'))
const RetreatsPage = lazy(() => import('./pages/RetreatsPage'))
const AdminDemo = lazy(() => import('./pages/AdminDemo'))
const ContentCMS = lazy(() => import('./pages/ContentCMS'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const PopupPage = lazy(() => import('./pages/PopupPage'))
const XeroCallback = lazy(() => import('./pages/XeroCallback'))
const BiohackingFoundationAssessmentPage = lazy(() => import('./pages/BiohackingFoundationAssessmentPage'))
const PaymentCheckoutPage = lazy(() => import('./pages/PaymentCheckoutPage'))
const LeadGenerationPage = lazy(() => import('./pages/LeadGenerationPage'))
const LeadGenTest = lazy(() => import('./pages/LeadGenTest'))
const LeadGenSimple = lazy(() => import('./pages/LeadGenSimple'))
const LeadGenWorking = lazy(() => import('./pages/LeadGenWorking'))
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'))
const PaymentCancelledPage = lazy(() => import('./pages/PaymentCancelledPage'))
const MasterclassAccessPage = lazy(() => import('./pages/MasterclassAccessPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #e0f2fe',
        borderTop: '4px solid #0ea5e9',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <p style={{ color: '#0c4a6e', fontSize: '1rem' }}>Loading...</p>
    </div>
  </div>
)

// Component to handle scroll to top on route change and SEO fixes
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)

    // Set canonical URL for SEO
    setCanonicalURL()
  }, [pathname])

  // Run www redirect once on mount
  useEffect(() => {
    forceWWWRedirect()
  }, [])

  return null
}

function App() {
  return (
    <>
      <Helmet>
        <title>BiohackMe - Biohacking Australia</title>
        <meta name="description" content="Transform your health and performance with evidence-based biohacking strategies. Book, coaching, and resources to optimise your life." />
      </Helmet>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/assessment" element={<BiohackAssessmentPage />} />
        <Route path="/biohack-assessment" element={<BiohackAssessmentPage />} />
        <Route path="/brain-assessment" element={<BrainAssessmentPage />} />
        <Route path="/sleep-assessment" element={<SleepAssessment />} />
        <Route path="/environment-assessment" element={<EnvironmentAssessment />} />
        <Route path="/my-book" element={<BookPage />} />
        <Route path="/freebie" element={<FreebiePage />} />
        <Route path="/superchargeyourlife" element={<Navigate to="/optimise-your-life" replace />} />
        <Route path="/coaching" element={<CoachingServicesPage />} />
        <Route path="/optimise-your-life" element={<OptimiseYourLifePage />} />
        <Route path="/coaching-sessions" element={<CoachingSessionsPage />} />
        <Route path="/dna-package" element={<DNAPackagePage />} />
        <Route path="/consultancy" element={<ConsultancyPage />} />
        <Route path="/talks" element={<TalksPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/retreats" element={<RetreatsPage />} />
        <Route path="/masterclass" element={<MasterclassPage />} />
        <Route path="/payment-checkout" element={<PaymentCheckoutPage />} />
        <Route path="/masterclass/:courseId" element={<CourseViewPage />} />
        <Route path="/seo-agent" element={<SEOAgentPage />} />
        <Route path="/masterclass-agent" element={<MasterclassAgentPage />} />
        <Route path="/linkedin-agent" element={<LinkedInLeadAgentPage />} />
        <Route path="/grok-connection" element={<GrokConnectionPage />} />
        <Route path="/openai-test" element={<OpenAITestPage />} />
        <Route path="/admin" element={<AdminDemo />} />
        <Route path="/content-cms" element={<ContentCMS />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/popup" element={<PopupPage />} />
        <Route path="/biohacking-foundation-assessment" element={<BiohackingFoundationAssessmentPage />} />
        <Route path="/masterclass/biohacking-foundation-assessment" element={<BiohackingFoundationAssessmentPage />} />
        <Route path="/admin/xero-callback" element={<XeroCallback />} />
        <Route path="/lead-generation" element={<LeadGenWorking />} />
        <Route path="/lead-test" element={<LeadGenTest />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
        <Route path="/masterclass-access" element={<MasterclassAccessPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
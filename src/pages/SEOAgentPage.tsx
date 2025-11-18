import { Helmet } from 'react-helmet-async'
import SEOAgent from '../agents/SEOAgent'

export default function SEOAgentPage() {
  return (
    <>
      <Helmet>
        <title>SEO Agent Dashboard | BiohackMe - Site Optimization</title>
        <meta name="description" content="Comprehensive SEO audit and optimization dashboard for biohackme.com.au. Monitor rankings, generate sitemaps, and optimize for search engines." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <SEOAgent />
    </>
  )
}
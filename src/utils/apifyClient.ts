import { ApifyClient } from 'apify-client'

// Initialize Apify client
const apifyClient = new ApifyClient({
  token: 'apify_api_IbZaZOZ65kRNJoc4gsyDVey2yLZO6C41kPSP',
})

export interface LeadData {
  name: string
  title: string
  company: string
  location: string
  linkedinUrl: string
  email?: string
  phone?: string
  industry?: string
  companySize?: string
  bio?: string
  socialProfiles?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
  }
  qualificationScore?: number
  qualificationTier?: 'hot' | 'warm' | 'cold' | 'unqualified'
}

export interface ApifyActorRun {
  id: string
  status: string
  startedAt: string
  finishedAt?: string
  defaultDatasetId: string
}

// LinkedIn Company Employee Scraper
export const scrapeLinkedInProfiles = async (searchCriteria: {
  keywords?: string[]
  locations?: string[]
  jobTitles?: string[]
  industries?: string[]
  companyNames?: string[]
  maxResults?: number
}): Promise<LeadData[]> => {
  try {
    console.log('🔍 Starting LinkedIn profile scraping...', searchCriteria)

    // Use LinkedIn People Search Scraper
    const input = {
      searchUrl: buildLinkedInSearchUrl(searchCriteria),
      maxResults: searchCriteria.maxResults || 100,
      includePdfDetails: false,
      includeProfilePicture: false,
      saveToKVS: false,
    }

    const run = await apifyClient.actor('voyager-scraper/linkedin-people-search').call(input)

    if (run.status === 'SUCCEEDED') {
      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems()

      return items.map((profile: any) => ({
        name: profile.fullName || profile.name,
        title: profile.title || profile.headline,
        company: profile.company?.name || profile.currentCompany,
        location: profile.location?.city || profile.geoLocation,
        linkedinUrl: profile.url || profile.linkedinUrl,
        industry: profile.company?.industry,
        companySize: profile.company?.employeeCount,
        bio: profile.summary || profile.about,
        socialProfiles: {
          linkedin: profile.url || profile.linkedinUrl
        }
      }))
    }

    throw new Error(`Scraping failed with status: ${run.status}`)
  } catch (error) {
    console.error('❌ LinkedIn scraping error:', error)
    return []
  }
}

// Instagram Profile Scraper
export const scrapeInstagramProfiles = async (usernames: string[]): Promise<any[]> => {
  try {
    console.log('📸 Starting Instagram profile scraping...', usernames)

    const input = {
      usernames,
      resultsType: 'profiles',
      resultsLimit: usernames.length,
      addParentData: false,
    }

    const run = await apifyClient.actor('apify/instagram-scraper').call(input)

    if (run.status === 'SUCCEEDED') {
      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems()
      return items
    }

    return []
  } catch (error) {
    console.error('❌ Instagram scraping error:', error)
    return []
  }
}

// Build LinkedIn search URL
const buildLinkedInSearchUrl = (criteria: {
  keywords?: string[]
  locations?: string[]
  jobTitles?: string[]
  industries?: string[]
  companyNames?: string[]
}) => {
  const baseUrl = 'https://www.linkedin.com/search/results/people/'
  const params = new URLSearchParams()

  // Add keywords
  if (criteria.keywords?.length) {
    params.append('keywords', criteria.keywords.join(' '))
  }

  // Add location filters (Australia focus)
  const locations = criteria.locations || ['Australia', 'Sydney', 'Melbourne', 'Brisbane', 'Perth']
  params.append('geoUrn', encodeURIComponent(JSON.stringify(locations)))

  // Add job title filters
  if (criteria.jobTitles?.length) {
    params.append('title', criteria.jobTitles.join(' OR '))
  }

  return `${baseUrl}?${params.toString()}`
}

// Lead Qualification Scoring System
export const qualifyLead = (lead: LeadData): LeadData => {
  let score = 0

  // Job Title Scoring (20 points)
  const highValueTitles = ['CEO', 'Founder', 'Director', 'VP', 'President', 'Owner', 'Executive']
  const midValueTitles = ['Manager', 'Head', 'Lead', 'Senior', 'Principal']

  if (highValueTitles.some(title => lead.title?.toLowerCase().includes(title.toLowerCase()))) {
    score += 20
  } else if (midValueTitles.some(title => lead.title?.toLowerCase().includes(title.toLowerCase()))) {
    score += 12
  }

  // Industry Relevance (20 points)
  const targetIndustries = ['health', 'wellness', 'fitness', 'medical', 'pharmaceutical', 'nutrition', 'coaching', 'consulting']
  if (targetIndustries.some(industry => lead.industry?.toLowerCase().includes(industry))) {
    score += 20
  }

  // Company Size (15 points)
  if (lead.companySize) {
    const size = parseInt(lead.companySize.replace(/\D/g, ''))
    if (size >= 10 && size <= 500) {
      score += 15
    } else if (size > 500 && size <= 1000) {
      score += 10
    }
  }

  // Location (10 points) - Australia preference
  if (lead.location?.toLowerCase().includes('australia') ||
      lead.location?.toLowerCase().includes('sydney') ||
      lead.location?.toLowerCase().includes('melbourne')) {
    score += 10
  }

  // Bio/Keywords (15 points)
  const healthKeywords = ['biohacking', 'wellness', 'health', 'fitness', 'nutrition', 'performance', 'optimization', 'longevity']
  if (lead.bio && healthKeywords.some(keyword => lead.bio.toLowerCase().includes(keyword))) {
    score += 15
  }

  // Premium LinkedIn indicators (20 points)
  if (lead.linkedinUrl && (lead.bio?.length > 200 || lead.title?.includes('Founder'))) {
    score += 10
  }

  // Determine qualification tier
  let tier: 'hot' | 'warm' | 'cold' | 'unqualified'
  if (score >= 80) tier = 'hot'
  else if (score >= 60) tier = 'warm'
  else if (score >= 40) tier = 'cold'
  else tier = 'unqualified'

  return {
    ...lead,
    qualificationScore: score,
    qualificationTier: tier
  }
}

// Batch process leads with qualification
export const processAndQualifyLeads = async (searchCriteria: {
  keywords?: string[]
  locations?: string[]
  jobTitles?: string[]
  industries?: string[]
  companyNames?: string[]
  maxResults?: number
}): Promise<LeadData[]> => {
  try {
    console.log('🚀 Starting lead processing pipeline...')

    // Step 1: Scrape LinkedIn profiles
    const rawLeads = await scrapeLinkedInProfiles(searchCriteria)
    console.log(`📊 Found ${rawLeads.length} raw leads`)

    // Step 2: Qualify each lead
    const qualifiedLeads = rawLeads.map(qualifyLead)

    // Step 3: Sort by qualification score
    const sortedLeads = qualifiedLeads.sort((a, b) => (b.qualificationScore || 0) - (a.qualificationScore || 0))

    // Step 4: Filter out unqualified leads
    const validLeads = sortedLeads.filter(lead => lead.qualificationTier !== 'unqualified')

    console.log(`✅ Processed ${validLeads.length} qualified leads`)
    console.log(`🔥 Hot leads: ${validLeads.filter(l => l.qualificationTier === 'hot').length}`)
    console.log(`🌟 Warm leads: ${validLeads.filter(l => l.qualificationTier === 'warm').length}`)
    console.log(`❄️ Cold leads: ${validLeads.filter(l => l.qualificationTier === 'cold').length}`)

    return validLeads
  } catch (error) {
    console.error('❌ Lead processing error:', error)
    return []
  }
}

export default apifyClient
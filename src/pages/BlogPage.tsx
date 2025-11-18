import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MailchimpNewsletter from '../components/MailchimpNewsletter'

const womenLoveTravelPosts = [
  {
    id: 'wlt-1',
    title: 'Live Well Longer: A Transformative Soulful Biohacking Health Retreat for Women in Bali',
    excerpt: 'Live Well Longer Retreat with Camilla Thompson in Bali for Women. Here Camilla shares more information about her planned trip.',
    url: 'https://womenlovetravel.com.au/live-well-longer-a-transformative-soulful-biohacking-health-retreat-for-women-in-bali/',
    image: 'https://womenlovetravel.com.au/wp-content/uploads/2025/09/women-participating-in-a-sacred-water-purification-ritual-at-pura-tirta-empul-temple-in-bali-indonesia.-2166608-scaled.jpg',
    category: 'Wellness Travel',
    date: '2025-09-22',
    readTime: '6 min read'
  },
  {
    id: 'wlt-2',
    title: 'Soulshine Bali: Where Pikes Ibiza Meets Balinese Soul',
    excerpt: "If you're looking for colour, character, soul, this pocket of Ubud will light you up.",
    url: 'https://womenlovetravel.com.au/soulshine-bali-where-pikes-ibiza-meets-balinese-soul/',
    image: 'https://womenlovetravel.com.au/wp-content/uploads/2025/08/GL10-WW-BALI_INDONESIA-1-1500x900-1.jpg',
    category: 'Wellness Travel',
    date: '2025-08-30',
    readTime: '5 min read'
  },
  {
    id: 'wlt-3',
    title: 'The Gift of a Pause: My 7-Day Reset at Gwinganna',
    excerpt: 'The therapeutic benefits biohacker Camilla Thompson had during her 7 Day Reset at Gwinganna, Gold Coast, Queensland.',
    url: 'https://womenlovetravel.com.au/the-gift-of-a-pause-my-7-day-reset-at-gwinganna/',
    image: 'https://womenlovetravel.com.au/wp-content/uploads/2025/08/cailla.jpeg',
    category: 'Wellness Retreats',
    date: '2025-08-27',
    readTime: '7 min read'
  },
  {
    id: 'wlt-4',
    title: 'Finding My Next Chapter: Embracing Solo Travel in Bali at 48',
    excerpt: "Embracing Solo Travel in Bali at 48. It's hugely empowering.",
    url: 'https://womenlovetravel.com.au/finding-my-next-chapter-embracing-solo-travel-in-bali-at-48/',
    image: 'https://womenlovetravel.com.au/wp-content/uploads/2025/08/IMG_4573-2-scaled.jpg',
    category: 'Solo Travel',
    date: '2025-08-20',
    readTime: '6 min read'
  },
  {
    id: 'wlt-5',
    title: 'Biohacker Camilla Thompson: Unplugged At Eden Health Retreat',
    excerpt: 'Camilla Thompson, an Australian author and biohacker, visits Eden Health Retreat in Currumbin, Queensland.',
    url: 'https://womenlovetravel.com.au/biohacker-camilla-thompson-unplugs-at-eden-health-retreat/',
    image: 'https://womenlovetravel.com.au/wp-content/uploads/2025/08/Screenshot-2025-08-14-at-8.31.09-am.png',
    category: 'Wellness Retreats',
    date: '2025-08-13',
    readTime: '5 min read'
  }
]

const substackPosts = [
  {
    id: 'substack-1',
    title: 'The Stress C-Suite: How Cortisol, Adrenaline and DHEA Shape Executive Performance',
    excerpt: 'Your guide to biohacking stress hormones for sharper decisions',
    url: 'https://biohackme.substack.com/p/the-stress-c-suite-how-cortisol-adrenaline',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8879aeb1-6c13-4b6f-84bd-a286459815b3_1280x768.png',
    category: 'Leadership',
    date: '2025-10-11',
    readTime: '5 min read'
  },
  {
    id: 'substack-2',
    title: 'NMN Just Became Legal in the US: What I Learnt From 2 Years of Taking It',
    excerpt: 'NMN (Nicotinamide Mononucleotide) has just been reclassified as a legal dietary supplement in the United States',
    url: 'https://biohackme.substack.com/p/nmn-just-became-legal-in-the-us-what',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8471d38-85a2-4dbc-8891-75baf7c644c3_626x417.avif',
    category: 'Supplements',
    date: '2025-10-11',
    readTime: '4 min read'
  },
  {
    id: 'substack-3',
    title: 'The Sleep C-Suite: What Every Leader Needs to Know About Melatonin, GABA & Adenosine',
    excerpt: "Sleep isn't a luxury—it's leadership infrastructure. The most effective leaders understand that peak performance isn't about grinding through exhaustion",
    url: 'https://biohackme.substack.com/p/the-sleep-csuite-what-every-leader',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa68f50d7-5782-49ee-b853-2eef896e5df8_1280x768.png',
    category: 'Sleep',
    date: '2025-09-22',
    readTime: '5 min read'
  }
]

const blogPosts = [
  {
    id: 0,
    slug: 'biohacking-legends-australia',
    title: 'The Biohacking Legends Finally Came to Australia. Here\'s What Happened',
    excerpt: 'For years, I\'ve watched the biggest names in biohacking gather in LA, Austin, Dallas, Singapore, Helsinki, London—everywhere but here. Until now. The Wanderlust Wellspring Summit brought Dave Asprey, Dr Will Cole, Wim Hof, and more to Australia\'s Gold Coast.',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7601d5ce-4220-41f8-933c-310d3dff2a2c.heic',
    category: 'Biohacking Events',
    date: '2024-11-06',
    readTime: '8 min read'
  },
  {
    id: 1,
    slug: 'health-personalisation',
    title: "Your Health Isn't a Mystery—It Just Hasn't Been Personalised",
    excerpt: 'Imagine two people following the same healthy routine—similar diet, exercise, and sleep habits—but one thrives and the other struggles. The difference often comes down to personalisation.',
    image: '/images/blog/health-personalisation.jpg',
    category: 'Personalised Health',
    date: '2024-07-25',
    readTime: '6 min read'
  },
  {
    id: 2,
    slug: 'fewer-supplements',
    title: 'Why I Take Fewer Supplements Than Ever (And You Might Want To As Well)',
    excerpt: 'Supplements played a key role in helping me reclaim my health after getting sick from mould exposure. But here\'s the truth: they\'re not a long-term strategy. The body needs cycles—periods of support, followed by space to self-regulate.',
    image: '/images/blog/fewer-supplements.webp',
    category: 'Supplements',
    date: '2024-07-21',
    readTime: '4 min read'
  },
  {
    id: 3,
    slug: 'toxic-exposure',
    title: 'The Toxic Sh*t Storm: The Hidden Compound Effect of Everyday Exposure',
    excerpt: 'Let\'s face it: most of us are unknowingly living in a toxic sh*t storm. From the moment we wake up to the moment we go to bed, we\'re exposed to countless chemicals that our great-grandparents never encountered.',
    image: 'https://static.wixstatic.com/media/6b4c52_9c21cf7f5aad4daeab1365b3a19e8f51~mv2.webp',
    category: 'Environmental Health',
    date: '2024-07-21',
    readTime: '5 min read'
  },
  {
    id: 4,
    slug: 'wellness-overload',
    title: "Wellness Information Overload: Why We're Sicker Despite Knowing More",
    excerpt: 'Anyone else feeling completely overwhelmed by health advice lately? I know I am—and I work in this field. When health advice becomes health paralysis, we need to find a better way.',
    image: 'https://static.wixstatic.com/media/6b4c52_8e471684b55341e2bef3ba32ce2142fd~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/6b4c52_8e471684b55341e2bef3ba32ce2142fd~mv2.jpg',
    category: 'Wellness Strategy',
    date: '2024-07-18',
    readTime: '4 min read'
  },
  {
    id: 5,
    slug: 'nutritionist-path',
    title: 'What Kind of Nutritionist Am I? Understanding the Path (and the Title) in Australia',
    excerpt: 'In Australia, "nutritionist" is not a protected title. That means anyone can technically call themselves a nutritionist—even without formal training. But there\'s a world of difference between someone who\'s read a few articles online and someone who has spent years studying.',
    image: 'https://static.wixstatic.com/media/6b4c52_e624be4826b84dc1b5d5e27783a09e8a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/6b4c52_e624be4826b84dc1b5d5e27783a09e8a~mv2.jpg',
    category: 'Professional Journey',
    date: '2024-07-14',
    readTime: '2 min read'
  },
  {
    id: 6,
    slug: 'braintap-australia',
    title: 'BrainTap in Australia: My Experience with This Game-Changing Neurotech',
    excerpt: 'I was very lucky to have BrainTap at my recent book launch in Bondi Beach facilitated by the brilliant Dr Nicholas Keown. While BrainTap is already well-known in the US, it\'s only just starting to make waves here in Australia.',
    image: 'https://static.wixstatic.com/media/6b4c52_919d86a395ad4f27b0bd8e47f9e84cad~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/6b4c52_919d86a395ad4f27b0bd8e47f9e84cad~mv2.jpg',
    category: 'Neurotechnology',
    date: '2024-07-14',
    readTime: '3 min read'
  },
  {
    id: 7,
    slug: 'red-light-therapy-2025',
    title: 'Red Light Therapy: One of the Most Exciting Biohacks to Watch in 2025',
    excerpt: 'One of the things that most excites me about biohacking—right up there with saunas—is red light therapy. It\'s one of the most researched and fast-evolving therapies in the field, yet still flying under the radar for its deeper health applications.',
    image: '/images/blog/red-light-therapy.jpg',
    category: 'Light Therapy',
    date: '2024-07-13',
    readTime: '4 min read'
  },
  {
    id: 8,
    slug: 'media-biohacking',
    title: 'How to Have Smarter Media Conversations About Biohacking',
    excerpt: 'Biohacking is gaining traction in Australia. From red light therapy and wearable tech to longevity supplements and cold exposure, more people are exploring optimisation strategies beyond conventional wellness.',
    image: 'https://static.wixstatic.com/media/6b4c52_07222d613b0e4358a566a5b327b5b484~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/6b4c52_07222d613b0e4358a566a5b327b5b484~mv2.jpg',
    category: 'Media & Education',
    date: '2024-07-13',
    readTime: '3 min read'
  },
  {
    id: 9,
    slug: 'methylene-blue-facts',
    title: 'Methylene Blue - Facts over Fear',
    excerpt: 'I would like to say this is new and emerging—but it\'s not. Methylene blue has been around for over a century, with a robust history in both clinical and research settings. What is new is the depth of research now going into its potential applications.',
    image: 'https://static.wixstatic.com/media/6b4c52_00eacf6da9424567a76b393a98378add~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/6b4c52_00eacf6da9424567a76b393a98378add~mv2.jpg',
    category: 'Supplements',
    date: '2024-07-12',
    readTime: '3 min read'
  }
]

export default function BlogPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Biohacking Blog | Evidence-Based Health Optimisation Tips | BiohackMe Australia</title>
        <meta name="description" content="Discover the latest biohacking strategies, supplements, sleep optimisation, and personalised health tips from Australia's leading biohacking expert. Science-backed insights for peak performance." />
        <meta name="keywords" content="biohacking blog, health optimisation tips, biohacking Australia, supplements guide, sleep optimisation, personalised health, functional medicine blog, wellness strategies" />
        <meta property="og:title" content="Biohacking Blog | Evidence-Based Health Optimisation Tips" />
        <meta property="og:description" content="Discover science-backed biohacking strategies, supplements, and personalised health tips from Australia's leading expert." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biohackme.com.au/blog" />
        <meta property="og:image" content="https://biohackme.com.au/blog-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Biohacking Blog | Evidence-Based Health Optimisation Tips" />
        <meta name="twitter:description" content="Science-backed biohacking strategies and personalised health tips from Australia's leading expert." />
        <link rel="canonical" href="https://biohackme.com.au/blog" />
        
        {/* Schema markup for Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "BiohackMe Blog",
            "description": "Evidence-based biohacking strategies and health optimisation insights",
            "url": "https://biohackme.com.au/blog",
            "author": {
              "@type": "Person",
              "name": "Camilla Arnoldussen",
              "jobTitle": "Biohacking Expert",
              "description": "Leading biohacking expert and health optimisation coach"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BiohackMe",
              "url": "https://biohackme.com.au"
            },
            "inLanguage": "en-AU",
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "Your Health Isn't a Mystery—It Just Hasn't Been Personalised",
                "url": "https://biohackme.com.au/blog/health-personalisation",
                "datePublished": "2024-12-15"
              },
              {
                "@type": "BlogPosting",
                "headline": "Why I Take Fewer Supplements Than Ever",
                "url": "https://biohackme.com.au/blog/fewer-supplements",
                "datePublished": "2024-12-10"
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
                "name": "Blog",
                "item": "https://www.biohackme.com.au/blog"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-ocean via-sky to-ocean">
        <Header />
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-36 md:pt-40 lg:pt-48 pb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            Discover the latest biohacking insights, scientific breakthroughs, and practical strategies for optimising your health and performance
          </motion.p>
        </div>
      </section>


      {/* Featured Post - Text Only */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Featured Article Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-ocean font-semibold">{blogPosts[0].category}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{blogPosts[0].date}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{blogPosts[0].readTime}</span>
              </div>
              <span className="bg-sky/20 text-ocean px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
                Featured Article
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-800">{blogPosts[0].title}</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to={`/blog/${blogPosts[0].slug}`}
                className="bg-ocean text-white inline-flex items-center px-8 py-4 rounded-full font-medium hover:bg-ocean/90 transition-all duration-300"
              >
                Read Full Article
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
            </motion.div>

            {/* Featured Article Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src="/images/blog/sleep-optimization.webp"
                  alt="Sleep optimisation for biohacking - person sleeping peacefully"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Substack Articles Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">
              Latest from Substack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep dives into biohacking, leadership wellness, and health optimization strategies
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {substackPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-br from-sky/5 to-ocean/5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-ocean/10"
              >
                {/* Blog Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="bg-ocean/20 text-ocean px-3 py-1 rounded-full font-semibold">{post.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-ocean transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-ocean font-medium group-hover:gap-3 transition-all">
                    Read on Substack
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Subscribe CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://biohackme.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                Subscribe to my Substack
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://biohackme.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white border-2 border-ocean text-ocean px-8 py-4 rounded-full font-semibold hover:bg-ocean hover:text-white transition-all duration-300"
              >
                View All Articles
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 text-sm">Free to subscribe • Delivered weekly • Unsubscribe anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Women Love Travel Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">
              Featured in Women Love Travel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wellness travel, retreat experiences, and transformative journeys for women
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {womenLoveTravelPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Article Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="bg-sky/20 text-ocean px-3 py-1 rounded-full font-semibold">{post.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-ocean transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-ocean font-medium group-hover:gap-3 transition-all">
                    Read on Women Love Travel
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://womenlovetravel.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white border-2 border-ocean text-ocean px-8 py-4 rounded-full font-semibold hover:bg-ocean hover:text-white transition-all duration-300"
            >
              Visit Women Love Travel
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-16"
          >
            Latest Articles
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {blogPosts.slice(1).map((post) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <Link to={`/blog/${post.slug}`}>
                  {/* Blog Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="bg-sky/20 text-ocean px-3 py-1 rounded-full font-semibold">{post.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-ocean transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-ocean font-medium group-hover:gap-3 transition-all">
                      Read More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-ocean text-white px-10 py-4 rounded-full font-medium hover:bg-ocean/90 transition-all duration-300"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-ice to-cloud">
        <div className="container mx-auto px-4 max-w-4xl">
          <MailchimpNewsletter
            title="Stay Updated with Latest Blog Posts"
            subtitle="Get notified when new blog articles are published"
            buttonText="Subscribe to Blog Updates"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      <Footer />
    </>
  )
}
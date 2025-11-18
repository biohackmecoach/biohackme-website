import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Headphones } from 'lucide-react'

const mediaImages = [
  {
    id: 1,
    image: 'https://static.wixstatic.com/media/f5168e_d71d4c180f0e46188e155f51754a72c9~mv2.png/v1/fill/w_1092,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-13.png',
    alt: '7News The Morning Show - Biohacking Basics',
    link: 'https://7news.com.au/video/the-morning-show/biohacking-basics-bc-6373764239112'
  },
  {
    id: 2,
    image: 'https://static.wixstatic.com/media/f5168e_998440b5c1f2418cbaf26b0b2588de0e~mv2.png/v1/fill/w_428,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-07-19%20at%2011_00_18.png',
    alt: '7News The Morning Show Interview',
    link: 'https://7news.com.au/video/the-morning-show/biohacking-basics-bc-6373764239112'
  },
  {
    id: 3,
    image: 'https://static.wixstatic.com/media/f5168e_a849156f6faa43d699ff7bbc26aec02c~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-19.png',
    alt: 'Sydney Morning Herald - Bio Age Article',
    link: 'https://www.smh.com.au/lifestyle/health-and-wellness/this-48-year-old-wellbeing-coach-has-a-bio-age-of-38-here-s-what-she-eats-in-a-day-20250617-p5m80d.html'
  },
  {
    id: 4,
    image: 'https://static.wixstatic.com/media/f5168e_c7c3070c0cd44daa9e2b69ab6b0a7447~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-02.png',
    alt: 'YouTube Interview',
    link: 'https://www.youtube.com/watch?v=v0u6ZBbbmYM'
  },
  {
    id: 5,
    image: 'https://static.wixstatic.com/media/f5168e_423012d5cc13440ab9c67573f031ef3a~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-11.png',
    alt: '7News Biohacking Feature',
    link: 'https://7news.com.au/video/the-morning-show/biohacking-basics-bc-6373764239112'
  },
  {
    id: 6,
    image: 'https://static.wixstatic.com/media/f5168e_c51a179d776f4071878544d6507898c4~mv2.png/v1/fill/w_1092,h_540,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-27.png',
    alt: 'Facebook Watch Interview',
    link: 'https://www.facebook.com/watch/?v=685180424278747'
  },
  {
    id: 7,
    image: 'https://static.wixstatic.com/media/f5168e_b85ce0069cac454594a0d84c3823b840~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media%20Template%20Tutorial.png',
    alt: 'YouTube Biohacking Tutorial',
    link: 'https://www.youtube.com/watch?v=v0u6ZBbbmYM'
  },
  {
    id: 8,
    image: 'https://static.wixstatic.com/media/f5168e_7fd8670d2a7344298ba90cdbe2480e2d~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-25.png',
    alt: 'Food Matters Institute - Mold Toxicity Article',
    link: 'https://www.foodmattersinstitute.com/article/biohacking-your-health-how-mold-could-be-sabotaging-your-body'
  },
  {
    id: 9,
    image: 'https://static.wixstatic.com/media/f5168e_33c9a30aff4748a5b9f3406904fb1ff6~mv2.png/v1/fill/w_1092,h_575,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-24.png',
    alt: 'Spotify Podcast Episode',
    link: 'https://open.spotify.com/episode/075p4V78V2XZlz85Uml8uD'
  },
  {
    id: 10,
    image: 'https://static.wixstatic.com/media/f5168e_d6bf68d93c7d426db6ec3858dfcc10af~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-26.png',
    alt: 'Spotify Podcast Interview',
    link: 'https://open.spotify.com/episode/0dZVG1BlRmvLZiwBIBcwJc'
  },
  {
    id: 11,
    image: 'https://static.wixstatic.com/media/f5168e_c0eb76fdf1fc4c6fb19b2644f6826eb1~mv2.png/v1/fill/w_1092,h_597,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-23.png',
    alt: 'Spotify Podcast Feature',
    link: 'https://open.spotify.com/episode/5Whw0wfFTGLHq4R00oVYoi'
  },
  {
    id: 12,
    image: 'https://static.wixstatic.com/media/f5168e_8114f763cab144b5b623a2000c2de26f~mv2.png/v1/fill/w_1092,h_598,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-22.png',
    alt: 'Camilla Media Feature',
    link: null // No link provided for this one in the original
  },
  {
    id: 13,
    image: 'https://static.wixstatic.com/media/f5168e_56c3f1151b6a479d9bfddcbf9e525af6~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-21.png',
    alt: 'Website Love Podcast - Biohacking for Business Owners',
    link: 'https://websitelove.com.au/164-biohacking-for-busy-business-owners-with-camilla-thompson/'
  },
  {
    id: 14,
    image: 'https://static.wixstatic.com/media/f5168e_8d1a1cd60a1440ef92810e680e50e1b2~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-20.png',
    alt: 'The Light - From Mold Poisoning to Reversing Age',
    link: 'https://www.thelight.com.au/news/from-mold-poisoning-to-reversing-age-how-camilla-thompson-biohacked-her-way-back-to-health'
  },
  {
    id: 15,
    image: 'https://static.wixstatic.com/media/f5168e_58cfc6e4087640b7b5beab2c05f10ed5~mv2.png/v1/fill/w_1092,h_602,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-18.png',
    alt: 'Muse Paper - 10 Biohacks to Transform Your Health',
    link: 'https://musepaper.au/wellness/10-biohacks-to-transform-your-health-routine'
  },
  {
    id: 16,
    image: 'https://static.wixstatic.com/media/f5168e_8b759964dad44050bf15aa4604b35b2b~mv2.png/v1/fill/w_1092,h_593,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-17.png',
    alt: 'Ramona Magazine - Are You a Rushing Woman?',
    link: 'https://ramonamag.com/2025/06/are-you-a-rushing-woman-it-could-be-taking-years-off-your-life/'
  },
  {
    id: 17,
    image: 'https://static.wixstatic.com/media/f5168e_b44811bb06d845c4bfad34bbbc644044~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-16.png',
    alt: 'Daily Mail - Biohacker Secrets',
    link: 'https://www.dailymail.co.uk/femail/article-14749127/Secrets-biohacker-peel-five-years-body-clock-FAST-no-millionaire-budget-required.html'
  },
  {
    id: 18,
    image: 'https://static.wixstatic.com/media/f5168e_e934621ebaab44ef985f0c665346c5a3~mv2.png/v1/fill/w_1092,h_573,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-15.png',
    alt: 'Well Hello Anxiety Podcast',
    link: 'https://podfollow.com/well-hello-anxiety-with-dr-jodi-richardson/episode/6ae8ec7b20b5b006cdd2ebc1c59664055771fc66/view'
  },
  {
    id: 19,
    image: 'https://static.wixstatic.com/media/f5168e_5b39f9dff1bd48ee8c627f13b3edc7bf~mv2.png/v1/fill/w_1092,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-14.png',
    alt: 'Space and Grace Podcast - Future Proof Your Health',
    link: 'https://www.spaceandgrace.me/podcast/biohacking-future-proof-your-health-with-camilla-thompson'
  },
  {
    id: 20,
    image: 'https://static.wixstatic.com/media/f5168e_7cd13d180ee4424da5bb81489c0e65d1~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-12.png',
    alt: 'ONYA Magazine - Science-Backed Wellness Tools',
    link: 'https://www.onyamagazine.com/lifestyle/health/from-stress-relief-to-sleep-optimisation-meet-the-science-backed-wellness-tools-now-available-in-australia/'
  },
  {
    id: 21,
    image: 'https://static.wixstatic.com/media/f5168e_12f81f9b87fc46c68cd50448bd3d7a6a~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-10.png',
    alt: 'Simply Happy Conversations - Kitchen Biohacks',
    link: 'https://omny.fm/shows/simply-happy-conversations/kitchen-biohacks-with-camilla-from-biohackme'
  },
  {
    id: 22,
    image: 'https://static.wixstatic.com/media/f5168e_a63163682c584c19bee4f3a5e790c8d4~mv2.png/v1/fill/w_1092,h_535,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-09.png',
    alt: 'YouTube Interview',
    link: 'https://www.youtube.com/watch?v=dwHY8ddyIBQ'
  },
  {
    id: 23,
    image: 'https://static.wixstatic.com/media/f5168e_0ca2c252f24146a09c88eb3b4caefe9b~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-05.png',
    alt: 'Women Love Tech - Biohacks for Women',
    link: 'https://womenlovetech.com/biohacks-for-women-how-females-are-using-tech-to-control-their-health/'
  },
  {
    id: 24,
    image: 'https://static.wixstatic.com/media/f5168e_0753d096ef264aa4912990d4975a8b2e~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-08.png',
    alt: "Women's Health - Affordable Health Tips",
    link: 'https://womenshealth.com.au/affordable-health-tips-biohacking/'
  },
  {
    id: 25,
    image: 'https://static.wixstatic.com/media/f5168e_62fcd91249824d20affdd220335dc1c3~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-07.png',
    alt: 'NewsHub - Biohacking Secrets Book Launch',
    link: 'https://newshub.medianet.com.au/2025/05/camilla-thompson-unlocks-the-secrets-of-everyday-biohacking-for-a-longer-healthier-life-with-new-book-biohack-me/102410/'
  },
  {
    id: 26,
    image: 'https://static.wixstatic.com/media/f5168e_04a66586c49c4466a1f109748ff371f7~mv2.png/v1/fill/w_1092,h_600,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-06.png',
    alt: 'Mirage News - Biohacking Secrets',
    link: 'https://www.miragenews.com/camilla-thompson-reveals-biohacking-secrets-in-1464637/'
  },
  {
    id: 27,
    image: 'https://static.wixstatic.com/media/f5168e_c8cc6ecba7e44956bc5ff3d92fc312a3~mv2.png/v1/fill/w_1092,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-01.png',
    alt: 'The Senior - How to Sleep Better and Live Healthy',
    link: 'https://www.thesenior.com.au/story/8955962/how-to-sleep-better-at-night-eat-better-and-live-a-healthy-life/'
  },
  {
    id: 28,
    image: 'https://static.wixstatic.com/media/f5168e_9665db3b131b41779252b0bcc4b000e3~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-03.png',
    alt: 'Spotify Podcast Episode',
    link: 'https://open.spotify.com/episode/4Epc2DpjBF8jcbF45EMlAQ'
  },
  {
    id: 29,
    image: 'https://static.wixstatic.com/media/f5168e_a53395a0f9334c08b340333e88199e25~mv2.png/v1/fill/w_1092,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20Media-04.png',
    alt: 'Spotify Podcast Interview',
    link: 'https://open.spotify.com/episode/3Y1IhKyMKDoXS06XTNGwu1'
  }
]

const podcastEpisodes = [
  { id: 1, name: 'SWIISH', link: 'https://podcasts.apple.com/au/podcast/swiish-wellness-unlocked/id1827844661?i=1000730856816' },
  { id: 2, name: 'Can I Get a Refill', link: 'https://podcasts.apple.com/au/podcast/can-i-get-a-refill/id1741251355?i=1000731680449' },
  { id: 3, name: 'Revital Health', link: 'https://podcasts.apple.com/au/podcast/the-revital-health-podcast/id1685631516?i=1000721758571' },
  { id: 4, name: 'Biohack-Her', link: 'https://podcasts.apple.com/au/podcast/biohackher/id1655836097?i=1000657762349' },
  { id: 5, name: 'Ariise', link: 'https://podcasts.apple.com/au/podcast/ariise/id1515060551?i=1000720638375' },
  { id: 6, name: 'Biohacking with Brittany', link: 'https://podcasts.apple.com/au/podcast/biohacking-with-brittany/id1466703200?i=1000731782155' },
  { id: 7, name: 'One Question', link: 'https://podcasts.apple.com/au/podcast/one-question/id1515908184?i=1000716347969' },
  { id: 8, name: 'Well Hello Anxiety - Part 2', link: 'https://podcasts.apple.com/au/podcast/well-hello-anxiety-with-dr-jodi-richardson/id1585382774?i=1000712290311' },
  { id: 9, name: 'Well Hello Anxiety - Part 1', link: 'https://podcasts.apple.com/au/podcast/well-hello-anxiety-with-dr-jodi-richardson/id1585382774?i=1000711032033' },
  { id: 10, name: 'Unstress Your Health', link: 'https://podcasts.apple.com/au/podcast/unstress-with-dr-ron-ehrlich/id1333795919?i=1000679644767' },
  { id: 11, name: 'Space and Grace', link: 'https://podcasts.apple.com/au/podcast/space-and-grace-podcast-abundant-business-without-burnout/id1776927699?i=1000710666463' },
  { id: 12, name: 'Extra Healthy-ish', link: 'https://podcasts.apple.com/au/podcast/extra-healthy-ish/id1558608263?i=1000672060885' },
  { id: 13, name: 'Healthy-ish', link: 'https://podcasts.apple.com/au/podcast/healthy-ish/id1246679887?i=1000672061156' },
  { id: 14, name: 'The Hustle Rebellion', link: 'https://podcasts.apple.com/au/podcast/the-hustle-rebellion/id1498288852?i=1000714417499' },
  { id: 15, name: 'The Dynamic Leader', link: 'https://podcasts.apple.com/au/podcast/the-dynamic-leader-podcast/id1500435928?i=1000725784936' },
  { id: 16, name: 'Yellow Shelf', link: 'https://podcasts.apple.com/au/podcast/yellow-shelf-podcast/id1767729340?i=1000709056223' },
  { id: 17, name: 'All About You', link: 'https://podcasts.apple.com/au/podcast/all-about-you-with-dr-shauna-watts/id1720112408?i=1000657568176' },
  { id: 18, name: 'Biohack Me Audiobook', link: 'https://podcasts.apple.com/au/podcast/biohack-me-the-practical-guide-to-everyday-biohacks/id1844873615?i=1000730829100' },
  { id: 19, name: 'Think Better, Feel Better', link: 'https://podcasts.apple.com/au/podcast/overcoming-mould-illness-through-biohacking-with/id1761762675?i=1000690740994' }
]

const featuredLogos = [
  {
    id: 1,
    image: 'https://static.wixstatic.com/media/6b4c52_654db5976893422ab1600e6e88e361ee~mv2.png/v1/fill/w_365,h_157,al_c,lg_1,q_85,enc_avif,quality_auto/download%20(2).png',
    alt: 'Featured In'
  },
  {
    id: 2,
    image: 'https://static.wixstatic.com/media/6b4c52_8a0896699e80453dbd932857201bdb0b~mv2.png/v1/fill/w_280,h_173,al_c,lg_1,q_85,enc_avif,quality_auto/download%20(1).png',
    alt: 'Featured In'
  },
  {
    id: 3,
    image: 'https://static.wixstatic.com/media/6b4c52_14c31dd67fa34e4281b0531a03f4b31d~mv2.png/v1/fill/w_301,h_131,al_c,q_85,enc_avif,quality_auto/download.png',
    alt: 'Featured In'
  },
  {
    id: 4,
    image: 'https://static.wixstatic.com/media/6b4c52_067830ea1254421fab9a752b20f4555e~mv2.png/v1/fill/w_402,h_77,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/download%20(6).png',
    alt: 'Featured In'
  },
  {
    id: 5,
    image: 'https://static.wixstatic.com/media/f5168e_0f4427b5c21f4587be8b4960a49831c8~mv2.png/v1/fill/w_437,h_81,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Daily%20Mail%20Logo.png',
    alt: 'Daily Mail'
  },
  {
    id: 6,
    image: 'https://static.wixstatic.com/media/f5168e_869e20b9a7004f878446286f520a9e5d~mv2.png/v1/fill/w_534,h_81,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa302758-32db-2949-6468-200db2ad35bb.png',
    alt: 'Featured In'
  },
  {
    id: 7,
    image: 'https://static.wixstatic.com/media/f5168e_f30bc1fe4c954ad5bc599c405b93fe7b~mv2.png/v1/fill/w_437,h_81,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-01-17%20at%2015_38_12.png',
    alt: 'Featured In'
  },
  {
    id: 8,
    image: 'https://static.wixstatic.com/media/f5168e_57a3f6e2191945b98595d20dc74e4d69~mv2.png/v1/fill/w_476,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-01-17%20at%2015_38_24.png',
    alt: 'Featured In'
  }
]

const testimonialQuote = "Camilla made complex biohacking concepts clear and practical. Her talk at Lendlease was informative, engaging, and resonated with everyone in the room."

export default function MediaPage() {
  return (
    <>
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Media & Podcasts | BiohackMe - Camilla Thompson Featured in 7News, SMH, Podcasts</title>
        <meta name="description" content="Explore Camilla Thompson's media appearances on 7News, Sydney Morning Herald, Daily Mail + 19 podcast episodes on biohacking, wellness, health optimization, mold illness recovery, DNA testing & longevity strategies." />
        <meta name="keywords" content="Camilla Thompson podcasts, biohacking podcasts Australia, health optimization podcasts, wellness coach media, 7News biohacking, Sydney Morning Herald health, biohacking expert interviews, wellness podcast guest, longevity podcasts, DNA testing podcasts, mold illness recovery, SWIISH podcast, Space and Grace podcast, biohacking with Brittany, women's health podcasts Australia" />
        <meta property="og:title" content="Media & Podcasts | Camilla Thompson - BiohackMe Featured in 7News, SMH & Top Health Podcasts" />
        <meta property="og:description" content="Watch Camilla's TV appearances & listen to 19+ podcast episodes on biohacking, wellness & health optimization" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/media" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Media & Podcasts | Camilla Thompson BiohackMe" />
        <meta name="twitter:description" content="Featured in 7News, SMH, Daily Mail + 19 health & wellness podcasts" />
        <link rel="canonical" href="https://www.biohackme.com.au/media" />

        {/* Podcast Schema.org Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Camilla Thompson Media & Podcast Appearances",
            "description": "Collection of media appearances, TV interviews, and podcast episodes featuring biohacking expert Camilla Thompson",
            "url": "https://www.biohackme.com.au/media",
            "about": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Biohacking Expert, Nutritionist & Wellbeing Coach",
              "url": "https://www.biohackme.com.au",
              "sameAs": [
                "https://www.instagram.com/biohackmecoach/",
                "https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw"
              ]
            },
            "hasPart": podcastEpisodes.map(podcast => ({
              "@type": "PodcastEpisode",
              "name": podcast.name,
              "url": podcast.link,
              "about": "Biohacking, health optimization, and wellness strategies with Camilla Thompson",
              "partOfSeries": {
                "@type": "PodcastSeries",
                "name": podcast.name
              }
            }))
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
                "name": "Media & Podcasts",
                "item": "https://www.biohackme.com.au/media"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 text-gray-900">
            Media
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            Check out BiohackMe in the news and podcasts. From TV appearances on 7News to features in major publications like Sydney Morning Herald, Women's Health, and Daily Mail.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
            Click on any media item to view the full feature or listen to the podcast.
          </p>

          {/* Quick Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => document.getElementById('media-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              📺 Media Features
            </button>
            <button
              onClick={() => document.getElementById('podcasts')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-sky to-ocean text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              🎧 Podcasts
            </button>
            <button
              onClick={() => document.getElementById('featured-in')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              ⭐ Featured In
            </button>
          </div>
        </motion.div>

        {/* Main Media Hero Image */}
        <div className="mb-16 text-center">
          <motion.a
            href="https://static.wixstatic.com/media/f5168e_cc5547cc59fd49d3a4b6f7ed58f721e3~mv2.png/v1/fill/w_1123,h_667,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-07-21%20at%2012_27_11.png"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <img
              src="https://static.wixstatic.com/media/f5168e_cc5547cc59fd49d3a4b6f7ed58f721e3~mv2.png/v1/fill/w_1123,h_667,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-07-21%20at%2012_27_11.png"
              alt="Camilla Media Feature"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow hover:scale-105 transition-transform duration-300"
            />
          </motion.a>
        </div>

        {/* Media Gallery Grid */}
        <motion.div
          id="media-gallery"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative"
          style={{ zIndex: 1 }}
        >
          {mediaImages.map((media, index) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer relative"
            >
              {media.link ? (
                <a href={media.link} target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src={media.image}
                    alt={media.alt}
                    className="w-full rounded-lg shadow-lg transition-all duration-500 ease-in-out transform-gpu origin-centre
                      md:hover:scale-[2] md:hover:z-[100] md:hover:shadow-2xl md:hover:relative"
                    style={{ transformOrigin: 'centre centre' }}
                  />
                </a>
              ) : (
                <img 
                  src={media.image}
                  alt={media.alt}
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Featured In Section */}
        <motion.div
          id="featured-in"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-serif font-bold mb-12 text-gray-900">
            Featured In
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-12">
            {featuredLogos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={logo.image}
                  alt={logo.alt}
                  className="max-w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Podcasts Section */}
        <motion.div
          id="podcasts"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900 text-center">
            Podcast Appearances
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Listen to Camilla's expert insights on biohacking, wellness, and health optimization across these popular podcasts.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcastEpisodes.map((podcast, index) => (
              <motion.a
                key={podcast.id}
                href={podcast.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gradient-to-br from-sky/10 to-ocean/10 hover:from-sky/20 hover:to-ocean/20 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-sky/20 hover:border-ocean/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ocean to-sky rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-ocean group-hover:text-sky transition-colors mb-1">
                      {podcast.name}
                    </h3>
                    <p className="text-sm text-gray-600">Listen on Apple Podcasts →</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Take a Peak Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-serif font-bold mb-12 text-gray-900">
            Take a peak
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="https://static.wixstatic.com/media/f5168e_b328fe2f8cbb42489965557caadc5f5c~mv2.jpg/v1/fill/w_869,h_815,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot_20241018_161613_SMH_edited.jpg" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_b328fe2f8cbb42489965557caadc5f5c~mv2.jpg/v1/fill/w_869,h_815,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot_20241018_161613_SMH_edited.jpg"
                alt="SMH Feature"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
            <a href="https://static.wixstatic.com/media/f5168e_d200fb3dd8e54aba828f621d5b61c98d~mv2.png/v1/fill/w_807,h_815,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screen%20Shot%202024-10-18%20at%2011_58_57%20am_PNG.png" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_d200fb3dd8e54aba828f621d5b61c98d~mv2.png/v1/fill/w_807,h_815,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screen%20Shot%202024-10-18%20at%2011_58_57%20am_PNG.png"
                alt="Media Feature"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
            <a href="https://static.wixstatic.com/media/f5168e_44c7c01a32d347a4a09c7d28a3b9632d~mv2.png/v1/fill/w_891,h_959,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20-%20Daily%20Mail.png" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_44c7c01a32d347a4a09c7d28a3b9632d~mv2.png/v1/fill/w_891,h_959,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Camilla%20-%20Daily%20Mail.png"
                alt="Daily Mail Feature"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
            <a href="https://static.wixstatic.com/media/f5168e_f6ef66ea57fb424482f758dc41687b4d~mv2.jpg/v1/fill/w_815,h_574,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kanebridge.jpg" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_f6ef66ea57fb424482f758dc41687b4d~mv2.jpg/v1/fill/w_815,h_574,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kanebridge.jpg"
                alt="Kanebridge Feature"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
            <a href="https://static.wixstatic.com/media/f5168e_77e89e34da4945b08c7149a60e45fcfd~mv2.jpg/v1/fill/w_815,h_574,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/kanebridge%202.jpg" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_77e89e34da4945b08c7149a60e45fcfd~mv2.jpg/v1/fill/w_815,h_574,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/kanebridge%202.jpg"
                alt="Kanebridge Feature 2"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
            <a href="https://static.wixstatic.com/media/f5168e_b73e83a9febc47a88bc90214f30579df~mv2.jpg/v1/crop/x_2899,y_477,w_3821,h_3541/fill/w_762,h_778,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/697A6402.jpg" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://static.wixstatic.com/media/f5168e_b73e83a9febc47a88bc90214f30579df~mv2.jpg/v1/crop/x_2899,y_477,w_3821,h_3541/fill/w_762,h_778,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/697A6402.jpg"
                alt="Professional Photo"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
          </div>
        </motion.div>

        {/* About Camilla Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">ABOUT CAMILLA</h2>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Nutritionist, Health Coach, PCC Coach, Biohacker, Wellbeing Expert, Keynote Speaker and Behaviour Change Expert
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A passionate advocate for personalised and preventative health, Camilla emphasises the importance of bio-
                individuality and the integration of ancient therapies with modern technologies. Camilla is committed to 
                empowering individuals to supercharge their lives, one biohack at a time.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://static.wixstatic.com/media/6b4c52_85dfde95f6da4f09aff43b94bf0ee271~mv2.jpeg/v1/crop/x_30,y_0,w_2892,h_2953/fill/w_320,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unknown.jpeg"
                alt="Camilla Arnoldussen"
                className="w-64 h-64 rounded-full mx-auto object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
            TESTIMONIALS
          </h3>
          <blockquote className="text-xl italic text-gray-700 text-center mb-4">
            "{testimonialQuote}"
          </blockquote>
          <footer className="text-lg font-semibold text-gray-900 text-center">
            — Angelique Posticescu, National Workplace Experience Manager, Lendlease
          </footer>
        </div>

        {/* Freebie Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Download my FREE BIOHACKME GUIDE!</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                I've spent a long time perfecting this guide to offer you the ideal starting point for your biohacking journey. 
                WHAT'S IN THIS GUIDE? ✓ WTF is Biohacking? ✓ What is a Biohacker Mindset? ✓ Biohacking Framework 
                ✓ Biohacking on a Budget ✓ Biohacking Technologies ✓ Top 10 Biohacks This guide provides all the information, 
                tips, and tricks you need to get started.
              </p>
              <Link 
                to="/freebie"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Get Free Guide
              </Link>
            </div>
            <div className="text-center">
              <img 
                src="https://static.wixstatic.com/media/f5168e_4eb5195a39e748799d4d724eaf922d8d~mv2.png/v1/crop/x_0,y_399,w_4001,h_3702/fill/w_762,h_705,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Freebie.png"
                alt="BiohackMe Guide"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <Footer />
    </>
  )
}
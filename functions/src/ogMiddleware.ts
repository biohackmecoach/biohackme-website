import * as functions from "firebase-functions";
import fetch from "node-fetch";

// Page-specific OG metadata
const pageMetadata: Record<string, {
  title: string;
  description: string;
  image: string;
  type?: string;
}> = {
  "/": {
    title: "BiohackMe | Australia's Leading Biohacking Coach",
    description: "Transform your health with evidence-based biohacking strategies. Camilla Thompson offers DNA testing, longevity programs and personalised health optimisation coaching.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  },
  "/the-upgrade": {
    title: "The Upgrade | VIP Longevity Coaching Program",
    description: "12-week VIP longevity coaching program with Camilla Thompson. Transform your biological age through personalised biohacking protocols.",
    image: "https://www.biohackme.com.au/images/upgrade-v3.png",
  },
  "/guide": {
    title: "Free Biohacking Guide | What if Everything About Ageing is Outdated?",
    description: "Download your FREE guide to defy the traditional limitations of ageing through science-backed biohacking strategies.",
    image: "https://www.biohackme.com.au/images/Freebie.webp",
  },
  "/masterclass": {
    title: "Biohacking Basics Masterclass | BiohackMe",
    description: "Learn the fundamentals of biohacking in this comprehensive masterclass. Evidence-based strategies for health optimisation.",
    image: "https://www.biohackme.com.au/images/masterclass-preview.jpg",
  },
  "/about": {
    title: "About Camilla Thompson | BiohackMe Coach",
    description: "Meet Camilla Thompson - Nutritionist, Health Coach, Biohacker, and Founder of the BiohackMe framework.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  },
  "/talks": {
    title: "Keynote Speaker & Corporate Wellness | BiohackMe",
    description: "Book Camilla Thompson for keynote speaking, corporate wellness programs, and biohacking workshops.",
    image: "https://www.biohackme.com.au/images/camilla-speaking.jpg",
  },
  "/consultancy": {
    title: "Corporate Wellness Consultancy | BiohackMe",
    description: "Transform your workplace with evidence-based corporate wellness programs. Boost productivity through biohacking.",
    image: "https://www.biohackme.com.au/images/corporate-wellness.jpg",
  },
  "/retreats": {
    title: "Biohacking Retreats | BiohackMe",
    description: "Immersive biohacking retreats combining cutting-edge wellness technologies with ancient healing practices.",
    image: "https://www.biohackme.com.au/images/retreat-preview.jpg",
  },
  "/my-book": {
    title: "BiohackMe Book | Camilla Thompson",
    description: "The definitive guide to biohacking your health and longevity. Science-backed strategies for optimal performance.",
    image: "https://www.biohackme.com.au/images/book-cover.jpg",
  },
  "/superchargeyourlife": {
    title: "Supercharge Your Life | Personal Coaching | BiohackMe",
    description: "1-on-1 coaching programs to optimise your health, energy, and performance. Personalised biohacking protocols.",
    image: "https://www.biohackme.com.au/images/coaching-preview.jpg",
  },
  "/blog": {
    title: "Biohacking Blog | BiohackMe",
    description: "Latest insights on biohacking, longevity, health optimisation, and wellness from Camilla Thompson.",
    image: "https://www.biohackme.com.au/images/blog-preview.jpg",
  },
  "/shop": {
    title: "Biohacking Products | BiohackMe Shop",
    description: "Curated biohacking products and supplements recommended by Camilla Thompson.",
    image: "https://www.biohackme.com.au/images/shop-preview.jpg",
  },
  "/freebie": {
    title: "Free Biohacking Resources | BiohackMe",
    description: "Download free biohacking guides, checklists, and resources to start your health optimisation journey.",
    image: "https://www.biohackme.com.au/images/Freebie.webp",
  },
  "/contact": {
    title: "Contact BiohackMe | Book a Consultation",
    description: "Get in touch with Camilla Thompson for coaching inquiries, speaking engagements, or corporate consultations.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  },
  "/assessment": {
    title: "Biohacking Assessment | Discover Your Health Score",
    description: "Take the free biohacking assessment to discover your current health status and get personalised recommendations.",
    image: "https://www.biohackme.com.au/images/assessment-preview.jpg",
  },
  "/dna-package": {
    title: "DNA Testing & Analysis | BiohackMe",
    description: "Comprehensive DNA testing and personalised health recommendations based on your unique genetic profile.",
    image: "https://www.biohackme.com.au/images/dna-package.jpg",
  },
  "/media": {
    title: "Media & Press | BiohackMe",
    description: "Camilla Thompson in the media. Press features, podcasts, and interviews on biohacking.",
    image: "https://www.biohackme.com.au/images/media-preview.jpg",
  },
  "/privacy-policy": {
    title: "Privacy Policy | BiohackMe",
    description: "BiohackMe privacy policy - how we collect, use, and protect your personal information.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  },
  "/terms-of-service": {
    title: "Terms of Service | BiohackMe",
    description: "BiohackMe terms of service and conditions of use.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  },
};

// Social media crawler user agents
const crawlerPatterns = [
  "facebookexternalhit",
  "Facebot",
  "LinkedInBot",
  "Twitterbot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Pinterest",
  "Discordbot",
];

function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;
  return crawlerPatterns.some(pattern =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
}

function getMetadataForPath(requestPath: string): typeof pageMetadata[string] {
  // Normalize path
  const normalizedPath = requestPath.toLowerCase().replace(/\/$/, "") || "/";

  // Check for exact match
  if (pageMetadata[normalizedPath]) {
    return pageMetadata[normalizedPath];
  }

  // Check for blog post pattern
  if (normalizedPath.startsWith("/blog/")) {
    return {
      title: "Blog Post | BiohackMe",
      description: "Read the latest biohacking insights and health optimisation tips from Camilla Thompson.",
      image: "https://www.biohackme.com.au/images/blog-preview.jpg",
    };
  }

  // Default fallback
  return {
    title: "BiohackMe | Australia's Leading Biohacking Coach",
    description: "Transform your health with evidence-based biohacking strategies. Camilla Thompson offers DNA testing, longevity programs and personalised health optimisation coaching.",
    image: "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
  };
}

function generateCrawlerHtml(metadata: typeof pageMetadata[string], requestPath: string): string {
  const canonicalUrl = `https://www.biohackme.com.au${requestPath}`;

  // Minimal HTML just for crawlers to parse OG tags
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">

  <!-- Open Graph -->
  <meta property="og:type" content="${metadata.type || 'website'}">
  <meta property="og:site_name" content="BiohackMe">
  <meta property="og:locale" content="en_AU">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="og:image" content="${metadata.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="627">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">
  <meta name="twitter:image" content="${metadata.image}">
</head>
<body>
  <h1>${metadata.title}</h1>
  <p>${metadata.description}</p>
  <a href="${canonicalUrl}">Visit BiohackMe</a>
</body>
</html>`;
}

// Cache the base HTML template
let cachedBaseHtml: string | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getBaseHtml(): Promise<string> {
  const now = Date.now();
  if (cachedBaseHtml && (now - cacheTime) < CACHE_DURATION) {
    return cachedBaseHtml;
  }

  try {
    // Fetch the actual index.html from Firebase Hosting using the internal path
    // This path is configured to bypass the function rewrite
    const response = await fetch("https://www.biohackme.com.au/__internal/base.html", {
      headers: {
        "User-Agent": "BiohackMe-Internal/1.0",
      },
    });

    if (response.ok) {
      cachedBaseHtml = await response.text();
      cacheTime = now;
      return cachedBaseHtml;
    }
  } catch (error) {
    console.error("Error fetching base HTML:", error);
  }

  // Fallback minimal HTML if fetch fails
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiohackMe</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}

function injectOgTags(html: string, metadata: typeof pageMetadata[string], requestPath: string): string {
  const canonicalUrl = `https://www.biohackme.com.au${requestPath}`;

  // Replace existing OG tags
  let modifiedHtml = html;

  // Replace title
  modifiedHtml = modifiedHtml.replace(
    /<title>[^<]*<\/title>/,
    `<title>${metadata.title}</title>`
  );

  // Replace meta description
  modifiedHtml = modifiedHtml.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${metadata.description}"`
  );

  // Replace canonical
  modifiedHtml = modifiedHtml.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OG tags
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${metadata.title}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${metadata.description}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${metadata.image}"`
  );

  // Replace Twitter tags
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${metadata.title}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${metadata.description}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${metadata.image}"`
  );

  return modifiedHtml;
}

export const ogMiddleware = functions.https.onRequest(async (req, res) => {
  const userAgent = req.get("user-agent") || "";
  const requestPath = req.path || "/";

  // Skip for static assets
  if (requestPath.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf|pdf|json|xml|txt)$/i)) {
    res.status(404).send("Not found");
    return;
  }

  const metadata = getMetadataForPath(requestPath);

  // If it's a crawler, serve minimal HTML with correct OG tags
  if (isCrawler(userAgent)) {
    const html = generateCrawlerHtml(metadata, requestPath);
    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.status(200).send(html);
    return;
  }

  // For regular users, fetch base HTML and inject dynamic OG tags
  try {
    const baseHtml = await getBaseHtml();
    const modifiedHtml = injectOgTags(baseHtml, metadata, requestPath);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("Cache-Control", "public, max-age=300"); // Cache for 5 minutes
    res.status(200).send(modifiedHtml);
  } catch (error) {
    console.error("Error serving page:", error);
    res.status(500).send("Internal Server Error");
  }
});

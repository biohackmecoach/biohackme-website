#!/bin/bash
# Content scraping script

echo "🕷️ Starting BiohackMe content scraper..."

# Check if scraper directory exists
if [ ! -d "scraper" ]; then
    echo "📁 Creating scraper directory..."
    mkdir -p scraper
fi

# Navigate to scraper directory
cd scraper

# Install scraper dependencies if needed
if [ ! -f "package.json" ]; then
    echo "📦 Initializing scraper..."
    npm init -y
    npm install puppeteer cheerio firebase-admin
fi

# Create scraper if it doesn't exist
if [ ! -f "index.js" ]; then
    echo "📝 Creating scraper script..."
    cat > index.js << 'EOF'
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const LOCAL_PATH = '/Users/tony/Downloads/us.sitesucker.mac.sitesucker-pro/www.biohackme.com.au';
const LIVE_URL = 'https://www.biohackme.com.au';

async function scrapeLocalContent() {
    console.log('📂 Scraping local content...');
    const results = {};
    
    try {
        const files = await fs.readdir(LOCAL_PATH);
        const htmlFiles = files.filter(f => f.endsWith('.html'));
        
        for (const file of htmlFiles) {
            const content = await fs.readFile(path.join(LOCAL_PATH, file), 'utf-8');
            const $ = cheerio.load(content);
            
            // Remove scripts and styles
            $('script').remove();
            $('style').remove();
            
            results[file] = {
                title: $('title').text(),
                meta_description: $('meta[name="description"]').attr('content') || '',
                content: $('body').text().trim(),
                images: $('img').map((i, el) => $(el).attr('src')).get()
            };
            
            console.log(`✅ Scraped: ${file}`);
        }
    } catch (error) {
        console.error('Error scraping local files:', error);
    }
    
    return results;
}

async function scrapeLiveSite() {
    console.log('🌐 Scraping live site...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const results = {};
    
    const urls = [
        '/',
        '/blog',
        '/contact',
        '/copy-of-contact',
        '/freebie',
        '/my-book',
        '/media',
        '/superchargeyourlife',
        '/talks'
    ];
    
    for (const url of urls) {
        try {
            await page.goto(LIVE_URL + url, { waitUntil: 'networkidle2' });
            
            const data = await page.evaluate(() => {
                return {
                    title: document.title,
                    meta_description: document.querySelector('meta[name="description"]')?.content || '',
                    content: document.body.innerText,
                    images: Array.from(document.querySelectorAll('img')).map(img => img.src)
                };
            });
            
            results[url] = data;
            console.log(`✅ Scraped: ${url}`);
        } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
        }
    }
    
    await browser.close();
    return results;
}

async function main() {
    console.log('🚀 Starting content migration...');
    
    const localContent = await scrapeLocalContent();
    const liveContent = await scrapeLiveSite();
    
    const merged = {
        local: localContent,
        live: liveContent,
        timestamp: new Date().toISOString()
    };
    
    await fs.writeFile('scraped-content.json', JSON.stringify(merged, null, 2));
    
    console.log('✅ Content scraped and saved to scraped-content.json');
    console.log(`📊 Scraped ${Object.keys(localContent).length} local files`);
    console.log(`📊 Scraped ${Object.keys(liveContent).length} live pages`);
}

main().catch(console.error);
EOF
fi

# Run the scraper
echo "🚀 Running scraper..."
node index.js

echo "✅ Scraping complete! Check scraper/scraped-content.json"
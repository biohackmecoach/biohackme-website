# Design Requirements for BiohackMe React + Firebase

## 📐 ACTION REQUIRED: Analyze Existing Design

Since we're recreating the existing biohackme.com.au site, the designs are already live. However, we need to extract and document the design system for consistent implementation.

### Design Extraction Tasks:
- [ ] Screenshot all pages at desktop (1280px)
- [ ] Screenshot all pages at tablet (768px)
- [ ] Screenshot all pages at mobile (360px)
- [ ] Extract color palette from existing site
- [ ] Document typography (fonts, sizes, weights)
- [ ] Identify component patterns
- [ ] Note animations and interactions
- [ ] Extract icons and graphics

### Current Site Analysis:
Based on initial review of biohackme.com.au:
- **Primary Colors**: Health/wellness focused (greens, blues)
- **Typography**: Clean, modern sans-serif
- **Layout**: Full-width sections with centered content
- **Style**: Professional, trustworthy, wellness-oriented

## 🎨 Design System to Extract

### Color Palette
```css
/* To be extracted from live site */
:root {
  --primary: /* Extract from site */;
  --secondary: /* Extract from site */;
  --accent: /* Extract from site */;
  --text-primary: /* Extract from site */;
  --text-secondary: /* Extract from site */;
  --background: /* Extract from site */;
  --surface: /* Extract from site */;
  --error: /* Extract from site */;
  --success: /* Extract from site */;
}
```

### Typography
```css
/* To be extracted from live site */
--font-primary: /* Main font family */
--font-secondary: /* Secondary font if any */
--font-size-base: 16px;
--font-size-h1: /* Extract */;
--font-size-h2: /* Extract */;
--font-size-h3: /* Extract */;
--font-size-body: /* Extract */;
--font-size-small: /* Extract */;
--line-height: /* Extract */;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

### Spacing System
```css
/* Consistent spacing scale */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

## 📱 Mobile-First Breakpoints
```scss
// Mobile first approach
$mobile: 360px;    // Minimum supported
$tablet: 768px;    // Tablet portrait
$desktop: 1280px;  // Desktop
$wide: 1920px;     // Wide screens
```

## 🧩 Component Patterns to Recreate

### Header/Navigation
- [ ] Logo placement and size
- [ ] Menu items and structure
- [ ] Mobile hamburger menu
- [ ] Sticky header behavior
- [ ] CTA buttons in header

### Hero Section
- [ ] Background image/video
- [ ] Headline styling
- [ ] Subheadline styling
- [ ] CTA button design
- [ ] Mobile adaptation

### Content Sections
- [ ] Section padding/margins
- [ ] Content max-width
- [ ] Image placement
- [ ] Text alignment
- [ ] Card components

### Forms
- [ ] Input field styling
- [ ] Button designs
- [ ] Validation states
- [ ] Label positioning
- [ ] Mobile keyboard handling

### Footer
- [ ] Layout structure
- [ ] Link organization
- [ ] Social media icons
- [ ] Newsletter signup
- [ ] Copyright section

## 🎯 Key Pages to Match

### Homepage
- Hero with compelling headline
- Services/benefits section
- About preview
- Testimonials
- CTA sections
- Newsletter signup

### About Page (currently /copy-of-contact)
- Personal story
- Credentials
- Philosophy
- Call to action

### Book Page
- Book cover image
- Description
- Amazon buy buttons
- Reviews/endorsements
- Author bio

### Coaching Program Page
- Program overview
- Benefits list
- Pricing
- Testimonials
- Application/signup form

### Blog
- Post grid/list
- Featured images
- Categories/tags
- Search functionality
- Pagination

## 🔄 Interactions & Animations

### Hover States
- [ ] Button hover effects
- [ ] Link underlines
- [ ] Card elevations
- [ ] Image overlays

### Transitions
- [ ] Page transitions
- [ ] Menu animations
- [ ] Scroll animations
- [ ] Form submissions

### Loading States
- [ ] Skeleton screens
- [ ] Spinners
- [ ] Progress indicators
- [ ] Success messages

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance
- Minimum contrast ratio 4.5:1 for normal text
- Minimum contrast ratio 3:1 for large text
- Touch targets minimum 44x44px
- Keyboard navigation support
- Screen reader compatibility
- Alt text for all images
- Proper heading hierarchy
- Form labels and errors

### Mobile Accessibility
- Large touch targets
- Readable font sizes (min 14px)
- Proper spacing between elements
- Gesture alternatives
- Orientation support

## 🎨 Design Extraction Process

### Step 1: Screenshot Collection
```bash
# Create screenshots directory
mkdir -p designs/screenshots

# Use Puppeteer to capture all pages
node scraper/screenshot-generator.js
```

### Step 2: Color Extraction
1. Use browser DevTools color picker
2. Document in CSS variables
3. Create color palette image

### Step 3: Typography Analysis
1. Inspect font families in DevTools
2. Note all font sizes and weights
3. Document line heights and spacing

### Step 4: Component Library
1. Identify reusable patterns
2. Create component specifications
3. Document variations and states

## 📋 Design Checkpoints

### Before Development
- [ ] All pages screenshotted
- [ ] Colors documented
- [ ] Typography documented
- [ ] Component patterns identified
- [ ] Mobile designs verified

### During Development
- [ ] Components match original exactly
- [ ] Responsive behavior correct
- [ ] Animations implemented
- [ ] Accessibility verified
- [ ] Performance optimized

### Before Launch
- [ ] Side-by-side comparison with original
- [ ] Mobile experience tested on devices
- [ ] Cross-browser testing complete
- [ ] Lighthouse scores acceptable
- [ ] Client approval received

## 🚨 Critical Design Elements

### Must Preserve
1. **Brand Identity**: Logo, colors, fonts
2. **User Experience**: Navigation flow, form layouts
3. **Content Hierarchy**: Information architecture
4. **Trust Signals**: Testimonials, credentials, endorsements
5. **Conversion Elements**: CTAs, forms, buy buttons

### Can Improve
1. **Performance**: Image optimization, lazy loading
2. **Mobile Experience**: Better touch interactions
3. **Accessibility**: WCAG compliance
4. **SEO Elements**: Meta tags, structured data
5. **Modern Features**: Dark mode, PWA capabilities

## 📝 Design Documentation

All design decisions and extractions should be documented in:
- `/docs/design-system.md` - Complete design system
- `/docs/components.md` - Component specifications
- `/public/style-guide.html` - Living style guide

## 🔍 Tools for Design Extraction

### Browser Extensions
- ColorZilla - Color picker
- WhatFont - Font identifier
- Pesticide - CSS layout debugger
- Wappalyzer - Technology detector

### Online Tools
- Google PageSpeed Insights
- GTmetrix
- WebAIM Contrast Checker
- Mobile-Friendly Test

### Development Tools
- Chrome DevTools
- React Developer Tools
- Lighthouse
- axe Accessibility Checker

---
*Generated by Ultimate Prompt Maker on 2025-02-03*
*Original site: https://www.biohackme.com.au/*
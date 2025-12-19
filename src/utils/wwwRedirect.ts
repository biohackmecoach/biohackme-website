/**
 * WWW Redirect Utility
 * Ensures all traffic uses www.biohackme.com.au for SEO consistency
 * Fixes Google Search Console duplicate content issue
 */

export const forceWWWRedirect = () => {
  // Only run in production
  if (import.meta.env.DEV) return;

  const hostname = window.location.hostname;

  // If on biohackme.com.au (without www), redirect to www version
  if (hostname === 'biohackme.com.au') {
    const newURL = window.location.href.replace('biohackme.com.au', 'www.biohackme.com.au');
    window.location.replace(newURL);
  }
};

/**
 * Set canonical URL for SEO
 * Tells Google which version of the URL is preferred
 */
export const setCanonicalURL = () => {
  const currentPath = window.location.pathname + window.location.search;
  const canonicalURL = `https://www.biohackme.com.au${currentPath}`;

  // Remove existing canonical tag if present
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }

  // Add new canonical tag
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = canonicalURL;
  document.head.appendChild(link);
};

import fs from 'fs';

async function checkArchiveDetails() {
  const res = await fetch('https://cakebites.pk/shop/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('scratch_shop.html', html);
  console.log('Saved scratch_shop.html, length:', html.length);
  
  // Extract key sections
  // Header / Title banner
  const pageTitle = html.match(/<h1[^>]*class=["'][^"']*page-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i)?.[0];
  console.log('Page Title element:', pageTitle);
  
  // Breadcrumbs
  const breadcrumb = html.match(/<nav[^>]*breadcrumb[^>]*>([\s\S]*?)<\/nav>/i)?.[0];
  console.log('Breadcrumb:', breadcrumb);
  
  // Result count and ordering
  const resultCount = html.match(/<p[^>]*woocommerce-result-count[^>]*>([\s\S]*?)<\/p>/i)?.[0];
  console.log('Result Count:', resultCount);
  
  const ordering = html.match(/<form[^>]*woocommerce-ordering[^>]*>([\s\S]*?)<\/form>/i)?.[0];
  console.log('Ordering form found:', !!ordering);

  // Filter widgets / Sidebar widgets
  const widgets = [...html.matchAll(/<div[^>]*class=["'][^"']*widget\s+([^"']*)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Widgets:', widgets.slice(0, 10));

  // Woolentor or Elementor widgets
  const elementorWidgets = [...html.matchAll(/data-widget_type=["']([^"']*)["']/gi)].map(m => m[1]);
  console.log('Elementor widgets:', [...new Set(elementorWidgets)]);
}

checkArchiveDetails();

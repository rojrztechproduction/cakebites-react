import fs from 'fs';

const html = fs.readFileSync('scratch_cakes.html', 'utf8');

// Title
const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
console.log('Title:', title);

// Body classes
const bodyClass = html.match(/<body[^>]*class=["']([^"']*)["']/i)?.[1];
console.log('Body classes:', bodyClass);

// Headings
const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H1:', h1s);
console.log('H2 (first 10):', h2s.slice(0, 10));

// Check for breadcrumbs
const breadcrumb = html.match(/<nav[^>]*woocommerce-breadcrumb[^>]*>([\s\S]*?)<\/nav>/i)?.[0];
console.log('Breadcrumbs:', breadcrumb ? breadcrumb.replace(/<[^>]+>/g, ' ').trim() : 'None');

// Check products listed
const productTitles = [...html.matchAll(/woocommerce-loop-product__title[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].trim());
console.log('Product count:', productTitles.length);
console.log('Products:', productTitles.slice(0, 10));

// Check filters/sidebar
const hasFilter = html.includes('filter') || html.includes('sidebar') || html.includes('widget');
console.log('Has filter/sidebar:', hasFilter);

// Check pagination
const pagination = html.match(/<nav[^>]*woocommerce-pagination[^>]*>([\s\S]*?)<\/nav>/i)?.[0];
console.log('Pagination:', pagination ? 'Found' : 'None');

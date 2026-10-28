import { SEED_SITES } from '@/lib/seed';
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://east-smart-forest-tourism.vercel.app';
export default function sitemap() {
  const pages = ['', '/sites', '/opportunites', '/a-propos', '/contact'];
  const out = [];
  for (const l of ['fr', 'en']) {
    pages.forEach((p) => out.push({ url: `${BASE}/${l}${p}` }));
    SEED_SITES.forEach((s) => out.push({ url: `${BASE}/${l}/sites/${s.slug}` }));
  }
  return out;
}

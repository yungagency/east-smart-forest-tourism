import { SEED_SITES } from '@/lib/seed';
import { FAUNA } from '@/lib/fauna';
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://east-smart-forest-tourism-i8w5.vercel.app';
export default function sitemap() {
  const pages = ['', '/sites', '/carte', '/faune', '/visite-3d', '/visite-360', '/services', '/services/inscription', '/opportunites', '/a-propos', '/contact'];
  const out = [];
  for (const l of ['fr', 'en']) {
    pages.forEach((p) => out.push({ url: `${BASE}/${l}${p}` }));
    SEED_SITES.forEach((s) => out.push({ url: `${BASE}/${l}/sites/${s.slug}` }));
    FAUNA.forEach((a) => out.push({ url: `${BASE}/${l}/faune/${a.slug}` }));
  }
  return out;
}

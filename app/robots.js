import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/fr/services/reserver', '/en/services/reserver', '/fr/mon-voyage', '/en/mon-voyage'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

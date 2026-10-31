import { SEED_SITES } from '@/lib/seed';
import { FAUNA } from '@/lib/fauna';
import { SITE_URL } from '@/lib/seo';

const PAGES = [
  ['', 1, 'weekly'], ['/sites', 0.9, 'weekly'], ['/carte', 0.8, 'monthly'], ['/faune', 0.9, 'weekly'], ['/faune/quiz', 0.5, 'monthly'],
  ['/visite-3d', 0.7, 'monthly'], ['/visite-360', 0.4, 'monthly'], ['/services', 0.7, 'weekly'], ['/services/inscription', 0.4, 'yearly'],
  ['/opportunites', 0.7, 'monthly'], ['/a-propos', 0.6, 'monthly'], ['/contact', 0.5, 'yearly'], ['/credits', 0.2, 'yearly'], ['/mentions-legales', 0.1, 'yearly'],
];

export default function sitemap() {
  const now = new Date();
  const all = [
    ...PAGES,
    ...SEED_SITES.map((s) => [`/sites/${s.slug}`, 0.8, 'monthly']),
    ...FAUNA.map((a) => [`/faune/${a.slug}`, a.short ? 0.5 : 0.7, 'monthly']),
  ];
  const out = [];
  for (const [path, priority, changeFrequency] of all) {
    for (const l of ['fr', 'en']) {
      out.push({
        url: `${SITE_URL}/${l}${path}`, lastModified: now, changeFrequency, priority,
        alternates: { languages: { fr: `${SITE_URL}/fr${path}`, en: `${SITE_URL}/en${path}` } },
      });
    }
  }
  return out;
}

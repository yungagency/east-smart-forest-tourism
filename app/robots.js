import { SITE_URL } from '@/lib/seo';

const DISALLOW = ['/admin', '/fr/services/reserver', '/en/services/reserver'];
// Moteurs de recherche et assistants IA (ChatGPT, Claude, Perplexity, Gemini…) explicitement autorisés
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Bingbot'];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

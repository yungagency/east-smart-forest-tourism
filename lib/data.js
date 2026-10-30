import { getSupabase } from './supabase';
import { SEED_SITES, SEED_OPPORTUNITIES } from './seed';

// Lit Supabase si configuré, sinon les données intégrées (mode démo).
async function fromDb(table, fallback, filter) {
  const sb = getSupabase();
  if (!sb) return fallback;
  try {
    let q = sb.from(table).select('*').eq('published', true).order('sort', { ascending: true });
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw error;
    // Base encore vide (données pas encore importées depuis l'admin) : on garde le contenu intégré
    return data && data.length ? data : fallback;
  } catch (e) {
    console.error(`[data] ${table}:`, e.message);
    return fallback;
  }
}

export async function getSites() {
  return fromDb('sites', SEED_SITES);
}

export async function getSite(slug) {
  const sites = await getSites();
  return sites.find((s) => s.slug === slug) || null;
}

export async function getOpportunities() {
  return fromDb('opportunities', SEED_OPPORTUNITIES);
}

export function t(obj, field, lang) {
  return obj?.[`${field}_${lang}`] || obj?.[`${field}_fr`] || '';
}

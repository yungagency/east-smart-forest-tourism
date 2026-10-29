'use client';
import { getSupabase } from './supabase';
import { SITE } from './site-config';

// Enregistre un formulaire dans Supabase ; à défaut (Supabase non configuré ou erreur),
// prépare un message WhatsApp vers la plateforme. Renvoie 'db' | 'whatsapp'.
export async function submitForm(table, payload, whatsappText) {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from(table).insert(payload);
    if (!error) return 'db';
    console.error(`[submit] ${table}:`, error.message);
  }
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappText)}`;
  window.open(url, '_blank', 'noopener');
  return 'whatsapp';
}

export function lines(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k} : ${v}`)
    .join('\n');
}

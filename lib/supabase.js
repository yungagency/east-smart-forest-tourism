import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(url && key);

let client = null;
export function getSupabase() {
  if (!hasSupabase) return null;
  if (!client) client = createClient(url, key, { auth: { persistSession: typeof window !== 'undefined' } });
  return client;
}

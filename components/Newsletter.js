'use client';
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { SITE } from '@/lib/site-config';

// Inscription aux nouvelles du projet (enregistrée dans la table « messages », objet « autre »)
export default function Newsletter({ lang }) {
  const en = lang === 'en';
  const [state, setState] = useState('idle');
  async function onSubmit(e) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') || '').trim();
    if (!email) return;
    const sb = getSupabase();
    if (!sb) { window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Inscription aux nouvelles du projet : ${email}`)}`, '_blank', 'noopener'); setState('ok'); return; }
    setState('sending');
    const { error } = await sb.from('messages').insert({ name: 'Abonné newsletter', email, subject: 'autre', message: `Inscription aux nouvelles du projet (${lang})` });
    setState(error ? 'err' : 'ok');
  }
  if (state === 'ok') return <p className="nl-ok">{en ? 'Thank you! You will receive our news.' : 'Merci ! Vous recevrez nos nouvelles.'}</p>;
  return (
    <form className="nl" onSubmit={onSubmit}>
      <label htmlFor="nl-email">{en ? 'Get our news (new sites, events, field missions)' : 'Recevoir nos nouvelles (nouveaux sites, événements, missions terrain)'}</label>
      <div>
        <input id="nl-email" name="email" type="email" required placeholder={en ? 'Your email' : 'Votre email'} autoComplete="email" />
        <button className="btn btn-primary" disabled={state === 'sending'}>{en ? 'Subscribe' : "S'inscrire"}</button>
      </div>
      {state === 'err' && <small>{en ? 'Error, please try again.' : 'Erreur, réessayez.'}</small>}
    </form>
  );
}

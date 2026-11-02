'use client';
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export const DOSSIER_URL = '/docs/dossier-investisseurs-east-smart-forest.pdf';

// Dossier investisseurs : coordonnées enregistrées (table « messages », objet « investissement »),
// puis téléchargement. Le lien reste accessible si l'enregistrement échoue.
export default function DossierDownload({ lang }) {
  const en = lang === 'en';
  const [state, setState] = useState('idle');
  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const email = String(f.get('email') || '').trim();
    const org = String(f.get('org') || '').trim();
    if (!name || !email) return;
    setState('sending');
    const sb = getSupabase();
    if (sb) {
      await sb.from('messages').insert({
        name, email, subject: 'investissement',
        message: `Téléchargement du dossier investisseurs (${lang})${org ? ` · Organisation : ${org}` : ''}`,
      }).then(() => {}, () => {});
    }
    setState('ok');
    window.open(DOSSIER_URL, '_blank', 'noopener');
  }
  return (
    <div className="dossier-box">
      <div className="dossier-txt">
        <h2>{en ? 'Investor & partner brief' : 'Dossier investisseurs et partenaires'}</h2>
        <p>{en
          ? '10-page PDF (in French): the territory, the public context, accommodation gaps, six concrete projects, the roadmap and where the project stands. All figures are sourced.'
          : 'PDF de 10 pages : le territoire, le contexte public, le manque d’hébergement, six chantiers concrets, la feuille de route et l’état d’avancement. Tous les chiffres sont sourcés.'}</p>
      </div>
      {state === 'ok' ? (
        <div className="dossier-form">
          <p><b>{en ? 'Thank you!' : 'Merci !'}</b> {en ? 'The download should start. If not:' : 'Le téléchargement va s’ouvrir. Sinon :'}</p>
          <a className="btn btn-primary" href={DOSSIER_URL} target="_blank" rel="noopener" download>{en ? 'Download the PDF' : 'Télécharger le PDF'}</a>
        </div>
      ) : (
        <form className="dossier-form" onSubmit={onSubmit}>
          <input name="name" required placeholder={en ? 'Full name' : 'Nom complet'} autoComplete="name" aria-label={en ? 'Full name' : 'Nom complet'} />
          <input name="email" type="email" required placeholder="Email" autoComplete="email" aria-label="Email" />
          <input name="org" placeholder={en ? 'Organisation (optional)' : 'Organisation (facultatif)'} autoComplete="organization" aria-label="Organisation" />
          <button className="btn btn-primary" disabled={state === 'sending'}>{en ? 'Get the brief' : 'Recevoir le dossier'}</button>
          <small className="muted">{en ? 'Your details are only used to follow up on your interest.' : 'Vos coordonnées servent uniquement à donner suite à votre intérêt.'}</small>
        </form>
      )}
    </div>
  );
}

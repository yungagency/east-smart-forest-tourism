'use client';
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { SITE } from '@/lib/site-config';

export default function ContactForm({ d, lang = 'fr', defaultSubject = 'partenariat', defaultMessage = '' }) {
  const c = d.contact;
  const [state, setState] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get('name') || '').trim(),
      email: String(f.get('email') || '').trim(),
      organization: String(f.get('organization') || '').trim() || null,
      subject: String(f.get('subject') || 'autre'),
      message: String(f.get('message') || '').trim(),
    };
    if (f.get('website')) return; // pot de miel anti-spam
    const sb = getSupabase();
    if (!sb) {
      const body = `${payload.message}\n\n${payload.name}${payload.organization ? ' — ' + payload.organization : ''}\n${payload.email}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('[East Smart] ' + c.subjects[payload.subject])}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState('sending');
    const { error } = await sb.from('messages').insert(payload);
    if (error) { console.error(error); setState('err'); return; }
    setState('ok');
    e.target.reset();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row2">
        <label>{c.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
        <label>{c.email}<input name="email" type="email" required maxLength={160} autoComplete="email" /></label>
      </div>
      <div className="row2">
        <label>{c.org}<input name="organization" maxLength={160} autoComplete="organization" /></label>
        <label>{c.subject}
          <select name="subject" defaultValue={defaultSubject}>
            {Object.entries(c.subjects).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>
      <label>{c.message}<textarea name="message" required maxLength={4000} defaultValue={defaultMessage} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
      {state === 'ok' && <div className="alert alert-ok">{c.ok}</div>}
      {state === 'err' && <div className="alert alert-err">{c.err}</div>}
      <p className="form-privacy">{c.privacy} <a href={`/${lang}/mentions-legales`}>{c.privacyLink}</a></p>
      <div><button className="btn btn-dark" disabled={state === 'sending'}>{state === 'sending' ? c.sending : c.send}</button></div>
    </form>
  );
}

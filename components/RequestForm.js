'use client';
import { useState } from 'react';
import { submitForm, lines } from '@/lib/submit';

// Formulaires : réservation (booking_requests), inscription prestataire (provider_applications),
// proposition projet / terrain / partenariat (proposals). Enregistrement Supabase, sinon WhatsApp.
export default function RequestForm({ mode, t, lang, target, targetLabel, kinds, docsLabel, defaultKind }) {
  const [state, setState] = useState('idle');
  const [kind, setKind] = useState(defaultKind || 'project');
  const f = t.f;

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('website_hp')) return;
    const g = (k) => String(fd.get(k) || '').trim();
    let table; let payload; let wa;
    if (mode === 'booking') {
      table = 'booking_requests';
      payload = {
        target_ref: target || null, target_label: g('target') || targetLabel || null, name: g('name'), phone: g('phone'), email: g('email') || null,
        arrival: g('arrival') || null, departure: g('departure') || null, people: Number(g('people')) || null, message: g('message') || null, lang,
      };
      wa = `[East Smart] Demande de réservation\n${lines({ Pour: payload.target_label, Nom: payload.name, Tél: payload.phone, Email: payload.email, Arrivée: payload.arrival, Départ: payload.departure, Personnes: payload.people, Précisions: payload.message })}`;
    } else if (mode === 'provider') {
      table = 'provider_applications';
      payload = {
        business: g('business'), kind: g('kind'), town: g('town'), contact: g('contact'), phone: g('phone'), email: g('email') || null,
        description: g('description') || null, website: g('website') || null, consent: fd.get('agree') === 'on', lang,
      };
      wa = `[East Smart] Inscription prestataire\n${lines({ Établissement: payload.business, Type: payload.kind, Ville: payload.town, Contact: payload.contact, Tél: payload.phone, Email: payload.email, Description: payload.description, Web: payload.website })}`;
    } else {
      table = 'proposals';
      payload = {
        kind, name: g('name'), organization: g('organization') || null, phone: g('phone'), email: g('email') || null, location: g('location') || null,
        area: g('area') || null, has_documents: fd.get('docs') === 'on', message: g('message'), lang,
      };
      wa = `[East Smart] Proposition (${kinds[kind]})\n${lines({ Nom: payload.name, Structure: payload.organization, Tél: payload.phone, Email: payload.email, Lieu: payload.location, Superficie: payload.area, 'Documents fonciers': payload.has_documents ? 'oui' : 'non', Message: payload.message })}`;
    }
    setState('sending');
    try {
      const r = await submitForm(table, payload, wa);
      setState(r === 'db' ? 'ok' : 'wa');
      if (r === 'db') e.target.reset();
    } catch (err) {
      console.error(err);
      setState('err');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {mode === 'booking' && (
        <>
          <label>{t.bookFor}<input name="target" defaultValue={targetLabel || ''} placeholder={t.bookOther} maxLength={200} required /></label>
          <div className="row2">
            <label>{f.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
            <label>{f.phone}<input name="phone" required maxLength={40} autoComplete="tel" /></label>
          </div>
          <div className="row2">
            <label>{f.email}<input name="email" type="email" maxLength={160} autoComplete="email" /></label>
            <label>{f.people}<input name="people" type="number" min="1" max="200" defaultValue="2" /></label>
          </div>
          <div className="row2">
            <label>{f.arrival}<input name="arrival" type="date" /></label>
            <label>{f.departure}<input name="departure" type="date" /></label>
          </div>
          <label>{f.message}<textarea name="message" maxLength={3000} /></label>
        </>
      )}
      {mode === 'provider' && (
        <>
          <div className="row2">
            <label>{f.business}<input name="business" required maxLength={160} /></label>
            <label>{f.type}
              <select name="kind" defaultValue="lodging">
                {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                <option value="transport">{lang === 'en' ? 'Transport' : 'Transport'}</option>
                <option value="craft">{lang === 'en' ? 'Crafts' : 'Artisanat'}</option>
              </select>
            </label>
          </div>
          <div className="row2">
            <label>{f.townF}<input name="town" required maxLength={120} /></label>
            <label>{f.contact}<input name="contact" required maxLength={120} autoComplete="name" /></label>
          </div>
          <div className="row2">
            <label>{f.phone}<input name="phone" required maxLength={40} autoComplete="tel" /></label>
            <label>{f.email}<input name="email" type="email" maxLength={160} autoComplete="email" /></label>
          </div>
          <label>{f.description}<textarea name="description" maxLength={3000} required /></label>
          <label>{f.website}<input name="website" maxLength={200} /></label>
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 400 }}><input type="checkbox" name="agree" required style={{ width: 'auto', marginTop: 4 }} /> {f.agree}</label>
        </>
      )}
      {mode === 'proposal' && (
        <>
          <label>{t.kind}
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              {Object.entries(kinds).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <div className="row2">
            <label>{f.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
            <label>{lang === 'en' ? 'Organisation / council (optional)' : 'Structure / commune (facultatif)'}<input name="organization" maxLength={160} /></label>
          </div>
          <div className="row2">
            <label>{f.phone}<input name="phone" required maxLength={40} autoComplete="tel" /></label>
            <label>{f.email}<input name="email" type="email" maxLength={160} autoComplete="email" /></label>
          </div>
          {kind === 'land' && (
            <>
              <div className="row2">
                <label>{f.townF}<input name="location" required maxLength={160} /></label>
                <label>{lang === 'en' ? 'Area (ha or m²)' : 'Superficie (ha ou m²)'}<input name="area" maxLength={60} /></label>
              </div>
              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 400 }}><input type="checkbox" name="docs" style={{ width: 'auto', marginTop: 4 }} /> {docsLabel}</label>
            </>
          )}
          {kind !== 'land' && <label>{f.townF}<input name="location" maxLength={160} /></label>}
          <label>{f.message}<textarea name="message" required maxLength={4000} /></label>
        </>
      )}
      <input name="website_hp" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
      {state === 'ok' && <div className="alert alert-ok">{t.ok}</div>}
      {state === 'wa' && <div className="alert alert-ok">{t.okWhatsapp}</div>}
      {state === 'err' && <div className="alert alert-err">{t.err}</div>}
      <p className="form-privacy">{lang === 'en' ? 'Your details are only used to process this request.' : 'Vos informations servent uniquement à traiter cette demande.'} <a href={`/${lang}/mentions-legales`}>{lang === 'en' ? 'Privacy' : 'Confidentialité'}</a></p>
      <div><button className="btn btn-dark" disabled={state === 'sending'}>{state === 'sending' ? t.sending : t.send}</button></div>
    </form>
  );
}

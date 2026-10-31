'use client';
import { useEffect, useState } from 'react';
import { readTrip, writeTrip } from '@/lib/trip';
import { SITE } from '@/lib/site-config';

const TYPES = { site: { fr: 'Destinations', en: 'Destinations' }, animal: { fr: 'Animaux à observer', en: 'Wildlife to see' }, place: { fr: 'Hébergements et lieux', en: 'Places to stay & visit' } };

export default function TripPlanner({ lang }) {
  const [list, setList] = useState(null);
  useEffect(() => { setList(readTrip()); }, []);
  if (list === null) return null;
  const en = lang === 'en';
  const remove = (id) => { const l = list.filter((x) => x.id !== id); setList(l); writeTrip(l); };
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const text = (en ? 'My trip to the East Region of Cameroon:\n' : "Mon voyage dans la Région de l'Est du Cameroun :\n")
    + list.map((x) => `• ${x.name} : ${origin}${x.href}`).join('\n');
  if (!list.length) {
    return (
      <div className="empty-box">
        <p>{en ? 'Your trip is empty. Tap “Add to my trip” on destinations, animals or places to build it.' : 'Votre voyage est vide. Touchez « Ajouter à mon voyage » sur les destinations, les animaux ou les lieux pour le composer.'}</p>
        <a className="btn btn-green" href={`/${lang}/sites`}>{en ? 'See destinations' : 'Voir les destinations'}</a>
      </div>
    );
  }
  return (
    <div className="trip">
      {Object.entries(TYPES).map(([k, v]) => {
        const items = list.filter((x) => x.type === k);
        if (!items.length) return null;
        return (
          <div key={k} className="trip-group">
            <h2>{v[lang] || v.fr} <small>({items.length})</small></h2>
            <ul>
              {items.map((x) => (
                <li key={x.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {x.image ? <img src={x.image} alt={x.name} loading="lazy" referrerPolicy="no-referrer" /> : <span className="trip-ph" />}
                  <a href={x.href}>{x.name}</a>
                  <button type="button" onClick={() => remove(x.id)} aria-label={(en ? 'Remove ' : 'Retirer ') + x.name}>✕</button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="trip-actions">
        <a className="btn btn-green" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">{en ? 'Share on WhatsApp' : 'Partager sur WhatsApp'}</a>
        <a className="btn btn-dark" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent((en ? 'Hello, I would like help organising this trip.\n\n' : "Bonjour, j'aimerais être accompagné pour organiser ce voyage.\n\n") + text)}`} target="_blank" rel="noopener noreferrer">{en ? 'Get help organising it' : 'Me faire accompagner'}</a>
        <button type="button" className="btn btn-outline" onClick={() => window.print()}>{en ? 'Print / PDF' : 'Imprimer / PDF'}</button>
        <button type="button" className="btn btn-outline" onClick={() => { setList([]); writeTrip([]); }}>{en ? 'Clear' : 'Tout effacer'}</button>
      </div>
    </div>
  );
}

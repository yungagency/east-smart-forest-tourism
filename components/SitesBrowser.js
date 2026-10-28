'use client';
import { useState } from 'react';
import MapView from './MapView';
import SiteCardClient from './SiteCardClient';

export default function SitesBrowser({ sites, lang, d }) {
  const [cat, setCat] = useState('all');
  const cats = ['all', ...Array.from(new Set(sites.map((s) => s.category)))];
  const shown = cat === 'all' ? sites : sites.filter((s) => s.category === cat);
  const name = (s) => s[`name_${lang}`] || s.name_fr;
  const points = shown.map((s) => ({
    lat: s.lat, lng: s.lng, category: s.category, name: name(s), sub: s.commune, href: `/${lang}/sites/${s.slug}`,
  }));
  return (
    <>
      <div className="filters" role="tablist">
        {cats.map((c) => (
          <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
            {c === 'all' ? d.sites.all : d.sites.cats[c] || c}
          </button>
        ))}
      </div>
      <MapView points={points} lang={lang} />
      <p className="muted small" style={{ marginTop: 8 }}>{d.mapNote}</p>
      <div className="grid" style={{ marginTop: 32 }}>
        {shown.map((s) => <SiteCardClient key={s.slug} site={s} lang={lang} d={d} />)}
      </div>
    </>
  );
}

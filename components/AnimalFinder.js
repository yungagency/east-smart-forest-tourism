'use client';
import Link from 'next/link';
import { useState } from 'react';

// « Quel animal voulez-vous voir ? » : animal → sites → visites
export default function AnimalFinder({ animals, sites, lang, t, t3 }) {
  const [slug, setSlug] = useState('');
  const a = animals.find((x) => x.slug === slug);
  const name = (o) => o[`name_${lang}`] || o.name_fr;
  return (
    <div className="finder">
      <div>
        <h2>{t.finder}</h2>
        <p className="muted">{t.finderText}</p>
        <select value={slug} onChange={(e) => setSlug(e.target.value)} aria-label={t.choose}>
          <option value="">{t.choose}</option>
          {animals.map((x) => <option key={x.slug} value={x.slug}>{name(x)}</option>)}
        </select>
      </div>
      {a && (
        <div className="finder-result">
          <div className="finder-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.photos[0]?.src} alt="" referrerPolicy="no-referrer" />
            <div><b>{name(a)}</b><em className="sci">{a.sci}</em><Link href={`/${lang}/faune/${a.slug}`}>{t.presentation} →</Link></div>
          </div>
          <ul>
            {a.sites.map((s) => {
              const site = sites.find((x) => x.slug === s);
              if (!site) return null;
              return (
                <li key={s}>
                  <span><b>{name(site)}</b><small>{site.commune}</small></span>
                  <span className="finder-actions">
                    <Link className="btn btn-outline" href={`/${lang}/sites/${s}`}>{t.site}</Link>
                    {typeof site.lat === 'number' && <Link className="btn btn-green" href={`/${lang}/visite-3d?site=${s}`}>{t3}</Link>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

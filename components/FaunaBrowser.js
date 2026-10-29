'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function FaunaBrowser({ animals, sites, groups, iucn, lang, t }) {
  const [q, setQ] = useState('');
  const [g, setG] = useState('all');
  const [site, setSite] = useState('all');
  const name = (a) => a[`name_${lang}`] || a.name_fr;
  const siteName = (slug) => { const s = sites.find((x) => x.slug === slug); return s ? (s[`name_${lang}`] || s.name_fr) : slug; };
  const usedSites = useMemo(() => Array.from(new Set(animals.flatMap((a) => a.sites))), [animals]);

  const list = animals.filter((a) => {
    if (g !== 'all' && a.group !== g) return false;
    if (site !== 'all' && !a.sites.includes(site)) return false;
    if (q) {
      const hay = norm([a.name_fr, a.name_en, a.sci].join(' '));
      if (!hay.includes(norm(q))) return false;
    }
    return true;
  });

  return (
    <>
      <div className="fauna-tools">
        <input className="search-input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
        <select value={site} onChange={(e) => setSite(e.target.value)} aria-label={t.site}>
          <option value="all">{t.allSites}</option>
          {usedSites.map((s) => <option key={s} value={s}>{siteName(s)}</option>)}
        </select>
      </div>
      <div className="filters" style={{ marginTop: 12 }}>
        <button className={`chip ${g === 'all' ? 'on' : ''}`} onClick={() => setG('all')}>{t.allGroups}</button>
        {Object.entries(groups).map(([k, v]) => (
          <button key={k} className={`chip ${g === k ? 'on' : ''}`} onClick={() => setG(k)}>{v[lang] || v.fr}</button>
        ))}
        <span className="muted small" style={{ alignSelf: 'center', marginLeft: 6 }}>{list.length} {t.count}</span>
      </div>
      {list.length === 0 && <p className="muted">{t.none}</p>}
      <div className="grid fauna-grid">
        {list.map((a) => (
          <Link key={a.slug} href={`/${lang}/faune/${a.slug}`} className="card animal-card">
            <div className="card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.photos[0]?.src} alt={name(a)} loading="lazy" referrerPolicy="no-referrer" />
              <span className="iucn-badge" style={{ background: iucn[a.iucn].c }} title={iucn[a.iucn][lang]}>{a.iucn}</span>
            </div>
            <div className="card-body">
              <h3>{name(a)}</h3>
              <em className="sci">{a.sci}</em>
              <p>{a[`summary_${lang}`] || a.summary_fr}</p>
              <div className="card-meta"><span>{a.sites.length} {a.sites.length > 1 ? 'sites' : 'site'}</span><span>{iucn[a.iucn][lang]}</span></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

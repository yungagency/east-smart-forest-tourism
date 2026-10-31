'use client';
import { useMemo, useState } from 'react';
import FavButton from './FavButton';

const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function ServicesDirectory({ items, lang, t, layers }) {
  const [type, setType] = useState('all');
  const [town, setTown] = useState('all');
  const [q, setQ] = useState('');
  const towns = useMemo(() => Array.from(new Set(items.map((i) => i.town).filter(Boolean))).sort((a, b) => a.localeCompare(b)), [items]);
  const list = items.filter((i) => (type === 'all' || i.layer === type) && (town === 'all' || i.town === town) && (!q || norm(i.name + ' ' + i.town).includes(norm(q))));
  const showEmpty = type === 'guide' || type === 'agency' || type === 'all';

  return (
    <>
      <div className="filters" style={{ margin: '0 0 14px' }}>
        {['all', 'lodging', 'food', 'guide', 'agency'].map((k) => (
          <button key={k} className={`chip ${type === k ? 'on' : ''}`} onClick={() => setType(k)}>{k === 'all' ? t.all : t.types[k]}</button>
        ))}
      </div>
      <div className="svc-tools">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === 'en' ? 'Search by name…' : 'Rechercher par nom…'} aria-label="search" />
        <select value={town} onChange={(e) => setTown(e.target.value)} aria-label={t.town}>
          <option value="all">{t.allTowns}</option>
          {towns.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
        <a className="btn btn-green" href={`/${lang}/services/inscription`} style={{ justifyContent: 'center' }}>{t.register}</a>
      </div>
      {showEmpty && (
        <div className="empty-box" style={{ margin: '14px 0' }}>
          <p><b>{t.types.guide} · {t.types.agency}</b><br />{t.emptyGuides}</p>
          <a className="btn btn-outline" href={`/${lang}/services/inscription`}>{t.register}</a>
        </div>
      )}
      {(type === 'all' || type === 'lodging' || type === 'food') && (
        <>
          <p className="muted small">{list.length} {lang === 'en' ? 'listings' : 'adresses'} · {t.fromOsm}</p>
          <div className="svc-grid">
            {list.map((i) => (
              <div key={i.id} className="svc">
                <div className="svc-top">
                  <span className="tm-tag" style={{ background: layers[i.layer].c }}>{layers[i.layer][lang] || layers[i.layer].fr}</span>
                </div>
                <b>{i.name}</b>
                <small>{i.town || '—'}</small>
                {i.phone && <small><a href={`tel:${i.phone.replace(/\s/g, '')}`} style={{ color: 'var(--g600)' }}>{i.phone}</a></small>}
                <FavButton lang={lang} item={{ id: `place:${i.id}`, type: 'place', name: `${i.name}${i.town ? ` (${i.town})` : ''}`, href: `/${lang}/carte?lieu=${i.id}` }} />
                <div className="tm-actions">
                  <a className="btn btn-green" href={`/${lang}/services/reserver?ref=${encodeURIComponent(i.id)}`}>{t.book}</a>
                  <a className="btn btn-outline" href={`/${lang}/carte?lieu=${encodeURIComponent(i.id)}`}>{t.onMap}</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

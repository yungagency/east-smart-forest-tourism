'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const ICONS = {
  tree: '<path d="M12 22v-7"/><path d="M8 15h8a4 4 0 0 0 1-7.9A5 5 0 0 0 7.2 6 4.5 4.5 0 0 0 8 15Z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  cave: '<path d="M3 20h18L16 7l-4 4-3-3Z"/><path d="M10 20c0-2 1-4 2-4s2 2 2 4"/>',
  mountain: '<path d="m3 20 6-11 4 6 2-3 6 8Z"/>',
  landmark: '<path d="M3 21h18M5 21V10M19 21V10M9 21v-7M15 21v-7M12 3 3 8h18Z"/>',
  bed: '<path d="M3 18V7M3 13h18v5M21 18v-3a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
  food: '<path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 3-3 6s1 4 3 4v8"/>',
};

const SAT = process.env.NEXT_PUBLIC_ESRI_KEY
  ? { url: `https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${process.env.NEXT_PUBLIC_ESRI_KEY}`, attr: 'Imagerie © Esri, Maxar, Earthstar Geographics', max: 19 }
  : { url: 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg', attr: 'Sentinel-2 cloudless 2016 © EOX IT Services GmbH (Copernicus Sentinel data)', max: 15 };

const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function TourMap({ items, layers, circuits, outline, lang, t, initialLayer, initialPoi }) {
  const el = useRef(null);
  const mapRef = useRef(null);
  const LRef = useRef(null);
  const groupsRef = useRef({});
  const markersRef = useRef({});
  const circuitRef = useRef(null);
  const baseRef = useRef({});
  const [on, setOn] = useState(() => {
    const all = Object.fromEntries(Object.keys(layers).map((k) => [k, true]));
    if (initialLayer && layers[initialLayer]) return Object.fromEntries(Object.keys(layers).map((k) => [k, k === initialLayer]));
    return all;
  });
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(null);
  const [circuit, setCircuit] = useState(null);
  const [base, setBase] = useState('plan');
  const [panel, setPanel] = useState(true);

  const counts = useMemo(() => {
    const c = {};
    items.forEach((i) => { c[i.layer] = (c[i.layer] || 0) + 1; });
    return c;
  }, [items]);

  const matches = useMemo(() => (q.length < 2 ? [] : items.filter((i) => norm(i.name + ' ' + i.town).includes(norm(q))).slice(0, 8)), [q, items]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !el.current) return;
      LRef.current = L;
      const map = L.map(el.current, { zoomControl: false, scrollWheelZoom: true, preferCanvas: false });
      mapRef.current = map;
      L.control.zoom({ position: 'topright' }).addTo(map);
      L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
      baseRef.current.plan = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
      baseRef.current.satellite = L.tileLayer(SAT.url, { maxZoom: SAT.max, attribution: SAT.attr });
      baseRef.current.plan.addTo(map);

      const outlineLayer = L.polygon(outline.map(([x, y]) => [y, x]), { color: '#146036', weight: 2, fill: true, fillColor: '#7cc142', fillOpacity: 0.04, dashArray: '6 6', interactive: false }).addTo(map);
      map.fitBounds(outlineLayer.getBounds(), { padding: [20, 20] });

      Object.keys(layers).forEach((k) => { groupsRef.current[k] = L.layerGroup(); });
      items.forEach((it) => {
        const lay = layers[it.layer];
        const icon = L.divIcon({
          className: 'tm-pin-wrap',
          html: `<span class="tm-pin ${it.kind === 'site' ? 'tm-pin-lg' : ''}" style="--c:${lay.c}"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[lay.icon]}</svg></span>`,
          iconSize: it.kind === 'site' ? [34, 34] : [26, 26],
          iconAnchor: it.kind === 'site' ? [17, 17] : [13, 13],
        });
        const m = L.marker([it.lat, it.lng], { icon, title: it.name, riseOnHover: true, zIndexOffset: it.kind === 'site' ? 1000 : 0 });
        m.on('click', () => { setSel(it); setPanel(true); });
        m.addTo(groupsRef.current[it.layer]);
        markersRef.current[it.id] = m;
      });
      Object.entries(groupsRef.current).forEach(([k, g]) => { if (on[k]) g.addTo(map); });
      if (initialPoi) {
        const it = items.find((i) => i.id === initialPoi || i.slug === initialPoi);
        if (it) { map.setView([it.lat, it.lng], 13); setSel(it); }
      }
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(el.current);
      map.once('unload', () => ro.disconnect());
    })();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Couches visibles
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.entries(groupsRef.current).forEach(([k, g]) => {
      if (on[k] && !map.hasLayer(g)) g.addTo(map);
      if (!on[k] && map.hasLayer(g)) map.removeLayer(g);
    });
  }, [on]);

  // Fond de carte
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !baseRef.current.plan) return;
    const other = base === 'plan' ? 'satellite' : 'plan';
    if (map.hasLayer(baseRef.current[other])) map.removeLayer(baseRef.current[other]);
    if (!map.hasLayer(baseRef.current[base])) baseRef.current[base].addTo(map).bringToBack();
  }, [base]);

  // Circuit
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    if (circuitRef.current) { map.removeLayer(circuitRef.current); circuitRef.current = null; }
    const c = circuits.find((x) => x.slug === circuit);
    if (!c) return;
    const g = L.layerGroup();
    const pts = c.steps.map((s) => [s.lat, s.lng]);
    L.polyline(pts, { color: '#fff', weight: 8, opacity: 0.9 }).addTo(g);
    L.polyline(pts, { color: c.color, weight: 5, dashArray: '2 10', lineCap: 'round' }).addTo(g);
    c.steps.forEach((s, i) => {
      L.marker([s.lat, s.lng], {
        icon: L.divIcon({ className: 'tm-pin-wrap', html: `<span class="tm-step" style="--c:${c.color}">${i + 1}</span>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
        title: s.name, zIndexOffset: 500,
      }).bindTooltip(`${i + 1}. ${s.name}`, { direction: 'top', offset: [0, -12] }).addTo(g);
    });
    g.addTo(map);
    circuitRef.current = g;
    map.fitBounds(L.latLngBounds(pts), { padding: [60, 60] });
  }, [circuit, circuits]);

  function focus(it) {
    setSel(it);
    setQ('');
    if (!on[it.layer]) setOn((o) => ({ ...o, [it.layer]: true }));
    mapRef.current?.setView([it.lat, it.lng], Math.max(mapRef.current.getZoom(), 12));
  }

  const visible = items.filter((i) => on[i.layer]).length;
  const gmaps = (it) => `https://www.google.com/maps/dir/?api=1&destination=${it.lat},${it.lng}`;

  return (
    <div className={`tm ${panel ? '' : 'tm-collapsed'}`}>
      <aside className="tm-panel">
        <div className="tm-search">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
          {matches.length > 0 && (
            <ul className="tm-suggest">
              {matches.map((m) => (
                <li key={m.id}><button onClick={() => focus(m)}><i style={{ background: layers[m.layer].c }} />{m.name}<small>{m.town}</small></button></li>
              ))}
            </ul>
          )}
        </div>
        <div className="tm-block">
          <div className="tm-h">{t.layers} <small>{visible} {t.results}</small></div>
          {Object.entries(layers).map(([k, l]) => (
            <label key={k} className="tm-layer">
              <input type="checkbox" checked={!!on[k]} onChange={(e) => setOn((o) => ({ ...o, [k]: e.target.checked }))} />
              <i style={{ background: l.c }} />
              <span>{l[lang] || l.fr}</span>
              <small>{counts[k] || 0}</small>
            </label>
          ))}
        </div>
        <div className="tm-block">
          <div className="tm-h">{t.circuits}</div>
          {circuits.map((c) => (
            <button key={c.slug} className={`tm-circuit ${circuit === c.slug ? 'on' : ''}`} onClick={() => setCircuit(circuit === c.slug ? null : c.slug)}>
              <i style={{ background: c.color }} />
              <span><b>{c[`name_${lang}`] || c.name_fr}</b><small>{c[`days_${lang}`] || c.days_fr}</small></span>
            </button>
          ))}
          {circuit && (() => {
            const c = circuits.find((x) => x.slug === circuit);
            return (
              <div className="tm-circuit-detail">
                <p>{c[`summary_${lang}`] || c.summary_fr}</p>
                <ol>{c.steps.map((s) => <li key={s.name}>{s.site ? <a href={`/${lang}/sites/${s.site}`}>{s.name}</a> : s.name}</li>)}</ol>
                <p className="muted small">{t.circuitNote}</p>
              </div>
            );
          })()}
        </div>
        <div className="tm-block tm-base">
          <span className="tm-h">{t.basemap}</span>
          <div className="seg">
            <button className={base === 'plan' ? 'on' : ''} onClick={() => setBase('plan')}>{t.plan}</button>
            <button className={base === 'satellite' ? 'on' : ''} onClick={() => setBase('satellite')}>{t.satellite}</button>
          </div>
        </div>
        <p className="muted small tm-note">{t.osmNote}</p>
      </aside>

      <div className="tm-stage">
        <div ref={el} className="tm-map" />
        {sel && (
          <div className="tm-card">
            <button className="tm-close" onClick={() => setSel(null)} aria-label="✕">✕</button>
            {sel.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sel.image} alt="" referrerPolicy="no-referrer" />
            )}
            <div className="tm-card-body">
              <span className="tm-tag" style={{ background: layers[sel.layer].c }}>{layers[sel.layer][lang] || layers[sel.layer].fr}</span>
              <b>{sel.name}</b>
              {sel.town && <small>{sel.town}</small>}
              {sel.summary && <p>{sel.summary}</p>}
              {sel.phone && <p className="small">{t.phone} : <a href={`tel:${sel.phone.replace(/\s/g, '')}`}>{sel.phone}</a></p>}
              {sel.src === 'osm' && <p className="small muted">{t.unverified} · OpenStreetMap</p>}
              <div className="tm-actions">
                {sel.href && <a className="btn btn-green" href={sel.href}>{t.openSheet}</a>}
                {sel.site && !sel.href && <a className="btn btn-green" href={`/${lang}/sites/${sel.site}`}>{t.openSheet}</a>}
                {(sel.kind === 'site' || sel.site) && <a className="btn btn-outline" href={`/${lang}/visite-3d?site=${sel.slug || sel.site}`}>{t.view3d}</a>}
                {(sel.layer === 'lodging' || sel.layer === 'food') && <a className="btn btn-green" href={`/${lang}/services/reserver?ref=${encodeURIComponent(sel.id)}`}>{t.book}</a>}
                <a className="btn btn-outline" href={gmaps(sel)} target="_blank" rel="noopener noreferrer">{t.directions}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

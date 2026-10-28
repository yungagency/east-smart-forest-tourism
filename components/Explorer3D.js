'use client';
import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

// Imagerie satellite : EOX Sentinel-2 cloudless 2016 (CC BY 4.0, Copernicus Sentinel-2, résolution ~10 m)
// Relief : Terrain Tiles (AWS Open Data / Mapzen, encodage Terrarium)
const SAT_TILES = ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg'];
const DEM_TILES = ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'];
const SAT_ATTR = '<a href="https://s2maps.eu" target="_blank" rel="noopener">Sentinel-2 cloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 &amp; 2017)';
const DEM_ATTR = 'Relief : <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">Terrain Tiles</a> (Mapzen, AWS Open Data)';

const START = { center: [14.1, 4.0], zoom: 6.4, pitch: 45, bearing: -10 };
const COLORS = { parc: '#7cc142', nature: '#4aa3d1', histoire: '#e0a64a', culture: '#d49a8a' };

export default function Explorer3D({ sites, lang, t3 }) {
  const el = useRef(null);
  const mapRef = useRef(null);
  const tourRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);
  const [touring, setTouring] = useState(false);
  const [relief, setRelief] = useState(1.8);
  const [is3d, setIs3d] = useState(true);

  const located = sites.filter((s) => typeof s.lat === 'number' && typeof s.lng === 'number');
  const name = (s) => s[`name_${lang}`] || s.name_fr;
  const summary = (s) => s[`summary_${lang}`] || s.summary_fr;

  useEffect(() => {
    let map;
    let cancelled = false;
    (async () => {
      const maplibregl = (await import('maplibre-gl')).default;
      if (cancelled || !el.current) return;
      try {
        map = new maplibregl.Map({
          container: el.current,
          ...START,
          maxPitch: 80,
          attributionControl: false,
          style: {
            version: 8,
            sources: {
              sat: { type: 'raster', tiles: SAT_TILES, tileSize: 256, maxzoom: 15, attribution: SAT_ATTR },
              dem: { type: 'raster-dem', tiles: DEM_TILES, tileSize: 256, maxzoom: 14, encoding: 'terrarium', attribution: DEM_ATTR },
              demHs: { type: 'raster-dem', tiles: DEM_TILES, tileSize: 256, maxzoom: 14, encoding: 'terrarium' },
            },
            layers: [
              { id: 'bg', type: 'background', paint: { 'background-color': '#0a3420' } },
              { id: 'sat', type: 'raster', source: 'sat', paint: { 'raster-saturation': 0.1, 'raster-contrast': 0.08 } },
              { id: 'hs', type: 'hillshade', source: 'demHs', paint: { 'hillshade-exaggeration': 0.35, 'hillshade-shadow-color': '#0a2015' } },
            ],
            terrain: { source: 'dem', exaggeration: 1.8 },
            sky: {
              'sky-color': '#9fc6e8', 'horizon-color': '#e6f0e2', 'fog-color': '#dfe9dc',
              'sky-horizon-blend': 0.5, 'horizon-fog-blend': 0.6, 'fog-ground-blend': 0.4,
            },
          },
        });
      } catch (e) {
        setError(t3.noWebgl);
        return;
      }
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.addControl(new maplibregl.FullscreenControl(), 'top-right');
      map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left');
      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      map.on('load', () => {
        located.forEach((s) => {
          const node = document.createElement('button');
          node.className = 'm3d-marker';
          node.style.setProperty('--c', COLORS[s.category] || COLORS.parc);
          node.setAttribute('aria-label', name(s));
          node.innerHTML = `<span></span><b>${name(s).replace(/</g, '&lt;')}</b>`;
          node.addEventListener('click', (ev) => { ev.stopPropagation(); fly(s); });
          new maplibregl.Marker({ element: node, anchor: 'bottom' }).setLngLat([s.lng, s.lat]).addTo(map);
        });
        setReady(true);
      });
      map.on('error', (e) => {
        if (e && e.error && /WebGL/i.test(String(e.error.message))) setError(t3.noWebgl);
      });
    })();
    return () => {
      cancelled = true;
      clearTimeout(tourRef.current);
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fly(s, opts = {}) {
    const map = mapRef.current;
    if (!map) return;
    setActive(s.slug);
    map.flyTo({
      center: [s.lng, s.lat],
      zoom: s.category === 'parc' ? 10.2 : 12.5,
      pitch: 68,
      bearing: (map.getBearing() + 40) % 360,
      speed: 0.6,
      curve: 1.6,
      essential: true,
      ...opts,
    });
  }

  function stopTour() {
    clearTimeout(tourRef.current);
    tourRef.current = null;
    setTouring(false);
  }

  function startTour() {
    const list = located.filter((s) => s.featured).concat(located.filter((s) => !s.featured));
    let i = 0;
    setTouring(true);
    const step = () => {
      if (i >= list.length) { stopTour(); reset(); return; }
      fly(list[i]);
      i += 1;
      tourRef.current = setTimeout(step, 9000);
    };
    step();
  }

  function reset() {
    setActive(null);
    mapRef.current?.flyTo({ ...START, speed: 0.8 });
  }

  function onRelief(v) {
    setRelief(v);
    if (is3d) mapRef.current?.setTerrain({ source: 'dem', exaggeration: v });
  }

  function toggle3d() {
    const map = mapRef.current;
    if (!map) return;
    if (is3d) {
      map.setTerrain(null);
      map.easeTo({ pitch: 0, bearing: 0 });
    } else {
      map.setTerrain({ source: 'dem', exaggeration: relief });
      map.easeTo({ pitch: 55 });
    }
    setIs3d(!is3d);
  }

  const current = located.find((s) => s.slug === active);

  return (
    <div className="m3d">
      <aside className="m3d-panel">
        <div className="m3d-actions">
          {touring
            ? <button className="btn btn-outline" onClick={stopTour}>{t3.stop}</button>
            : <button className="btn btn-green" onClick={startTour} disabled={!ready}>{t3.tour}</button>}
          <button className="btn btn-outline" onClick={reset} disabled={!ready}>{t3.reset}</button>
        </div>
        <div className="m3d-controls">
          <label>
            {t3.relief} ×{relief.toFixed(1)}
            <input type="range" min="1" max="4" step="0.1" value={relief} onChange={(e) => onRelief(Number(e.target.value))} disabled={!is3d} />
          </label>
          <button className="chip" onClick={toggle3d}>{is3d ? t3.view2d : t3.view3d}</button>
        </div>
        <ol className="m3d-list">
          {located.map((s) => (
            <li key={s.slug}>
              <button className={active === s.slug ? 'on' : ''} onClick={() => { stopTour(); fly(s); }} disabled={!ready}>
                <i style={{ background: COLORS[s.category] }} />
                <span>{name(s)}<small>{s.commune}</small></span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <div className="m3d-stage">
        <div ref={el} className="m3d-map" />
        {!ready && !error && <div className="m3d-overlay">{t3.loading}</div>}
        {error && <div className="m3d-overlay">{error}</div>}
        {current && (
          <div className="m3d-card">
            <b>{name(current)}</b>
            <p>{summary(current)}</p>
            <a className="btn btn-green" href={`/${lang}/sites/${current.slug}`}>{t3.open}</a>
          </div>
        )}
      </div>
    </div>
  );
}

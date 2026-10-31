'use client';
import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'leaflet/dist/leaflet.css';

// Imagerie satellite : EOX Sentinel-2 cloudless 2016 (CC BY 4.0, Copernicus Sentinel-2, résolution ~10 m)
// Relief : Terrain Tiles (AWS Open Data / Mapzen, encodage Terrarium)
// Si une clé Esri est configurée (NEXT_PUBLIC_ESRI_KEY), on utilise l'imagerie Esri World Imagery (jusqu'à ~0,5 m).
const ESRI_KEY = process.env.NEXT_PUBLIC_ESRI_KEY || '';
const EOX_TILES = ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg'];
const SAT_TILES = ESRI_KEY
  ? [`https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${ESRI_KEY}`]
  : EOX_TILES;
const SAT_MAX = ESRI_KEY ? 19 : 15;
// Bâtiments 3D : OpenFreeMap (données OpenStreetMap, ODbL)
const BUILDINGS_URL = 'https://tiles.openfreemap.org/planet';
const BLD_ATTR = 'Bâtiments 3D : <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">contributeurs OpenStreetMap</a>';
const DEM_TILES = ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'];
const EOX_ATTR = '<a href="https://s2maps.eu" target="_blank" rel="noopener">Sentinel-2 cloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 &amp; 2017)';
const SAT_ATTR = ESRI_KEY ? 'Imagerie © Esri, Maxar, Earthstar Geographics' : EOX_ATTR;
const DEM_ATTR = 'Relief : <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">Terrain Tiles</a> (Mapzen, AWS Open Data)';

const START = { center: [14.1, 4.0], zoom: 6.4, pitch: 45, bearing: -10 };
const COLORS = { parc: '#7cc142', nature: '#4aa3d1', histoire: '#e0a64a', culture: '#d49a8a' };

export default function Explorer3D({ sites, lang, t3, initialSite, labels }) {
  const el = useRef(null);
  const mapRef = useRef(null);
  const tourRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);
  const [touring, setTouring] = useState(false);
  const [relief, setRelief] = useState(1.8);
  const [is3d, setIs3d] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [slow, setSlow] = useState(false);
  const [buildings, setBuildings] = useState(true);
  const [lb, setLb] = useState(-1);

  const located = sites.filter((s) => typeof s.lat === 'number' && typeof s.lng === 'number');
  const name = (s) => s[`name_${lang}`] || s.name_fr;
  const summary = (s) => s[`summary_${lang}`] || s.summary_fr;

  useEffect(() => {
    let map;
    let cancelled = false;
    let slowTimer;
    (async () => {
      // WebGL2 indispensable pour la 3D : sinon, vue satellite 2D
      let gl2 = false;
      try { gl2 = !!document.createElement('canvas').getContext('webgl2'); } catch (e) { gl2 = false; }
      if (!gl2) { setFallback(true); return; }
      const maplibregl = (await import('maplibre-gl')).default;
      if (cancelled || !el.current) return;
      slowTimer = setTimeout(() => setSlow(true), 15000);
      try {
        map = new maplibregl.Map({
          container: el.current,
          ...START,
          maxPitch: 80,
          attributionControl: false,
          style: {
            version: 8,
            sources: {
              sat: { type: 'raster', tiles: SAT_TILES, tileSize: 256, maxzoom: SAT_MAX, attribution: SAT_ATTR },
              omt: { type: 'vector', url: BUILDINGS_URL, attribution: BLD_ATTR },
              dem: { type: 'raster-dem', tiles: DEM_TILES, tileSize: 256, maxzoom: 14, encoding: 'terrarium', attribution: DEM_ATTR },
              demHs: { type: 'raster-dem', tiles: DEM_TILES, tileSize: 256, maxzoom: 14, encoding: 'terrarium' },
            },
            layers: [
              { id: 'bg', type: 'background', paint: { 'background-color': '#0a3420' } },
              { id: 'sat', type: 'raster', source: 'sat', paint: { 'raster-saturation': 0.1, 'raster-contrast': 0.08 } },
              { id: 'hs', type: 'hillshade', source: 'demHs', paint: { 'hillshade-exaggeration': 0.35, 'hillshade-shadow-color': '#0a2015' } },
              {
                id: 'bld', type: 'fill-extrusion', source: 'omt', 'source-layer': 'building', minzoom: 13,
                paint: {
                  'fill-extrusion-color': '#efe6d6',
                  'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 4],
                  'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
                  'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, 0.9],
                },
              },
            ],
            terrain: { source: 'dem', exaggeration: 1.8 },
            sky: {
              'sky-color': '#9fc6e8', 'horizon-color': '#e6f0e2', 'fog-color': '#dfe9dc',
              'sky-horizon-blend': 0.5, 'horizon-fog-blend': 0.6, 'fog-ground-blend': 0.4,
            },
          },
        });
      } catch (e) {
        clearTimeout(slowTimer);
        setFallback(true);
        return;
      }
      mapRef.current = map;
      // Recalcule la taille si le conteneur change (mise en page, plein écran, rotation mobile)
      const ro = new ResizeObserver(() => map.resize());
      ro.observe(el.current);
      map.once('remove', () => ro.disconnect());
      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.addControl(new maplibregl.FullscreenControl(), 'top-right');
      map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left');
      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      let markersAdded = false;
      const onStyle = () => {
        if (markersAdded) return;
        markersAdded = true;
        clearTimeout(slowTimer);
        setSlow(false);
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
        if (initialSite) {
          const s0 = located.find((x) => x.slug === initialSite);
          if (s0) setTimeout(() => fly(s0), 400);
        }
      };
      // Affiche la carte dès que le style est prêt, sans attendre toutes les tuiles
      map.once('style.load', onStyle);
      map.once('load', onStyle);
      map.on('error', (e) => {
        const msg = String((e && e.error && e.error.message) || '');
        if (/webgl/i.test(msg)) { setFallback(true); }
        // Une source facultative (bâtiments) en panne ne doit pas bloquer la visite
        if (e && e.sourceId === 'omt') console.warn('3D buildings unavailable');
      });
    })();
    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
      clearTimeout(tourRef.current);
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fly(s, opts = {}) {
    const map = mapRef.current;
    if (!map) return;
    setActive(s.slug);
    setLb(-1);
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

  function toggleBuildings() {
    const map = mapRef.current;
    if (!map || !map.getLayer('bld')) return;
    map.setLayoutProperty('bld', 'visibility', buildings ? 'none' : 'visible');
    setBuildings(!buildings);
  }

  function zoomTown(s) {
    mapRef.current?.flyTo({ center: [s.lng, s.lat], zoom: 15.6, pitch: 62, speed: 0.7, essential: true });
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

  if (fallback) {
    return (
      <div>
        <div className="note" style={{ marginTop: 0 }}>{t3.fallback}</div>
        <Satellite2D sites={located} lang={lang} t3={t3} />
      </div>
    );
  }

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
        </div>
        <div className="m3d-toggle-row">
          <button className="chip" onClick={toggle3d}>{is3d ? t3.view2d : t3.view3d}</button>
          <button className={`chip ${buildings ? 'on' : ''}`} onClick={toggleBuildings} disabled={!ready}>{labels?.buildings || 'Bâtiments 3D'}</button>
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
        {!ready && !error && (
          <div className="m3d-loading">
            <span>{slow ? t3.slow : t3.loading}</span>
            {slow && <button className="btn btn-primary" onClick={() => setFallback(true)}>{t3.use2d}</button>}
          </div>
        )}
        {error && <div className="m3d-overlay">{error}</div>}
        {current && (
          <div className="m3d-card">
            {current.photos?.length > 0 && (
              <div className="m3d-photos">
                {current.photos.map((p, i) => (
                  <button key={p.src} onClick={() => setLb(i)} aria-label={p.caption || name(current)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.caption || ''} loading="lazy" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
            <b>{name(current)}</b>
            <p>{summary(current)}</p>
            {current.fauna?.length > 0 && <p className="fauna-line">{labels?.fauna} : {current.fauna.join(', ')}</p>}
            <div className="m3d-btns">
              <a className="btn btn-green" href={`/${lang}/sites/${current.slug}`}>{t3.open}</a>
              {current.town && <button className="btn btn-outline" onClick={() => zoomTown(current)}>{labels?.zoomTown}</button>}
            </div>
          </div>
        )}
        {current && lb >= 0 && current.photos?.[lb] && (
          <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLb(-1)}>
            <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.photos[lb].src} alt={current.photos[lb].caption || name(current)} referrerPolicy="no-referrer" />
              <div className="lb-bar">
                <span><b>{current.photos[lb].caption}</b><small>© {current.photos[lb].credit}</small></span>
                <span className="lb-nav">
                  <button onClick={() => setLb((lb - 1 + current.photos.length) % current.photos.length)}>‹</button>
                  <span>{lb + 1}/{current.photos.length}</span>
                  <button onClick={() => setLb((lb + 1) % current.photos.length)}>›</button>
                  <button onClick={() => setLb(-1)}>✕</button>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Vue de secours : satellite 2D (Leaflet), fonctionne sur tous les navigateurs
function Satellite2D({ sites, lang, t3 }) {
  const ref = useRef(null);
  useEffect(() => {
    let map;
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !ref.current) return;
      map = L.map(ref.current, { scrollWheelZoom: true }).setView([4.0, 14.1], 7);
      L.tileLayer(SAT_TILES[0], { maxZoom: SAT_MAX, attribution: SAT_ATTR }).addTo(map);
      sites.forEach((s) => {
        const name = (s[`name_${lang}`] || s.name_fr).replace(/</g, '&lt;');
        L.circleMarker([s.lat, s.lng], { radius: 9, color: '#fff', weight: 2, fillColor: COLORS[s.category] || COLORS.parc, fillOpacity: 1 })
          .addTo(map)
          .bindPopup(`<a href="/${lang}/sites/${s.slug}">${name}</a>`);
      });
    })();
    return () => { cancelled = true; if (map) map.remove(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={ref} className="map" style={{ height: 560 }} role="region" aria-label={t3.title} />;
}

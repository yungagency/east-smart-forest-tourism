'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const COLORS = { parc: '#1b4a3c', nature: '#2f7a8c', histoire: '#b8741f', culture: '#7d4b5a' };

export default function MapView({ points = [], lang = 'fr', small = false, center, zoom }) {
  const el = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !el.current) return;
      if (mapRef.current) mapRef.current.remove();
      const map = L.map(el.current, { scrollWheelZoom: false, attributionControl: true });
      mapRef.current = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lng === 'number');
      valid.forEach((p) => {
        const m = L.circleMarker([p.lat, p.lng], {
          radius: 9,
          color: '#fff',
          weight: 2,
          fillColor: COLORS[p.category] || COLORS.parc,
          fillOpacity: 0.95,
        }).addTo(map);
        const name = String(p.name).replace(/</g, '&lt;');
        m.bindPopup(p.href ? `<a href="${p.href}">${name}</a><br/><small>${p.sub || ''}</small>` : name);
      });
      if (center) map.setView(center, zoom || 8);
      else if (valid.length > 1) map.fitBounds(valid.map((p) => [p.lat, p.lng]), { padding: [30, 30] });
      else if (valid.length === 1) map.setView([valid[0].lat, valid[0].lng], zoom || 8);
      else map.setView([4.0, 14.2], 6);
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [JSON.stringify(points), lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={el} className={`map ${small ? 'small' : ''}`} role="region" aria-label="Map" />;
}

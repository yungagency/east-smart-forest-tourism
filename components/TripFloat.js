'use client';
import { useEffect, useState } from 'react';
import { readTrip } from '@/lib/trip';

// Bouton flottant « Mon voyage » : apparaît dès qu'un favori est ajouté
export default function TripFloat({ lang }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const sync = () => setN(readTrip().length);
    sync();
    window.addEventListener('esft-trip', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('esft-trip', sync); window.removeEventListener('storage', sync); };
  }, []);
  if (!n) return null;
  return (
    <a className="trip-float" href={`/${lang}/mon-voyage`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.3 5 6.6 5c2 0 3.5 1.1 4.4 2.6h2C13.9 6.1 15.4 5 17.4 5 20.7 5 23 8.3 21.5 11.8 19.5 16.4 12 21 12 21Z" /></svg>
      {lang === 'en' ? 'My trip' : 'Mon voyage'} <b>{n}</b>
    </a>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { readTrip, toggleTrip } from '@/lib/trip';

// item : { id, type: 'site' | 'animal' | 'place', name, href, image }
export default function FavButton({ item, lang, light = false }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(readTrip().some((x) => x.id === item.id));
    sync();
    window.addEventListener('esft-trip', sync);
    return () => window.removeEventListener('esft-trip', sync);
  }, [item.id]);
  const label = on ? (lang === 'en' ? 'Saved to my trip' : 'Dans mon voyage') : (lang === 'en' ? 'Add to my trip' : 'Ajouter à mon voyage');
  return (
    <button type="button" className={`fav-btn ${on ? 'on' : ''} ${light ? 'light' : ''}`} aria-pressed={on} onClick={() => setOn(toggleTrip(item))}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.3 5 6.6 5c2 0 3.5 1.1 4.4 2.6h2C13.9 6.1 15.4 5 17.4 5 20.7 5 23 8.3 21.5 11.8 19.5 16.4 12 21 12 21Z" />
      </svg>
      {label}
    </button>
  );
}

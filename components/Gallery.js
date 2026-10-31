'use client';
import { srcSet, CARD_SIZES } from '@/lib/img';
import { useCallback, useEffect, useState } from 'react';

// Galerie avec visionneuse plein écran. photos : [{ src, caption_fr, caption_en, credit, license, page }]
export default function Gallery({ photos = [], lang = 'fr', labels, compact = false }) {
  const [open, setOpen] = useState(-1);
  const cap = (p) => p[`caption_${lang}`] || p.caption_fr || '';
  const close = useCallback(() => setOpen(-1), []);
  const move = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, move]);

  if (!photos.length) return null;
  const cur = open >= 0 ? photos[open] : null;

  return (
    <>
      <div className={`gal ${compact ? 'gal-compact' : ''} gal-${Math.min(photos.length, 3)}`}>
        {photos.map((p, i) => (
          <button key={p.src} className="gal-item" onClick={() => setOpen(i)} aria-label={cap(p)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} srcSet={srcSet(p.src)} sizes="(max-width: 640px) 50vw, 400px" alt={cap(p)} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            {!compact && <span className="gal-cap">{cap(p)}</span>}
          </button>
        ))}
      </div>
      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.src} alt={cap(cur)} referrerPolicy="no-referrer" />
            <div className="lb-bar">
              <span>
                <b>{cap(cur)}</b>
                <small>
                  © {cur.page ? <a href={cur.page} target="_blank" rel="noopener noreferrer">{cur.credit}</a> : cur.credit} · {cur.license}
                </small>
              </span>
              <span className="lb-nav">
                {photos.length > 1 && <button onClick={() => move(-1)} aria-label={labels?.prev}>‹</button>}
                <span>{open + 1}/{photos.length}</span>
                {photos.length > 1 && <button onClick={() => move(1)} aria-label={labels?.next}>›</button>}
                <button onClick={close} aria-label={labels?.close}>✕</button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

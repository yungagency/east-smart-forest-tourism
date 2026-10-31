'use client';
import { useState } from 'react';

export default function ShareBar({ url, title, lang }) {
  const [copied, setCopied] = useState(false);
  const full = typeof window !== 'undefined' && url.startsWith('/') ? window.location.origin + url : url;
  const enc = encodeURIComponent;
  const L = lang === 'en' ? { share: 'Share', copy: 'Copy link', ok: 'Link copied' } : { share: 'Partager', copy: 'Copier le lien', ok: 'Lien copié' };
  async function native() {
    try { await navigator.share({ title, url: full }); } catch (e) { /* annulé */ }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(full); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) { /* ignore */ }
  }
  return (
    <div className="share-bar" aria-label={L.share}>
      <span className="share-label">{L.share} :</span>
      <a className="share-btn wa" href={`https://wa.me/?text=${enc(`${title} ${full}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className="share-btn fb" href={`https://www.facebook.com/sharer/sharer.php?u=${enc(full)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <button type="button" className="share-btn" onClick={copy}>{copied ? L.ok : L.copy}</button>
      {typeof navigator !== 'undefined' && navigator.share && <button type="button" className="share-btn" onClick={native}>…</button>}
    </div>
  );
}

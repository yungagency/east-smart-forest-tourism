import Link from 'next/link';
import { LogoMark, Wordmark } from './Logo';
import Icon from './Icons';
import { SITE } from '@/lib/site-config';
import { hasSupabase } from '@/lib/supabase';

export default function Footer({ lang, d }) {
  const L = d.landing;
  const F = d.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      {/* Valeurs */}
      <div className="footer-values-band">
        <div className="wrap footer-values">
          {L.values.map((v) => (
            <div key={v.t} className="value">
              <span className="value-ic"><Icon name={v.k} size={20} /></span>
              <span><b>{v.t}</b><small>{v.d}</small></span>
            </div>
          ))}
        </div>
      </div>

      {/* Colonnes */}
      <div className="wrap footer-cols">
        <div className="footer-about">
          <Link href={`/${lang}`} className="footer-brand" aria-label="EAST Smart Forest & Tourism">
            <LogoMark className="brand-mark lg" />
            <Wordmark size={0.9} />
          </Link>
          <p>{F.about}</p>
          <p className="small">{F.rights}</p>
          <div className="footer-social">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="phone" size={18} /></a>
            <a href={`mailto:${SITE.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
          </div>
        </div>

        <nav className="footer-col" aria-label={F.colNav}>
          <h4>{F.colNav}</h4>
          <Link href={`/${lang}`}>{d.nav.home}</Link>
          <Link href={`/${lang}/a-propos`}>{d.nav.about}</Link>
          <Link href={`/${lang}/sites`}>{d.nav.sites}</Link>
          <Link href={`/${lang}/contact`}>{d.nav.contact}</Link>
        </nav>

        <nav className="footer-col" aria-label={F.colExplore}>
          <h4>{F.colExplore}</h4>
          <Link href={`/${lang}/visite-3d`}>{d.nav.tour3d}</Link>
          <Link href={`/${lang}/opportunites`}>{L.partner}</Link>
          <Link href={`/${lang}/credits`}>{d.credits.link}</Link>
          <Link href={`/${lang}/mentions-legales`}>{d.legalLink}</Link>
        </nav>

        <div className="footer-col">
          <h4>{F.colContact}</h4>
          <a href={`mailto:${SITE.email}`} className="footer-line"><Icon name="mail" size={16} /> {SITE.email}</a>
          <a href={`tel:${SITE.phoneHref}`} className="footer-line"><Icon name="phone" size={16} /> {SITE.phone}</a>
          <span className="footer-line"><Icon name="pin" size={16} /> {L.location}</span>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary footer-wa">{F.whatsapp}</a>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="footer-bottom">
        <div className="wrap footer-bottom-in">
          <span>© {year} East Smart Forest &amp; Tourism · {F.all}{!hasSupabase ? ` · ${F.demo}` : ''}</span>
          <span className="motto-foot">VALORISER • CONNECTER • INNOVER • DURER</span>
          <span>
            {F.dev}{' '}
            <a href={SITE.developer.url} target="_blank" rel="noopener noreferrer">{SITE.developer.name}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

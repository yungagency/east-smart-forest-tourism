import Link from 'next/link';
import { LogoMark, Wordmark } from './Logo';
import Icon from './Icons';
import { SITE } from '@/lib/site-config';
import { hasSupabase } from '@/lib/supabase';

export default function Footer({ lang, d }) {
  const L = d.landing;
  return (
    <footer className="footer">
      <div className="wrap footer-values">
        <Link href={`/${lang}`} className="footer-brand" aria-label="EAST Smart Forest & Tourism">
          <LogoMark className="brand-mark xl" />
          <Wordmark size={0.95} />
        </Link>
        {L.values.map((v) => (
          <div key={v.t} className="value">
            <span className="value-ic"><Icon name={v.k} size={22} /></span>
            <b>{v.t}</b>
            <span>{v.d}</span>
          </div>
        ))}
      </div>
      <div className="footer-links">
        <div className="wrap footer-links-in">
          <Link href={`/${lang}/sites`}>{d.nav.sites}</Link>
          <Link href={`/${lang}/visite-3d`}>{d.nav.tour3d}</Link>
          <Link href={`/${lang}/opportunites`}>{d.nav.opps}</Link>
          <Link href={`/${lang}/a-propos`}>{d.nav.about}</Link>
          <Link href={`/${lang}/contact`}>{d.nav.contact}</Link>
          <Link href={`/${lang}/credits`}>{d.credits.link}</Link>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrap footer-bottom-in">
          <span className="loc"><Icon name="pin" size={16} /> {L.location}</span>
          <span className="motto-foot">VALORISER • CONNECTER • INNOVER • DURER</span>
          <span className="small">
            {d.footer.dev}{' '}
            <a href={SITE.developer.url} target="_blank" rel="noopener noreferrer">{SITE.developer.name}</a>
            {!hasSupabase ? ` · ${d.footer.demo}` : ''}
          </span>
        </div>
      </div>
    </footer>
  );
}

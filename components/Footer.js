import Link from 'next/link';
import { LogoMark, Wordmark } from './Logo';
import { SITE } from '@/lib/site-config';
import { hasSupabase } from '@/lib/supabase';

export default function Footer({ lang, d }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-in">
          <div>
            <div className="brand" style={{ color: '#fff', marginBottom: 14 }}>
              <LogoMark className="brand-mark lg" />
              <Wordmark />
            </div>
            <p style={{ maxWidth: 360 }}>{d.tagline}</p>
            <p className="small">{d.footer.rights}</p>
          </div>
          <div>
            <h4>{d.nav.sites}</h4>
            <Link href={`/${lang}/sites`}>{d.nav.sites}</Link>
            <Link href={`/${lang}/opportunites`}>{d.nav.opps}</Link>
            <Link href={`/${lang}/a-propos`}>{d.nav.about}</Link>
            <Link href={`/${lang}/contact`}>{d.nav.contact}</Link>
            <Link href={`/${lang}/credits`}>{d.credits.link}</Link>
          </div>
          <div>
            <h4>{d.nav.contact}</h4>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}{!hasSupabase ? ` · ${d.footer.demo}` : ''}</span>
          <span>
            {d.footer.dev}{' '}
            <a href={SITE.developer.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline', color: '#e0a64a' }}>
              {SITE.developer.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

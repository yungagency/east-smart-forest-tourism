'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoMark, Wordmark } from './Logo';
import Icon from './Icons';

export default function Header({ lang, nav, partner }) {
  const path = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rest = path.replace(/^\/(fr|en)/, '') || '';
  const isHome = rest === '' || rest === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: `/${lang}`, label: nav.home, exact: true },
    { href: `/${lang}/a-propos`, label: nav.about },
    { href: `/${lang}/sites`, label: nav.sites },
    { href: `/${lang}/opportunites`, label: nav.opps },
    { href: `/${lang}/contact`, label: nav.contact },
  ];
  const active = (l) => (l.exact ? isHome : path.startsWith(l.href));

  return (
    <header className={`header ${isHome ? 'header-fixed' : ''} ${isHome && !scrolled ? 'is-top' : ''}`}>
      <div className="wrap header-in">
        <Link href={`/${lang}`} className="brand" onClick={() => setOpen(false)} aria-label="EAST Smart Forest & Tourism">
          <LogoMark />
          <Wordmark dark size={0.92} />
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={active(l) ? 'active' : ''} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="lang">
            <Link href={`/fr${rest}`} className={lang === 'fr' ? 'on' : ''}>FR</Link>
            <Link href={`/en${rest}`} className={lang === 'en' ? 'on' : ''}>EN</Link>
          </div>
          <Link href={`/${lang}/contact?sujet=partenariat`} className="btn btn-green nav-cta" onClick={() => setOpen(false)}>
            <Icon name="handshake" size={20} /> {partner}
          </Link>
        </nav>
      </div>
    </header>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogoMark, Wordmark } from './Logo';

export default function Header({ lang, nav }) {
  const path = usePathname() || '';
  const [open, setOpen] = useState(false);
  const rest = path.replace(/^\/(fr|en)/, '') || '';
  const links = [
    { href: `/${lang}/sites`, label: nav.sites },
    { href: `/${lang}/opportunites`, label: nav.opps },
    { href: `/${lang}/a-propos`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href={`/${lang}`} className="brand" onClick={() => setOpen(false)}>
          <LogoMark />
          <Wordmark size={0.82} />
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? 'active' : ''} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="lang">
            <Link href={`/fr${rest}`} className={lang === 'fr' ? 'on' : ''}>FR</Link>
            <Link href={`/en${rest}`} className={lang === 'en' ? 'on' : ''}>EN</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

import { NextResponse } from 'next/server';

const LANGS = ['fr', 'en'];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];
  if (LANGS.includes(first) || first === 'admin') return NextResponse.next();
  const accept = req.headers.get('accept-language') || '';
  const lang = accept.toLowerCase().startsWith('en') ? 'en' : 'fr';
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|icon.svg|manifest.webmanifest|robots.txt|sitemap.xml|.*\\..*).*)'],
};

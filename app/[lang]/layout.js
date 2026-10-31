import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripFloat from '@/components/TripFloat';
import { LANGS, getDict } from '@/lib/i18n';
import { display, body } from '@/lib/fonts';
import { SITE_URL, JsonLd } from '@/lib/seo';
import { SITE } from '@/lib/site-config';

export const viewport = { themeColor: '#0e4a2b' };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `East Smart Forest & Tourism · ${d.tagline}`, template: '%s | EAST Smart Forest' },
    description: d.landing.text,
    applicationName: 'East Smart Forest & Tourism',
    icons: { icon: '/icon.svg', apple: '/icon.svg' },
    manifest: '/manifest.webmanifest',
    openGraph: {
      siteName: 'East Smart Forest & Tourism',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
      images: [{ url: '/images/hero-east-960.jpg', width: 960, height: 540, alt: 'East Smart Forest & Tourism' }],
    },
    twitter: { card: 'summary_large_image', images: ['/images/hero-east-960.jpg'] },
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const d = getDict(lang);
  const org = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'East Smart Forest & Tourism', url: `${SITE_URL}/${lang}`,
        logo: `${SITE_URL}/icon.svg`, email: SITE.email, telephone: SITE.phoneHref,
        areaServed: { '@type': 'AdministrativeArea', name: lang === 'en' ? 'East Region, Cameroon' : "Région de l'Est, Cameroun" },
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: 'East Smart Forest & Tourism', url: SITE_URL, inLanguage: ['fr', 'en'], publisher: { '@id': `${SITE_URL}/#org` } },
    ],
  };
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">{lang === 'en' ? 'Skip to content' : 'Aller au contenu'}</a>
        <JsonLd data={org} />
        <Header lang={lang} nav={d.nav} partner={d.landing.partner} />
        <main id="contenu">{children}</main>
        <Footer lang={lang} d={d} />
        <TripFloat lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}

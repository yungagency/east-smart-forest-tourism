import { Fraunces, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LANGS, getDict } from '@/lib/i18n';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return {
    title: { default: `East Smart Forest & Tourism · ${d.tagline}`, template: '%s · East Smart Forest & Tourism' },
    description: d.hero.text,
    alternates: { languages: { fr: '/fr', en: '/en' } },
    openGraph: { title: 'East Smart Forest & Tourism', description: d.hero.text, type: 'website', locale: lang === 'en' ? 'en_US' : 'fr_FR' },
    icons: { icon: '/icon.svg' },
  };
}

export const viewport = { themeColor: '#10302a' };

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const d = getDict(lang);
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <Header lang={lang} nav={d.nav} />
        <main>{children}</main>
        <Footer lang={lang} d={d} />
      </body>
    </html>
  );
}

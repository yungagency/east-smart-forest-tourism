import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HtmlLang from '@/components/HtmlLang';
import { LANGS, getDict } from '@/lib/i18n';

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
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const d = getDict(lang);
  return (
    <>
      <HtmlLang lang={lang} />
      <Header lang={lang} nav={d.nav} />
      <main>{children}</main>
      <Footer lang={lang} d={d} />
    </>
  );
}

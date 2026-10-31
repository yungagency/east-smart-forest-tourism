import { pageMeta, JsonLd, abs } from '@/lib/seo';
import { t } from '@/lib/data';
import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import SitesBrowser from '@/components/SitesBrowser';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/sites', title: lang === 'en' ? 'Things to see in East Cameroon' : "Que visiter dans l'Est du Cameroun", description: d.sites.intro });
}

export default async function SitesPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = await getSites();
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: d.sites.title,
    itemListElement: sites.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/${lang}/sites/${s.slug}`), name: t(s, 'name', lang) })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{d.hero.kicker}</div>
          <h1>{d.sites.title}</h1>
          <p className="lead">{d.sites.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <SitesBrowser sites={sites} lang={lang} d={d} />
        </div>
      </section>
    </>
  );
}

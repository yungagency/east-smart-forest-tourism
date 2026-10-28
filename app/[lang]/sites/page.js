import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import SitesBrowser from '@/components/SitesBrowser';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).sites.title };
}

export default async function SitesPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = await getSites();
  return (
    <>
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

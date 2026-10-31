import { pageMeta } from '@/lib/seo';
import { getDict } from '@/lib/i18n';
import { POIS, LAYERS } from '@/lib/places';
import ServicesDirectory from '@/components/ServicesDirectory';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/services', title: lang === 'en' ? 'Hotels, restaurants and guides in the East' : "Hôtels, restaurants et guides dans l'Est", description: d.services.intro });
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const items = POIS.filter((p) => p.layer === 'lodging' || p.layer === 'food');
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <div className="eyebrow">{d.services.kicker}</div>
          <h1>{d.services.title}</h1>
          <p className="lead">{d.services.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <ServicesDirectory items={items} lang={lang} t={d.services} layers={LAYERS} />
        </div>
      </section>
    </>
  );
}

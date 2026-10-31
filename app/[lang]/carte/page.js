import { pageMeta, JsonLd, abs } from '@/lib/seo';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { POIS, LAYERS, CIRCUITS, EAST_OUTLINE, SITE_LAYER } from '@/lib/places';
import TourMap from '@/components/TourMap';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/carte', title: lang === 'en' ? 'East Cameroon tourist map' : "Carte touristique de l'Est Cameroun", description: d.map.intro });
}

export default async function CartePage({ params, searchParams }) {
  const { lang } = await params;
  const sp = (await searchParams) || {};
  const d = getDict(lang);
  const sites = await getSites();
  const siteItems = sites
    .filter((s) => typeof s.lat === 'number' && typeof s.lng === 'number')
    .map((s) => ({
      id: `site-${s.slug}`, slug: s.slug, kind: 'site', layer: SITE_LAYER[s.slug] || 'park',
      name: t(s, 'name', lang), town: s.commune || '', lat: s.lat, lng: s.lng,
      summary: t(s, 'summary', lang), image: s.image_url || '', href: `/${lang}/sites/${s.slug}`, src: 'site',
    }));
  const items = [...siteItems, ...POIS.map((p) => ({ ...p, kind: 'poi' }))];
  const layer = typeof sp.couche === 'string' ? sp.couche : undefined;
  const poi = typeof sp.lieu === 'string' ? sp.lieu : undefined;
  const ld = CIRCUITS.map((c) => ({
    '@context': 'https://schema.org', '@type': 'TouristTrip',
    name: c[`name_${lang}`] || c.name_fr, description: c[`summary_${lang}`] || c.summary_fr,
    itinerary: { '@type': 'ItemList', itemListElement: c.steps.map((st, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name: st.name, geo: { '@type': 'GeoCoordinates', latitude: st.lat, longitude: st.lng }, ...(st.site ? { url: abs(`/${lang}/sites/${st.site}`) } : {}) } })) },
  }));
  return (
    <>
      <JsonLd data={ld} />
      <section className="page-head compact">
        <div className="wrap">
          <div className="eyebrow">{d.map.kicker}</div>
          <h1>{d.map.title}</h1>
          <p className="lead">{d.map.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <h2 className="sr-only">{d.map.title}</h2>
          <TourMap items={items} layers={LAYERS} circuits={CIRCUITS} outline={EAST_OUTLINE} lang={lang} t={d.map} initialLayer={layer} initialPoi={poi} />
        </div>
      </section>
    </>
  );
}

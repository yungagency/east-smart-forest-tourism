import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { POIS, LAYERS, CIRCUITS, EAST_OUTLINE, SITE_LAYER } from '@/lib/places';
import TourMap from '@/components/TourMap';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.map.title, description: d.map.intro };
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
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <div className="eyebrow">{d.map.kicker}</div>
          <h1>{d.map.title}</h1>
          <p className="lead">{d.map.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <TourMap items={items} layers={LAYERS} circuits={CIRCUITS} outline={EAST_OUTLINE} lang={lang} t={d.map} initialLayer={layer} initialPoi={poi} />
        </div>
      </section>
    </>
  );
}

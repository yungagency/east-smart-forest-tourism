import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { SITE_GALLERY, faunaForSite, tf } from '@/lib/fauna';
import Explorer3D from '@/components/Explorer3D';

export const revalidate = 60;

// Sites situés en ville : bouton « Voir la ville en 3D » (bâtiments OpenStreetMap)
const TOWNS = ['bertoua', 'forteresse-allemande-de-doume', 'lomie-ville-historique', 'grotte-du-roi-mbartoua'];

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.tour3d.title, description: d.tour3d.intro };
}

export default async function Visite3D({ params, searchParams }) {
  const { lang } = await params;
  const sp = (await searchParams) || {};
  const d = getDict(lang);
  const sites = await getSites();
  const light = sites.map((s) => {
    const photos = [];
    if (s.image_url) photos.push({ src: s.image_url, caption: t(s, 'name', lang), credit: s.image_credit || '' });
    (SITE_GALLERY[s.slug] || []).forEach((p) => photos.push({ src: p.src, caption: p[`caption_${lang}`] || p.caption_fr, credit: `${p.credit} · ${p.license}` }));
    return {
      slug: s.slug, category: s.category, featured: s.featured, lat: s.lat, lng: s.lng, commune: s.commune,
      name_fr: s.name_fr, name_en: s.name_en, summary_fr: s.summary_fr, summary_en: s.summary_en,
      photos: photos.slice(0, 4), fauna: faunaForSite(s.slug).slice(0, 5).map((a) => tf(a, 'name', lang)), town: TOWNS.includes(s.slug),
    };
  });
  const esri = !!process.env.NEXT_PUBLIC_ESRI_KEY;
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <div className="eyebrow">{d.tour3d.kicker}</div>
          <h1>{d.tour3d.title}</h1>
          <p className="lead">{d.tour3d.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <Explorer3D sites={light} lang={lang} t3={d.tour3d} labels={d.x3d} initialSite={typeof sp.site === 'string' ? sp.site : undefined} />
          <p className="muted small" style={{ marginTop: 12 }}>{esri ? d.x3d.esriNote : d.x3d.eoxNote} {d.tour3d.note}</p>
        </div>
      </section>
    </>
  );
}

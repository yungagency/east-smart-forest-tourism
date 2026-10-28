import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import Explorer3D from '@/components/Explorer3D';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.tour3d.title, description: d.tour3d.intro };
}

export default async function Visite3D({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = await getSites();
  const light = sites.map(({ slug, category, featured, lat, lng, commune, name_fr, name_en, summary_fr, summary_en }) => (
    { slug, category, featured, lat, lng, commune, name_fr, name_en, summary_fr, summary_en }
  ));
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
          <Explorer3D sites={light} lang={lang} t3={d.tour3d} />
          <p className="muted small" style={{ marginTop: 12 }}>{d.tour3d.note}</p>
        </div>
      </section>
    </>
  );
}

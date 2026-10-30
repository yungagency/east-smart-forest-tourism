import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import { FAUNA, GROUPS, IUCN } from '@/lib/fauna';
import FaunaBrowser from '@/components/FaunaBrowser';
import AnimalFinder from '@/components/AnimalFinder';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.fauna.title, description: d.fauna.intro };
}

export default async function FaunaPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = (await getSites()).map(({ slug, name_fr, name_en, commune, lat, lng }) => ({ slug, name_fr, name_en, commune, lat, lng }));
  const animals = FAUNA.map(({ slug, group, name_fr, name_en, sci, iucn, summary_fr, summary_en, sites: s, photos }) => ({ slug, group, name_fr, name_en, sci, iucn, summary_fr, summary_en, sites: s, photos: photos.slice(0, 1) }));
  return (
    <>
      <section className="page-head fauna-head">
        <div className="wrap">
          <div className="eyebrow">{d.fauna.kicker}</div>
          <h1>{d.fauna.title}</h1>
          <p className="lead">{d.fauna.intro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <FaunaBrowser animals={animals} sites={sites} groups={GROUPS} iucn={IUCN} lang={lang} t={d.fauna} />
          <p className="muted small" style={{ marginTop: 18 }}>{d.fauna.photoNote}</p>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <AnimalFinder animals={animals.filter((a) => a.sites.length)} sites={sites} lang={lang} t={d.fauna} t3={d.fauna.explore3d} />
        </div>
      </section>
    </>
  );
}

import { pageMeta } from '@/lib/seo';
import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import { FAUNA, GROUPS, IUCN } from '@/lib/fauna';
import FaunaBrowser from '@/components/FaunaBrowser';
import AnimalFinder from '@/components/AnimalFinder';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/faune', title: lang === 'en' ? 'East Cameroon wildlife: 70 species' : "Faune de l'Est Cameroun : 70 espèces", description: d.fauna.intro });
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
      <section className="section tight">
        <div className="wrap">
          <div className="explore-box">
            <div>
              <h3>{lang === 'en' ? 'Wildlife quiz' : 'Quiz de la faune'}</h3>
              <p className="muted">{lang === 'en' ? '10 photos, 4 answers: test yourself and challenge your friends.' : '10 photos, 4 réponses : testez-vous et défiez vos amis.'}</p>
            </div>
            <a className="btn btn-green" href={`/${lang}/faune/quiz`}>{lang === 'en' ? 'Play' : 'Jouer'}</a>
          </div>
        </div>
      </section>
    </>
  );
}

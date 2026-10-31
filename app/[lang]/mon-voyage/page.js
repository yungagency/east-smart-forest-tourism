import { pageMeta } from '@/lib/seo';
import TripPlanner from '@/components/TripPlanner';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMeta({ lang, path: '/mon-voyage', title: lang === 'en' ? 'My trip' : 'Mon voyage', description: lang === 'en' ? 'Your saved destinations, wildlife and places.' : 'Vos destinations, animaux et lieux enregistrés.', noindex: true });
}

export default async function MonVoyage({ params }) {
  const { lang } = await params;
  const en = lang === 'en';
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <div className="eyebrow">{en ? 'Trip planner' : 'Préparer son voyage'}</div>
          <h1>{en ? 'My trip' : 'Mon voyage'}</h1>
          <p className="lead">{en ? 'Everything you saved while browsing, ready to share or send to us so we can help you organise it.' : 'Tout ce que vous avez mis de côté pendant votre visite, prêt à partager ou à nous envoyer pour être accompagné.'}</p>
        </div>
      </section>
      <section className="section tight"><div className="wrap"><TripPlanner lang={lang} /></div></section>
    </>
  );
}

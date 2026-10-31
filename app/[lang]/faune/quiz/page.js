import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { FAUNA } from '@/lib/fauna';
import FaunaQuiz from '@/components/FaunaQuiz';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMeta({
    lang, path: '/faune/quiz',
    title: lang === 'en' ? 'Quiz: East Cameroon wildlife' : "Quiz : la faune de l'Est Cameroun",
    description: lang === 'en' ? 'Test your knowledge: recognise 10 animals of the forests and savannas of East Cameroon from their photo.' : "Testez-vous : reconnaissez 10 animaux des forêts et savanes de l'Est du Cameroun à partir de leur photo.",
    image: FAUNA[0].photos[0].src,
  });
}

export default async function QuizPage({ params }) {
  const { lang } = await params;
  const en = lang === 'en';
  const animals = FAUNA.filter((a) => a.photos[0]).map((a) => ({ slug: a.slug, group: a.group, name_fr: a.name_fr, name_en: a.name_en, sci: a.sci, photo: a.photos[0].src }));
  return (
    <>
      <section className="page-head compact fauna-head">
        <div className="wrap">
          <Link href={`/${lang}/faune`} className="crumb">← {en ? 'Wildlife catalogue' : 'Catalogue de la faune'}</Link>
          <h1>{en ? 'Wildlife quiz' : 'Quiz de la faune'}</h1>
          <p className="lead">{en ? 'Recognise the animals of the eastern forests and savannas.' : "Reconnaissez les animaux des forêts et savanes de l'Est."}</p>
        </div>
      </section>
      <section className="section tight"><div className="wrap" style={{ maxWidth: 760 }}><FaunaQuiz animals={animals} lang={lang} /></div></section>
    </>
  );
}

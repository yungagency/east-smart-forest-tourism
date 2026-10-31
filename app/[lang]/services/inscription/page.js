import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import RequestForm from '@/components/RequestForm';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/services/inscription', title: lang === 'en' ? 'List your hotel or business' : 'Inscrire son hôtel ou son activité', description: d.services.registerIntro });
}

export default async function Inscription({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <Link href={`/${lang}/services`} className="crumb">← {d.services.title}</Link>
          <h1>{d.services.registerTitle}</h1>
          <p className="lead">{d.services.registerIntro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="panel">
            <RequestForm mode="provider" t={d.services} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}

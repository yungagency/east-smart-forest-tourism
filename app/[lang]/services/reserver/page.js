import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { POIS } from '@/lib/places';
import { getSite, t } from '@/lib/data';
import RequestForm from '@/components/RequestForm';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).services.bookTitle, robots: { index: false } };
}

export default async function Reserver({ params, searchParams }) {
  const { lang } = await params;
  const sp = (await searchParams) || {};
  const d = getDict(lang);
  let target = '';
  let label = '';
  if (typeof sp.ref === 'string') {
    const p = POIS.find((x) => x.id === sp.ref);
    if (p) { target = p.id; label = `${p.name}${p.town ? ` (${p.town})` : ''}`; }
  } else if (typeof sp.site === 'string') {
    const s = await getSite(sp.site);
    if (s) { target = `site-${s.slug}`; label = lang === 'en' ? `Visit: ${t(s, 'name', lang)}` : `Visite : ${t(s, 'name', lang)}`; }
  }
  return (
    <>
      <section className="page-head compact">
        <div className="wrap">
          <Link href={`/${lang}/services`} className="crumb">← {d.services.title}</Link>
          <h1>{d.services.bookTitle}</h1>
          <p className="lead">{d.services.bookIntro}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="panel">
            <RequestForm mode="booking" t={d.services} lang={lang} target={target} targetLabel={label} />
          </div>
        </div>
      </section>
    </>
  );
}

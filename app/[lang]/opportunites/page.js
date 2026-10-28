import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getOpportunities, t } from '@/lib/data';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).opps.title };
}

export default async function OppsPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const opps = await getOpportunities();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#e0a64a' }}>{d.nav.opps}</div>
          <h1>{d.opps.title}</h1>
          <p className="lead">{d.opps.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid">
          {opps.map((o) => (
            <div key={o.slug} className="opp">
              <span className="badge badge-warn" style={{ alignSelf: 'flex-start' }}>{d.opps.status}</span>
              <h3 style={{ margin: 0 }}>{t(o, 'title', lang)}</h3>
              {o.location && <div className="small muted"><b>{d.opps.where} :</b> {o.location}</div>}
              <p>{t(o, 'summary', lang)}</p>
              <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                <Link className="btn btn-outline" href={`/${lang}/contact?sujet=investissement&piste=${o.slug}`}>{d.opps.interested}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getOpportunities, t } from '@/lib/data';
import Icon from '@/components/Icons';

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
          <div className="eyebrow">{d.opps.kicker}</div>
          <h1>{d.opps.title}</h1>
          <p className="lead">{d.partner.text}</p>
          <Link className="btn btn-primary" href={`/${lang}/contact?sujet=partenariat`} style={{ marginTop: 8 }}>
            <Icon name="handshake" size={20} /> {d.landing.partner}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>{d.opps.partnersTitle}</h2>
          <div className="partners-grid">
            {d.opps.partners.map((p) => (
              <div key={p.t} className="partner-card">
                <span className="round-ic sm"><Icon name={p.k} size={20} /></span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <h2>{d.opps.leadsTitle}</h2>
          <p className="lead" style={{ marginBottom: 24 }}>{d.opps.intro}</p>
          <div className="grid">
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
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { getDict } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).about.title };
}

export default async function About({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const a = d.about;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#e0a64a' }}>East Smart Forest &amp; Tourism</div>
          <h1>{a.title}</h1>
          <p className="lead">{a.visionText}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <h2>{a.why}</h2>
            <p className="lead">{a.whyText}</p>
          </div>
          <div className="panel" style={{ background: '#fff' }}>
            <div className="eyebrow">{a.status}</div>
            <p style={{ margin: 0 }}>{a.statusText}</p>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <h2>{a.pillars}</h2>
          <div className="pillars" style={{ marginTop: 20 }}>
            {a.pillarsList.map((p, i) => (
              <div key={p.t} className="pillar">
                <div className="num">0{i + 1}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>{a.team}</h2>
          <div className="grid" style={{ marginTop: 20 }}>
            {a.teamList.map((m) => (
              <div key={m.t} className="pillar">
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className="btn btn-dark" href={`/${lang}/contact`}>{d.partner.cta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import Icon from '@/components/Icons';

const PLANNED = ['parc-national-de-lobeke', 'reserve-de-faune-du-dja', 'forteresse-allemande-de-doume', 'grotte-du-roi-mbartoua', 'barrage-et-lac-de-lom-pangar', 'chutes-de-mali'];

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/visite-360', title: lang === 'en' ? '360° virtual tours' : 'Visites virtuelles à 360°', description: d.pano.intro });
}

export default async function Visite360({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const p = d.pano;
  const sites = await getSites();
  const planned = PLANNED.map((s) => sites.find((x) => x.slug === s)).filter(Boolean);
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{p.kicker}</div>
          <h1>{p.title}</h1>
          <p className="lead">{p.intro}</p>
          <span className="pano-soon">{p.status}</span>
        </div>
      </section>
      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <h2>{p.how}</h2>
            <ul className="checklist">{p.howList.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="muted">{d.fauna.soon360}</p>
            <Link className="btn btn-green" href={`/${lang}/visite-3d`}><Icon name="drone" size={18} /> {d.fauna.explore3d.replace(/son habitat|its habitat/, lang === 'en' ? 'the region' : 'la région')}</Link>
          </div>
          <div className="panel">
            <h3 style={{ marginTop: 0 }}>{p.partner}</h3>
            <p className="muted">{p.partnerText}</p>
            <Link className="btn btn-dark" href={`/${lang}/contact?sujet=partenariat`}><Icon name="handshake" size={18} /> {d.landing?.partner || 'Partenariat'}</Link>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <h2>{p.planned}</h2>
          <div className="planned" style={{ marginTop: 18 }}>
            {planned.map((s) => (
              <Link key={s.slug} href={`/${lang}/sites/${s.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.image_url && <img src={s.image_url} alt={t(s, 'name', lang)} loading="lazy" decoding="async" referrerPolicy="no-referrer" />}
                <em>{p.status}</em>
                <span>{t(s, 'name', lang)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

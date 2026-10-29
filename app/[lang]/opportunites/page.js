import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getOpportunities, getSites, t } from '@/lib/data';
import Icon from '@/components/Icons';
import RequestForm from '@/components/RequestForm';
import { POIS, km } from '@/lib/places';

// Portes d'entrée des grands sites et offre d'hébergement référencée (OpenStreetMap, rayon 30 km)
const HUBS = [
  { name: 'Mambélé', lat: 2.4412, lng: 15.4233, sites: ['parc-national-de-lobeke'] },
  { name: 'Moloundou', lat: 2.6232, lng: 16.0662, sites: ['parc-national-de-lobeke', 'parc-national-de-boumba-bek'] },
  { name: 'Yokadouma', lat: 3.5268, lng: 15.0488, sites: ['parc-national-de-boumba-bek', 'parc-national-de-lobeke'] },
  { name: 'Somalomo', lat: 3.3814, lng: 12.7327, sites: ['reserve-de-faune-du-dja'] },
  { name: 'Lomié', lat: 3.1703, lng: 13.6469, sites: ['reserve-de-faune-du-dja', 'lomie-ville-historique'] },
  { name: 'Ngoyla', lat: 2.6278, lng: 14.0257, sites: ['parc-national-de-nki'] },
  { name: 'Bétaré-Oya', lat: 5.6, lng: 14.08, sites: ['chutes-de-mali', 'parc-national-du-mbam-et-djerem'] },
  { name: 'Bertoua', lat: 4.583, lng: 13.683, sites: ['bertoua', 'barrage-et-lac-de-lom-pangar', 'parc-national-de-deng-deng'] },
];

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).opps.title };
}

export default async function OppsPage({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const opps = await getOpportunities();
  const sites = await getSites();
  const sname = (slug) => { const x = sites.find((y) => y.slug === slug); return x ? t(x, 'name', lang) : slug; };
  const lodging = POIS.filter((p) => p.layer === 'lodging');
  const needs = HUBS.map((h) => ({ ...h, n: lodging.filter((p) => km(h, p) <= 30).length })).sort((a, b) => a.n - b.n);
  const maxN = Math.max(1, ...needs.map((h) => h.n));
  const iv = d.invest;
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
          <h2>{iv.projectsTitle}</h2>
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

      <section className="section">
        <div className="wrap">
          <h2>{iv.needsTitle}</h2>
          <p className="lead" style={{ marginBottom: 20 }}>{iv.needsIntro}</p>
          <div className="table-wrap">
            <table className="needs">
              <thead><tr><th>{iv.hub}</th><th>{iv.listed}</th><th>{iv.near}</th></tr></thead>
              <tbody>
                {needs.map((h) => (
                  <tr key={h.name}>
                    <td><b>{h.name}</b></td>
                    <td><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><b>{h.n}</b><div className="bar" style={{ flex: 1 }}><i style={{ width: `${(h.n / maxN) * 100}%` }} /></div></div></td>
                    <td>{h.sites.map(sname).join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted small" style={{ marginTop: 8 }}>{lang === 'en' ? 'Source: OpenStreetMap (ODbL), October 2026 extract, 30 km radius. Not a market study.' : 'Source : OpenStreetMap (ODbL), extraction d’octobre 2026, rayon de 30 km. Ce n’est pas une étude de marché.'}</p>
        </div>
      </section>

      <section className="section band">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <h2>{iv.landTitle}</h2>
            <p>{iv.landIntro}</p>
            <div className="empty-box" style={{ margin: '16px 0' }}><p><b>{iv.landEmpty}</b></p></div>
            <b>{lang === 'en' ? 'Required documents' : 'Pièces demandées'}</b>
            <ul className="checklist">{iv.landDocs.map((x) => <li key={x}>{x}</li>)}</ul>
            <h3 style={{ marginTop: 28 }}>{iv.localTitle}</h3>
            <p className="muted">{iv.localIntro}</p>
            <Link className="btn btn-outline" href={`/${lang}/services/inscription`}>{iv.localCta}</Link>
          </div>
          <div className="panel" id="proposer">
            <h3 style={{ marginTop: 0 }}>{iv.formTitle}</h3>
            <RequestForm mode="proposal" t={{ ...d.services, ...iv }} kinds={iv.kinds} docsLabel={iv.docsHave} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}

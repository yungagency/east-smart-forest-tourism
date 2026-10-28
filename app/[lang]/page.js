import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import SiteCard from '@/components/SiteCard';
import MapView from '@/components/MapView';
import { HERO_IMAGE } from '@/lib/seed';

export const revalidate = 60;

export default async function Home({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = await getSites();
  const featured = sites.filter((s) => s.featured).slice(0, 4);
  const points = sites.map((s) => ({
    lat: s.lat, lng: s.lng, category: s.category, name: t(s, 'name', lang), sub: s.commune, href: `/${lang}/sites/${s.slug}`,
  }));

  return (
    <>
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-photo" src={HERO_IMAGE.image_url} alt="" referrerPolicy="no-referrer" />
        <div className="hero-bg" />
        <div className="hero-credit"><a href={HERO_IMAGE.image_source} target="_blank" rel="noopener noreferrer">{d.heroCredit} · {HERO_IMAGE.image_credit}</a></div>
        <svg className="hero-trees" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#0c2621" d="M0 160 V110 l30-50 30 50 20-70 25 70 30-40 25 40 40-90 40 90 25-55 25 55 35-75 35 75 30-45 30 45 45-100 45 100 25-60 25 60 35-80 35 80 30-50 30 50 40-95 40 95 25-55 25 55 35-70 35 70 30-45 30 45 45-90 45 90 25-60 25 60 35-75 35 75 30-50 30 50 40-85 40 85 V160 Z" />
          <path fill="#fbf8f2" d="M0 160 V148 Q360 132 720 146 T1440 142 V160 Z" />
        </svg>
        <div className="wrap">
          <div className="hero-in">
            <div className="eyebrow">{d.hero.kicker}</div>
            <h1>{d.hero.title}</h1>
            <p>{d.hero.text}</p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href={`/${lang}/sites`}>{d.hero.cta1}</Link>
              <Link className="btn btn-ghost" href={`/${lang}/contact`}>{d.hero.cta2}</Link>
            </div>
            <div className="motto">VALORISER · CONNECTER · INNOVER · DURER</div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="stats">
          {[
            { n: '1', l: d.stats.unesco },
            { n: String(sites.filter((x) => x.category === 'parc').length), l: d.stats.parks },
            { n: String(sites.length), l: d.stats.pages },
          ].map((s) => <div key={s.l} className="stat"><b>{s.n}</b><span>{s.l}</span></div>)}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <h2 style={{ margin: 0 }}>{d.featured}</h2>
            <Link href={`/${lang}/sites`} className="btn btn-outline">{d.seeAll} →</Link>
          </div>
          <div className="grid">
            {featured.map((s) => <SiteCard key={s.slug} site={s} lang={lang} d={d} />)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <h2>{d.mapTitle}</h2>
          <MapView points={points} lang={lang} />
          <p className="muted small" style={{ marginTop: 8 }}>{d.mapNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>{d.phases.title}</h2>
          <div className="phases" style={{ marginTop: 24 }}>
            {d.phases.items.map((p, i) => (
              <div key={p.t} className={`phase ${i === 0 ? 'now' : ''}`}>
                <small>{p.k}</small>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="wrap split">
          <div>
            <div className="eyebrow" style={{ color: '#e0a64a' }}>{d.nav.opps}</div>
            <h2>{d.oppsTeaser.title}</h2>
            <p className="lead">{d.oppsTeaser.text}</p>
            <Link className="btn btn-primary" href={`/${lang}/opportunites`}>{d.oppsTeaser.cta}</Link>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,.15)', paddingLeft: 32 }}>
            <h3>{d.partner.title}</h3>
            <p style={{ opacity: 0.8 }}>{d.partner.text}</p>
            <Link className="btn btn-ghost" href={`/${lang}/contact`}>{d.partner.cta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

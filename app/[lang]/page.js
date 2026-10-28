import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { WHY_IMAGE, PILLARS_IMAGE } from '@/lib/seed';
import { SITE } from '@/lib/site-config';
import SiteCard from '@/components/SiteCard';
import MapView from '@/components/MapView';
import Icon from '@/components/Icons';

export const revalidate = 60;

const PILLAR_ICONS = ['tree', 'elephant', 'cap', 'megaphone', 'pin'];

export default async function Home({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const L = d.landing;
  const sites = await getSites();
  const featured = sites.filter((s) => s.featured).slice(0, 4);
  const points = sites.map((s) => ({
    lat: s.lat, lng: s.lng, category: s.category, name: t(s, 'name', lang), sub: s.commune, href: `/${lang}/sites/${s.slug}`,
  }));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-photo"
          src="/images/hero-east.jpg"
          srcSet="/images/hero-east-960.jpg 960w, /images/hero-east.jpg 1672w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="wrap hero-in">
          <div className="hero-kicker">{L.kicker}</div>
          <h1>
            {L.t1}<br />{L.t2}<span className="accent">{L.t3}</span>
          </h1>
          <p>{L.text}</p>
          <div className="hero-cta">
            <Link className="btn btn-green" href={`/${lang}/a-propos`}><Icon name="leaf" size={18} /> {L.cta1}</Link>
            <Link className="btn btn-ghost" href={`/${lang}/sites`}><Icon name="map" size={18} /> {L.cta2}</Link>
          </div>
        </div>
      </section>

      {/* VISION / PROJET / OBJECTIFS */}
      <section className="section intro">
        <div className="wrap intro-grid">
          <div className="intro-left">
            <div className="intro-item">
              <span className="round-ic"><Icon name="eye" size={26} /></span>
              <div>
                <h2>{L.vision}</h2>
                <p>{d.about.visionText}</p>
              </div>
            </div>
            <div className="intro-item">
              <span className="round-ic"><Icon name="forest" size={26} /></span>
              <div>
                <h2>{L.project}</h2>
                <p>{L.projectText}</p>
              </div>
            </div>
          </div>
          <div className="objectives">
            <div className="objectives-head">
              <span className="round-ic"><Icon name="target" size={26} /></span>
              <h2>{L.objectives}</h2>
            </div>
            <ul>
              {L.objectivesList.map((o) => (
                <li key={o}><span className="check"><Icon name="check" size={13} stroke={3} /></span>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 PILIERS */}
      <section className="pillars-band" style={{ '--bg': `url("${PILLARS_IMAGE.image_url}")` }}>
        <div className="wrap">
          <div className="eyebrow light">{L.pillarsKicker}</div>
          <h2>{L.pillarsT1}<br />{L.pillarsT2}<span className="accent">{L.pillarsT3}</span></h2>
          <div className="pillars-row">
            {d.about.pillarsList.map((p, i) => (
              <div key={p.t} className="pillar-col">
                <span className="pillar-ic"><Icon name={PILLAR_ICONS[i]} size={30} /></span>
                <h3><span className="num">{i + 1}</span>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">{d.nav.sites}</div>
              <h2>{d.featured}</h2>
            </div>
            <Link href={`/${lang}/sites`} className="btn btn-outline">{d.seeAll} <Icon name="arrow" size={16} /></Link>
          </div>
          <div className="grid">
            {featured.map((s) => <SiteCard key={s.slug} site={s} lang={lang} d={d} />)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">{d.nav.map}</div>
              <h2>{d.mapTitle}</h2>
            </div>
            <Link href={`/${lang}/opportunites`} className="btn btn-outline">{d.oppsTeaser.cta} <Icon name="arrow" size={16} /></Link>
          </div>
          <MapView points={points} lang={lang} />
          <p className="muted small" style={{ marginTop: 8 }}>{d.mapNote}</p>
        </div>
      </section>

      {/* POURQUOI EAST */}
      <section className="section why">
        <div className="wrap why-grid">
          <div className="why-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={WHY_IMAGE.image_url} alt="" loading="lazy" referrerPolicy="no-referrer" />
            <div className="why-caption">
              <span className="round-ic sm"><Icon name="drone" size={20} /></span>
              <span>{L.whyCaption}</span>
              <Link href={`/${lang}/a-propos`} className="why-go" aria-label={L.cta1}><Icon name="arrow" size={16} /></Link>
            </div>
          </div>
          <div className="why-text">
            <span className="bar" />
            <h2>{L.whyTitle}</h2>
            <p>{L.whyText}</p>
            <div className="contact-lines">
              <a href={`mailto:${SITE.email}`}><span className="round-ic sm"><Icon name="mail" size={18} /></span><span><b>{L.email}</b>{SITE.email}</span></a>
              <a href={`tel:${SITE.phoneHref}`}><span className="round-ic sm"><Icon name="phone" size={18} /></span><span><b>{L.phone}</b>{SITE.phone}</span></a>
            </div>
          </div>
          <div className="together">
            <span className="round-ic"><Icon name="handshake" size={24} /></span>
            <h3>{L.togetherTitle}</h3>
            <p>{L.togetherText}</p>
            <Link className="btn btn-green" href={`/${lang}/contact?sujet=partenariat`}>{L.togetherCta} <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

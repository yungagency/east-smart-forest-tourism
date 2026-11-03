import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { FAUNA, SITE_GALLERY, tf } from '@/lib/fauna';
import { GUIDES, GUIDE_SOURCES } from '@/lib/guides';
import { POIS } from '@/lib/places';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/credits', title: d.credits.title, description: d.credits.intro, noindex: true });
}

const host = (u) => u.replace(/^https?:\/\//, '').replace(/^www\./, '').slice(0, 80);
const Credit = ({ c }) => (c.page ? <a href={c.page} target="_blank" rel="noopener noreferrer">{c.text}</a> : c.text);

// Toutes les attributions et sources regroupées ici (au lieu d'être affichées sur chaque page)
export default async function Credits({ params }) {
  const { lang } = await params;
  const en = lang === 'en';
  const d = getDict(lang);
  const sites = await getSites();

  // Photos des destinations : photo principale + galerie, sans doublon
  const sitePhotos = sites.map((s) => {
    const seen = new Set();
    const list = [];
    if (s.image_url && s.image_credit) { seen.add(s.image_url); list.push({ text: s.image_credit, page: s.image_source }); }
    (SITE_GALLERY[s.slug] || []).forEach((p) => {
      if (seen.has(p.src)) return;
      seen.add(p.src);
      list.push({ text: `${p[`caption_${lang}`] || p.caption_fr} : ${p.credit} · ${p.license}`, page: p.page });
    });
    return { slug: s.slug, name: t(s, 'name', lang), list, sources: Array.isArray(s.sources) ? s.sources : [] };
  });

  return (
    <>
      <section className="page-head">
        <div className="wrap"><h1>{d.credits.title}</h1><p className="lead">{d.credits.intro}</p></div>
      </section>
      <section className="section tight">
        <div className="wrap credits">
          <h2>{en ? 'Destinations' : 'Destinations'}</h2>
          {sitePhotos.map((s) => (
            <details key={s.slug}>
              <summary><b>{s.name}</b></summary>
              {s.list.length > 0 && (<><h3>{en ? 'Photos' : 'Photos'}</h3><ul>{s.list.map((c, i) => <li key={i}><Credit c={c} /></li>)}</ul></>)}
              {s.sources.length > 0 && (<><h3>{en ? 'Sources' : 'Sources'}</h3><ul>{s.sources.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{host(u)}</a></li>)}</ul></>)}
              <p className="small"><Link href={`/${lang}/sites/${s.slug}`}>{en ? 'Open the page' : 'Voir la fiche'} →</Link></p>
            </details>
          ))}

          <h2>{en ? 'Practical guides' : 'Guides pratiques'}</h2>
          {GUIDES.map((g) => (
            <details key={g.slug}>
              <summary><b>{en ? g.title_en : g.title_fr}</b></summary>
              <ul>{g.sources.map((k) => GUIDE_SOURCES[k] && <li key={k}><a href={GUIDE_SOURCES[k].url} target="_blank" rel="noopener noreferrer">{GUIDE_SOURCES[k].label}</a></li>)}</ul>
            </details>
          ))}

          <h2>{en ? 'Wildlife' : 'Faune'}</h2>
          {FAUNA.map((a) => (
            <details key={a.slug}>
              <summary><b>{tf(a, 'name', lang)}</b> <i className="muted">{a.sci}</i></summary>
              {a.photos?.length > 0 && <ul>{a.photos.map((p, i) => <li key={i}><Credit c={{ text: `${en ? 'Photo' : 'Photo'} : ${p.credit} · ${p.license}`, page: p.page }} /></li>)}</ul>}
              {a.sources?.length > 0 && <ul>{a.sources.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{host(u)}</a></li>)}</ul>}
            </details>
          ))}

          <h2>{en ? 'Places on the map' : 'Lieux de la carte'}</h2>
          <ul>{POIS.filter((p) => p.image && p.credit).map((p) => <li key={p.id}>{p.name} : {en ? 'photo' : 'photo'} {p.credit}</li>)}</ul>

          <h2>{en ? 'Maps and data' : 'Cartes et données'}</h2>
          <ul>
            <li>{en ? 'Maps and places' : 'Cartes et lieux'} : © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">{en ? 'OpenStreetMap contributors' : 'les contributeurs OpenStreetMap'}</a> (ODbL)</li>
            <li>{en ? 'Satellite imagery' : 'Imagerie satellite'} : Sentinel-2 cloudless 2016 © EOX IT Services GmbH ({en ? 'contains modified Copernicus Sentinel data' : 'contient des données Copernicus Sentinel modifiées'})</li>
          </ul>
        </div>
      </section>
    </>
  );
}

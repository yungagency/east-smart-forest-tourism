import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import { getSite, t } from '@/lib/data';
import { GUIDES, getGuide } from '@/lib/guides';
import { pageMeta, JsonLd, breadcrumb, abs } from '@/lib/seo';
import FavButton from '@/components/FavButton';
import ShareBar from '@/components/ShareBar';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

const f = (o, k, lang) => o[`${k}_${lang}`] || o[`${k}_fr`];

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const s = await getSite(slug);
  const name = s ? t(s, 'name', lang) : slug;
  const full = f(g, 'title', lang);
  const title = full.length <= 40 ? full : `${name}${lang === 'en' ? ': visitor guide' : ' : guide pratique'}`;
  return pageMeta({ lang, path: `/guides/${slug}`, title, description: f(g, 'intro', lang).slice(0, 158), image: s?.image_url, imageAlt: f(g, 'title', lang), type: 'article' });
}

export default async function GuidePage({ params }) {
  const { lang, slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const d = getDict(lang);
  const s = await getSite(slug);
  const en = lang === 'en';
  const name = s ? t(s, 'name', lang) : slug;
  const date = new Date(g.updated).toLocaleDateString(en ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: f(g, 'title', lang), description: f(g, 'intro', lang), dateModified: g.updated, inLanguage: lang, image: s?.image_url ? abs(s.image_url) : undefined, author: { '@type': 'Organization', name: 'East Smart Forest & Tourism' }, about: { '@type': 'TouristAttraction', name, url: abs(`/${lang}/sites/${slug}`) } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faq.map((q) => ({ '@type': 'Question', name: f(q, 'q', lang), acceptedAnswer: { '@type': 'Answer', text: f(q, 'a', lang) } })) },
    breadcrumb([
      { name: en ? 'Home' : 'Accueil', url: `/${lang}` },
      { name: d.sites.title, url: `/${lang}/sites` },
      { name, url: `/${lang}/sites/${slug}` },
      { name: en ? 'Practical guide' : 'Guide pratique', url: `/${lang}/guides/${slug}` },
    ]),
  ];
  return (
    <>
      <JsonLd data={ld} />
      <section className="page-head guide-head" style={s?.image_url ? { '--bg': `url("${s.image_url}")` } : undefined}>
        <div className="wrap">
          <Link href={`/${lang}/sites/${slug}`} className="crumb">← {name}</Link>
          <div className="eyebrow">{en ? 'Practical guide' : 'Guide pratique'}</div>
          <h1>{f(g, 'title', lang)}</h1>
          <p className="lead">{f(g, 'intro', lang)}</p>
          <div className="head-actions">
            <FavButton lang={lang} light item={{ id: `site:${slug}`, type: 'site', name, href: `/${lang}/sites/${slug}`, image: s?.image_url }} />
            <ShareBar lang={lang} url={`/${lang}/guides/${slug}`} title={f(g, 'title', lang)} />
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap guide-layout">
          <article>
            <dl className="guide-facts">
              {g.facts.map((x) => (
                <div key={x.fr}><dt>{x[lang] || x.fr}</dt><dd>{f(x, 'v', lang)}</dd></div>
              ))}
            </dl>

            {g.sections.map((sec) => (
              <section key={sec.h_fr} className="guide-sec">
                <h2>{f(sec, 'h', lang)}</h2>
                {(sec[`p_${lang}`] || sec.p_fr).map((p, i) => <p key={i}>{p}</p>)}
                {sec.link === 'services' && <p><Link href={`/${lang}/services`}>{en ? 'See accommodation in the directory' : 'Voir les hébergements dans l’annuaire'} →</Link></p>}
              </section>
            ))}

            <h2>{en ? 'Frequently asked questions' : 'Questions fréquentes'}</h2>
            <div className="faq">
              {g.faq.map((q) => (
                <details key={q.q_fr}>
                  <summary>{f(q, 'q', lang)}</summary>
                  <p>{f(q, 'a', lang)}</p>
                </details>
              ))}
            </div>

            <div className="note">
              {en
                ? `Updated ${date}. Fees, access and conditions can change: confirm them with the conservation service or your operator before you travel.`
                : `Mis à jour le ${date}. Tarifs, accès et conditions peuvent évoluer : faites-les confirmer par le service de conservation ou votre voyagiste avant le départ.`}
            </div>
          </article>

          <aside className="aside">
            <b style={{ fontFamily: 'var(--font-display)' }}>{en ? 'Plan your trip' : 'Préparer votre voyage'}</b>
            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              <Link className="btn btn-green" href={`/${lang}/services/reserver?site=${slug}`}>{d.services.book}</Link>
              <Link className="btn btn-outline" href={`/${lang}/carte?lieu=site-${slug}`}>{d.services.onMap}</Link>
              <Link className="btn btn-outline" href={`/${lang}/visite-3d?site=${slug}`}>{d.map.view3d}</Link>
              <Link className="btn btn-outline" href={`/${lang}/sites/${slug}`}>{en ? 'Destination page' : 'Fiche de la destination'}</Link>
            </div>
            <p className="muted small" style={{ marginTop: 14 }}>{en ? `Updated ${date}` : `Mis à jour le ${date}`}</p>
          </aside>
        </div>
      </section>
    </>
  );
}

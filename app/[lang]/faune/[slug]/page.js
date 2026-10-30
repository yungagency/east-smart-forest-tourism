import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import { getSites } from '@/lib/data';
import { FAUNA, IUCN, GROUPS, getAnimal, tf } from '@/lib/fauna';
import Gallery from '@/components/Gallery';
import Icon from '@/components/Icons';

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return FAUNA.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const a = getAnimal(slug);
  if (!a) return {};
  return {
    title: `${tf(a, 'name', lang)} (${a.sci})`,
    description: tf(a, 'summary', lang),
    openGraph: { images: a.photos[0] ? [{ url: a.photos[0].src }] : [] },
  };
}

export default async function AnimalPage({ params }) {
  const { lang, slug } = await params;
  const d = getDict(lang);
  const t = d.fauna;
  const a = getAnimal(slug);
  if (!a) notFound();
  const sites = await getSites();
  const where = a.sites.map((s) => sites.find((x) => x.slug === s)).filter(Boolean);
  const status = a.iucn ? IUCN[a.iucn] : null;
  const others = (a.sites.length
    ? FAUNA.filter((x) => x.slug !== a.slug && x.sites.some((s) => a.sites.includes(s)))
    : FAUNA.filter((x) => x.slug !== a.slug && x.group === a.group)).slice(0, 5);
  const first3d = where.find((s) => typeof s.lat === 'number');

  return (
    <>
      <section className="animal-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="animal-hero-img" src={a.photos[0].src} alt="" referrerPolicy="no-referrer" />
        <div className="animal-hero-shade" />
        <div className="wrap animal-hero-in">
          <Link href={`/${lang}/faune`} className="crumb">← {t.back}</Link>
          <div className="eyebrow">{GROUPS[a.group][lang]}</div>
          <h1>{tf(a, 'name', lang)}</h1>
          <p className="animal-sci"><em>{a.sci}</em></p>
          {status && (
            <div className="animal-tags">
              <span className="badge" style={{ background: status.c, color: '#fff' }}>{t.status} : {status[lang]} ({a.iucn})</span>
            </div>
          )}
        </div>
      </section>

      <section className="section tight">
        <div className="wrap animal-layout">
          <article>
            <dl className="id-card">
              <div><dt>{lang === 'en' ? 'Common name' : 'Nom français'}</dt><dd>{a.name_fr}</dd></div>
              <div><dt>{t.sci}</dt><dd><em>{a.sci}</em></dd></div>
              {a.local && <div><dt>{t.local}</dt><dd>{a.local}</dd></div>}
              {status && <div><dt>{t.status}</dt><dd>{status[lang]}</dd></div>}
              <div><dt>{lang === 'en' ? 'Group' : 'Groupe'}</dt><dd>{GROUPS[a.group][lang]}</dd></div>
            </dl>

            <h2>{t.presentation}</h2>
            <p className="lead" style={{ color: 'var(--ink)' }}>{tf(a, 'summary', lang)}</p>

            <h2>{t.gallery}</h2>
            <Gallery photos={a.photos} lang={lang} labels={d.gallery} />
            <p className="muted small" style={{ marginTop: 8 }}>{t.photoNote}</p>

            {tf(a, 'description', lang) && (
              <>
                <h2>{t.description}</h2>
                <p>{tf(a, 'description', lang)}</p>
              </>
            )}

            <div className="two-col">
              <div className="info-box"><span className="round-ic sm"><Icon name="leaf" size={18} /></span><div><h3>{t.diet}</h3><p>{tf(a, 'diet', lang)}</p></div></div>
              <div className="info-box"><span className="round-ic sm"><Icon name="forest" size={18} /></span><div><h3>{t.habitat}</h3><p>{tf(a, 'habitat', lang)}</p></div></div>
            </div>

            <h2>{t.where}</h2>
            {where.length === 0 && <p>{t.regional}</p>}
            <div className="where-list">
              {where.map((s) => (
                <div key={s.slug} className="where-item">
                  <span className="round-ic sm"><Icon name="pin" size={18} /></span>
                  <div><b>{s[`name_${lang}`] || s.name_fr}</b><small>{s.commune}</small></div>
                  <div className="where-actions">
                    <Link className="btn btn-outline" href={`/${lang}/sites/${s.slug}`}>{d.map.openSheet}</Link>
                    {typeof s.lat === 'number' && <Link className="btn btn-green" href={`/${lang}/visite-3d?site=${s.slug}`}>{d.map.view3d}</Link>}
                  </div>
                </div>
              ))}
            </div>
            {where.length > 0 && <p className="muted small">{t.whereNote}</p>}

            {(a.track || tf(a, 'traces', lang)) && (
              <>
                <h2>{t.traces}</h2>
                <div className="traces">
                  {a.track && <Gallery photos={[a.track]} lang={lang} labels={d.gallery} compact />}
                  <p>{tf(a, 'traces', lang)}</p>
                </div>
              </>
            )}

            <div className="explore-box">
              <div>
                <h3>{t.explore360}</h3>
                <p className="muted">{t.soon360}</p>
              </div>
              {first3d && (
                <Link className="btn btn-green" href={`/${lang}/visite-3d?site=${first3d.slug}`}><Icon name="drone" size={18} /> {t.explore3d}</Link>
              )}
              <Link className="btn btn-outline" href={`/${lang}/visite-360`}>{t.explore360}</Link>
            </div>

            <h3 style={{ marginTop: 28 }}>{t.sources}</h3>
            <ol className="sources">
              {a.sources.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{u.replace(/^https?:\/\//, '').slice(0, 80)}</a></li>)}
            </ol>
          </article>

          <aside className="aside">
            <b style={{ fontFamily: 'var(--font-display)' }}>{t.similar}</b>
            <div className="mini-list">
              {others.map((o) => (
                <Link key={o.slug} href={`/${lang}/faune/${o.slug}`} className="mini-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.photos[0].src} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  <span><b>{tf(o, 'name', lang)}</b><em className="sci">{o.sci}</em></span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

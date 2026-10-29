import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import { getSite, getSites, t } from '@/lib/data';
import { SEED_SITES } from '@/lib/seed';
import Placeholder from '@/components/Placeholder';
import MapView from '@/components/MapView';
import SiteCard from '@/components/SiteCard';
import Gallery from '@/components/Gallery';
import { faunaForSite, SITE_GALLERY, IUCN, tf } from '@/lib/fauna';
import { nearby } from '@/lib/places';

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return SEED_SITES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const s = await getSite(slug);
  if (!s) return {};
  return { title: t(s, 'name', lang), description: t(s, 'summary', lang) };
}

export default async function SitePage({ params }) {
  const { lang, slug } = await params;
  const d = getDict(lang);
  const s = await getSite(slug);
  if (!s) notFound();
  const all = await getSites();
  const related = all.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);
  const hasCoords = typeof s.lat === 'number' && typeof s.lng === 'number';
  const sources = Array.isArray(s.sources) ? s.sources : [];
  const gallery = SITE_GALLERY[s.slug] || [];
  const fauna = faunaForSite(s.slug);
  const near = hasCoords ? nearby(s, ['lodging', 'food'], 45).slice(0, 6) : [];

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Link href={`/${lang}/sites`} className="crumb">← {d.sites.back}</Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>{d.sites.cats[s.category]}</span>
            {s.status === 'verifie'
              ? <span className="badge badge-ok">{d.sites.verified}</span>
              : s.limited
                ? <span className="badge badge-limited">{d.sites.limited}</span>
                : <span className="badge badge-warn">{d.sites.toVerify}</span>}
          </div>
          <h1>{t(s, 'name', lang)}</h1>
          <p className="lead">{t(s, 'summary', lang)}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap detail">
          <article>
            <div className="hero-img">
              {s.image_url
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={s.image_url} alt={t(s, 'name', lang)} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Placeholder category={s.category} />}
            </div>
            {s.image_url && s.image_credit && (
              <p className="photo-credit">
                {s.image_source ? <a href={s.image_source} target="_blank" rel="noopener noreferrer">{s.image_credit}</a> : s.image_credit}
              </p>
            )}
            {gallery.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <Gallery photos={gallery} lang={lang} labels={d.gallery} />
              </div>
            )}
            {t(s, 'description', lang).split('\n').filter(Boolean).map((p, i) => <p key={i} style={{ fontSize: '1.05rem' }}>{p}</p>)}
            {s.status !== 'verifie' && (
              <div className="note">
                {s.limited ? d.sites.limitedNote : d.sites.verifyNote}{' '}
                <Link href={`/${lang}/contact?sujet=contenu&site=${s.slug}`} style={{ fontWeight: 600 }}>{d.sites.suggest} →</Link>
              </div>
            )}
            {fauna.length > 0 && (
              <>
                <h2 style={{ marginTop: 32 }}>{d.fauna.onSite}</h2>
                <div className="grid fauna-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                  {fauna.map((a) => (
                    <Link key={a.slug} href={`/${lang}/faune/${a.slug}`} className="card animal-card">
                      <div className="card-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={a.photos[0]?.src} alt={tf(a, 'name', lang)} loading="lazy" referrerPolicy="no-referrer" />
                        <span className="iucn-badge" style={{ background: IUCN[a.iucn].c }}>{a.iucn}</span>
                      </div>
                      <div className="card-body" style={{ padding: 12 }}>
                        <h3 style={{ fontSize: '.98rem' }}>{tf(a, 'name', lang)}</h3>
                        <em className="sci">{a.sci}</em>
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="muted small" style={{ marginTop: 8 }}>{d.fauna.whereNote}</p>
              </>
            )}
            {hasCoords && (
              <div className="explore-box">
                <div>
                  <h3>{d.map.view3d}</h3>
                  <p className="muted">{d.fauna.soon360}</p>
                </div>
                <Link className="btn btn-green" href={`/${lang}/visite-3d?site=${s.slug}`}>{d.map.view3d}</Link>
                <Link className="btn btn-outline" href={`/${lang}/carte?lieu=site-${s.slug}`}>{d.services.onMap}</Link>
              </div>
            )}
            {sources.length > 0 && (
              <>
                <h3 style={{ marginTop: 28 }}>{d.sites.sources}</h3>
                <ol className="sources">
                  {sources.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{u.replace(/^https?:\/\//, '').slice(0, 90)}</a></li>)}
                </ol>
              </>
            )}
          </article>
          <aside className="aside">
            <dl style={{ margin: 0 }}>
              <dt>{d.sites.location}</dt>
              <dd>{s.commune}{s.departement ? ` · ${s.departement}` : ''}</dd>
              <dt>{d.sites.access}</dt>
              <dd>{t(s, 'access', lang) || '—'}</dd>
            </dl>
            <div style={{ marginTop: 18 }}>
              {hasCoords ? (
                <>
                  <MapView small zoom={8} points={[{ lat: s.lat, lng: s.lng, category: s.category, name: t(s, 'name', lang) }]} lang={lang} />
                  {s.coords_approx && <p className="muted small" style={{ marginTop: 6 }}>{d.sites.approx}</p>}
                </>
              ) : (
                <p className="muted small">{d.sites.noCoords}</p>
              )}
            </div>
            {near.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <b style={{ fontSize: '.9rem' }}>{d.services.nearby}</b>
                <ul className="near-list">
                  {near.map((p) => (
                    <li key={p.id}>
                      <a href={`/${lang}/carte?lieu=${p.id}`}>{p.name}</a>
                      <small>{Math.round(p.d)} {d.services.km}</small>
                    </li>
                  ))}
                </ul>
                <Link className="btn btn-green" style={{ marginTop: 12, padding: '9px 14px', fontSize: '.85rem' }} href={`/${lang}/services/reserver?site=${s.slug}`}>{d.services.book}</Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section band">
          <div className="wrap">
            <h2>{d.sites.cats[s.category]}</h2>
            <div className="grid" style={{ marginTop: 20 }}>
              {related.map((r) => <SiteCard key={r.slug} site={r} lang={lang} d={d} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

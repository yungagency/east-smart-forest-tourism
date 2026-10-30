import Link from 'next/link';
import Placeholder from './Placeholder';

const t = (o, f, l) => o?.[`${f}_${l}`] || o?.[`${f}_fr`] || '';

export default function SiteCard({ site, lang, d }) {
  return (
    <Link href={`/${lang}/sites/${site.slug}`} className="card">
      <div className="card-img">
        {site.image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.image_url} alt={t(site, 'name', lang)} loading="lazy" referrerPolicy="no-referrer" />
            <span className="credit-dot">©</span>
          </>
        ) : (
          <Placeholder category={site.category} label={d.sites.cats[site.category]} />
        )}
      </div>
      <div className="card-body">
        <h3>{t(site, 'name', lang)}</h3>
        <p>{t(site, 'summary', lang)}</p>
        <div className="card-meta">
          <span>{site.commune}</span>
          <span className="card-more">{lang === 'en' ? 'Discover' : 'Découvrir'} →</span>
        </div>
      </div>
    </Link>
  );
}

import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getSites, t } from '@/lib/data';
import { HERO_IMAGE } from '@/lib/seed';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).credits.title, robots: { index: false } };
}

export default async function Credits({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const sites = (await getSites()).filter((s) => s.image_url && s.image_credit);
  const items = [{ name: d.heroCredit, ...HERO_IMAGE }, ...sites.map((s) => ({ name: t(s, 'name', lang), slug: s.slug, ...s }))];
  return (
    <>
      <section className="page-head">
        <div className="wrap"><h1>{d.credits.title}</h1><p className="lead">{d.credits.intro}</p></div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <ul className="credits-list">
            {items.map((it, i) => (
              <li key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image_url} alt="" loading="lazy" referrerPolicy="no-referrer" />
                <div>
                  <b>{it.slug ? <Link href={`/${lang}/sites/${it.slug}`}>{it.name}</Link> : it.name}</b>
                  <div className="small muted">
                    {it.image_source ? <a href={it.image_source} target="_blank" rel="noopener noreferrer">{it.image_credit}</a> : it.image_credit}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

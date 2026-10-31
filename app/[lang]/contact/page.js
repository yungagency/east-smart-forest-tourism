import { pageMeta } from '@/lib/seo';
import { getDict } from '@/lib/i18n';
import { SITE } from '@/lib/site-config';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/contact', title: lang === 'en' ? 'Contact and partnerships' : 'Contact et partenariats', description: d.contact.intro || d.landing.text });
}

export default async function Contact({ params, searchParams }) {
  const { lang } = await params;
  const sp = (await searchParams) || {};
  const d = getDict(lang);
  const subj = ['partenariat', 'investissement', 'contenu', 'autre'].includes(sp.sujet) ? sp.sujet : 'partenariat';
  const ref = sp.site || sp.piste;
  const defaultMessage = ref ? `[${ref}]\n` : '';
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{d.contact.title}</h1>
          <p className="lead">{d.contact.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <ContactForm d={d} lang={lang} defaultSubject={subj} defaultMessage={defaultMessage} />
          <div className="panel">
            <div className="eyebrow">{d.contact.direct}</div>
            <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p>
            <a className="btn btn-dark" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

// Outils SEO : URL du site, liens de langue, URL canonique, données structurées.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://east-smart-forest-tourism.vercel.app').replace(/\/$/, '');
export const BRAND = 'EAST Smart Forest';

// path : chemin sans la langue, ex. '/sites/reserve-de-faune-du-dja' ('' pour l'accueil)
export function alternates(lang, path = '') {
  return {
    canonical: `/${lang}${path}`,
    languages: { fr: `/fr${path}`, en: `/en${path}`, 'x-default': `/fr${path}` },
  };
}

export function abs(u) {
  if (!u) return undefined;
  return u.startsWith('http') ? u : `${SITE_URL}${u}`;
}

// Métadonnées complètes d'une page (titre, description, langues, partage)
export function pageMeta({ lang, path = '', title, description, image = '/images/hero-east-960.jpg', imageAlt, type = 'website', noindex = false }) {
  // WhatsApp/Facebook lisent mal le WebP : version JPG pour le partage
  const shareImg = image && image.startsWith('/images/') ? image.replace(/\.webp$/, '.jpg') : image;
  const img = shareImg ? [{ url: abs(shareImg), alt: imageAlt || title }] : undefined;
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title, description, type, url: `${SITE_URL}/${lang}${path}`,
      siteName: 'East Smart Forest & Tourism',
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
      ...(img ? { images: img } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(img ? { images: img.map((i) => i.url) } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
  };
}

import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { SITE } from '@/lib/site-config';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  return pageMeta({ lang, path: '/mentions-legales', title: lang === 'en' ? 'Legal notice' : 'Mentions légales', description: d.landing.text, noindex: true });
}

const CONTENT = {
  fr: [
    ['Éditeur du site', [
      'East Smart Forest & Tourism est un projet porté par Peing Ghislain Junior Walter, en co-portage avec Atipik Group.',
      `Contact : ${SITE.email} · ${SITE.phone}`,
      "Conception et développement : Yung's Agency.",
    ]],
    ['Hébergement', [
      'Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).',
      "Base de données et stockage des fichiers (une fois activés) : Supabase Inc. (supabase.com).",
    ]],
    ['Contenus', [
      "Les fiches de destinations sont rédigées à partir de sources publiques, citées sur chaque fiche. Elles sont marquées « à vérifier » ou « à documenter » tant qu'elles n'ont pas été validées sur le terrain, et n'ont pas de valeur officielle.",
      "Les pistes d'investissement sont des pistes de réflexion et non des projets validés par une autorité.",
      "Les positions sur les cartes sont approximatives.",
    ]],
    ['Photos et cartes', [
      "Photos sous licences libres (Wikimedia Commons) : auteur et licence indiqués sous chaque photo et sur la page Crédits photos. L'image d'accueil est une image d'illustration.",
      'Cartes : © les contributeurs OpenStreetMap. Visite 3D : imagerie Sentinel-2 cloudless 2016 par EOX IT Services GmbH (contient des données Copernicus Sentinel modifiées), relief Terrain Tiles (Mapzen, AWS Open Data).',
    ]],
    ['Données personnelles', [
      "Le formulaire de contact collecte votre nom, votre email, votre organisation (facultatif) et votre message, dans le seul but de vous répondre. Ces données ne sont ni vendues ni cédées à des tiers.",
      "Elles sont conservées le temps nécessaire au traitement de votre demande, et au plus 24 mois après le dernier échange.",
      `Vous pouvez demander à tout moment l'accès, la correction ou la suppression de vos données en écrivant à ${SITE.email}.`,
      "Le site n'utilise ni cookies publicitaires ni outil de mesure d'audience. L'affichage des cartes et de la visite 3D charge des images depuis OpenStreetMap, EOX et Amazon Web Services, qui reçoivent à cette occasion l'adresse IP de votre appareil.",
    ]],
  ],
  en: [
    ['Publisher', [
      'East Smart Forest & Tourism is a project led by Peing Ghislain Junior Walter, co-led with Atipik Group.',
      `Contact: ${SITE.email} · ${SITE.phone}`,
      "Design and development: Yung's Agency.",
    ]],
    ['Hosting', [
      'Site hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (vercel.com).',
      'Database and file storage (once enabled): Supabase Inc. (supabase.com).',
    ]],
    ['Content', [
      'Destination pages are written from public sources, cited on each page. They are marked "to be verified" or "to be documented" until validated in the field, and have no official status.',
      'Investment leads are ideas for discussion, not projects validated by any authority.',
      'Map positions are approximate.',
    ]],
    ['Photos and maps', [
      'Freely licensed photos (Wikimedia Commons): author and licence shown under each photo and on the Photo credits page. The homepage image is illustrative.',
      'Maps: © OpenStreetMap contributors. 3D tour: Sentinel-2 cloudless 2016 imagery by EOX IT Services GmbH (contains modified Copernicus Sentinel data), Terrain Tiles elevation (Mapzen, AWS Open Data).',
    ]],
    ['Personal data', [
      'The contact form collects your name, email, organisation (optional) and message, solely to reply to you. This data is never sold or passed on to third parties.',
      'It is kept for as long as needed to handle your request, and no more than 24 months after the last exchange.',
      `You can ask at any time to access, correct or delete your data by writing to ${SITE.email}.`,
      'The site uses no advertising cookies or audience measurement tools. Displaying the maps and the 3D tour loads images from OpenStreetMap, EOX and Amazon Web Services, which receive your device’s IP address in the process.',
    ]],
  ],
};

export default async function Legal({ params }) {
  const { lang } = await params;
  const d = getDict(lang);
  const blocks = CONTENT[lang] || CONTENT.fr;
  return (
    <>
      <section className="page-head compact">
        <div className="wrap"><h1>{d.legalLink}</h1></div>
      </section>
      <section className="section tight">
        <div className="wrap legal">
          {blocks.map(([title, paras]) => (
            <div key={title} className="legal-block">
              <h2>{title}</h2>
              {paras.map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
          <p className="muted small"><Link href={`/${lang}/credits`}>{d.credits.link}</Link></p>
        </div>
      </section>
    </>
  );
}

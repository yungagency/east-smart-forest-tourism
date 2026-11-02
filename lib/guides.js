// Guides pratiques : informations compilées à partir de sources publiques citées (mise à jour indiquée).
// Règle : aucun tarif ni condition sans source. Les montants sont ceux publiés par la source, à leur date.

const SRC = {
  djaOfficiel: { label: 'Réserve de faune du Dja – site officiel, page « Visiter »', url: 'https://www.dja.cm/francais/visite.php' },
  unescoDja: { label: 'UNESCO – Réserve de faune du Dja', url: 'https://whc.unesco.org/fr/list/407/' },
  discoverDja: { label: 'Discover Cameroon – circuit Dja et Baka (11 jours)', url: 'https://discover-cameroon.com/?p=33864' },
  uclaBouamir: { label: 'UCLA Congo Basin Institute – stations de terrain (Bouamir)', url: 'https://www.cbi.ucla.edu/field-stations' },
  papacoLobeke: { label: 'UICN-PAPACO – fiche du parc national de Lobéké', url: 'https://papaco.org/wp-content/uploads/2015/04/Cameroun_Parc-National-de-Lobeke.pdf' },
  npaLobeke: { label: 'National Parks Africa – Lobéké (itinéraire et distances)', url: 'https://www.nationalparks.africa/listing/lobeke-national-park/' },
  discoverLobeke: { label: 'Discover Cameroon – circuit Lobéké (clairières et camps)', url: 'https://discover-cameroon.com/en/immersion-in-the-cameroonian-rainforest/' },
  tybLobeke: { label: 'Take Your Backpack – guide pratique Lobéké (nov. 2026)', url: 'https://www.takeyourbackpack.com/backpacking-in-cameroon/visit-lobeke-national-park/' },
  badRoute: { label: 'Investir au Cameroun – BAD : 203 milliards FCFA pour l’axe Ngoura II–Yokadouma (mars 2026)', url: 'https://www.investiraucameroun.com/gestion-publique/1203-23185-routes-la-bad-accorde-203-milliards-fcfa-au-cameroun-pour-bitumer-l-axe-ngoura-ii-yokadouma-156-km-a-l-est-du-pays' },
  wikiLobeke: { label: 'Wikipédia – Lobéké National Park', url: 'https://en.wikipedia.org/wiki/Lob%C3%A9k%C3%A9_National_Park' },
};

export const GUIDES = [
  {
    slug: 'parc-national-de-lobeke',
    updated: '2026-11-02',
    title_fr: 'Visiter le parc national de Lobéké : guide pratique',
    title_en: 'Visiting Lobéké National Park: practical guide',
    intro_fr: "Éléphants de forêt, gorilles, bongos et buffles observés depuis des miradors au-dessus des clairières : Lobéké est l'une des grandes expériences de forêt d'Afrique centrale. C'est aussi une expédition, à plus de 800 km de Yaoundé. Voici comment la préparer.",
    intro_en: 'Forest elephants, gorillas, bongos and buffalo watched from towers above forest clearings: Lobéké is one of Central Africa’s great forest experiences. It is also an expedition, more than 800 km from Yaoundé. Here is how to prepare it.',
    facts: [
      { fr: 'Statut', en: 'Status', v_fr: 'Parc national (décret du 19 mars 2001), composante du Trinational de la Sangha, patrimoine mondial de l’UNESCO', v_en: 'National park (decree of 19 March 2001), part of the Sangha Trinational UNESCO World Heritage site' },
      { fr: 'Superficie', en: 'Area', v_fr: '217 854 ha', v_en: '217,854 ha' },
      { fr: 'Porte d’entrée', en: 'Gateway', v_fr: 'Yokadouma (formalités), puis Mambélé', v_en: 'Yokadouma (formalities), then Mambélé' },
      { fr: 'Durée à prévoir', en: 'Time needed', v_fr: 'Environ 6 à 8 jours aller-retour depuis Yaoundé', v_en: 'About 6–8 days return from Yaoundé' },
      { fr: 'Meilleure période', en: 'Best time', v_fr: 'Saison sèche : décembre à février, et juillet-août', v_en: 'Dry season: December–February, and July–August' },
      { fr: 'Pour qui', en: 'For whom', v_fr: 'Voyageurs en bonne condition physique, prêts à camper', v_en: 'Fit travellers ready to camp' },
    ],
    sections: [
      {
        h_fr: 'Se rendre à Lobéké', h_en: 'Getting to Lobéké',
        p_fr: [
          "L'itinéraire classique depuis Yaoundé : Bertoua par Doumé (environ 340 km de route bitumée), Batouri (environ 100 km), puis Yokadouma et Mambélé (environ 360 km de piste). De Mambélé, une quarantaine de kilomètres mènent au point de dépôt de la Petite Savane, d'où l'on rejoint les miradors à pied.",
          "En transport public, des cars relient Yaoundé à Yokadouma via Bertoua en 10 à 14 heures ; on continue ensuite en véhicule loué ou à moto vers Mambélé. Un 4x4 est fortement conseillé : la piste Yokadouma–Mambélé peut devenir impraticable après de fortes pluies.",
          "Bonne nouvelle pour l'accès : en février 2026, la Banque africaine de développement a approuvé un financement de 203 milliards FCFA pour aménager et bitumer les 156 km de l'axe Ngoura II–Yokadouma. Aucune date de fin de travaux n'a été annoncée.",
        ],
        p_en: [
          'The classic route from Yaoundé: Bertoua via Doumé (about 340 km of tarmac), Batouri (about 100 km), then Yokadouma and Mambélé (about 360 km of dirt road). From Mambélé, some 40 km lead to the Petite Savane drop-off point, from where you walk to the watchtowers.',
          'By public transport, buses link Yaoundé to Yokadouma via Bertoua in 10 to 14 hours; you then continue by hired vehicle or motorbike to Mambélé. A 4x4 is strongly advised: the Yokadouma–Mambélé road can become impassable after heavy rain.',
          'Good news for access: in February 2026 the African Development Bank approved 203 billion FCFA to upgrade and pave the 156 km Ngoura II–Yokadouma road. No completion date has been announced.',
        ],
        src: ['npaLobeke', 'tybLobeke', 'badRoute'],
      },
      {
        h_fr: 'Formalités et encadrement', h_en: 'Permits and guiding',
        p_fr: [
          "Les droits d'entrée et de conservation se règlent auprès du service de conservation du parc (bureau de Yokadouma ou base de Mambélé) ou via un voyagiste. La visite des clairières se fait obligatoirement avec un guide ; pour Djangui, réservez le guide et l'autorisation avant de quitter Yokadouma.",
          "Prévoyez des espèces : la carte bancaire n'est pas acceptée à proximité du parc.",
        ],
        p_en: [
          'Entry and conservation fees are paid to the park conservation service (Yokadouma office or Mambélé base) or through a tour operator. Clearing visits require a guide; for Djangui, book the guide and permit before leaving Yokadouma.',
          'Bring cash: cards are not accepted near the park.',
        ],
        src: ['tybLobeke', 'npaLobeke'],
      },
      {
        h_fr: 'Que voir : clairières et miradors', h_en: 'What to see: clearings and watchtowers',
        p_fr: [
          "Le parc compte six clairières sous surveillance particulière : Bolo, Djangui, Ndangaye, Ngoa, Djaloumbe et la Petite Savane. Des miradors permettent d'y observer, surtout tôt le matin et en fin d'après-midi, éléphants de forêt, buffles, bongos, sitatungas, potamochères et parfois gorilles.",
          "La fiche de l'UICN (données de 2010 environ) recensait 300 km de pistes entretenues et six miradors, ainsi que des structures d'accueil à Kombo et Djembé. Les gorilles ne sont jamais garantis, mais leurs nids et traces de repas sont fréquents.",
        ],
        p_en: [
          'The park has six closely monitored clearings: Bolo, Djangui, Ndangaye, Ngoa, Djaloumbe and Petite Savane. Watchtowers let you watch, mainly early morning and late afternoon, forest elephants, buffalo, bongos, sitatungas, red river hogs and sometimes gorillas.',
          'The IUCN profile (data from around 2010) listed about 300 km of maintained tracks and six watchtowers, plus visitor facilities at Kombo and Djembé. Gorillas are never guaranteed, but nests and feeding signs are common.',
        ],
        src: ['discoverLobeke', 'papacoLobeke', 'tybLobeke'],
      },
      {
        h_fr: 'Où dormir', h_en: 'Where to stay',
        p_fr: [
          "Yokadouma dispose d'hôtels simples, d'un marché et du réseau mobile : c'est l'étape pour faire le plein (carburant, eau, vivres). À Mambélé, l'hébergement est très sommaire. Dans le parc, on dort sous tente près des miradors.",
        ],
        p_en: [
          'Yokadouma has simple hotels, a market and mobile coverage: stock up there (fuel, water, food). Accommodation in Mambélé is very basic. In the park you sleep in tents near the watchtowers.',
        ],
        src: ['tybLobeke', 'npaLobeke'],
        link: 'services',
      },
      {
        h_fr: 'Budget indicatif', h_en: 'Indicative budget',
        p_fr: [
          "En circuit organisé tout compris depuis Yaoundé (guide, 4x4 avec chauffeur, pension complète, droits d'entrée), les voyagistes affichent environ 2 150 € par personne pour un groupe de 4, et 3 250 € pour 2 personnes, sur un voyage de 14 jours qui inclut d'autres étapes.",
          "En autonomie, un guide de voyage indépendant estime le budget sur place entre 45 et 85 € par personne et par jour. Ces montants sont indicatifs : faites confirmer les tarifs avant le départ.",
        ],
        p_en: [
          'On an all-inclusive tour from Yaoundé (guide, 4x4 with driver, full board, entry fees), operators list about €2,150 per person for a group of 4 and €3,250 for 2, on a 14-day trip that includes other stops.',
          'Travelling independently, one travel guide estimates €45–85 per person per day on site. These amounts are indicative: confirm rates before you go.',
        ],
        src: ['discoverLobeke', 'tybLobeke'],
      },
      {
        h_fr: 'Santé et sécurité', h_en: 'Health and safety',
        p_fr: [
          "Traitement antipaludéen, répulsif, trousse de secours et médicaments personnels sont indispensables : le centre de santé le plus proche est à Yokadouma. Prévoyez environ 3 litres d'eau par jour et de quoi la purifier. Restez à au moins 7 mètres des gorilles et suivez toujours votre guide, le réseau téléphonique disparaissant en forêt.",
        ],
        p_en: [
          'Malaria prophylaxis, repellent, first-aid kit and personal medication are essential: the nearest clinic is in Yokadouma. Carry about 3 litres of water a day and a way to purify it. Stay at least 7 metres from gorillas and always follow your guide, as phone signal disappears in the forest.',
        ],
        src: ['tybLobeke'],
      },
    ],
    faq: [
      { q_fr: 'Combien de temps faut-il pour aller à Lobéké depuis Yaoundé ?', a_fr: "Comptez au moins deux jours de route : environ 800 km, dont une grande partie sur piste, via Bertoua, Batouri et Yokadouma. Un séjour complet demande 6 à 8 jours aller-retour.", q_en: 'How long does it take to reach Lobéké from Yaoundé?', a_en: 'Allow at least two days on the road: about 800 km, much of it on dirt roads, via Bertoua, Batouri and Yokadouma. A full trip takes 6–8 days return.' },
      { q_fr: 'Quelle est la meilleure période pour visiter Lobéké ?', a_fr: 'La grande saison sèche, de décembre à février, est la plus favorable ; juillet-août offre une petite saison sèche. Évitez les fortes pluies, qui rendent la piste difficile.', q_en: 'When is the best time to visit Lobéké?', a_en: 'The main dry season, December to February, is best; July–August is a short dry spell. Avoid heavy rains, which make the road difficult.' },
      { q_fr: 'Peut-on voir des gorilles à Lobéké ?', a_fr: "Oui, c'est possible, notamment aux clairières, mais jamais garanti. Les éléphants de forêt et les buffles sont plus faciles à observer depuis les miradors.", q_en: 'Can you see gorillas in Lobéké?', a_en: 'Yes, it is possible, especially at the clearings, but never guaranteed. Forest elephants and buffalo are easier to see from the watchtowers.' },
      { q_fr: 'Faut-il un guide ?', a_fr: "Oui. Les visites en forêt et aux clairières se font obligatoirement avec un guide du parc, à organiser à Yokadouma ou à Mambélé.", q_en: 'Do I need a guide?', a_en: 'Yes. Forest and clearing visits must be made with a park guide, arranged in Yokadouma or Mambélé.' },
    ],
    sources: ['papacoLobeke', 'npaLobeke', 'discoverLobeke', 'tybLobeke', 'badRoute', 'wikiLobeke'],
  },
  {
    slug: 'reserve-de-faune-du-dja',
    updated: '2026-11-02',
    title_fr: 'Visiter la réserve de faune du Dja : guide pratique',
    title_en: 'Visiting the Dja Faunal Reserve: practical guide',
    intro_fr: "Plus de 500 000 hectares de forêt presque intacte, classés au patrimoine mondial de l'UNESCO depuis 1987 : le Dja se découvre à pied, en plusieurs jours de marche et de bivouac avec les écogardes et les guides baka.",
    intro_en: 'Over 500,000 hectares of near-intact forest, a UNESCO World Heritage site since 1987: the Dja is explored on foot, over several days of hiking and camping with eco-guards and Baka guides.',
    facts: [
      { fr: 'Statut', en: 'Status', v_fr: 'Réserve de faune, patrimoine mondial de l’UNESCO depuis 1987', v_en: 'Faunal reserve, UNESCO World Heritage site since 1987' },
      { fr: 'Portes d’entrée', en: 'Gateways', v_fr: 'Somalomo (principale), Lomié, Djoum, Meyomessala', v_en: 'Somalomo (main), Lomié, Djoum, Meyomessala' },
      { fr: 'Forfait officiel', en: 'Official package', v_fr: '97 000 FCFA par personne et par jour, transport non compris', v_en: '97,000 FCFA per person per day, transport not included' },
      { fr: 'À éviter', en: 'Avoid', v_fr: 'Septembre, octobre et la première quinzaine de novembre', v_en: 'September, October and the first half of November' },
      { fr: 'Groupes', en: 'Groups', v_fr: '1 à 6 personnes, avec 2 écogardes', v_en: '1 to 6 people, with 2 eco-guards' },
      { fr: 'Pour qui', en: 'For whom', v_fr: 'Déconseillé aux moins de 15 ans et aux plus de 70 ans', v_en: 'Not advised for under-15s and over-70s' },
    ],
    sections: [
      {
        h_fr: 'Se rendre au Dja', h_en: 'Getting to the Dja',
        p_fr: [
          "La réserve compte quatre portes d'entrée, chacune avec un poste du conservateur : Somalomo au nord-ouest (bureau principal, à environ 250 km de Yaoundé), Lomié à l'est, Djoum au sud et Meyomessala à l'ouest.",
          "Les transports publics sont bon marché mais lents et peu pratiques. La solution la plus courante est un taxi avec chauffeur loué pour plusieurs jours ; la réserve peut aider à trouver un chauffeur fiable. Hors vraie saison des pluies, un 4x4 n'est pas indispensable.",
        ],
        p_en: [
          'The reserve has four gateways, each with a conservator’s post: Somalomo in the north-west (main office, about 250 km from Yaoundé), Lomié in the east, Djoum in the south and Meyomessala in the west.',
          'Public transport is cheap but slow and impractical. The usual option is a taxi with driver hired for several days; the reserve can help find a reliable driver. Outside the true rainy season, a 4x4 is not essential.',
        ],
        src: ['djaOfficiel', 'discoverDja'],
      },
      {
        h_fr: 'Formalités et forfait officiel', h_en: 'Permits and official package',
        p_fr: [
          "Toute visite nécessite l'autorisation du conservateur. Le site officiel de la réserve propose un forfait de 97 000 FCFA (148 €) par personne et par jour, qui comprend une nuit d'hôtel avant et après la forêt, les droits d'entrée (droits de film compris), les écogardes, guides et porteurs, le matériel de camping, les repas et l'eau en bouteille. Le transport jusqu'à la réserve n'est pas compris.",
          "Chaque groupe (1 à 6 personnes) est accompagné de deux guides officiels (écogardes), avec des porteurs selon les besoins.",
        ],
        p_en: [
          'Every visit requires the conservator’s authorisation. The reserve’s official website offers a package of 97,000 FCFA (€148) per person per day, including one hotel night before and after the forest, entry fees (filming rights included), eco-guards, guides and porters, camping gear, meals and bottled water. Transport to the reserve is not included.',
          'Each group (1 to 6 people) is accompanied by two official guides (eco-guards), plus porters as needed.',
        ],
        src: ['djaOfficiel'],
      },
      {
        h_fr: 'Le parcours en forêt', h_en: 'The forest trek',
        p_fr: [
          "Les visites durent plusieurs jours en progressant vers le cœur de la réserve. Depuis Somalomo, les circuits rejoignent en général le grand rocher de Bouamir (environ 16 km de marche), où se trouve aussi une station de recherche scientifique, puis le Petit-Rocher. Beaucoup de voyageurs combinent la forêt avec une rencontre dans un campement baka.",
          "Les sentiers sont souvent à peine visibles, avec des passages de ruisseaux parfois sur des troncs. L'observation des animaux n'est jamais garantie.",
        ],
        p_en: [
          'Visits last several days, moving towards the heart of the reserve. From Somalomo, routes usually reach the great Bouamir rock (about 16 km on foot), also home to a research station, then Petit-Rocher. Many travellers combine the forest with a stay in a Baka camp.',
          'Trails are often barely visible, with stream crossings sometimes on logs. Wildlife sightings are never guaranteed.',
        ],
        src: ['discoverDja', 'djaOfficiel', 'uclaBouamir'],
      },
      {
        h_fr: 'Où dormir', h_en: 'Where to stay',
        p_fr: [
          "Les quatre villes d'entrée ont des hôtels ou auberges simples, de 5 000 à 30 000 FCFA la nuit. Somalomo dispose aussi d'un hébergement simple géré par le conservateur. En forêt, on dort sous tente. Le ravitaillement est difficile en dehors de Lomié.",
        ],
        p_en: [
          'The four gateway towns have simple hotels or inns at 5,000 to 30,000 FCFA a night. Somalomo also has simple lodging run by the conservator. In the forest you sleep in tents. Supplies are hard to find outside Lomié.',
        ],
        src: ['djaOfficiel'],
        link: 'services',
      },
      {
        h_fr: 'Quand partir et que prévoir', h_en: 'When to go and what to bring',
        p_fr: [
          "La réserve déconseille fortement les visites en septembre, en octobre et pendant la première quinzaine de novembre. Prévoyez des manches longues et un pantalon en tissu résistant, des chaussures montantes et des couleurs sombres.",
          "Les visites sont déconseillées aux personnes en mauvaise santé, aux enfants de moins de 15 ans et aux personnes de plus de 70 ans, sauf exception.",
        ],
        p_en: [
          'The reserve strongly advises against visits in September, October and the first half of November. Bring long sleeves and trousers in durable fabric, ankle boots and dark colours.',
          'Visits are not advised for people in poor health, children under 15 and people over 70, except by exception.',
        ],
        src: ['djaOfficiel'],
      },
    ],
    faq: [
      { q_fr: 'Combien coûte une visite de la réserve du Dja ?', a_fr: "Le site officiel de la réserve propose un forfait de 97 000 FCFA (environ 148 €) par personne et par jour, tout compris sauf le transport jusqu'à la réserve.", q_en: 'How much does a visit to the Dja Reserve cost?', a_en: 'The reserve’s official website offers a package of 97,000 FCFA (about €148) per person per day, all-inclusive except transport to the reserve.' },
      { q_fr: 'Par où entrer dans la réserve du Dja ?', a_fr: "Somalomo, au nord-ouest, est l'entrée principale (environ 250 km de Yaoundé). Il existe aussi des entrées à Lomié, Djoum et Meyomessala.", q_en: 'Where do you enter the Dja Reserve?', a_en: 'Somalomo, in the north-west, is the main entrance (about 250 km from Yaoundé). There are also entrances at Lomié, Djoum and Meyomessala.' },
      { q_fr: 'Quelle est la meilleure période pour visiter le Dja ?', a_fr: 'Évitez septembre, octobre et la première moitié de novembre, fortement déconseillés par la réserve. Les saisons sèches sont les plus confortables pour marcher.', q_en: 'When is the best time to visit the Dja?', a_en: 'Avoid September, October and the first half of November, which the reserve strongly advises against. Dry seasons are the most comfortable for hiking.' },
      { q_fr: 'Faut-il une autorisation ?', a_fr: "Oui, toute visite nécessite l'autorisation du conservateur, et chaque groupe est accompagné de deux écogardes.", q_en: 'Is a permit required?', a_en: 'Yes, every visit requires the conservator’s authorisation, and each group is accompanied by two eco-guards.' },
    ],
    sources: ['djaOfficiel', 'unescoDja', 'discoverDja', 'uclaBouamir'],
  },
];

export const GUIDE_SOURCES = SRC;
export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug) || null;
}

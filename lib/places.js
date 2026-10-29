// Points d'intérêt complémentaires pour la carte touristique.
// Source : OpenStreetMap (© contributeurs OpenStreetMap, licence ODbL), extraction d'octobre 2026,
// filtrée sur le périmètre de la Région de l'Est. Données NON VÉRIFIÉES : noms, positions et téléphones
// sont ceux saisis par les contributeurs OpenStreetMap et doivent être confirmés sur le terrain.

// Contour simplifié de la Région de l'Est (OpenStreetMap / Nominatim)
export const EAST_OUTLINE = [[12.501,3.896],[12.602,3.615],[12.765,3.17],[12.817,2.915],[12.873,2.878],[12.966,2.866],[13.002,2.85],[13.082,2.858],[13.158,2.847],[13.238,2.848],[13.268,2.786],[13.284,2.85],[13.432,2.776],[13.535,2.826],[13.58,2.887],[14.303,2.163],[14.461,2.126],[14.497,2.162],[14.624,2.163],[14.683,2.137],[14.724,2.127],[14.77,2.096],[14.808,2.059],[14.857,2.106],[14.911,2.064],[14.97,2.008],[15.063,2.005],[15.116,2.011],[15.163,2.042],[15.249,2.029],[15.306,1.937],[15.486,1.984],[15.56,1.95],[15.805,1.857],[15.906,1.798],[16.026,1.765],[16.056,1.652],[16.148,1.692],[16.087,1.894],[16.084,2.047],[16.084,2.2],[16.191,2.221],[16.143,2.356],[16.065,2.528],[16.085,2.703],[16.047,2.793],[16.062,2.915],[15.888,3.102],[15.494,3.458],[15.178,4.058],[15.132,4.106],[15.087,4.302],[15.008,4.424],[14.811,4.524],[14.7,4.764],[14.713,4.867],[14.674,4.991],[14.695,5.107],[14.526,5.283],[14.599,5.416],[14.59,5.595],[14.596,5.924],[14.399,6.061],[14.381,6.014],[14.001,6.065],[13.932,6.054],[13.829,6.001],[12.951,5.789],[13.004,5.644],[12.957,5.323],[12.808,5.28],[13.059,5.037],[13.19,4.916],[13.239,4.819],[13.223,4.758],[13.229,4.656],[13.129,4.545],[12.977,4.59],[12.842,4.374],[12.796,4.297],[12.793,4.175],[12.752,4.12],[12.801,4.039],[12.557,3.927],[12.501,3.896]];

// Couches de la carte
export const LAYERS = {
  park: { fr: 'Parcs et réserves', en: 'Parks & reserves', c: '#1d7a43', icon: 'tree' },
  waterfall: { fr: "Chutes d'eau", en: 'Waterfalls', c: '#2f7fb5', icon: 'drop' },
  cave: { fr: 'Grottes', en: 'Caves', c: '#7a5a3a', icon: 'cave' },
  landscape: { fr: 'Paysages et clairières', en: 'Landscapes & clearings', c: '#6aa33a', icon: 'mountain' },
  heritage: { fr: 'Sites culturels et historiques', en: 'Cultural & historic sites', c: '#b8741f', icon: 'landmark' },
  lodging: { fr: 'Hébergements', en: 'Accommodation', c: '#7d4b8a', icon: 'bed' },
  food: { fr: 'Restaurants', en: 'Restaurants', c: '#c0473a', icon: 'food' },
};

// Correspondance des fiches destinations → couches
export const SITE_LAYER = {
  'reserve-de-faune-du-dja': 'park', 'parc-national-de-lobeke': 'park', 'parc-national-de-boumba-bek': 'park',
  'parc-national-de-nki': 'park', 'parc-national-du-mbam-et-djerem': 'park', 'parc-national-de-deng-deng': 'park',
  'barrage-et-lac-de-lom-pangar': 'landscape', 'monts-pandi': 'landscape', 'mare-aux-hippopotames-de-lala': 'landscape',
  'chutes-de-mali': 'waterfall', 'grotte-du-roi-mbartoua': 'cave',
  bertoua: 'heritage', 'forteresse-allemande-de-doume': 'heritage', 'lomie-ville-historique': 'heritage',
};

const P = (id, layer, name, lat, lng, town = '', phone = '', extra = {}) => ({ id, layer, name, lat, lng, town, phone, src: 'osm', ...extra });

export const POIS = [
  // Chutes d'eau
  P('w-nki', 'waterfall', 'Chutes de Nki', 2.3399, 14.4794, 'Parc national de Nki', '', { site: 'parc-national-de-nki' }),
  P('w-chollet', 'waterfall', 'Chutes Chollet', 2.1836, 14.6115, 'Fleuve Dja (sud de Nki)'),
  P('w-ampel', 'waterfall', "Chute d'Ampel", 3.5206, 13.4463, 'Abong-Mbang'),
  P('w-mpouho', 'waterfall', 'Chutes de Mpouho', 3.3805, 12.686, 'Somalomo'),
  P('w-saa', 'waterfall', 'Chutes de Saa', 3.3827, 12.6783, 'Somalomo'),
  // Grottes
  P('c-picathartes', 'cave', 'Grotte des Picathartes', 3.1675, 12.8229, 'Réserve du Dja', '', { site: 'reserve-de-faune-du-dja' }),
  P('c-mokok', 'cave', 'Grotte à chauves-souris de Mokok Menteng', 3.461, 12.5604, 'Somalomo'),
  // Paysages, clairières et miradors (Lobéké)
  P('l-petite-savane', 'landscape', 'La Petite Savane (mirador)', 2.2924, 15.7165, 'Parc national de Lobéké', '', { site: 'parc-national-de-lobeke' }),
  P('l-ndangaye', 'landscape', 'Clairière de Ndangaye', 2.4011, 15.8043, 'Parc national de Lobéké', '', { site: 'parc-national-de-lobeke' }),
  P('l-djaloumbe', 'landscape', 'Clairière de Djaloumbé', 2.379, 15.7498, 'Parc national de Lobéké', '', { site: 'parc-national-de-lobeke' }),
  P('l-djangui', 'landscape', 'Clairière de Djangui', 2.3176, 15.7701, 'Parc national de Lobéké', '', { site: 'parc-national-de-lobeke' }),
  P('l-mirador-est', 'landscape', 'Mirador', 2.1999, 16.1315, 'Lobéké (secteur est)'),
  // Patrimoine
  P('h-atangana', 'heritage', 'Statue de J. Atangana Mpene', 3.5622, 13.4059, 'Abong-Mbang'),
  P('h-mission-cath', 'heritage', 'Mission catholique', 4.3889, 14.5946, 'Kadey'),
  P('h-mission-prot', 'heritage', 'Mission protestante', 4.462, 14.4021, 'Batouri'),
  P('h-musee', 'heritage', 'Musée des beaux-arts', 3.3751, 12.7327, 'Somalomo'),
  // Hébergements — Bertoua
  P('a-matinal', 'lodging', 'Le Matinal', 4.577, 13.6781, 'Bertoua'),
  P('a-suncity', 'lodging', 'Hôtel Sun City', 4.5841, 13.685, 'Bertoua', '+237 243 56 48 19'),
  P('a-residence', 'lodging', 'Hôtel La Résidence', 4.5773, 13.6915, 'Bertoua'),
  P('a-confluent', 'lodging', 'Hôtel Le Confluent', 4.5768, 13.7113, 'Bertoua'),
  P('a-mansa', 'lodging', 'Hôtel Mansa', 4.5885, 13.6826, 'Bertoua', '+237 222 24 16 50'),
  P('a-universel', 'lodging', 'Hôtel Universel', 4.575, 13.6786, 'Bertoua'),
  P('a-paris', 'lodging', 'Hôtel de Paris', 4.5713, 13.6772, 'Bertoua', '+237 699 71 54 63'),
  P('a-christianna', 'lodging', 'Christianna Hôtel', 4.5812, 13.6744, 'Bertoua'),
  P('a-neslanne', 'lodging', 'Hôtel Neslanne', 4.5722, 13.6592, 'Bertoua'),
  P('a-martino', 'lodging', 'Hôtel Martino', 4.5591, 13.6398, 'Bertoua'),
  // Hébergements — autres villes
  P('a-raphia', 'lodging', 'Hôtel Le Raphia', 3.144, 13.6226, 'Lomié'),
  P('a-abada', 'lodging', 'Auberge Papa Abada', 3.1602, 13.6191, 'Lomié'),
  P('a-kadey', 'lodging', 'Motel Le Kadey', 5.8824, 14.5543, 'Garoua-Boulaï'),
  P('a-noel', 'lodging', 'Guest House Noël Gardien', 4.4304, 14.3659, 'Batouri'),
  P('a-belle-etoile', 'lodging', 'Hôtel Belle Étoile', 4.4314, 14.3645, 'Batouri'),
  P('a-zokadouma', 'lodging', 'Hôtel Zokadouma', 3.5268, 15.0488, 'Yokadouma'),
  P('a-elephant', 'lodging', 'Hôtel Éléphant', 3.5111, 15.0533, 'Yokadouma'),
  P('a-grand-moulin', 'lodging', 'Hôtel Grand Moulin', 3.5109, 15.0501, 'Yokadouma'),
  P('a-mbeka', 'lodging', 'Hôtel Résidence Mbeka', 3.5405, 15.0565, 'Yokadouma'),
  P('a-paix', 'lodging', 'Auberge de la Paix', 3.5647, 13.4049, 'Abong-Mbang'),
  P('a-st-michel', 'lodging', 'Taverne Saint-Michel', 3.5651, 13.4065, 'Abong-Mbang'),
  P('a-cite', 'lodging', 'Cité municipale', 3.5685, 13.4, 'Abong-Mbang'),
  P('a-dja', 'lodging', 'Auberge du Dja', 3.5643, 13.405, 'Abong-Mbang'),
  P('a-makumba', 'lodging', 'Auberge Makumba', 2.6232, 16.0662, 'Moloundou'),
  P('a-saimo', 'lodging', 'Auberge Résidence Saimo « Diva »', 2.6238, 16.0654, 'Moloundou'),
  P('a-emergence', 'lodging', 'Hôtel Émergence', 2.6213, 16.0665, 'Moloundou'),
  P('a-ngoyla', 'lodging', 'Auberge municipale de Ngoyla', 2.6278, 14.0257, 'Ngoyla'),
  P('a-campement', 'lodging', 'Campement municipal', 2.4412, 15.4233, 'Mambélé (porte de Lobéké)'),
  P('a-terre-promise', 'lodging', 'Auberge Terre Promise', 3.3814, 12.7327, 'Somalomo'),
  P('a-iroko', 'lodging', 'Iroko', 3.9636, 14.259, ''),
  P('a-godwin', 'lodging', 'Godwin Hôtel', 3.9897, 13.1708, ''),
  P('a-tongo', 'lodging', 'Campement Tongo Gadjima', 5.1745, 14.0003, ''),
  // Restaurants
  P('r-grand-palace', 'food', 'Grand Palace', 4.5748, 13.6765, 'Bertoua'),
  P('r-soleil', 'food', "Soleil d'Épices", 4.5795, 13.6768, 'Bertoua'),
  P('r-plume', 'food', "Plume d'or", 4.5786, 13.7009, 'Bertoua', '+237 698 05 19 48'),
  P('r-pieds', 'food', "Pieds dans l'eau", 4.5849, 13.6701, 'Bertoua'),
  P('r-couscoussier', 'food', 'Le Couscoussier', 5.8896, 14.5475, 'Garoua-Boulaï'),
  P('r-airport', 'food', "Restaurant-bar de l'aéroport", 3.514, 15.051, 'Yokadouma'),
  P('r-paillote', 'food', 'La Paillote', 2.6263, 16.0676, 'Moloundou'),
];

// Circuits suggérés : propositions à valider avec des guides et opérateurs locaux.
// Le tracé relie les étapes à vol d'oiseau ; ce n'est pas l'itinéraire routier exact.
export const CIRCUITS = [
  {
    slug: 'histoire-et-foret-du-dja',
    color: '#e0a64a',
    name_fr: 'Histoire et forêt du Dja', name_en: 'History and the Dja forest',
    days_fr: '3 à 4 jours (indicatif)', days_en: '3–4 days (indicative)',
    summary_fr: "De la capitale régionale à la réserve classée par l'UNESCO, en passant par le fort allemand de Doumé et la ville historique de Lomié.",
    summary_en: 'From the regional capital to the UNESCO-listed reserve, via the German fort of Doumé and the historic town of Lomié.',
    steps: [
      { name: 'Bertoua', lat: 4.583, lng: 13.683, site: 'bertoua' },
      { name: 'Doumé', lat: 4.2429, lng: 13.454, site: 'forteresse-allemande-de-doume' },
      { name: 'Abong-Mbang', lat: 3.5622, lng: 13.4059 },
      { name: 'Lomié', lat: 3.1703, lng: 13.6469, site: 'lomie-ville-historique' },
      { name: 'Réserve du Dja', lat: 3.0167, lng: 12.9833, site: 'reserve-de-faune-du-dja' },
    ],
  },
  {
    slug: 'safari-foret-du-sud-est',
    color: '#7cc142',
    name_fr: 'Safari forestier du Sud-Est', name_en: 'South-East forest safari',
    days_fr: '6 à 8 jours (indicatif)', days_en: '6–8 days (indicative)',
    summary_fr: "La grande expédition vers Lobéké : Batouri, Yokadouma, Mambélé, puis les miradors des clairières à éléphants, gorilles et buffles.",
    summary_en: 'The great expedition to Lobéké: Batouri, Yokadouma, Mambélé, then the watchtowers over clearings with elephants, gorillas and buffalo.',
    steps: [
      { name: 'Bertoua', lat: 4.583, lng: 13.683, site: 'bertoua' },
      { name: 'Batouri', lat: 4.43, lng: 14.36, site: 'monts-pandi' },
      { name: 'Yokadouma', lat: 3.5268, lng: 15.0488 },
      { name: 'Mambélé', lat: 2.4412, lng: 15.4233 },
      { name: 'La Petite Savane', lat: 2.2924, lng: 15.7165, site: 'parc-national-de-lobeke' },
    ],
  },
  {
    slug: 'lacs-gorilles-et-savanes',
    color: '#4aa3d1',
    name_fr: 'Lacs, gorilles et savanes du Nord', name_en: 'Northern lakes, gorillas and savannas',
    days_fr: '3 à 5 jours (indicatif)', days_en: '3–5 days (indicative)',
    summary_fr: "Vers le lac de Lom Pangar et le parc de Deng Deng, puis Bétaré-Oya et ses chutes, aux portes du Mbam et Djerem.",
    summary_en: 'Towards Lake Lom Pangar and Deng Deng park, then Bétaré-Oya and its falls, at the gates of Mbam and Djerem.',
    steps: [
      { name: 'Bertoua', lat: 4.583, lng: 13.683, site: 'bertoua' },
      { name: 'Lom Pangar', lat: 5.3714, lng: 13.5124, site: 'barrage-et-lac-de-lom-pangar' },
      { name: 'Deng Deng', lat: 5.3506, lng: 13.4417, site: 'parc-national-de-deng-deng' },
      { name: 'Bétaré-Oya', lat: 5.6, lng: 14.08, site: 'chutes-de-mali' },
    ],
  },
];

// Distance en km (formule de haversine)
export function km(a, b) {
  const R = 6371;
  const toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat);
  const dLng = toR(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function nearby(point, layers = ['lodging', 'food'], radius = 40) {
  if (typeof point?.lat !== 'number') return [];
  return POIS.filter((p) => layers.includes(p.layer))
    .map((p) => ({ ...p, d: km(point, p) }))
    .filter((p) => p.d <= radius)
    .sort((a, b) => a.d - b.d);
}

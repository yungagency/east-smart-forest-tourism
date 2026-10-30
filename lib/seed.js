// Contenu de démarrage, recoupé à partir de sources publiques (listées pour chaque fiche).
// Fiches rédigées à partir de sources publiques citées ; statut interne (admin) : a_verifier / verifie.
// Coordonnées : coords_approx = true → point indicatif (centre du site ou chef-lieu), pas l'entrée exacte.
// Photos : Wikimedia Commons, licences libres, auteur et licence affichés sous chaque photo.

export const CATEGORIES = ['parc', 'nature', 'histoire', 'culture'];

const SRC = {
  ecomatin: 'https://ecomatin.net/ecotourisme-une-vingtaine-de-sites-touristiques-en-detresse-a-lest',
  datacameroon: 'https://datacameroon.com/ecotourisme-plus-de-22-sites-touristiques-en-peril-dans-la-region-de-lest-2/',
  unescoDja: 'https://whc.unesco.org/en/list/407/',
  unescoDjaSoc: 'https://whc.unesco.org/fr/soc/4725',
  unescoBbNki: 'https://whc.unesco.org/fr/listesindicatives/6308/',
  wwf3parks: 'https://wwfeu.awsassets.panda.org/downloads/three_national_parks.doc',
  lobekeAccess: 'https://www.nationalparks.africa/listing/lobeke-national-park/',
  lobekeIric: 'https://www.memoireonline.com/11/23/14415/m_Les-enjeux-de-la-conservation-de-la-biodiversite-pour-les-pays-du-bassin-du-Congo-cas-du-parc-nati4.html',
  lobekeWiki: 'https://en.wikipedia.org/wiki/Lob%C3%A9k%C3%A9_National_Park',
  bbPlan: 'https://carpe.umd.edu/sites/default/files/publications/4050001_SD_BoumbaBek%26NkiNP_StrategyDocument_2009.pdf',
  bbWiki: 'https://en.wikipedia.org/wiki/Boumba_Bek_National_Park',
  nkiWiki: 'https://en.wikipedia.org/wiki/Nki_National_Park',
  mdDecret: 'https://faolex.fao.org/docs/pdf/cmr26728.pdf',
  mdBirdlife: 'https://datazone.birdlife.org/site/factsheet/mbam-djerem-national-park-iba-cameroon',
  mdWcs: 'https://cameroon.wcs.org/Wild-Places/Mbam-Djerem-National-Park.aspx',
  ddWiki: 'https://en.wikipedia.org/wiki/Deng_Deng_National_Park',
  ddWcs: 'https://cameroon.wcs.org/Wild-Places/Deng-Deng-National-Park.aspx',
  lpWiki: 'https://en.wikipedia.org/wiki/Lom_Pangar_Dam',
  ongolaMbartoua: 'https://www.ongola.com/grottes-mbartoua-bertoua-cameroun/',
  camerpressBertoua: 'https://camerpressagency.com/de-mbartoua-a-metropole-bipolaire-lepopee-de-bertoua-coeur-de-lest-camerounais/',
  bertouaWiki: 'https://en.wikipedia.org/wiki/Bertoua',
  le360Doume: 'https://afrique.le360.ma/autres-pays/societe/2022/10/10/39589-cameroun-doume-une-ville-coloniale-devenue-lombre-delle-meme-apres-le-depart-des-allemands/',
  lomieWiki: 'https://en.wikipedia.org/wiki/Lomi%C3%A9',
  evaneos: 'https://www.evaneos.fr/cameroun/voyage/explorer/7046-1-sud-et-centre/',
};

const IMG = {
  dja: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Couch%C3%A9_du_soleil_dans_le_Dja.jpg/960px-Couch%C3%A9_du_soleil_dans_le_Dja.jpg',
    image_credit: 'Mbollo Mbollo · CC BY-SA 4.0 · Wikimedia Commons',
    image_source: 'https://commons.wikimedia.org/wiki/File:Couch%C3%A9_du_soleil_dans_le_Dja.jpg',
  },
  lobeke: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Clairi%C3%A8re_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.JPG/960px-Clairi%C3%A8re_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.JPG',
    image_credit: 'mintour.gov.cm · CC BY-SA 3.0 · Wikimedia Commons',
    image_source: 'https://commons.wikimedia.org/wiki/File:Clairi%C3%A8re_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.JPG',
  },
  lobekeBuffles: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Buffle_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.jpg/960px-Buffle_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.jpg',
    image_credit: 'mintour.gov.cm · CC BY-SA 3.0 · Wikimedia Commons',
    image_source: 'https://commons.wikimedia.org/wiki/File:Buffle_dans_le_Parc_National_de_Lob%C3%A9k%C3%A9.jpg',
  },
  mbamDjerem: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Le_Djerem_ou_Haute_Sanaga_--_Parc_national_du_Mbam_et_Djerem_-_Adamaoua_-_Cameroun.jpg/960px-Le_Djerem_ou_Haute_Sanaga_--_Parc_national_du_Mbam_et_Djerem_-_Adamaoua_-_Cameroun.jpg',
    image_credit: 'Eric Joel Mama Nke · CC BY-SA 4.0 · Wikimedia Commons (vue côté Adamaoua)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Le_Djerem_ou_Haute_Sanaga_--_Parc_national_du_Mbam_et_Djerem_-_Adamaoua_-_Cameroun.jpg',
  },
  lomie: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lomi%C3%A9_crossroads.jpg/960px-Lomi%C3%A9_crossroads.jpg',
    image_credit: 'Amcaja · CC BY-SA 3.0 · Wikimedia Commons',
    image_source: 'https://commons.wikimedia.org/wiki/File:Lomi%C3%A9_crossroads.jpg',
  },
  doume: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Entr%C3%A9e_du_fort_de_Doum%C3%A9_enlev%C3%A9_le_25_Juillet_15_-_Doum%C3%A9_-_M%C3%A9diath%C3%A8que_de_l%27architecture_et_du_patrimoine_-_AP62T021049.jpg',
    image_credit: "Chaveyron / L'Illustration, 1915 · Médiathèque de l'architecture et du patrimoine · Licence Ouverte",
    image_source: 'https://commons.wikimedia.org/wiki/File:Entr%C3%A9e_du_fort_de_Doum%C3%A9_enlev%C3%A9_le_25_Juillet_15_-_Doum%C3%A9_-_M%C3%A9diath%C3%A8que_de_l%27architecture_et_du_patrimoine_-_AP62T021049.jpg',
  },
  bertoua: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Hotel_de_ville_de_Bertoua.jpg/960px-Hotel_de_ville_de_Bertoua.jpg',
    image_credit: 'Serieminou · CC BY-SA 4.0 · Wikimedia Commons',
    image_source: 'https://commons.wikimedia.org/wiki/File:Hotel_de_ville_de_Bertoua.jpg',
  },
  batouri: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sunset_in_Batouri%2C_East-Cameroon.jpg',
    image_credit: 'BrayaneSilag · CC BY 4.0 · Wikimedia Commons (coucher de soleil à Batouri)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Sunset_in_Batouri,_East-Cameroon.jpg',
  },
  nki: {
    image_url: '/images/sites/nki/chutes-de-nki.jpg',
    image_credit: 'Chutes de Nki · Photo transmise au projet East Smart Forest & Tourism',
    image_source: null,
  },
  boumbaBek: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Forest_elephant_group_1_%286841415460%29.jpg/960px-Forest_elephant_group_1_%286841415460%29.jpg',
    image_credit: 'U.S. Fish and Wildlife Service · Domaine public · Wikimedia Commons (éléphants de forêt, illustration)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Forest_elephant_group_1_%286841415460%29.jpg',
  },
  dengDeng: {
    image_url: '/images/sites/deng-deng/gorilles-clairiere.jpg',
    image_credit: 'Photo transmise au projet East Smart Forest & Tourism',
    image_source: null,
  },
  lomPangar: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Vue_aerienne_du_Trac%C3%A9_du_Djerem_ou_haute_Sanaga_-_Parc_national_du_Mbam_et_Djerem.jpg/960px-Vue_aerienne_du_Trac%C3%A9_du_Djerem_ou_haute_Sanaga_-_Parc_national_du_Mbam_et_Djerem.jpg',
    image_credit: 'Eric Joel Mama Nke · CC BY-SA 4.0 · Wikimedia Commons (la Haute Sanaga, illustration)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Vue_aerienne_du_Trac%C3%A9_du_Djerem_ou_haute_Sanaga_-_Parc_national_du_Mbam_et_Djerem.jpg',
  },
  mbartoua: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Circulation_dans_la_ville_de_Bertoua.jpg/960px-Circulation_dans_la_ville_de_Bertoua.jpg',
    image_credit: 'Photokadaffi · CC BY-SA 4.0 · Wikimedia Commons (Bertoua)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Circulation_dans_la_ville_de_Bertoua.jpg',
  },
  mali: {
    image_url: '/images/sites/chutes-de-mali/chutes-de-mali-cascade.jpg',
    image_credit: 'Chutes de Mali · Photo transmise au projet East Smart Forest & Tourism',
    image_source: null,
  },
  lala: {
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Les_hippopotames_au_parc_national_de_la_b%C3%A9nou%C3%A9_au_Cameroun_11.jpg/960px-Les_hippopotames_au_parc_national_de_la_b%C3%A9nou%C3%A9_au_Cameroun_11.jpg',
    image_credit: 'OUMAROU OB · CC0 · Wikimedia Commons (hippopotames au Cameroun, illustration)',
    image_source: 'https://commons.wikimedia.org/wiki/File:Les_hippopotames_au_parc_national_de_la_b%C3%A9nou%C3%A9_au_Cameroun_11.jpg',
  },
};

export const HERO_IMAGE = IMG.lobeke;
export const WHY_IMAGE = IMG.mbamDjerem;
export const PILLARS_IMAGE = IMG.dja;

export const SEED_SITES = [
  {
    slug: 'reserve-de-faune-du-dja',
    category: 'parc',
    featured: true,
    name_fr: 'Réserve de faune du Dja',
    name_en: 'Dja Faunal Reserve',
    commune: 'Lomié / Somalomo',
    departement: 'Haut-Nyong (et Dja-et-Lobo, Sud)',
    lat: 3.0167,
    lng: 12.9833,
    coords_approx: true,
    ...IMG.dja,
    summary_fr:
      "Patrimoine mondial de l'UNESCO depuis 1987 : environ 526 000 ha de forêt dense presque entièrement encerclés par le fleuve Dja.",
    summary_en:
      'A UNESCO World Heritage Site since 1987: some 526,000 ha of rainforest almost entirely encircled by the Dja River.',
    description_fr:
      "Créée en 1950 comme réserve de faune et de chasse, la réserve est inscrite au patrimoine mondial en 1987 (critères ix et x). Selon l'UNESCO, environ 90 % de sa superficie reste intacte et elle abrite 107 espèces de mammifères, dont le gorille des plaines de l'Ouest, le chimpanzé, l'éléphant de forêt, le mandrill, le bongo et le léopard.\nDes communautés baka y vivent selon un mode de vie largement traditionnel. Côté Est, la réserve commence à quelques kilomètres à l'ouest de Lomié ; Somalomo est l'autre porte d'entrée, au nord.",
    description_en:
      'Created in 1950 as a game reserve, it was inscribed on the World Heritage List in 1987 (criteria ix and x). According to UNESCO, about 90% of its area remains undisturbed and it is home to 107 mammal species, including western lowland gorillas, chimpanzees, forest elephants, mandrills, bongos and leopards.\nBaka communities live there in a largely traditional way. On the East side, the reserve begins a few kilometres west of Lomié; Somalomo is the other gateway, to the north.',
    access_fr: "Yaoundé – Abong-Mbang – Lomié par la route ; entrée nord à Somalomo. Visite à organiser avec le Service de conservation du Dja (MINFOF).",
    access_en: 'Yaoundé – Abong-Mbang – Lomié by road; northern entrance at Somalomo. Visits arranged with the Dja Conservation Service (MINFOF).',
    sources: [SRC.unescoDja, SRC.unescoDjaSoc, SRC.lomieWiki],
  },
  {
    slug: 'parc-national-de-lobeke',
    category: 'parc',
    featured: true,
    name_fr: 'Parc national de Lobéké',
    name_en: 'Lobéké National Park',
    commune: 'Moloundou',
    departement: 'Boumba-et-Ngoko',
    lat: 2.25,
    lng: 15.75,
    coords_approx: true,
    ...IMG.lobeke,
    summary_fr:
      "217 854 ha à l'extrême sud-est, partie du Trinational de la Sangha (patrimoine mondial UNESCO 2012). Éléphants, gorilles et buffles observés depuis des miradors.",
    summary_en:
      '217,854 ha in the far south-east, part of the Sangha Trinational (UNESCO World Heritage, 2012). Elephants, gorillas and buffalo watched from platforms.',
    description_fr:
      "Le parc a été créé par décret du 19 mars 2001 et couvre 217 854 ha dans l'arrondissement de Moloundou. Avec Dzanga-Ndoki (RCA) et Nouabalé-Ndoki (Congo), il forme le Trinational de la Sangha, inscrit au patrimoine mondial de l'UNESCO en 2012.\nLes densités d'éléphants de forêt et de gorilles des plaines y sont parmi les plus élevées d'Afrique. Des clairières (baïs) font l'objet d'un suivi : Bolo, Djangui, Ndangaye, Ngoa, Djaloumbe et la Petite Savane. Un premier mirador se trouve à la Petite Savane, à environ 6 km de marche sous couvert forestier, un second environ 9 km plus loin. Le camping près des miradors est possible.",
    description_en:
      'Created by decree on 19 March 2001, the park covers 217,854 ha in Moloundou district. With Dzanga-Ndoki (CAR) and Nouabalé-Ndoki (Congo), it forms the Sangha Trinational, a UNESCO World Heritage Site since 2012.\nDensities of forest elephants and lowland gorillas are among the highest in Africa. Several clearings (bais) are monitored: Bolo, Djangui, Ndangaye, Ngoa, Djaloumbe and Petite Savane. A first watchtower stands at Petite Savane, about a 6 km walk under the forest canopy, and a second one about 9 km further on. Camping near the watchtowers is possible.',
    access_fr:
      "Yaoundé – Bertoua (environ 340 km, route en bon état) – Batouri (100 km de piste) – Yokadouma – Mambélé (360 km de piste). Formalités auprès du parc à Yokadouma. De Mambélé, 45 km jusqu'au point de dépôt de la Petite Savane.",
    access_en:
      'Yaoundé – Bertoua (about 340 km, good road) – Batouri (100 km of dirt road) – Yokadouma – Mambélé (360 km of dirt road). Entry formalities with the park at Yokadouma. From Mambélé, 45 km to the Petite Savane drop-off point.',
    sources: [SRC.lobekeIric, SRC.lobekeWiki, SRC.lobekeAccess, SRC.wwf3parks, SRC.ecomatin],
  },
  {
    slug: 'parc-national-de-boumba-bek',
    category: 'parc',
    featured: false,
    name_fr: 'Parc national de Boumba-Bek',
    name_en: 'Boumba-Bek National Park',
    commune: 'Moloundou / Yokadouma',
    departement: 'Boumba-et-Ngoko',
    lat: 2.53,
    lng: 15.0,
    coords_approx: true,
    ...IMG.boumbaBek,
    summary_fr:
      'Parc de 238 255 ha créé en 2005 entre les rivières Boumba et Bek, réputé pour ses colonies de perroquets à queue rouge.',
    summary_en:
      'A 238,255 ha park created in 2005 between the Boumba and Bek rivers, known for its colonies of red-tailed parrots.',
    description_fr:
      "Créé par décret du Premier ministre en octobre 2005, le parc tient son nom des rivières Boumba et Bek. Avec le parc voisin de Nki, il forme la plus vaste aire protégée du Cameroun (547 617 ha), inscrite sur la liste indicative du patrimoine mondial de l'UNESCO depuis 2018.\nBirdLife International le classe zone importante pour la conservation des oiseaux. Seize clairières (baïs) y ont été recensées. Le complexe fait partie du paysage transfrontalier TRIDOM (Dja–Odzala–Minkébé).",
    description_en:
      'Created by Prime Ministerial decree in October 2005, the park takes its name from the Boumba and Bek rivers. With neighbouring Nki, it forms the largest protected area in Cameroon (547,617 ha), on the UNESCO World Heritage tentative list since 2018.\nBirdLife International lists it as an Important Bird Area. Sixteen forest clearings (bais) have been recorded. The complex is part of the TRIDOM cross-border landscape (Dja–Odzala–Minkébé).',
    access_fr: 'Depuis Yokadouma ; visite à organiser avec le service de conservation (MINFOF).',
    access_en: 'From Yokadouma; visits arranged with the conservation service (MINFOF).',
    sources: [SRC.unescoBbNki, SRC.bbPlan, SRC.bbWiki, SRC.wwf3parks],
  },
  {
    slug: 'parc-national-de-nki',
    category: 'parc',
    featured: false,
    name_fr: 'Parc national de Nki',
    name_en: 'Nki National Park',
    commune: 'Ngoyla / Moloundou',
    departement: 'Haut-Nyong / Boumba-et-Ngoko',
    lat: 2.4167,
    lng: 14.4167,
    coords_approx: true,
    ...IMG.nki,
    summary_fr:
      'Parc de 309 362 ha, vallonné et très isolé, parfois décrit comme « la dernière vraie nature sauvage ».',
    summary_en: 'A 309,362 ha hilly and very remote park, sometimes described as "the last true wilderness".',
    description_fr:
      "Créé en octobre 2005 en même temps que Boumba-Bek, le parc s'étend sur les arrondissements de Ngoyla et de Moloundou. Les chutes de Nki et les rapides du Dja en font la beauté. Une étude de BirdLife International y a recensé 265 espèces d'oiseaux, et 73 clairières y ont été découvertes.\nLe WWF le décrit comme vallonné et largement inaccessible : c'est une destination d'expédition, à préparer avec des guides agréés.",
    description_en:
      'Created in October 2005 together with Boumba-Bek, the park spans Ngoyla and Moloundou districts. The Nki falls and the Dja rapids give it its beauty. A BirdLife International survey recorded 265 bird species, and 73 forest clearings have been found.\nWWF describes it as hilly and largely inaccessible: an expedition destination, to be prepared with licensed guides.',
    access_fr: 'Par Lomié puis Ngoyla ; expédition à organiser avec le service de conservation.',
    access_en: 'Via Lomié then Ngoyla; expedition to be arranged with the conservation service.',
    sources: [SRC.nkiWiki, SRC.unescoBbNki, SRC.wwf3parks],
  },
  {
    slug: 'parc-national-du-mbam-et-djerem',
    category: 'parc',
    featured: false,
    name_fr: 'Parc national du Mbam et Djerem',
    name_en: 'Mbam and Djerem National Park',
    commune: 'Bétaré-Oya (partie Est)',
    departement: 'Lom-et-Djerem',
    lat: 5.8333,
    lng: 12.75,
    coords_approx: true,
    ...IMG.mbamDjerem,
    summary_fr:
      "Créé en 2000 (416 512 ha), à cheval sur l'Adamaoua, le Centre et l'Est, à la transition entre forêt dense et savane.",
    summary_en:
      'Created in 2000 (416,512 ha), straddling the Adamawa, Centre and East regions, where rainforest meets savanna.',
    description_fr:
      "Le décret de création place le parc dans les arrondissements de Tibati (Adamaoua), Yoko (Centre) et Bétaré-Oya (Est). Sa position entre forêt et savane lui donne probablement la plus grande diversité d'habitats des aires protégées du Cameroun. BirdLife International y recense 365 espèces d'oiseaux ; chimpanzés et éléphants y sont présents.\nLa Wildlife Conservation Society (WCS) accompagne sa gestion depuis 2003. Le point sur la carte indique le centre du parc, et la photo a été prise côté Adamaoua.",
    description_en:
      'The founding decree places the park in Tibati (Adamawa), Yoko (Centre) and Bétaré-Oya (East) districts. Its position between forest and savanna probably gives it the greatest habitat diversity of any protected area in Cameroon. BirdLife International records 365 bird species; chimpanzees and elephants are present.\nThe Wildlife Conservation Society (WCS) has supported its management since 2003. The map pin shows the centre of the park, and the photo was taken on the Adamawa side.',
    access_fr: "Accès côté Est par Bétaré-Oya, avec le service de conservation.",
    access_en: 'East-side access via Bétaré-Oya, with the conservation service.',
    sources: [SRC.mdDecret, SRC.mdBirdlife, SRC.mdWcs],
  },
  {
    slug: 'parc-national-de-deng-deng',
    category: 'parc',
    featured: false,
    name_fr: 'Parc national de Deng Deng',
    name_en: 'Deng Deng National Park',
    commune: 'Bélabo',
    departement: 'Lom-et-Djerem',
    lat: 5.3506,
    lng: 13.4417,
    coords_approx: false,
    ...IMG.dengDeng,
    summary_fr:
      'Parc de 682 km² créé en 2010, en bordure du lac de Lom Pangar, qui abrite la population de gorilles connue la plus septentrionale.',
    summary_en:
      'A 682 km² park created in 2010 on the edge of Lake Lom Pangar, home to the northernmost known gorilla population.',
    description_fr:
      "Le parc longe la Sanaga, avec le réservoir de Lom Pangar à l'est et le parc du Mbam et Djerem à une cinquantaine de kilomètres au nord-ouest. On y trouve le gorille des plaines de l'Ouest (sa population connue la plus au nord), le chimpanzé, l'éléphant de forêt, l'hippopotame et le pangolin géant.\nLa WCS y mène des programmes de suivi. Les visites s'organisent avec le service de conservation et des guides locaux.",
    description_en:
      'The park lies along the Sanaga River, with the Lom Pangar reservoir to the east and Mbam and Djerem park about 50 km to the north-west. It is home to western lowland gorillas (their northernmost known population), chimpanzees, forest elephants, hippos and giant pangolins.\nWCS runs monitoring programmes there. Visits are arranged with the conservation service and local guides.',
    access_fr: 'Depuis Bélabo, avec le service de conservation et des guides locaux.',
    access_en: 'From Bélabo, with the conservation service and local guides.',
    sources: [SRC.ddWiki, SRC.ddWcs],
  },
  {
    slug: 'barrage-et-lac-de-lom-pangar',
    category: 'nature',
    featured: false,
    name_fr: 'Barrage et lac de Lom Pangar',
    name_en: 'Lom Pangar Dam and Lake',
    commune: 'Bélabo',
    departement: 'Lom-et-Djerem',
    lat: 5.3714,
    lng: 13.5124,
    coords_approx: false,
    ...IMG.lomPangar,
    summary_fr:
      'Barrage-réservoir sur le Lom, achevé en 2017, dont la retenue couvre environ 540 km², à quelque 88 km au nord de Bertoua.',
    summary_en:
      'A reservoir dam on the Lom River, completed in 2017, with a lake of about 540 km², some 88 km north of Bertoua.',
    description_fr:
      "Haut de 46 m, l'ouvrage retient environ 6 milliards de m³ d'eau pour réguler le débit de la Sanaga ; une centrale de 30 MW y est associée. Les travaux ont débuté en 2012.\nC'est d'abord une infrastructure énergétique : le lac de retenue offre aussi un potentiel touristique (point de vue, pêche, navigation), à développer avec l'exploitant et les autorités.",
    description_en:
      'The 46 m high dam holds about 6 billion m³ of water to regulate the flow of the Sanaga River; a 30 MW power plant is attached. Construction began in 2012.\nIt is first and foremost an energy facility: the reservoir also has tourism potential (viewpoint, fishing, boating), to be developed with the operator and the authorities.',
    access_fr: "Depuis Bertoua ou Bélabo ; visite à organiser avec l'exploitant du barrage.",
    access_en: 'From Bertoua or Bélabo; visits arranged with the dam operator.',
    sources: [SRC.lpWiki, SRC.ddWiki],
  },
  {
    slug: 'bertoua',
    category: 'culture',
    featured: false,
    name_fr: 'Bertoua, capitale régionale',
    name_en: 'Bertoua, regional capital',
    commune: 'Bertoua',
    departement: 'Lom-et-Djerem',
    lat: 4.583,
    lng: 13.683,
    coords_approx: false,
    ...IMG.bertoua,
    summary_fr: "Chef-lieu de la Région de l'Est, point de départ naturel vers les parcs, grottes et chutes de la région.",
    summary_en: 'Capital of the East Region and the natural starting point for its parks, caves and waterfalls.',
    description_fr:
      "La ville porte le nom de Mbartoua, chef gbaya qui résista à la pénétration allemande au début du XXe siècle. La grotte qui lui est associée se trouve à Gounté, dans la commune voisine de Mandjou.\nBertoua est le principal carrefour routier de la région, sur l'axe qui mène vers Batouri, Yokadouma et le parc de Lobéké.",
    description_en:
      'The city is named after Mbartoua, a Gbaya chief who resisted German penetration in the early 20th century. The cave associated with him is at Gounté, in neighbouring Mandjou council.\nBertoua is the main road hub of the region, on the route towards Batouri, Yokadouma and Lobéké park.',
    access_fr: 'Par la route depuis Yaoundé (environ 340 km).',
    access_en: 'By road from Yaoundé (about 340 km).',
    sources: [SRC.bertouaWiki, SRC.camerpressBertoua, SRC.ongolaMbartoua, SRC.lobekeAccess],
  },
  {
    slug: 'grotte-du-roi-mbartoua',
    category: 'histoire',
    featured: true,
    name_fr: 'Grottes du Roi Mbartoua (Gounté)',
    name_en: 'King Mbartoua Caves (Gounté)',
    commune: 'Mandjou',
    departement: 'Lom-et-Djerem',
    lat: 4.6,
    lng: 13.78,
    coords_approx: true,
    ...IMG.mbartoua,
    summary_fr:
      'Près de Bertoua, les grottes où Mbartoua, chef gbaya, se réfugiait pour résister à la colonisation allemande.',
    summary_en: 'Near Bertoua, the caves where Mbartoua, a Gbaya chief, took refuge to resist German colonisation.',
    description_fr:
      "Mbartoua, chef supérieur gbaya, s'opposa à l'expansion allemande dans le Lom et Djerem. Selon la tradition, la grotte, composée de plusieurs compartiments, lui servait de refuge et de lieu de préparation de ses attaques ; il aurait été tué par les colons en 1903. Les Gbaya y voient encore un lieu de méditation et de rites traditionnels.\nLes sources divergent sur la distance depuis Bertoua (15 km selon Ongola, 25 km selon la délégation régionale du Tourisme) et sur le nom du village (Gounté ou Ngouté). Des fonds ont été alloués à la commune de Mandjou pour aménager le site  pour en faire un lieu de visite et de mémoire.",
    description_en:
      'Mbartoua, a Gbaya paramount chief, opposed German expansion in the Lom and Djerem area. According to tradition, the multi-chambered cave served as his refuge and as the place where he planned his attacks; he is said to have been killed by the colonisers in 1903. The Gbaya still regard it as a place of meditation and traditional rites.\nSources differ on the distance from Bertoua (15 km according to Ongola, 25 km according to the regional tourism delegation) and on the village name (Gounté or Ngouté). Funds were allocated to Mandjou council to develop the site, to turn it into a place of visit and remembrance.',
    access_fr: 'Village de Gounté (ou Ngouté), commune de Mandjou, à 15–25 km de Bertoua selon les sources.',
    access_en: 'Gounté (or Ngouté) village, Mandjou council, 15–25 km from Bertoua depending on the source.',
    sources: [SRC.ongolaMbartoua, SRC.ecomatin, SRC.datacameroon],
  },
  {
    slug: 'forteresse-allemande-de-doume',
    category: 'histoire',
    featured: true,
    name_fr: 'Fort allemand de Doumé',
    name_en: 'German Fort of Doumé',
    commune: 'Doumé',
    departement: 'Haut-Nyong',
    lat: 4.2429,
    lng: 13.454,
    coords_approx: false,
    ...IMG.doume,
    summary_fr:
      "Fort construit en 1909-1910 sur une hauteur, poste militaire allemand chargé de l'Est, pris le 25 juillet 1915.",
    summary_en:
      'A fort built in 1909–1910 on high ground, the German military post for the East, taken on 25 July 1915.',
    description_fr:
      "Doumé s'est développée avec l'arrivée des Allemands vers les années 1880. Le fort, appelé « Doumestation », a été bâti sur une hauteur entre 1909 et 1910 pour réprimer les soulèvements des peuples jebekole et maka'a ; il était commandé par l'officier responsable de l'Est du Kamerun allemand. La photo d'archives de 1915 montre son entrée après sa prise, le 25 juillet 1915, pendant la Première Guerre mondiale.\nSous l'administration française, Doumé fut le siège de l'une des neuf circonscriptions du Cameroun. De nombreux bâtiments coloniaux abritent encore l'administration et des écoles. La grotte de Timbé est également signalée à Doumé.",
    description_en:
      'Doumé grew with the arrival of the Germans around the 1880s. The fort, known as "Doumestation", was built on high ground in 1909–1910 to suppress uprisings by the Jebekole and Maka\'a peoples; it was commanded by the officer in charge of the East of German Kamerun. The 1915 archive photo shows its entrance after it was taken on 25 July 1915, during the First World War.\nUnder French administration, Doumé was the seat of one of Cameroon\'s nine districts. Many colonial buildings still house the administration and schools. Timbé cave is also reported in Doumé.',
    access_fr: 'Doumé, à environ 280 km de Yaoundé, entre Abong-Mbang et Bertoua.',
    access_en: 'Doumé, about 280 km from Yaoundé, between Abong-Mbang and Bertoua.',
    sources: [SRC.le360Doume, SRC.ecomatin],
  },
  {
    slug: 'lomie-ville-historique',
    category: 'culture',
    featured: false,
    name_fr: 'Lomié, porte du Dja',
    name_en: 'Lomié, gateway to the Dja',
    commune: 'Lomié',
    departement: 'Haut-Nyong',
    lat: 3.1703,
    lng: 13.6469,
    coords_approx: false,
    ...IMG.lomie,
    summary_fr:
      "Petite ville aux bâtiments des époques allemande et française, en lisière immédiate de la Réserve du Dja.",
    summary_en: 'A small town with German- and French-era buildings, right on the edge of the Dja Reserve.',
    description_fr:
      "Lomié conserve plusieurs bâtiments historiques des périodes allemande et française. Située en périphérie immédiate de la Réserve de faune du Dja, elle sert de base vers la réserve, vers Ngoyla et le parc de Nki au sud, et vers Messok et Yokadouma à l'est.",
    description_en:
      'Lomié keeps several historic buildings from the German and French periods. Right on the edge of the Dja Faunal Reserve, it is a base for the reserve, for Ngoyla and Nki park to the south, and for Messok and Yokadouma to the east.',
    access_fr: "Route depuis Abong-Mbang via Mindourou.",
    access_en: 'Road from Abong-Mbang via Mindourou.',
    sources: [SRC.lomieWiki, SRC.ecomatin],
  },
  {
    slug: 'chutes-de-mali',
    category: 'nature',
    featured: false,
    name_fr: 'Chutes de Mali',
    name_en: 'Mali Falls',
    commune: 'Bétaré-Oya',
    departement: 'Lom-et-Djerem',
    lat: 5.6,
    lng: 14.08,
    coords_approx: true,
    ...IMG.mali,
    summary_fr: "Chutes de l'arrondissement de Bétaré-Oya, inscrites sur la liste des sites de la délégation régionale du Tourisme.",
    summary_en: 'Waterfalls in Bétaré-Oya district, on the regional tourism delegation’s list of sites.',
    description_fr:
      "Les chutes de Mali (Limboka) et de Moniï figurent dans l'inventaire de la délégation régionale du Tourisme et des Loisirs de l'Est. Le site reste à l'état naturel, pour les amateurs d'aventure. La zone de Bétaré-Oya est aussi connue pour ses chantiers d'orpaillage. D'autres chutes sont signalées dans la région : Boden, Ndong (Ndélélé), Boumba (Yokadouma).",
    description_en:
      'Mali (Limboka) and Moniï falls are on the inventory of the East regional tourism delegation and remain in their natural state, for adventurous visitors. The Bétaré-Oya area is also known for its gold-panning sites. Other falls are reported in the region: Boden, Ndong (Ndélélé), Boumba (Yokadouma).',
    access_fr: 'Depuis Bétaré-Oya, avec un guide local.',
    access_en: 'From Bétaré-Oya, with a local guide.',
    sources: [SRC.datacameroon, SRC.ecomatin, SRC.evaneos],
  },
  {
    slug: 'monts-pandi',
    category: 'nature',
    featured: false,
    name_fr: 'Monts Pandi (Batouri)',
    name_en: 'Pandi Hills (Batouri)',
    commune: 'Batouri',
    departement: 'Kadey',
    lat: 4.43,
    lng: 14.36,
    coords_approx: true,
    ...IMG.batouri,
    summary_fr: "Reliefs de Batouri inscrits dans l'inventaire régional, tout comme le lac de Batouri.",
    summary_en: 'Hills near Batouri on the regional inventory, as is Lake Batouri.',
    description_fr:
      "Les monts Pandi et le lac de Batouri figurent dans l'inventaire de la délégation régionale du Tourisme. Batouri est une étape sur la route de Yokadouma et du parc de Lobéké.",
    description_en:
      'The Pandi hills and Lake Batouri are on the regional tourism delegation’s inventory. Batouri is a stop on the road to Yokadouma and Lobéké park.',
    access_fr: 'Depuis Batouri, avec un guide local.',
    access_en: 'From Batouri, with a local guide.',
    sources: [SRC.datacameroon, SRC.ecomatin, SRC.evaneos],
  },
  {
    slug: 'mare-aux-hippopotames-de-lala',
    category: 'nature',
    featured: false,
    name_fr: 'Mare aux hippopotames de Lala',
    name_en: 'Lala Hippo Pool',
    commune: 'Kétté',
    departement: 'Kadey',
    lat: null,
    lng: null,
    coords_approx: true,
    ...IMG.lala,
    summary_fr: "Mare où l'on peut observer des hippopotames, équipée d'un mirador financé par le ministère du Tourisme.",
    summary_en: 'A pool where hippos can be watched, with a watchtower funded by the Ministry of Tourism.',
    description_fr:
      "D'après la délégation régionale du Tourisme, le ministère a financé un mirador pour l'observation de la mare ; son entretien relève de la commune. Une autre mare aux hippopotames est signalée à Ndélélé.",
    description_en:
      'According to the regional tourism delegation, the ministry funded a watchtower for observing the pool; upkeep falls to the council. Another hippo pool is reported at Ndélélé.',
    access_fr: 'Village de Lala, commune de Kétté.',
    access_en: 'Lala village, Kétté council.',
    sources: [SRC.ecomatin, SRC.datacameroon],
  },
].map((s, i) => ({
  image_url: null,
  image_credit: null,
  image_source: null,
  ...s,
  status: 'a_verifier',
  published: true,
  sort: i,
}));

export const SEED_OPPORTUNITIES = [
  {
    slug: 'hebergement-ecotouristique',
    sector: 'hebergement',
    title_fr: 'Hébergement écotouristique aux portes des parcs',
    title_en: 'Eco-lodges at the park gateways',
    location: 'Lomié, Yokadouma, Mambélé',
    summary_fr:
      "Les professionnels de l'hôtellerie de l'Est citent le manque d'infrastructures d'accueil (eau, énergie, accès) comme un frein majeur, et les visiteurs de Lobéké passent la nuit au village avant d'entrer dans le parc. Piste à étudier avec les communes et les gestionnaires des aires protégées.",
    summary_en:
      'Hospitality professionals in the East cite the lack of visitor facilities (water, power, access) as a major obstacle, and Lobéké visitors overnight in the village before entering the park. To be explored with councils and protected-area managers.',
    sources: [SRC.ecomatin, SRC.lobekeAccess],
  },
  {
    slug: 'amenagement-sites-communaux',
    sector: 'amenagement',
    title_fr: 'Aménagement de sites touristiques communaux',
    title_en: 'Development of council-run tourist sites',
    location: 'Mandjou, Kétté, Bétaré-Oya, Batouri…',
    summary_fr:
      "Avec la décentralisation, l'aménagement des sites (pistes d'accès, accueil, signalétique) revient aux communes, et la délégation régionale signale plus d'une vingtaine de sites non aménagés. Partenariats public-privé possibles, à discuter site par site.",
    summary_en:
      'Under decentralisation, councils are responsible for developing sites (access tracks, reception, signage), and the regional delegation reports more than twenty undeveloped sites. Public-private partnerships possible, to be discussed site by site.',
    sources: [SRC.datacameroon, SRC.ecomatin],
  },
  {
    slug: 'guides-et-circuits',
    sector: 'services',
    title_fr: 'Formation de guides et circuits organisés',
    title_en: 'Guide training and organised tours',
    location: 'Région de l’Est, au départ de Bertoua',
    summary_fr:
      "Selon la délégation régionale, la plupart des clients des hôtels sont des chauffeurs en transit vers le Tchad, la RCA et le Congo. Former des guides locaux et structurer des circuits (Bertoua – Doumé – Lomié – Dja, ou Bertoua – Yokadouma – Lobéké) est une piste à valider.",
    summary_en:
      'According to the regional delegation, most hotel guests are drivers in transit to Chad, CAR and Congo. Training local guides and structuring tours (Bertoua – Doumé – Lomié – Dja, or Bertoua – Yokadouma – Lobéké) is an idea to validate.',
    sources: [SRC.ecomatin, SRC.datacameroon],
  },
].map((o, i) => ({ ...o, status: 'a_valider', published: true, sort: i }));

import fs from 'node:fs';
const UA = { 'User-Agent': 'EastSmartForestTourism/1.0 (yungagency3@gmail.com)' };
const j = async (u, opt = {}) => { const r = await fetch(u, { ...opt, headers: { ...UA, ...(opt.headers || {}) } }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('/tmp/out', { recursive: true });

async function fileInfo(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 40) {
    const chunk = titles.slice(i, i + 40);
    const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=960&titles=' + encodeURIComponent(chunk.join('|'));
    const d = await j(u);
    for (const p of Object.values(d.query.pages)) {
      const ii = p.imageinfo && p.imageinfo[0]; if (!ii) continue;
      const m = ii.extmetadata || {};
      const strip = (s) => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      out[p.title] = { thumb: ii.thumburl, url: ii.url, w: ii.width, h: ii.height, mime: ii.mime, page: ii.descriptionurl,
        artist: strip(m.Artist?.value).slice(0, 80), license: strip(m.LicenseShortName?.value), desc: strip(m.ImageDescription?.value).slice(0, 160) };
    }
    await sleep(300);
  }
  return out;
}

// 1. Species
const species = ['African forest elephant','Western lowland gorilla','Central chimpanzee','Bongo (antelope)','Sitatunga','African forest buffalo','African leopard','Giant pangolin','Hippopotamus','Grey parrot','Giant forest hog','Mandrill','Collared mangabey','Water chevrotain','Nile crocodile'];
const sp = {};
for (const t of species) {
  try {
    const ml = await j('https://en.wikipedia.org/api/rest_v1/page/media-list/' + encodeURIComponent(t.replace(/ /g, '_')));
    const imgs = ml.items.filter((x) => x.type === 'image' && /\.(jpe?g)$/i.test(x.title) && !/map|range|distribution|skull|skeleton|stamp|coin/i.test(x.title)).map((x) => x.title.replace(/^File:/, 'File:')).slice(0, 6);
    sp[t] = imgs;
  } catch (e) { sp[t] = { error: e.message }; }
  await sleep(200);
}
const allSp = Object.values(sp).filter(Array.isArray).flat();
const spInfo = await fileInfo(allSp);
fs.writeFileSync('/tmp/out/species.json', JSON.stringify({ sp, spInfo }));

// 2. Tracks / footprints search
const tracks = {};
for (const q of ['elephant footprint','gorilla footprint','leopard pugmark','hippopotamus footprint','buffalo track mud','pangolin track','crocodile track','antelope hoof print','chimpanzee knuckle print']) {
  try {
    const d = await j('https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=5&srsearch=' + encodeURIComponent(q + ' filetype:bitmap'));
    tracks[q] = d.query.search.map((s) => s.title);
  } catch (e) { tracks[q] = []; }
  await sleep(200);
}
const trInfo = await fileInfo(Object.values(tracks).flat());
fs.writeFileSync('/tmp/out/tracks.json', JSON.stringify({ tracks, trInfo }));

// 3. Site extra photos (known files)
const siteFiles = ['File:Buffle dans le Parc National de Lobéké.jpg','File:First mirador in Lobéké.jpg','File:Panthère dans le Parc National de Lobéké.jpg','File:Clairière dans le Parc National de Lobéké.JPG','File:Foret le dja.jpg','File:Foret le dja2.jpg','File:Dja.JPG','File:Vegetation Dja.JPG','File:Mantelmangabe Dja.JPG','File:Couché du soleil dans le Dja.jpg','File:Eingangsschild Dja Somalomo.JPG','File:Forêt Galerie - Parc National du Mbam et Djerem.jpg','File:Vue aerienne du Tracé du Djerem ou haute Sanaga - Parc national du Mbam et Djerem.jpg','File:Le Djerem ou Haute Sanaga -- Parc national du Mbam et Djerem - Adamaoua - Cameroun.jpg','File:Canon de 80 mm en position - Doumé (vers) - Médiathèque de l\'architecture et du patrimoine - AP62T021052.jpg','File:Abri de mitrailleuses allemandes - Doumé (vers) - Médiathèque de l\'architecture et du patrimoine - AP62T021053.jpg','File:Entrée du fort de Doumé enlevé le 25 Juillet 15 - Doumé - Médiathèque de l\'architecture et du patrimoine - AP62T021049.jpg','File:Station Doumé.jpg','File:Colonial relics in Batouri.jpg','File:Botanic gardens Batouri.jpg','File:Sunset in Batouri, East-Cameroon.jpg','File:Moon over Batouri, East-Cameroon.jpg','File:Hotel de ville de Bertoua.jpg','File:Plaque Bertoua.jpg','File:Lomié crossroads.jpg','File:Logging truck and bush taxi accident.jpg'];
const siteInfo = await fileInfo(siteFiles);
fs.writeFileSync('/tmp/out/sites.json', JSON.stringify(siteInfo));

// 4. 360 panoramas candidates in Cameroon East
const pano = {};
for (const q of ['360 panorama Cameroun forêt','equirectangular Cameroon','panorama Bertoua','panorama Dja Cameroon','360 Lobéké']) {
  try { const d = await j('https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=8&srsearch=' + encodeURIComponent(q)); pano[q] = d.query.search.map((s) => s.title); } catch (e) { pano[q] = []; }
}
fs.writeFileSync('/tmp/out/pano.json', JSON.stringify(pano));

// 5. OSM POIs East region
const oq = `[out:json][timeout:120];area["ISO3166-2"="CM-ES"]->.a;(
 nwr["tourism"~"^(hotel|guest_house|motel|hostel|camp_site|attraction|viewpoint|museum|picnic_site)$"](area.a);
 nwr["amenity"~"^(restaurant|cafe|fast_food)$"](area.a);
 nwr["natural"~"^(waterfall|cave_entrance|peak)$"](area.a);
 nwr["waterway"="waterfall"](area.a);
 nwr["historic"](area.a);
 nwr["leisure"="nature_reserve"]["name"](area.a);
 nwr["boundary"="protected_area"]["name"](area.a);
);out center tags;`;
try {
  const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', headers: { ...UA, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(oq) });
  const d = await r.json();
  const pois = d.elements.map((e) => ({ id: e.type[0] + e.id, lat: e.lat ?? e.center?.lat, lng: e.lon ?? e.center?.lon, t: e.tags }));
  fs.writeFileSync('/tmp/out/osm.json', JSON.stringify(pois));
  console.log('OSM', pois.length);
} catch (e) { console.log('OSM ERR', e.message); }

// 6. Building density check in Bertoua (count)
try {
  const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', headers: { ...UA, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent('[out:json][timeout:60];way["building"](4.55,13.64,4.62,13.72);out count;') });
  const d = await r.json(); console.log('BUILDINGS_BERTOUA', JSON.stringify(d.elements[0]?.tags));
} catch (e) { console.log('BLD ERR', e.message); }
console.log('species', Object.keys(spInfo).length, 'tracks', Object.keys(trInfo).length, 'sites', Object.keys(siteInfo).length);

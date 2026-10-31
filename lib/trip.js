'use client';
// Favoris « Mon voyage » : stockés dans le navigateur du visiteur (aucun compte nécessaire).
const KEY = 'esft-trip-v1';
export function readTrip() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
}
export function writeTrip(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* stockage indisponible */ }
  try { window.dispatchEvent(new Event('esft-trip')); } catch (e) { /* ignore */ }
}
export function toggleTrip(item) {
  const list = readTrip();
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list.splice(i, 1); else list.push({ ...item, at: Date.now() });
  writeTrip(list);
  return i < 0;
}

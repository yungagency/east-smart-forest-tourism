// Variantes Wikimedia (500 px pour mobile, 960 px sinon) : images plus légères sur téléphone.
export function srcSet(src) {
  if (!src || !src.includes('/960px-')) return undefined;
  return `${src.replace('/960px-', '/500px-')} 500w, ${src} 960w`;
}
export const CARD_SIZES = '(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 300px';

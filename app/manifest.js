export default function manifest() {
  return {
    name: 'East Smart Forest & Tourism',
    short_name: 'EAST Smart',
    description: "Forêts, tourisme et investissement dans la Région de l'Est du Cameroun",
    start_url: '/fr',
    display: 'standalone',
    background_color: '#f6f8f3',
    theme_color: '#0e4a2b',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}

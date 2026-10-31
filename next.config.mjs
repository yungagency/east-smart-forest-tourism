/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }] },
  // Une seule adresse publique : l'ancienne adresse renvoie vers l'adresse retenue (évite le contenu en double)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'east-smart-forest-tourism-i8w5.vercel.app' }],
        destination: 'https://east-smart-forest-tourism.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

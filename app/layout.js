import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const display = Poppins({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://east-smart-forest-tourism-i8w5.vercel.app'),
  title: 'East Smart Forest & Tourism',
  icons: { icon: '/icon.svg' },
};

export const viewport = { themeColor: '#10302a' };

// Layout racine unique (obligatoire pour la page 404 générée par Next.js).
export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

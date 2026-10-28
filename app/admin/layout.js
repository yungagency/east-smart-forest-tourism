import { Inter, Fraunces } from 'next/font/google';
import '../globals.css';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['600'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = { title: 'Admin · East Smart Forest & Tourism', robots: { index: false, follow: false }, icons: { icon: '/icon.svg' } };

export default function AdminLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

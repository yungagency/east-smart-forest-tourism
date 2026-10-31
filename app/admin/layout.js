import '../globals.css';
import { display, body } from '@/lib/fonts';

export const metadata = { title: 'Admin · East Smart Forest & Tourism', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

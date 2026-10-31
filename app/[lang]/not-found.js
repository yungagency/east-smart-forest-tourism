import Link from 'next/link';
import '../globals.css';

export default function NotFound() {
  return (
    <section className="section"><div className="wrap" style={{ maxWidth: 720 }}>
      <h1>404</h1>
      <p className="lead">Page introuvable · Page not found</p>
      <p>Cette page n'existe pas ou a été déplacée. · This page does not exist or has moved.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
        <Link className="btn btn-dark" href="/fr">Accueil</Link>
        <Link className="btn btn-outline" href="/fr/sites">Destinations</Link>
        <Link className="btn btn-outline" href="/fr/faune">Faune</Link>
        <Link className="btn btn-outline" href="/fr/carte">Carte</Link>
        <Link className="btn btn-outline" href="/en">English</Link>
      </div>
    </div></section>
  );
}

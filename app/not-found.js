import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section"><div className="wrap">
      <h1>404</h1>
      <p className="lead">Page introuvable · Page not found</p>
      <Link className="btn btn-dark" href="/fr">Accueil</Link>
    </div></section>
  );
}

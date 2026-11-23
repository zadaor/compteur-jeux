import { Link } from 'react-router-dom';
import Astre from '../components/Astre';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre */}
          <div className="hero-title mb-8">
            <h1>Compteur de Points</h1>
            <p className="mt-4 text-[var(--text-muted)]">
              pour Jeux de Société
            </p>
          </div>

          {/* Astre Central + Orbites */}
          <div className="my-12">
            <Astre />
          </div>

          {/* Boutons */}
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/yams"
              className="btn btn-primary"
            >
              Yam's
            </Link>
            <Link
              to="/5000"
              className="btn btn-secondary"
            >
              5000
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

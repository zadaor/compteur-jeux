import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link
        to="/"
        className={`nav-btn px-6 py-2 text-sm font-medium transition-colors ${
          location.pathname === '/' ? 'bg-[var(--accent-2)] text-[var(--on-accent)]' : 'text-[var(--text)]'
        }`}
      >
        Accueil
      </Link>
      <Link
        to="/yams"
        className={`nav-btn px-6 py-2 text-sm font-medium transition-colors ${
          location.pathname === '/yams' ? 'bg-[var(--accent-2)] text-[var(--on-accent)]' : 'text-[var(--text)]'
        }`}
      >
        Yam's
      </Link>
      <Link
        to="/5000"
        className={`nav-btn px-6 py-2 text-sm font-medium transition-colors ${
          location.pathname === '/5000' ? 'bg-[var(--accent-2)] text-[var(--on-accent)]' : 'text-[var(--text)]'
        }`}
      >
        5000
      </Link>
    </nav>
  );
}

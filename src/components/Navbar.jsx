import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold hover:text-gray-300">
          Compteur de Points
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Accueil
          </Link>
          <Link to="/yams" className="text-white hover:text-gray-300">
            Yam's
          </Link>
          <Link to="/5000" className="text-white hover:text-gray-300">
            5000
          </Link>
        </div>
      </div>
    </nav>
  );
}

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-red-900 text-white pb-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Compteur de Points - Jeux de Société
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/yams"
            className="block p-8 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Yam's</h2>
            <p className="text-gray-600">Compteur de points pour le jeu de dés Yam's</p>
          </Link>
          
          <Link
            to="/5000"
            className="block p-8 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-center"
          >
            <h2 className="text-2xl font-bold mb-4">5000</h2>
            <p className="text-gray-600">Compteur de points pour le jeu de cartes 5000</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

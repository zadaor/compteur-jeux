import { useState, useEffect } from 'react';

// Règles du Yam's (points par combinaison)
const YAMS_SCORES = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  'Brelan': 30,
  'Carré': 40,
  'Full': 50,
  'Petite Suite': 30,
  'Grande Suite': 40,
  'Yams': 50,
  'Chance': 0 // Sera calculé comme la somme des dés
};

// Combinaisons possibles
const COMBINATIONS = [
  '1', '2', '3', '4', '5', '6',
  'Brelan', 'Carré', 'Full', 'Petite Suite', 'Grande Suite', 'Yams', 'Chance'
];

export default function JeuYams() {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [gameName, setGameName] = useState('Partie de Yam\'s');

  // Initialiser les scores pour chaque joueur
  useEffect(() => {
    if (players.length > 0) {
      const initialScores = {};
      players.forEach(player => {
        initialScores[player.id] = COMBINATIONS.reduce((acc, combo) => {
          acc[combo] = null;
          return acc;
        }, {});
      });
      setScores(initialScores);
    }
  }, [players]);

  const addPlayer = (name) => {
    if (!name.trim()) return;
    const newPlayer = { id: Date.now(), name, score: 0 };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updateScore = (playerId, combination, value) => {
    setScores(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [combination]: value
      }
    }));
  };

  const calculateTotal = (playerId) => {
    const playerScores = scores[playerId] || {};
    let total = 0;
    
    // Calcul des scores pour chaque combinaison
    for (const combo of COMBINATIONS) {
      const value = playerScores[combo];
      if (value !== null && value !== undefined) {
        if (combo === 'Chance') {
          total += value; // Pour Chance, on ajoute directement la valeur
        } else {
          total += YAMS_SCORES[combo] * (value || 0);
        }
      }
    }
    return total;
  };

  const resetGame = () => {
    setPlayers([]);
    setScores({});
    setGameName('Partie de Yam\'s');
  };

  const currentPlayer = players[currentPlayerIndex] || null;

  return (
    <div className="min-h-screen bg-red-900 text-white pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 
          className="text-2xl font-bold text-center mb-4 cursor-pointer hover:text-gray-300"
          onClick={() => {
            const newName = prompt('Nouveau nom de partie:', gameName);
            if (newName) setGameName(newName);
          }}
        >
          {gameName}
        </h1>
        
        <div className="flex justify-center gap-2 mb-8">
          <button 
            onClick={() => setShowQRCode(!showQRCode)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            📱 QRCode
          </button>
          {players.length > 0 && (
            <button 
              onClick={resetGame} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Liste des joueurs et leurs scores */}
        {players.length > 0 && (
          <div className="space-y-6 mb-8">
            {players.map((player, index) => (
              <div key={player.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{player.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {COMBINATIONS.map(combo => (
                    <div key={combo} className="bg-gray-700 p-2 rounded text-sm">
                      <div className="font-medium">{combo}</div>
                      <input
                        type="number"
                        value={scores[player.id]?.[combo] || ''}
                        onChange={(e) => updateScore(player.id, combo, parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent border-none text-center"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right font-bold">
                  Total: {calculateTotal(player.id)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ajouter un joueur */}
        <div className="mt-8">
          <form onSubmit={(e) => { e.preventDefault(); addPlayer(e.target.playerName.value); e.target.reset(); }}>
            <div className="flex gap-2">
              <input
                name="playerName"
                type="text"
                placeholder="Nom du joueur..."
                className="flex-1 px-4 py-2 text-gray-800 border rounded-lg"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Ajouter
              </button>
            </div>
          </form>
        </div>

        {/* Légende des scores */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Légende des points</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(YAMS_SCORES).map(([combo, points]) => (
              <div key={combo} className="flex justify-between">
                <span>{combo}:</span>
                <span>{points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

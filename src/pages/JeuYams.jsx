import { useState, useEffect } from 'react';
import Orbite from '../components/Orbite';

// Règles du Yam's
const YAMS_SCORES = {
  '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
  'Brelan': 30, 'Carré': 40, 'Full': 50,
  'Petite Suite': 30, 'Grande Suite': 40, 'Yams': 50
};
const COMBINATIONS = ['1', '2', '3', '4', '5', '6', 'Brelan', 'Carré', 'Full', 'Petite Suite', 'Grande Suite', 'Yams', 'Chance'];

export default function JeuYams() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [gameName, setGameName] = useState('Partie de Yam\'s');

  // Initialiser les scores
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
    setPlayers([...players, { id: Date.now(), name }]);
  };

  const updateScore = (playerId, combination, value) => {
    setScores(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], [combination]: value }
    }));
  };

  const calculateTotal = (playerId) => {
    const playerScores = scores[playerId] || {};
    let total = 0;
    for (const combo of COMBINATIONS) {
      const value = playerScores[combo];
      if (value !== null && value !== undefined) {
        if (combo === 'Chance') total += value;
        else total += YAMS_SCORES[combo] * (value || 0);
      }
    }
    return total;
  };

  const resetGame = () => {
    setPlayers([]);
    setScores({});
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Décoration : orbite en haut à droite */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
          <Orbite size={200} planetColor="var(--accent-2)" />
        </div>

        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-2xl font-medium cursor-pointer"
            onClick={() => {
              const newName = prompt('Nouveau nom:', gameName);
              if (newName) setGameName(newName);
            }}
          >
            {gameName}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              className="btn btn-secondary"
              disabled={players.length === 0}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Liste des joueurs */}
        {players.length > 0 && (
          <div className="space-y-6 mb-8">
            {players.map(player => (
              <div key={player.id} className="card">
                <h3 className="text-lg font-medium mb-4">{player.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {COMBINATIONS.map(combo => (
                    <div key={combo} className="bg-[var(--surface)] p-3 rounded-lg">
                      <div className="text-xs text-[var(--text-muted)] truncate">{combo}</div>
                      <input
                        type="number"
                        value={scores[player.id]?.[combo] || ''}
                        onChange={(e) => updateScore(player.id, combo, parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent border-none text-center text-[var(--text)]"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right font-medium">
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
                className="flex-1 px-4 py-2 bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-muted)]"
              />
              <button type="submit" className="btn btn-primary">
                + Ajouter
              </button>
            </div>
          </form>
        </div>

        {/* Légende */}
        <div className="mt-8 card">
          <h3 className="font-medium mb-4">Légende des points</h3>
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

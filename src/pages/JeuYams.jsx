import { useState, useEffect } from 'react';
import Orbite from '../components/Orbite';
import SlideInScore from '../components/SlideInScore';

// Règles du Yam's organisées par catégories
const YAMS_CATEGORIES = {
  'As et figures': ['1', '2', '3', '4', '5', '6'],
  'Suites': ['Petite Suite', 'Grande Suite'],
  'Combinations': ['Brelan', 'Carré', 'Full'],
  'Spécial': ['Yams', 'Chance']
};

// Points par combinaison
const YAMS_SCORES = {
  '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
  'Brelan': 30, 'Carré': 40, 'Full': 50,
  'Petite Suite': 30, 'Grande Suite': 40, 'Yams': 50
};

// Liste complète des combinaisons dans l'ordre
const ALL_COMBINATIONS = [
  '1', '2', '3', '4', '5', '6',
  'Brelan', 'Carré', 'Full',
  'Petite Suite', 'Grande Suite',
  'Yams', 'Chance'
];

export default function JeuYams() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [gameName, setGameName] = useState('Partie de Yam\'s');
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  // Initialiser les scores pour chaque joueur
  useEffect(() => {
    if (players.length > 0) {
      const initialScores = {};
      players.forEach(player => {
        initialScores[player.id] = ALL_COMBINATIONS.reduce((acc, combo) => {
          acc[combo] = null; // null = non rempli, 0 = zéro
          return acc;
        }, {});
      });
      setScores(initialScores);
    }
  }, [players]);

  const addPlayer = (name) => {
    if (!name.trim()) return;
    const newPlayer = { id: Date.now(), name };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    const newPlayers = players.filter(p => p.id !== id);
    setPlayers(newPlayers);
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

  const handleScoreChipClick = (playerId, combination) => {
    setSelectedPlayerId(playerId);
    setSelectedCombination(combination);
    setShowSlideIn(true);
  };

  const calculateTotal = (playerId) => {
    const playerScores = scores[playerId] || {};
    let total = 0;
    for (const combo of ALL_COMBINATIONS) {
      const value = playerScores[combo];
      if (value !== null && value !== undefined) {
        total += value;
      }
    }
    return total;
  };

  const resetGame = () => {
    setPlayers([]);
    setScores({});
    setSelectedPlayerId(null);
    setGameName('Partie de Yam\'s');
  };

  const resetPlayerScores = (playerId) => {
    setScores(prev => ({
      ...prev,
      [playerId]: ALL_COMBINATIONS.reduce((acc, combo) => {
        acc[combo] = null;
        return acc;
      }, {})
    }));
  };

  const getScoreValue = (playerId, combination) => {
    return scores[playerId]?.[combination];
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-2 sm:p-4">
      <div className="max-w-2xl mx-auto">
        {/* Décoration : orbite en haut à droite */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
          <Orbite size={200} planetColor="var(--accent-2)" />
        </div>

        {/* En-tête */}
        <div className="flex justify-between items-center mb-4">
          <h1
            className="text-lg sm:text-xl font-medium cursor-pointer"
            onClick={() => {
              const newName = prompt('Nouveau nom de partie:', gameName);
              if (newName) setGameName(newName);
            }}
          >
            {gameName}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              className="btn btn-secondary text-xs sm:text-sm"
              disabled={players.length === 0}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Grille des joueurs - 2 colonnes sur mobile, 3+ sur desktop */}
        {players.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
            {players.map(player => (
              <div key={player.id} className="card compact-card">
                {/* Header du joueur */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-medium truncate flex-1">{player.name}</h2>
                  <button
                    onClick={() => resetPlayerScores(player.id)}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-3)] ml-2"
                    title="Réinitialiser scores"
                  >
                    ↻
                  </button>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-3)]"
                    title="Supprimer joueur"
                  >
                    ×
                  </button>
                </div>

                {/* Scores par catégorie - très compact */}
                <div className="space-y-2">
                  {Object.entries(YAMS_CATEGORIES).map(([category, combinations]) => (
                    <div key={category} className="bg-[var(--line)] p-2 rounded-lg">
                      <h3 className="text-[0.65rem] sm:text-xs font-medium text-[var(--accent)] mb-1 truncate">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 gap-1">
                        {combinations.map(combo => {
                          const currentValue = getScoreValue(player.id, combo);
                          const isSelected = currentValue !== null;
                          const isBarré = currentValue === 0;
                          
                          return (
                            <button
                              key={combo}
                              onClick={() => handleScoreChipClick(player.id, combo)}
                              className={`w-full py-1 px-2 rounded-full text-[0.7rem] sm:text-xs transition-all border ${
                                isSelected && !isBarré
                                  ? 'bg-[var(--accent-2)] text-[var(--on-accent)] border-transparent'
                                  : isBarré
                                  ? 'bg-transparent border-[var(--accent-3)] text-[var(--accent-3)]'
                                  : 'bg-transparent border-[var(--line)] text-[var(--text)] hover:bg-[var(--line)]'
                              }`}
                              title={combo}
                            >
                              <div className="flex justify-between items-center">
                                <span className="truncate">{combo}</span>
                                {isSelected && !isBarré && (
                                  <span className="font-medium text-[0.65rem]">+{currentValue}</span>
                                )}
                                {isBarré && (
                                  <span className="text-[0.6rem] opacity-50">×</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-2 pt-2 border-t border-[var(--line)] text-right">
                  <span className="text-xs font-medium">Total: </span>
                  <span className="text-[var(--accent-2)] font-bold">
                    {calculateTotal(player.id)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ajouter un joueur */}
        <div className="mt-4">
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              addPlayer(e.target.playerName.value); 
              e.target.reset(); 
            }} 
            className="flex gap-2"
          >
            <input
              name="playerName"
              type="text"
              placeholder="Nom du joueur..."
              className="flex-1 px-3 py-2 text-sm bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-muted)] rounded-full"
            />
            <button type="submit" className="btn btn-primary px-4 py-2 text-sm">
              + Ajouter
            </button>
          </form>
        </div>

        {/* Légende (optionnelle, peut être supprimée pour gagner de la place) */}
        {players.length === 0 && (
          <div className="mt-6 card text-center text-sm text-[var(--text-muted)]">
            <p>Ajoute des joueurs pour commencer à compter les points</p>
          </div>
        )}

        {/* Slide-in pour la sélection des scores */}
        <SlideInScore
          isOpen={showSlideIn}
          onClose={() => {
            setShowSlideIn(false);
            setSelectedPlayerId(null);
            setSelectedCombination(null);
          }}
          combination={selectedCombination}
          onSelectScore={(value) => {
            if (selectedPlayerId && selectedCombination) {
              updateScore(selectedPlayerId, selectedCombination, value);
            }
            setShowSlideIn(false);
            setSelectedPlayerId(null);
            setSelectedCombination(null);
          }}
          currentValue={selectedCombination && selectedPlayerId 
            ? getScoreValue(selectedPlayerId, selectedCombination) 
            : null}
        />
      </div>
    </div>
  );
}

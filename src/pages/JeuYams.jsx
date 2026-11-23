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
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);

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
      setSelectedPlayer(players[0].id);
    }
  }, [players]);

  const addPlayer = (name) => {
    if (!name.trim()) return;
    const newPlayer = { id: Date.now(), name };
    setPlayers([...players, newPlayer]);
    setSelectedPlayer(newPlayer.id);
  };

  const removePlayer = (id) => {
    const newPlayers = players.filter(p => p.id !== id);
    setPlayers(newPlayers);
    if (newPlayers.length > 0) {
      setSelectedPlayer(newPlayers[0].id);
    } else {
      setSelectedPlayer(null);
    }
  };

  const updateScore = (combination, value) => {
    if (!selectedPlayer) return;
    setScores(prev => ({
      ...prev,
      [selectedPlayer]: {
        ...prev[selectedPlayer],
        [combination]: value
      }
    }));
  };

  const handleScoreChipClick = (combination) => {
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
    setSelectedPlayer(null);
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

  const getScoreValue = (combination) => {
    if (!selectedPlayer) return null;
    return scores[selectedPlayer]?.[combination];
  };

  // Sélectionner un joueur
  const selectPlayer = (playerId) => {
    setSelectedPlayer(playerId);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <div className="max-w-lg mx-auto">
        {/* Décoration : orbite en haut à droite */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
          <Orbite size={200} planetColor="var(--accent-2)" />
        </div>

        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-xl font-medium cursor-pointer"
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
              className="btn btn-secondary"
              disabled={players.length === 0}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Sélecteur de joueurs */}
        {players.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {players.map(player => (
                <button
                  key={player.id}
                  onClick={() => selectPlayer(player.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPlayer === player.id
                      ? 'bg-[var(--accent-2)] text-[var(--on-accent)]'
                      : 'bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--line)]'
                  }`}
                >
                  {player.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fiche du joueur sélectionné */}
        {selectedPlayer && players.length > 0 && (
          <div className="card mb-6 max-w-[45vw] md:max-w-[400px]">
            {/* Nom du joueur */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {players.find(p => p.id === selectedPlayer)?.name}
              </h2>
              <button
                onClick={() => resetPlayerScores(selectedPlayer)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Réinitialiser scores
              </button>
            </div>

            {/* Zones de scores par catégorie */}
            <div className="space-y-4">
              {Object.entries(YAMS_CATEGORIES).map(([category, combinations]) => (
                <div key={category} className="bg-[var(--line)] p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-[var(--accent)] mb-3">{category}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {combinations.map(combo => {
                      const currentValue = getScoreValue(combo);
                      const isSelected = currentValue !== null;
                      
                      return (
                        <button
                          key={combo}
                          onClick={() => handleScoreChipClick(combo)}
                          className={`w-full py-2 px-3 rounded-lg text-sm transition-all border border-[var(--line)] ${
                            isSelected && currentValue !== 0
                              ? 'bg-[var(--accent-2)] text-[var(--on-accent)] border-transparent'
                              : isSelected && currentValue === 0
                              ? 'bg-transparent text-[var(--text-muted)] italic'
                              : 'bg-transparent text-[var(--text)] hover:bg-[var(--surface)]'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{combo}</span>
                            {isSelected && currentValue !== 0 && (
                              <span className="font-medium">+{currentValue}</span>
                            )}
                            {isSelected && currentValue === 0 && (
                              <span className="text-xs">×</span>
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
            <div className="mt-4 pt-4 border-t border-[var(--line)] text-right">
              <span className="font-medium">Total: </span>
              <span className="text-[var(--accent-2)] font-bold text-xl">
                {calculateTotal(selectedPlayer)}
              </span>
            </div>
          </div>
        )}

        {/* Ajouter un joueur */}
        <div className="mt-6">
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
              className="flex-1 px-4 py-2 bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-muted)]"
            />
            <button type="submit" className="btn btn-primary">
              + Ajouter
            </button>
          </form>
        </div>

        {/* Slide-in pour la sélection des scores */}
        <SlideInScore
          isOpen={showSlideIn}
          onClose={() => setShowSlideIn(false)}
          combination={selectedCombination}
          onSelectScore={(value) => {
            updateScore(selectedCombination, value);
            setShowSlideIn(false);
          }}
          currentValue={selectedCombination ? getScoreValue(selectedCombination) : null}
        />

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

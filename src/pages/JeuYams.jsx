import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Noms des combinaisons
const COMBINATIONS = {
  u1: { name: '1', type: 'dice' },
  u2: { name: '2', type: 'dice' },
  u3: { name: '3', type: 'dice' },
  u4: { name: '4', type: 'dice' },
  u5: { name: '5', type: 'dice' },
  u6: { name: '6', type: 'dice' },
  br: { name: 'Brelan', type: 'sum' },
  ca: { name: 'Carré', type: 'sum' },
  fu: { name: 'Full', type: 'fixed', value: 25 },
  ps: { name: 'P. suite', type: 'fixed', value: 30 },
  gs: { name: 'G. suite', type: 'fixed', value: 40 },
  ya: { name: 'Yams', type: 'fixed', value: 50 },
  ch: { name: 'Chance', type: 'sum' },
  H: { name: 'Haut', type: 'section' },
  B: { name: 'Bonus', type: 'section' },
  L: { name: 'Total', type: 'section' }
};

// Ordre d'affichage
const DISPLAY_ORDER = [
  ['u1', 'u2', 'u3', 'u4'],
  ['u5', 'u6', 'H', 'B'],
  ['br', 'ca', 'fu', 'ps'],
  ['gs', 'ya', 'ch', 'L']
];

// Combinaisons pour le calcul du total bas
const LOW_COMBOS = ['br', 'ca', 'fu', 'ps', 'gs', 'ya', 'ch'];

export default function JeuYams() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('yams-players');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, name: 'Joueur 1', scores: {} },
      { id: 2, name: 'Joueur 2', scores: {} },
    ];
  });
  
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedDice, setSelectedDice] = useState([]);
  const [showSlideIn, setShowSlideIn] = useState(false);
  
  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('yams-players', JSON.stringify(players));
  }, [players]);
  
  // Calcul des totaux pour un joueur
  const calculateTotals = (scores) => {
    let upper = 0;
    for (let i = 1; i <= 6; i++) {
      upper += parseInt(scores[`u${i}`]) || 0;
    }
    
    let lower = 0;
    LOW_COMBOS.forEach(key => {
      lower += parseInt(scores[key]) || 0;
    });
    
    const bonus = upper >= 63 ? 35 : 0;
    const total = upper + bonus + lower;
    
    return { upper, bonus, lower, total };
  };
  
  // Gestion du slide-in pour sélection des points
  const handleTileClick = (playerIndex, comboKey) => {
    const player = players[playerIndex];
    const combo = COMBINATIONS[comboKey];
    
    // Si déjà rempli, ne rien faire
    if (player.scores[comboKey] !== undefined) {
      return;
    }
    
    setActivePlayerIndex(playerIndex);
    setSelectedTile(comboKey);
    setSelectedDice([]);
    setShowSlideIn(true);
  };
  
  // Fermer le slide-in
  const closeSlideIn = () => {
    setShowSlideIn(false);
    setSelectedTile(null);
    setSelectedDice([]);
  };
  
  // Sélectionner un dé
  const handleDieSelect = (value) => {
    if (selectedDice.length < 5 && !selectedDice.includes(value)) {
      setSelectedDice([...selectedDice, value]);
    }
  };
  
  // Retirer un dé
  const handleDieRemove = (index) => {
    const newDice = [...selectedDice];
    newDice.splice(index, 1);
    setSelectedDice(newDice);
  };
  
  // Valider le score
  const handleScoreSubmit = (score) => {
    const newPlayers = [...players];
    newPlayers[activePlayerIndex].scores[selectedTile] = score;
    setPlayers(newPlayers);
    closeSlideIn();
  };
  
  // Barrer un score (0 points)
  const handleBarre = () => {
    handleScoreSubmit(0);
  };
  
  // Ajouter un joueur
  const addPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      name: `Joueur ${players.length + 1}`,
      scores: {}
    };
    setPlayers([...players, newPlayer]);
  };
  
  // Supprimer un joueur
  const removePlayer = (playerId) => {
    if (players.length <= 2) return;
    setPlayers(players.filter(p => p.id !== playerId));
  };
  
  // Réinitialiser la partie
  const resetGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, scores: {} })));
  };
  
  // Rendu d'une tuile de score
  const renderTile = (playerIndex, comboKey) => {
    const player = players[playerIndex];
    const combo = COMBINATIONS[comboKey];
    const score = player.scores[comboKey];
    const totals = calculateTotals(player.scores);
    
    // Tuiles spéciales (sections)
    if (combo.type === 'section') {
      if (comboKey === 'H') {
        return (
          <div className="tile section bg-[var(--bg)] rounded-xl flex flex-col items-center justify-center p-2">
            <span className="text-[10px] text-[var(--accent)]">Haut</span>
            <span className="text-lg font-medium">{totals.upper}/63</span>
          </div>
        );
      }
      if (comboKey === 'B') {
        return (
          <div className={`tile section bg-[var(--bg)] rounded-xl flex flex-col items-center justify-center p-2 ${
            totals.bonus > 0 ? 'border border-[var(--accent-2)]' : ''
          }`}>
            <span className="text-[10px] text-[var(--accent)]">Bonus</span>
            <span className="text-lg font-medium">{totals.bonus > 0 ? '+35' : '0'}</span>
          </div>
        );
      }
      if (comboKey === 'L') {
        return (
          <div className="tile section bg-[var(--bg)] rounded-xl flex flex-col items-center justify-center p-2 border border-[var(--accent-2)]">
            <span className="text-[10px] text-[var(--accent)]">Total</span>
            <span className="text-lg font-medium">{totals.total}</span>
          </div>
        );
      }
    }
    
    // Tuiles normales
    const isFilled = score !== undefined;
    const isZero = score === 0;
    
    return (
      <button
        onClick={() => handleTileClick(playerIndex, comboKey)}
        disabled={isFilled}
        className={`tile rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-200 ${
          isFilled 
            ? (isZero ? 'bg-[var(--surface)] text-[var(--accent-3)]' : 'bg-[var(--accent)] text-[var(--on-accent)]')
            : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--line)]'
        }`}
        aria-label={`${combo.name}: ${isFilled ? score + ' points' : 'vide'}`}
      >
        <span className="text-[10px] text-[var(--accent)]">{combo.name}</span>
        <span className="text-xl font-medium">
          {isFilled ? score : '–'}
        </span>
      </button>
    );
  };
  
  // Rendu du slide-in
  const renderSlideIn = () => {
    if (!selectedTile || !showSlideIn) return null;
    
    const combo = COMBINATIONS[selectedTile];
    const player = players[activePlayerIndex];
    const diceValue = parseInt(selectedTile[1]);
    
    // Calcul du total des dés sélectionnés
    const diceSum = selectedDice.reduce((a, b) => a + b, 0);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end justify-center p-4 z-50">
        <div className="bg-[var(--surface)] rounded-t-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">
              {player.name} · {combo.name}
            </h2>
            <button 
              onClick={closeSlideIn}
              className="w-8 h-8 rounded-full bg-[var(--line)] text-[var(--text)] flex items-center justify-center text-xl"
            >
              ×
            </button>
          </div>
          
          {/* Contenu selon le type */}
          {combo.type === 'dice' && (
            <div>
              <p className="text-sm text-[var(--accent)] mb-4">
                Sélectionnez le nombre de dés
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => handleScoreSubmit(n * diceValue)}
                    className="chip bg-[var(--bg)] rounded-full px-4 py-2 text-sm font-medium hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
                  >
                    {n} {n <= 1 ? 'dé' : 'dés'}
                    <br />
                    <small className="text-[10px] opacity-70">{n * diceValue} pts</small>
                  </button>
                ))}
              </div>
              <button
                onClick={handleBarre}
                className="w-full bg-transparent border border-[var(--accent-3)] text-[var(--accent-3)] rounded-full py-3 font-medium"
              >
                Barrer (0 pt)
              </button>
            </div>
          )}
          
          {combo.type === 'fixed' && (
            <div>
              <p className="text-sm text-[var(--accent)] mb-4">
                Score fixe
              </p>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleScoreSubmit(combo.value)}
                  className="flex-1 chip bg-[var(--accent-2)] text-[var(--on-accent)] rounded-full px-4 py-3 font-medium"
                >
                  Réussi
                  <br />
                  <small className="text-[10px]">{combo.value} pts</small>
                </button>
                <button
                  onClick={handleBarre}
                  className="flex-1 chip bg-transparent border border-[var(--accent-3)] text-[var(--accent-3)] rounded-full px-4 py-3 font-medium"
                >
                  Barrer
                  <br />
                  <small className="text-[10px]">0 pt</small>
                </button>
              </div>
            </div>
          )}
          
          {combo.type === 'sum' && (
            <div>
              <p className="text-sm text-[var(--accent)] mb-2">
                Sélectionnez les dés
              </p>
              <div className="text-3xl font-medium mb-2">
                {diceSum > 0 ? diceSum : '–'}
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                {selectedDice.length}/5 dés
              </p>
              
              {/* Dés sélectionnés */}
              {selectedDice.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {selectedDice.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => handleDieRemove(i)}
                      className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--on-accent)] font-medium flex items-center justify-center"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Sélecteur de dés */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6].map(d => (
                  <button
                    key={d}
                    onClick={() => handleDieSelect(d)}
                    disabled={selectedDice.includes(d) || selectedDice.length >= 5}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      selectedDice.includes(d) 
                        ? 'bg-[var(--accent-2)] text-[var(--on-accent)]' 
                        : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--line)]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleScoreSubmit(diceSum)}
                  disabled={selectedDice.length === 0}
                  className="flex-1 bg-[var(--accent-2)] text-[var(--on-accent)] rounded-full py-3 font-medium disabled:opacity-50"
                >
                  Valider
                </button>
                <button
                  onClick={handleBarre}
                  className="flex-1 bg-transparent border border-[var(--accent-3)] text-[var(--accent-3)] rounded-full py-3 font-medium"
                >
                  Barrer
                </button>
              </div>
              
              <button
                onClick={() => setSelectedDice([])}
                className="w-full mt-2 text-sm text-[var(--text-muted)]"
              >
                Effacer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Rendu d'un joueur
  const renderPlayer = (player, index) => {
    const totals = calculateTotals(player.scores);
    const isLeader = players.every((p, i) => 
      i === index || calculateTotals(p.scores).total <= totals.total
    );
    
    return (
      <div key={player.id} className="player-card bg-[var(--surface)] rounded-2xl p-4 mb-4 border border-[var(--line)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text"
            value={player.name}
            onChange={(e) => {
              const newPlayers = [...players];
              newPlayers[index].name = e.target.value || `Joueur ${index + 1}`;
              setPlayers(newPlayers);
            }}
            className="flex-1 bg-[var(--bg)] rounded-full px-4 py-2 text-sm font-medium border-none outline-none"
            maxLength={12}
          />
          {isLeader && (
            <span className="bg-[var(--accent-2)] text-[var(--on-accent)] text-xs px-2 py-1 rounded-full">
              En tête
            </span>
          )}
          <span className="text-2xl font-medium min-w-[50px] text-right">{totals.total}</span>
          {players.length > 2 && (
            <button
              onClick={() => removePlayer(player.id)}
              className="w-8 h-8 rounded-full bg-[var(--line)] text-[var(--text)] flex items-center justify-center text-lg"
            >
              ×
            </button>
          )}
        </div>
        
        {/* Grille de scores */}
        <div className="grid grid-cols-4 gap-1">
          {DISPLAY_ORDER.map((row, rowIndex) => (
            row.map(comboKey => (
              renderTile(index, comboKey)
            ))
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24">
      {/* Header */}
      <header className="flex justify-between items-center p-4 pt-16">
        <h1 className="text-2xl font-medium">Yam's</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="bg-[var(--surface)] rounded-full px-4 py-2 text-sm font-medium border border-[var(--line)]"
          >
            Accueil
          </button>
          <button
            onClick={resetGame}
            className="bg-[var(--surface)] rounded-full px-4 py-2 text-sm font-medium border border-[var(--line)]"
          >
            Nouvelle partie
          </button>
        </div>
      </header>
      
      {/* Liste des joueurs */}
      <section className="px-4">
        <div className="max-w-2xl mx-auto">
          {players.map((player, index) => renderPlayer(player, index))}
          
          {/* Bouton ajouter joueur */}
          <button
            onClick={addPlayer}
            className="w-full bg-transparent border-2 border-dashed border-[var(--line)] rounded-2xl py-6 text-[var(--accent)] font-medium hover:border-[var(--accent)] transition-colors"
          >
            + Ajouter un joueur
          </button>
        </div>
      </section>
      
      {/* Slide-in */}
      {renderSlideIn()}
      
      {/* Overlay */}
      {showSlideIn && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={closeSlideIn}
        />
      )}
    </main>
  );
}

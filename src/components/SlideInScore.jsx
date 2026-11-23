import React, { useState, useEffect } from 'react';

// Valeurs possibles pour les dés (1-6)
const DES_VALUES = {
  '1': [1, 2, 3, 4, 5],
  '2': [2, 4, 6, 8, 10, 12],
  '3': [3, 6, 9, 12, 15, 18],
  '4': [4, 8, 12, 16, 20, 24],
  '5': [5, 10, 15, 20, 25, 30],
  '6': [6, 12, 18, 24, 30, 36]
};

// Valeurs fixes pour les autres combinaisons
const FIXED_SCORES = {
  'Brelan': 30,
  'Carré': 40,
  'Full': 50,
  'Petite Suite': 30,
  'Grande Suite': 40,
  'Yams': 50
};

export default function SlideInScore({
  isOpen,
  onClose,
  combination,
  onSelectScore,
  currentValue
}) {
  const [selectedValue, setSelectedValue] = useState(currentValue || null);

  // Fermer en cliquant à l'extérieur
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Déterminer les options à afficher
  const getOptions = () => {
    if (DES_VALUES[combination]) {
      // Pour les dés : afficher les multiples
      return DES_VALUES[combination].map(value => ({
        label: value,
        value: value
      }));
    } else if (FIXED_SCORES[combination]) {
      // Pour les combinaisons fixes : 0 ou la valeur
      return [
        { label: 'Barrer (0)', value: 0 },
        { label: FIXED_SCORES[combination], value: FIXED_SCORES[combination] }
      ];
    } else {
      // Pour Chance : valeur libre
      return [
        { label: 'Barrer (0)', value: 0 },
        { label: 'Renseigner', value: null } // À gérer différemment
      ];
    }
  };

  const options = getOptions();

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelectScore(value);
    onClose();
  };

  // Pour Chance, on gère différemment
  const isChance = combination === 'Chance';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-[var(--surface)] rounded-2xl p-6 max-w-md w-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{combination}</h3>
          <button 
            onClick={onClose} 
            className="text-[var(--text-muted)] hover:text-[var(--text)] text-2xl"
          >
            ✕
          </button>
        </div>

        {isChance ? (
          <div className="space-y-3">
            <p className="text-sm text-[var(--text-muted)] mb-2">
              Saisir le total des dés
            </p>
            <input
              type="number"
              value={selectedValue || ''}
              onChange={(e) => setSelectedValue(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-transparent border border-[var(--line)] rounded-lg text-[var(--text)]"
              placeholder="Total des dés"
              min="0"
            />
            <button
              onClick={() => handleSelect(selectedValue || 0)}
              className="btn btn-primary w-full mt-4"
            >
              Valider
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  selectedValue === option.value
                    ? 'bg-[var(--accent-2)] text-[var(--on-accent)]'
                    : 'bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--line)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'scoreCounterGame';

export function useGameState() {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).players || [] : [];
  });

  const [gameName, setGameName] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).gameName || 'Nouvelle Partie' : 'Nouvelle Partie';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ players, gameName }));
  }, [players, gameName]);

  const addPlayer = (name) => {
    if (!name.trim()) return;
    setPlayers([...players, { id: Date.now(), name, score: 0 }]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updateScore = (id, newScore) => {
    setPlayers(players.map(p => p.id === id ? { ...p, score: newScore } : p));
  };

  const incrementScore = (id, value = 1) => {
    setPlayers(players.map(p => p.id === id ? { ...p, score: p.score + value } : p));
  };

  const resetGame = () => {
    setPlayers([]);
    setGameName('Nouvelle Partie');
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRanking = () => [...players].sort((a, b) => b.score - a.score);
  const getTotalScore = () => players.reduce((sum, p) => sum + p.score, 0);

  return {
    players, gameName, setGameName, addPlayer, removePlayer,
    updateScore, incrementScore, resetGame, getRanking, getTotalScore
  };
}

import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import PlayerList from './components/PlayerList';
import AddPlayerForm from './components/AddPlayerForm';
import GameHeader from './components/GameHeader';
import QRCodeDisplay from './components/QRCodeDisplay';

function App() {
  const {
    players, gameName, setGameName, addPlayer, removePlayer,
    updateScore, incrementScore, resetGame, getRanking, getTotalScore
  } = useGameState();
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <GameHeader
          gameName={gameName}
          setGameName={setGameName}
          onReset={resetGame}
          onToggleQRCode={() => setShowQRCode(!showQRCode)}
          playersCount={players.length}
        />
        
        {showQRCode && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <QRCodeDisplay />
          </div>
        )}
        
        <PlayerList
          players={players}
          ranking={getRanking()}
          onRemovePlayer={removePlayer}
          onUpdateScore={updateScore}
          onIncrementScore={incrementScore}
        />
        
        <AddPlayerForm onAddPlayer={addPlayer} />
        
        {players.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow text-center">
            <p>Total : <span className="font-bold">{getTotalScore()}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

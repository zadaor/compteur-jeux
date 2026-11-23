import { useState } from 'react';

export default function GameHeader({ gameName, setGameName, onReset, onToggleQRCode, playersCount }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(gameName);

  const handleSave = () => {
    if (editValue.trim()) setGameName(editValue.trim());
    setIsEditing(false);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-2 text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
        ) : (
          <h1
            className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
            onClick={() => {
              setEditValue(gameName);
              setIsEditing(true);
            }}
          >
            {gameName}
          </h1>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={onToggleQRCode} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          📱 QRCode
        </button>
        {playersCount > 0 && (
          <button onClick={onReset} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}

export default function PlayerList({ players, ranking, onRemovePlayer, onUpdateScore, onIncrementScore }) {
  if (players.length === 0) return null;

  return (
    <div className="space-y-4">
      {ranking.map((player, index) => (
        <div
          key={player.id}
          className={`p-4 rounded-lg shadow ${
            index === 0 ? 'bg-green-200 border-2 border-green-500' :
            index === 1 ? 'bg-gray-100' :
            index === 2 ? 'bg-orange-100' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-700">#{index + 1}</span>
              {index === 0 && <span className="text-2xl">👑</span>}
              <span className="text-lg font-medium">{player.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onIncrementScore(player.id, -1)}
                className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              >
                −
              </button>
              <input
                type="number"
                value={player.score}
                onChange={(e) => onUpdateScore(player.id, parseInt(e.target.value) || 0)}
                className="w-16 text-center px-2 py-1 border rounded-lg"
              />
              <button
                onClick={() => onIncrementScore(player.id, 1)}
                className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200"
              >
                +
              </button>
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import * as React from "react"
import type { Player } from "../types/game"

interface PlayerSetupProps {
  players: Player[]
  onAddPlayer: (name: string) => void
  onRemovePlayer: (id: string) => void
  onStartGame: () => void
  maxPlayers: number
}

export default function PlayerSetup({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame
}: PlayerSetupProps) {
  const [newPlayerName, setNewPlayerName] = React.useState("")

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < 8) {
      onAddPlayer(newPlayerName.trim())
      setNewPlayerName("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer()
    }
  }

  const avatars = ['🐱', '🐶', '🐰', '🐸', '🐨', '🐯', '🦁', '🐻', '🐼', '🦊', '🐺', '🦄']

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-center">Oyuncular</h2>
      
      {/* Add Player */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Oyuncu adı girin..."
            className="setting-input flex-1"
            maxLength={20}
          />
          <button
            className="btn btn-next"
            onClick={handleAddPlayer}
            disabled={!newPlayerName.trim() || players.length >= 8}
          >
            ➕ Ekle
          </button>
        </div>
        {players.length >= 8 && (
          <p className="text-red-500 text-sm mt-2">Maksimum 8 oyuncu eklenebilir</p>
        )}
      </div>

      {/* Players List */}
      <div className="scoreboard">
        {players.map((player, index) => (
          <div key={player.id} className="player-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{avatars[index % avatars.length]}</span>
                <div>
                  <div className="player-name">{player.name}</div>
                  <div className="player-score">{player.score} puan</div>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => onRemovePlayer(player.id)}
                style={{ padding: '8px 12px', fontSize: '0.9rem' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Start Game Button */}
      {players.length >= 2 && (
        <div className="text-center mt-6">
          <button
            className="btn btn-start"
            onClick={onStartGame}
          >
            🎮 Oyunu Başlat
          </button>
        </div>
      )}

      {players.length < 2 && (
        <div className="text-center text-gray-500 mt-6">
          En az 2 oyuncu gereklidir
        </div>
      )}
    </div>
  )
}
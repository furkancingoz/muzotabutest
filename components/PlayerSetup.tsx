import { useState } from 'react'
import type { Player } from '../types/game'

interface PlayerSetupProps {
  players: Player[]
  onAddPlayer: (name: string) => boolean
  onRemovePlayer: (id: string) => void
  onStartGame: () => boolean
  maxPlayers: number
}

export default function PlayerSetup({ players, onAddPlayer, onRemovePlayer, onStartGame, maxPlayers }: PlayerSetupProps) {
  const [newPlayerName, setNewPlayerName] = useState('')

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPlayerName.trim() && onAddPlayer(newPlayerName.trim())) {
      setNewPlayerName('')
    }
  }

  return (
    <div className="player-setup">
      <h2 className="setup-title">👥 Oyuncu Ayarları</h2>
      
      <div className="players-list">
        {players.map((player, index) => (
          <div key={player.id} className="player-item">
            <span className="player-avatar">{player.avatar}</span>
            <span className="player-name">{player.name}</span>
            <button 
              className="remove-btn"
              onClick={() => onRemovePlayer(player.id)}
              disabled={players.length <= 2}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {players.length < maxPlayers && (
        <form onSubmit={handleAddPlayer} className="add-player-form">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Oyuncu adı girin..."
            className="player-input"
            maxLength={20}
          />
          <button type="submit" className="add-btn">
            ➕ Ekle
          </button>
        </form>
      )}

      <div className="game-controls">
        <button 
          onClick={onStartGame}
          className="start-btn"
          disabled={players.length < 2}
        >
          🚀 Oyunu Başlat ({players.length} oyuncu)
        </button>
      </div>
    </div>
  )
}

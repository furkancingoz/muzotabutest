import * as React from "react"
import type { Player, GameHistory } from "../types/game"

interface GameResultsProps {
  players: Player[]
  gameHistory: GameHistory[]
  onPlayAgain: () => void
  onNewGame: () => void
}

export default function GameResults({ players, gameHistory, onPlayAgain, onNewGame }: GameResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = sortedPlayers[0]

  const getPlayerStats = (playerName: string) => {
    const playerHistory = gameHistory.filter(h => h.playerName === playerName)
    const totalWords = playerHistory.length
    const correctWords = playerHistory.filter(h => h.correct).length
    const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
    
    return { totalWords, correctWords, accuracy }
  }

  const avatars = ['🐱', '🐶', '🐰', '🐸', '🐨', '🐯', '🦁', '🐻', '🐼', '🦊', '🐺', '🦄']

  return (
    <div className="results-container fade-in">
      <h1 className="winner">
        🎉 {winner.name} Kazandı! 🎉
      </h1>
      
      <div className="final-scores">
        {sortedPlayers.map((player, index) => {
          const stats = getPlayerStats(player.name)
          const isWinner = index === 0
          
          return (
            <div 
              key={player.id} 
              className={`final-score-card ${isWinner ? 'winner' : ''}`}
            >
              <div className="player-avatar">
                {isWinner ? '👑' : avatars[index % avatars.length]}
              </div>
              <div className="player-final-name">
                {isWinner ? '🏆 ' : `#${index + 1} `}{player.name}
              </div>
              <div className="player-final-score">
                {player.score} puan
              </div>
              <div className="player-stats">
                <div>✅ {stats.correctWords} doğru</div>
                <div>📊 {stats.accuracy}% başarı</div>
                <div>🎯 {stats.totalWords} toplam</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <button className="btn btn-start" onClick={onPlayAgain}>
          🔄 Tekrar Oyna
        </button>
        <button className="btn btn-secondary" onClick={onNewGame}>
          🆕 Yeni Oyun
        </button>
      </div>

      <div className="instruction">
        Tebrikler! Oyunu tamamladınız. Tekrar oynamak için yukarıdaki butonları kullanabilirsiniz.
      </div>
    </div>
  )
}
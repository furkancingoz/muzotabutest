import type { Player, GameHistory } from '../types/game'

interface GameResultsProps {
  players: Player[]
  gameHistory: GameHistory[]
  onPlayAgain: () => void
  onNewGame: () => void
}

export default function GameResults({ players, gameHistory, onPlayAgain, onNewGame }: GameResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = sortedPlayers[0]
  
  const getPlayerStats = (player: Player) => {
    const playerHistory = gameHistory.filter(h => h.playerName === player.name)
    return {
      correct: playerHistory.filter(h => h.correct).length,
      total: playerHistory.length,
      accuracy: playerHistory.length > 0 
        ? Math.round((playerHistory.filter(h => h.correct).length / playerHistory.length) * 100)
        : 0
    }
  }

  const getTotalStats = () => {
    return {
      totalWords: gameHistory.length,
      correctWords: gameHistory.filter(h => h.correct).length,
      totalPoints: gameHistory.reduce((sum, h) => sum + h.points, 0),
      averageAccuracy: gameHistory.length > 0 
        ? Math.round((gameHistory.filter(h => h.correct).length / gameHistory.length) * 100)
        : 0
    }
  }

  const totalStats = getTotalStats()

  return (
    <div className="game-results">
      <div className="results-header">
        <h1 className="results-title">🎉 Oyun Bitti!</h1>
        <div className="winner-announcement">
          <div className="winner-avatar">{winner?.avatar}</div>
          <h2 className="winner-name">{winner?.name} Kazandı!</h2>
          <div className="winner-score">{winner?.score} puan</div>
        </div>
      </div>

      <div className="final-scores">
        <h3 className="scores-title">🏆 Final Skorları</h3>
        <div className="scores-list">
          {sortedPlayers.map((player, index) => {
            const stats = getPlayerStats(player)
            return (
              <div key={player.id} className={`final-score ${index === 0 ? 'winner' : ''}`}>
                <div className="rank-badge">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div className="player-info">
                  <span className="player-avatar">{player.avatar}</span>
                  <span className="player-name">{player.name}</span>
                </div>
                <div className="score-details">
                  <div className="main-score">{player.score} puan</div>
                  <div className="stats">
                    <span className="stat">✅ {stats.correct}/{stats.total}</span>
                    <span className="stat">🎯 {stats.accuracy}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="game-summary">
        <h3 className="summary-title">📊 Oyun Özeti</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Toplam Kelime:</span>
            <span className="summary-value">{totalStats.totalWords}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Doğru Cevap:</span>
            <span className="summary-value">{totalStats.correctWords}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Toplam Puan:</span>
            <span className="summary-value">{totalStats.totalPoints}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ortalama Başarı:</span>
            <span className="summary-value">{totalStats.averageAccuracy}%</span>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="play-again-btn" onClick={onPlayAgain}>
          🔄 Tekrar Oyna
        </button>
        <button className="new-game-btn" onClick={onNewGame}>
          🆕 Yeni Oyun
        </button>
      </div>
    </div>
  )
}

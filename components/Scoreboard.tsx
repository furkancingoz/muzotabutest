import type { Player, GameHistory } from '../types/game'

interface ScoreboardProps {
  players: Player[]
  gameHistory: GameHistory[]
  currentRound: number
  totalRounds: number
}

export default function Scoreboard({ players, gameHistory, currentRound, totalRounds }: ScoreboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  
  const getPlayerStats = (playerId: string) => {
    const playerHistory = gameHistory.filter(h => h.playerName === players.find(p => p.id === playerId)?.name)
    return {
      correct: playerHistory.filter(h => h.correct).length,
      total: playerHistory.length,
      points: playerHistory.reduce((sum, h) => sum + h.points, 0)
    }
  }

  const getCategoryStats = () => {
    const categoryCount: { [key: string]: number } = {}
    gameHistory.forEach(h => {
      const word = h.word
      // Bu basit bir örnek, gerçek uygulamada kategori bilgisi history'de olmalı
      categoryCount[word] = (categoryCount[word] || 0) + 1
    })
    return categoryCount
  }

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h3 className="scoreboard-title">📊 Skor Tablosu</h3>
        <div className="round-progress">
          <span>Tur {currentRound}/{totalRounds}</span>
        </div>
      </div>

      <div className="players-scores">
        {sortedPlayers.map((player, index) => {
          const stats = getPlayerStats(player.id)
          return (
            <div key={player.id} className={`player-score ${player.isActive ? 'active' : ''}`}>
              <div className="player-info">
                <span className="rank">#{index + 1}</span>
                <span className="player-avatar">{player.avatar}</span>
                <span className="player-name">{player.name}</span>
              </div>
              
              <div className="score-info">
                <div className="main-score">{player.score} puan</div>
                <div className="stats">
                  <span className="stat">
                    ✅ {stats.correct}/{stats.total}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {gameHistory.length > 0 && (
        <div className="game-stats">
          <h4 className="stats-title">📈 Oyun İstatistikleri</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Toplam Kelime:</span>
              <span className="stat-value">{gameHistory.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Doğru Cevap:</span>
              <span className="stat-value">{gameHistory.filter(h => h.correct).length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Başarı Oranı:</span>
              <span className="stat-value">
                {gameHistory.length > 0 
                  ? Math.round((gameHistory.filter(h => h.correct).length / gameHistory.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Toplam Puan:</span>
              <span className="stat-value">
                {gameHistory.reduce((sum, h) => sum + h.points, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

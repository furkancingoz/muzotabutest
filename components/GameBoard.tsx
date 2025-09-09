import type { TabuCard, Player } from '../types/game'

interface GameBoardProps {
  currentCard: TabuCard | null
  currentPlayer: Player | null
  timeLeft: number
  round: number
  totalRounds: number
  onCorrect: () => void
  onPass: () => void
  onNextPlayer: () => void
  onPause: () => void
  allowPass: boolean
}

export default function GameBoard({ 
  currentCard, 
  currentPlayer, 
  timeLeft, 
  round, 
  totalRounds,
  onCorrect, 
  onPass, 
  onNextPlayer, 
  onPause,
  allowPass 
}: GameBoardProps) {
  const getTimeColor = () => {
    if (timeLeft > 30) return '#10b981'
    if (timeLeft > 10) return '#f59e0b'
    return '#ef4444'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="game-info">
          <div className="round-info">
            <span className="round-text">Tur {round}/{totalRounds}</span>
          </div>
          <div className="time-info" style={{ color: getTimeColor() }}>
            <span className="time-text">{timeLeft}s</span>
          </div>
        </div>
        
        <div className="current-player">
          <span className="player-avatar">{currentPlayer?.avatar}</span>
          <span className="player-name">{currentPlayer?.name}</span>
        </div>

        <button className="pause-btn" onClick={onPause}>
          ⏸️ Duraklat
        </button>
      </div>

      {currentCard && (
        <div className="word-card">
          <div className="card-header">
            <div className="card-category">
              {currentCard.category}
            </div>
            <div 
              className="card-difficulty"
              style={{ backgroundColor: getDifficultyColor(currentCard.difficulty) }}
            >
              {currentCard.difficulty === 'easy' ? 'Kolay' : 
               currentCard.difficulty === 'medium' ? 'Orta' : 'Zor'}
            </div>
            <div className="card-points">
              {currentCard.points} puan
            </div>
          </div>

          <div className="word-display">
            <h2 className="word">{currentCard.word}</h2>
          </div>

          <div className="taboo-section">
            <h3 className="taboo-title">🚫 Tabu Kelimeler:</h3>
            <div className="taboo-words">
              {currentCard.tabooWords.map((word, index) => (
                <span key={index} className="taboo-word">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="game-controls">
        <button className="correct-btn" onClick={onCorrect}>
          ✅ Doğru (+{currentCard?.points || 0})
        </button>
        
        {allowPass && (
          <button className="pass-btn" onClick={onPass}>
            ⏭️ Geç
          </button>
        )}
        
        <button className="next-btn" onClick={onNextPlayer}>
          👤 Sıradaki Oyuncu
        </button>
      </div>

      <div className="game-instruction">
        <p>💡 Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!</p>
      </div>
    </div>
  )
}

import * as React from "react"
import type { TabuCard, Player } from "../types/game"

interface GameBoardProps {
  currentCard: TabuCard | null
  currentPlayer: Player | null
  timeLeft: number
  totalTime: number
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
  totalTime,
  round,
  totalRounds,
  onCorrect,
  onPass,
  onNextPlayer,
  onPause,
  allowPass
}: GameBoardProps) {
  const [usedTabooWords, setUsedTabooWords] = React.useState<string[]>([])

  React.useEffect(() => {
    setUsedTabooWords([])
  }, [currentCard])

  const handleTabooClick = (word: string) => {
    if (!usedTabooWords.includes(word)) {
      setUsedTabooWords([...usedTabooWords, word])
    }
  }

  const resetTabooWords = () => {
    setUsedTabooWords([])
  }

  if (!currentCard || !currentPlayer) {
    return (
      <div className="card text-center">
        <h2>Oyun yükleniyor...</h2>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#00b894'
      case 'medium': return '#f39c12'
      case 'hard': return '#e74c3c'
      default: return '#6c757d'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Kolay'
      case 'medium': return 'Orta'
      case 'hard': return 'Zor'
      default: return 'Bilinmiyor'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hayvanlar': return '🐾'
      case 'Yiyecekler': return '🍕'
      case 'Spor': return '⚽'
      case 'Teknoloji': return '💻'
      case 'Meslekler': return '👨‍⚕️'
      case 'Bilim': return '🔬'
      case 'Soyut': return '💭'
      default: return '🎯'
    }
  }

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className={`timer ${timeLeft <= 10 ? 'warning' : ''} ${timeLeft <= 5 ? 'danger' : ''}`}>
        <span>⏱️</span>
        <span className="timer-display">{timeLeft}s</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${(timeLeft / totalTime) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button className="btn btn-next" onClick={onNextPlayer}>
          ⏭️ Sıradaki Oyuncu
        </button>
        <button className="btn btn-secondary" onClick={resetTabooWords}>
          🔄 Tabu Kelimeleri Sıfırla
        </button>
        <button className="btn btn-secondary" onClick={onPause}>
          ⏸️ Duraklat
        </button>
      </div>

      {/* Main Game Card */}
      <div className="card">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
            <span className="text-2xl">{getCategoryIcon(currentCard.category)}</span>
            <span className="text-xl font-bold">{currentCard.category}</span>
            <span 
              className="px-3 py-1 rounded-full text-white font-semibold"
              style={{ backgroundColor: getDifficultyColor(currentCard.difficulty) }}
            >
              {getDifficultyText(currentCard.difficulty)}
            </span>
            <span className="px-3 py-1 rounded-full bg-green-500 text-white font-semibold">
              ⭐ {currentCard.points} puan
            </span>
          </div>
          
          <div className="word-display">
            <h2 className="word">{currentCard.word}</h2>
          </div>
        </div>

        {/* Taboo Words */}
        <div className="taboo-section">
          <h3 className="taboo-title">🚫 Tabu Kelimeler</h3>
          <div className="taboo-words">
            {currentCard.tabooWords.map((word, index) => (
              <button
                key={index}
                className={`taboo-word ${usedTabooWords.includes(word) ? 'used' : ''}`}
                onClick={() => handleTabooClick(word)}
                disabled={usedTabooWords.includes(word)}
              >
                {usedTabooWords.includes(word) && '✕ '}{word}
              </button>
            ))}
          </div>
        </div>

        {/* Game Actions */}
        <div className="game-controls">
          <button
            className="btn btn-correct"
            onClick={onCorrect}
          >
            ✅ Doğru (+{currentCard.points})
          </button>
          
          {allowPass && (
            <button
              className="btn btn-pass"
              onClick={onPass}
            >
              ⏭️ Geç
            </button>
          )}
        </div>

        <div className="instruction">
          💡 Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
        </div>
      </div>
    </div>
  )
}
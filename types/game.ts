export interface Player {
  id: string
  name: string
  score: number
  isActive: boolean
  avatar: string
}

export interface TabuCard {
  id: string
  word: string
  tabooWords: string[]
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export interface GameSettings {
  timePerRound: number
  totalRounds: number
  difficulty: 'easy' | 'medium' | 'hard'
  categories: string[]
  maxPlayers: number
  allowPass: boolean
  soundEnabled: boolean
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  currentCard: TabuCard | null
  round: number
  timeLeft: number
  gamePhase: 'waiting' | 'playing' | 'paused' | 'finished'
  usedCards: string[]
  gameHistory: GameHistory[]
  settings: GameSettings
}

export interface GameHistory {
  id: string
  playerName: string
  word: string
  correct: boolean
  timestamp: number
  points: number
}

export interface GameStats {
  totalGames: number
  totalWords: number
  correctWords: number
  averageScore: number
  bestScore: number
  favoriteCategory: string
  playTime: number
}

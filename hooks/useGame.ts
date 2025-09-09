import { useState, useEffect, useCallback } from 'react'
import type { GameState, Player, TabuCard, GameSettings, GameHistory } from '../types/game'
import { tabuCards } from '../data/cards'

const defaultSettings: GameSettings = {
  timePerRound: 60,
  totalRounds: 10,
  difficulty: 'medium',
  categories: ['all'],
  maxPlayers: 8,
  allowPass: true,
  soundEnabled: true
}

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    currentCard: null,
    round: 1,
    timeLeft: 60,
    gamePhase: 'waiting',
    usedCards: [],
    gameHistory: [],
    settings: defaultSettings
  })

  const [gameStats, setGameStats] = useState({
    totalGames: 0,
    totalWords: 0,
    correctWords: 0,
    averageScore: 0,
    bestScore: 0,
    favoriteCategory: '',
    playTime: 0
  })

  // Zamanlayıcı
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.gamePhase === 'playing' && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }))
      }, 1000)
    } else if (gameState.timeLeft === 0 && gameState.gamePhase === 'playing') {
      endRound()
    }
    return () => clearInterval(timer)
  }, [gameState.gamePhase, gameState.timeLeft])

  // Oyuncu ekleme
  const addPlayer = useCallback((name: string) => {
    if (gameState.players.length >= gameState.settings.maxPlayers) return false
    
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      score: 0,
      isActive: true,
      avatar: gameState.players.length < 12 ? ['🐱', '🐶', '🐰', '🐸', '🐨', '🐯', '🦁', '🐻', '🐼', '🐨', '🦊', '🐺'][gameState.players.length] : '👤'
    }
    
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }))
    return true
  }, [gameState.players.length, gameState.settings.maxPlayers])

  // Oyuncu çıkarma
  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId),
      currentPlayerIndex: prev.currentPlayerIndex >= prev.players.length - 1 ? 0 : prev.currentPlayerIndex
    }))
  }, [])

  // Oyun ayarlarını güncelleme
  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }))
  }, [])

  // Yeni kart çekme
  const drawNewCard = useCallback(() => {
    const { difficulty, categories } = gameState.settings
    const availableCards = tabuCards.filter(card => 
      !gameState.usedCards.includes(card.id) &&
      (categories.includes('all') || categories.includes(card.category)) &&
      card.difficulty === difficulty
    )

    if (availableCards.length === 0) {
      endGame()
      return
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const selectedCard = availableCards[randomIndex]
    
    setGameState(prev => ({
      ...prev,
      currentCard: selectedCard,
      usedCards: [...prev.usedCards, selectedCard.id]
    }))
  }, [gameState.settings, gameState.usedCards])

  // Oyunu başlatma
  const startGame = useCallback(() => {
    if (gameState.players.length < 2) return false
    
    setGameState(prev => ({
      ...prev,
      gamePhase: 'playing',
      timeLeft: prev.settings.timePerRound,
      round: 1,
      usedCards: [],
      currentPlayerIndex: 0,
      players: prev.players.map((p, index) => ({
        ...p,
        score: 0,
        isActive: index === 0
      }))
    }))
    
    drawNewCard()
    return true
  }, [gameState.players.length, drawNewCard])

  // Doğru cevap
  const handleCorrect = useCallback(() => {
    if (!gameState.currentCard) return

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    const points = gameState.currentCard.points
    
    const newHistory: GameHistory = {
      id: Date.now().toString(),
      playerName: currentPlayer.name,
      word: gameState.currentCard.word,
      correct: true,
      timestamp: Date.now(),
      points
    }

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((p, index) => 
        index === prev.currentPlayerIndex 
          ? { ...p, score: p.score + points }
          : p
      ),
      gameHistory: [...prev.gameHistory, newHistory]
    }))

    drawNewCard()
  }, [gameState.currentCard, gameState.players, gameState.currentPlayerIndex, drawNewCard])

  // Geçme
  const handlePass = useCallback(() => {
    if (!gameState.currentCard) return

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    
    const newHistory: GameHistory = {
      id: Date.now().toString(),
      playerName: currentPlayer.name,
      word: gameState.currentCard.word,
      correct: false,
      timestamp: Date.now(),
      points: 0
    }

    setGameState(prev => ({
      ...prev,
      gameHistory: [...prev.gameHistory, newHistory]
    }))

    drawNewCard()
  }, [gameState.currentCard, gameState.players, gameState.currentPlayerIndex, drawNewCard])

  // Sıradaki oyuncuya geçme
  const nextPlayer = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
      players: prev.players.map((p, index) => ({
        ...p,
        isActive: index === (prev.currentPlayerIndex + 1) % prev.players.length
      }))
    }))
  }, [])

  // Turu bitirme
  const endRound = useCallback(() => {
    setGameState(prev => {
      const nextRound = prev.round + 1
      if (nextRound > prev.settings.totalRounds) {
        return { ...prev, gamePhase: 'finished' }
      }
      
      return {
        ...prev,
        round: nextRound,
        timeLeft: prev.settings.timePerRound,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
        players: prev.players.map((p, index) => ({
          ...p,
          isActive: index === (prev.currentPlayerIndex + 1) % prev.players.length
        }))
      }
    })
  }, [])

  // Oyunu bitirme
  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'finished'
    }))
  }, [])

  // Oyunu sıfırlama
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'waiting',
      currentCard: null,
      round: 1,
      timeLeft: prev.settings.timePerRound,
      usedCards: [],
      currentPlayerIndex: 0,
      players: prev.players.map(p => ({ ...p, score: 0, isActive: false })),
      gameHistory: []
    }))
  }, [])

  // Oyunu duraklatma/devam ettirme
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePhase: prev.gamePhase === 'playing' ? 'paused' : 'playing'
    }))
  }, [])

  return {
    gameState,
    gameStats,
    addPlayer,
    removePlayer,
    updateSettings,
    startGame,
    handleCorrect,
    handlePass,
    nextPlayer,
    endRound,
    endGame,
    resetGame,
    togglePause
  }
}

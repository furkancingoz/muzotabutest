import * as React from "react"
import type { Player, GameHistory } from "../types/game"

interface ScoreboardProps {
  players: Player[]
  gameHistory: GameHistory[]
  currentRound: number
  totalRounds: number
}

export default function Scoreboard({ players, gameHistory, currentRound, totalRounds }: ScoreboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  const getPlayerStats = (playerName: string) => {
    const playerHistory = gameHistory.filter(h => h.playerName === playerName)
    const totalWords = playerHistory.length
    const correctWords = playerHistory.filter(h => h.correct).length
    const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
    
    return { totalWords, correctWords, accuracy }
  }

  const totalStats = gameHistory.reduce((acc, h) => {
    acc.totalWords++
    if (h.correct) acc.correctWords++
    return acc
  }, { totalWords: 0, correctWords: 0 })

  const averageAccuracy = totalStats.totalWords > 0 
    ? Math.round((totalStats.correctWords / totalStats.totalWords) * 100) 
    : 0

  const totalPoints = players.reduce((sum, p) => sum + p.score, 0)

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">🎮 Oyun Durumu</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tur İlerlemesi:</span>
            <span className="font-semibold">{currentRound}/{totalRounds}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          🏆 Skor Tablosu
        </h3>
        <div className="space-y-3">
          {sortedPlayers.map((player, index) => {
            const stats = getPlayerStats(player.name)
            const isLeader = index === 0 && player.score > 0
            
            return (
              <div 
                key={player.id} 
                className={`player-card ${isLeader ? 'border-yellow-400 bg-yellow-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {index === 0 && player.score > 0 ? '🥇' : 
                       index === 1 && player.score > 0 ? '🥈' : 
                       index === 2 && player.score > 0 ? '🥉' : '👤'}
                    </div>
                    <div>
                      <div className="player-name">{player.name}</div>
                      <div className="text-sm text-gray-500">
                        {stats.correctWords}/{stats.totalWords} • {stats.accuracy}% başarı
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="player-score text-xl font-bold text-blue-600">
                      {player.score} puan
                    </div>
                    {isLeader && (
                      <div className="text-xs text-yellow-600 font-semibold">LİDER!</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Game Statistics */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">📊 Oyun İstatistikleri</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Toplam Kelime:</span>
            <span className="font-semibold">{totalStats.totalWords}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Doğru Cevap:</span>
            <span className="font-semibold text-green-600">{totalStats.correctWords}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Başarı Oranı:</span>
            <span className="font-semibold text-blue-600">{averageAccuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Toplam Puan:</span>
            <span className="font-semibold text-purple-600">{totalPoints}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
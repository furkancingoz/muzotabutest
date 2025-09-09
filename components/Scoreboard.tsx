import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayerCard } from "@/components/ui/player-card"
import type { Player, GameHistory } from "@/types/game"

interface ScoreboardProps {
  players: Player[]
  gameHistory: GameHistory[]
  currentRound: number
  totalRounds: number
}

export default function Scoreboard({ 
  players, 
  gameHistory, 
  currentRound, 
  totalRounds 
}: ScoreboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  
  const getPlayerStats = (playerId: string) => {
    const playerHistory = gameHistory.filter(h => 
      h.playerName === players.find(p => p.id === playerId)?.name
    )
    return {
      correct: playerHistory.filter(h => h.correct).length,
      total: playerHistory.length,
      points: playerHistory.reduce((sum, h) => sum + h.points, 0)
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
    <div className="space-y-4">
      {/* Round Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg">
            📊 Oyun Durumu
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tur İlerlemesi</span>
            <Badge variant="outline">
              {currentRound}/{totalRounds}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Players Scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">🏆 Skor Tablosu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedPlayers.map((player, index) => {
            const stats = getPlayerStats(player.id)
            return (
              <div
                key={player.id}
                className={`p-3 rounded-lg border transition-all ${
                  player.isActive 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={index === 0 ? "default" : "outline"}
                      className="text-xs"
                    >
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </Badge>
                    <span className="text-xl">{player.avatar}</span>
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ✅ {stats.correct}/{stats.total}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg">{player.score}</div>
                    <div className="text-xs text-muted-foreground">puan</div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Game Statistics */}
      {gameHistory.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">📈 İstatistikler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Kelime:</span>
                <Badge variant="outline">{totalStats.totalWords}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doğru Cevap:</span>
                <Badge variant="default" className="bg-green-500 text-white">{totalStats.correctWords}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Başarı Oranı:</span>
                <Badge variant="default" className="bg-blue-500 text-white">{totalStats.averageAccuracy}%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Puan:</span>
                <Badge variant="default">{totalStats.totalPoints}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
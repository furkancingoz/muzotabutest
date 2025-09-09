import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer } from "@/components/ui/timer"
import { GameCard } from "@/components/ui/game-card"
import { useToast } from "@/components/ui/toast-provider"
import type { TabuCard, Player } from "@/types/game"

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
  const { addToast } = useToast()

  React.useEffect(() => {
    setUsedTabooWords([])
  }, [currentCard])

  const handleTabooClick = (word: string) => {
    if (usedTabooWords.includes(word)) return
    
    setUsedTabooWords(prev => [...prev, word])
    addToast({
      title: "Tabu Kelime Kullanıldı!",
      description: `"${word}" kelimesi kullanıldı ve işaretlendi.`,
      variant: "warning",
      duration: 2000
    })
  }

  const handleCorrect = () => {
    addToast({
      title: "Doğru! 🎉",
      description: `+${currentCard?.points || 0} puan kazandınız!`,
      variant: "success",
      duration: 2000
    })
    onCorrect()
  }

  const handlePass = () => {
    addToast({
      title: "Geçildi",
      description: "Kelime geçildi.",
      variant: "info",
      duration: 1500
    })
    onPass()
  }

  const handleNextPlayer = () => {
    addToast({
      title: "Sıradaki Oyuncu",
      description: `Sıra ${currentPlayer?.name} oyuncusuna geçti.`,
      variant: "info",
      duration: 2000
    })
    onNextPlayer()
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Tur {round}/{totalRounds}
              </Badge>
              <Timer timeLeft={timeLeft} totalTime={totalTime} />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentPlayer?.avatar}</span>
              <div>
                <div className="font-semibold">{currentPlayer?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {currentPlayer?.score} puan
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={onPause}
              className="shrink-0"
            >
              ⏸️ Duraklat
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Game Card */}
      {currentCard && (
        <GameCard
          card={currentCard}
          onCorrect={handleCorrect}
          onPass={handlePass}
          onTabooClick={handleTabooClick}
          usedTabooWords={usedTabooWords}
          allowPass={allowPass}
          className="animate-fade-in-up"
        />
      )}

      {/* Additional Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={handleNextPlayer}
              variant="outline"
              className="px-6 py-2"
            >
              👤 Sıradaki Oyuncu
            </Button>
            
            <Button
              onClick={() => setUsedTabooWords([])}
              variant="ghost"
              className="px-6 py-2"
            >
              🔄 Tabu Kelimeleri Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
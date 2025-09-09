import * as React from "react"
import { Card, CardContent, CardHeader } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import { TabooButton } from "./taboo-button"
import { cn } from "@/lib/utils"
import type { TabuCard } from "@/types/game"

interface GameCardProps {
  card: TabuCard
  onCorrect: () => void
  onPass: () => void
  onTabooClick: (word: string) => void
  usedTabooWords: string[]
  allowPass: boolean
  className?: string
}

export function GameCard({ 
  card, 
  onCorrect, 
  onPass, 
  onTabooClick, 
  usedTabooWords, 
  allowPass,
  className 
}: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
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

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Badge variant="secondary" className="text-sm">
            {card.category}
          </Badge>
          <Badge 
            className={cn("text-white", getDifficultyColor(card.difficulty))}
          >
            {getDifficultyText(card.difficulty)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {card.points} puan
          </Badge>
        </div>
        
        <div className="word-display">
          <h2 className="word text-5xl font-bold text-foreground">
            {card.word}
          </h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="taboo-section">
          <h3 className="taboo-title text-lg font-bold text-red-800 mb-4 text-center">
            🚫 Tabu Kelimeler
          </h3>
          <div className="taboo-words flex flex-wrap gap-2 justify-center">
            {card.tabooWords.map((word, index) => (
              <TabooButton
                key={index}
                word={word}
                onClick={() => onTabooClick(word)}
                isUsed={usedTabooWords.includes(word)}
                className="min-w-[100px]"
              />
            ))}
          </div>
        </div>

        <div className="game-controls flex gap-4 justify-center flex-wrap">
          <Button
            onClick={onCorrect}
            className="control-button correct-button px-8 py-3 text-lg"
            size="lg"
          >
            ✅ Doğru (+{card.points})
          </Button>
          
          {allowPass && (
            <Button
              onClick={onPass}
              className="control-button pass-button px-8 py-3 text-lg"
              size="lg"
            >
              ⏭️ Geç
            </Button>
          )}
        </div>

        <div className="text-center text-muted-foreground text-sm">
          <p>💡 Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!</p>
        </div>
      </CardContent>
    </Card>
  )
}

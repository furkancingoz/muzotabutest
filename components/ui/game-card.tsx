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
      case 'easy': return 'from-green-400 to-emerald-500'
      case 'medium': return 'from-yellow-400 to-orange-500'
      case 'hard': return 'from-red-400 to-pink-500'
      default: return 'from-gray-400 to-gray-500'
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
    <Card className={cn("modern-card w-full max-w-4xl mx-auto animate-fade-in-up", className)}>
      <CardHeader className="text-center space-y-6 pb-8">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Badge 
            variant="secondary" 
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200"
          >
            {getCategoryIcon(card.category)} {card.category}
          </Badge>
          <Badge 
            className={cn("text-white px-4 py-2 rounded-full bg-gradient-to-r", getDifficultyColor(card.difficulty))}
          >
            {getDifficultyText(card.difficulty)}
          </Badge>
          <Badge 
            variant="outline" 
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200"
          >
            ⭐ {card.points} puan
          </Badge>
        </div>
        
        <div className="word-display">
          <h2 className="word text-6xl font-black text-foreground">
            {card.word}
          </h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="taboo-section">
          <h3 className="taboo-title text-2xl font-bold text-red-800 mb-6 text-center">
            🚫 Tabu Kelimeler
          </h3>
          <div className="taboo-words flex flex-wrap gap-3 justify-center">
            {card.tabooWords.map((word, index) => (
              <TabooButton
                key={index}
                word={word}
                onClick={() => onTabooClick(word)}
                isUsed={usedTabooWords.includes(word)}
                className="min-w-[120px] text-sm font-semibold"
              />
            ))}
          </div>
        </div>

        <div className="game-controls flex gap-4 justify-center flex-wrap">
          <Button
            onClick={onCorrect}
            className="modern-button correct-button px-8 py-4 text-lg font-bold"
            size="lg"
          >
            ✅ Doğru (+{card.points})
          </Button>
          
          {allowPass && (
            <Button
              onClick={onPass}
              className="modern-button pass-button px-8 py-4 text-lg font-bold"
              size="lg"
            >
              ⏭️ Geç
            </Button>
          )}
        </div>

        <div className="text-center text-muted-foreground text-lg font-medium">
          <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💡 Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
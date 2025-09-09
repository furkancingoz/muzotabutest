import * as React from "react"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import type { Player } from "@/types/game"

interface PlayerCardProps {
  player: Player
  rank?: number
  isActive?: boolean
  onRemove?: (id: string) => void
  canRemove?: boolean
  className?: string
}

export function PlayerCard({ 
  player, 
  rank, 
  isActive = false, 
  onRemove, 
  canRemove = true,
  className 
}: PlayerCardProps) {
  const getRankIcon = (rank?: number) => {
    if (!rank) return null
    switch (rank) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return `#${rank}`
    }
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isActive && "ring-2 ring-primary bg-primary/5",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {rank && (
              <Badge variant="outline" className="text-xs">
                {getRankIcon(rank)}
              </Badge>
            )}
            <span className="player-avatar text-2xl">
              {player.avatar}
            </span>
            <div className="flex flex-col">
              <span className="player-name font-medium text-sm">
                {player.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {player.score} puan
              </span>
            </div>
          </div>
          
          {onRemove && canRemove && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(player.id)}
              className="h-8 w-8"
            >
              ✕
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

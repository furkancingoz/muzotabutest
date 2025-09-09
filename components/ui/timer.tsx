import * as React from "react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface TimerProps {
  timeLeft: number
  totalTime: number
  className?: string
}

export function Timer({ timeLeft, totalTime, className }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100
  const isWarning = timeLeft <= 10
  const isDanger = timeLeft <= 5

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge 
        variant={isDanger ? "destructive" : isWarning ? "warning" : "default"}
        className={cn(
          "text-lg font-bold px-4 py-2",
          isDanger && "animate-pulse"
        )}
      >
        ⏱️ {timeLeft}s
      </Badge>
      
      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-1000 ease-linear",
            isDanger ? "bg-red-500" : isWarning ? "bg-yellow-500" : "bg-green-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

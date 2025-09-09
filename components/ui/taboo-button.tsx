import * as React from "react"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface TabooButtonProps {
  word: string
  onClick: () => void
  isUsed?: boolean
  className?: string
}

export function TabooButton({ word, onClick, isUsed = false, className }: TabooButtonProps) {
  return (
    <Button
      variant={isUsed ? "outline" : "destructive"}
      size="sm"
      onClick={onClick}
      disabled={isUsed}
      className={cn(
        "relative transition-all duration-200 hover:scale-105 active:scale-95",
        isUsed && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {isUsed && (
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 text-xs px-1 py-0"
        >
          ✕
        </Badge>
      )}
      {word}
    </Button>
  )
}

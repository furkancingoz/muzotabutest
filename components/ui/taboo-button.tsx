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
        "relative transition-all duration-300 hover:scale-105 active:scale-95 font-semibold",
        isUsed 
          ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300" 
          : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-red-200",
        className
      )}
    >
      {isUsed && (
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-red-500 text-white"
        >
          ✕
        </Badge>
      )}
      {word}
    </Button>
  )
}
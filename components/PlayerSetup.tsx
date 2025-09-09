import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayerCard } from "@/components/ui/player-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"
import type { Player } from "@/types/game"

interface PlayerSetupProps {
  players: Player[]
  onAddPlayer: (name: string) => boolean
  onRemovePlayer: (id: string) => void
  onStartGame: () => boolean
  maxPlayers: number
}

export default function PlayerSetup({ 
  players, 
  onAddPlayer, 
  onRemovePlayer, 
  onStartGame, 
  maxPlayers 
}: PlayerSetupProps) {
  const [newPlayerName, setNewPlayerName] = React.useState("")
  const { addToast } = useToast()

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlayerName.trim()) {
      addToast({
        title: "Hata",
        description: "Lütfen oyuncu adı girin.",
        variant: "error"
      })
      return
    }
    
    if (onAddPlayer(newPlayerName.trim())) {
      addToast({
        title: "Oyuncu Eklendi",
        description: `${newPlayerName} oyuna eklendi.`,
        variant: "success"
      })
      setNewPlayerName("")
    } else {
      addToast({
        title: "Hata",
        description: "Maksimum oyuncu sayısına ulaşıldı.",
        variant: "error"
      })
    }
  }

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 2) {
      addToast({
        title: "Hata",
        description: "En az 2 oyuncu olmalı.",
        variant: "error"
      })
      return
    }
    
    const player = players.find(p => p.id === id)
    if (player) {
      addToast({
        title: "Oyuncu Çıkarıldı",
        description: `${player.name} oyundan çıkarıldı.`,
        variant: "info"
      })
    }
    onRemovePlayer(id)
  }

  const handleStartGame = () => {
    if (players.length < 2) {
      addToast({
        title: "Hata",
        description: "En az 2 oyuncu gerekli.",
        variant: "error"
      })
      return
    }
    
    if (onStartGame()) {
      addToast({
        title: "Oyun Başladı!",
        description: "İyi eğlenceler! 🎉",
        variant: "success"
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            👥 Oyuncu Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Players List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Oyuncular ({players.length}/{maxPlayers})</h3>
              <Badge variant="outline">
                {players.length} oyuncu
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {players.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  isActive={player.isActive}
                  onRemove={handleRemovePlayer}
                  canRemove={players.length > 2}
                  className="animate-fade-in-up"
                />
              ))}
            </div>
          </div>

          {/* Add Player Form */}
          {players.length < maxPlayers && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <form onSubmit={handleAddPlayer} className="flex gap-2">
                  <Input
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="Oyuncu adı girin..."
                    maxLength={20}
                    className="flex-1"
                  />
                  <Button type="submit" className="shrink-0">
                    ➕ Ekle
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Start Game Button */}
          <div className="text-center">
            <Button
              onClick={handleStartGame}
              disabled={players.length < 2}
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              🚀 Oyunu Başlat ({players.length} oyuncu)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
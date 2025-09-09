import * as React from "react"
import Head from "next/head"
import { useGame } from "../hooks/useGame"
import { ToastProvider } from "../components/ui/toast-provider"
import PlayerSetup from "../components/PlayerSetup"
import GameSettings from "../components/GameSettings"
import GameBoard from "../components/GameBoard"
import Scoreboard from "../components/Scoreboard"
import GameResults from "../components/GameResults"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

export default function Home() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    updateSettings,
    startGame,
    handleCorrect,
    handlePass,
    nextPlayer,
    resetGame,
    togglePause
  } = useGame()

  const [showSettings, setShowSettings] = React.useState(false)

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  const renderGameContent = () => {
    switch (gameState.gamePhase) {
      case 'waiting':
        return (
          <div className="space-y-8">
            {/* Modern Header */}
            <Card className="modern-card text-center animate-fade-in-up">
              <CardHeader className="pb-6">
                <CardTitle className="game-title text-6xl font-black mb-4">
                  🎯 Gelişmiş Tabu Oyunu
                </CardTitle>
                <p className="game-subtitle text-xl text-muted-foreground font-medium">
                  Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    🎮 {gameState.players.length} Oyuncu
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    📚 140+ Kelime
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    🏆 8 Kategori
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Player Setup */}
            <PlayerSetup
              players={gameState.players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              onStartGame={startGame}
              maxPlayers={gameState.settings.maxPlayers}
            />

            {/* Settings Toggle */}
            <Card className="modern-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-8 py-3 text-lg font-semibold hover-lift"
                  >
                    ⚙️ {showSettings ? 'Ayarları Gizle' : 'Ayarları Göster'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            {showSettings && (
              <div className="animate-fade-in-up">
                <GameSettings
                  settings={gameState.settings}
                  onUpdateSettings={updateSettings}
                />
              </div>
            )}
          </div>
        )

      case 'playing':
      case 'paused':
        return (
          <div className="space-y-6">
            {/* Game Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Game Area */}
              <div className="lg:col-span-2">
                <GameBoard
                  currentCard={gameState.currentCard}
                  currentPlayer={currentPlayer}
                  timeLeft={gameState.timeLeft}
                  totalTime={gameState.settings.timePerRound}
                  round={gameState.round}
                  totalRounds={gameState.settings.totalRounds}
                  onCorrect={handleCorrect}
                  onPass={handlePass}
                  onNextPlayer={nextPlayer}
                  onPause={togglePause}
                  allowPass={gameState.settings.allowPass}
                />
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Scoreboard
                  players={gameState.players}
                  gameHistory={gameState.gameHistory}
                  currentRound={gameState.round}
                  totalRounds={gameState.settings.totalRounds}
                />
              </div>
            </div>
          </div>
        )

      case 'finished':
        return (
          <GameResults
            players={gameState.players}
            gameHistory={gameState.gameHistory}
            onPlayAgain={() => {
              resetGame()
              startGame()
            }}
            onNewGame={resetGame}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <Head>
        <title>Gelişmiş Tabu Oyunu - Demo</title>
        <meta name="description" content="Çoklu oyuncu, kategoriler ve zorluk seviyeleri ile gelişmiş Tabu oyunu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <ToastProvider>
        <div className="game-container min-h-screen flex items-center justify-center p-4">
          <div className="game-wrapper w-full max-w-7xl">
            {renderGameContent()}
          </div>
        </div>
      </ToastProvider>
    </>
  )
}
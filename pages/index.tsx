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
          <div className="space-y-6">
            {/* Header */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="game-title text-4xl font-bold">
                  🎯 Gelişmiş Tabu Oyunu
                </CardTitle>
                <p className="game-subtitle text-lg text-muted-foreground">
                  Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
                </p>
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
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-6"
                  >
                    ⚙️ {showSettings ? 'Ayarları Gizle' : 'Ayarları Göster'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            {showSettings && (
              <GameSettings
                settings={gameState.settings}
                onUpdateSettings={updateSettings}
              />
            )}
          </div>
        )

      case 'playing':
      case 'paused':
        return (
          <div className="space-y-6">
            {/* Game Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </Head>

      <ToastProvider>
        <div className="game-container min-h-screen flex items-center justify-center p-4">
          <div className="game-wrapper w-full max-w-6xl">
            {renderGameContent()}
          </div>
        </div>
      </ToastProvider>
    </>
  )
}
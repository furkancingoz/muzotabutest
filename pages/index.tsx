import * as React from "react"
import Head from "next/head"
import { useGame } from "../hooks/useGame"
import PlayerSetup from "../components/PlayerSetup"
import GameSettings from "../components/GameSettings"
import GameBoard from "../components/GameBoard"
import Scoreboard from "../components/Scoreboard"
import GameResults from "../components/GameResults"

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
          <div className="fade-in">
            <h1 className="game-title">🎯 Gelişmiş Tabu Oyunu</h1>
            <p className="game-subtitle">
              Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
            </p>
            
            <PlayerSetup
              players={gameState.players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              onStartGame={startGame}
              maxPlayers={gameState.settings.maxPlayers}
            />

            <div className="card">
              <div className="text-center">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  ⚙️ {showSettings ? 'Ayarları Gizle' : 'Ayarları Göster'}
                </button>
              </div>
            </div>

            {showSettings && (
              <div className="slide-in">
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
          <div className="fade-in">
            <div className="game-info">
              <div className="round-info">
                Tur {gameState.round}/{gameState.settings.totalRounds}
              </div>
              <div className="flex gap-3">
                <span className="category-badge">
                  {gameState.currentCard?.category}
                </span>
                <span className="difficulty-badge">
                  {gameState.settings.difficulty === 'easy' ? 'Kolay' : 
                   gameState.settings.difficulty === 'medium' ? 'Orta' : 'Zor'}
                </span>
                <span className="points-badge">
                  {gameState.currentCard?.points} puan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

      <div className="game-container">
        <div className="game-wrapper">
          {renderGameContent()}
        </div>
      </div>
    </>
  )
}
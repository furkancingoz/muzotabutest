import { useState } from 'react'
import Head from 'next/head'
import { useGame } from '../hooks/useGame'
import PlayerSetup from '../components/PlayerSetup'
import GameSettings from '../components/GameSettings'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import GameResults from '../components/GameResults'

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

  const [showSettings, setShowSettings] = useState(false)

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  const renderGameContent = () => {
    switch (gameState.gamePhase) {
      case 'waiting':
        return (
          <div className="game-lobby">
            <div className="lobby-header">
              <h1 className="game-title">🎯 Gelişmiş Tabu Oyunu</h1>
              <p className="game-subtitle">
                Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
              </p>
            </div>

            <div className="lobby-content">
              <PlayerSetup
                players={gameState.players}
                onAddPlayer={addPlayer}
                onRemovePlayer={removePlayer}
                onStartGame={startGame}
                maxPlayers={gameState.settings.maxPlayers}
              />

              <div className="settings-toggle">
                <button 
                  className="settings-btn"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  ⚙️ {showSettings ? 'Ayarları Gizle' : 'Ayarları Göster'}
                </button>
              </div>

              {showSettings && (
                <GameSettings
                  settings={gameState.settings}
                  onUpdateSettings={updateSettings}
                />
              )}
            </div>
          </div>
        )

      case 'playing':
      case 'paused':
        return (
          <div className="game-play">
            <div className="game-layout">
              <div className="game-main">
                <GameBoard
                  currentCard={gameState.currentCard}
                  currentPlayer={currentPlayer}
                  timeLeft={gameState.timeLeft}
                  round={gameState.round}
                  totalRounds={gameState.settings.totalRounds}
                  onCorrect={handleCorrect}
                  onPass={handlePass}
                  onNextPlayer={nextPlayer}
                  onPause={togglePause}
                  allowPass={gameState.settings.allowPass}
                />
              </div>
              
              <div className="game-sidebar">
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
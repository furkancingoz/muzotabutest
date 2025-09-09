import { useState, useEffect } from 'react'
import Head from 'next/head'

interface TabuCard {
  word: string
  tabooWords: string[]
}

const tabuCards: TabuCard[] = [
  { word: "Güneş", tabooWords: ["Sıcak", "Gündüz", "Işık", "Gökyüzü", "Yaz"] },
  { word: "Telefon", tabooWords: ["Arama", "Konuşma", "Mobil", "Ses", "İletişim"] },
  { word: "Kitap", tabooWords: ["Okumak", "Sayfa", "Yazar", "Kütüphane", "Roman"] },
  { word: "Araba", tabooWords: ["Sürücü", "Tekerlek", "Motor", "Yol", "Hız"] },
  { word: "Müzik", tabooWords: ["Ses", "Melodi", "Şarkı", "Enstrüman", "Konser"] },
  { word: "Spor", tabooWords: ["Futbol", "Koşmak", "Antrenman", "Yarış", "Takım"] },
  { word: "Yemek", tabooWords: ["Açlık", "Lezzet", "Pişirmek", "Restoran", "Tat"] },
  { word: "Uçak", tabooWords: ["Havacılık", "Gökyüzü", "Yolcu", "Havaalanı", "Uçmak"] },
  { word: "Deniz", tabooWords: ["Su", "Dalga", "Kum", "Yüzme", "Sahil"] },
  { word: "Bilgisayar", tabooWords: ["Ekran", "Klavye", "Program", "İnternet", "Teknoloji"] },
  { word: "Kedi", tabooWords: ["Hayvan", "Evcil", "Miyav", "Tüy", "Patiler"] },
  { word: "Çiçek", tabooWords: ["Kokulu", "Renkli", "Bahçe", "Güzel", "Doğa"] },
  { word: "Para", tabooWords: ["Zengin", "Alışveriş", "Banknot", "Kazanç", "Harcama"] },
  { word: "Okul", tabooWords: ["Öğrenci", "Ders", "Öğretmen", "Eğitim", "Sınıf"] },
  { word: "Hastane", tabooWords: ["Doktor", "Hasta", "İlaç", "Tedavi", "Sağlık"] }
]

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentCard, setCurrentCard] = useState<TabuCard | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [usedCards, setUsedCards] = useState<number[]>([])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
    return () => clearInterval(timer)
  }, [gameStarted, timeLeft, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    setUsedCards([])
    drawNewCard()
  }

  const drawNewCard = () => {
    const availableCards = tabuCards.filter((_, index) => !usedCards.includes(index))
    
    if (availableCards.length === 0) {
      setGameOver(true)
      return
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const cardIndex = tabuCards.findIndex(card => card === availableCards[randomIndex])
    
    setCurrentCard(availableCards[randomIndex])
    setUsedCards([...usedCards, cardIndex])
  }

  const handleCorrect = () => {
    setScore(score + 1)
    drawNewCard()
  }

  const handlePass = () => {
    drawNewCard()
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentCard(null)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    setUsedCards([])
  }

  return (
    <>
      <Head>
        <title>Tabu Oyunu - Demo</title>
        <meta name="description" content="Eğlenceli Tabu oyunu demo sitesi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="game-container">
        <div className="game-card">
          {!gameStarted ? (
            <div className="text-center">
              <h1 className="title">🎯 Tabu Oyunu</h1>
              <p className="subtitle">
                Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
              </p>
              <button
                onClick={startGame}
                className="btn btn-primary"
              >
                Oyunu Başlat
              </button>
            </div>
          ) : gameOver ? (
            <div className="text-center">
              <h1 className="title">🎉 Oyun Bitti!</h1>
              <div className="score-display">
                <h2 className="score-text">Skorunuz</h2>
                <p className="score-number">{score}</p>
                <p className="score-text">doğru kelime!</p>
              </div>
              <button
                onClick={resetGame}
                className="btn btn-info"
              >
                Tekrar Oyna
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="game-status">
                <div className="status-badge status-score">
                  Skor: {score}
                </div>
                <div className="status-badge status-time">
                  Süre: {timeLeft}s
                </div>
              </div>

              {currentCard && (
                <div className="word-card">
                  <h2 className="word">
                    {currentCard.word}
                  </h2>
                  <div className="taboo-section">
                    <h3 className="taboo-title">🚫 Tabu Kelimeler:</h3>
                    <div className="taboo-words">
                      {currentCard.tabooWords.map((word, index) => (
                        <span
                          key={index}
                          className="taboo-word"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="game-controls">
                <button
                  onClick={handleCorrect}
                  className="btn btn-success"
                >
                  ✅ Doğru
                </button>
                <button
                  onClick={handlePass}
                  className="btn btn-warning"
                >
                  ⏭️ Geç
                </button>
              </div>

              <p className="game-instruction">
                Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
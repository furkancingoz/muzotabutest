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

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          {!gameStarted ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">🎯 Tabu Oyunu</h1>
              <p className="text-lg text-gray-600 mb-8">
                Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Oyunu Başlat
              </button>
            </div>
          ) : gameOver ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">🎉 Oyun Bitti!</h1>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 mb-8">
                <h2 className="text-3xl font-bold mb-2">Skorunuz</h2>
                <p className="text-6xl font-bold">{score}</p>
                <p className="text-lg">doğru kelime!</p>
              </div>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Tekrar Oyna
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-between items-center mb-8">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">
                  Skor: {score}
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  Süre: {timeLeft}s
                </div>
              </div>

              {currentCard && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    {currentCard.word}
                  </h2>
                  <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-red-800 mb-3">🚫 Tabu Kelimeler:</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentCard.tabooWords.map((word, index) => (
                        <span
                          key={index}
                          className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleCorrect}
                  className="bg-green-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                >
                  ✅ Doğru
                </button>
                <button
                  onClick={handlePass}
                  className="bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  ⏭️ Geç
                </button>
              </div>

              <p className="text-gray-600 mt-6 text-sm">
                Kelimeyi tabu kelimeleri kullanmadan anlatmaya çalışın!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

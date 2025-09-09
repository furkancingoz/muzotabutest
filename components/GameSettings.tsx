import * as React from "react"
import type { GameSettings } from "../types/game"

interface GameSettingsProps {
  settings: GameSettings
  onUpdateSettings: (settings: Partial<GameSettings>) => void
}

export default function GameSettings({ settings, onUpdateSettings }: GameSettingsProps) {
  return (
    <div className="settings-section">
      <h3 className="settings-title">⚙️ Oyun Ayarları</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Settings */}
        <div className="setting-group">
          <label className="setting-label">Tur Süresi (saniye)</label>
          <select
            className="setting-select"
            value={settings.timePerRound}
            onChange={(e) => onUpdateSettings({ timePerRound: parseInt(e.target.value) })}
          >
            <option value={30}>30 saniye</option>
            <option value={45}>45 saniye</option>
            <option value={60}>60 saniye</option>
            <option value={90}>90 saniye</option>
            <option value={120}>120 saniye</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">Toplam Tur Sayısı</label>
          <select
            className="setting-select"
            value={settings.totalRounds}
            onChange={(e) => onUpdateSettings({ totalRounds: parseInt(e.target.value) })}
          >
            <option value={5}>5 tur</option>
            <option value={10}>10 tur</option>
            <option value={15}>15 tur</option>
            <option value={20}>20 tur</option>
          </select>
        </div>

        {/* Difficulty */}
        <div className="setting-group">
          <label className="setting-label">Zorluk Seviyesi</label>
          <select
            className="setting-select"
            value={settings.difficulty}
            onChange={(e) => onUpdateSettings({ difficulty: e.target.value as any })}
          >
            <option value="easy">Kolay (1 puan)</option>
            <option value="medium">Orta (2 puan)</option>
            <option value="hard">Zor (3 puan)</option>
            <option value="all">Karışık (1-4 puan)</option>
          </select>
        </div>

        {/* Category */}
        <div className="setting-group">
          <label className="setting-label">Kategori</label>
          <select
            className="setting-select"
            value={settings.categories[0] || 'all'}
            onChange={(e) => onUpdateSettings({ categories: [e.target.value] })}
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="Hayvanlar">🐾 Hayvanlar</option>
            <option value="Yiyecekler">🍕 Yiyecekler</option>
            <option value="Spor">⚽ Spor</option>
            <option value="Teknoloji">💻 Teknoloji</option>
            <option value="Meslekler">👨‍⚕️ Meslekler</option>
            <option value="Bilim">🔬 Bilim</option>
            <option value="Soyut">💭 Soyut Kavramlar</option>
          </select>
        </div>

        {/* Game Options */}
        <div className="setting-group">
          <label className="setting-label">Geçme Hakkı</label>
          <select
            className="setting-select"
            value={settings.allowPass ? 'yes' : 'no'}
            onChange={(e) => onUpdateSettings({ allowPass: e.target.value === 'yes' })}
          >
            <option value="yes">Evet</option>
            <option value="no">Hayır</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">Maksimum Oyuncu</label>
          <select
            className="setting-select"
            value={settings.maxPlayers}
            onChange={(e) => onUpdateSettings({ maxPlayers: parseInt(e.target.value) })}
          >
            <option value={2}>2 oyuncu</option>
            <option value={4}>4 oyuncu</option>
            <option value={6}>6 oyuncu</option>
            <option value={8}>8 oyuncu</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Oyun Kuralları:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Kelimeyi tabu kelimeleri kullanmadan anlatın</li>
          <li>• Tabu kelime kullanırsanız puan alamazsınız</li>
          <li>• Doğru tahmin edilen her kelime için puan kazanırsınız</li>
          <li>• En yüksek puanı alan oyuncu kazanır</li>
        </ul>
      </div>
    </div>
  )
}
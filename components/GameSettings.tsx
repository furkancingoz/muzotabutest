import type { GameSettings } from '../types/game'
import { categories, difficultyLevels } from '../data/cards'

interface GameSettingsProps {
  settings: GameSettings
  onUpdateSettings: (settings: Partial<GameSettings>) => void
}

export default function GameSettings({ settings, onUpdateSettings }: GameSettingsProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      onUpdateSettings({ categories: ['all'] })
    } else {
      const newCategories = settings.categories.includes('all') 
        ? [categoryId]
        : settings.categories.includes(categoryId)
          ? settings.categories.filter(c => c !== categoryId)
          : [...settings.categories, categoryId]
      
      onUpdateSettings({ categories: newCategories })
    }
  }

  return (
    <div className="game-settings">
      <h3 className="settings-title">⚙️ Oyun Ayarları</h3>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label className="setting-label">⏱️ Tur Süresi (saniye)</label>
          <select 
            value={settings.timePerRound}
            onChange={(e) => onUpdateSettings({ timePerRound: parseInt(e.target.value) })}
            className="setting-select"
          >
            <option value={30}>30 saniye</option>
            <option value={60}>60 saniye</option>
            <option value={90}>90 saniye</option>
            <option value={120}>120 saniye</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">🎯 Toplam Tur</label>
          <select 
            value={settings.totalRounds}
            onChange={(e) => onUpdateSettings({ totalRounds: parseInt(e.target.value) })}
            className="setting-select"
          >
            <option value={5}>5 tur</option>
            <option value={10}>10 tur</option>
            <option value={15}>15 tur</option>
            <option value={20}>20 tur</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">🎚️ Zorluk Seviyesi</label>
          <div className="difficulty-buttons">
            {difficultyLevels.map(level => (
              <button
                key={level.id}
                className={`difficulty-btn ${settings.difficulty === level.id ? 'active' : ''}`}
                onClick={() => onUpdateSettings({ difficulty: level.id as any })}
                style={{ borderColor: level.color }}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label className="setting-label">📂 Kategoriler</label>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${settings.categories.includes(category.id) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label className="setting-label">🔊 Ses Efektleri</label>
          <button
            className={`toggle-btn ${settings.soundEnabled ? 'active' : ''}`}
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
          >
            {settings.soundEnabled ? '🔊 Açık' : '🔇 Kapalı'}
          </button>
        </div>

        <div className="setting-group">
          <label className="setting-label">⏭️ Geçme İzni</label>
          <button
            className={`toggle-btn ${settings.allowPass ? 'active' : ''}`}
            onClick={() => onUpdateSettings({ allowPass: !settings.allowPass })}
          >
            {settings.allowPass ? '✅ İzinli' : '❌ Yasak'}
          </button>
        </div>
      </div>
    </div>
  )
}

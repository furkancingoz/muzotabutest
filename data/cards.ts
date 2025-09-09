import { TabuCard } from '../types/game'

export const tabuCards: TabuCard[] = [
  // Kolay Seviye - Hayvanlar
  { id: '1', word: 'Kedi', tabooWords: ['Miyav', 'Evcil', 'Tüy', 'Patiler', 'Hayvan'], category: 'Hayvanlar', difficulty: 'easy', points: 1 },
  { id: '2', word: 'Köpek', tabooWords: ['Hav', 'Evcil', 'Sadık', 'Patiler', 'Hayvan'], category: 'Hayvanlar', difficulty: 'easy', points: 1 },
  { id: '3', word: 'Kuş', tabooWords: ['Uçmak', 'Tüy', 'Gagası', 'Yumurta', 'Hayvan'], category: 'Hayvanlar', difficulty: 'easy', points: 1 },
  { id: '4', word: 'Balık', tabooWords: ['Su', 'Yüzgeç', 'Pullu', 'Deniz', 'Hayvan'], category: 'Hayvanlar', difficulty: 'easy', points: 1 },
  { id: '5', word: 'At', tabooWords: ['Dört', 'Bacak', 'Mane', 'Koşmak', 'Hayvan'], category: 'Hayvanlar', difficulty: 'easy', points: 1 },

  // Kolay Seviye - Yiyecekler
  { id: '6', word: 'Elma', tabooWords: ['Meyve', 'Kırmızı', 'Ağaç', 'Tatlı', 'Yemek'], category: 'Yiyecekler', difficulty: 'easy', points: 1 },
  { id: '7', word: 'Ekmek', tabooWords: ['Un', 'Fırın', 'Kahvaltı', 'Tatlı', 'Yemek'], category: 'Yiyecekler', difficulty: 'easy', points: 1 },
  { id: '8', word: 'Süt', tabooWords: ['Beyaz', 'İçmek', 'Sıvı', 'Kahvaltı', 'Yemek'], category: 'Yiyecekler', difficulty: 'easy', points: 1 },
  { id: '9', word: 'Çikolata', tabooWords: ['Tatlı', 'Kahverengi', 'Şeker', 'Lezzetli', 'Yemek'], category: 'Yiyecekler', difficulty: 'easy', points: 1 },
  { id: '10', word: 'Pizza', tabooWords: ['Yuvarlak', 'Peynir', 'Hamur', 'Restoran', 'Yemek'], category: 'Yiyecekler', difficulty: 'easy', points: 1 },

  // Orta Seviye - Spor
  { id: '11', word: 'Futbol', tabooWords: ['Top', 'Gol', 'Saha', 'Takım', 'Spor'], category: 'Spor', difficulty: 'medium', points: 2 },
  { id: '12', word: 'Basketbol', tabooWords: ['Top', 'Pot', 'Saha', 'Takım', 'Spor'], category: 'Spor', difficulty: 'medium', points: 2 },
  { id: '13', word: 'Tenis', tabooWords: ['Raket', 'Top', 'Saha', 'Oyun', 'Spor'], category: 'Spor', difficulty: 'medium', points: 2 },
  { id: '14', word: 'Yüzme', tabooWords: ['Su', 'Havuz', 'Yüzgeç', 'Spor', 'Yarış'], category: 'Spor', difficulty: 'medium', points: 2 },
  { id: '15', word: 'Koşu', tabooWords: ['Hız', 'Yol', 'Antrenman', 'Spor', 'Yarış'], category: 'Spor', difficulty: 'medium', points: 2 },

  // Orta Seviye - Teknoloji
  { id: '16', word: 'Bilgisayar', tabooWords: ['Ekran', 'Klavye', 'Program', 'İnternet', 'Teknoloji'], category: 'Teknoloji', difficulty: 'medium', points: 2 },
  { id: '17', word: 'Telefon', tabooWords: ['Arama', 'Konuşma', 'Mobil', 'Ses', 'Teknoloji'], category: 'Teknoloji', difficulty: 'medium', points: 2 },
  { id: '18', word: 'Tablet', tabooWords: ['Dokunmatik', 'Ekran', 'Mobil', 'İnternet', 'Teknoloji'], category: 'Teknoloji', difficulty: 'medium', points: 2 },
  { id: '19', word: 'Kamera', tabooWords: ['Fotoğraf', 'Çekmek', 'Görüntü', 'Lens', 'Teknoloji'], category: 'Teknoloji', difficulty: 'medium', points: 2 },
  { id: '20', word: 'Robot', tabooWords: ['Otomatik', 'Makine', 'Yapay', 'Zeka', 'Teknoloji'], category: 'Teknoloji', difficulty: 'medium', points: 2 },

  // Zor Seviye - Meslekler
  { id: '21', word: 'Doktor', tabooWords: ['Hasta', 'İlaç', 'Hastane', 'Tedavi', 'Meslek'], category: 'Meslekler', difficulty: 'hard', points: 3 },
  { id: '22', word: 'Öğretmen', tabooWords: ['Öğrenci', 'Ders', 'Okul', 'Eğitim', 'Meslek'], category: 'Meslekler', difficulty: 'hard', points: 3 },
  { id: '23', word: 'Mühendis', tabooWords: ['Teknik', 'Proje', 'Tasarım', 'Hesaplama', 'Meslek'], category: 'Meslekler', difficulty: 'hard', points: 3 },
  { id: '24', word: 'Avukat', tabooWords: ['Hukuk', 'Mahkeme', 'Dava', 'Adalet', 'Meslek'], category: 'Meslekler', difficulty: 'hard', points: 3 },
  { id: '25', word: 'Mimar', tabooWords: ['Bina', 'Tasarım', 'Çizim', 'Yapı', 'Meslek'], category: 'Meslekler', difficulty: 'hard', points: 3 },

  // Zor Seviye - Bilim
  { id: '26', word: 'Fizik', tabooWords: ['Bilim', 'Hareket', 'Enerji', 'Kuvvet', 'Ders'], category: 'Bilim', difficulty: 'hard', points: 3 },
  { id: '27', word: 'Kimya', tabooWords: ['Bilim', 'Reaksiyon', 'Element', 'Deney', 'Ders'], category: 'Bilim', difficulty: 'hard', points: 3 },
  { id: '28', word: 'Biyoloji', tabooWords: ['Bilim', 'Canlı', 'Hücre', 'DNA', 'Ders'], category: 'Bilim', difficulty: 'hard', points: 3 },
  { id: '29', word: 'Matematik', tabooWords: ['Sayı', 'Hesaplama', 'Formül', 'Problem', 'Ders'], category: 'Bilim', difficulty: 'hard', points: 3 },
  { id: '30', word: 'Astronomi', tabooWords: ['Bilim', 'Yıldız', 'Gezegen', 'Uzay', 'Ders'], category: 'Bilim', difficulty: 'hard', points: 3 },

  // Ekstra Zor - Soyut Kavramlar
  { id: '31', word: 'Aşk', tabooWords: ['Sevgi', 'Kalp', 'Romantik', 'Duygu', 'İlişki'], category: 'Soyut', difficulty: 'hard', points: 4 },
  { id: '32', word: 'Özgürlük', tabooWords: ['Bağımsız', 'Hür', 'Serbest', 'Kısıtlama', 'Hak'], category: 'Soyut', difficulty: 'hard', points: 4 },
  { id: '33', word: 'Mutluluk', tabooWords: ['Sevinç', 'Neşe', 'Duygu', 'Pozitif', 'Hiss'], category: 'Soyut', difficulty: 'hard', points: 4 },
  { id: '34', word: 'Cesaret', tabooWords: ['Korkusuz', 'Kahraman', 'Güçlü', 'Korku', 'Hiss'], category: 'Soyut', difficulty: 'hard', points: 4 },
  { id: '35', word: 'Hayal', tabooWords: ['Rüya', 'Düşünce', 'İmge', 'Gerçek', 'Hiss'], category: 'Soyut', difficulty: 'hard', points: 4 }
]

export const categories = [
  { id: 'all', name: 'Tümü', icon: '🎯' },
  { id: 'Hayvanlar', name: 'Hayvanlar', icon: '🐾' },
  { id: 'Yiyecekler', name: 'Yiyecekler', icon: '🍕' },
  { id: 'Spor', name: 'Spor', icon: '⚽' },
  { id: 'Teknoloji', name: 'Teknoloji', icon: '💻' },
  { id: 'Meslekler', name: 'Meslekler', icon: '👨‍⚕️' },
  { id: 'Bilim', name: 'Bilim', icon: '🔬' },
  { id: 'Soyut', name: 'Soyut Kavramlar', icon: '💭' }
]

export const difficultyLevels = [
  { id: 'easy', name: 'Kolay', color: '#10b981', points: 1 },
  { id: 'medium', name: 'Orta', color: '#f59e0b', points: 2 },
  { id: 'hard', name: 'Zor', color: '#ef4444', points: 3 }
]

export const avatars = ['🐱', '🐶', '🐰', '🐸', '🐨', '🐯', '🦁', '🐻', '🐼', '🐨', '🦊', '🐺']

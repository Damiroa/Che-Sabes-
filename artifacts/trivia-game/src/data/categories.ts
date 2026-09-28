export const ACADEMIC_CATEGORIES = {
  "Mathematics": {
    "label": "Matemática",
    "icon": "📐"
  },
  "Language and Literature": {
    "label": "Lengua y Literatura",
    "icon": "📖"
  },
  "History": {
    "label": "Historia",
    "icon": "🏛️"
  },
  "Geography": {
    "label": "Geografía",
    "icon": "🌎"
  },
  "Biology": {
    "label": "Biología",
    "icon": "🧬"
  },
  "Physics": {
    "label": "Física",
    "icon": "⚡"
  },
  "Chemistry": {
    "label": "Química",
    "icon": "🧪"
  },
  "English": {
    "label": "Inglés",
    "icon": "🇬🇧"
  },
  "Argentine History": {
    "label": "Historia Argentina",
    "icon": "🇦🇷"
  },
  "Technology": {
    "label": "Informática",
    "icon": "💻"
  },
  "Art": {
    "label": "Arte",
    "icon": "🎨"
  },
  "Music": {
    "label": "Música",
    "icon": "🎵"
  },
  "Sports": {
    "label": "Deportes",
    "icon": "🏅"
  },
  "Logic": {
    "label": "Lógica",
    "icon": "🧩"
  },
  "General Knowledge": {
    "label": "Cultura General",
    "icon": "🌟"
  }
} as const;

export type AcademicCategory = keyof typeof ACADEMIC_CATEGORIES;

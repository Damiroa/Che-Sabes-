export type QuestionType = "multiple" | "truefalse" | "short";
export type Category = "genius" | "entertainment" | "sports" | "culture" | "random";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  category: Category;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  correct: string;
  options?: string[];
  points: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  genius: "Modo Genio",
  entertainment: "Entretenimiento",
  sports: "Deportes",
  culture: "Cultura Pop",
  random: "Datos Random",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  genius: "#6366f1",
  entertainment: "#ec4899",
  sports: "#22c55e",
  culture: "#f59e0b",
  random: "#06b6d4",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  genius: "🧠",
  entertainment: "🎬",
  sports: "⚽",
  culture: "🎵",
  random: "🎲",
};

export const questions: Question[] = [
  // GENIUS - EASY
  {
    id: 1, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos planetas tiene el sistema solar?",
    correct: "8",
    options: ["7", "8", "9", "10"],
  },
  {
    id: 2, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "El agua hierve a 100°C a nivel del mar.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 3, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué planeta es conocido como el Planeta Rojo?",
    correct: "Marte",
    options: ["Venus", "Júpiter", "Marte", "Saturno"],
  },
  {
    id: 4, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "Los seres humanos tienen 206 huesos en el cuerpo adulto.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 5, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es el elemento más abundante en la corteza terrestre?",
    correct: "Oxígeno",
    options: ["Silicio", "Oxígeno", "Aluminio", "Hierro"],
  },
  // GENIUS - MEDIUM
  {
    id: 6, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué año ocurrió la Revolución Francesa?",
    correct: "1789",
    options: ["1776", "1789", "1804", "1815"],
  },
  {
    id: 7, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "Albert Einstein ganó el Premio Nobel por la Teoría de la Relatividad.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 8, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es el hueso más largo del cuerpo humano?",
    correct: "Fémur",
    options: ["Tibia", "Húmero", "Fémur", "Radio"],
  },
  {
    id: 9, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién escribió 'El Quijote'?",
    correct: "Miguel de Cervantes",
    options: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Calderón de la Barca"],
  },
  {
    id: 10, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "La Gran Muralla China es visible desde el espacio a simple vista.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  // GENIUS - HARD
  {
    id: 11, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál es la constante de Planck aproximada?",
    correct: "6.626 × 10⁻³⁴ J·s",
    options: ["3.14 × 10⁻³⁴ J·s", "6.626 × 10⁻³⁴ J·s", "9.81 × 10⁻³⁴ J·s", "1.602 × 10⁻³⁴ J·s"],
  },
  {
    id: 12, category: "genius", difficulty: "hard", type: "truefalse", points: 400,
    question: "El ADN humano comparte aproximadamente el 60% con el de los plátanos.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 13, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿En qué año se publicó la Teoría General de la Relatividad de Einstein?",
    correct: "1915",
    options: ["1905", "1910", "1915", "1920"],
  },
  // ENTERTAINMENT - EASY
  {
    id: 14, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Quién interpreta a Iron Man en el universo Marvel?",
    correct: "Robert Downey Jr.",
    options: ["Chris Evans", "Robert Downey Jr.", "Mark Ruffalo", "Chris Hemsworth"],
  },
  {
    id: 15, category: "entertainment", difficulty: "easy", type: "truefalse", points: 100,
    question: "Harry Potter fue escrito por J.K. Rowling.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 16, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas temporadas tiene 'Breaking Bad'?",
    correct: "5",
    options: ["4", "5", "6", "7"],
  },
  {
    id: 17, category: "entertainment", difficulty: "easy", type: "truefalse", points: 100,
    question: "Titanic ganó el Oscar a Mejor Película en 1998.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  // ENTERTAINMENT - MEDIUM
  {
    id: 18, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué director realizó la trilogía 'El Señor de los Anillos'?",
    correct: "Peter Jackson",
    options: ["Steven Spielberg", "James Cameron", "Peter Jackson", "Christopher Nolan"],
  },
  {
    id: 19, category: "entertainment", difficulty: "medium", type: "truefalse", points: 200,
    question: "La película 'Avatar' (2009) es la más taquillera de la historia.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 20, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué año se estrenó la primera película de 'Star Wars'?",
    correct: "1977",
    options: ["1975", "1977", "1979", "1981"],
  },
  {
    id: 21, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién es el creador de la serie 'Game of Thrones'?",
    correct: "George R.R. Martin",
    options: ["J.R.R. Tolkien", "George R.R. Martin", "David Benioff", "R.R. Lovecraft"],
  },
  // ENTERTAINMENT - HARD
  {
    id: 22, category: "entertainment", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Qué película de Kubrick está basada en una novela de Arthur C. Clarke?",
    correct: "2001: A Space Odyssey",
    options: ["The Shining", "A Clockwork Orange", "2001: A Space Odyssey", "Full Metal Jacket"],
  },
  {
    id: 23, category: "entertainment", difficulty: "hard", type: "truefalse", points: 400,
    question: "El personaje Darth Vader fue interpretado por David Prowse en pantalla y voz de James Earl Jones.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  // SPORTS - EASY
  {
    id: 24, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos jugadores hay en un equipo de fútbol?",
    correct: "11",
    options: ["9", "10", "11", "12"],
  },
  {
    id: 25, category: "sports", difficulty: "easy", type: "truefalse", points: 100,
    question: "Usain Bolt es el hombre más rápido del mundo en los 100 metros.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 26, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos sets se juegan en un partido de tenis Grand Slam masculino?",
    correct: "5",
    options: ["3", "4", "5", "7"],
  },
  {
    id: 27, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿En qué país se originó el béisbol?",
    correct: "Estados Unidos",
    options: ["Cuba", "Japón", "Estados Unidos", "México"],
  },
  // SPORTS - MEDIUM
  {
    id: 28, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántas medallas de oro ganó Michael Phelps en los Juegos Olímpicos?",
    correct: "23",
    options: ["18", "20", "23", "25"],
  },
  {
    id: 29, category: "sports", difficulty: "medium", type: "truefalse", points: 200,
    question: "Brasil ha ganado más Copas del Mundo que cualquier otro país.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 30, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién tiene más títulos de Grand Slam en la historia del tenis masculino?",
    correct: "Novak Djokovic",
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
  },
  {
    id: 31, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué ciudad se celebraron los primeros Juegos Olímpicos modernos?",
    correct: "Atenas",
    options: ["París", "Londres", "Atenas", "Roma"],
  },
  // SPORTS - HARD
  {
    id: 32, category: "sports", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos cm mide el diámetro reglamentario de un aro de baloncesto NBA?",
    correct: "45.7 cm",
    options: ["40 cm", "43 cm", "45.7 cm", "50 cm"],
  },
  {
    id: 33, category: "sports", difficulty: "hard", type: "truefalse", points: 400,
    question: "El Tour de Francia tiene exactamente 21 etapas en cada edición.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  // CULTURE POP - EASY
  {
    id: 34, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos personajes de la Familia Simpsons viven en el 742 Evergreen Terrace?",
    correct: "5",
    options: ["3", "4", "5", "6"],
  },
  {
    id: 35, category: "culture", difficulty: "easy", type: "truefalse", points: 100,
    question: "Taylor Swift es conocida por tener eras o épocas en su carrera musical.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 36, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿En qué país se originó el anime?",
    correct: "Japón",
    options: ["Corea del Sur", "China", "Japón", "Tailandia"],
  },
  {
    id: 37, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál de estos es un juego de Nintendo?",
    correct: "Mario Kart",
    options: ["Halo", "Mario Kart", "Call of Duty", "Fortnite"],
  },
  // CULTURE POP - MEDIUM
  {
    id: 38, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál fue el primer álbum de estudio de Beyoncé en solitario?",
    correct: "Dangerously in Love",
    options: ["Lemonade", "B'Day", "Dangerously in Love", "4"],
  },
  {
    id: 39, category: "culture", difficulty: "medium", type: "truefalse", points: 200,
    question: "El personaje de Deadpool fue creado originalmente como parodia de Deathstroke de DC.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 40, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué show de Netflix tiene como protagonista a una adolescente que viaja en el tiempo?",
    correct: "Dark",
    options: ["Stranger Things", "Dark", "Black Mirror", "Manifest"],
  },
  {
    id: 41, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién compuso la banda sonora de Star Wars?",
    correct: "John Williams",
    options: ["Hans Zimmer", "John Williams", "Ennio Morricone", "Howard Shore"],
  },
  // CULTURE POP - HARD
  {
    id: 42, category: "culture", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos Infinity Stones existen en el universo Marvel?",
    correct: "6",
    options: ["4", "5", "6", "7"],
  },
  {
    id: 43, category: "culture", difficulty: "hard", type: "truefalse", points: 400,
    question: "El videojuego 'The Last of Us' fue desarrollado originalmente por Rockstar Games.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  // RANDOM - EASY
  {
    id: 44, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos colores tiene el arcoíris?",
    correct: "7",
    options: ["5", "6", "7", "8"],
  },
  {
    id: 45, category: "random", difficulty: "easy", type: "truefalse", points: 100,
    question: "Las vacas pueden subir escaleras pero no bajarlas.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 46, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas patas tiene una araña?",
    correct: "8",
    options: ["6", "7", "8", "10"],
  },
  {
    id: 47, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es el país más grande del mundo?",
    correct: "Rusia",
    options: ["China", "Canadá", "Rusia", "Brasil"],
  },
  // RANDOM - MEDIUM
  {
    id: 48, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos gramos de azúcar hay en una lata de Coca-Cola de 330ml?",
    correct: "35g",
    options: ["25g", "30g", "35g", "42g"],
  },
  {
    id: 49, category: "random", difficulty: "medium", type: "truefalse", points: 200,
    question: "Los pulpos tienen tres corazones.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 50, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos segundos tiene un día?",
    correct: "86,400",
    options: ["36,000", "72,000", "86,400", "100,000"],
  },
  {
    id: 51, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué animal tiene la lengua más larga en relación a su cuerpo?",
    correct: "Camaleón",
    options: ["Hormiga hormiguero", "Rana", "Camaleón", "Serpiente"],
  },
  // RANDOM - HARD
  {
    id: 52, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿A qué temperatura en Fahrenheit hierve el agua?",
    correct: "212°F",
    options: ["180°F", "200°F", "212°F", "220°F"],
  },
  {
    id: 53, category: "random", difficulty: "hard", type: "truefalse", points: 400,
    question: "La miel nunca se echa a perder, se han encontrado jarras de miel comestible de 3000 años en Egipto.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 54, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuánto tiempo tarda la luz del Sol en llegar a la Tierra?",
    correct: "8 minutos",
    options: ["3 minutos", "8 minutos", "15 minutos", "1 hora"],
  },
];

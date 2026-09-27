export type QuestionType = "multiple" | "truefalse" | "short";
export type Category = "genius" | "entertainment" | "sports" | "culture" | "random";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  course?: string;
  subject?: string;
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
  genius: "#3b82f6",
  entertainment: "#60a5fa",
  sports: "#93c5fd",
  culture: "#818cf8",
  random: "#a5b4fc",
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

  // ── CULTURA GENERAL EXTRA - EASY ─────────────────────────────────────────
  {
    id: 55, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es la capital de Francia?",
    correct: "París",
    options: ["Londres", "Berlín", "París", "Madrid"],
  },
  {
    id: 56, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "El río Nilo es el más largo del mundo.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 57, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos continentes hay en la Tierra?",
    correct: "7",
    options: ["5", "6", "7", "8"],
  },
  {
    id: 58, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué país tiene la bandera con el círculo rojo sobre fondo blanco?",
    correct: "Japón",
    options: ["China", "Japón", "Corea del Sur", "Singapur"],
  },
  {
    id: 59, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "La Torre Eiffel está en Roma.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 60, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es el océano más grande del mundo?",
    correct: "Pacífico",
    options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
  },
  {
    id: 61, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿De qué color es el cielo en un día despejado?",
    correct: "Azul",
    options: ["Verde", "Azul", "Amarillo", "Gris"],
  },
  {
    id: 62, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es el animal terrestre más rápido?",
    correct: "Guepardo",
    options: ["León", "Guepardo", "Caballo", "Avestruz"],
  },
  {
    id: 63, category: "random", difficulty: "easy", type: "truefalse", points: 100,
    question: "Los delfines son mamíferos.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 64, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos días tiene un año bisiesto?",
    correct: "366",
    options: ["364", "365", "366", "367"],
  },

  // ── CULTURA GENERAL EXTRA - MEDIUM ────────────────────────────────────────
  {
    id: 65, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién pintó la Capilla Sixtina?",
    correct: "Miguel Ángel",
    options: ["Leonardo da Vinci", "Rafael", "Miguel Ángel", "Botticelli"],
  },
  {
    id: 66, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué año llegó el hombre a la Luna por primera vez?",
    correct: "1969",
    options: ["1965", "1967", "1969", "1972"],
  },
  {
    id: 67, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "Shakespeare nació en Stratford-upon-Avon, Inglaterra.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 68, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es el símbolo químico del oro?",
    correct: "Au",
    options: ["Go", "Or", "Au", "Ag"],
  },
  {
    id: 69, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es la montaña más alta del mundo?",
    correct: "Everest",
    options: ["K2", "Aconcagua", "Everest", "Kilimanjaro"],
  },
  {
    id: 70, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué país nació Napoleón Bonaparte?",
    correct: "Córcega (Francia)",
    options: ["Francia", "Italia", "Córcega (Francia)", "Bélgica"],
  },
  {
    id: 71, category: "random", difficulty: "medium", type: "truefalse", points: 200,
    question: "El corazón humano late alrededor de 100,000 veces al día.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 72, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué país tiene más lagos naturales en el mundo?",
    correct: "Canadá",
    options: ["Rusia", "Estados Unidos", "Canadá", "Brasil"],
  },
  {
    id: 73, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos lados tiene un hexágono?",
    correct: "6",
    options: ["5", "6", "7", "8"],
  },
  {
    id: 74, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es la lengua más hablada en el mundo?",
    correct: "Mandarín",
    options: ["Inglés", "Español", "Mandarín", "Hindi"],
  },
  {
    id: 75, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién fue el primer presidente de Estados Unidos?",
    correct: "George Washington",
    options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
  },
  {
    id: 76, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "El ADN tiene forma de doble hélice.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 77, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos huesos tiene la mano humana?",
    correct: "27",
    options: ["18", "22", "27", "31"],
  },
  {
    id: 78, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es el país más pequeño del mundo?",
    correct: "Ciudad del Vaticano",
    options: ["Mónaco", "San Marino", "Ciudad del Vaticano", "Liechtenstein"],
  },

  // ── CULTURA GENERAL EXTRA - HARD ──────────────────────────────────────────
  {
    id: 79, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál es el número de Avogadro (aproximado)?",
    correct: "6.022 × 10²³",
    options: ["3.14 × 10²³", "6.022 × 10²³", "9.8 × 10²³", "1.6 × 10²³"],
  },
  {
    id: 80, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿En qué siglo vivió Leonardo da Vinci?",
    correct: "Siglo XV–XVI",
    options: ["Siglo XIII–XIV", "Siglo XIV–XV", "Siglo XV–XVI", "Siglo XVI–XVII"],
  },
  {
    id: 81, category: "genius", difficulty: "hard", type: "truefalse", points: 400,
    question: "La velocidad de la luz en el vacío es exactamente 299,792,458 m/s.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 82, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál fue el primer país en conceder el voto a la mujer?",
    correct: "Nueva Zelanda",
    options: ["Australia", "Finlandia", "Nueva Zelanda", "Noruega"],
  },
  {
    id: 83, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos cromosomas tiene una célula humana normal?",
    correct: "46",
    options: ["23", "44", "46", "48"],
  },
  {
    id: 84, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cómo se llama el proceso por el que las plantas convierten luz en energía?",
    correct: "Fotosíntesis",
    options: ["Respiración celular", "Fotosíntesis", "Oxidación", "Glucólisis"],
  },
  {
    id: 85, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿En qué año cayó el Muro de Berlín?",
    correct: "1989",
    options: ["1985", "1987", "1989", "1991"],
  },
  {
    id: 86, category: "genius", difficulty: "hard", type: "truefalse", points: 400,
    question: "El Mar Muerto es el lago salado más bajo del mundo en altitud.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 87, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Qué filósofo griego fue maestro de Aristóteles?",
    correct: "Platón",
    options: ["Sócrates", "Platón", "Heráclito", "Epicuro"],
  },
  {
    id: 88, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál es la distancia media de la Tierra a la Luna?",
    correct: "384,400 km",
    options: ["150,000 km", "250,000 km", "384,400 km", "500,000 km"],
  },

  // ── LOTE 3 — GENIUS EASY ──────────────────────────────────────────────────
  {
    id: 89, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas letras tiene el alfabeto español?",
    correct: "27",
    options: ["24", "25", "27", "29"],
  },
  {
    id: 90, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "El Sol es una estrella.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 91, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas horas tiene un día?",
    correct: "24",
    options: ["12", "24", "36", "48"],
  },
  {
    id: 92, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué planeta está más cerca del Sol?",
    correct: "Mercurio",
    options: ["Venus", "Mercurio", "Marte", "Tierra"],
  },
  {
    id: 93, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "El corazón humano está del lado izquierdo del pecho.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 94, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuál es el elemento más ligero de la tabla periódica?",
    correct: "Hidrógeno",
    options: ["Helio", "Hidrógeno", "Litio", "Boro"],
  },
  {
    id: 95, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos lados tiene un triángulo?",
    correct: "3",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 96, category: "genius", difficulty: "easy", type: "truefalse", points: 100,
    question: "Los pingüinos viven en el Ártico (Polo Norte).",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 97, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas semanas tiene un año?",
    correct: "52",
    options: ["48", "50", "52", "54"],
  },
  {
    id: 98, category: "genius", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué gas respiramos principalmente?",
    correct: "Nitrógeno",
    options: ["Oxígeno", "Nitrógeno", "CO₂", "Argón"],
  },

  // ── LOTE 3 — GENIUS MEDIUM ────────────────────────────────────────────────
  {
    id: 99, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos huesos tiene la columna vertebral humana?",
    correct: "33",
    options: ["26", "29", "33", "37"],
  },
  {
    id: 100, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué país nació Marie Curie?",
    correct: "Polonia",
    options: ["Francia", "Alemania", "Polonia", "Rusia"],
  },
  {
    id: 101, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "El sonido viaja más rápido que la luz.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 102, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es el río más largo de América del Sur?",
    correct: "Amazonas",
    options: ["Paraná", "Orinoco", "Amazonas", "Río de la Plata"],
  },
  {
    id: 103, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos países tiene América del Sur?",
    correct: "12",
    options: ["10", "11", "12", "14"],
  },
  {
    id: 104, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es la capital de Australia?",
    correct: "Canberra",
    options: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
  },
  {
    id: 105, category: "genius", difficulty: "medium", type: "truefalse", points: 200,
    question: "El Everest crece aproximadamente 4 mm cada año por movimiento de placas tectónicas.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 106, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál es el metal más conductor de la electricidad?",
    correct: "Plata",
    options: ["Cobre", "Oro", "Plata", "Aluminio"],
  },
  {
    id: 107, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos meses tienen 31 días?",
    correct: "7",
    options: ["5", "6", "7", "8"],
  },
  {
    id: 108, category: "genius", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué país tiene más premios Nobel per cápita?",
    correct: "Suiza",
    options: ["Estados Unidos", "Suecia", "Suiza", "Alemania"],
  },

  // ── LOTE 3 — GENIUS HARD ──────────────────────────────────────────────────
  {
    id: 109, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál es la fórmula de la velocidad en física clásica?",
    correct: "v = d/t",
    options: ["v = m×a", "v = d/t", "v = F/m", "v = P/t"],
  },
  {
    id: 110, category: "genius", difficulty: "hard", type: "truefalse", points: 400,
    question: "El universo tiene aproximadamente 13,800 millones de años.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 111, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cómo se llama la parte del átomo con carga negativa?",
    correct: "Electrón",
    options: ["Protón", "Neutrón", "Electrón", "Fotón"],
  },
  {
    id: 112, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿En qué año publicó Darwin 'El Origen de las Especies'?",
    correct: "1859",
    options: ["1842", "1851", "1859", "1871"],
  },

  // ── LOTE 3 — ENTRETENIMIENTO EASY ────────────────────────────────────────
  {
    id: 113, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cómo se llama el personaje principal de 'El Rey León'?",
    correct: "Simba",
    options: ["Pumba", "Simba", "Nala", "Mufasa"],
  },
  {
    id: 114, category: "entertainment", difficulty: "easy", type: "truefalse", points: 100,
    question: "Spider-Man fue creado por Marvel Comics.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 115, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿En qué ciudad ficticia vive Batman?",
    correct: "Gotham",
    options: ["Metrópolis", "Gotham", "Star City", "Central City"],
  },
  {
    id: 116, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántas películas principales tiene la saga 'El Señor de los Anillos' de Jackson?",
    correct: "3",
    options: ["2", "3", "4", "6"],
  },
  {
    id: 117, category: "entertainment", difficulty: "easy", type: "truefalse", points: 100,
    question: "The Beatles eran originalmente de Liverpool, Inglaterra.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 118, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué estudio produjo 'Toy Story'?",
    correct: "Pixar",
    options: ["DreamWorks", "Pixar", "Warner Bros", "Disney"],
  },
  {
    id: 119, category: "entertainment", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Quién interpreta a Hermione Granger en las películas de Harry Potter?",
    correct: "Emma Watson",
    options: ["Emma Stone", "Emma Watson", "Keira Knightley", "Helena Carter"],
  },

  // ── LOTE 3 — ENTRETENIMIENTO MEDIUM ──────────────────────────────────────
  {
    id: 120, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué película ganó el Óscar a Mejor Película en 2020?",
    correct: "Parásitos",
    options: ["1917", "Joker", "Parásitos", "Había una vez en Hollywood"],
  },
  {
    id: 121, category: "entertainment", difficulty: "medium", type: "truefalse", points: 200,
    question: "El personaje de 'The Mandalorian' se llama Din Djarin.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 122, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos episodios tiene la primera temporada de 'Stranger Things'?",
    correct: "8",
    options: ["6", "8", "9", "10"],
  },
  {
    id: 123, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Quién dirigió la película 'Oppenheimer' (2023)?",
    correct: "Christopher Nolan",
    options: ["Denis Villeneuve", "Ridley Scott", "Christopher Nolan", "Martin Scorsese"],
  },
  {
    id: 124, category: "entertainment", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué año se estrenó 'Jurassic Park'?",
    correct: "1993",
    options: ["1990", "1992", "1993", "1995"],
  },
  {
    id: 125, category: "entertainment", difficulty: "medium", type: "truefalse", points: 200,
    question: "Heath Ledger ganó el Óscar póstumo por su papel de The Joker.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — ENTRETENIMIENTO HARD ────────────────────────────────────────
  {
    id: 126, category: "entertainment", difficulty: "hard", type: "multiple", points: 400,
    question: "¿En qué película Marlon Brando interpreta al Padrino?",
    correct: "The Godfather (1972)",
    options: ["Apocalypse Now", "The Godfather (1972)", "Streetcar Named Desire", "Last Tango"],
  },
  {
    id: 127, category: "entertainment", difficulty: "hard", type: "truefalse", points: 400,
    question: "La serie 'The Wire' fue creada por David Simon.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — DEPORTES EASY ────────────────────────────────────────────────
  {
    id: 128, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos minutos dura un partido de fútbol reglamentario?",
    correct: "90",
    options: ["60", "80", "90", "120"],
  },
  {
    id: 129, category: "sports", difficulty: "easy", type: "truefalse", points: 100,
    question: "La natación es un deporte olímpico.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 130, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos jugadores hay en un equipo de baloncesto en la cancha?",
    correct: "5",
    options: ["4", "5", "6", "7"],
  },
  {
    id: 131, category: "sports", difficulty: "easy", type: "multiple", points: 100,
    question: "¿De qué país es el deporte llamado 'sumo'?",
    correct: "Japón",
    options: ["China", "Corea", "Japón", "Mongolia"],
  },
  {
    id: 132, category: "sports", difficulty: "easy", type: "truefalse", points: 100,
    question: "El tenis se juega en una cancha con red.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — DEPORTES MEDIUM ──────────────────────────────────────────────
  {
    id: 133, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos Grand Slams ganó Roger Federer en su carrera?",
    correct: "20",
    options: ["17", "19", "20", "22"],
  },
  {
    id: 134, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué país organizó la Copa del Mundo de fútbol en 2018?",
    correct: "Rusia",
    options: ["Francia", "Rusia", "Brasil", "Qatar"],
  },
  {
    id: 135, category: "sports", difficulty: "medium", type: "truefalse", points: 200,
    question: "Argentina ganó la Copa del Mundo 2022 en Qatar.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 136, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos equipos participan en la NBA?",
    correct: "30",
    options: ["28", "29", "30", "32"],
  },
  {
    id: 137, category: "sports", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué deporte se usa el término 'hat-trick'?",
    correct: "Fútbol",
    options: ["Rugby", "Cricket", "Fútbol", "Hockey"],
  },
  {
    id: 138, category: "sports", difficulty: "medium", type: "truefalse", points: 200,
    question: "Michael Jordan jugó para los Chicago Bulls toda su carrera.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — DEPORTES HARD ────────────────────────────────────────────────
  {
    id: 139, category: "sports", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos goles marcó Pelé en su carrera oficial?",
    correct: "767",
    options: ["650", "700", "767", "800"],
  },
  {
    id: 140, category: "sports", difficulty: "hard", type: "truefalse", points: 400,
    question: "El maratón mide exactamente 42.195 km.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — CULTURA POP EASY ─────────────────────────────────────────────
  {
    id: 141, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cómo se llama el protagonista de 'Naruto'?",
    correct: "Naruto Uzumaki",
    options: ["Sasuke Uchiha", "Naruto Uzumaki", "Sakura Haruno", "Kakashi"],
  },
  {
    id: 142, category: "culture", difficulty: "easy", type: "truefalse", points: 100,
    question: "BTS es un grupo de k-pop surcoreano.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 143, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué videojuego tiene al personaje 'Link'?",
    correct: "The Legend of Zelda",
    options: ["Final Fantasy", "The Legend of Zelda", "Dark Souls", "Pokémon"],
  },
  {
    id: 144, category: "culture", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cómo se llama el drag queen que conduce 'RuPaul's Drag Race'?",
    correct: "RuPaul",
    options: ["Lady Gaga", "RuPaul", "Divine", "Alaska"],
  },
  {
    id: 145, category: "culture", difficulty: "easy", type: "truefalse", points: 100,
    question: "Instagram fue comprada por Facebook (Meta).",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — CULTURA POP MEDIUM ───────────────────────────────────────────
  {
    id: 146, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué año lanzó Adele su álbum '25'?",
    correct: "2015",
    options: ["2013", "2014", "2015", "2016"],
  },
  {
    id: 147, category: "culture", difficulty: "medium", type: "truefalse", points: 200,
    question: "Minecraft fue desarrollado originalmente por Markus 'Notch' Persson.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 148, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cómo se llama el alter ego de Beyoncé?",
    correct: "Sasha Fierce",
    options: ["Lemonade", "Sasha Fierce", "Queen Bey", "Ivy Park"],
  },
  {
    id: 149, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué serie de Netflix tiene a un personaje llamado 'El Profesor'?",
    correct: "La Casa de Papel",
    options: ["Élite", "La Casa de Papel", "Narcos", "Club de Cuervos"],
  },
  {
    id: 150, category: "culture", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuál fue el primer anime en ganar el Óscar a Mejor Película Animada?",
    correct: "El viaje de Chihiro",
    options: ["Akira", "Ghost in the Shell", "El viaje de Chihiro", "Princesa Mononoke"],
  },

  // ── LOTE 3 — CULTURA POP HARD ─────────────────────────────────────────────
  {
    id: 151, category: "culture", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Qué artista tuvo el álbum más vendido del siglo XXI hasta 2020?",
    correct: "Adele — 21",
    options: ["Taylor Swift — 1989", "Adele — 21", "Ed Sheeran — ÷", "Michael Jackson — Thriller"],
  },
  {
    id: 152, category: "culture", difficulty: "hard", type: "truefalse", points: 400,
    question: "El juego 'Among Us' fue desarrollado por un estudio llamado InnerSloth.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — RANDOM EASY ──────────────────────────────────────────────────
  {
    id: 153, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿De qué color es la sangre oxigenada?",
    correct: "Rojo brillante",
    options: ["Azul", "Morado", "Rojo brillante", "Verde"],
  },
  {
    id: 154, category: "random", difficulty: "easy", type: "truefalse", points: 100,
    question: "Los gatos tienen 4 patas.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 155, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Cuántos lados tiene un cubo?",
    correct: "6",
    options: ["4", "5", "6", "8"],
  },
  {
    id: 156, category: "random", difficulty: "easy", type: "multiple", points: 100,
    question: "¿Qué animal es conocido como el rey de la selva?",
    correct: "León",
    options: ["Tigre", "Leopardo", "León", "Jaguar"],
  },
  {
    id: 157, category: "random", difficulty: "easy", type: "truefalse", points: 100,
    question: "El café contiene cafeína.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — RANDOM MEDIUM ────────────────────────────────────────────────
  {
    id: 158, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántas rayas tiene la bandera de Estados Unidos?",
    correct: "13",
    options: ["10", "12", "13", "15"],
  },
  {
    id: 159, category: "random", difficulty: "medium", type: "truefalse", points: 200,
    question: "Los tiburones son mamíferos.",
    correct: "Falso",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 160, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿En qué continente está Egipto?",
    correct: "África",
    options: ["Asia", "Europa", "África", "Medio Oriente"],
  },
  {
    id: 161, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Cuántos ojos tiene una araña típica?",
    correct: "8",
    options: ["2", "4", "6", "8"],
  },
  {
    id: 162, category: "random", difficulty: "medium", type: "multiple", points: 200,
    question: "¿Qué planeta tiene los anillos más visibles?",
    correct: "Saturno",
    options: ["Júpiter", "Urano", "Neptuno", "Saturno"],
  },
  {
    id: 163, category: "random", difficulty: "medium", type: "truefalse", points: 200,
    question: "El chocolate negro es más amargo que el chocolate con leche.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },

  // ── LOTE 3 — RANDOM HARD ──────────────────────────────────────────────────
  {
    id: 164, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos huesos tiene la mano humana incluyendo la muñeca?",
    correct: "27",
    options: ["21", "25", "27", "30"],
  },
  {
    id: 165, category: "random", difficulty: "hard", type: "truefalse", points: 400,
    question: "El oro puro (24 quilates) es demasiado blando para usarse en joyería sin alearse.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 166, category: "random", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuál es el país con mayor número de lagos del mundo?",
    correct: "Canadá",
    options: ["Finlandia", "Rusia", "Canadá", "Brasil"],
  },
  {
    id: 167, category: "genius", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuántos bits tiene 1 byte?",
    correct: "8",
    options: ["4", "8", "16", "32"],
  },
  {
    id: 168, category: "genius", difficulty: "hard", type: "truefalse", points: 400,
    question: "La tabla periódica fue propuesta por Dmitri Mendeléyev en 1869.",
    correct: "Verdadero",
    options: ["Verdadero", "Falso"],
  },
  {
    id: 169, category: "sports", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Cuánto mide la red en un partido oficial de voleibol?",
    correct: "2.43 m (hombres)",
    options: ["2.20 m", "2.35 m", "2.43 m (hombres)", "2.50 m"],
  },
  {
    id: 170, category: "entertainment", difficulty: "hard", type: "multiple", points: 400,
    question: "¿Qué novela es la base de la película 'Blade Runner'?",
    correct: "¿Sueñan los androides con ovejas eléctricas?",
    options: ["Neuromancer", "¿Sueñan los androides con ovejas eléctricas?", "1984", "Brave New World"],
  },
];

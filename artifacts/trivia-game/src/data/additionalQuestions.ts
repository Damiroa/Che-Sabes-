import type { Question } from "./questions";
import { ACADEMIC_CATEGORIES, type AcademicCategory } from "./categories";

// Stable IDs follow the supplied list. Entries 26 and 95 already exist in
// courseQuestions; entry 81 is covered by entry 87. Do not recycle their IDs.
type Entry = { id: number; category: AcademicCategory; difficulty: "easy" | "medium"; question: string; correct: string; options: [string, string, string, string] };
const entries: Entry[] = [
  {
    "id": 10001,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuánto es 12 × 9?",
    "correct": "108",
    "options": [
      "96",
      "112",
      "120",
      "108"
    ]
  },
  {
    "id": 10002,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuánto es 144 ÷ 12?",
    "correct": "12",
    "options": [
      "14",
      "16",
      "12",
      "10"
    ]
  },
  {
    "id": 10003,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuál es el 25% de 80?",
    "correct": "20",
    "options": [
      "40",
      "20",
      "15",
      "25"
    ]
  },
  {
    "id": 10004,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuánto es 7²?",
    "correct": "49",
    "options": [
      "49",
      "14",
      "42",
      "77"
    ]
  },
  {
    "id": 10005,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuánto es 3³?",
    "correct": "27",
    "options": [
      "9",
      "18",
      "81",
      "27"
    ]
  },
  {
    "id": 10006,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuál es el número primo entre 14, 15, 17 y 21?",
    "correct": "17",
    "options": [
      "15",
      "21",
      "17",
      "14"
    ]
  },
  {
    "id": 10007,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuántos grados tiene un ángulo recto?",
    "correct": "90°",
    "options": [
      "360°",
      "90°",
      "45°",
      "180°"
    ]
  },
  {
    "id": 10008,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "¿Cuántos centímetros hay en un metro?",
    "correct": "100",
    "options": [
      "100",
      "10",
      "1000",
      "60"
    ]
  },
  {
    "id": 10009,
    "category": "Mathematics",
    "difficulty": "easy",
    "question": "Si un triángulo tiene sus tres ángulos de 60°, ¿qué tipo de triángulo es?",
    "correct": "Equilátero",
    "options": [
      "Escaleno",
      "Rectángulo",
      "Obtusángulo",
      "Equilátero"
    ]
  },
  {
    "id": 10010,
    "category": "Mathematics",
    "difficulty": "medium",
    "question": "¿Cuánto es 2/5 expresado como decimal?",
    "correct": "0,4",
    "options": [
      "0,5",
      "2,5",
      "0,4",
      "0,2"
    ]
  },
  {
    "id": 10011,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Cuál es el antónimo de \"alto\"?",
    "correct": "Bajo",
    "options": [
      "Elevado",
      "Bajo",
      "Grande",
      "Largo"
    ]
  },
  {
    "id": 10012,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Cuál es el plural de \"papel\"?",
    "correct": "Papeles",
    "options": [
      "Papeles",
      "Papels",
      "Papel",
      "Papelas"
    ]
  },
  {
    "id": 10013,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Qué tipo de palabra es \"rápidamente\"?",
    "correct": "Adverbio",
    "options": [
      "Sustantivo",
      "Verbo",
      "Artículo",
      "Adverbio"
    ]
  },
  {
    "id": 10014,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Cuál es el sujeto en \"Juan juega al fútbol\"?",
    "correct": "Juan",
    "options": [
      "Al fútbol",
      "Fútbol",
      "Juan",
      "Juega"
    ]
  },
  {
    "id": 10015,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Qué es un verbo?",
    "correct": "Una palabra que expresa una acción, estado o proceso",
    "options": [
      "Una palabra que siempre indica cantidad",
      "Una palabra que expresa una acción, estado o proceso",
      "Una palabra que solo nombra objetos",
      "Un signo de puntuación"
    ]
  },
  {
    "id": 10016,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Cuál es el sinónimo de \"feliz\"?",
    "correct": "Contento",
    "options": [
      "Contento",
      "Triste",
      "Enojado",
      "Cansado"
    ]
  },
  {
    "id": 10017,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Qué signo se utiliza para separar elementos de una enumeración?",
    "correct": "Coma",
    "options": [
      "Punto final",
      "Signo de interrogación",
      "Paréntesis",
      "Coma"
    ]
  },
  {
    "id": 10018,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Qué es una novela?",
    "correct": "Una obra narrativa extensa",
    "options": [
      "Una noticia breve",
      "Una instrucción de tránsito",
      "Una obra narrativa extensa",
      "Una lista de palabras"
    ]
  },
  {
    "id": 10019,
    "category": "Language and Literature",
    "difficulty": "medium",
    "question": "¿Qué género literario suele estar escrito para ser representado?",
    "correct": "Dramático",
    "options": [
      "Ensayístico",
      "Dramático",
      "Lírico",
      "Épico"
    ]
  },
  {
    "id": 10020,
    "category": "Language and Literature",
    "difficulty": "easy",
    "question": "¿Qué palabra está correctamente escrita?",
    "correct": "Excepción",
    "options": [
      "Excepción",
      "Exepción",
      "Exección",
      "Excepsión"
    ]
  },
  {
    "id": 10021,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Qué pueblo construyó las pirámides de Giza?",
    "correct": "Los egipcios",
    "options": [
      "Los romanos",
      "Los incas",
      "Los persas",
      "Los egipcios"
    ]
  },
  {
    "id": 10022,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Dónde se desarrolló principalmente la antigua civilización griega?",
    "correct": "Grecia",
    "options": [
      "México",
      "Noruega",
      "Grecia",
      "China"
    ]
  },
  {
    "id": 10023,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Quién fue Julio César?",
    "correct": "Un líder político y militar romano",
    "options": [
      "Un navegante portugués",
      "Un líder político y militar romano",
      "Un faraón egipcio",
      "Un emperador chino"
    ]
  },
  {
    "id": 10024,
    "category": "History",
    "difficulty": "medium",
    "question": "¿Qué acontecimiento marca el comienzo de la Edad Moderna en la periodización que toma 1492 como inicio?",
    "correct": "La llegada europea a América en 1492",
    "options": [
      "La llegada europea a América en 1492",
      "La Revolución Francesa",
      "La caída del Muro de Berlín",
      "La Primera Guerra Mundial"
    ]
  },
  {
    "id": 10025,
    "category": "History",
    "difficulty": "medium",
    "question": "¿Qué invento está asociado con Johannes Gutenberg?",
    "correct": "La imprenta de tipos móviles",
    "options": [
      "El teléfono",
      "La máquina de vapor",
      "La brújula",
      "La imprenta de tipos móviles"
    ]
  },
  {
    "id": 10027,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Qué muro cayó en 1989 y se convirtió en símbolo del fin de la Guerra Fría?",
    "correct": "El Muro de Berlín",
    "options": [
      "Las murallas de Ávila",
      "El Muro de Berlín",
      "La Gran Muralla China",
      "El Muro de Adriano"
    ]
  },
  {
    "id": 10028,
    "category": "History",
    "difficulty": "medium",
    "question": "¿Qué imperio tuvo como capital a Constantinopla?",
    "correct": "El Imperio Bizantino",
    "options": [
      "El Imperio Bizantino",
      "El Imperio Inca",
      "El Imperio Azteca",
      "El Imperio Mongol"
    ]
  },
  {
    "id": 10029,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Qué civilización utilizó jeroglíficos?",
    "correct": "La civilización egipcia",
    "options": [
      "La civilización vikinga",
      "La civilización inca",
      "La civilización romana",
      "La civilización egipcia"
    ]
  },
  {
    "id": 10030,
    "category": "History",
    "difficulty": "easy",
    "question": "¿Qué conflicto enfrentó principalmente a los Aliados y las Potencias del Eje?",
    "correct": "La Segunda Guerra Mundial",
    "options": [
      "La Guerra de Crimea",
      "La Guerra de las Malvinas",
      "La Segunda Guerra Mundial",
      "La Guerra de los Cien Años"
    ]
  },
  {
    "id": 10031,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es la capital de Italia?",
    "correct": "Roma",
    "options": [
      "Nápoles",
      "Roma",
      "Milán",
      "Venecia"
    ]
  },
  {
    "id": 10032,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es la capital de Japón?",
    "correct": "Tokio",
    "options": [
      "Tokio",
      "Kioto",
      "Osaka",
      "Seúl"
    ]
  },
  {
    "id": 10033,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es la capital de España?",
    "correct": "Madrid",
    "options": [
      "Barcelona",
      "Sevilla",
      "Valencia",
      "Madrid"
    ]
  },
  {
    "id": 10034,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es el río que atraviesa Egipto y desemboca en el Mediterráneo?",
    "correct": "Nilo",
    "options": [
      "Danubio",
      "Ganges",
      "Nilo",
      "Amazonas"
    ]
  },
  {
    "id": 10035,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿En qué continente está Australia?",
    "correct": "Oceanía",
    "options": [
      "Europa",
      "Oceanía",
      "Asia",
      "África"
    ]
  },
  {
    "id": 10036,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es el desierto cálido más grande del mundo?",
    "correct": "Sahara",
    "options": [
      "Sahara",
      "Gobi",
      "Atacama",
      "Kalahari"
    ]
  },
  {
    "id": 10037,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es el país conocido por tener forma de bota?",
    "correct": "Italia",
    "options": [
      "Portugal",
      "Grecia",
      "Suecia",
      "Italia"
    ]
  },
  {
    "id": 10038,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Qué cordillera atraviesa gran parte del oeste de Sudamérica?",
    "correct": "Los Andes",
    "options": [
      "El Himalaya",
      "Los Pirineos",
      "Los Andes",
      "Los Alpes"
    ]
  },
  {
    "id": 10039,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es el océano que separa América de Europa y África?",
    "correct": "Atlántico",
    "options": [
      "Ártico",
      "Atlántico",
      "Pacífico",
      "Índico"
    ]
  },
  {
    "id": 10040,
    "category": "Geography",
    "difficulty": "easy",
    "question": "¿Cuál es la capital de Brasil?",
    "correct": "Brasilia",
    "options": [
      "Brasilia",
      "Río de Janeiro",
      "São Paulo",
      "Salvador"
    ]
  },
  {
    "id": 10041,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué órganos utilizamos principalmente para respirar?",
    "correct": "Pulmones",
    "options": [
      "Riñones",
      "Intestinos",
      "Oídos",
      "Pulmones"
    ]
  },
  {
    "id": 10042,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué parte de la planta absorbe agua y minerales del suelo?",
    "correct": "Raíz",
    "options": [
      "Fruto",
      "Semilla",
      "Raíz",
      "Flor"
    ]
  },
  {
    "id": 10043,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué pigmento permite a las plantas captar gran parte de la luz para la fotosíntesis?",
    "correct": "Clorofila",
    "options": [
      "Queratina",
      "Clorofila",
      "Melanina",
      "Hemoglobina"
    ]
  },
  {
    "id": 10044,
    "category": "Biology",
    "difficulty": "medium",
    "question": "¿Qué sistema se encarga de transportar la sangre?",
    "correct": "Sistema circulatorio",
    "options": [
      "Sistema circulatorio",
      "Sistema digestivo",
      "Sistema óseo",
      "Sistema respiratorio"
    ]
  },
  {
    "id": 10045,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué órgano controla gran parte de las funciones del sistema nervioso?",
    "correct": "Cerebro",
    "options": [
      "Estómago",
      "Hígado",
      "Páncreas",
      "Cerebro"
    ]
  },
  {
    "id": 10046,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué animales tienen columna vertebral?",
    "correct": "Vertebrados",
    "options": [
      "Moluscos",
      "Artrópodos",
      "Vertebrados",
      "Invertebrados"
    ]
  },
  {
    "id": 10047,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué tipo de animal es una rana?",
    "correct": "Anfibio",
    "options": [
      "Pez",
      "Anfibio",
      "Reptil",
      "Mamífero"
    ]
  },
  {
    "id": 10048,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué tipo de animal es una ballena?",
    "correct": "Mamífero",
    "options": [
      "Mamífero",
      "Pez",
      "Anfibio",
      "Reptil"
    ]
  },
  {
    "id": 10049,
    "category": "Biology",
    "difficulty": "easy",
    "question": "¿Qué gas liberan las plantas durante la fotosíntesis?",
    "correct": "Oxígeno",
    "options": [
      "Nitrógeno",
      "Helio",
      "Hidrógeno",
      "Oxígeno"
    ]
  },
  {
    "id": 10050,
    "category": "Biology",
    "difficulty": "medium",
    "question": "¿Qué estructura contiene la mayor parte del material genético en las células eucariotas?",
    "correct": "Núcleo",
    "options": [
      "Ribosoma",
      "Aparato de Golgi",
      "Núcleo",
      "Membrana plasmática"
    ]
  },
  {
    "id": 10051,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué unidad se utiliza para medir la masa?",
    "correct": "Kilogramo",
    "options": [
      "Kelvin",
      "Kilogramo",
      "Metro",
      "Segundo"
    ]
  },
  {
    "id": 10052,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué unidad se utiliza para medir el tiempo?",
    "correct": "Segundo",
    "options": [
      "Segundo",
      "Kilogramo",
      "Newton",
      "Amperio"
    ]
  },
  {
    "id": 10053,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué fenómeno hace que un objeto caiga hacia la Tierra?",
    "correct": "Gravedad",
    "options": [
      "Reflexión",
      "Evaporación",
      "Magnetismo terrestre",
      "Gravedad"
    ]
  },
  {
    "id": 10054,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué ocurre con la rapidez media de un objeto si recorre la misma distancia en menos tiempo?",
    "correct": "Aumenta",
    "options": [
      "Permanece igual",
      "Se vuelve cero",
      "Aumenta",
      "Disminuye"
    ]
  },
  {
    "id": 10055,
    "category": "Physics",
    "difficulty": "medium",
    "question": "¿Qué tipo de energía tiene un objeto debido a su movimiento?",
    "correct": "Energía cinética",
    "options": [
      "Energía nuclear",
      "Energía cinética",
      "Energía potencial gravitatoria",
      "Energía química"
    ]
  },
  {
    "id": 10056,
    "category": "Physics",
    "difficulty": "medium",
    "question": "¿Qué tipo de energía está relacionada con la posición de un objeto?",
    "correct": "Energía potencial",
    "options": [
      "Energía potencial",
      "Energía cinética",
      "Energía sonora",
      "Energía térmica"
    ]
  },
  {
    "id": 10057,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué aparato mide la presión atmosférica?",
    "correct": "Barómetro",
    "options": [
      "Termómetro",
      "Cronómetro",
      "Amperímetro",
      "Barómetro"
    ]
  },
  {
    "id": 10058,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué fenómeno permite que veamos nuestro reflejo en un espejo?",
    "correct": "Reflexión",
    "options": [
      "Evaporación",
      "Fusión",
      "Reflexión",
      "Refracción"
    ]
  },
  {
    "id": 10059,
    "category": "Physics",
    "difficulty": "medium",
    "question": "¿Qué necesita una corriente eléctrica para circular por un circuito, además de una fuente de tensión?",
    "correct": "Un camino conductor cerrado",
    "options": [
      "Un interruptor siempre abierto",
      "Un camino conductor cerrado",
      "Un camino interrumpido",
      "Solo materiales aislantes"
    ]
  },
  {
    "id": 10060,
    "category": "Physics",
    "difficulty": "easy",
    "question": "¿Qué unidad se utiliza para medir la potencia eléctrica?",
    "correct": "Watt",
    "options": [
      "Watt",
      "Volt",
      "Ohm",
      "Amperio"
    ]
  },
  {
    "id": 10061,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Cuál es el símbolo químico del carbono?",
    "correct": "C",
    "options": [
      "Ca",
      "Co",
      "Cu",
      "C"
    ]
  },
  {
    "id": 10062,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Cuál es el símbolo químico del hierro?",
    "correct": "Fe",
    "options": [
      "He",
      "H",
      "Fe",
      "F"
    ]
  },
  {
    "id": 10063,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Cuál es el símbolo químico de la plata?",
    "correct": "Ag",
    "options": [
      "Ar",
      "Ag",
      "Au",
      "Al"
    ]
  },
  {
    "id": 10064,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Qué elemento tiene el símbolo Na?",
    "correct": "Sodio",
    "options": [
      "Sodio",
      "Nitrógeno",
      "Neón",
      "Níquel"
    ]
  },
  {
    "id": 10065,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Qué elemento tiene el símbolo He?",
    "correct": "Helio",
    "options": [
      "Hidrógeno",
      "Hierro",
      "Hafnio",
      "Helio"
    ]
  },
  {
    "id": 10066,
    "category": "Chemistry",
    "difficulty": "medium",
    "question": "¿Qué escala se utiliza habitualmente para medir la acidez o basicidad?",
    "correct": "pH",
    "options": [
      "Celsius",
      "Beaufort",
      "pH",
      "Richter"
    ]
  },
  {
    "id": 10067,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Qué pH corresponde aproximadamente a una sustancia neutra a temperatura ambiente?",
    "correct": "7",
    "options": [
      "14",
      "7",
      "1",
      "3"
    ]
  },
  {
    "id": 10068,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Qué estado de la materia tiene volumen definido pero adopta la forma del recipiente?",
    "correct": "Líquido",
    "options": [
      "Líquido",
      "Sólido",
      "Gas",
      "Plasma"
    ]
  },
  {
    "id": 10069,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Qué estado de la materia no tiene forma ni volumen definidos entre estas opciones?",
    "correct": "Gas",
    "options": [
      "Sólido",
      "Líquido",
      "Cristal",
      "Gas"
    ]
  },
  {
    "id": 10070,
    "category": "Chemistry",
    "difficulty": "easy",
    "question": "¿Cómo se llama el cambio de estado de líquido a gas?",
    "correct": "Vaporización",
    "options": [
      "Solidificación",
      "Fusión",
      "Vaporización",
      "Condensación"
    ]
  },
  {
    "id": 10071,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Qué significa \"school\"?",
    "correct": "Escuela",
    "options": [
      "Casa",
      "Escuela",
      "Hospital",
      "Biblioteca"
    ]
  },
  {
    "id": 10072,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Qué significa \"water\"?",
    "correct": "Agua",
    "options": [
      "Agua",
      "Fuego",
      "Tierra",
      "Aire"
    ]
  },
  {
    "id": 10073,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Cómo se dice \"perro\" en inglés?",
    "correct": "Dog",
    "options": [
      "Cat",
      "Bird",
      "Horse",
      "Dog"
    ]
  },
  {
    "id": 10074,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Cómo se dice \"libro\" en inglés?",
    "correct": "Book",
    "options": [
      "Pen",
      "Chair",
      "Book",
      "Table"
    ]
  },
  {
    "id": 10075,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Qué significa \"friend\"?",
    "correct": "Amigo",
    "options": [
      "Maestro",
      "Amigo",
      "Enemigo",
      "Vecino"
    ]
  },
  {
    "id": 10076,
    "category": "English",
    "difficulty": "medium",
    "question": "¿Cuál es el plural de \"child\"?",
    "correct": "Children",
    "options": [
      "Children",
      "Childs",
      "Childes",
      "Child"
    ]
  },
  {
    "id": 10077,
    "category": "English",
    "difficulty": "medium",
    "question": "¿Cuál es el pasado de \"eat\"?",
    "correct": "Ate",
    "options": [
      "Eated",
      "Eating",
      "Eats",
      "Ate"
    ]
  },
  {
    "id": 10078,
    "category": "English",
    "difficulty": "medium",
    "question": "¿Cuál es el pasado de \"see\"?",
    "correct": "Saw",
    "options": [
      "Seen",
      "Seeing",
      "Saw",
      "Seed"
    ]
  },
  {
    "id": 10079,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Qué significa \"beautiful\"?",
    "correct": "Hermoso/a",
    "options": [
      "Difícil",
      "Hermoso/a",
      "Rápido/a",
      "Pequeño/a"
    ]
  },
  {
    "id": 10080,
    "category": "English",
    "difficulty": "easy",
    "question": "¿Cómo se dice \"gracias\" en inglés?",
    "correct": "Thank you",
    "options": [
      "Thank you",
      "Goodbye",
      "Please",
      "Sorry"
    ]
  },
  {
    "id": 10082,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿En qué ciudad se reunió el Congreso que declaró la Independencia en 1816?",
    "correct": "San Miguel de Tucumán",
    "options": [
      "Córdoba",
      "Mendoza",
      "San Miguel de Tucumán",
      "Buenos Aires"
    ]
  },
  {
    "id": 10083,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué fecha se conmemora como la Revolución de Mayo?",
    "correct": "25 de mayo",
    "options": [
      "17 de agosto",
      "25 de mayo",
      "9 de julio",
      "20 de junio"
    ]
  },
  {
    "id": 10084,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué fecha se celebra como el Día de la Independencia argentina?",
    "correct": "9 de julio",
    "options": [
      "9 de julio",
      "25 de mayo",
      "20 de junio",
      "12 de octubre"
    ]
  },
  {
    "id": 10085,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué prócer argentino es conocido por crear la bandera?",
    "correct": "Manuel Belgrano",
    "options": [
      "José de San Martín",
      "Mariano Moreno",
      "Domingo F. Sarmiento",
      "Manuel Belgrano"
    ]
  },
  {
    "id": 10086,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué batalla de 1813, librada en la actual provincia argentina del mismo nombre, fue una importante victoria patriota?",
    "correct": "Batalla de Salta",
    "options": [
      "Batalla de Pavón",
      "Batalla de Cepeda",
      "Batalla de Salta",
      "Batalla de Caseros"
    ]
  },
  {
    "id": 10087,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué militar argentino cruzó los Andes para liberar Chile y Perú?",
    "correct": "José de San Martín",
    "options": [
      "Bartolomé Mitre",
      "José de San Martín",
      "Manuel Belgrano",
      "Juan Manuel de Rosas"
    ]
  },
  {
    "id": 10088,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué nombre recibió el gobierno creado tras la Revolución de Mayo?",
    "correct": "Primera Junta",
    "options": [
      "Primera Junta",
      "Directorio",
      "Primer Triunvirato",
      "Congreso Constituyente"
    ]
  },
  {
    "id": 10089,
    "category": "Argentine History",
    "difficulty": "easy",
    "question": "¿Qué símbolo patrio se conmemora especialmente el 20 de junio?",
    "correct": "La bandera",
    "options": [
      "El escudo",
      "La escarapela",
      "El himno",
      "La bandera"
    ]
  },
  {
    "id": 10090,
    "category": "Argentine History",
    "difficulty": "medium",
    "question": "¿Quién escribió la letra del Himno Nacional Argentino?",
    "correct": "Vicente López y Planes",
    "options": [
      "José Hernández",
      "Esteban Echeverría",
      "Vicente López y Planes",
      "Blas Parera"
    ]
  },
  {
    "id": 10091,
    "category": "General Knowledge",
    "difficulty": "easy",
    "question": "¿Cuál es el planeta más grande del Sistema Solar?",
    "correct": "Júpiter",
    "options": [
      "Tierra",
      "Júpiter",
      "Saturno",
      "Neptuno"
    ]
  },
  {
    "id": 10092,
    "category": "General Knowledge",
    "difficulty": "easy",
    "question": "¿Cuántos continentes se suelen enseñar en el modelo de siete continentes?",
    "correct": "7",
    "options": [
      "7",
      "5",
      "6",
      "8"
    ]
  },
  {
    "id": 10093,
    "category": "General Knowledge",
    "difficulty": "easy",
    "question": "¿Qué animal es conocido por producir miel?",
    "correct": "Abeja",
    "options": [
      "Mariposa",
      "Mosquito",
      "Libélula",
      "Abeja"
    ]
  },
  {
    "id": 10094,
    "category": "General Knowledge",
    "difficulty": "easy",
    "question": "¿Qué aparato se utiliza para observar objetos muy pequeños?",
    "correct": "Microscopio",
    "options": [
      "Periscopio",
      "Barómetro",
      "Microscopio",
      "Telescopio"
    ]
  },
  {
    "id": 10096,
    "category": "Technology",
    "difficulty": "medium",
    "question": "¿Qué significa \"URL\"?",
    "correct": "Uniform Resource Locator",
    "options": [
      "Uniform Resource Locator",
      "Universal Record Language",
      "Unified Router Link",
      "User Reference List"
    ]
  },
  {
    "id": 10097,
    "category": "Sports",
    "difficulty": "easy",
    "question": "¿Cuántos jugadores tiene un equipo de básquet en cancha?",
    "correct": "5",
    "options": [
      "6",
      "7",
      "11",
      "5"
    ]
  },
  {
    "id": 10098,
    "category": "Sports",
    "difficulty": "easy",
    "question": "¿Qué deporte utiliza una pelota ovalada y permite pasarla con las manos hacia atrás o hacia los costados?",
    "correct": "Rugby",
    "options": [
      "Vóley",
      "Tenis",
      "Rugby",
      "Básquet"
    ]
  },
  {
    "id": 10099,
    "category": "Logic",
    "difficulty": "easy",
    "question": "¿Qué número sigue: 3, 6, 9, 12, __?",
    "correct": "15",
    "options": [
      "18",
      "15",
      "14",
      "16"
    ]
  },
  {
    "id": 10100,
    "category": "Logic",
    "difficulty": "medium",
    "question": "Si todos los cuadrados son cuadriláteros y una figura es un cuadrado, ¿qué podemos afirmar?",
    "correct": "Que es un cuadrilátero",
    "options": [
      "Que es un cuadrilátero",
      "Que tiene cinco lados",
      "Que es un círculo",
      "Que no tiene ángulos"
    ]
  }
];

export const additionalQuestions: Question[] = entries.map(entry => ({
  ...entry, subject: ACADEMIC_CATEGORIES[entry.category].label,
  type: "multiple", points: entry.difficulty === "easy" ? 100 : 200,
}));

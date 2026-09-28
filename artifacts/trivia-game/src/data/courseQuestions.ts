import type { Category, Question } from "./questions";

export type Course = "1ro" | "2do" | "3ro" | "4to" | "5to" | "6to";
export type Subject = "Ciencias Naturales" | "Ciencias Sociales" | "Historia" | "Geografía" | "Informática" | "Cultura General" | "Videojuegos" | "Música" | "Filosofía";

export const COURSE_LABELS: Record<Course, string> = {
  "1ro": "1ro secundario", "2do": "2do secundario", "3ro": "3ro secundario",
  "4to": "4to secundario", "5to": "5to secundario", "6to": "6to secundario",
};

export const COURSE_ICONS: Record<Course, string> = {
  "1ro": "🌱", "2do": "🔎", "3ro": "🧩", "4to": "🚀", "5to": "🧠", "6to": "🏆",
};

export const SUBJECTS: Subject[] = [
  "Ciencias Naturales", "Ciencias Sociales", "Historia", "Geografía", "Informática",
  "Cultura General", "Videojuegos", "Música", "Filosofía",
];

export const COURSE_SUBJECTS: Record<Course, Subject[]> = {
  "1ro": SUBJECTS, "2do": SUBJECTS, "3ro": SUBJECTS,
  "4to": SUBJECTS, "5to": SUBJECTS, "6to": SUBJECTS,
};

export const SUBJECT_ICONS: Record<Subject, string> = {
  "Ciencias Naturales": "🔬", "Ciencias Sociales": "👥", Historia: "🏛️",
  Geografía: "🌎", Informática: "💻", "Cultura General": "🌟",
  Videojuegos: "🎮", Música: "🎵", Filosofía: "💭",
};

interface CourseQuestion extends Omit<Question, "id" | "course" | "subject"> {
  course: Course;
  subject: Subject;
}

type Row = [Course, Subject, string, string, string[], "easy" | "medium" | "hard"];

const suppliedQuestions: CourseQuestion[] = [
  { course: "3ro", subject: "Historia", category: "culture", difficulty: "easy", type: "multiple", points: 100, question: "¿La Batalla de Caseros fue un triunfo de Urquiza o de Rosas?", correct: "Urquiza", options: ["Urquiza", "Rosas"] },
  { course: "3ro", subject: "Historia", category: "culture", difficulty: "medium", type: "multiple", points: 200, question: "En 1835 asesinaron en Barranca Yaco a Facundo Quiroga. ¿De qué provincia era?", correct: "Córdoba", options: ["Mendoza", "San Juan", "Córdoba"] },
  { course: "3ro", subject: "Historia", category: "culture", difficulty: "hard", type: "multiple", points: 400, question: "¿Sarmiento fue leal u opositor al rosismo?", correct: "Opositor", options: ["Leal", "Opositor"] },
  { course: "4to", subject: "Historia", category: "culture", difficulty: "easy", type: "multiple", points: 100, question: "El Tratado de Versalles impuso durísimas condiciones. ¿A qué país venció?", correct: "Alemania", options: ["Italia", "Imperio Austrohúngaro", "Alemania"] },
  { course: "4to", subject: "Historia", category: "culture", difficulty: "medium", type: "multiple", points: 200, question: "¿Dónde y en qué condiciones se produjo la primera revolución comunista?", correct: "En un país vulnerable con exceso de campesinado como Rusia", options: ["En un país industrializado como Inglaterra", "En un país emergente como Bélgica", "En un país vulnerable con exceso de campesinado como Rusia"] },
  { course: "4to", subject: "Historia", category: "culture", difficulty: "hard", type: "multiple", points: 400, question: "¿Cómo estaba compuesto el bloque que perdió la Segunda Guerra Mundial?", correct: "Alemania, Italia y Japón", options: ["Estados Unidos, Francia, Rusia e Inglaterra", "Alemania, Italia y Japón", "España, Portugal y Francia"] },
  { course: "5to", subject: "Historia", category: "culture", difficulty: "easy", type: "multiple", points: 100, question: "¿En qué año ocurrió el golpe de Estado que destituyó a Perón y lo llevó al exilio?", correct: "1955", options: ["1952", "1954", "1955"] },
  { course: "5to", subject: "Historia", category: "culture", difficulty: "medium", type: "multiple", points: 200, question: "¿Cómo se llamó el movimiento militar que destituyó a Perón?", correct: "La Libertadora", options: ["La Libertadora", "Patria Grande", "Juventud Unida"] },
  { course: "5to", subject: "Historia", category: "culture", difficulty: "hard", type: "multiple", points: 400, question: "En 1949 se produjo la revolución comunista en China. ¿Qué episodio se desarrolló en ese proceso?", correct: "El Gran Salto Adelante", options: ["Reforma agraria", "Libre mercado", "El Gran Salto Adelante"] },
  { course: "6to", subject: "Filosofía", category: "culture", difficulty: "easy", type: "multiple", points: 100, question: "¿Cuál de estos filósofos creó el concepto del absurdo?", correct: "Camus", options: ["Sartre", "Camus", "Arendt"] },
  { course: "6to", subject: "Filosofía", category: "culture", difficulty: "medium", type: "multiple", points: 200, question: "¿Cuál de estos filósofos pertenece al post aristotelismo?", correct: "Séneca", options: ["Platón", "Séneca", "Epicuro"] },
  { course: "6to", subject: "Filosofía", category: "culture", difficulty: "hard", type: "multiple", points: 400, question: "La frase ‘La religión es el opio de los pueblos’ pertenece a:", correct: "Marx", options: ["Heidegger", "Nietzsche", "Marx"] },
];

const extraRows: Row[] = [
  ["1ro", "Ciencias Naturales", "¿Qué órgano bombea la sangre por todo el cuerpo?", "Corazón", ["Pulmón", "Corazón", "Riñón", "Hígado"], "easy"],
  ["1ro", "Ciencias Sociales", "¿Qué institución organiza la vida política de una comunidad?", "El Estado", ["El Estado", "El clima", "La célula", "El relieve"], "easy"],
  ["1ro", "Historia", "¿Qué pueblo construyó gran parte de la red de caminos del Tawantinsuyo?", "Los incas", ["Los incas", "Los fenicios", "Los vikingos", "Los celtas"], "easy"],
  ["1ro", "Geografía", "¿Qué elemento representa la altura de un lugar sobre el nivel del mar?", "Altitud", ["Latitud", "Altitud", "Longitud", "Escala"], "easy"],
  ["1ro", "Informática", "¿Qué dispositivo permite ingresar texto a una computadora?", "Teclado", ["Monitor", "Teclado", "Parlante", "Proyector"], "easy"],
  ["1ro", "Cultura General", "¿Cuál es la capital de Argentina?", "Buenos Aires", ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], "easy"],
  ["1ro", "Videojuegos", "¿Qué elemento representa la vida de un personaje en muchos videojuegos?", "Barra de salud", ["Barra de salud", "Mapa", "Inventario", "Puntaje"], "easy"],
  ["1ro", "Música", "¿Cuántas notas tiene la escala musical tradicional?", "7", ["5", "6", "7", "8"], "easy"],
  ["1ro", "Filosofía", "¿Qué pregunta intenta responder la filosofía?", "Qué podemos conocer y cómo vivir", ["Qué podemos conocer y cómo vivir", "Solo cuánto medimos", "Solo cómo correr", "Solo qué comprar"], "easy"],
  ["2do", "Ciencias Naturales", "¿Qué proceso realizan las plantas para producir glucosa usando luz?", "Fotosíntesis", ["Respiración", "Fotosíntesis", "Digestión", "Fermentación"], "easy"],
  ["2do", "Ciencias Sociales", "¿Qué ciencia estudia las relaciones entre las personas y la sociedad?", "Sociología", ["Sociología", "Geología", "Astronomía", "Botánica"], "easy"],
  ["2do", "Historia", "¿Qué hecho inició tradicionalmente la Edad Moderna?", "La caída de Constantinopla", ["La caída de Constantinopla", "La Revolución Industrial", "La llegada a la Luna", "La independencia argentina"], "medium"],
  ["2do", "Geografía", "¿Qué línea divide la Tierra en hemisferio norte y sur?", "Ecuador", ["Meridiano de Greenwich", "Ecuador", "Trópico de Capricornio", "Círculo Polar"], "easy"],
  ["2do", "Informática", "¿Qué es un algoritmo?", "Una secuencia ordenada de pasos", ["Una secuencia ordenada de pasos", "Una imagen", "Un cable", "Un monitor"], "medium"],
  ["2do", "Cultura General", "¿Qué instrumento se usa para medir la temperatura?", "Termómetro", ["Barómetro", "Termómetro", "Anemómetro", "Sismógrafo"], "easy"],
  ["2do", "Videojuegos", "¿Qué género se centra en interpretar un personaje y desarrollar su historia?", "Rol", ["Rol", "Carreras", "Puzzle", "Deportes"], "medium"],
  ["2do", "Música", "¿Cómo se llama la velocidad de una obra musical?", "Tempo", ["Timbre", "Tempo", "Armonía", "Compás"], "medium"],
  ["2do", "Filosofía", "¿Qué disciplina reflexiona sobre lo correcto y lo incorrecto?", "Ética", ["Estética", "Ética", "Física", "Gramática"], "medium"],
  ["3ro", "Ciencias Naturales", "¿Qué molécula contiene la información genética?", "ADN", ["ATP", "ADN", "Glucosa", "Agua"], "easy"],
  ["3ro", "Ciencias Sociales", "¿Qué poder del Estado argentino sanciona las leyes?", "Legislativo", ["Ejecutivo", "Legislativo", "Judicial", "Municipal"], "medium"],
  ["3ro", "Geografía", "¿Qué bioma predomina en gran parte de la llanura pampeana?", "Pastizal", ["Pastizal", "Selva", "Desierto", "Tundra"], "medium"],
  ["3ro", "Informática", "¿Qué sistema numérico usan internamente las computadoras?", "Binario", ["Decimal", "Romano", "Binario", "Hexagonal"], "medium"],
  ["3ro", "Cultura General", "¿Qué científico formuló la teoría de la evolución por selección natural?", "Charles Darwin", ["Charles Darwin", "Isaac Newton", "Marie Curie", "Galileo Galilei"], "medium"],
  ["3ro", "Videojuegos", "¿Qué significa FPS en un videojuego?", "Fotogramas por segundo", ["Fotogramas por segundo", "Fases por sistema", "Fuerza por salto", "Ficha de jugador"], "hard"],
  ["3ro", "Música", "¿Qué familia de instrumentos incluye violín, viola y violonchelo?", "Cuerdas", ["Vientos", "Percusión", "Cuerdas", "Electrónicos"], "easy"],
  ["4to", "Ciencias Naturales", "¿Qué fuerza se opone al movimiento entre dos superficies?", "Fricción", ["Gravedad", "Fricción", "Empuje", "Tensión"], "medium"],
  ["4to", "Ciencias Sociales", "¿Qué concepto describe el crecimiento de las ciudades?", "Urbanización", ["Urbanización", "Deforestación", "Migración animal", "Sedimentación"], "medium"],
  ["4to", "Geografía", "¿Qué recurso natural es fundamental para la generación hidroeléctrica?", "Agua", ["Carbón", "Agua", "Petróleo", "Litio"], "easy"],
  ["4to", "Informática", "¿Qué estructura permite repetir instrucciones en un programa?", "Bucle", ["Variable", "Bucle", "Comentario", "Archivo"], "medium"],
  ["4to", "Cultura General", "¿En qué continente se encuentra Egipto?", "África", ["Asia", "Europa", "África", "Oceanía"], "easy"],
  ["4to", "Videojuegos", "¿Qué es un motor gráfico?", "Software que procesa la representación del juego", ["Software que procesa la representación del juego", "Una consola", "Un control", "Una partida guardada"], "hard"],
  ["4to", "Música", "¿Qué término indica tocar progresivamente más fuerte?", "Crescendo", ["Crescendo", "Piano", "Staccato", "Legato"], "medium"],
  ["5to", "Ciencias Naturales", "¿Qué unidad del Sistema Internacional mide la energía?", "Joule", ["Newton", "Joule", "Pascal", "Watt"], "medium"],
  ["5to", "Ciencias Sociales", "¿Qué indicador mide la relación entre población y superficie?", "Densidad de población", ["PBI", "Densidad de población", "Inflación", "Población activa"], "medium"],
  ["5to", "Geografía", "¿Qué proceso transforma rocas en sedimentos por acción del ambiente?", "Erosión", ["Erosión", "Fotosíntesis", "Condensación", "Fusión"], "medium"],
  ["5to", "Informática", "¿Qué práctica protege una cuenta además de usar una contraseña?", "Autenticación de dos factores", ["Autenticación de dos factores", "Compartir la clave", "Desactivar actualizaciones", "Usar la misma clave"], "hard"],
  ["5to", "Cultura General", "¿Qué organización internacional fue creada en 1945 para promover la cooperación entre países?", "ONU", ["ONU", "OTAN", "OEA", "UNESCO"], "medium"],
  ["5to", "Videojuegos", "¿Qué tipo de software modifica o amplía el contenido de un juego?", "Mod", ["Mod", "Driver", "Kernel", "Router"], "hard"],
  ["5to", "Música", "¿Qué intervalo musical abarca ocho notas?", "Octava", ["Tercera", "Quinta", "Octava", "Décima"], "medium"],
  ["6to", "Ciencias Naturales", "¿Qué proceso celular produce gametos con la mitad de cromosomas?", "Meiosis", ["Mitosis", "Meiosis", "Clonación", "Bipartición"], "medium"],
  ["6to", "Ciencias Sociales", "¿Qué indicador combina educación, salud e ingresos para medir desarrollo?", "IDH", ["PBI", "IDH", "IPC", "Tasa de natalidad"], "hard"],
  ["6to", "Historia", "¿Qué acontecimiento argentino ocurrió el 25 de mayo de 1810?", "La Revolución de Mayo", ["La Revolución de Mayo", "La Batalla de Caseros", "La Ley Sáenz Peña", "El retorno democrático"], "easy"],
  ["6to", "Geografía", "¿Qué fenómeno climático se relaciona con el calentamiento periódico del Pacífico ecuatorial?", "El Niño", ["El Niño", "La Niña", "Monzón", "Zonda"], "hard"],
  ["6to", "Informática", "¿Qué paradigma organiza un programa mediante objetos con datos y comportamientos?", "Programación orientada a objetos", ["Programación orientada a objetos", "Programación lineal", "Diseño editorial", "Compresión"], "hard"],
  ["6to", "Cultura General", "¿Qué rama de la ciencia estudia los principios de la materia y la energía?", "Física", ["Física", "Sociología", "Lingüística", "Arqueología"], "easy"],
  ["6to", "Videojuegos", "¿Qué característica permite que un juego responda a las acciones del jugador?", "Interactividad", ["Interactividad", "Resolución", "Textura", "Latencia"], "medium"],
  ["6to", "Música", "¿Qué compositor argentino es reconocido por renovar el tango?", "Astor Piazzolla", ["Astor Piazzolla", "Atahualpa Yupanqui", "Mercedes Sosa", "Charly García"], "medium"],
  ["1ro", "Filosofía", "¿Qué actitud filosófica impulsa a preguntar y no aceptar ideas sin examinarlas?", "Pensamiento crítico", ["Pensamiento crítico", "Memoria", "Rutina", "Imitación"], "medium"],
  ["2do", "Filosofía", "¿Qué filósofo escribió el mito de la caverna?", "Platón", ["Platón", "Aristóteles", "Sócrates", "Epicuro"], "medium"],
  ["3ro", "Filosofía", "¿Qué rama estudia cómo conocemos y qué podemos conocer?", "Epistemología", ["Epistemología", "Ética", "Estética", "Política"], "hard"],
  ["4to", "Filosofía", "¿Qué concepto se relaciona con la capacidad de elegir y actuar?", "Libertad", ["Libertad", "Inercia", "Densidad", "Escala"], "medium"],
  ["5to", "Filosofía", "¿Qué corriente sostiene que la existencia concreta precede a una esencia fija?", "Existencialismo", ["Existencialismo", "Empirismo", "Positivismo", "Estoicismo"], "hard"],
];

type ReviewRow = [Subject, string, string, string[], "easy" | "medium" | "hard"];

const reviewRows: ReviewRow[] = [
  ["Ciencias Naturales", "¿Qué unidad básica forma a todos los seres vivos?", "Célula", ["Átomo", "Célula", "Tejido", "Órgano"], "easy"],
  ["Ciencias Naturales", "¿Qué cambio de estado transforma un líquido en gas?", "Evaporación", ["Fusión", "Evaporación", "Solidificación", "Condensación"], "medium"],
  ["Ciencias Sociales", "¿Qué proceso ocurre cuando una persona cambia de país para vivir?", "Migración", ["Migración", "Erosión", "Urbanización", "Industrialización"], "easy"],
  ["Ciencias Sociales", "¿Qué estudia principalmente la economía?", "La producción y distribución de bienes", ["Los astros", "La producción y distribución de bienes", "Los ecosistemas", "Las lenguas"], "medium"],
  ["Historia", "¿Qué documento declaró la independencia argentina en 1816?", "Acta de la Independencia", ["Acta de la Independencia", "Constitución de 1853", "Pacto Federal", "Tratado de Versalles"], "easy"],
  ["Historia", "¿Qué proceso político transformó las colonias americanas en países independientes?", "Las independencias americanas", ["Las independencias americanas", "La Guerra Fría", "La Reforma Protestante", "La Revolución Industrial"], "medium"],
  ["Geografía", "¿Qué instrumento permite ubicar puntos mediante latitud y longitud?", "Coordenadas geográficas", ["Coordenadas geográficas", "Escala cromática", "Pirámide de población", "Rosa de los vientos"], "easy"],
  ["Geografía", "¿Qué movimiento de la Tierra produce el día y la noche?", "Rotación", ["Traslación", "Rotación", "Precesión", "Inclinación"], "medium"],
  ["Informática", "¿Qué programa se utiliza para navegar por sitios web?", "Navegador", ["Navegador", "Compilador", "Editor de audio", "Antivirus"], "easy"],
  ["Informática", "¿Qué característica debe tener una contraseña segura?", "Ser larga y combinar distintos caracteres", ["Ser el nombre propio", "Ser larga y combinar distintos caracteres", "Ser igual en todos los sitios", "Compartirse con amigos"], "medium"],
  ["Cultura General", "¿Qué océano baña la costa este de Argentina?", "Atlántico", ["Pacífico", "Atlántico", "Índico", "Ártico"], "easy"],
  ["Cultura General", "¿Qué científico argentino recibió un Premio Nobel de Medicina en 1947?", "Bernardo Houssay", ["Bernardo Houssay", "Jorge Luis Borges", "René Favaloro", "Manuel Belgrano"], "hard"],
  ["Videojuegos", "¿Qué dispositivo se usa habitualmente para controlar un videojuego?", "Control", ["Control", "Microscopio", "Escáner", "Router"], "easy"],
  ["Videojuegos", "¿Qué significa que un juego sea multijugador?", "Que permite jugar a varias personas", ["Que no tiene reglas", "Que permite jugar a varias personas", "Que solo funciona sin pantalla", "Que tiene un solo nivel"], "medium"],
  ["Música", "¿Qué símbolo indica silencio en una partitura?", "Silencio", ["Silencio", "Clave", "Armadura", "Compás"], "easy"],
  ["Música", "¿Cómo se llama la combinación de sonidos tocados al mismo tiempo?", "Armonía", ["Melodía", "Armonía", "Tempo", "Timbre"], "medium"],
  ["Filosofía", "¿Qué disciplina filosófica reflexiona sobre la belleza y el arte?", "Estética", ["Estética", "Lógica", "Epistemología", "Política"], "easy"],
  ["Filosofía", "¿Qué método consiste en examinar una idea mediante preguntas y respuestas?", "Diálogo socrático", ["Diálogo socrático", "Experimento", "Observación astronómica", "Cálculo diferencial"], "medium"],
  ["Ciencias Naturales", "¿Qué sistema del cuerpo coordina las respuestas y movimientos?", "Sistema nervioso", ["Sistema nervioso", "Sistema digestivo", "Sistema óseo", "Sistema circulatorio"], "hard"],
  ["Ciencias Sociales", "¿Qué documento organiza los derechos y deberes fundamentales de un país?", "Constitución", ["Constitución", "Mapa", "Censo", "Calendario"], "hard"],
  ["Historia", "¿Qué revolución comenzó en Francia en 1789?", "Revolución Francesa", ["Revolución Francesa", "Revolución Rusa", "Revolución Industrial", "Revolución de Mayo"], "hard"],
  ["Geografía", "¿Qué tipo de mapa muestra alturas y formas del relieve?", "Mapa físico", ["Mapa físico", "Mapa político", "Mapa histórico", "Mapa económico"], "hard"],
  ["Informática", "¿Qué componente ejecuta las instrucciones principales de una computadora?", "Procesador", ["Procesador", "Monitor", "Teclado", "Gabinete"], "hard"],
  ["Cultura General", "¿Qué planeta es conocido como el planeta rojo?", "Marte", ["Venus", "Marte", "Júpiter", "Saturno"], "hard"],
  ["Videojuegos", "¿Qué elemento permite guardar el progreso de una partida?", "Partida guardada", ["Partida guardada", "Textura", "Música", "Resolución"], "hard"],
  ["Música", "¿Qué instrumento tiene teclas blancas y negras y suele tener 88 teclas?", "Piano", ["Piano", "Violín", "Flauta", "Batería"], "hard"],
  ["Filosofía", "¿Qué rama analiza los razonamientos válidos?", "Lógica", ["Lógica", "Ética", "Estética", "Metafísica"], "hard"],
];

const courses: Course[] = ["1ro", "2do", "3ro", "4to", "5to", "6to"];

const toQuestion = (row: Row, id: number): Question => {
  const [course, subject, question, correct, options, difficulty] = row;
  return { id, course, subject, category: "culture" as Category, difficulty, type: "multiple", question, correct, options, points: difficulty === "easy" ? 100 : difficulty === "medium" ? 200 : 400 };
};

export const courseQuestions: Question[] = [
  ...suppliedQuestions.map((question, index) => ({ ...question, id: 1000 + index })),
  ...extraRows.map((row, index) => toQuestion(row, 1100 + index)),
  ...courses.flatMap((course, courseIndex) =>
    reviewRows.map((row, rowIndex) => toQuestion([course, ...row], 2000 + courseIndex * reviewRows.length + rowIndex)),
  ),
];

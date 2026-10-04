# Che Sabés

Trivia escolar en español: **6 cursos, 19 materias y 965 preguntas activas**. React, Vite, Zustand y Framer Motion. Funciona en el navegador, sin cuentas de jugadores ni servicios externos.

## Jugar y probar

| Entorno                       | Dirección                                                                                                              | Estado                                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Público, GitHub Pages         | https://damiroa.github.io/Preguntados-IGC/                                                                             | Hosting existente. Esta actualización se publica cuando sus cambios llegan a `main` y finaliza el workflow **Deploy Preguntados IGC**. |
| Testing en esta tarea         | Abrir **Preview → Che Sabés — pruebas de producción** en la tarea `00750239-2971-4962-9ccb-f8b3e91ade7c` de CodeRabbit | Vista previa del entorno de trabajo; requiere acceso a la tarea.                                                                       |
| Desarrollo local              | http://localhost:3000/                                                                                                 | Disponible tras iniciar el servidor de desarrollo.                                                                                     |
| Producción local para pruebas | http://localhost:3001/                                                                                                 | Disponible tras compilar e iniciar con `PORT=3001`.                                                                                    |

La marca visible es **Che Sabés** y el nombre previsto para la URL es `che-sabes` (sin espacios, tildes ni signos).

**URL pública solicitada, pendiente de activar:** `https://damiroa.github.io/che-sabes/`. Requiere renombrar el repositorio en GitHub de `Preguntados-IGC` a `che-sabes` y volver a publicar desde `main`. El workflow existente toma automáticamente el nombre del repositorio para `BASE_PATH`; no necesita editarse. Cambiar el título del juego no cambia la dirección del hosting. No se debe dar por activo el nuevo enlace hasta verificar el despliegue. El enlace de Pages anterior puede dejar de funcionar al renombrar el repositorio.

**Testing privado:** se utiliza Preview dentro de CodeRabbit. No se ha creado un dominio privado independiente ni un panel de administración. `localhost` es una dirección local, no un enlace público ni un mecanismo de autenticación. Si se necesita una URL externa protegida, hay que configurar autenticación en el hosting antes de compartirla.

## Ejecutar

Requisitos: Node.js 22 o 24, pnpm 10. Desde la raíz:

```sh
pnpm install --frozen-lockfile
pnpm run start:game
```

`start:game` arranca Vite en el puerto 3000 y reutiliza un proceso activo. Para ejecutarlo en primer plano:

```sh
pnpm --filter @workspace/trivia-game dev
```

Compilar y servir:

```sh
pnpm run build:game
PORT=3001 pnpm run start:production
```

El servidor sirve únicamente `artifacts/trivia-game/dist/public`, admite GET/HEAD y negocia gzip para HTML, JavaScript, CSS y SVG. El juego no necesita contraseñas, tokens, base de datos ni archivos `.env`.

## Validación

```sh
pnpm run test:game
pnpm run build:game
PORT=3000 BASE_PATH=/ pnpm run build
```

- Los tests comprueban las 114 combinaciones curso/materia hasta agotar sus preguntas, reinicio, respuestas, puntaje, monedas, escudo, tiempos, saltos y persistencia.
- Las 570 incorporaciones se verifican por ID único, enunciado único, cuatro opciones distintas, una respuesta correcta, categoría y dificultad. Cada combinación recibe dos fáciles, dos medias y una difícil.
- La interfaz se comprueba a 320, 375, 768, 1024 y 1366 px, además de horizontal, contenido largo, objetivos táctiles de 48 px, teclado y movimiento reducido.
- La emulación de Chromium no sustituye las pruebas en Safari o dispositivos físicos.

Los resultados medidos de rendimiento y el detalle de cambios están en [CHANGELOG.md](CHANGELOG.md).

## Preguntas y progreso

| Archivo en `artifacts/trivia-game/src/data/` | Registros | Uso                                           |
| -------------------------------------------- | --------: | --------------------------------------------- |
| `questions.ts`                               |       170 | Banco original conservado y tipos compartidos |
| `courseQuestions.ts`                         |       298 | Preguntas originales por curso                |
| `additionalQuestions.ts`                     |        97 | Preguntas académicas compartidas entre cursos |
| `expandedCourseQuestions.ts`                 |       570 | Cinco nuevas por cada materia y curso         |

El selector filtra por curso y materia y excluye todos los IDs de `usedQuestionIds` antes de elegir al azar. Prioriza la dificultad de la fase y después las otras preguntas disponibles. Tanto responder como saltar conserva el ID en la sesión. Si no quedan preguntas, termina con un mensaje de finalización; no rellena el banco. Una partida nueva reinicia esa lista.

Récord, monedas y mejoras siguen en la clave `che-sabes-store` de `localStorage`. El renombrado no cambia esa clave ni borra progreso. Las partidas en otro dominio/navegador tienen almacenamiento independiente.

Para añadir contenido, mantener los IDs existentes, asignar IDs nuevos y ejecutar los tests. En la ampliación, los IDs reservados son 30001–30570. Corregir un texto no debe cambiar su ID.

## Interfaz y animaciones

- `GameUI.tsx`: controles compartidos, vidas, monedas, sonido y transición de 350 ms.
- `QuestionTimer.tsx`: cuenta regresiva por fecha límite, aislada del contenido de la pregunta; limpia intervalos y listeners y no reinicia al silenciar.
- `App.tsx`: pantallas identificadas por fase; la saliente queda inerte mientras la entrante ya permite interacción.
- `index.css`: espaciado, contraste, tipografía local, altura dinámica, áreas seguras y scroll interno.
- La fuente Outfit se distribuye con su licencia OFL en `public/fonts/`. La imagen proporcionada por el usuario se usa como favicon PNG (32 y 192 px), ícono de iOS (180 px) e imagen social JPEG (1200×1200). Los archivos se redimensionaron sin recortar y sin metadata de la foto. No se vuelve a colocar un ícono sobre el título del menú.
- Las animaciones respetan `prefers-reduced-motion`. Se conservan respuestas, sonidos, feedback, tienda, rachas y fases.

## Publicación

### GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila y publica al recibir cambios en `main`. Los tests y la comprobación de tipos se ejecutan con los comandos de validación indicados arriba. Usa `BASE_PATH=/<nombre-del-repositorio>/`; las fuentes, el favicon y el logotipo respetan esa ruta. Consultar [Actions](https://github.com/Damiroa/Preguntados-IGC/actions) para comprobar el resultado del despliegue. No basta con que una rama tenga cambios para que el sitio público esté actualizado.

### Replit

La configuración `.replit` conserva Autoscale: `pnpm run build:game` como compilación y `pnpm run start:production` como ejecución, con el puerto de aplicación 3000. Publicar desde el proyecto de Replit que contenga estos cambios. No se ha creado una publicación de Replit desde esta tarea ni se dispone de una URL de Replit verificada.

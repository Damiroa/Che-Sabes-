# Changelog — Che Sabe

## 2026-09-28 — Refactor y ampliación

### Marca

- Nombre visible **Che Sabe** en menú, cabeceras, título HTML, metadata social y mensajes del servidor.
- Nuevo favicon/logotipo SVG e imagen social PNG de 1200×630.
- Se conserva la ruta del repositorio y la clave de progreso local para no invalidar enlaces ni partidas guardadas.

### Causas y correcciones de los problemas móviles

- Había estructuras distintas para móvil y escritorio, con estilos y transiciones duplicados. Cada pantalla usa ahora un único árbol responsive para evitar reemplazos de contenido al cambiar de tamaño.
- La cuenta regresiva actualizaba el componente de juego y sus respuestas. `QuestionTimer` mantiene esos renders dentro del reloj, usa una fecha límite y elimina su intervalo y listener al cambiar de pregunta o salir.
- Las transiciones y efectos superpuestos —incluidos fondos grandes con desenfoque— añadían trabajo de composición y podían producir saltos o destellos. Se sustituyeron por un fondo de gradientes, un movimiento decorativo pequeño y transiciones coordinadas.
- Pantallas y preguntas tienen claves estables. La pantalla saliente queda inerte; la entrante recibe interacción inmediatamente. Feedback y resultados conservan una instantánea para no cambiar mientras salen.
- La altura dinámica `100 dvh`, el fallback `100 vh`, las áreas seguras y los contenedores desplazables permiten usar teléfonos en horizontal y preguntas extensas.
- Controles de al menos 48×48 px, columnas `minmax(0,1 fr)`, salto de líneas y padding adaptable para 320,375,768,1024 px y superiores.

### Interfaz y accesibilidad

- Espaciado, radios, tipografía y colores centralizados; tarjetas claras y mayor contraste de texto.
- Botones, vidas, monedas, marca y control de sonido compartidos en `GameUI`.
- Iconos estables sin pulsaciones continuas; estados de respuesta diferenciados por texto, color y feedback.
- Tienda con diálogo Radix: nombre accesible, foco contenido, cierre con Escape, devolución de foco y anuncios de compra.
- Foco en el título de la nueva pantalla; soporte de teclado y `prefers-reduced-motion`.

### Movimiento

- Transiciones de pantallas, tarjetas, respuestas y botones:350 ms, `ease-in-out`.
- Desplazamiento de hover de 2 px y pulsación de escala 0,98; feedback con entrada sutil.
- Puntuación interpolada durante 400 ms y partículas acotadas a 500 ms, con cancelación y limpieza.
- Progreso animado con transformaciones. La barra de cambio de fase conserva su duración funcional de 2 s y permite continuar con el botón desde el primer momento.
- No se eliminaron todas las animaciones: se conservan las que comunican interacción y progreso.

### Preguntas

- **570 preguntas nuevas:**19 materias ×6 cursos ×5 preguntas.
- Cada combinación añade 2 fáciles,2 medias y 1 difícil; contenido distribuido entre conceptos, aplicación e interpretación, aumentando el nivel por curso.
- IDs permanentes 30001–30570, cuatro alternativas distintas, una respuesta correcta, categoría y dificultad.
- Se mantienen 298 registros por curso,97 preguntas académicas compartidas y 170 registros del banco legado. Total activo:965; total conservado entre todos los bancos:1135.
- El control editorial reemplazó 12 enunciados nuevos demasiado parecidos a contenido ya existente, conservando sus IDs y la distribución.
- Se mantiene el filtro de IDs usados durante toda la partida, incluidos los saltos, y el cierre al agotar preguntas. Reiniciar una partida permite comenzar una lista nueva.

### Rendimiento

- Fuente Outfit local con licencia OFL y preload; sin solicitudes a Google Fonts durante el juego.
- CSS del juego reducido a 16,07 kB (4,66 kB gzip), sin generar utilidades para componentes que el juego no usa.
- Logo SVG de tamaño fijo para evitar desplazamientos; imagen social cargada solo cuando se comparte.
- Servidor de producción con negociación gzip, `Vary`, longitud correcta y soporte HEAD; respeta `gzip;q=0`.
- El JavaScript incluye el banco completo para jugar sin llamadas de datos. Vite conserva una advertencia de bundle superior a 500 kB sin comprimir; se transfiere aproximadamente 171,7 kB con gzip.

#### Lighthouse

Medición del 28/09/2026, Lighthouse 13.5.0 sobre el build de producción, Chromium compartido y servidor local. Perfil móvil predeterminado, throttling simulado. Una corrida antes y una final; los valores pueden variar en hosting y dispositivos reales.

| Métrica móvil                  | Antes | Después |
| ------------------------------ | ----: | ------: |
| Rendimiento                    |    70 |      98 |
| Accesibilidad                  |   100 |     100 |
| Buenas prácticas               |   100 |     100 |
| SEO                            |   100 |     100 |
| FCP                            | 4,3 s |   1,9 s |
| LCP                            | 5,2 s |   2,1 s |
| Tiempo total de bloqueo        | 20 ms |   30 ms |
| Desplazamiento acumulado (CLS) |     0 |       0 |

En escritorio, con el perfil desktop de Lighthouse, las cuatro categorías dieron **100/100** (FCP 0,4 s; LCP 0,5 s; bloqueo 0 ms; CLS 0).

La mejora incluye la compresión agregada al servidor de producción. Lighthouse analiza la pantalla inicial; las partidas y transiciones se verifican aparte. Los informes HTML/JSON se entregan en Outputs de la tarea.

### Validación y publicación

- Ocho pruebas automatizadas de lógica e integridad, incluyendo agotamiento de las 114 combinaciones, aprobadas.
- Build completo del workspace y compilación del juego con tipos aprobados.
- Navegador:19 materias, aciertos, errores, doble pulsación, saltos, fin, reinicio, cuenta regresiva, respuesta corta, compras, teclado y movimiento reducido.
- Siete tamaños:320×568,375×812,768×1024,1024×768,1366×768,812×375 y 568×320; ocho pantallas por tamaño, texto largo y controles de 48 px.
- Servidor:HTML/assets, caché, HEAD, rutas inexistentes, rechazo de acceso fuera de la carpeta pública y negociación gzip.
- Las comprobaciones usan Chromium; quedan fuera Safari nativo y dispositivos físicos.
- Se conserva el workflow existente de GitHub Pages para que la entrega no requiera permiso para modificar workflows. Tests y typecheck fueron ejecutados localmente. La versión pública se actualiza al integrar estos cambios en `main`, no al guardarlos en el sandbox.
- Testing disponible en Preview de CodeRabbit. No se creó un hosting privado independiente ni un panel de administración.

### Archivos principales

- `artifacts/trivia-game/index.html`, `public/che-sabe.svg`, `public/che-sabe-social.png`, `public/fonts/*`.
- `src/App.tsx`, `src/index.css`, `src/components/{GameUI,QuestionTimer,MenuScreen,CategorySelect,GameScreen,CircularTimer,FeedbackScreen,GameOverScreen,StageUpScreen,ShopPanel,AnimatedBackground,ScoreCounter,Particles}.tsx` dentro del juego.
- `src/data/expandedCourseQuestions.ts`, `src/engine/gameStore.ts` dentro del juego.
- `scripts/game.test.ts`, `scripts/serve-game.mjs`.
- `README.md`, `replit.md`, `CHANGELOG.md`.

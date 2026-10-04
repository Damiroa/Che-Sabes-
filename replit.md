# Che Sabés

Juego de trivia escolar en español sobre React + Vite, Zustand y Framer Motion. Ver [README.md](README.md) para ejecución, arquitectura, URLs y publicación; [CHANGELOG.md](CHANGELOG.md) para cambios y validación.

## Operación

- Desarrollo: `pnpm run start:game` (3000) o `pnpm --filter @workspace/trivia-game dev` en primer plano.
- Tests: `pnpm run test:game`.
- Build del juego: `pnpm run build:game`.
- Build completo: `PORT=3000 BASE_PATH=/ pnpm run build`.
- Producción: `PORT=3001 pnpm run start:production` para pruebas; Replit usa el puerto 3000 configurado en `.replit`.
- El juego es enteramente cliente: no necesita API, base de datos ni credenciales.

## Convenciones que deben preservarse

- `question.correct` contiene la respuesta correcta; no existe un campo `answer`.
- Conservar IDs de preguntas y la clave persistente `che-sabes-store`.
- No repetir IDs durante una partida, incluidos los saltos. Agotamiento termina la partida.
- Usar `getStreakMultiplier(streak, shop.maxMulti)` para respetar la mejora de racha.
- Timer Pro se aplica al iniciar una partida.
- Nunca ejecutar acciones del store ni sonidos dentro de actualizadores de estado React.
- El temporizador tiene su propio componente y limpia intervalos/listeners; silenciar no reinicia la cuenta.
- Preferir una sola estructura responsive, controles de 48 px y transiciones de 350 ms; respetar movimiento reducido.
- Fuente Outfit local con licencia OFL. No restaurar fuentes externas ni fondos gigantes con blur animado.
- Récord, tienda de cinco artículos, escudos, monedas, música y efectos se conservan.

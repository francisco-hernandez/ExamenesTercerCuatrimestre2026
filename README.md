# Misiones de Repaso (3er grado)

Exámenes de práctica convertidos en juegos. Cada jugador escribe su nombre al empezar (se guarda solo en su navegador) y elige una misión.

| Materia | Temática |
|---------|----------|
| Estudios Sociales | Jurassic World ✅ |
| Español | LEGO ✅ |
| Portugués | Parque Jurásico ✅ |
| Inglés | Marvel ✅ |
| Matemáticas | Minecraft ✅ |
| Science | Five Nights at Freddy's ✅ |

## Reglas del juego
- 3 intentos por ejercicio, con pistas.
- Cada respuesta vale 10, 5 o 2 puntos según el intento; nunca se restan puntos.
- Pausa de respiro entre talleres y premio al llegar al 70 %.
- Cada jugador tiene su propio perfil (récords, avance y preguntas falladas), guardado solo en el navegador del dispositivo. Al entrar se elige el jugador o se escribe un nombre nuevo.
- Botón "Borrar todo y empezar de nuevo" en el menú (pide confirmación) para dejar el dispositivo limpio.
- Botón para silenciar el sonido.
- Al final, lista "Para repasar" con las preguntas falladas y botón para repetir solo esas.

## Accesibilidad
Navegable con teclado (Tab y flechas), compatible con lectores de pantalla, estados con icono además de color, idioma marcado por materia y contraste WCAG AA verificado con axe-core.

## Uso
Abrir `index.html` en el navegador. Sin servidor ni instalación. Se publica en Vercel como sitio estático (sin configuración).

## Agregar una materia
1. Crear `js/subjects/<id>.js` con `EXAMS.<id> = {...}` (ver `js/subjects/sociales.js` como plantilla).
2. Añadir `<script src="js/subjects/<id>.js">` en `index.html`.
3. Si usa una temática nueva, añadir sus variables en `css/app.css` (`body[data-theme="..."]`).
4. Verificar con `node tests/check.js`.

Las temáticas son homenajes de fans hechos con emojis y colores; no se usan logos ni imágenes oficiales de ninguna marca.

## Fotos
Las fotos son reales y vienen de [Wikimedia Commons](https://commons.wikimedia.org) con licencias libres (CC0, dominio público, CC BY y CC BY-SA). Están en `assets/img/` (640 px) y sus créditos (autor, licencia y enlace) en `js/credits.js`. La app los muestra bajo cada foto y en la página **Créditos de las fotos** del menú.

Para añadir una foto:
1. Guardarla en `assets/img/<clave>.jpg`.
2. Añadir su crédito en `js/credits.js`.
3. Usarla con `image: { src: '<clave>', alt: 'descripción que no revele la respuesta' }`.
4. `node tests/check.js` comprueba que toda foto tenga crédito y descripción.

## Publicar (GitHub + Vercel)
Es un sitio estático: no necesita build, servidor ni configuración.
1. Crear un repositorio vacío en GitHub y subir este proyecto (`git push`).
2. En [vercel.com](https://vercel.com) → **Add New… → Project** → importar el repositorio.
3. Framework Preset: **Other**. Dejar vacíos *Build Command* y *Output Directory*. **Deploy**.
Cada `git push` a `main` vuelve a publicar automáticamente.

## Pruebas
`node tests/check.js` valida la corrección de respuestas y la integridad de los 6 bancos de preguntas.

# 🎮 Misiones de Repaso — 3er grado

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
3 intentos por ejercicio con pistas · cada respuesta vale 10, 5 o 2 puntos según el intento · nunca se restan puntos · pausa de respiro entre talleres · premio al llegar al 70 % · el avance se guarda en el navegador para continuar después · botón para silenciar el sonido · al final, lista "Para repasar" con las preguntas falladas y botón para repetir solo esas.

## Accesibilidad
Navegable con teclado (Tab y flechas), compatible con lectores de pantalla, estados con icono además de color, idioma marcado por materia y contraste WCAG AA verificado con axe-core.

## Uso
Abrir `index.html` en el navegador. Sin servidor ni instalación. Se publica en Vercel como sitio estático (sin configuración).

## Agregar una materia
1. Crear `js/subjects/<id>.js` con `EXAMS.<id> = {...}` (ver `js/subjects/sociales.js` como plantilla).
2. Añadir `<script src="js/subjects/<id>.js">` en `index.html`.
3. Si usa una temática nueva, añadir sus variables en `css/app.css` (`body[data-theme="..."]`).
4. Verificar con `node tests/check.js`.

Las temáticas son homenajes de fans hechos con emojis y colores; no se usan logos ni imágenes oficiales.

## Publicar (GitHub + Vercel)
Es un sitio estático: no necesita build, servidor ni configuración.
1. Crear un repositorio vacío en GitHub y subir este proyecto (`git push`).
2. En [vercel.com](https://vercel.com) → **Add New… → Project** → importar el repositorio.
3. Framework Preset: **Other**. Dejar vacíos *Build Command* y *Output Directory*. **Deploy**.
Cada `git push` a `main` vuelve a publicar automáticamente.

## Pruebas
`node tests/check.js` valida la corrección de respuestas y la integridad de los 6 bancos de preguntas.

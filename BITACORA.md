# 📒 Bitácora — Misiones de Repaso (3er grado, III Trimestre 2026)

Registro de decisiones, cambios y avances del proyecto. Entradas más recientes al final.

## Contexto

- **Objetivo:** convertir las prácticas en PDF de cada materia en juegos/exámenes interactivos para repasar.
- **Stack:** HTML5 + CSS3 + Bootstrap 5 + JavaScript vanilla. Sin servidor ni build. Otro lenguaje solo si un requisito concreto lo exige (se estudia en su momento).
- **Referencia:** `PortuguesEjemplo/` (examen del año pasado, temática Parque Jurásico). Arquitectura: `index.html` + `css/styles.css` + `js/{data,app,ui,audio}.js`. Mecánicas: comprobación inmediata, 3 intentos con pistas, solo puntos positivos, mini-juegos de respiro, marcador en vivo, mensaje especial al 70 %.
- **Temáticas disponibles:** Parque Jurásico, Jurassic World, Minecraft, Five Nights at Freddy's, LEGO (videojuegos de consola), superhéroes Marvel (Iron Man, Dr. Strange, Capitán América…).

## Calendario y contenidos (según `Temario de tercer grado.pdf`)

| # | Fecha | Materia | PDF de práctica | Temas |
|---|-------|---------|-----------------|-------|
| 1 | Mar 17 nov | Estudios Sociales | `1. Prac. Estudios Sociales.pdf` | Épocas seca/lluviosa; clima vs tiempo atmosférico; elementos y factores del clima; climas de CR y su ubicación; altitudes aptas (500–2500 m) y no aptas (páramo, bosque nuboso); actividades socioeconómicas; aportes culturales y económicos de las provincias |
| 2 | Mié 18 nov | Español | `2. Práctica español.pdf` | Partes del libro; raíz, prefijo y sufijo; familia de palabras; uso de j/g; sílaba tónica, agudas/graves/esdrújulas y tildes; sujeto y predicado; uso de c/s/z; comprensión lectora |
| 3 | Jue 19 nov | Portugués | `3.Prac. portugués.pdf` | Animais silvestres; preservação do meio ambiente; campanha educativa; sinônimos e antônimos; diminutivo e aumentativo; verbo ter (tenho, tem, temos, têm) |
| 4 | Vie 20 nov | Inglés | `4. English practice..pdf` | U6: gadgets vocab + comparatives/superlatives; U7: illnesses vocab + simple past (regular/irregular); U8: countries & landmarks + reading comprehension (school day) |
| 5 | Lun 23 nov | Matemáticas | `5. Práctica de matemáticas.pdf` | Multiplicación ×10/100/1000; división (reparto/agrupamiento); posición y localización; polígonos; radio y diámetro; masa; tiempo; observación e interrogación; moda; problemas × y ÷; triple y quíntuple |
| 6 | Mar 24 nov | Science | `6. Science Practice.pdf` | U6: simple vs complex machines; U7: landscapes (inland/coastal, peninsula/archipelago/island, natural/artificial, saving resources); U8: what causes weather, measuring weather |

## Registro de cambios

### 2026-11-10
- Creada esta bitácora.
- Revisado el temario y el ejemplo `PortuguesEjemplo/` (≈4 000 líneas; banco de ejercicios en `js/data.js` con tipos `multiple`, `matching`, `fill`, `text`).
- Decisiones tomadas con el usuario:
  - **Estructura:** una sola app con menú de materias y motor común (intentos, pistas, puntos, audio); cada materia aporta su banco de ejercicios y su tema visual.
  - **Reglas:** iguales al ejemplo — 3 intentos con pistas progresivas, solo sumar puntos, mini-juegos entre secciones, premio al 70 % (30 min más de juego).
  - **Orden de desarrollo:** por fecha de examen, empezando por Estudios Sociales.
  - **Temáticas:**
    | Materia | Temática |
    |---------|----------|
    | Estudios Sociales | Jurassic World |
    | Español | LEGO (videojuegos) |
    | Portugués | Parque Jurásico |
    | Inglés | Marvel (Iron Man, Dr. Strange, Capitán América…) |
    | Matemáticas | Minecraft |
    | Science | Five Nights at Freddy's |

- **Idioma:** contenido en el idioma de la materia, instrucciones en español (confirmado).
- **Publicación:** repo en GitHub + Vercel (sitio estático). App **anonimizada**: se pide el nombre al inicio (se guarda en `localStorage` del navegador de cada niño), sin nombres reales ni del colegio en el código.

#### Implementado: app base + Estudios Sociales
- Estructura:
  - `index.html` — página única.
  - `css/app.css` — estilos base con variables; cada temática las redefine en `body[data-theme]` (`jw` = Jurassic World).
  - `js/catalog.js` — lista de materias con fecha y temática; las que no tienen examen salen como "Próximamente".
  - `js/subjects/sociales.js` — banco de ejercicios de Sociales.
  - `js/engine.js` — motor común: nombre → menú → examen → resultados.
  - `js/audio.js` — reutilizado del ejemplo (sonidos generados con Web Audio).
  - `tests/check.js` — `node tests/check.js` valida corrección y datos.
- Tipos de ejercicio: `classify` (C/T, V/F, correspondencias, ubicar), `choice`, `write` (casillas con palabras clave o "escribe N de una lista"). Corrección sin tildes ni mayúsculas.
- Adaptaciones del PDF: los dibujos (actividades por época, climas, pirámide de altitudes) y el mapa para colorear se convirtieron en ejercicios de clasificar. Total Sociales: 23 ejercicios, 650 puntos.
- Puntuación: 10 pts por respuesta correcta (crédito parcial, nunca resta), 3 intentos con 2 pistas, revela la respuesta al 3.º. Un 🦖 cada 5 aciertos. Mini-juego "encuentra al T-Rex" entre talleres. Mejor % por materia guardado en el navegador.
- `.gitignore` excluye `*.pdf` y `PortuguesEjemplo/` (material del colegio con datos institucionales).
- Verificado: `node tests/check.js` OK; partida completa simulada en Edge headless → 650/650, sin errores, nombre escapado.

### 2026-11-10 (2) — Español (temática LEGO)
- `js/subjects/espanol.js`: las 15 partes del PDF en 3 niveles, 26 ejercicios, 1280 puntos. Tema `lego` en `css/app.css` (azul con pivotes, amarillo y rojo). Premio: 🧱 cada 5 aciertos. Mini-juego: encontrar la pieza amarilla.
- Motor (`write`) ampliado sin romper Sociales:
  - `fields[].pool` + `pools`: varias listas en un mismo ejercicio (familias de palabras).
  - `fields[].exact`: comparación exacta sin tildes y con separadores unificados (prefijos, sufijos, división silábica `cor-di-lle-ra`).
- Adaptaciones del PDF:
  - Partes 8 y 9 ("encierre/marque") → clasificar.
  - Parte 10 (poner tilde) → clasificar "lleva tilde / sin tilde".
  - Parte 12 (subrayar sujeto) → elegir el sujeto entre 3 opciones.
  - Partes 13 y 14 (escribir predicado/sujeto libre) → unir sujetos y predicados que concuerdan, porque una respuesta libre no se puede corregir automáticamente. Inventé los predicados y sujetos que se unen (rosas florecen, murciélagos viven en cueva, etc.).
- Verificado: `node tests/check.js` OK; partidas completas simuladas (acertando a la primera y fallando antes de acertar) → 1280/1280 sin errores; captura revisada.

### 2026-11-10 (3) — c/s/z en Español + Portugués (temática Parque Jurásico)
- Español:
  - Añadidos 2 ejercicios de c/s/z al Nivel 3 (no están en el PDF; se agregaron por el temario). Total 1410 pts.
  - Reglas usadas: plural z→ces, -cito y -cir con C; -oso e -ísimo con S; -azo y -eza con Z.
- Portugués (`js/subjects/portugues.js`):
  - Las 22 preguntas del PDF en 4 "Expedições", 23 ejercicios, 460 pts.
  - Contenido en portugués; pistas y ánimos en español. Tema `jp` (noche, amarillo y rojo). Premio: 🦕 cada 5 aciertos. Mini-juego: encontrar al braquiosaurio.
  - Adaptaciones:
    - Pregunta 21 (tenho/tem/temos/têm) → clasificar, para no tener que teclear "ê".
    - Diminutivo y aumentativo se escriben; "ao" vale por "ão".
    - Pregunta 22: corrección por palabras clave; las frases de campaña (D) aceptan cualquier frase sobre cuidar la naturaleza.
- Motor: un ejercicio puede tener un texto de lectura (`text`), que se muestra en un recuadro encima de la pregunta.
- Verificado: `node tests/check.js` OK; partidas simuladas de las 3 materias al 100 % sin errores; captura del tema revisada.

### 2026-11-10 (4) — Inglés (temática Marvel)
- `js/subjects/ingles.js`: toda la práctica en 4 "Missions", 9 ejercicios.
  - Cada punto del PDF vale 10 aquí: 46 puntos del PDF → 460 en el juego.
  - Contenido en inglés; pistas y ánimos en español, con Iron Man, Dr. Strange y Capitán América.
  - Tema `marvel` (azul noche, rojo, dorado). Premio: 💎 gema del infinito cada 5 aciertos. Mini-juego: encontrar el escudo 🛡️.
- Adaptaciones:
  - Vocabulario de gadgets y de enfermedades (con banco de palabras) → clasificar.
  - Pasado, comparativos y superlativos → escribir, con comparación exacta. Se acepta "the oldest" u "oldest", y "friendlier" o "more friendly".
  - Lectura de Carlos → escribir, corregido por palabras clave.
  - Errata del PDF "Canda" → "Canada".
- Verificado: `node tests/check.js` OK; partidas simuladas de las 4 materias al 100 % sin errores. A ancho de móvil no hay desbordamiento horizontal (medido: contenido 489 px dentro de una ventana de 504 px).

### 2026-11-10 (5) — Matemáticas (temática Minecraft)
- `js/subjects/matematicas.js`: la práctica completa en 3 "Mundos", 16 ejercicios, 330 pts.
  - Tema `minecraft` (pasto + tierra a cuadros, esquinas rectas, verde y diamante). Premio: 💎 diamante cada 5 aciertos. Mini-juego: encontrar el diamante.
- Polígonos y circunferencia dibujados en SVG dentro del código (sin imágenes externas).
- Adaptaciones:
  - "¿Qué es la circunferencia / el diámetro?" → elegir la definición, porque una definición libre no se puede corregir bien con palabras clave.
  - Reparto de lápices y problema de los marcadores → casillas de datos y resultado.
  - Las multiplicaciones aceptan punto de miles (80.000).
- **Errores encontrados en el PDF:**
  - Preguntas 4-6 dicen "2 ÷ 2 = 4"; en el juego se usa **8 ÷ 2 = 4**.
  - La tabla de multiplicar de la pág. 6 tiene erratas (1×5=6, 9×5=46, 10×0=10, 10×3=40). No se incluye en el juego.
- Verificado: `node tests/check.js` OK; partidas simuladas de las 5 materias al 100 % sin errores; capturas de polígonos, circunferencia y división revisadas.
- Temas del temario que no están en el PDF y no se incluyeron: posición y localización, estimar y comparar pesos, calcular la moda con datos (el PDF solo pregunta la definición).

### 2026-11-10 (6) — Extras de Matemáticas + Science (temática Five Nights, versión amigable)
- Matemáticas: añadido "Mundo 4 · Extras del temario" (no viene en el PDF), con 5 ejercicios:
  - Posición y localización: cuadrícula 3×3 con el minero como punto de referencia.
  - Estimar si algo se mide en gramos o en kilogramos.
  - Comparar 500 g con 1 kg.
  - Moda de una encuesta y moda de una lista de números.
  - Total Matemáticas: 470 pts.
- Science (`js/subjects/science.js`):
  - Todas las preguntas del PDF, reorganizadas por unidad del temario en 3 "Nights": máquinas (U6), paisajes (U7) y clima (U8). 23 ejercicios, 400 pts.
  - Contenido en inglés; pistas y ánimos en español.
  - Tema `fnaf`: pizzería de noche, luz de linterna, morado y amarillo. Sin sustos, apto para niños.
  - Premio: 🔋 recargar la linterna cada 5 aciertos. Mini-juego: encontrar al oso animatrónico.
  - "axel" del PDF corregido a "axle".
- Verificado: `node tests/check.js` OK; partidas simuladas de **las 6 materias** al 100 % (acertando a la primera y fallando antes de acertar) sin errores; capturas revisadas.

### 2026-11-10 (7) — Diseño responsivo (requisito explícito del usuario)
- Requisito: la app debe verse bien en celular, tablet y PC; para eso se usa Bootstrap 5.
- Cambios:
  - Menú en 2 columnas en celular (`col-6`) y 3 en PC (`col-lg-4`).
  - En celular (xs), la barra superior pone el título en su propia línea; también se reducen el relleno de los paneles, los tamaños de letra y los emojis.
  - Botones y tarjetas de al menos 44 px de alto para tocarlos con el dedo.
- Verificado con iframes a 360 px (celular) y 768 px (tablet), en 15 pantallas representativas de las 6 materias: ninguna se desborda horizontalmente. Capturas a 360 px revisadas.
- Herramienta de prueba: en `scratchpad/resp.html`, fuera del repo.

### 2026-11-10 (8) — Auditoría de accesibilidad UX + UI (solo revisión, sin cambios)
- Pruebas realizadas:
  - axe-core 4.10 (WCAG 2.1 AA + buenas prácticas) en 16 pantallas de las 6 materias.
  - Cálculo de contraste WCAG para cada par de colores de los 7 temas.
  - Comprobación del foco del teclado, `aria-*`, `lang` y título de la página.
- Hallazgos (detalle en la conversación del 2026-11-10; pendientes de decisión del usuario):
  - **Críticos:**
    - El foco se pierde al cambiar de pantalla.
    - El estado de las opciones (elegida, correcta, incorrecta) depende solo del color, y el par rojo/verde es inaccesible para daltónicos.
    - Las respuestas por eliminación dan puntos completos, así que el 70 % casi siempre se alcanza.
  - **Importantes:**
    - El contenido en inglés y portugués no lleva atributo `lang`.
    - El mini-juego revela la respuesta al lector de pantalla y el de LEGO depende del color.
    - Contraste insuficiente en la cabecera de Minecraft (1.85:1).
    - "← Menú" pierde el progreso sin confirmar.
    - No hay botón para silenciar el sonido.
  - **Menores:**
    - Falta `h1` en las pantallas de ejercicio.
    - `btn-alt` de Parque Jurásico en 4.48:1.
    - Puntos de LEGO en 4.38:1.
    - Texto de 12 px en las tarjetas en celular.
    - Las respuestas escritas incorrectas se borran.
    - El título de la pestaña no cambia.

### 2026-11-10 (9) — Correcciones de accesibilidad + puntuación por intento + avance guardado
- Decisiones del usuario: corregir todos los hallazgos de la auditoría, **opción A** de puntuación y **guardar el avance**. El repaso de errores al final queda pendiente (no se decidió).
- Puntuación (opción A): cada respuesta vale 10 / 5 / 2 puntos según se acierte al 1.er, 2.º o 3.er intento. La pista dice cuántos puntos quedan.
  - En simulación, fallar una vez cada pregunta da entre 64 % y 79 %, así que el 70 % vuelve a ser una meta real.
- Avance guardado: se guarda en `localStorage` al empezar cada paso.
  - El menú muestra "▶ Continuar (x %)" y un enlace "Empezar … de cero".
  - "← Menú" ya no pierde nada. Al terminar el examen se borra el avance.
- Accesibilidad:
  - **Foco:** al cambiar de pantalla, el foco va a la pregunta o al título, y el título de la pestaña indica la pantalla ("… ejercicio 3 de 23").
  - **Clasificar:**
    - Cada fila es un `radiogroup` con `aria-checked`, una sola parada de Tab y flechas para elegir.
    - Debajo de cada fila aparece el estado en texto: "✔ ¡Correcto!", "✖ Inténtalo de nuevo" o "➜ Respuesta: …".
  - **Estados sin depender del color:**
    - Iconos: ● elegida, ✔ correcta, ✖ incorrecta, ➜ respuesta.
    - Borde sólido si está bien y punteado si está mal.
    - Los mensajes dicen "marcadas con ✖", no "en rojo".
  - **Idioma:** `lang="pt"` o `lang="en"` en el contenido de Portugués, Inglés y Science (campo `lang` del examen).
  - **Mini-juego:** cada figura tiene su nombre accesible, que ya no revela la respuesta. LEGO se juega por forma (estrella entre cuadrados), no por color.
  - **Sonido:** botón 🔊/🔇 en la barra superior y en el menú, recordado entre visitas.
  - **Respuestas escritas:** las incorrectas ya no se borran; quedan marcadas con `aria-invalid` y el foco va a la primera mal escrita.
  - `h1` en todas las pantallas (el título del examen en la barra superior).
- UI y contraste:
  - Franja oscura detrás de la barra superior y de la frase del guía: Minecraft pasa de 1.85 a 5.84:1 y LEGO de 4.38 a 10:1.
  - `btn-alt` de Parque Jurásico pasa a 5.15:1. La frase del guía ya no va en cursiva.
  - Contorno de foco de 3 px con el color de acento. Texto mínimo de 14 px en las tarjetas.
  - Se quitan ✅/❌ de las etiquetas true/false de Science para no confundirlos con los iconos de estado.
- Pruebas:
  - `tests/check.js` ahora comprueba la puntuación por intento, que cada figura del mini-juego tenga nombre y que el `lang` sea válido.
  - Re-verificado: axe sin violaciones en todas las pantallas probadas (incluidos estados de error); partidas de las 6 materias; guardar y reanudar el avance; teclado con flechas; sin desbordamiento a 360 y 768 px; capturas revisadas.

### 2026-11-10 (10) — Repaso de errores al final + repetir solo las falladas
- Pedido por el usuario ("Oks a todo"): resumen de errores y botón de repetir solo las falladas.
- Motor (`js/engine.js`):
  - Se anota qué unidades no salieron al primer intento (`firstOk`). Al terminar un ejercicio, si hubo fallos, se guarda `{ step, wrong, at }` en `run.misses`; `at` es el intento en que quedó bien, o `null` si se reveló.
  - Los fallos se guardan junto con el avance, así que salir y continuar no los pierde.
  - Resultados: sección "📋 Para repasar (n)" agrupada por taller, con la pregunta, la respuesta correcta (solo los ítems fallados en clasificar) y "Acertaste al 2.º intento" o "No la acertaste: repásala".
  - Botón "🔁 Repetir solo las n falladas" (`App.practice()`): partida corta solo con esos ejercicios.
    - No guarda avance ni cambia el récord del examen.
    - Al terminar muestra "¡Repaso terminado!" y, si aún quedan fallos, permite repetir otra vez.
- Verificado:
  - Flujo completo en navegador: fallar 3 ejercicios, salir a mitad (los 2 fallos hasta ahí quedan guardados), continuar y terminar → 3 ítems en el repaso con su estado. Repetir las 3 → 100 % y "quedan 0"; el récord sigue igual.
  - axe sin violaciones en resultados con repaso; captura a 360 y 768 px revisada; `tests/check.js` OK.

### 2026-11-10 (11) — Repositorio preparado para GitHub y Vercel
- `git init` en la rama `main` y primer commit con los 16 archivos de la app (código, estilos, bancos de preguntas, pruebas, README, bitácora).
- `.gitignore`: excluye los PDF y `PortuguesEjemplo/` (material del colegio), además de basura de Windows/OneDrive (`desktop.ini`, `Thumbs.db`) y carpetas de editores y de Vercel.
- `.gitattributes`: finales de línea LF uniformes.
- README: sección "Publicar (GitHub + Vercel)". Es un sitio estático, sin build ni `vercel.json`: Framework Preset "Other".
- Revisado antes del commit: ningún archivo publicado contiene nombres del niño ni del colegio. `node tests/check.js` OK.
- Pendiente (lo hace el usuario): crear el repositorio en GitHub, hacer `git push` e importarlo en Vercel.

## Respuestas por verificar (Science)
1. "The green slide at recess" = **screw**. Ninguna opción es "inclined plane"; asumo que es un tobogán en espiral.
2. "scissors" = **simple machine**. Algunos libros la llaman compuesta (dos palancas).
3. Respuesta libre "save Earth's resources": se acepta cualquier frase con palabras como recycle, turn off, save, water, plant, trash...

## Respuestas por verificar (Español)
1. Raíz de "verdulero, verduras, verdulería, verduritas" = **verdu** (lo único común a las 4; el libro podría decir "verd" o "verdur").
2. Prefijos aceptados: des-peinado, ir-responsable, in-quieto, mini-falda, vice-presidente, pre-historia, des/contra-orden, co/auto-piloto.
3. Parte 10: "cordel" aparece entre las graves pero es aguda (sin tilde); lo indica la pista.
4. El temario incluye **comprensión lectora** (lecturas del libro), que no viene en la práctica PDF y no se incluyó (faltan los textos). El **uso de c, s, z** se añadió con reglas típicas; conviene compararlas con las págs. 160-165 del libro.

## Respuestas por verificar (Sociales)
Respuestas que asumí y conviene contrastar con el cuaderno:
1. C/T oración 2 (Cahuita, fin de semana) = **T** y oración 4 (Santa Ana, mañana calor/tarde lluvia) = **C**.
2. Ubicación de climas: seco = Guanacaste/Pacífico Norte; tropical húmedo = Pacífico Central y Sur; muy húmedo = Caribe y Zona Norte; montaña = cordilleras.
3. Pirámide de altitudes: 3000–4000 m páramo; 1500–2000 m hortalizas y ganadería de leche; 500–700 m caña de azúcar y ganadería de carne. (Dejé el café fuera por no tener claro a qué altura lo pone el libro).
4. Aportes culturales tangibles de Guanacaste aceptados: iglesia de Nicoya, La Casona, cerámica de Guaitil, marimba, sabanero/montura, quijongo, carreta.

## Decisiones abiertas
- [ ] Confirmar las "Respuestas por verificar". *(2026-11-10: se dejan como están de forma provisional; el usuario no tiene los libros a mano).*
- [x] Español (temática LEGO).
- [x] c/s/z añadido a Español.
- [x] Portugués (Parque Jurásico).
- [x] Inglés (Marvel).
- [x] Matemáticas (Minecraft).
- [x] Extras de Matemáticas (posición, pesos, moda).
- [x] Science (Five Nights, versión amigable).
- [x] Repaso de errores al final + repetir falladas.
- [ ] Revisión manual en navegador y celular (el usuario o el niño).
- [ ] Publicación: `git init`, subir a GitHub y conectar con Vercel.

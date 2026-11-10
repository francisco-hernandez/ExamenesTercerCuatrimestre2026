/**
 * MATEMÁTICAS — Práctica III trimestre (temática Minecraft)
 * Fuente: "5. Práctica de matemáticas.pdf" + "Temario de tercer grado.pdf".
 * Tipos y formato: ver cabecera de js/subjects/sociales.js.
 * Correcciones al PDF: las preguntas 4-6 dicen "2 ÷ 2 = 4"; aquí se usa "8 ÷ 2 = 4".
 * Adaptaciones: polígonos y circunferencia se dibujan en SVG; "¿Qué es la circunferencia/el diámetro?" → elegir la definición.
 */
(() => {
    const exact = (label, ...accept) => ({ label, accept, exact: true });
    // Polígono regular de n lados (sin nombre accesible que delate la respuesta).
    const poly = n => {
        const pts = Array.from({ length: n }, (_, i) => {
            const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
            return `${(50 + 42 * Math.cos(a)).toFixed(1)},${(52 + 42 * Math.sin(a)).toFixed(1)}`;
        }).join(' ');
        return `<svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true"><polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/></svg>`;
    };
    const CIRCLE = `<svg viewBox="0 0 160 130" width="260" style="max-width:100%;display:block;margin:auto" role="img" aria-label="Circunferencia con tres elementos numerados">
        <circle cx="70" cy="65" r="55" fill="none" stroke="#222" stroke-width="3"/>
        <line x1="70" y1="10" x2="70" y2="120" stroke="#1e6fd9" stroke-width="3"/>
        <line x1="70" y1="65" x2="125" y2="65" stroke="#d92e1e" stroke-width="3"/>
        <circle cx="70" cy="65" r="5" fill="#222"/>
        <text x="50" y="35" font-size="16" font-weight="bold" fill="#1e6fd9">1</text>
        <text x="56" y="88" font-size="16" font-weight="bold" fill="#222">2</text>
        <text x="100" y="58" font-size="16" font-weight="bold" fill="#d92e1e">3</text>
    </svg>`;
    const DIV = mark => {
        const t = ['8', '2', '4'].map((n, i) => (i === mark ? `<mark>${n}</mark>` : n));
        return `Observa la división y di cómo se llama el número marcado: <span class="eq">${t[0]} ÷ ${t[1]} = ${t[2]}</span>`;
    };
    const TERMS = ['Divisor', 'Cociente', 'Dividendo'];

    EXAMS.matematicas = {
        title: 'Minecraft: la mina de los números',
        theme: 'minecraft',
        guide: { emoji: '⛏️', name: 'el minero' },
        reward: { emoji: '🪨', won: '💎', every: 5, label: '¡Encontraste un diamante!' },
        miniGame: {
            prompt: '¡Hay un diamante escondido en la mina! Encuéntralo', target: '💎', decoys: ['🪨', '🧱', '🟫', '🌳', '🪵', '⬛'],
            names: { '💎': 'diamante', '🪨': 'piedra', '🧱': 'ladrillo', '🟫': 'tierra', '🌳': 'árbol', '🪵': 'madera', '⬛': 'carbón' }
        },
        cheers: [
            '¡A minar respuestas, {name}! Piensa paso a paso.',
            '{name}, revisa tus cuentas antes de comprobar.',
            '¡Cada respuesta es un bloque más, {name}!',
            'Con calma, {name}: los buenos mineros no se apuran.',
            '¡Tú puedes, {name}! Usa lápiz y papel si lo necesitas.'
        ],
        sections: [
            {
                title: 'Mundo 1 · Datos y medidas',
                intro: 'La moda, cómo recolectar información, medidas de masa y de tiempo.',
                exercises: [
                    {
                        type: 'choice', prompt: 'La <strong>moda</strong> en un grupo de datos corresponde a:',
                        options: ['El total de datos', 'El valor que más se repite', 'El valor que menos se repite'], answer: 1,
                        hints: ['Piensa en "estar de moda": lo que más se ve.', 'En 2, 5, 5, 7 la moda es 5 porque se repite más.']
                    },
                    {
                        type: 'choice', prompt: 'Una <strong>técnica para recolectar información</strong> corresponde a:',
                        options: ['Leer', 'Dibujar', 'Observar'], answer: 2,
                        hints: ['Las técnicas que vimos son la observación y la interrogación (preguntar).', 'Mirar con atención y anotar lo que ves = ...']
                    },
                    {
                        type: 'choice', prompt: 'El símbolo <strong>kg</strong> se utiliza para representar al:',
                        options: ['Gramo', 'Kilogramo', 'Miligramo'], answer: 1,
                        hints: ['"k" viene de "kilo".', 'El gramo se escribe "g" solita.']
                    },
                    {
                        type: 'write',
                        prompt: 'Equivalencias de tiempo: escribe a cuánto equivale cada uno.',
                        fields: [
                            { label: '1 minuto = ¿cuántos segundos?', accept: ['60', 'sesenta'] },
                            { label: '1 día = ¿cuántas horas?', accept: ['24', 'veinticuatro'] },
                            { label: '1 mes = ¿cuántos días (o semanas)?', accept: ['30', '31', 'treinta', '4 semanas', 'cuatro semanas'] }
                        ],
                        answer: '1 minuto = 60 segundos; 1 día = 24 horas; 1 mes = 30 días (unas 4 semanas).',
                        hints: ['Mira un reloj: la aguja de los segundos da una vuelta completa en 1 minuto.', 'Un mes tiene casi siempre 30 o 31 días.']
                    }
                ]
            },
            {
                title: 'Mundo 2 · Polígonos y circunferencia', image: { src: 'matematicas-panal', alt: 'Lámina de cera de abejas llena de celdas iguales' },
                intro: 'Clasificar polígonos según sus lados y los elementos de la circunferencia.',
                exercises: [
                    {
                        type: 'classify',
                        prompt: 'Cuenta los lados y elige el nombre de cada polígono.',
                        categories: [
                            { key: 'hepta', label: 'Heptágono regular' }, { key: 'penta', label: 'Pentágono regular' },
                            { key: 'hexa', label: 'Hexágono regular' }, { key: 'octa', label: 'Octágono regular' }
                        ],
                        items: [
                            { text: poly(5), answer: 'penta' },
                            { text: poly(6), answer: 'hexa' },
                            { text: poly(8), answer: 'octa' },
                            { text: poly(7), answer: 'hepta' }
                        ],
                        hints: ['Cuenta los lados con el dedo, uno por uno.', 'Penta = 5, hexa = 6, hepta = 7, octo = 8 (como el pulpo, que tiene 8 brazos).']
                    },
                    {
                        type: 'write', text: CIRCLE,
                        prompt: 'Escribe el nombre de cada elemento de la circunferencia.',
                        fields: [
                            { label: '1 (línea azul)', accept: ['diametro'] },
                            { label: '2 (punto del medio)', accept: ['centro'] },
                            { label: '3 (línea roja)', accept: ['radio'] }
                        ],
                        answer: '1 = diámetro; 2 = centro; 3 = radio.',
                        hints: ['La línea que cruza todo el círculo pasando por el medio es el diámetro.', 'La línea que va del centro al borde es el radio.']
                    },
                    {
                        type: 'choice', prompt: '¿Qué es la <strong>circunferencia</strong>?',
                        options: [
                            'Una línea curva cerrada; todos sus puntos están a la misma distancia del centro.',
                            'Una línea recta que pasa por el centro.',
                            'Un polígono de muchos lados.'
                        ], answer: 0,
                        hints: ['Es el "borde" del círculo.', 'No tiene lados rectos.']
                    },
                    {
                        type: 'choice', prompt: '¿Qué es el <strong>diámetro</strong>?',
                        options: [
                            'La línea que va del centro al borde.',
                            'La línea que une dos puntos de la circunferencia pasando por el centro.',
                            'El punto del medio de la circunferencia.'
                        ], answer: 1,
                        hints: ['El diámetro cruza toda la circunferencia.', 'Mide lo mismo que dos radios juntos.']
                    }
                ]
            },
            {
                title: 'Mundo 3 · Operaciones y problemas', image: { src: 'matematicas-lapices', alt: 'Lápices de colores ordenados en círculo' },
                intro: 'Términos de la división, multiplicación por 10 y 100, triple, quíntuple, reparto y problemas.',
                exercises: [
                    {
                        type: 'choice', prompt: DIV(0), options: TERMS, answer: 2,
                        hints: ['Es el número que se reparte.', 'El primero de la división es el dividendo.']
                    },
                    {
                        type: 'choice', prompt: DIV(1), options: TERMS, answer: 0,
                        hints: ['Es el número entre el que se divide (en cuántas partes repartimos).', 'Después del signo ÷ va el divisor.']
                    },
                    {
                        type: 'choice', prompt: DIV(2), options: TERMS, answer: 1,
                        hints: ['Es el resultado de la división.', 'El resultado de una división se llama cociente.']
                    },
                    {
                        type: 'write',
                        prompt: 'Multiplicación abreviada: escribe el resultado.',
                        fields: [exact('712 × 10 =', '7120', '7.120'), exact('800 × 100 =', '80000', '80.000'), exact('52 × 100 =', '5200', '5.200')],
                        answer: '7120; 80 000; 5200.',
                        hints: ['× 10: agrega un cero al final. × 100: agrega dos ceros.', '800 × 100 → 800 + 00 = 80000.']
                    },
                    {
                        type: 'write',
                        prompt: 'Escribe el <strong>triple</strong> de cada número (× 3).',
                        fields: [exact('Triple de 32 =', '96'), exact('Triple de 43 =', '129'), exact('Triple de 24 =', '72')],
                        answer: '96; 129; 72.',
                        hints: ['Triple = multiplicar por 3 (o sumar el número 3 veces).', '32 + 32 + 32 = 96.']
                    },
                    {
                        type: 'write',
                        prompt: 'Escribe el <strong>quíntuple</strong> de cada número (× 5).',
                        fields: [exact('Quíntuple de 51 =', '255'), exact('Quíntuple de 45 =', '225'), exact('Quíntuple de 30 =', '150')],
                        answer: '255; 225; 150.',
                        hints: ['Quíntuple = multiplicar por 5.', '30 × 5 = 150 (3 × 5 = 15 y agregas el cero).']
                    },
                    {
                        type: 'write',
                        text: '<div class="text-center fs-1">✏️✏️✏️ &nbsp;|&nbsp; ✏️✏️✏️</div><p class="text-center mb-0">Los lápices se repartieron en partes iguales en 2 grupos.</p>',
                        prompt: 'Reparto equitativo: escribe la división que corresponde.',
                        fields: [
                            exact('¿Cuántos lápices hay en total? (dividendo)', '6'),
                            exact('¿En cuántos grupos se repartieron? (divisor)', '2'),
                            exact('¿Cuántos lápices hay en cada grupo? (cociente)', '3')
                        ],
                        answer: '6 ÷ 2 = 3.',
                        hints: ['Cuenta todos los lápices juntos.', 'Total ÷ grupos = lápices en cada grupo.']
                    },
                    {
                        type: 'write',
                        text: 'Si una caja tiene <strong>242</strong> marcadores, ¿cuántos marcadores habrá en <strong>5</strong> cajas?',
                        prompt: 'Resolución de problemas: datos, operación y respuesta.',
                        fields: [
                            exact('Dato: marcadores en una caja', '242'),
                            exact('Dato: número de cajas', '5'),
                            { label: 'Respuesta: ¿cuántos marcadores hay en 5 cajas? (242 × 5)', accept: ['1210', '1 210', '1.210'] }
                        ],
                        answer: '242 × 5 = 1210 marcadores.',
                        hints: ['Multiplica por partes: 200 × 5 = 1000, 40 × 5 = 200, 2 × 5 = 10.', '1000 + 200 + 10 = ...']
                    }
                ]
            },
            // Mundo 4: temas del temario que no vienen en la práctica PDF (añadidos a pedido del usuario).
            {
                title: 'Mundo 4 · Extras del temario', image: { src: 'matematicas-balanza', alt: 'Balanza antigua con aguja' },
                intro: 'Posición y localización, medidas de peso y cómo encontrar la moda.',
                exercises: [
                    {
                        type: 'classify',
                        text: `<table class="grid-map" aria-label="Mapa de 3 por 3 con el minero en el centro">
                            <tr><td>🌳</td><td>🏠</td><td>🐄</td></tr>
                            <tr><td>🐷</td><td class="ref">⛏️<small>minero</small></td><td>🐔</td></tr>
                            <tr><td>🧱</td><td>💎</td><td>🪵</td></tr></table>`,
                        prompt: 'Toma al minero como punto de referencia. ¿Qué hay en cada posición?',
                        categories: [
                            { key: 'casa', label: '🏠 casa' }, { key: 'cerdo', label: '🐷 cerdo' }, { key: 'gallina', label: '🐔 gallina' },
                            { key: 'diamante', label: '💎 diamante' }, { key: 'vaca', label: '🐄 vaca' }
                        ],
                        items: [
                            { text: 'Arriba del minero', answer: 'casa' },
                            { text: 'Abajo del minero', answer: 'diamante' },
                            { text: 'A la izquierda del minero', answer: 'cerdo' },
                            { text: 'A la derecha del minero', answer: 'gallina' },
                            { text: 'Arriba y a la derecha del minero (en la esquina)', answer: 'vaca' }
                        ],
                        hints: ['Pon el dedo sobre el minero y muévelo un cuadro hacia donde dice la pregunta.', 'Truco: extiende el pulgar y el índice de las dos manos; la que forma una "L" es la izquierda.']
                    },
                    {
                        type: 'classify',
                        prompt: 'Estima el peso: ¿se mide mejor en gramos (g) o en kilogramos (kg)?',
                        categories: [{ key: 'g', label: 'g (gramos)' }, { key: 'kg', label: 'kg (kilogramos)' }],
                        items: [
                            { text: '🪶 Una pluma', answer: 'g' }, { text: '🍉 Una sandía', answer: 'kg' }, { text: '🐕 Un perro', answer: 'kg' },
                            { text: '✏️ Un lápiz', answer: 'g' }, { text: '🍪 Una galleta', answer: 'g' }, { text: '🍚 Un saco de arroz', answer: 'kg' }
                        ],
                        hints: ['Las cosas livianas, que levantas con dos dedos, se miden en gramos.', 'Las cosas pesadas se miden en kilogramos. 1 kg = 1000 g.']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Qué pesa más?',
                        options: ['Una bolsa de 500 g', 'Una bolsa de 1 kg', 'Pesan lo mismo'], answer: 1,
                        hints: ['Pasa todo a gramos para comparar.', '1 kg = 1000 g, y 1000 es más que 500.']
                    },
                    {
                        type: 'choice',
                        text: 'Encuesta: le preguntamos a 8 compañeros su bloque favorito de Minecraft.<br>🟫 tierra, 💎 diamante, 🪵 madera, 💎 diamante, 🟫 tierra, 💎 diamante, 🪨 piedra, 💎 diamante',
                        prompt: '¿Cuál es la <strong>moda</strong> de la encuesta?',
                        options: ['Tierra', 'Diamante', 'Madera', 'Piedra'], answer: 1,
                        hints: ['Cuenta cuántas veces aparece cada bloque.', 'La moda es el que más se repite: el diamante aparece 4 veces.']
                    },
                    {
                        type: 'write',
                        text: 'Goles que metió el equipo en cada partido: <strong>2, 5, 3, 5, 1, 5, 2</strong>',
                        prompt: 'Escribe la <strong>moda</strong> de estos datos.',
                        fields: [exact('Moda =', '5')],
                        answer: 'La moda es 5 (aparece 3 veces).',
                        hints: ['Ordena los datos: 1, 2, 2, 3, 5, 5, 5.', '¿Qué número se repite más veces?']
                    }
                ]
            }
        ]
    };
})();

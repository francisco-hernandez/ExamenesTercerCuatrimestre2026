/**
 * ESPAÑOL — Práctica III trimestre (temática LEGO)
 * Fuente: "2. Práctica español.pdf" (partes 1 a 15) + "Temario de tercer grado.pdf".
 * Tipos y formato: ver cabecera de js/subjects/sociales.js.
 * Adaptaciones: "encierre/marque/subraye" → clasificar o elegir;
 * "complete con sujeto/predicado" → unir sujetos y predicados que concuerdan.
 */
(() => {
    // División silábica + sílaba tónica: 2 casillas exactas por palabra.
    const syl = (word, division, tonic) => [
        { label: `${word} → división en sílabas (sepáralas con guiones: a-mi-go)`, accept: [division], exact: true },
        { label: `${word} → sílaba tónica`, accept: [tonic], exact: true }
    ];
    // Prefijo o sufijo: vale escribir solo la parte o la palabra completa.
    const part = (label, ...accept) => ({ label, accept, exact: true });

    EXAMS.espanol = {
        title: 'Construye el castillo de las palabras',
        theme: 'lego',
        guide: { emoji: '👷', name: 'la maestra constructora' },
        reward: { emoji: '🔲', won: '🧱', every: 5, label: '¡Ganaste un bloque para tu castillo!' },
        // se busca por FORMA (estrella entre cuadrados), no por color, para que sirva a niños daltónicos
        miniGame: {
            prompt: '¡Se perdió la pieza con forma de estrella! Encuéntrala entre los bloques cuadrados', target: '⭐', decoys: ['🟥', '🟦', '🟩', '🟧', '🟪', '🟫'],
            names: { '⭐': 'pieza estrella', '🟥': 'bloque rojo', '🟦': 'bloque azul', '🟩': 'bloque verde', '🟧': 'bloque naranja', '🟪': 'bloque morado', '🟫': 'bloque café' }
        },
        cheers: [
            '¡Bloque a bloque, {name}! Tú puedes.',
            '{name}, cada respuesta es una pieza más de tu castillo.',
            'Lee con calma, constructor {name}.',
            '¡Gran trabajo, {name}! Sigue construyendo.',
            'Respira hondo, {name}. Las instrucciones siempre ayudan.'
        ],
        sections: [
            {
                title: 'Nivel 1 · El libro y la formación de palabras', image: { src: 'espanol-libros', alt: 'Pila de libros de colores' },
                intro: 'Partes del libro, familias de palabras, raíz, prefijos y sufijos.',
                exercises: [
                    {
                        type: 'classify',
                        prompt: 'El libro y sus partes: ¿qué parte del libro describe cada definición?',
                        categories: [
                            { key: 'portada', label: 'Portada' }, { key: 'contraportada', label: 'Contraportada' }, { key: 'lomo', label: 'Lomo' },
                            { key: 'prologo', label: 'Prólogo' }, { key: 'indice', label: 'Índice' }, { key: 'cuerpo', label: 'Cuerpo' }
                        ],
                        items: [
                            { text: 'Es la tapa de atrás. Esta tapa incluye algunos datos del libro.', answer: 'contraportada' },
                            { text: 'Presenta el título, nombre del autor y la editorial, acompañado de una ilustración principal.', answer: 'portada' },
                            { text: 'Lista de temas del libro y la página donde aparece cada uno.', answer: 'indice' },
                            { text: 'Parte gruesa del libro que une ambas tapas.', answer: 'lomo' },
                            { text: 'Contiene todo el desarrollo del tema del libro.', answer: 'cuerpo' },
                            { text: 'Tiene una explicación del libro.', answer: 'prologo' }
                        ],
                        hints: [
                            '"Contra" significa "del otro lado": la contraportada es la tapa de atrás.',
                            'El índice te dice en qué página está cada tema; el prólogo va antes del cuerpo y explica el libro.'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Familia de palabras: escribe dos palabras completas de cada familia.',
                        fields: [
                            { label: '👖 Pantalón → pantalon…', pool: 'pantalon' }, { label: '👖 Pantalón → pantalon…', pool: 'pantalon' },
                            { label: '⭐ Estrella → estrell…', pool: 'estrella' }, { label: '⭐ Estrella → estrella…', pool: 'estrella' },
                            { label: '🌊 Mar → mar…', pool: 'mar' }, { label: '🌊 Mar → mar…', pool: 'mar' }
                        ],
                        pools: {
                            pantalon: [['pantaloneta'], ['pantaloncito'], ['pantaloncillo'], ['pantalonera'], ['pantalonero'], ['pantalonazo']],
                            estrella: [['estrellita'], ['estrellado', 'estrellada'], ['estrellar'], ['estrellon'], ['estrellero']],
                            mar: [['marino'], ['marinero'], ['marina'], ['marea'], ['mareo'], ['maremoto'], ['marisco'], ['maritimo']]
                        },
                        answer: 'Pantaloneta, pantaloncito; estrellita, estrellado; marino, marinero, marea, maremoto.',
                        hints: ['Agrega un final a la palabra: -ito, -ero, -ado...', 'Ejemplo: sol → soleado, solecito.']
                    },
                    {
                        type: 'write',
                        prompt: 'Más familias de palabras: escribe dos palabras completas de cada familia.',
                        fields: [
                            { label: '🍎 Fruta → frut…', pool: 'fruta' }, { label: '🍎 Fruta → frut…', pool: 'fruta' },
                            { label: '🌸 Flor → flor…', pool: 'flor' }, { label: '🌸 Flor → flor…', pool: 'flor' },
                            { label: '☀️ Sol → sol…', pool: 'sol' }, { label: '☀️ Sol → sol…', pool: 'sol' }
                        ],
                        pools: {
                            fruta: [['frutero', 'frutera'], ['fruteria'], ['frutal'], ['frutita'], ['frutilla'], ['fruto'], ['frutoso']],
                            flor: [['florero'], ['floreria'], ['florista', 'floristeria'], ['florecer'], ['florido', 'florida'], ['florecita', 'florcita'], ['floral'], ['floracion']],
                            sol: [['soleado', 'soleada'], ['solar'], ['solecito'], ['solazo'], ['solana']]
                        },
                        answer: 'Frutero, frutería, frutal; florero, florista, floral; soleado, solar, solecito.',
                        hints: ['¿Dónde se ponen las flores? En el flor...', '¿Cómo es un día con mucho sol? Sole...']
                    },
                    {
                        type: 'classify',
                        prompt: 'La raíz: ¿cuál es la raíz que tienen en común estas palabras?',
                        categories: [
                            { key: 'pint', label: 'pint' }, { key: 'pan', label: 'pan' }, { key: 'zapat', label: 'zapat' },
                            { key: 'verdu', label: 'verdu' }, { key: 'ero', label: 'ero' }, { key: 'eria', label: 'ería' }
                        ],
                        items: [
                            { text: 'Pintura; pintor; pintalabios; pintar', answer: 'pint' },
                            { text: 'Pan; panadero; pancito; panecillo', answer: 'pan' },
                            { text: 'Zapato; zapatera; zapatería; zapatero', answer: 'zapat' },
                            { text: 'Verdulero; verduras; verdulería; verduritas', answer: 'verdu' }
                        ],
                        hints: [
                            'La raíz es la parte que se repite al INICIO de todas las palabras.',
                            '"-ero" y "-ería" van al final: son sufijos, no raíces.'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Prefijos: escribe un prefijo para formar una palabra nueva.',
                        fields: [
                            part('___ peinado', 'des', 'despeinado'),
                            part('___ responsable', 'ir', 'irresponsable'),
                            part('___ quieto', 'in', 'inquieto'),
                            part('___ falda', 'mini', 'minifalda')
                        ],
                        answer: 'despeinado, irresponsable, inquieto, minifalda.',
                        hints: ['El prefijo va ANTES de la raíz. Ejemplo: "des" + hacer = deshacer.', 'Prueba con: des, ir, in, mini.']
                    },
                    {
                        type: 'write',
                        prompt: 'Más prefijos: escribe un prefijo para formar una palabra nueva.',
                        fields: [
                            part('___ presidente', 'vice', 'vicepresidente'),
                            part('___ historia', 'pre', 'prehistoria'),
                            part('___ orden', 'des', 'desorden', 'contra', 'contraorden'),
                            part('___ piloto', 'co', 'copiloto', 'auto', 'autopiloto')
                        ],
                        answer: 'vicepresidente, prehistoria, desorden, copiloto.',
                        hints: ['Piensa: el que ayuda al presidente, la época antes de la historia...', 'Prueba con: vice, pre, des, co.']
                    },
                    {
                        type: 'write',
                        prompt: 'Sufijos: une la palabra con el sufijo y escribe la palabra nueva. (Ejemplo: fama + oso = famoso).',
                        fields: [
                            part('ventana + illa', 'ventanilla'),
                            part('cariño + oso', 'cariñoso'),
                            part('círculo + ar', 'circular'),
                            part('explora + dor', 'explorador')
                        ],
                        answer: 'ventanilla, cariñoso, circular, explorador.',
                        hints: ['A veces la última vocal de la palabra desaparece: fama + oso = famoso (sin la "a").', 'círculo + ar → circul + ar.']
                    },
                    {
                        type: 'write',
                        prompt: 'Más sufijos: une la palabra con el sufijo y escribe la palabra nueva.',
                        fields: [
                            part('flor + al', 'floral'),
                            part('pizarra + on', 'pizarrón'),
                            part('cocina + ero', 'cocinero')
                        ],
                        answer: 'floral, pizarrón, cocinero.',
                        hints: ['Quita la última vocal si hace falta: pizarra → pizarr + on.', 'cocina → cocin + ero.']
                    }
                ]
            },
            {
                title: 'Nivel 2 · Ortografía: g, j y acentuación',
                intro: 'Uso de g y j, sílaba tónica, palabras agudas, graves, esdrújulas y sobreesdrújulas.',
                exercises: [
                    {
                        type: 'classify',
                        prompt: '¿Se escribe con G o con J?',
                        categories: [{ key: 'g', label: 'G' }, { key: 'j', label: 'J' }],
                        items: [
                            { text: '__eoplano', answer: 'g' },
                            { text: 'gara__e', answer: 'j' },
                            { text: 'co__ear', answer: 'j' },
                            { text: 'e__ecución', answer: 'j' },
                            { text: 'di__erir', answer: 'g' },
                            { text: 'e__emplo', answer: 'j' },
                            { text: 'lina__e', answer: 'j' },
                            { text: 'ali__erar', answer: 'g' }
                        ],
                        hints: [
                            'Con G: palabras que empiezan con geo, ger, gest, leg y verbos en ger, gir, igerar, gerir, giar.',
                            'Con J: palabras que empiezan o terminan en aje / eje y verbos terminados en jear.'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Divide en sílabas y escribe la sílaba tónica (la que suena más fuerte).',
                        fields: [
                            ...syl('Cordillera', 'cor-di-lle-ra', 'lle'),
                            ...syl('Mantequilla', 'man-te-qui-lla', 'qui'),
                            ...syl('Pantaloneta', 'pan-ta-lo-ne-ta', 'ne'),
                            ...syl('Amistad', 'a-mis-tad', 'tad'),
                            ...syl('Cartón', 'car-tón', 'tón')
                        ],
                        answer: 'cor-di-LLE-ra; man-te-QUI-lla; pan-ta-lo-NE-ta; a-mis-TAD; car-TÓN.',
                        hints: ['Aplaude la palabra despacio: cada aplauso es una sílaba.', 'Dila como si llamaras a alguien de lejos: la sílaba que estiras es la tónica.']
                    },
                    {
                        type: 'write',
                        prompt: 'Divide en sílabas y escribe la sílaba tónica.',
                        fields: [
                            ...syl('Tormenta', 'tor-men-ta', 'men'),
                            ...syl('Abejitas', 'a-be-ji-tas', 'ji'),
                            ...syl('Taza', 'ta-za', 'ta'),
                            ...syl('Candelabro', 'can-de-la-bro', 'la'),
                            ...syl('Especial', 'es-pe-cial', 'cial')
                        ],
                        answer: 'tor-MEN-ta; a-be-JI-tas; TA-za; can-de-LA-bro; es-pe-CIAL.',
                        hints: ['"cial" es UNA sola sílaba: las vocales i + a juntas no se separan.', 'Aplaude: can-de-la-bro tiene 4 sílabas.']
                    },
                    {
                        type: 'classify',
                        prompt: 'Encuentra las palabras AGUDAS (acento en la última sílaba).',
                        categories: [{ key: 'si', label: '✅ Aguda' }, { key: 'no', label: '✖ No es aguda' }],
                        items: [
                            { text: 'Pantalón', answer: 'si' }, { text: 'mango', answer: 'no' }, { text: 'comidita', answer: 'no' },
                            { text: 'azul', answer: 'si' }, { text: 'pescado', answer: 'no' }, { text: 'candelita', answer: 'no' },
                            { text: 'Reunión', answer: 'si' }, { text: 'cucharilla', answer: 'no' }, { text: 'portón', answer: 'si' },
                            { text: 'balón', answer: 'si' }, { text: 'ciempiés', answer: 'si' }
                        ],
                        hints: [
                            'Di la palabra y fíjate si la fuerza cae al FINAL: pan-ta-LÓN.',
                            'Las agudas que terminan en n, s o vocal llevan tilde. "azul" es aguda aunque no lleve tilde.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'Marca las palabras GRAVES (acento en la penúltima sílaba).',
                        categories: [{ key: 'si', label: '✅ Grave' }, { key: 'no', label: '✖ No es grave' }],
                        items: [
                            { text: 'Cartera', answer: 'si' }, { text: 'Pensamiento', answer: 'si' }, { text: 'Árbol', answer: 'si' },
                            { text: 'Teléfono', answer: 'no' }, { text: 'Sal', answer: 'no' }, { text: 'Candela', answer: 'si' },
                            { text: 'Roca', answer: 'si' }, { text: 'Pastilla', answer: 'si' }
                        ],
                        hints: [
                            'Grave = la fuerza en la PENÚLTIMA sílaba: car-TE-ra.',
                            'Te-LÉ-fo-no tiene la fuerza en la antepenúltima (esdrújula). "Sal" tiene una sola sílaba.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'Palabras graves: ¿cuáles llevan tilde?',
                        categories: [{ key: 'si', label: '✏️ Lleva tilde' }, { key: 'no', label: 'Sin tilde' }],
                        items: [
                            { text: 'azufre', answer: 'no' }, { text: 'dificil', answer: 'si' }, { text: 'azucar', answer: 'si' },
                            { text: 'joven', answer: 'no' }, { text: 'fragil', answer: 'si' }, { text: 'pobre', answer: 'no' },
                            { text: 'lapiz', answer: 'si' }, { text: 'tormenta', answer: 'no' }, { text: 'perrito', answer: 'no' },
                            { text: 'cordel', answer: 'no' }
                        ],
                        hints: [
                            'Las GRAVES llevan tilde cuando NO terminan en n, s o vocal: difícil, lápiz.',
                            '"joven" termina en n y "pobre" en vocal: no llevan tilde. "cordel" es aguda y termina en l: tampoco.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'Clasifica cada palabra según su sílaba acentuada.',
                        categories: [
                            { key: 'sobre', label: 'Sobreesdrújula' }, { key: 'esdrujula', label: 'Esdrújula' },
                            { key: 'grave', label: 'Grave' }, { key: 'aguda', label: 'Aguda' }
                        ],
                        items: [
                            { text: 'Héroe', answer: 'esdrujula' }, { text: 'Mantel', answer: 'aguda' }, { text: 'pinturita', answer: 'grave' },
                            { text: 'azucarera', answer: 'grave' }, { text: 'túnel', answer: 'grave' }, { text: 'éticamente', answer: 'sobre' },
                            { text: 'desplomado', answer: 'grave' }, { text: 'dímelo', answer: 'esdrujula' }, { text: 'Jamás', answer: 'aguda' },
                            { text: 'octubre', answer: 'grave' }, { text: 'mamá', answer: 'aguda' }, { text: 'árabe', answer: 'esdrujula' }
                        ],
                        hints: [
                            'Cuenta desde el final: última = aguda, penúltima = grave, antepenúltima = esdrújula, antes = sobreesdrújula.',
                            'Hé-ro-e: la "e" y la "o" van separadas, así que HÉ es la antepenúltima → esdrújula.'
                        ]
                    }
                ]
            },
            {
                title: 'Nivel 3 · La oración y el uso de c, s y z',
                intro: 'Sujeto y predicado, concordancia, palabras con ancia, encia y cimiento, y uso de c, s y z.',
                exercises: [
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «La mantequilla de mi pan está deliciosa.»',
                        options: ['La mantequilla de mi pan', 'está deliciosa', 'mi pan'],
                        answer: 0,
                        hints: ['Pregunta: ¿QUÉ está deliciosa?', 'El sujeto incluye todas las palabras que acompañan a "mantequilla".']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «Las moscas que vuelan en la sala hacen mucho ruido.»',
                        options: ['hacen mucho ruido', 'Las moscas que vuelan en la sala', 'la sala'],
                        answer: 1,
                        hints: ['Pregunta: ¿QUIÉNES hacen mucho ruido?', 'El sujeto es largo: incluye "que vuelan en la sala".']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «Ese elefante recién nacido está enorme.»',
                        options: ['está enorme', 'recién nacido', 'Ese elefante recién nacido'],
                        answer: 2,
                        hints: ['Pregunta: ¿QUIÉN está enorme?', 'El sujeto llega hasta justo antes del verbo "está".']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «La cena que preparó mi mamá aún está muy caliente.»',
                        options: ['La cena que preparó mi mamá', 'mi mamá', 'aún está muy caliente'],
                        answer: 0,
                        hints: ['Pregunta: ¿QUÉ está muy caliente? ¿La mamá o la cena?', 'El sujeto es "la cena" con todo lo que la describe.']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «El caballo come mucho pasto verde.»',
                        options: ['mucho pasto verde', 'El caballo', 'come mucho pasto'],
                        answer: 1,
                        hints: ['Pregunta: ¿QUIÉN come?', 'El pasto no come: es lo que se come.']
                    },
                    {
                        type: 'choice',
                        prompt: '¿Cuál es el SUJETO? «La mascarada de la fiesta me da un poco de miedo.»',
                        options: ['me da un poco de miedo', 'La mascarada de la fiesta', 'un poco de miedo'],
                        answer: 1,
                        hints: ['Pregunta: ¿QUÉ me da miedo?', 'El sujeto llega hasta justo antes de "me da".']
                    },
                    {
                        type: 'classify',
                        prompt: 'Predicados que concuerdan: ¿qué sujeto va con cada predicado?',
                        categories: [
                            { key: 'rosas', label: 'Esas rosas' }, { key: 'pinguino', label: 'El pingüino de la película' },
                            { key: 'trueno', label: 'Ese trueno' }, { key: 'hamburguesa', label: 'Mi hamburguesa de hoy' },
                            { key: 'pajaritos', label: 'Los pajaritos del árbol de jocote' }
                        ],
                        items: [
                            { text: '…florecen en el jardín.', answer: 'rosas' },
                            { text: '…baila sobre el hielo.', answer: 'pinguino' },
                            { text: '…sonó muy fuerte.', answer: 'trueno' },
                            { text: '…está muy jugosa.', answer: 'hamburguesa' },
                            { text: '…cantan por la mañana.', answer: 'pajaritos' }
                        ],
                        hints: [
                            'Si el sujeto es plural (varios), el verbo también: las rosas florecen, los pajaritos cantan.',
                            '"jugosa" es femenina: va con hamburguesa.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'Sujetos que concuerdan: ¿qué sujeto completa cada predicado?',
                        categories: [
                            { key: 'murcielagos', label: 'Los murciélagos' }, { key: 'peces', label: 'Los peces' },
                            { key: 'chiles', label: 'Esos chiles' }, { key: 'camisa', label: 'A mi camisa' },
                            { key: 'abuelito', label: 'El abuelito' }
                        ],
                        items: [
                            { text: '…viven en una cueva en la montaña.', answer: 'murcielagos' },
                            { text: '…nadan alegremente en el río.', answer: 'peces' },
                            { text: '…tienen mucho picante.', answer: 'chiles' },
                            { text: '…le falta un botón.', answer: 'camisa' },
                            { text: '…camina con dificultad.', answer: 'abuelito' }
                        ],
                        hints: [
                            '"camina" es singular (uno solo); "viven", "nadan" y "tienen" son plurales.',
                            'Los botones están en la ropa.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'Completa cada palabra con ancia, encia o cimiento.',
                        categories: [{ key: 'ancia', label: '-ancia' }, { key: 'encia', label: '-encia' }, { key: 'cimiento', label: '-cimiento' }],
                        items: [
                            { text: 'Sust…', answer: 'ancia' }, { text: 'Vag…', answer: 'ancia' }, { text: 'Her…', answer: 'encia' },
                            { text: 'Paci…', answer: 'encia' }, { text: 'Rena…', answer: 'cimiento' }, { text: 'Eleg…', answer: 'ancia' }
                        ],
                        hints: [
                            'Di la palabra completa en voz alta: sustancia, vagancia, elegancia...',
                            'Herencia y paciencia van con "encia"; volver a nacer es el rena-cimiento.'
                        ]
                    },
                    // c/s/z: no viene en la práctica PDF, sí en el temario (págs. 160-165). Reglas típicas de 3.er grado.
                    {
                        type: 'classify',
                        prompt: '¿Se escribe con C, S o Z?',
                        categories: [{ key: 'c', label: 'C' }, { key: 's', label: 'S' }, { key: 'z', label: 'Z' }],
                        items: [
                            { text: 'lápi__es (plural de lápiz)', answer: 'c' },
                            { text: 'pe__es (plural de pez)', answer: 'c' },
                            { text: 'ratonci__o', answer: 'c' },
                            { text: 'condu__ir', answer: 'c' },
                            { text: 'famo__o', answer: 's' },
                            { text: 'grandí__imo', answer: 's' },
                            { text: 'perra__o (perro muy grande)', answer: 'z' },
                            { text: 'triste__a', answer: 'z' }
                        ],
                        hints: [
                            'Las palabras que terminan en Z cambian a CES en plural: luz → luces. Los diminutivos -cito, -cita y los verbos en -cir llevan C.',
                            '-oso e -ísimo llevan S (hermoso, altísimo). Los aumentativos -azo y las palabras en -eza llevan Z (golpazo, belleza).'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Escribe el plural de cada palabra. Recuerda: la Z cambia a C.',
                        fields: [
                            part('lápiz', 'lápices'), part('luz', 'luces'), part('nariz', 'narices'), part('voz', 'voces'), part('raíz', 'raíces')
                        ],
                        answer: 'lápices, luces, narices, voces, raíces.',
                        hints: ['Ejemplo: pez → peces. Quita la Z y agrega CES.', 'luz → lu + ces.']
                    }
                ]
            }
        ]
    };
})();

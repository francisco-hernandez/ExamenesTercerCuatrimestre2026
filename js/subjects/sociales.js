/**
 * ESTUDIOS SOCIALES — Práctica III trimestre (temática Parque Jurásico)
 * Fuente: "1. Prac. Estudios Sociales.pdf" + "Temario de tercer grado.pdf".
 *
 * Tipos de ejercicio (ver js/engine.js):
 *  - classify: cada item se asigna a una categoría (C/T, V/F, correspondencia, ubicar...).
 *  - choice:   una pregunta, varias opciones, una correcta (answer = índice).
 *  - write:    respuesta escrita. Dos modos:
 *              · fields: cada casilla tiene sus palabras clave.
 *              · pool + count: escribir N respuestas distintas de una lista.
 *    Las palabras clave se comparan sin tildes ni mayúsculas, y basta con que aparezcan.
 * Los dibujos y el mapa para colorear del PDF se convirtieron en ejercicios de clasificar.
 */
EXAMS.sociales = {
    title: 'Misión Isla Nublar: el clima de Costa Rica',
    theme: 'jw',
    guide: { emoji: '🧑‍🔬', name: 'la guardabosques Rita' },
    reward: { emoji: '🥚', won: '🦖', every: 5, label: '¡Un huevo de dinosaurio eclosionó!' },
    miniGame: {
        prompt: '¡Un T-Rex se escapó! Encuéntralo entre los demás animales', target: '🦖', decoys: ['🦕', '🐊', '🦎', '🐢', '🐍', '🦜'],
        names: { '🦖': 'T-Rex', '🦕': 'braquiosaurio', '🐊': 'cocodrilo', '🦎': 'lagartija', '🐢': 'tortuga', '🐍': 'serpiente', '🦜': 'loro' }
    },
    cheers: [
        '¡Tú puedes, {name}! Lee con calma.',
        '{name}, los dinosaurios cuentan contigo.',
        'Piensa bien antes de responder, explorador {name}.',
        '¡Vas muy bien, {name}! Sigue así.',
        'Respira hondo, {name}. Cada respuesta te acerca a la meta.'
    ],
    sections: [
        {
            title: 'Taller 1 · Conceptos básicos del clima', image: { src: 'sociales-playa', alt: 'Costa rocosa bajo el sol en Costa Rica' },
            intro: 'Clima y tiempo atmosférico, elementos del clima y las épocas seca y lluviosa.',
            exercises: [
                {
                    type: 'classify',
                    prompt: 'Lee cada oración y decide si habla del CLIMA o del TIEMPO ATMOSFÉRICO.',
                    categories: [{ key: 'C', label: 'Clima (C)' }, { key: 'T', label: 'Tiempo (T)' }],
                    items: [
                        { text: 'Mi mamá mañana va a ir a San José, le dije que alistara una sombrilla porque en la tarde puede llover.', answer: 'T' },
                        { text: 'Mateo y Danilo irán a Cahuita en Limón el fin de semana, llevamos bloqueador para evitar quemarnos con el sol.', answer: 'T' },
                        { text: 'Vamos a ir al Cerro de la Muerte, llevamos sombrilla y suéter porque siempre hace frío.', answer: 'C' },
                        { text: 'En Santa Ana, en la mañana hace calor, pero en la tarde se vienen las lluvias.', answer: 'C' }
                    ],
                    hints: [
                        'El TIEMPO es lo que pasa en un momento corto (hoy, mañana, este fin de semana).',
                        'El CLIMA es lo que pasa casi siempre en un lugar durante muchos años ("siempre hace frío").'
                    ]
                },
                {
                    type: 'classify',
                    prompt: 'Lee cada oración y decide si es VERDADERA o FALSA.',
                    categories: [{ key: 'V', label: 'Verdadero (V)' }, { key: 'F', label: 'Falso (F)' }],
                    items: [
                        { text: 'La temperatura es la cantidad de calor que se percibe según la radiación solar.', answer: 'V' },
                        { text: 'En las zonas altas la temperatura aumenta.', answer: 'F' },
                        { text: 'El viento se mueve de forma horizontal.', answer: 'V' },
                        { text: 'La cantidad de lluvia que cae a la superficie terrestre recibe el nombre de precipitación.', answer: 'V' },
                        { text: 'La presión atmosférica es el peso de la atmósfera sobre la Tierra.', answer: 'V' },
                        { text: 'La humedad es la posición en la que se encuentran las cordilleras y sirve de barrera para las condiciones atmosféricas.', answer: 'F' }
                    ],
                    hints: [
                        'Piensa en el Cerro de la Muerte: ¿allá arriba hace más calor o más frío?',
                        'La humedad es el vapor de agua en el aire. La posición de las cordilleras es el relieve (un factor del clima).'
                    ]
                },
                {
                    type: 'classify',
                    prompt: 'Correspondencia: ¿a qué época del año pertenece cada característica? (Se pueden repetir).',
                    categories: [{ key: 'seca', label: '☀️ Época seca' }, { key: 'lluviosa', label: '🌧️ Época lluviosa' }],
                    items: [
                        { text: 'Los días son calurosos.', answer: 'seca' },
                        { text: 'Los días son muy húmedos.', answer: 'lluviosa' },
                        { text: 'La vegetación puede perder sus hojas.', answer: 'seca' },
                        { text: 'Hay muchas inundaciones.', answer: 'lluviosa' },
                        { text: 'El suelo se reseca.', answer: 'seca' }
                    ],
                    hints: [
                        'Cuando casi no llueve, las plantas y el suelo se quedan sin agua.',
                        'Las inundaciones y la humedad vienen con las lluvias.'
                    ]
                },
                {
                    type: 'classify',
                    prompt: '¿Qué actividad se hace más en la época seca y cuál en la lluviosa?',
                    categories: [{ key: 'seca', label: '☀️ Época seca' }, { key: 'lluviosa', label: '🌧️ Época lluviosa' }],
                    items: [
                        { text: '🏖️ Ir a la playa a tomar el sol', answer: 'seca' },
                        { text: '🪁 Elevar papalotes con el viento', answer: 'seca' },
                        { text: '☂️ Salir con sombrilla e impermeable', answer: 'lluviosa' },
                        { text: '🌱 Sembrar las semillas en el campo', answer: 'lluviosa' },
                        { text: '🏕️ Acampar al aire libre', answer: 'seca' },
                        { text: '🥾 Usar botas de hule por el barro', answer: 'lluviosa' }
                    ],
                    hints: [
                        'En la época seca hay mucho sol y viento.',
                        'Los agricultores siembran cuando empiezan las lluvias, porque las plantas necesitan agua.'
                    ]
                },
                {
                    type: 'write',
                    prompt: 'Anota dos características de la época seca.',
                    count: 2,
                    pool: [
                        ['sol', 'soleado'], ['calor', 'caluros', 'caliente'], ['poca lluvia', 'no llueve', 'sin lluvia', 'pocas lluvias', 'casi no llueve'],
                        ['viento', 'ventoso'], ['hojas'], ['reseca', 'polvo', 'suelo seco'], ['verano'], ['despejado', 'cielo azul']
                    ],
                    answer: 'Mucho sol, calor, poca lluvia, viento, el suelo se reseca, las plantas pierden hojas.',
                    hints: ['Piensa en cómo está el cielo y la temperatura en diciembre.', 'Ejemplo: "hace mucho calor".']
                },
                {
                    type: 'write',
                    prompt: 'Cita dos características de la época lluviosa.',
                    count: 2,
                    pool: [
                        ['lluvia', 'llueve', 'aguacero'], ['humed'], ['inundac'], ['nublado', 'nubes'], ['frio', 'fresco'],
                        ['verde'], ['invierno'], ['tormenta', 'rayos', 'truenos'], ['barro', 'lodo', 'charco']
                    ],
                    answer: 'Llueve mucho, hay humedad, inundaciones, días nublados, más fresco, todo está verde.',
                    hints: ['Piensa en cómo está el cielo en septiembre u octubre.', 'Ejemplo: "hay muchas inundaciones".']
                },
                {
                    type: 'choice',
                    prompt: '¿En qué período se da la época lluviosa?',
                    options: ['De diciembre a abril', 'De mayo a noviembre', 'De enero a marzo', 'Todo el año'],
                    answer: 1,
                    hints: ['Empieza cuando termina el verano, a mediados del año.', 'Las vacaciones de fin de año ya son en época seca.']
                },
                {
                    type: 'choice',
                    prompt: '¿En qué período se da la época seca?',
                    options: ['De mayo a noviembre', 'De junio a agosto', 'De diciembre a abril', 'De septiembre a octubre'],
                    answer: 2,
                    hints: ['Incluye las vacaciones de fin y principio de año.', 'Termina justo antes de que empiece la época lluviosa en mayo.']
                }
            ]
        },
        {
            title: 'Taller 2 · El clima y las actividades de mi provincia', image: { src: 'sociales-paramo', alt: 'Páramo con neblina y arbustos en lo alto de la montaña' },
            intro: 'Los tipos de clima de Costa Rica, dónde están y qué se cultiva según la altura.',
            exercises: [
                {
                    type: 'classify',
                    prompt: 'Mapa de climas: ¿qué tipo de clima hay en cada zona de Costa Rica? (Usa los colores del mapa de tu práctica).',
                    categories: [
                        { key: 'seco', label: '🟧 Clima seco' }, { key: 'humedo', label: '🟪 Tropical húmedo' },
                        { key: 'muyhumedo', label: '🟨 Tropical muy húmedo' }, { key: 'montana', label: '🟩 Clima de montaña' }
                    ],
                    items: [
                        { text: 'Guanacaste y el Pacífico Norte', answer: 'seco' },
                        { text: 'El Caribe (Limón) y la Zona Norte', answer: 'muyhumedo' },
                        { text: 'El Pacífico Central y el Pacífico Sur', answer: 'humedo' },
                        { text: 'Las cordilleras y zonas altas, como el Cerro de la Muerte', answer: 'montana' }
                    ],
                    hints: [
                        'Guanacaste es la zona con menos lluvia del país.',
                        'En el Caribe llueve casi todo el año; en las montañas hace frío.'
                    ]
                },
                {
                    type: 'classify',
                    prompt: 'Cuadro comparativo: ¿a qué clima pertenece cada característica?',
                    categories: [
                        { key: 'seco', label: '🟧 Seco' }, { key: 'humedo', label: '🟪 Húmedo' },
                        { key: 'muyhumedo', label: '🟨 Muy húmedo' }, { key: 'montana', label: '🟩 Montaña' }
                    ],
                    items: [
                        { text: 'Hace mucho calor y llueve poco; la época seca es larga.', answer: 'seco' },
                        { text: 'Hace calor y llueve bastante, pero tiene una época seca corta.', answer: 'humedo' },
                        { text: 'Llueve casi todo el año, no hay una época seca definida.', answer: 'muyhumedo' },
                        { text: 'Las temperaturas son bajas, hace frío y hay neblina.', answer: 'montana' }
                    ],
                    hints: [
                        'Mientras más alto es el lugar, más frío hace.',
                        'Ordena de menos lluvia a más lluvia: seco → húmedo → muy húmedo.'
                    ]
                },
                {
                    type: 'choice',
                    prompt: '¿Entre qué altitudes se puede cultivar?',
                    options: ['Entre 0 y 100 metros', 'Entre 500 y 2500 metros', 'Entre 3000 y 4000 metros', 'Solo arriba de 4000 metros'],
                    answer: 1,
                    hints: ['En lo más alto (páramo) ya no se puede cultivar.', 'Es un rango grande que empieza en 500 metros.']
                },
                {
                    type: 'classify',
                    prompt: 'La montaña: ¿qué se da en cada altura?',
                    categories: [
                        { key: 'alto', label: '⛰️ 3000 a 4000 m' }, { key: 'medio', label: '🏔️ 1500 a 2000 m' }, { key: 'bajo', label: '🌄 500 a 700 m' }
                    ],
                    items: [
                        { text: '🌿 Páramo: hace tanto frío que no se puede cultivar', answer: 'alto' },
                        { text: '🥔 Papa, cebolla, zanahoria y otras hortalizas', answer: 'medio' },
                        { text: '🐄 Ganadería de leche', answer: 'medio' },
                        { text: '🎋 Caña de azúcar', answer: 'bajo' },
                        { text: '🐂 Ganadería de carne', answer: 'bajo' }
                    ],
                    hints: [
                        'Arriba de 3000 metros está el páramo, donde no se cultiva.',
                        'Las vacas lecheras y las hortalizas viven bien en zonas frescas y altas, como Cartago.'
                    ]
                }
            ]
        },
        {
            title: 'Taller 3 · Los aportes de las provincias', image: { src: 'sociales-volcan', alt: 'Volcán Arenal con nubes en la cima' },
            intro: 'Aportes culturales y económicos de las provincias de Costa Rica.',
            exercises: [
                {
                    type: 'write',
                    prompt: 'Cita el nombre de los dos bosques donde la altura ya no permite cultivar.',
                    count: 2,
                    pool: [['paramo'], ['nuboso', 'nube']],
                    answer: 'Páramo y bosque nuboso.',
                    hints: ['Uno está cubierto de nubes casi siempre.', 'El otro está en lo más alto, como el Cerro de la Muerte: el pá...']
                },
                {
                    type: 'write',
                    prompt: 'Menciona tres actividades socioeconómicas que se dan en las provincias de Costa Rica.',
                    count: 3,
                    pool: [
                        ['agricultura', 'cultiv', 'siembra'], ['ganaderia', 'ganado'], ['turismo', 'turist'], ['comercio', 'comerci'],
                        ['pesca'], ['industria', 'fabrica'], ['transporte', 'puerto', 'aeropuerto', 'vias de comunicacion']
                    ],
                    answer: 'Agricultura, ganadería, turismo, comercio, pesca.',
                    hints: ['Piensa en el trabajo de los agricultores y los ganaderos.', 'Los visitantes que vienen a las playas traen otra actividad: el tu...']
                },
                {
                    type: 'write',
                    prompt: '¿Cuál aeropuerto se encuentra en la provincia de Alajuela?',
                    fields: [{ accept: ['santamaria', 'santa maria'] }],
                    answer: 'Aeropuerto Internacional Juan Santamaría.',
                    hints: ['Lleva el nombre de nuestro héroe nacional.', 'El héroe se llamaba Juan ...']
                },
                {
                    type: 'write',
                    prompt: '¿En cuál provincia se encuentra el Depósito Libre de Golfito?',
                    fields: [{ accept: ['puntarenas'] }],
                    answer: 'Puntarenas.',
                    hints: ['Golfito está en el Pacífico Sur.', 'Es la provincia más larga, a lo largo de la costa pacífica.']
                },
                {
                    type: 'write',
                    prompt: 'Anota tres aportes culturales tangibles de la provincia de Guanacaste.',
                    count: 3,
                    pool: [
                        ['iglesia', 'nicoya'], ['casona', 'santa rosa'], ['ceramica', 'guaitil', 'chorotega', 'vasija'],
                        ['marimba'], ['sabanero', 'montura'], ['quijongo'], ['carreta']
                    ],
                    answer: 'Iglesia colonial de Nicoya, La Casona de Santa Rosa, cerámica chorotega de Guaitil, la marimba.',
                    hints: ['Tangible = se puede tocar: edificios, objetos, instrumentos.', 'En Guaitil hacen vasijas de barro (cerámica) y en Santa Rosa está La Casona.']
                },
                {
                    type: 'write',
                    prompt: 'Escribe tres aportes económicos de la provincia de Guanacaste.',
                    count: 3,
                    pool: [
                        ['turismo', 'turist', 'hotel', 'playa'], ['ganaderia', 'ganado'], ['agricultura', 'cultiv'],
                        ['arroz'], ['cana'], ['melon'], ['pesca'], ['comercio'], ['aeropuerto', 'liberia']
                    ],
                    answer: 'Turismo, ganadería, agricultura (arroz, caña de azúcar, melón), pesca.',
                    hints: ['Guanacaste tiene playas muy visitadas y muchas haciendas con ganado.', 'También se cultiva arroz y caña de azúcar.']
                },
                {
                    type: 'write',
                    prompt: 'Anota tres aportes culturales de la provincia de San José.',
                    count: 3,
                    pool: [
                        ['teatro nacional', 'teatro'], ['museo nacional'], ['catedral'], ['museo de oro', 'oro precolombino'],
                        ['museo de los ninos', 'ninos'], ['jade'], ['sabana'], ['mercado central'], ['edificio metalico', 'metalico']
                    ],
                    answer: 'Teatro Nacional, Museo Nacional, Catedral Metropolitana, Museo de Oro Precolombino, Museo de los Niños.',
                    hints: ['Piensa en edificios famosos del centro de San José.', 'Hay un teatro y varios museos muy conocidos.']
                },
                {
                    type: 'write',
                    prompt: '¿A cuál provincia llegó Cristóbal Colón y qué grupo étnico conforma la provincia?',
                    fields: [
                        { label: 'Provincia', accept: ['limon'] },
                        { label: 'Grupo étnico', accept: ['afro', 'negr', 'jamaic'] }
                    ],
                    answer: 'Limón; población afrodescendiente (afrocaribeña).',
                    hints: ['Colón llegó por el mar Caribe.', 'Muchas familias de Limón tienen raíces en Jamaica y África.']
                },
                {
                    type: 'write',
                    prompt: 'Cita dos productos agrícolas que se cultivan en la provincia de Cartago.',
                    count: 2,
                    pool: [
                        ['papa'], ['cebolla'], ['zanahoria'], ['repollo'], ['chayote'], ['cafe'], ['brocoli'],
                        ['lechuga'], ['coliflor'], ['hortaliza', 'verdura']
                    ],
                    answer: 'Papa, cebolla, zanahoria, repollo, chayote (hortalizas).',
                    hints: ['Cartago es fresco y alto: perfecto para hortalizas.', 'Piensa en lo que lleva una sopa: pa..., ce..., zana...']
                },
                {
                    type: 'write',
                    prompt: '¿Qué es el TSE?',
                    fields: [{ accept: ['eleccion', 'votacion', 'votar', 'voto', 'electoral'] }],
                    answer: 'El Tribunal Supremo de Elecciones: organiza las elecciones y las votaciones del país.',
                    hints: ['TSE = Tribunal Supremo de E...', 'Es la institución que organiza las votaciones para elegir presidente.']
                },
                {
                    type: 'write',
                    prompt: 'Anota los tres poderes de Costa Rica que se ubican en la provincia de San José.',
                    count: 3,
                    pool: [['ejecutivo'], ['legislativo', 'asamblea'], ['judicial', 'corte']],
                    answer: 'Poder Ejecutivo, Poder Legislativo y Poder Judicial.',
                    hints: ['Uno lo dirige el presidente, otro hace las leyes y otro imparte justicia.', 'Ejec..., Legis..., Jud...']
                }
            ]
        }
    ]
};

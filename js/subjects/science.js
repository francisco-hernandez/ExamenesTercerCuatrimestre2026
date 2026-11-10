/**
 * SCIENCE — Science practice III trimestre (temática Five Nights at Freddy's, versión amigable)
 * Fuente: "6. Science Practice.pdf" + "Temario de tercer grado.pdf" (Units 6, 7, 8).
 * Contenido en INGLÉS; pistas, ánimos e instrucciones de la interfaz en ESPAÑOL.
 * Tipos y formato: ver cabecera de js/subjects/sociales.js.
 * Reorganizado por unidad del temario (máquinas, paisajes, clima); se mantienen todas las preguntas del PDF.
 * "axel" del PDF se escribe "axle" (ortografía correcta en inglés).
 */
(() => {
    const TF = [{ key: 't', label: 'true' }, { key: 'f', label: 'false' }];
    const TOOLS = ['rain gauge', 'anemometer', 'thermometer', 'weathervane'];

    EXAMS.science = {
        title: "Five Nights at the Science Pizzeria",
        theme: 'fnaf',
        lang: 'en',
        guide: { emoji: '🔦', name: 'el guardia nocturno' },
        reward: { emoji: '🪫', won: '🔋', every: 5, label: '¡Recargaste la batería de tu linterna!' },
        miniGame: {
            prompt: '¡Un animatrónico se escondió en la pizzería! Encuentra al oso', target: '🐻', decoys: ['🐰', '🐔', '🦊', '🍕', '🎈', '🎂'],
            names: { '🐻': 'oso', '🐰': 'conejo', '🐔': 'gallina', '🦊': 'zorro', '🍕': 'pizza', '🎈': 'globo', '🎂': 'pastel' }
        },
        cheers: [
            '¡Sobrevive a la noche, {name}! Lee con calma.',
            '{name}, mantén la linterna encendida: piensa antes de responder.',
            'Los animatrónicos no te asustan, {name}. ¡Tú sabes esto!',
            'Revisa las cámaras… y la pregunta, {name}.',
            '¡Ya casi son las 6 a.m., {name}! Sigue así.'
        ],
        sections: [
            {
                title: 'Night 1 · Simple machines',
                intro: 'Máquinas simples y complejas, y cómo los inventos cambian con el tiempo (Unit 6).',
                exercises: [
                    {
                        type: 'classify', prompt: 'True or false?', categories: TF,
                        items: [
                            { text: 'A wind turbine is an example of a wheel and axle.', answer: 't' },
                            { text: 'Inventions usually change and are improved over time.', answer: 't' }
                        ],
                        hints: ['Las aspas de la turbina giran alrededor de un eje: rueda y eje.', 'Piensa en los teléfonos de antes y los de ahora.']
                    },
                    {
                        type: 'choice', prompt: 'The green slide at recess is an example of which simple machine?',
                        options: ['screw', 'pulley', 'wedge', 'wheel and axle'], answer: 0,
                        hints: ['El tobogán verde da vueltas como un caracol.', 'Un plano inclinado que gira alrededor de un poste es un tornillo (screw).']
                    },
                    {
                        type: 'choice', prompt: 'A flagpole uses which simple machine to lift the flag?',
                        options: ['lever', 'pulley', 'wedge', 'inclined plane'], answer: 1,
                        hints: ['Se jala una cuerda hacia abajo y la bandera sube.', 'Cuerda + rueda arriba = polea (pulley).']
                    },
                    {
                        type: 'choice', prompt: 'A ramp is which type of simple machine?',
                        options: ['lever', 'screw', 'inclined plane', 'wheel and axle'], answer: 2,
                        hints: ['Una rampa es una superficie inclinada.', '"Inclined" = inclinado.']
                    },
                    {
                        type: 'choice', prompt: 'Which object does NOT have a wheel and axle?',
                        options: ['car', 'swing', 'bicycle', 'wheelbarrow'], answer: 1,
                        hints: ['Busca el que no tiene ruedas.', '"Swing" = columpio.']
                    },
                    {
                        type: 'classify', prompt: 'Simple machine or complex machine?',
                        categories: [{ key: 's', label: 'A · simple machine' }, { key: 'c', label: 'B · complex machine' }],
                        items: [
                            { text: '🪓 ax', answer: 's' }, { text: '🚗 car', answer: 'c' }, { text: '✂️ scissors', answer: 's' },
                            { text: '📱 cell phone', answer: 'c' }, { text: '☸️ wheel and axle', answer: 's' }
                        ],
                        hints: ['Las máquinas simples tienen pocas partes y no usan electricidad ni motor.', 'Un carro y un celular tienen muchísimas partes: son complejas.']
                    }
                ]
            },
            {
                title: "Night 2 · Earth's landscapes",
                intro: 'Paisajes costeros y del interior, naturales y artificiales, y cómo cuidar los recursos (Unit 7).',
                exercises: [
                    {
                        type: 'classify', prompt: 'True or false?', categories: TF,
                        items: [
                            { text: 'Mountains are a coastal landscape feature.', answer: 'f' },
                            { text: 'Cliffs are coastal and inland landscape features.', answer: 't' },
                            { text: 'Artificial landscape features are those made by nature.', answer: 'f' },
                            { text: 'Natural landscape features are those created by humans.', answer: 'f' }
                        ],
                        hints: ['Coastal = en la costa; inland = tierra adentro.', 'Artificial = hecho por personas; natural = hecho por la naturaleza.']
                    },
                    {
                        type: 'choice', prompt: 'Which is a coastal landscape?',
                        options: ['bay', 'valley', 'mountain range', 'none of the above'], answer: 0,
                        hints: ['Busca el que está junto al mar.', '"Bay" = bahía.']
                    },
                    {
                        type: 'choice', prompt: 'Which is an artificial landscape feature?',
                        options: ['trees', 'mountains', 'volcanoes', 'wind turbine'], answer: 3,
                        hints: ['¿Cuál lo construyeron las personas?', 'Los árboles, montañas y volcanes los hizo la naturaleza.']
                    },
                    {
                        type: 'classify', prompt: 'Natural feature or artificial feature?',
                        categories: [{ key: 'n', label: 'A · natural' }, { key: 'a', label: 'B · artificial' }],
                        items: [
                            { text: '⚓ port', answer: 'a' }, { text: '🏞️ river', answer: 'n' }, { text: '🏝️ island', answer: 'n' },
                            { text: '🏢 buildings', answer: 'a' }, { text: '🌾 farmland', answer: 'a' }
                        ],
                        hints: ['Pregúntate: ¿esto existiría sin las personas?', 'Las personas construyen puertos y preparan la tierra para sembrar (farmland).']
                    },
                    {
                        type: 'classify', prompt: 'Complete the sentences with the correct landscape feature.',
                        categories: [{ key: 'island', label: 'island' }, { key: 'peninsula', label: 'peninsula' }, { key: 'archipelago', label: 'archipelago' }],
                        items: [
                            { text: 'An ___ is a collection of islands.', answer: 'archipelago' },
                            { text: 'An ___ is a piece of land surrounded by water on every side.', answer: 'island' },
                            { text: 'A ___ is a piece of land surrounded by water on three sides while still connected to land.', answer: 'peninsula' }
                        ],
                        hints: ['Isla = agua por todos lados. Archipiélago = muchas islas juntas.', 'Península = agua por tres lados, como la de Nicoya.']
                    },
                    {
                        type: 'choice', prompt: "How can we save Earth's resources?",
                        options: ['wasting water', 'walking or riding your bike', 'litter (throw trash on the ground)', "nothing, we can't do anything to save the Earth's resources"], answer: 1,
                        hints: ['"Wasting" = desperdiciar; "litter" = tirar basura.', 'Caminar o andar en bici ahorra gasolina y no contamina.']
                    },
                    {
                        type: 'choice', prompt: "Which is NOT a way to save Earth's resources?",
                        options: ['recycling', 'picking up trash', 'planting trees and flowers', 'using a lot of water and not trying to save it'], answer: 3,
                        hints: ['Ojo con el NOT: busca lo que hace DAÑO.', '"Using a lot of water" = gastar mucha agua.']
                    },
                    {
                        type: 'write',
                        prompt: "What is something you can do to save Earth's resources? Answer with a full sentence.",
                        fields: [{ label: 'I can…', accept: ['recycl', 'reuse', 'reduce', 'turn off', 'save', 'walk', 'bike', 'bicycle', 'plant', 'pick up', 'trash', 'garbage', 'close', 'shower', 'light', 'water', 'energy', 'compost'] }],
                        answer: 'Example: "I can turn off the lights when I leave a room." · "I can recycle plastic bottles." · "I can close the tap while I brush my teeth."',
                        hints: ['Empieza con "I can..." y piensa en el agua, la luz o la basura.', 'Ejemplo: "I can recycle paper and plastic."']
                    }
                ]
            },
            {
                title: 'Night 3 · Weather',
                intro: 'Qué causa el clima, la precipitación, el viento y los instrumentos para medirlo (Unit 8).',
                exercises: [
                    {
                        type: 'classify', prompt: 'True or false?', categories: TF,
                        items: [
                            { text: 'A breeze is the softest type of wind.', answer: 't' },
                            { text: 'Precipitation, everywhere in the world, is always a liquid.', answer: 'f' },
                            { text: 'Clouds become heavy, and water falls as rain, hail, sleet or snow.', answer: 't' }
                        ],
                        hints: ['"Breeze" = brisa, un viento suave.', 'La nieve y el granizo también son precipitación, y no son líquidos.']
                    },
                    {
                        type: 'choice', prompt: 'What is precipitation?',
                        options: ['the sun shining', 'the movement of air', 'water falling from clouds', 'precipitation does not exist'], answer: 2,
                        hints: ['Lluvia, nieve y granizo son tipos de precipitación.', 'Viene de las nubes (clouds).']
                    },
                    {
                        type: 'choice', prompt: 'What is the movement of air?',
                        options: ['wind', 'machines', 'precipitation', 'the air does not move'], answer: 0,
                        hints: ['Lo sientes cuando elevas un papalote.', 'Wind = viento.']
                    },
                    {
                        type: 'choice', prompt: 'Which type of weather is the best option?',
                        options: ['hail', 'hurricanes', 'freezing rain', 'sunny, with a slight breeze'], answer: 3,
                        hints: ['¿Con qué tiempo saldrías a jugar?', 'Hail = granizo; hurricanes = huracanes.']
                    },
                    {
                        type: 'choice', prompt: 'Which type of weather is found only in cold places?',
                        options: ['rain', 'snow', 'wind', 'hurricane'], answer: 1,
                        hints: ['En Costa Rica casi nunca pasa.', 'Snow = nieve.']
                    },
                    {
                        type: 'choice', prompt: 'Weather forecasts tell us ___.',
                        options: ['nothing', "yesterday's weather", 'how much it rained last year', 'what the weather is going to be like'], answer: 3,
                        hints: ['"Forecast" = pronóstico.', 'El pronóstico habla del FUTURO.']
                    },
                    {
                        type: 'choice', prompt: '🌧️ What tool would you use to measure rainfall?', options: TOOLS, answer: 0,
                        hints: ['Es un vaso con números para ver cuánta agua cayó.', '"Rain" = lluvia → rain gauge.']
                    },
                    {
                        type: 'choice', prompt: '🌡️ What tool would you use to measure temperature?', options: TOOLS, answer: 2,
                        hints: ['Es el mismo que usan cuando tienes fiebre.', 'Thermo = calor → thermometer.']
                    },
                    {
                        type: 'choice', prompt: '🧭 What tool would you use to measure wind direction?', options: TOOLS, answer: 3,
                        hints: ['Muchas veces tiene un gallo encima y las letras N, S, E, W.', '"Vane" gira hacia donde sopla el viento → weathervane.']
                    },
                    {
                        type: 'choice', prompt: '💨 What tool would you use to measure wind speed?', options: TOOLS, answer: 1,
                        hints: ['Tiene tacitas que giran rápido con el viento.', 'Anemo = viento → anemometer.']
                    }
                ]
            }
        ]
    };
})();

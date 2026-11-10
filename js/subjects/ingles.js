/**
 * INGLÉS — English practice III trimestre (temática Marvel)
 * Fuente: "4. English practice..pdf" (46 puntos) + "Temario de tercer grado.pdf" (Units 6, 7, 8).
 * Contenido en INGLÉS; pistas, ánimos e instrucciones de la interfaz en ESPAÑOL.
 * Tipos y formato: ver cabecera de js/subjects/sociales.js.
 * Cada punto del PDF = 1 unidad aquí (46 × 10 = 460 puntos). "Canda" del PDF se corrigió a "Canada".
 */
(() => {
    const exact = (label, ...accept) => ({ label, accept, exact: true });
    const CARLOS = 'Carlos wakes up at 6:00 a.m. in the morning. He takes a shower and gets dressed. Then he eats rice and beans for breakfast with his grandmother. Carlos walks to school with his cousin. At school, he writes in his notebook and listens to his teacher. His subjects today are English, Spanish, math, and music. After school, Carlos plays soccer in the park. At night, he studies English with his mother. Carlos goes to bed at 8:30 p.m.';
    const GADGETS = [
        { key: 'cell', label: '📱 cell phone' }, { key: 'flash', label: '🔦 flashlight' }, { key: 'laptop', label: '💻 laptop' },
        { key: 'tablet', label: '📲 tablet' }, { key: 'walkie', label: '📻 walkie talkie' }, { key: 'console', label: '🎮 game console' },
        { key: 'brush', label: '🪥 electric toothbrush' }
    ];

    EXAMS.ingles = {
        title: 'Avengers English Mission',
        theme: 'marvel',
        lang: 'en',
        guide: { emoji: '🦸', name: 'el equipo de héroes' },
        reward: { emoji: '⚪', won: '💎', every: 5, label: '¡Conseguiste una gema del infinito!' },
        miniGame: {
            prompt: '¡El Capitán América perdió su escudo! Encuéntralo', target: '🛡️', decoys: ['⚡', '🔨', '🕷️', '🧲', '🔥', '🪐'],
            names: { '🛡️': 'escudo', '⚡': 'rayo', '🔨': 'martillo', '🕷️': 'araña', '🧲': 'imán', '🔥': 'fuego', '🪐': 'planeta' }
        },
        cheers: [
            '¡Iron Man confía en ti, {name}! Read carefully.',
            '{name}, el Dr. Strange dice: piensa antes de responder.',
            '¡El Capitán América está orgulloso de ti, {name}!',
            'You can do it, {name}! Lee la pregunta dos veces.',
            '¡Avengers, assemble! Vamos, {name}.'
        ],
        sections: [
            {
                title: 'Mission 1 · Countries and landmarks',
                intro: 'Países del mundo y sus lugares famosos (Unit 8).',
                exercises: [
                    {
                        type: 'choice', prompt: 'Where is the Great Wall of China located?', image: { src: 'ingles-muralla', alt: 'Muralla larga que sube por montañas verdes' },
                        options: ['USA', 'Egypt', 'China', 'Argentina'], answer: 2,
                        hints: ['¡La respuesta está en el nombre!', 'The Great Wall of ... China.']
                    },
                    {
                        type: 'choice', prompt: 'What country are the Sphinx and Great Pyramids in?', image: { src: 'ingles-esfinge', alt: 'Esfinge de piedra frente a una pirámide' },
                        options: ['USA', 'Egypt', 'China', 'Argentina'], answer: 1,
                        hints: ['Las pirámides están en el desierto de África.', 'Los faraones vivían en Egipto (Egypt).']
                    },
                    {
                        type: 'choice', prompt: 'The Taj Mahal is in what country?', image: { src: 'ingles-taj', alt: 'Palacio blanco con cúpula y cuatro torres' },
                        options: ['Brazil', 'India', 'Canada', 'Argentina'], answer: 1,
                        hints: ['Está en Asia.', 'Es un palacio blanco en la India.']
                    },
                    {
                        type: 'choice', prompt: 'What country is the Basilica of the Sagrada Familia in?', image: { src: 'ingles-sagrada', alt: 'Basílica con torres altas y fachada muy decorada' },
                        options: ['USA', 'Spain', 'Turkey', 'Australia'], answer: 1,
                        hints: ['Está en Europa, en la ciudad de Barcelona.', 'Barcelona está en España (Spain).']
                    },
                    {
                        type: 'choice', prompt: 'The Amazon Rainforest is in what country?', image: { src: 'ingles-amazonas', alt: 'Selva espesa junto a un río' },
                        options: ['Brazil', 'Egypt', 'China', 'Costa Rica'], answer: 0,
                        hints: ['Es la selva más grande del mundo, en Sudamérica.', 'Allí se habla portugués.']
                    }
                ]
            },
            {
                title: 'Mission 2 · New vocabulary',
                intro: 'Aparatos (gadgets, Unit 6) y enfermedades (illnesses, Unit 7).',
                exercises: [
                    {
                        type: 'classify',
                        prompt: "Elias's busy day: which gadget does Elias use?",
                        categories: GADGETS,
                        items: [
                            { text: 'He uses his ___ to clean his teeth.', answer: 'brush' },
                            { text: "It's his grandma's birthday. He grabs his ___ and calls her.", answer: 'cell' },
                            { text: "Diego doesn't have a phone, so Elias uses his ___ to talk to him.", answer: 'walkie' },
                            { text: 'Elias and Diego want to play video games. Elias turns on his ___.', answer: 'console' },
                            { text: "The electricity goes out. It's very dark. Elias takes a ___ so he can see.", answer: 'flash' },
                            { text: 'He needs to type a letter. He opens his ___ and types on its keyboard.', answer: 'laptop' },
                            { text: 'He touches the screen with his finger to use his ___.', answer: 'tablet' }
                        ],
                        hints: [
                            '"Teeth" = dientes; "dark" = oscuro; "keyboard" = teclado.',
                            'La laptop tiene teclado; la tablet se usa tocando la pantalla con el dedo.'
                        ]
                    },
                    {
                        type: 'classify',
                        prompt: 'What does each child have?',
                        categories: [
                            { key: 'cold', label: '🤧 cold' }, { key: 'stomach', label: '🤢 stomachache' }, { key: 'ear', label: '👂 earache' },
                            { key: 'head', label: '🤕 headache' }, { key: 'cough', label: '😷 cough' }, { key: 'tooth', label: '🦷 toothache' }
                        ],
                        items: [
                            { text: 'Sofia ate too much candy. Now her tooth hurts very badly.', answer: 'tooth' },
                            { text: 'Marcos played soccer in the rain. He has a runny nose and he is sneezing.', answer: 'cold' },
                            { text: 'Ana ate three slices of pizza and two ice creams. Now her belly hurts.', answer: 'stomach' },
                            { text: 'Diego listened to loud music all day. Now his ear hurts a lot.', answer: 'ear' },
                            { text: 'Valentina has a sore throat and keeps making a sound from her chest.', answer: 'cough' },
                            { text: 'Daniela played on her tablet for five hours. Now her head hurts.', answer: 'head' }
                        ],
                        hints: [
                            'Busca la parte del cuerpo: tooth = diente, ear = oreja, head = cabeza, belly/stomach = barriga.',
                            '"Sneezing" = estornudar (cold, resfriado). El sonido del pecho es la tos (cough).'
                        ]
                    }
                ]
            },
            {
                title: 'Mission 3 · Simple past and comparatives',
                intro: 'Pasado de verbos regulares e irregulares (Unit 7) y comparativos y superlativos (Unit 6).',
                exercises: [
                    {
                        type: 'write',
                        prompt: 'Write the present or past tense form of each word.',
                        fields: [
                            exact('go → past', 'went'), exact('present ← walked', 'walk'),
                            exact('play → past', 'played'), exact('present ← cleaned', 'clean'),
                            exact('live → past', 'lived'), exact('present ← sang', 'sing'),
                            exact('cry → past', 'cried'), exact('present ← ate', 'eat')
                        ],
                        answer: 'went; walk; played; clean; lived; sing; cried; eat.',
                        hints: [
                            'Los regulares agregan -ed (play → played). Si terminan en "e", solo -d (live → lived). Consonante + y → -ied (cry → cried).',
                            'Irregulares: go → went, sing → sang, eat → ate.'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Write the comparative or superlative form of the adjective.',
                        fields: [
                            exact('My grandmother is the ___ (old) person in my family.', 'oldest', 'the oldest', 'eldest', 'the eldest'),
                            exact('The Amazon River is the ___ (long) river in South America.', 'longest', 'the longest'),
                            exact('The book is ___ (interesting) than that book.', 'more interesting'),
                            exact('The Pacific Ocean is the ___ (deep) ocean in the world.', 'deepest', 'the deepest'),
                            exact('An elephant is ___ (heavy) than a horse.', 'heavier')
                        ],
                        answer: 'oldest; longest; more interesting; deepest; heavier.',
                        hints: [
                            '"than" = comparativo (-er / more). "the ... in" = superlativo (-est / most).',
                            'Palabras largas usan more/most: more interesting. Consonante + y → -ier: heavy → heavier.'
                        ]
                    },
                    {
                        type: 'write',
                        prompt: 'Write the comparative or superlative form of the adjective.',
                        fields: [
                            exact('My brother is ___ (young) than me.', 'younger'),
                            exact('Dogs are ___ (friendly) than cats.', 'friendlier', 'more friendly'),
                            exact('Asia is the ___ (big) continent.', 'biggest', 'the biggest'),
                            exact('Antarctica is the ___ (cold) continent.', 'coldest', 'the coldest'),
                            exact('The Sahara desert is ___ (large) than the Arabian desert.', 'larger')
                        ],
                        answer: 'younger; friendlier; biggest; coldest; larger.',
                        hints: [
                            'big → biggest (se duplica la g). large → larger (termina en e, solo -r).',
                            'friendly → friendlier (la y cambia a i).'
                        ]
                    }
                ]
            },
            {
                title: 'Mission 4 · Reading: a day at school',
                intro: 'Lee la historia de Carlos y responde en inglés (Unit 8).',
                exercises: [
                    {
                        type: 'write', text: CARLOS,
                        prompt: 'Read the short story and answer the questions.',
                        fields: [
                            { label: '1. What does Carlos do after he wakes up?', accept: ['shower', 'dress'] },
                            { label: '2. What does Carlos eat for breakfast?', accept: ['rice', 'beans'] },
                            { label: '3. What does Carlos do at school?', accept: ['write', 'notebook', 'listen', 'teacher'] },
                            { label: '4. What does Carlos do after school?', accept: ['soccer', 'football'] },
                            { label: '5. Who studies English with Carlos?', accept: ['mother', 'mom', 'mum'] }
                        ],
                        answer: '1. He takes a shower and gets dressed. 2. Rice and beans. 3. He writes in his notebook and listens to his teacher. 4. He plays soccer in the park. 5. His mother.',
                        hints: ['Busca en el texto las palabras de la pregunta: "breakfast", "at school", "after school".', '"Mother" = mamá. "Shower" = ducha.']
                    },
                    {
                        type: 'write', text: CARLOS,
                        prompt: 'Read the short story and answer the questions.',
                        fields: [
                            { label: '6. What time does Carlos wake up?', accept: ['6', 'six'] },
                            { label: '7. What time does Carlos go to bed?', accept: ['8:30', '8 30', '8.30', 'eight thirty', 'half past eight'] },
                            { label: '8. Who does Carlos walk to school with?', accept: ['cousin'] },
                            { label: '9. How many subjects does Carlos have today?', accept: ['4', 'four'] },
                            { label: '10. Name one subject Carlos has at school today.', accept: ['english', 'spanish', 'math', 'music'] }
                        ],
                        answer: '6. At 6:00 a.m. 7. At 8:30 p.m. 8. His cousin. 9. Four (English, Spanish, math and music). 10. English, Spanish, math or music.',
                        hints: ['Las horas están al principio y al final del texto.', 'Cuenta las materias: English, Spanish, math, music.']
                    }
                ]
            }
        ]
    };
})();

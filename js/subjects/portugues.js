/**
 * PORTUGUÉS — Prática III trimestre (temática Jurassic World)
 * Fuente: "3.Prac. portugués.pdf" (preguntas 1 a 22) + "Temario de tercer grado.pdf".
 * Contenido en PORTUGUÉS; pistas, ánimos e instrucciones de la interfaz en ESPAÑOL.
 * Tipos y formato: ver cabecera de js/subjects/sociales.js.
 * Adaptaciones: 21 (tenho/tem/temos/têm) → clasificar, para no depender de teclear "ê".
 * 22D (frases de campaña) se corrige con palabras clave amplias: cualquier frase sobre cuidar la naturaleza vale.
 */
(() => {
    const exact = (label, ...accept) => ({ label, accept, exact: true });
    const TUCANO = '<strong>O TUCANO</strong><br>O tucano é um animal silvestre que vive nas florestas. Ele tem um bico grande e colorido e se alimenta de frutas e pequenos animais. Para proteger o tucano e outros animais silvestres, precisamos cuidar das florestas e evitar a destruição de seu habitat.';
    const MARIANA = 'Durante um passeio no parque, Mariana percebeu que havia garrafas e papéis jogados perto das árvores. Ela também observou vários pássaros e outros animais naquele lugar. Mariana ficou preocupada e começou a pensar em maneiras de ajudar a cuidar do parque.';
    const CAMPANHA = ['nao', 'cuid', 'preserv', 'proteg', 'lixo', 'agua', 'arvore', 'natureza', 'planta', 'recicl', 'economiz', 'anima', 'floresta', 'rio', 'limp', 'respeit', 'ajud', 'salv'];

    EXAMS.portugues = {
        title: 'Operação Jurassic World',
        theme: 'jp',
        lang: 'pt',
        guide: { emoji: '🧑‍🔬', name: 'el paleontólogo' },
        reward: { emoji: '🥚', won: '🦕', every: 5, label: '¡Nació un dinosaurio en el parque!' },
        miniGame: {
            prompt: '¡El braquiosaurio se escondió! Encuéntralo entre los demás animales', target: '🦕', decoys: ['🦖', '🐊', '🦎', '🐢', '🐍', '🐸'],
            names: { '🦕': 'braquiosaurio', '🦖': 'T-Rex', '🐊': 'cocodrilo', '🦎': 'lagartija', '🐢': 'tortuga', '🐍': 'serpiente', '🐸': 'rana' }
        },
        cheers: [
            '¡Vamos, {name}! Lee con calma en portugués.',
            '{name}, el parque necesita a su mejor explorador.',
            'Lee la pregunta dos veces, {name}. ¡Tú puedes!',
            '¡Muito bem, {name}! Sigue así.',
            'Respira hondo, {name}. Los dinosaurios confían en ti.'
        ],
        sections: [
            {
                title: 'Expedição 1 · Animais silvestres e meio ambiente', image: { src: 'portugues-perezoso', alt: 'Perezoso de tres dedos abrazado a un árbol' },
                intro: 'Animales silvestres, actitudes para cuidar la naturaleza y campañas educativas.',
                exercises: [
                    {
                        type: 'choice', prompt: 'Qual dos animais abaixo é um animal silvestre?',
                        options: ['Cachorro', 'Arara', 'Gato'], answer: 1,
                        hints: ['Un animal silvestre vive libre en la naturaleza, no en la casa.', 'La arara (guacamaya) vive en el bosque.']
                    },
                    {
                        type: 'choice', prompt: 'Um animal silvestre vive:',
                        options: ['Naturalmente na natureza.', 'Somente dentro das casas.', 'Somente com pessoas.'], answer: 0,
                        hints: ['"Silvestre" viene de "selva".', 'No necesita a las personas para vivir.']
                    },
                    {
                        type: 'choice', prompt: 'Qual atitude ajuda a cuidar do meio ambiente?',
                        options: ['Jogar lixo no chão.', 'Economizar água.', 'Quebrar os galhos das árvores.'], answer: 1,
                        hints: ['"Lixo" = basura; "quebrar" = romper.', '"Economizar água" = ahorrar agua.']
                    },
                    {
                        type: 'choice', prompt: 'Para proteger os animais silvestres, devemos:',
                        options: ['cuidar dos lugares onde eles vivem.', 'retirar todos os animais da floresta.', 'jogar lixo perto dos rios.'], answer: 0,
                        hints: ['Proteger = cuidar.', 'Los animales necesitan su casa (habitat) limpia y segura.']
                    },
                    {
                        type: 'choice', prompt: 'Qual atitude prejudica a natureza?',
                        options: ['Plantar árvores.', 'Separar materiais para reciclagem.', 'Jogar lixo no rio.'], answer: 2,
                        hints: ['"Prejudica" = hace daño.', '¿Qué le pasa al río si le tiramos basura (lixo)?']
                    },
                    {
                        type: 'choice', prompt: 'Uma campanha educativa pode ajudar a:',
                        options: ['conscientizar as pessoas.', 'contar somente histórias de fantasia.', 'ensinar apenas brincadeiras.'], answer: 0,
                        hints: ['Una campaña educativa enseña algo importante a la gente.', '"Conscientizar" = hacer que las personas se den cuenta.']
                    }
                ]
            },
            {
                title: 'Expedição 2 · Sinônimos, antônimos, diminutivo e aumentativo',
                intro: 'Sinónimos (significan lo mismo), antónimos (significan lo contrario), diminutivo (-inho) y aumentativo (-ão).',
                exercises: [
                    {
                        type: 'choice', prompt: 'Qual palavra é sinônimo de bonito?',
                        options: ['Belo', 'Feio', 'Triste'], answer: 0,
                        hints: ['Sinónimo = significa lo mismo.', '"Feio" es lo contrario de bonito.']
                    },
                    {
                        type: 'choice', prompt: 'Qual palavra é o antônimo de perto?',
                        options: ['Próximo', 'Longe', 'Ao lado'], answer: 1,
                        hints: ['Antónimo = significa lo contrario.', '"Perto" = cerca. ¿Cómo se dice "lejos"?']
                    },
                    {
                        type: 'choice', prompt: 'Qual palavra está no diminutivo?',
                        options: ['Sapato', 'Sapatinho', 'Sapatão'], answer: 1,
                        hints: ['El diminutivo hace las cosas pequeñas.', 'En portugués el diminutivo termina en -inho / -inha.']
                    },
                    {
                        type: 'choice', prompt: 'Qual é o aumentativo de caderno?',
                        options: ['Caderninho', 'Caderno', 'Cadernão'], answer: 2,
                        hints: ['El aumentativo hace las cosas grandes.', 'En portugués el aumentativo termina en -ão.']
                    },
                    {
                        type: 'classify',
                        prompt: 'Antônimos: qual é o antônimo de cada palavra?',
                        categories: [
                            { key: 'tranquilo', label: 'Tranquilo' }, { key: 'claro', label: 'Claro' }, { key: 'distante', label: 'Distante' },
                            { key: 'fraco', label: 'Fraco' }, { key: 'comecar', label: 'Começar' }
                        ],
                        items: [
                            { text: 'Perto', answer: 'distante' }, { text: 'Forte', answer: 'fraco' }, { text: 'Agitado', answer: 'tranquilo' },
                            { text: 'Acabar', answer: 'comecar' }, { text: 'Escuro', answer: 'claro' }
                        ],
                        hints: ['Busca la palabra que significa lo CONTRARIO.', '"Fraco" = débil; "começar" = empezar; "escuro" = oscuro.']
                    },
                    {
                        type: 'classify',
                        prompt: 'Sinônimos: qual é o sinônimo de cada palavra?',
                        categories: [
                            { key: 'feliz', label: 'Feliz' }, { key: 'comecar', label: 'Começar' }, { key: 'tranquilo', label: 'Tranquilo' },
                            { key: 'rapido', label: 'Rápido' }, { key: 'achar', label: 'Achar' }
                        ],
                        items: [
                            { text: 'Calmo', answer: 'tranquilo' }, { text: 'Encontrar', answer: 'achar' }, { text: 'Veloz', answer: 'rapido' },
                            { text: 'Iniciar', answer: 'comecar' }, { text: 'Alegre', answer: 'feliz' }
                        ],
                        hints: ['Busca la palabra que significa LO MISMO.', '"Achar" = encontrar (hallar); "veloz" = rápido.']
                    },
                    {
                        type: 'write',
                        prompt: 'Passe as palavras para o diminutivo.',
                        fields: [
                            exact('Livro', 'livrinho'), exact('Casa', 'casinha'), exact('Sapato', 'sapatinho'),
                            exact('Gato', 'gatinho'), exact('Mercado', 'mercadinho')
                        ],
                        answer: 'livrinho, casinha, sapatinho, gatinho, mercadinho.',
                        hints: ['Quita la última vocal y agrega -inho (masculino) o -inha (femenino).', 'casa → cas + inha = casinha.']
                    },
                    {
                        type: 'write',
                        prompt: 'Passe as palavras para o aumentativo. (Si no puedes escribir "ã", escribe "ao").',
                        fields: [
                            exact('Caderno', 'cadernão'), exact('Mundo', 'mundão'), exact('Cavalo', 'cavalão'),
                            exact('Prato', 'pratão'), exact('Porco', 'porcão')
                        ],
                        answer: 'cadernão, mundão, cavalão, pratão, porcão.',
                        hints: ['Quita la última vocal y agrega -ão.', 'caderno → cadern + ão = cadernão.']
                    }
                ]
            },
            {
                title: 'Expedição 3 · Verbo ter',
                intro: 'Eu tenho, ele/ela tem, nós temos, eles/elas têm.',
                exercises: [
                    {
                        type: 'choice', prompt: 'Escolha a frase correta.',
                        options: ['Pedro e Ana tem dois livros.', 'Pedro e Ana têm dois livros.', 'Pedro e Ana temos dois livros.'], answer: 1,
                        hints: ['Pedro y Ana son DOS personas = eles.', 'Eles/elas → têm (con sombrerito ^).']
                    },
                    {
                        type: 'choice', prompt: 'Escolha a frase correta.',
                        options: ['Natalia tenho uma bolsa azul.', 'Natalia temos uma bolsa azul.', 'Natalia tem uma bolsa azul.'], answer: 2,
                        hints: ['Natalia es UNA persona = ela.', 'Ele/ela → tem (sin sombrerito).']
                    },
                    {
                        type: 'choice', prompt: 'Qual forma do verbo ter completa corretamente a frase? «Nós ______ muitos livros na sala.»',
                        options: ['Tenho', 'Temos', 'Tem'], answer: 1,
                        hints: ['"Nós" = nosotros.', 'Nós → temos.']
                    },
                    {
                        type: 'classify',
                        prompt: 'Complete as frases com: tenho – tem – temos – têm.',
                        categories: [{ key: 'tenho', label: 'tenho' }, { key: 'tem', label: 'tem' }, { key: 'temos', label: 'temos' }, { key: 'teem', label: 'têm' }],
                        items: [
                            { text: 'Eu ___ uma mochila azul.', answer: 'tenho' },
                            { text: 'Mariana ___ dois cadernos.', answer: 'tem' },
                            { text: 'Nós ___ muitos materiais na sala.', answer: 'temos' },
                            { text: 'O macaco ___ uma longa cauda.', answer: 'tem' },
                            { text: 'Os tucanos ___ bicos grandes e coloridos.', answer: 'teem' }
                        ],
                        hints: ['Eu → tenho, ele/ela → tem, nós → temos, eles/elas → têm.', 'El mono es UNO (tem); los tucanes son VARIOS (têm).']
                    }
                ]
            },
            {
                title: 'Expedição 4 · Leitura', image: { src: 'portugues-tucan', alt: 'Tucán de pico multicolor sobre una rama' },
                intro: 'Lee los textos con atención y responde.',
                exercises: [
                    {
                        type: 'choice', text: TUCANO, prompt: 'O tucano é:',
                        options: ['um animal doméstico.', 'um animal silvestre.', 'um animal de fazenda.'], answer: 1,
                        hints: ['Busca la respuesta en la primera oración del texto.', '"Vive nas florestas" = vive en los bosques.']
                    },
                    {
                        type: 'choice', text: TUCANO, prompt: 'O tucano tem:',
                        options: ['pelos coloridos.', 'uma longa tromba.', 'um bico grande e colorido.'], answer: 2,
                        hints: ['Lee la segunda oración: "Ele tem..."', '"Bico" = pico. Los tucanes tienen plumas, no pelos.']
                    },
                    {
                        type: 'choice', text: TUCANO, prompt: 'Segundo o texto, como podemos ajudar a proteger o tucano?',
                        options: ['Cuidando das florestas.', 'Destruindo seu habitat.', 'Retirando todos os animais da natureza.'], answer: 0,
                        hints: ['Lee la última oración del texto.', '"Precisamos cuidar das florestas..."']
                    },
                    {
                        type: 'write', text: MARIANA,
                        prompt: 'Leia a situação e responda com atenção.', image: { src: 'portugues-basura', alt: 'Botellas de plástico tiradas entre los árboles de un parque' },
                        fields: [
                            { label: 'A) Qual problema Mariana percebeu no parque?', accept: ['lixo', 'garrafa', 'papel', 'papeis', 'sujeira', 'sujo'] },
                            { label: 'B) Cite uma atitude que Mariana poderia tomar para ajudar a preservar esse lugar.', accept: ['recolher', 'juntar', 'catar', 'pegar', 'limpar', 'lixeira', 'lixo', 'recicl', 'cartaz', 'avisar', 'campanha'] },
                            { label: 'C) Escreva o nome de um animal silvestre que poderia viver nesse ambiente.', accept: ['passaro', 'tucano', 'arara', 'macaco', 'esquilo', 'papagaio', 'coruja', 'beija', 'tatu', 'pregui', 'capivara', 'sapo', 'borboleta', 'cobra', 'lagarto', 'iguana', 'quati', 'onca', 'veado', 'tartaruga', 'gaviao', 'pica-pau', 'tucan'] },
                            { label: 'D1) Crie uma frase para uma campanha educativa sobre preservação da natureza.', accept: CAMPANHA },
                            { label: 'D2) Crie outra frase para a campanha.', accept: CAMPANHA }
                        ],
                        answer: 'A) Havia lixo (garrafas e papéis) perto das árvores. B) Recolher o lixo e colocar na lixeira. C) Pássaro, macaco, esquilo, tucano... D) "Não jogue lixo no chão!"; "Cuide das árvores e dos animais!"',
                        hints: ['A) ¿Qué había tirado cerca de los árboles? B) ¿Qué puede hacer Mariana con esa basura (lixo)?', 'C) El texto menciona "pássaros". D) Ejemplo: "Não jogue lixo no rio!"']
                    }
                ]
            }
        ]
    };
})();

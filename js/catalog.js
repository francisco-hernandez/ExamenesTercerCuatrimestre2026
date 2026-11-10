/**
 * Catálogo de materias (orden = fecha de examen).
 * Cada archivo de js/subjects/ registra su examen en EXAMS[id].
 * Una materia sin examen registrado aparece como "Próximamente".
 * `color` = color del mundo e `image` = foto real (assets/img), usados en el cartucho del menú.
 */
const EXAMS = {};

const CATALOG = [
    { id: 'sociales',    name: 'Estudios Sociales', date: 'Martes 17 nov',    icon: '🦖', themeName: 'Parque Jurásico',         color: '#2e9e5b', image: 'sociales-volcan' },
    { id: 'espanol',     name: 'Español',           date: 'Miércoles 18 nov', icon: '🧱', themeName: 'LEGO',                    color: '#0a5cc2', image: 'espanol-libros' },
    { id: 'portugues',   name: 'Portugués',         date: 'Jueves 19 nov',    icon: '🦕', themeName: 'Jurassic World',          color: '#c8272f', image: 'portugues-lapas' },
    { id: 'ingles',      name: 'Inglés',            date: 'Viernes 20 nov',   icon: '🛡️', themeName: 'Marvel',                  color: '#1d3a6b', image: 'ingles-taj' },
    { id: 'matematicas', name: 'Matemáticas',       date: 'Lunes 23 nov',     icon: '⛏️', themeName: 'Minecraft',               color: '#5fae3a', image: 'matematicas-panal' },
    { id: 'science',     name: 'Science',           date: 'Martes 24 nov',    icon: '🐻', themeName: "Five Nights at Freddy's", color: '#5a2a9a', image: 'science-turbinas' }
];

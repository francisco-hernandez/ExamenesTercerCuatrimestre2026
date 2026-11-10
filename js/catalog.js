/**
 * Catálogo de materias (orden = fecha de examen).
 * Cada archivo de js/subjects/ registra su examen en EXAMS[id].
 * Una materia sin examen registrado aparece como "Próximamente".
 */
const EXAMS = {};

const CATALOG = [
    { id: 'sociales',    name: 'Estudios Sociales', date: 'Martes 17 nov',    icon: '🦖', themeName: 'Jurassic World' },
    { id: 'espanol',     name: 'Español',           date: 'Miércoles 18 nov', icon: '🧱', themeName: 'LEGO' },
    { id: 'portugues',   name: 'Portugués',         date: 'Jueves 19 nov',    icon: '🦕', themeName: 'Parque Jurásico' },
    { id: 'ingles',      name: 'Inglés',            date: 'Viernes 20 nov',   icon: '🛡️', themeName: 'Marvel' },
    { id: 'matematicas', name: 'Matemáticas',       date: 'Lunes 23 nov',     icon: '⛏️', themeName: 'Minecraft' },
    { id: 'science',     name: 'Science',           date: 'Martes 24 nov',    icon: '🐻', themeName: "Five Nights at Freddy's" }
];

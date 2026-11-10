// Auto-chequeo sin navegador: `node tests/check.js`
// Valida la lógica de corrección y la integridad de los bancos de preguntas.
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const root = path.join(__dirname, '..');
const ctx = { console };
vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
load('js/catalog.js');
load('js/credits.js');
fs.readdirSync(path.join(root, 'js/subjects')).forEach(f => load('js/subjects/' + f));
load('js/engine.js');
const { norm, hasAny, gradePool, unitsOf, canon, matchField, fieldsOf, poolsOf, pointsFor } =
    vm.runInContext('({ norm, hasAny, gradePool, unitsOf, canon, matchField, fieldsOf, poolsOf, pointsFor })', ctx);
// perfiles: el formato antiguo de un solo jugador se convierte sin perder datos
const toRoot = vm.runInContext('toRoot', ctx);
const old = toRoot({ name: 'Leo', muted: true, best: { espanol: 85 }, progress: { sociales: { i: 3 } } });
const J = JSON.stringify;
assert.strictEqual(J(old), J({ current: 'leo', muted: true, players: { leo: { name: 'Leo', best: { espanol: 85 }, progress: { sociales: { i: 3 } } } } }));
assert.strictEqual(J(toRoot({})), J({ current: null, muted: false, players: {} }));
const nuevo = { current: 'ana', muted: false, players: { ana: { name: 'Ana', best: {}, progress: {} } } };
assert.strictEqual(toRoot(nuevo), nuevo);
// puntos por intento (opción A): 10 → 5 → 2, nunca negativo
assert.deepStrictEqual([0, 1, 2, 3].map(pointsFor), [10, 5, 2, 0]);
assert.strictEqual(canon(' Cor di-lle / ra '), 'cor-di-lle-ra');
assert.ok(matchField('car-ton', { accept: ['car-tón'], exact: true }));
assert.ok(!matchField('despeinado ya', { accept: ['des', 'despeinado'], exact: true }));
const EXAMS = vm.runInContext('EXAMS', ctx), CATALOG = vm.runInContext('CATALOG', ctx);

// corrección
assert.strictEqual(norm('  Limón  y   CAÑA '), 'limon y cana');
assert.ok(hasAny('Juan Santamaría', ['santamaria']));
assert.ok(!hasAny('', ['a']));
assert.deepStrictEqual(gradePool(['calor', 'mucho calor', 'viento'], [['calor'], ['viento']]), [true, false, true]);
assert.deepStrictEqual(gradePool(['Páramo', 'bosque nuboso'], [['paramo'], ['nuboso']]), [true, true]);

// integridad de datos
for (const [id, ex] of Object.entries(EXAMS)) {
    let total = 0;
    assert.ok(CATALOG.some(c => c.id === id), `${id} no está en el catálogo`);
    for (const k of ['title', 'theme', 'guide', 'reward', 'miniGame', 'cheers', 'sections']) assert.ok(ex[k], `${id}: falta ${k}`);
    assert.ok(!ex.lang || ['es', 'pt', 'en'].includes(ex.lang), `${id}: lang inválido`);
    const g = ex.miniGame;
    [g.target, ...g.decoys].forEach(e => assert.ok(g.names && g.names[e], `${id}: mini-juego sin nombre accesible para ${e}`));
    assert.ok(!g.decoys.includes(g.target), `${id}: el objetivo del mini-juego está entre los señuelos`);
    ex.sections.forEach((s, si) => s.exercises.forEach((e, ei) => {
        const where = `${id} sección ${si + 1} ejercicio ${ei + 1}`;
        assert.ok(e.prompt && e.hints && e.hints.length >= 2, `${where}: falta prompt o 2 pistas`);
        if (e.type === 'classify') e.items.forEach(it => assert.ok(e.categories.some(c => c.key === it.answer), `${where}: respuesta "${it.answer}" no es categoría`));
        else if (e.type === 'choice') assert.ok(e.options[e.answer] !== undefined, `${where}: answer fuera de rango`);
        else if (e.type === 'write') {
            assert.ok(e.answer, `${where}: falta answer`);
            const pools = poolsOf(e);
            fieldsOf(e).forEach(f => assert.ok(f.accept || (pools && pools[f.pool]), `${where}: casilla sin accept ni pool válido`));
            Object.entries(pools || {}).forEach(([k, p]) => p && assert.ok(fieldsOf(e).filter(f => f.pool === k).length <= p.length, `${where}: más casillas que opciones en ${k}`));
        } else assert.fail(`${where}: tipo desconocido ${e.type}`);
        total += unitsOf(e);
    }));
    console.log(`✔ ${id}: ${total * 10} puntos posibles`);
}
// imágenes: cada foto usada existe, tiene crédito con licencia libre y descripción; no hay fotos sin crédito
const CREDITS = vm.runInContext('CREDITS', ctx), used = new Set();
const useImg = (img, where) => {
    assert.ok(CREDITS[img.src], where + ': sin crédito para ' + img.src);
    assert.ok(fs.existsSync(path.join(root, 'assets/img', img.src + '.jpg')), where + ': falta assets/img/' + img.src + '.jpg');
    assert.ok(img.alt && img.alt.length > 5, where + ': falta descripción (alt) de ' + img.src);
    used.add(img.src);
};
CATALOG.forEach(c => c.image && useImg({ src: c.image, alt: 'cartucho ' + c.name }, 'catálogo ' + c.id));
for (const [id, ex] of Object.entries(EXAMS)) ex.sections.forEach(s => {
    if (s.image) useImg(s.image, id + ' ' + s.title);
    s.exercises.forEach(e => e.image && useImg(e.image, id + ' ' + e.prompt.slice(0, 30)));
});
for (const [k, c] of Object.entries(CREDITS)) {
    assert.ok(/^(CC0|CC BY(-SA)? [\d.]+|Public domain)/i.test(c.license), k + ': licencia no permitida ' + c.license);
    assert.ok(c.author && c.source, k + ': crédito incompleto');
}
fs.readdirSync(path.join(root, 'assets/img')).forEach(f => assert.ok(CREDITS[f.replace(/\.jpg$/, '')], 'imagen sin crédito: ' + f));
console.log('✔ imágenes: ' + used.size + ' usadas, ' + Object.keys(CREDITS).length + ' con crédito');
console.log('Todo OK');

/**
 * MOTOR COMÚN de exámenes.
 * Flujo: nombre → menú de materias → examen (secciones, mini-juego entre secciones) → resultados.
 * Reglas: 3 intentos por ejercicio con pistas. Cada respuesta vale 10 puntos al primer intento,
 * 5 al segundo y 2 al tercero (nunca se restan). Premio al llegar al 70 %.
 * El avance de cada examen se guarda en el navegador para continuar después.
 */
const POINTS = 10, SCORE_BY_ATTEMPT = [10, 5, 2], MAX_ATTEMPTS = 3, PASS_PCT = 70, STORE_KEY = 'misiones3';

// ---------- utilidades puras (probadas en tests/check.js) ----------
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const hasAny = (text, keys) => { const t = norm(text); return t !== '' && keys.some(k => t.includes(norm(k))); };
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const pointsFor = attempts => SCORE_BY_ATTEMPT[attempts] ?? 0;

/** Modo "pool": cada respuesta debe coincidir con un grupo distinto. Devuelve [ok por casilla]. */
function gradePool(values, pool) {
    const used = new Set();
    return values.map(v => {
        const g = pool.findIndex((keys, i) => !used.has(i) && hasAny(v, keys));
        if (g === -1) return false;
        used.add(g);
        return true;
    });
}

/** Forma exacta: sin tildes/mayúsculas y con separadores unificados ("cor di-lle/ra" → "cor-di-lle-ra"). */
const canon = s => norm(s).replace(/[\s\-\/·.,_]+/g, '-').replace(/^-|-$/g, '');
const matchField = (value, f) => f.exact ? f.accept.some(a => canon(value) === canon(a)) : hasAny(value, f.accept);

/** Casillas de un ejercicio write. `pool + count` es atajo de N casillas que comparten la lista "_". */
const fieldsOf = ex => ex.fields || Array.from({ length: ex.count }, (_, n) => ({ pool: '_', label: `Respuesta ${'abcdef'[n]}` }));
const poolsOf = ex => ex.pools || { _: ex.pool };

/** Unidades puntuables de un ejercicio (cada una vale hasta POINTS). */
const unitsOf = ex => ex.type === 'classify' ? ex.items.length : ex.type === 'choice' ? 1 : fieldsOf(ex).length;

const store = {
    load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } },
    save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch { /* modo privado: no se guarda */ } },
    clear() { try { localStorage.removeItem(STORE_KEY); } catch { /* nada guardado */ } }
};

/** Un perfil por jugador: { current, muted, players: { [nombre normalizado]: { name, best, progress } } }.
 *  Convierte también el formato antiguo de un solo jugador ({ name, best, progress, muted }). */
const toRoot = d => d.players ? d : {
    current: d.name ? norm(d.name) : null,
    muted: !!d.muted,
    players: d.name ? { [norm(d.name)]: { name: d.name, best: d.best || {}, progress: d.progress || {} } } : {}
};

// ---------- aplicación ----------
const App = {
    root: toRoot({}),     // todo lo guardado en el dispositivo
    data: {},             // perfil del jugador actual: { name, best: { [examId]: pct }, progress: { [examId]: {...} } }
    run: null,

    init() {
        this.root = toRoot(store.load());
        this.data = this.root.players[this.root.current] || {};
        this.applySound();
        this.data.name ? this.menu() : this.welcome();
    },

    /** Guarda el perfil actual dentro de su jugador y todo el dispositivo. */
    save() {
        if (this.data.name) {
            const key = norm(this.data.name);
            this.root.players[key] = this.data;
            this.root.current = key;
        }
        store.save(this.root);
    },

    /** Pinta una pantalla, actualiza el título de la pestaña y mueve el foco al encabezado (o a [data-autofocus]). */
    view(html, theme, title) {
        document.body.dataset.theme = theme || '';
        document.title = `${title} | Misiones de Repaso`;
        const app = document.getElementById('app');
        app.innerHTML = html;
        window.scrollTo(0, 0);
        const target = app.querySelector('[data-autofocus]') || app.querySelector('.question')
            || app.querySelector('.card-panel h1, .card-panel h2') || app.querySelector('h1');
        if (target) {
            if (!target.matches('input, button')) target.tabIndex = -1;
            target.focus({ preventScroll: true });
        }
    },

    toast(text) {
        const el = document.createElement('div');
        el.className = 'toast-msg';
        el.textContent = text;
        document.getElementById('toasts').appendChild(el);
        setTimeout(() => el.remove(), 3000);
    },

    // ----- sonido -----
    // el sonido es del dispositivo, no del jugador
    applySound() {
        AudioSystem.enabled = !this.root.muted;
        document.querySelectorAll('.sound-btn').forEach(btn => {
            btn.textContent = this.root.muted ? '🔇' : '🔊';
            btn.setAttribute('aria-pressed', String(!this.root.muted));
        });
    },
    soundButton() {
        return `<button class="sound-btn" aria-label="Sonido" aria-pressed="${!this.root.muted}" onclick="App.toggleSound()">${this.root.muted ? '🔇' : '🔊'}</button>`;
    },
    toggleSound() {
        this.root.muted = !this.root.muted;
        this.save();
        this.applySound();
    },

    // ----- bienvenida y menú -----
    welcome() {
        const players = Object.entries(this.root.players);
        this.view(`
            <header class="text-center pt-3">
                <h1 class="title-pop">Misiones de Repaso</h1>
                <div class="worlds-row" aria-hidden="true">${CATALOG.map(s => `<span>${s.icon}</span>`).join('')}</div>
            </header>
            <section class="card-panel text-center mx-auto" style="max-width:500px">
                <p class="mb-3">Seis mundos, uno por cada examen del trimestre. Supera las misiones y gana premios.</p>
                ${players.length ? `
                <h2 class="fs-4 fw-bold">¿Quién juega?</h2>
                <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
                    ${players.map(([key, p]) => `<button type="button" class="btn-chip" data-key="${esc(key)}" onclick="App.pickPlayer(this.dataset.key)">${esc(p.name)}</button>`).join('')}
                </div>` : ''}
                <form onsubmit="event.preventDefault(); App.setName()">
                    <label for="playerName" class="form-label fs-4">${players.length ? '¿Eres nuevo? Escribe tu nombre' : '¿Cómo te llamas?'}</label>
                    <input id="playerName" class="form-control form-control-lg name-input mb-3" maxlength="20"
                           autocomplete="off" required ${players.length ? '' : 'data-autofocus'}>
                    <button class="btn-game w-100">¡A jugar!</button>
                </form>
                <p class="small mt-3 mb-0">Cada jugador tiene sus propios récords. Se guardan solo en este dispositivo.</p>
            </section>`, '', 'Bienvenida');
    },

    /** Entra con el nombre escrito: si ya existe ese jugador, recupera sus récords; si no, crea un perfil nuevo. */
    setName() {
        const name = document.getElementById('playerName').value.trim().slice(0, 20);
        if (!name) return;
        const key = norm(name);
        this.root.players[key] = this.root.players[key] || { name, best: {}, progress: {} };
        this.root.players[key].name = name;
        this.pickPlayer(key);
    },

    pickPlayer(key) {
        if (!this.root.players[key]) return;
        this.data = this.root.players[key];
        this.root.current = key;
        this.save();
        AudioSystem.playClick();
        this.menu();
    },

    menu() {
        const best = this.data.best || {}, progress = this.data.progress || {};
        this.view(`
            <header class="text-center mb-4 position-relative pt-2">
                <div class="position-absolute top-0 end-0">${this.soundButton()}</div>
                <h1 class="title-pop px-5">¡Hola, ${esc(this.data.name)}!</h1>
                <p class="menu-bubble mb-0">Elige un mundo. Están en el orden de tus exámenes.
                    <button class="btn-text" onclick="App.welcome()">Cambiar de jugador</button></p>
            </header>
            <div class="row g-3 g-md-4">
                ${CATALOG.map(s => {
                    const ready = !!EXAMS[s.id], saved = progress[s.id];
                    const pct = saved ? Math.round(saved.i / this.stepsOf(EXAMS[s.id]).length * 100) : 0;
                    const state = !ready ? '<span class="state">Próximamente</span>'
                        : saved ? `<span class="state">Vas por el ${pct} %</span><span class="mini-progress" aria-hidden="true"><i style="width:${pct}%"></i></span>`
                        : best[s.id] != null ? `<span class="state">Tu récord: ${best[s.id]} %</span>`
                        : '<span class="state go">¡Juega!</span>';
                    return `
                    <div class="col-6 col-lg-4 d-flex flex-column">
                        <button class="cartridge flex-grow-1" style="--card:${s.color}" ${ready ? `onclick="App.start('${s.id}')"` : 'disabled'}>
                            <span class="cartridge-art w-100" aria-hidden="true"${s.image ? ` style="background-image:url('assets/img/${s.image}.jpg')"` : ''}><span>${s.icon}</span></span>
                            <span class="cartridge-label">
                                <span class="cartridge-name">${s.name}</span>
                                <span class="cartridge-world">${s.themeName}</span>
                                <span class="ticket">${s.date}</span>
                                ${state}
                            </span>
                        </button>
                        ${saved ? `<button class="btn-chip small mt-2 align-self-center" onclick="App.start('${s.id}', true)" aria-label="Empezar ${s.name} de cero">Empezar de cero</button>` : ''}
                    </div>`;
                }).join('')}
            </div>
            <p class="d-flex flex-wrap justify-content-center gap-2 mt-4">
                <button class="btn-chip" onclick="App.credits()">Créditos de las fotos</button>
                <button class="btn-chip" onclick="App.resetAll()">Borrar todo y empezar de nuevo</button>
            </p>`, '', 'Menú');
    },

    /** Borra todo lo guardado en este dispositivo (todos los jugadores, récords, avance y sonido) tras confirmar. */
    resetAll() {
        if (!window.confirm('¿Borrar todos los jugadores, sus récords y su avance guardados en este dispositivo?\n\nNo se puede deshacer.')) return;
        store.clear();
        this.root = toRoot({});
        this.data = {};
        this.run = null;
        this.applySound();
        this.welcome();
    },

    /** Página de créditos: las licencias CC BY y CC BY-SA exigen nombrar autor, licencia y fuente. */
    credits() {
        this.view(`
            <section class="card-panel">
                <h1 class="title">Créditos de las fotos</h1>
                <p>Todas las fotos vienen de Wikimedia Commons y tienen licencia libre. Gracias a sus autores.</p>
                <ul class="credits-list">
                    ${Object.entries(CREDITS).map(([key, c]) => `
                    <li>
                        <img src="assets/img/${key}.jpg" alt="" loading="lazy" width="96" height="72">
                        <span><strong>${esc(c.title)}</strong><br>
                        Autor: ${esc(c.author)}<br>
                        Licencia: ${c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" target="_blank" rel="noopener">${esc(c.license)}</a>` : esc(c.license)}
<br><a href="${esc(c.source)}" target="_blank" rel="noopener">Ver la foto original</a></span>
                    </li>`).join('')}
                </ul>
                <p class="text-center mb-0"><button class="btn-game" onclick="App.menu()">Volver al menú</button></p>
            </section>`, '', 'Créditos de las fotos');
    },

    /** Foto con su crédito. `img` = { src: clave en assets/img, alt: descripción que no revela la respuesta }. */
    photo(img, cls = '') {
        if (!img) return '';
        const c = CREDITS[img.src] || {};
        return `<figure class="photo ${cls}" lang="es">
            <img src="assets/img/${img.src}.jpg" alt="${esc(img.alt)}" loading="lazy">
            <figcaption>Foto: ${esc(c.author || '')}, ${esc(c.license || '')}</figcaption>
        </figure>`;
    },

    // ----- examen -----
    stepsOf(exam) {
        const steps = [];
        exam.sections.forEach((sec, s) => {
            if (s > 0) steps.push({ kind: 'mini' });
            steps.push({ kind: 'intro', sec });
            sec.exercises.forEach(ex => steps.push({ kind: 'ex', sec, ex }));
        });
        return steps;
    },

    /** Empieza un examen; si hay avance guardado lo continúa, salvo que se pida empezar de cero. */
    start(id, fresh = false) {
        const exam = EXAMS[id], steps = this.stepsOf(exam);
        const max = steps.filter(st => st.kind === 'ex').reduce((n, st) => n + unitsOf(st.ex), 0) * POINTS;
        this.data.progress = this.data.progress || {};
        let saved = this.data.progress[id];
        if (fresh || (saved && saved.i >= steps.length)) { delete this.data.progress[id]; saved = null; this.save(); }
        this.run = { id, exam, steps, max, i: -1, points: 0, correct: 0, rewards: 0, misses: [] };
        if (saved) Object.assign(this.run, saved, { i: saved.i - 1 });
        AudioSystem.playClick();
        this.next();
    },

    /** Modo repaso: una partida solo con los ejercicios fallados. No guarda avance ni récord. */
    practice() {
        const r = this.run;
        const steps = r.misses.map(m => ({ kind: 'ex', sec: r.steps[m.step].sec, ex: r.steps[m.step].ex }));
        const max = steps.reduce((n, st) => n + unitsOf(st.ex), 0) * POINTS;
        this.run = { id: r.id, exam: r.exam, steps, max, i: -1, points: 0, correct: 0, rewards: 0, misses: [], practice: true };
        AudioSystem.playClick();
        this.next();
    },

    next() {
        const r = this.run;
        r.i++;
        if (r.i >= r.steps.length) return this.results();
        // se guarda al entrar en cada paso: al volver se repite el paso actual desde el principio
        if (!r.practice) {
            this.data.progress[r.id] = { i: r.i, points: r.points, correct: r.correct, rewards: r.rewards, misses: r.misses };
            this.save();
        }
        const st = r.steps[r.i];
        if (st.kind === 'mini') return this.miniGame();
        if (st.kind === 'intro') {
            const [tag, name] = this.splitTitle(st.sec.title);
            return this.view(`
            ${this.header()}
            <section class="card-panel text-center py-4">
                ${st.sec.image ? this.photo(st.sec.image, "photo-intro") : `<div class="big-emoji" aria-hidden="true">${r.exam.guide.emoji}</div>`}
                ${tag ? `<span class="tag" lang="${r.exam.lang || 'es'}">${tag}</span>` : ''}
                <h2 class="title display-6" lang="${r.exam.lang || 'es'}">${name}</h2>
                <p class="fs-5 mx-auto my-3" style="max-width:34rem">${st.sec.intro}</p>
                <button class="btn-game" onclick="App.next()">¡Vamos!</button>
            </section>`, r.exam.theme, name);
        }
        this.exercise(st.ex);
    },

    header() {
        const r = this.run, pct = Math.round((r.i / r.steps.length) * 100);
        return `
            <header class="hud mb-3">
                <button class="btn-chip" onclick="App.menu()" aria-label="${r.practice ? 'Volver al menú' : 'Volver al menú (tu avance se guarda)'}">Menú</button>
                <h1 class="hud-title">${r.practice ? `Repaso: ${r.exam.title}` : r.exam.title}</h1>
                <span class="hud-points" aria-label="Puntos">⭐ ${r.points} / ${r.max}</span>
                ${this.soundButton()}
                <div class="progress" role="progressbar" aria-label="Avance del examen" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width:${pct}%"></div>
                </div>
                <div class="hud-rewards" role="img" aria-label="${this.rewardsLabel()}">${this.rewardsIcons()}</div>
            </header>`;
    },
    /** "Taller 1 · Conceptos del clima" → ["Taller 1", "Conceptos del clima"]: el número va en una etiqueta aparte. */
    splitTitle(t) { const k = t.indexOf(' · '); return k < 0 ? [null, t] : [t.slice(0, k), t.slice(k + 3)]; },
    rewardsIcons() { const w = this.run.exam.reward; return w.won.repeat(this.run.rewards) || w.emoji; },
    rewardsLabel() { return `Premios conseguidos: ${this.run.rewards}`; },

    exercise(ex) {
        const r = this.run, lang = r.exam.lang || 'es';
        const cheer = r.exam.cheers[Math.floor(Math.random() * r.exam.cheers.length)].replace('{name}', () => esc(this.data.name));
        const stepNo = r.steps.slice(0, r.i + 1).filter(st => st.kind === 'ex').length;
        const total = r.steps.filter(st => st.kind === 'ex').length;
        r.cur = { ex, attempts: 0, ok: Array(unitsOf(ex)).fill(false), sel: {} };
        let body = '';
        if (ex.type === 'classify') body = ex.items.map((it, n) => `
            <div class="classify-row" id="row-${n}">
                <p class="mb-2" id="rowtext-${n}">${it.text}</p>
                <div class="d-flex flex-wrap gap-2" role="radiogroup" aria-labelledby="rowtext-${n}" onkeydown="App.rowKeys(event, ${n})">
                    ${ex.categories.map((c, k) => `<button class="opt" role="radio" aria-checked="false" tabindex="${k ? -1 : 0}"
                        data-key="${c.key}" onclick="App.pick(${n}, '${c.key}')">${c.label}</button>`).join('')}
                </div>
                <div class="row-status small" aria-live="polite"></div>
            </div>`).join('');
        if (ex.type === 'choice') body = `<div class="d-grid gap-2">${ex.options.map((o, n) =>
            `<button class="opt opt-lg" id="opt-${n}" onclick="App.choose(${n})">${o}</button>`).join('')}</div>`;
        if (ex.type === 'write') {
            body = fieldsOf(ex).map(f => f.label || 'Respuesta').map((l, n) => `
                <label class="form-label mt-2" for="w-${n}">${l}</label>
                <input class="form-control form-control-lg write-input" id="w-${n}" autocomplete="off" aria-describedby="hint"
                       onkeydown="if(event.key==='Enter') App.check()">`).join('');
        }
        this.view(`
            ${this.header()}
            <div class="guide"><span class="guide-avatar" aria-hidden="true">${r.exam.guide.emoji}</span><p class="bubble">${cheer}</p></div>
            <section class="card-panel" aria-label="Ejercicio ${stepNo} de ${total}">
                ${ex.text ? `<div class="reading" lang="${lang}">${ex.text}</div>` : ''}
                ${this.photo(ex.image, ex.imageTall ? "tall" : "")}
                <h2 class="question" lang="${lang}">${ex.prompt}</h2>
                <div lang="${lang}">${body}</div>
                <div id="hint" class="hint" aria-live="polite"></div>
                <div class="text-center mt-3" id="actions">
                    ${ex.type === 'choice' ? '' : '<button class="btn-game" onclick="App.check()">Comprobar</button>'}
                </div>
            </section>`, r.exam.theme, `Ejercicio ${stepNo} de ${total}: ${r.exam.title}`);
    },

    /** Flechas dentro de una fila de opciones (patrón radiogroup): mueven y eligen. */
    rowKeys(e, n) {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        const btns = [...document.querySelectorAll(`#row-${n} .opt`)];
        const k = (btns.indexOf(document.activeElement) + step + btns.length) % btns.length;
        btns[k].focus();
        this.pick(n, btns[k].dataset.key);
    },

    pick(n, key) {
        const c = this.run.cur;
        if (c.ok[n] || c.done) return;
        c.sel[n] = key;
        document.querySelectorAll(`#row-${n} .opt`).forEach(b => {
            const on = b.dataset.key === key;
            b.classList.toggle('active', on);
            b.setAttribute('aria-checked', String(on));
            b.tabIndex = on ? 0 : -1;
        });
        const row = document.getElementById(`row-${n}`);
        row.classList.remove('wrong');
        row.querySelector('.row-status').textContent = '';
        AudioSystem.playClick();
    },

    choose(n) {
        const c = this.run.cur;
        if (c.done) return;
        const right = n === c.ex.answer, btn = document.getElementById(`opt-${n}`);
        btn.classList.add(right ? 'right' : 'wrong');
        btn.setAttribute('aria-disabled', 'true');
        btn.disabled = true;
        if (right) c.ok[0] = true;
        this.after(right ? 1 : 0, right ? [] : [`✖ "${btn.textContent}" no es correcta.`]);
    },

    check() {
        const c = this.run.cur, ex = c.ex;
        if (c.done) return;
        let gained = 0;
        if (ex.type === 'classify') {
            if (ex.items.some((_, n) => !c.ok[n] && !c.sel[n])) return this.hint('Te falta elegir una opción en alguna línea.');
            ex.items.forEach((it, n) => {
                if (c.ok[n]) return;
                const row = document.getElementById(`row-${n}`), status = row.querySelector('.row-status');
                if (c.sel[n] === it.answer) {
                    c.ok[n] = true; gained++;
                    row.classList.add('right');
                    row.querySelector('.opt.active').classList.add('right');
                    status.textContent = '✔ ¡Correcto!';
                    row.querySelectorAll('.opt').forEach(b => b.disabled = true);
                } else {
                    row.classList.add('wrong');
                    status.textContent = '✖ Inténtalo de nuevo';
                    delete c.sel[n];
                    row.querySelectorAll('.opt').forEach((b, k) => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); b.tabIndex = k ? -1 : 0; });
                }
            });
        }
        if (ex.type === 'write') {
            const inputs = [...document.querySelectorAll('.write-input')];
            if (inputs.some((inp, n) => !c.ok[n] && !inp.value.trim())) return this.hint('Escribe algo en todas las casillas.');
            const fields = fieldsOf(ex), pools = poolsOf(ex);
            const res = fields.map((f, n) => !!f.accept && matchField(inputs[n].value, f));
            Object.entries(pools).forEach(([key, pool]) => {
                // las ya acertadas van primero para que reserven su grupo y no se cuenten repetidas
                const idx = fields.map((_, n) => n).filter(n => fields[n].pool === key).sort((a, b) => c.ok[b] - c.ok[a]);
                gradePool(idx.map(n => inputs[n].value), pool).forEach((ok, k) => { res[idx[k]] = ok; });
            });
            inputs.forEach((inp, n) => {
                if (c.ok[n]) return;
                // la respuesta incorrecta se deja escrita (marcada) para que el niño vea qué puso y la corrija
                inp.classList.toggle('is-valid', res[n]);
                inp.classList.toggle('is-invalid', !res[n]);
                inp.setAttribute('aria-invalid', String(!res[n]));
                if (res[n]) { c.ok[n] = true; gained++; inp.readOnly = true; }
            });
            const firstWrong = inputs.find((_, n) => !c.ok[n]);
            if (firstWrong) firstWrong.focus();
        }
        this.after(gained);
    },

    /** Común a todos los tipos: suma puntos según el intento, premios, pistas y revelado. */
    after(gained, notes = []) {
        const r = this.run, c = r.cur, pts = pointsFor(c.attempts);
        if (c.attempts === 0) c.firstOk = [...c.ok];   // qué se acertó a la primera (para el repaso final)
        if (gained) {
            r.points += gained * pts;
            r.correct += gained;
            const due = Math.floor(r.correct / r.exam.reward.every);
            if (due > r.rewards) { r.rewards = due; AudioSystem.playHatch(); this.toast(`${r.exam.reward.won} ${r.exam.reward.label}`); }
            document.querySelector('.hud-points').textContent = `⭐ ${r.points} / ${r.max}`;
            const rw = document.querySelector('.hud-rewards');
            rw.textContent = this.rewardsIcons();
            rw.setAttribute('aria-label', this.rewardsLabel());
        }
        if (c.ok.every(Boolean)) {
            AudioSystem.playCorrect();
            return this.finish(`¡Excelente! +${gained * pts} puntos`);
        }
        AudioSystem.playWrong();
        c.attempts++;
        if (c.attempts < MAX_ATTEMPTS) {
            const extra = gained ? ` Ganaste +${gained * pts} puntos por las que acertaste.` : '';
            const next = pointsFor(c.attempts);
            return this.hint(`${notes.join(' ')} ¡Casi! Revisa las marcadas con ✖.${extra}<br><strong>Pista:</strong> ${c.ex.hints[c.attempts - 1]}<br><small>Si aciertas ahora ganas ${next} puntos por respuesta.</small>`);
        }
        this.reveal();
        this.finish('No pasa nada: ahora ya sabes la respuesta. ¡Sigue aprendiendo!');
    },

    reveal() {
        const ex = this.run.cur.ex;
        if (ex.type === 'classify') ex.items.forEach((it, n) => {
            if (this.run.cur.ok[n]) return;
            const row = document.getElementById(`row-${n}`);
            row.querySelector('.row-status').textContent = `➜ Respuesta: ${ex.categories.find(c => c.key === it.answer).label}`;
            row.querySelectorAll('.opt').forEach(b => { b.disabled = true; b.classList.toggle('answer', b.dataset.key === it.answer); });
        });
        if (ex.type === 'choice') document.getElementById(`opt-${ex.answer}`).classList.add('answer');
        if (ex.type === 'write') document.querySelectorAll('.write-input').forEach(i => i.readOnly = true);
        if (ex.answer && ex.type === 'write') this.hint(`➜ Respuestas posibles: ${ex.answer}`);
    },

    hint(html) { document.getElementById('hint').innerHTML = html; },

    finish(msg) {
        const r = this.run, c = r.cur;
        c.done = true;
        const wrong = c.firstOk.map((ok, n) => ok ? -1 : n).filter(n => n >= 0);
        // at = intento (0, 1, 2) en que quedó todo bien; null = se reveló la respuesta
        if (wrong.length) r.misses.push({ step: r.i, wrong, at: c.ok.every(Boolean) ? c.attempts : null });
        document.querySelectorAll('.opt').forEach(b => b.disabled = true);
        const hint = document.getElementById('hint');
        hint.innerHTML = `<strong>${msg}</strong>` + (hint.innerHTML.startsWith('➜') ? `<br>${hint.innerHTML}` : '');
        document.getElementById('actions').innerHTML = '<button class="btn-game" id="nextBtn" onclick="App.next()">Siguiente</button>';
        document.getElementById('nextBtn').focus();
    },

    // ----- mini-juego de respiro -----
    miniGame() {
        const g = this.run.exam.miniGame;
        const cells = shuffle([g.target, ...shuffle([...g.decoys, ...g.decoys]).slice(0, 11)]);
        this.view(`
            ${this.header()}
            <section class="card-panel text-center">
                <h2 class="title">Pausa de respiro</h2>
                <p class="lead">${g.prompt}</p>
                <div class="mini-grid">${cells.map(e =>
                    `<button class="mini-cell" aria-label="${g.names[e]}" onclick="App.miniPick(this, ${e === g.target})">${e}</button>`).join('')}</div>
                <p class="small mt-3 mb-0" aria-live="polite" id="miniMsg"></p>
            </section>`, this.run.exam.theme, 'Pausa de respiro');
    },

    miniPick(btn, ok) {
        const msg = document.getElementById('miniMsg');
        if (!ok) {
            AudioSystem.playWrong();
            msg.textContent = `Ese es: ${btn.getAttribute('aria-label')}. ¡Sigue buscando!`;
            btn.classList.add('shake'); setTimeout(() => btn.classList.remove('shake'), 400);
            return;
        }
        AudioSystem.playCorrect();
        btn.classList.add('right');
        msg.textContent = '¡Lo encontraste!';
        setTimeout(() => this.next(), 1200);
    },

    // ----- resultados -----
    results() {
        const r = this.run, pct = Math.round((r.points / r.max) * 100), passed = pct >= PASS_PCT;
        if (!r.practice) {
            this.data.best = this.data.best || {};
            this.data.best[r.id] = Math.max(this.data.best[r.id] || 0, pct);
            delete this.data.progress[r.id];
            this.save();
        }
        if (passed) AudioSystem.playVictory();
        const name = esc(this.data.name);
        const title = r.practice ? `¡Repaso terminado, ${name}!` : passed ? `¡Misión cumplida, ${name}!` : `¡Buen trabajo, ${name}!`;
        const message = r.practice
            ? (r.misses.length ? 'Todavía quedan algunas para practicar. ¡Ya casi!' : '¡Ahora te sabes todas las que habías fallado!')
            : passed ? 'Superaste el 70 %. ¡Te ganaste 30 minutos más de juego!'
            : `Necesitas el ${PASS_PCT} % para ganar el premio. ¡Inténtalo otra vez, cada intento te hace más fuerte!`;
        this.view(`
            <section class="card-panel text-center">
                <div class="big-emoji" aria-hidden="true">${passed ? '🏆' : r.exam.guide.emoji}</div>
                <h1 class="title">${title}</h1>
                <p class="score">${pct} %</p>
                <p class="fw-bold mb-2">${r.points} de ${r.max} puntos</p>
                <p class="fs-1" role="img" aria-label="${this.rewardsLabel()}">${this.rewardsIcons()}</p>
                <p class="lead">${message}</p>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    ${r.misses.length ? `<button class="btn-game" onclick="App.practice()">Repetir las ${r.misses.length} que fallé</button>` : ''}
                    ${r.practice ? '' : `<button class="btn-game" onclick="App.start('${r.id}', true)">Repetir misión</button>`}
                    <button class="btn-game btn-alt" onclick="App.menu()">Volver al menú</button>
                </div>
            </section>
            ${this.reviewHtml()}`, r.exam.theme, `Resultados de ${r.exam.title}`);
    },

    /** Lista de lo que no se acertó a la primera, agrupada por sección, con la respuesta correcta. */
    reviewHtml() {
        const r = this.run, lang = r.exam.lang || 'es';
        if (!r.misses.length) return '';
        // clasificar: una lista de "ítem → respuesta"; el resto, una sola línea
        const answerOf = (ex, wrong) =>
            ex.type === 'choice' ? `<p class="mb-1" lang="${lang}">➜ ${ex.options[ex.answer]}</p>`
            : ex.type === 'write' ? `<p class="mb-1" lang="${lang}">➜ ${ex.answer}</p>`
            : `<ul class="answer-list" lang="${lang}">${wrong.map(n =>
                `<li><span>${ex.items[n].text}</span><strong>${ex.categories.find(c => c.key === ex.items[n].answer).label}</strong></li>`).join('')}</ul>`;
        const status = m => m.at === null ? 'No la acertaste: repásala.' : `Acertaste al ${m.at + 1}.º intento.`;
        const bySection = new Map();
        r.misses.forEach(m => {
            const st = r.steps[m.step];
            if (!bySection.has(st.sec)) bySection.set(st.sec, []);
            bySection.get(st.sec).push(`
                <li class="review-item">
                    <p class="mb-1 fw-semibold" lang="${lang}">${st.ex.prompt}</p>
                    ${answerOf(st.ex, m.wrong)}
                    <p class="small mb-0">${status(m)}</p>
                </li>`);
        });
        return `
            <section class="card-panel mt-3 review" aria-labelledby="reviewTitle">
                <h2 class="title" id="reviewTitle">Para repasar (${r.misses.length})</h2>
                <p class="small">Estas preguntas no salieron a la primera. Aquí tienes la respuesta correcta.</p>
                ${[...bySection].map(([sec, items]) => `
                    <h3 class="review-section" lang="${lang}">${this.splitTitle(sec.title)[1]}</h3>
                    <ul class="list-unstyled mb-0">${items.join('')}</ul>`).join('')}
            </section>`;
    }
};

if (typeof document !== 'undefined') window.addEventListener('DOMContentLoaded', () => App.init());

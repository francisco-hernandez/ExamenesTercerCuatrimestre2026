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
    save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch { /* modo privado: no se guarda */ } }
};

// ---------- aplicación ----------
const App = {
    data: store.load(),   // { name, muted, best: { [examId]: pct }, progress: { [examId]: { i, points, correct, rewards } } }
    run: null,

    init() {
        this.applySound();
        this.data.name ? this.menu() : this.welcome();
    },

    /** Pinta una pantalla, actualiza el título de la pestaña y mueve el foco al encabezado (o a [data-autofocus]). */
    view(html, theme, title) {
        document.body.dataset.theme = theme || '';
        document.title = `${title} · Misiones de Repaso`;
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
    applySound() {
        AudioSystem.enabled = !this.data.muted;
        document.querySelectorAll('.sound-btn').forEach(btn => {
            btn.textContent = this.data.muted ? '🔇' : '🔊';
            btn.setAttribute('aria-pressed', String(!this.data.muted));
        });
    },
    soundButton() {
        return `<button class="sound-btn" aria-label="Sonido" aria-pressed="${!this.data.muted}" onclick="App.toggleSound()">${this.data.muted ? '🔇' : '🔊'}</button>`;
    },
    toggleSound() {
        this.data.muted = !this.data.muted;
        store.save(this.data);
        this.applySound();
    },

    // ----- bienvenida y menú -----
    welcome() {
        this.view(`
            <section class="card-panel text-center mx-auto" style="max-width:520px">
                <div class="big-emoji" aria-hidden="true">🎮</div>
                <h1 class="title">Misiones de Repaso</h1>
                <p class="lead">Practica para tus exámenes del tercer trimestre jugando.</p>
                <form onsubmit="event.preventDefault(); App.setName()">
                    <label for="playerName" class="form-label fw-semibold">¿Cómo te llamas?</label>
                    <input id="playerName" class="form-control form-control-lg text-center mb-3" maxlength="20"
                           autocomplete="off" required data-autofocus value="${esc(this.data.name || '')}">
                    <button class="btn-game w-100">¡Empezar!</button>
                </form>
                <p class="small mt-3 mb-0">Tu nombre y tu avance se guardan solo en este dispositivo.</p>
            </section>`, '', 'Bienvenida');
    },

    setName() {
        const name = document.getElementById('playerName').value.trim().slice(0, 20);
        if (!name) return;
        this.data.name = name;
        store.save(this.data);
        AudioSystem.playClick();
        this.menu();
    },

    menu() {
        const best = this.data.best || {}, progress = this.data.progress || {};
        this.view(`
            <header class="text-center mb-4 position-relative">
                <div class="position-absolute top-0 end-0">${this.soundButton()}</div>
                <h1 class="title px-5">¡Hola, ${esc(this.data.name)}!</h1>
                <p class="lead mb-1">Elige una misión. Están en el orden de tus exámenes.</p>
                <button class="btn btn-link" onclick="App.welcome()">¿No eres ${esc(this.data.name)}? Cambiar nombre</button>
            </header>
            <div class="row g-3">
                ${CATALOG.map(s => {
                    const ready = !!EXAMS[s.id], saved = progress[s.id];
                    const state = !ready ? 'Próximamente'
                        : saved ? `▶ Continuar (${Math.round(saved.i / this.stepsOf(EXAMS[s.id]).length * 100)} %)`
                        : best[s.id] != null ? `Mejor: ${best[s.id]} %` : '¡Disponible!';
                    return `
                    <div class="col-6 col-lg-4 d-flex flex-column">
                        <button class="subject-card w-100 flex-grow-1" ${ready ? `onclick="App.start('${s.id}')"` : 'disabled'}>
                            <span class="big-emoji" aria-hidden="true">${s.icon}</span>
                            <strong>${s.name}</strong>
                            <small>${s.date} · ${s.themeName}</small>
                            <small class="badge-state">${state}</small>
                        </button>
                        ${saved ? `<button class="btn btn-link btn-sm" onclick="App.start('${s.id}', true)">Empezar ${s.name} de cero</button>` : ''}
                    </div>`;
                }).join('')}
            </div>`, '', 'Menú');
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
        if (fresh || (saved && saved.i >= steps.length)) { delete this.data.progress[id]; saved = null; store.save(this.data); }
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
            store.save(this.data);
        }
        const st = r.steps[r.i];
        if (st.kind === 'mini') return this.miniGame();
        if (st.kind === 'intro') return this.view(`
            ${this.header()}
            <section class="card-panel text-center">
                <div class="big-emoji" aria-hidden="true">${r.exam.guide.emoji}</div>
                <h2 class="title" lang="${r.exam.lang || 'es'}">${st.sec.title}</h2>
                <p class="lead">${st.sec.intro}</p>
                <button class="btn-game" onclick="App.next()">¡Vamos!</button>
            </section>`, r.exam.theme, st.sec.title);
        this.exercise(st.ex);
    },

    header() {
        const r = this.run, pct = Math.round((r.i / r.steps.length) * 100);
        return `
            <header class="hud mb-3">
                <button class="btn btn-sm btn-outline-light" onclick="App.menu()" aria-label="${r.practice ? 'Volver al menú' : 'Volver al menú (tu avance se guarda)'}">← Menú</button>
                <h1 class="hud-title">${r.exam.title}${r.practice ? ' · Repaso' : ''}</h1>
                <span class="hud-points" aria-label="Puntos">⭐ ${r.points} / ${r.max}</span>
                ${this.soundButton()}
                <div class="progress w-100" role="progressbar" aria-label="Avance del examen" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width:${pct}%"></div>
                </div>
                <div class="hud-rewards" role="img" aria-label="${this.rewardsLabel()}">${this.rewardsIcons()}</div>
            </header>`;
    },
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
            <p class="guide"><span aria-hidden="true">${r.exam.guide.emoji}</span> ${cheer}</p>
            <section class="card-panel" aria-label="Ejercicio ${stepNo} de ${total}">
                ${ex.text ? `<div class="reading" lang="${lang}">${ex.text}</div>` : ''}
                <h2 class="question" lang="${lang}">${ex.prompt}</h2>
                <div lang="${lang}">${body}</div>
                <div id="hint" class="hint" aria-live="polite"></div>
                <div class="text-center mt-3" id="actions">
                    ${ex.type === 'choice' ? '' : '<button class="btn-game" onclick="App.check()">Comprobar</button>'}
                </div>
            </section>`, r.exam.theme, `${r.exam.title} — ejercicio ${stepNo} de ${total}`);
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
            if (ex.items.some((_, n) => !c.ok[n] && !c.sel[n])) return this.hint('Te falta elegir una opción en alguna línea. 😉');
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
            if (inputs.some((inp, n) => !c.ok[n] && !inp.value.trim())) return this.hint('Escribe algo en todas las casillas. ✏️');
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
            return this.finish(`🎉 ¡Excelente! +${gained * pts} puntos`);
        }
        AudioSystem.playWrong();
        c.attempts++;
        if (c.attempts < MAX_ATTEMPTS) {
            const extra = gained ? ` Ganaste +${gained * pts} puntos por las que acertaste.` : '';
            const next = pointsFor(c.attempts);
            return this.hint(`${notes.join(' ')} ¡Casi! Revisa las marcadas con ✖.${extra}<br>💡 ${c.ex.hints[c.attempts - 1]}<br><small>Si aciertas ahora ganas ${next} puntos por respuesta.</small>`);
        }
        this.reveal();
        this.finish('No pasa nada: ahora ya sabes la respuesta. ¡Sigue aprendiendo! 💪');
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
        document.getElementById('actions').innerHTML = '<button class="btn-game" id="nextBtn" onclick="App.next()">Siguiente →</button>';
        document.getElementById('nextBtn').focus();
    },

    // ----- mini-juego de respiro -----
    miniGame() {
        const g = this.run.exam.miniGame;
        const cells = shuffle([g.target, ...shuffle([...g.decoys, ...g.decoys]).slice(0, 11)]);
        this.view(`
            ${this.header()}
            <section class="card-panel text-center">
                <h2 class="title">⏸️ Pausa de respiro</h2>
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
        msg.textContent = '¡Lo encontraste! 🎉';
        setTimeout(() => this.next(), 1200);
    },

    // ----- resultados -----
    results() {
        const r = this.run, pct = Math.round((r.points / r.max) * 100), passed = pct >= PASS_PCT;
        if (!r.practice) {
            this.data.best = this.data.best || {};
            this.data.best[r.id] = Math.max(this.data.best[r.id] || 0, pct);
            delete this.data.progress[r.id];
            store.save(this.data);
        }
        if (passed) AudioSystem.playVictory();
        const name = esc(this.data.name);
        const title = r.practice ? `¡Repaso terminado, ${name}!` : passed ? `¡Misión cumplida, ${name}!` : `¡Buen trabajo, ${name}!`;
        const message = r.practice
            ? (r.misses.length ? 'Todavía quedan algunas para practicar. ¡Ya casi!' : '¡Ahora te sabes todas las que habías fallado! 🌟')
            : passed ? 'Superaste el 70 %. ¡Te ganaste 30 minutos más de juego! 🎮'
            : `Necesitas el ${PASS_PCT} % para ganar el premio. ¡Inténtalo otra vez, cada intento te hace más fuerte!`;
        this.view(`
            <section class="card-panel text-center">
                <div class="big-emoji" aria-hidden="true">${passed ? '🏆' : r.exam.guide.emoji}</div>
                <h1 class="title">${title}</h1>
                <p class="score">${r.points} / ${r.max} puntos · ${pct} %</p>
                <p class="fs-1" role="img" aria-label="${this.rewardsLabel()}">${this.rewardsIcons()}</p>
                <p class="lead">${message}</p>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    ${r.misses.length ? `<button class="btn-game" onclick="App.practice()">🔁 Repetir solo las ${r.misses.length} falladas</button>` : ''}
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
        const answerOf = (ex, wrong) =>
            ex.type === 'choice' ? ex.options[ex.answer]
            : ex.type === 'write' ? ex.answer
            : wrong.map(n => `${ex.items[n].text} → <strong>${ex.categories.find(c => c.key === ex.items[n].answer).label}</strong>`).join('<br>');
        const status = m => m.at === null ? 'No la acertaste: repásala.' : `Acertaste al ${m.at + 1}.º intento.`;
        const bySection = new Map();
        r.misses.forEach(m => {
            const st = r.steps[m.step];
            if (!bySection.has(st.sec)) bySection.set(st.sec, []);
            bySection.get(st.sec).push(`
                <li class="review-item">
                    <p class="mb-1 fw-semibold" lang="${lang}">${st.ex.prompt}</p>
                    <p class="mb-1" lang="${lang}">➜ ${answerOf(st.ex, m.wrong)}</p>
                    <p class="small mb-0">${status(m)}</p>
                </li>`);
        });
        return `
            <section class="card-panel mt-3 review" aria-labelledby="reviewTitle">
                <h2 class="question" id="reviewTitle">📋 Para repasar (${r.misses.length})</h2>
                <p class="small">Estas preguntas no salieron a la primera. Aquí tienes la respuesta correcta.</p>
                ${[...bySection].map(([sec, items]) => `
                    <h3 class="fs-6 mt-3 text-uppercase" lang="${lang}">${sec.title}</h3>
                    <ul class="list-unstyled mb-0">${items.join('')}</ul>`).join('')}
            </section>`;
    }
};

if (typeof document !== 'undefined') window.addEventListener('DOMContentLoaded', () => App.init());

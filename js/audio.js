/**
 * SISTEMA DE AUDIO - Web Audio API
 * Genera sonidos sin necesidad de archivos externos
 */

const AudioSystem = {
    context: null,
    enabled: true,
    
    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.warn('Web Audio API no soportada');
            this.enabled = false;
        }
    },
    
    // Sonido de respuesta correcta (acorde mayor ascendente)
    playCorrect() {
        if (!this.enabled) return;
        this.playTone(523.25, 0.1, 'sine', 0.3); // C5
        setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.3), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.3), 200); // G5
    },
    
    // Sonido de respuesta incorrecta (acorde menor descendente)
    playWrong() {
        if (!this.enabled) return;
        this.playTone(440, 0.15, 'sawtooth', 0.2); // A4
        setTimeout(() => this.playTone(369.99, 0.2, 'sawtooth', 0.2), 150); // F#4
    },
    
    // Sonido de eclosión de huevo
    playHatch() {
        if (!this.enabled) return;
        // Sonido de "crack"
        this.playNoise(0.1, 0.4);
        setTimeout(() => {
            this.playTone(880, 0.05, 'sine', 0.3);
            this.playTone(1760, 0.05, 'sine', 0.3);
        }, 200);
    },
    
    // Sonido de éxito final (fanfarria)
    playVictory() {
        if (!this.enabled) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'triangle', 0.4), i * 200);
        });
        setTimeout(() => {
            this.playTone(1046.50, 0.5, 'triangle', 0.5);
        }, 800);
    },
    
    // Sonido de mini-juego
    playClick() {
        if (!this.enabled) return;
        this.playTone(800, 0.05, 'sine', 0.2);
    },
    
    // Tono genérico
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.context) return;
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + duration);
    },
    
    // Ruido blanco (para "crack" del huevo)
    playNoise(duration, volume = 0.3) {
        if (!this.context) return;
        
        const bufferSize = this.context.sampleRate * duration;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.context.createBufferSource();
        noise.buffer = buffer;
        
        const gainNode = this.context.createGain();
        gainNode.gain.setValueAtTime(volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        
        noise.connect(gainNode);
        gainNode.connect(this.context.destination);
        noise.start();
    },
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
};

// Inicializar al primer click (política de autoplay)
document.addEventListener('click', () => {
    if (!AudioSystem.context) {
        AudioSystem.init();
    }
}, { once: true });

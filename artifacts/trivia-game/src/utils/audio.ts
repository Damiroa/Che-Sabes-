// Web Audio API sound engine
// Music: upbeat synthesized melody loop that starts on Play
// SFX: click, correct, wrong, tick, stageUp — all at moderate volumes

let _ctx: AudioContext | null = null;
let _muted = false;
let _masterGain: GainNode | null = null;
let _bgActive = false;
let _bgTimer: ReturnType<typeof setTimeout> | null = null;
let _bgNodes: AudioNode[] = [];

function ctx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function master(): GainNode {
  if (!_masterGain || _masterGain.context !== ctx()) {
    _masterGain = ctx().createGain();
    _masterGain.gain.value = 1;
    _masterGain.connect(ctx().destination);
  }
  return _masterGain;
}

function tone(freq: number, type: OscillatorType, vol: number, dur: number, delay = 0) {
  if (_muted || freq <= 0) return;
  const c = ctx();
  const osc  = c.createOscillator();
  const gain = c.createGain();
  const t    = c.currentTime + delay;
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(master());
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// ── MUSIC SEQUENCER ──────────────────────────────────────────────────────────
// Upbeat C-major melody, 128 BPM
// Format: [melodyHz, bassHz, durationInBeats]
// 0 = rest. Quarter note at 128 BPM ≈ 0.469 s

const BEAT = 60 / 128;

type Note = [number, number, number]; // [melody, bass, beats]

const PATTERN: Note[] = [
  // Bar 1 — C chord ascent
  [523, 130, 0.5], [659, 130, 0.5], [784, 130, 0.5], [659, 130, 0.5],
  // Bar 2 — C stays
  [523, 130, 0.5], [659, 130, 0.5], [880, 196, 1.0],
  // Bar 3 — G chord climb
  [784, 196, 0.5], [880, 196, 0.5], [988, 196, 0.5], [880, 196, 0.5],
  // Bar 4 — G resolve
  [784, 196, 0.5], [659, 196, 0.5], [523, 261, 1.0],
  // Bar 5 — Am descent
  [659, 220, 0.5], [523, 220, 0.5], [440, 220, 0.5], [523, 220, 0.5],
  // Bar 6 — Am
  [659, 220, 0.5], [784, 220, 0.5], [880, 174, 1.0],
  // Bar 7 — F rise
  [784, 174, 0.5], [698, 174, 0.5], [659, 174, 0.5], [698, 174, 0.5],
  // Bar 8 — Resolution back to C
  [784, 130, 0.5], [659, 130, 0.5], [523, 130, 1.0],
];

const PATTERN_DURATION = PATTERN.reduce((s, n) => s + n[2] * BEAT, 0);

function scheduleMusicLoop(startTime: number) {
  if (_muted || !_bgActive) return;
  const c = ctx();
  let t = startTime;

  for (const [mel, bas, beats] of PATTERN) {
    const dur = beats * BEAT;
    const atk = 0.015;
    const rel = Math.min(0.08, dur * 0.25);

    // Melody — triangle wave (soft, game-like)
    if (mel > 0) {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.value = mel;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.13, t + atk);
      gain.gain.setValueAtTime(0.13, t + dur - rel);
      gain.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(gain);
      gain.connect(master());
      osc.start(t);
      osc.stop(t + dur + 0.02);
      _bgNodes.push(osc, gain);
    }

    // Bass — sine wave (warm)
    if (bas > 0) {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = bas;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.07, t + atk * 2);
      gain.gain.setValueAtTime(0.07, t + dur * 0.6);
      gain.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(gain);
      gain.connect(master());
      osc.start(t);
      osc.stop(t + dur + 0.02);
      _bgNodes.push(osc, gain);
    }

    t += dur;
  }

  // Schedule next loop 100ms before this one ends
  const msUntilNext = (startTime + PATTERN_DURATION - c.currentTime - 0.1) * 1000;
  _bgTimer = setTimeout(() => {
    if (_bgActive && !_muted) scheduleMusicLoop(startTime + PATTERN_DURATION);
  }, Math.max(0, msUntilNext));
}

// ── Public API ────────────────────────────────────────────────────────────────
export const audio = {
  get muted() { return _muted; },

  toggle() {
    _muted = !_muted;
    if (_muted) audio.stopBg();
    else         audio.startBg();
    return _muted;
  },

  click() {
    tone(1100, "sine", 0.06, 0.055);
  },

  correct() {
    // Ascending chime — C5 E5 G5 C6
    [523, 659, 784, 1047].forEach((f, i) => tone(f, "sine", 0.18, 0.26, i * 0.09));
  },

  wrong() {
    // Descending buzz
    [330, 277, 220].forEach((f, i) => tone(f, "sawtooth", 0.10, 0.20, i * 0.08));
  },

  tick() {
    tone(1400, "sine", 0.04, 0.04);
  },

  urgentTick() {
    tone(1800, "sine", 0.08, 0.04);
  },

  stageUp() {
    // Victory fanfare
    [392, 494, 587, 784, 988, 1175].forEach((f, i) => tone(f, "sine", 0.18, 0.32, i * 0.10));
  },

  startBg() {
    if (_bgActive || _muted) return;
    _bgActive = true;
    // Small delay so audio context is definitely unblocked
    setTimeout(() => {
      if (!_bgActive || _muted) return;
      scheduleMusicLoop(ctx().currentTime + 0.05);
    }, 80);
  },

  stopBg() {
    _bgActive = false;
    if (_bgTimer) clearTimeout(_bgTimer);
    _bgTimer = null;
    // Fade out master gain then clear nodes
    if (_masterGain) {
      const t = ctx().currentTime;
      _masterGain.gain.setValueAtTime(_masterGain.gain.value, t);
      _masterGain.gain.linearRampToValueAtTime(0, t + 0.4);
      setTimeout(() => {
        _bgNodes.forEach(n => { try { (n as OscillatorNode).stop?.(); } catch (_) {} });
        _bgNodes = [];
        if (_masterGain) { _masterGain.gain.value = 1; }
      }, 450);
    } else {
      _bgNodes = [];
    }
  },
};

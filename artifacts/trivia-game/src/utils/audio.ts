// Web Audio API sound engine
// Music: upbeat synthesized melody loop
// SFX: click, correct, wrong, tick, stageUp, purchase, purchaseError, coinEarn

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

// ── MUSIC SEQUENCER ───────────────────────────────────────────────────────────
const BEAT = 60 / 128; // 128 BPM

type Note = [number, number, number]; // [melody Hz, bass Hz, duration in beats]

const PATTERN: Note[] = [
  [523, 130, 0.5], [659, 130, 0.5], [784, 130, 0.5], [659, 130, 0.5],
  [523, 130, 0.5], [659, 130, 0.5], [880, 196, 1.0],
  [784, 196, 0.5], [880, 196, 0.5], [988, 196, 0.5], [880, 196, 0.5],
  [784, 196, 0.5], [659, 196, 0.5], [523, 261, 1.0],
  [659, 220, 0.5], [523, 220, 0.5], [440, 220, 0.5], [523, 220, 0.5],
  [659, 220, 0.5], [784, 220, 0.5], [880, 174, 1.0],
  [784, 174, 0.5], [698, 174, 0.5], [659, 174, 0.5], [698, 174, 0.5],
  [784, 130, 0.5], [659, 130, 0.5], [523, 130, 1.0],
];

const PATTERN_DUR = PATTERN.reduce((s, n) => s + n[2] * BEAT, 0);

function scheduleMusicLoop(startTime: number) {
  if (_muted || !_bgActive) return;
  const c = ctx();
  let t = startTime;

  for (const [mel, bas, beats] of PATTERN) {
    const dur = beats * BEAT;
    const atk = 0.015;
    const rel = Math.min(0.08, dur * 0.25);

    if (mel > 0) {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.value = mel;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + atk);
      gain.gain.setValueAtTime(0.12, t + dur - rel);
      gain.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(gain); gain.connect(master());
      osc.start(t); osc.stop(t + dur + 0.02);
      _bgNodes.push(osc, gain);
    }
    if (bas > 0) {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = bas;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + atk * 2);
      gain.gain.setValueAtTime(0.06, t + dur * 0.6);
      gain.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(gain); gain.connect(master());
      osc.start(t); osc.stop(t + dur + 0.02);
      _bgNodes.push(osc, gain);
    }
    t += dur;
  }

  const msUntilNext = (startTime + PATTERN_DUR - c.currentTime - 0.1) * 1000;
  _bgTimer = setTimeout(() => {
    if (_bgActive && !_muted) scheduleMusicLoop(startTime + PATTERN_DUR);
  }, Math.max(0, msUntilNext));
}

// ── Public API ────────────────────────────────────────────────────────────────
export const audio = {
  get muted() { return _muted; },

  toggle() {
    _muted = !_muted;
    if (_muted) audio.stopBg();
    else        audio.startBg();
    return _muted;
  },

  click() { tone(1100, "sine", 0.05, 0.055); },

  correct() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, "sine", 0.17, 0.25, i * 0.09));
  },

  wrong() {
    [330, 277, 220].forEach((f, i) => tone(f, "sawtooth", 0.09, 0.20, i * 0.08));
  },

  tick()        { tone(1400, "sine", 0.04, 0.04); },
  urgentTick()  { tone(1800, "sine", 0.08, 0.04); },

  stageUp() {
    [392, 494, 587, 784, 988, 1175].forEach((f, i) => tone(f, "sine", 0.17, 0.30, i * 0.10));
  },

  // ── Shop SFX ──────────────────────────────────────────────────
  coinEarn() {
    // Quick rising chime — coin pickup feel
    [880, 1047].forEach((f, i) => tone(f, "sine", 0.10, 0.12, i * 0.07));
  },

  purchase() {
    // Success chord: C5 + E5 + G5 together
    [523, 659, 784].forEach((f) => tone(f, "sine", 0.14, 0.45, 0));
    tone(1047, "sine", 0.10, 0.30, 0.18);
  },

  purchaseError() {
    // Low double buzz — "can't afford"
    [200, 180].forEach((f, i) => tone(f, "sawtooth", 0.10, 0.15, i * 0.09));
  },

  unlock() {
    // Sparkle ascending run
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, "sine", 0.15, 0.25, i * 0.08));
  },

  startBg() {
    if (_bgActive || _muted) return;
    _bgActive = true;
    setTimeout(() => {
      if (!_bgActive || _muted) return;
      scheduleMusicLoop(ctx().currentTime + 0.05);
    }, 80);
  },

  stopBg() {
    _bgActive = false;
    if (_bgTimer) clearTimeout(_bgTimer);
    _bgTimer = null;
    if (_masterGain) {
      const t = ctx().currentTime;
      _masterGain.gain.setValueAtTime(_masterGain.gain.value, t);
      _masterGain.gain.linearRampToValueAtTime(0, t + 0.4);
      setTimeout(() => {
        _bgNodes.forEach(n => { try { (n as OscillatorNode).stop?.(); } catch (_) {} });
        _bgNodes = [];
        if (_masterGain) _masterGain.gain.value = 1;
      }, 450);
    } else {
      _bgNodes = [];
    }
  },
};

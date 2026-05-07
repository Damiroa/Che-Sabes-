// Web Audio API sound engine — no MP3 files needed.
// All sounds are synthesized in real-time.

let _ctx: AudioContext | null = null;
let _muted = false;
let _bgNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
let _bgRunning = false;
let _bgScheduler: ReturnType<typeof setTimeout> | null = null;

function ctx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function tone(
  freq: number,
  type: OscillatorType,
  vol: number,
  dur: number,
  delay = 0,
  dest?: AudioNode
) {
  if (_muted) return;
  const c = ctx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, c.currentTime + delay);
  gain.gain.linearRampToValueAtTime(vol, c.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + dur);
  osc.connect(gain);
  gain.connect(dest ?? c.destination);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + dur + 0.01);
}

export const audio = {
  get muted() { return _muted; },

  toggle() {
    _muted = !_muted;
    if (_muted) audio.stopBg();
    else audio.startBg();
    return _muted;
  },

  click() {
    tone(900, "sine", 0.08, 0.06);
  },

  correct() {
    // Ascending chime: C5 E5 G5 C6
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => tone(f, "sine", 0.22, 0.28, i * 0.09));
  },

  wrong() {
    // Descending buzz
    const notes = [330, 277, 220];
    notes.forEach((f, i) => tone(f, "sawtooth", 0.12, 0.22, i * 0.09));
  },

  tick() {
    // Timer tick
    tone(1400, "sine", 0.05, 0.04);
  },

  urgentTick() {
    // Urgent tick when time < 5s
    tone(1800, "sine", 0.1, 0.04);
  },

  stageUp() {
    // Fanfare ascending
    const notes = [392, 494, 587, 784, 988];
    notes.forEach((f, i) => tone(f, "sine", 0.22, 0.35, i * 0.11));
  },

  startBg() {
    if (_bgRunning || _muted) return;
    _bgRunning = true;

    // Subtle ambient loop: slow pulsing pads
    const c = ctx();
    const masterGain = c.createGain();
    masterGain.gain.value = 0.04;
    masterGain.connect(c.destination);

    // Two detuned oscillators for a pad effect
    const freqs = [130.81, 164.81, 196]; // C3 E3 G3
    freqs.forEach((f, i) => {
      const osc = c.createOscillator();
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      const gain = c.createGain();

      osc.type = "sine";
      osc.frequency.value = f;
      lfo.type = "sine";
      lfo.frequency.value = 0.3 + i * 0.1;
      lfoGain.gain.value = 2;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(masterGain);
      gain.gain.value = 0.6;

      osc.start();
      lfo.start();
      _bgNodes.push({ osc, gain });
      _bgNodes.push({ osc: lfo, gain: lfoGain });
    });
  },

  stopBg() {
    _bgRunning = false;
    if (_bgScheduler) clearTimeout(_bgScheduler);
    _bgNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, ctx().currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx().currentTime + 0.5);
        osc.stop(ctx().currentTime + 0.6);
      } catch (_) { /* ignore */ }
    });
    _bgNodes = [];
  },
};

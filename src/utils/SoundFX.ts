// Pure Web Audio API Sound Generator for SAN AI Developer Universe
// Zero external asset dependencies - runs 100% offline via native browser audio synthesis

class SoundFXEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Default muted for browser autoplay policy compliance
  private masterGain: GainNode | null = null;
  private highwayAmbientAudio: HTMLAudioElement | null = null;

  constructor() {
    // AudioContext is initialized on first user interaction to comply with browser audio policies
  }

  private initCtx() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.25, this.ctx.currentTime);
    }
    if (muted) {
      this.stopHighwayAmbient();
    } else {
      this.playHighwayAmbient();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // UI Button Click: crisp high-tech click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Hover Chime: subtle cyber tick
  public playHover() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // Teleport / Warp Sound: frequency sweep upward
  public playWarp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Mode Switch (Orbit -> Free Roam -> Guided Tour)
  public playModeSwitch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.06); // E5

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start(this.ctx.currentTime + 0.06);
    osc1.stop(this.ctx.currentTime + 0.06);
    osc2.stop(this.ctx.currentTime + 0.18);
  }

  // Contact Beacon Harmonic Chime
  public playBeaconChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // --- INNOVATIVE ASSET PACK AUDIO METHODS ---

  // 1. Ambient Highway Loop (ambient_highway_loop.wav)
  public playHighwayAmbient() {
    if (this.isMuted) return;
    if (typeof window === 'undefined') return;

    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      if (!this.highwayAmbientAudio) {
        this.highwayAmbientAudio = new Audio(`${baseUrl}assets/audio/ambient_highway_loop.wav`);
        this.highwayAmbientAudio.loop = true;
        this.highwayAmbientAudio.volume = 0.28;
      }
      this.highwayAmbientAudio.play().catch(() => {
        // Autoplay policy prevented playback until user interaction
      });
    } catch {
      // Audio element fallback
    }
  }

  public stopHighwayAmbient() {
    if (this.highwayAmbientAudio) {
      try {
        this.highwayAmbientAudio.pause();
        this.highwayAmbientAudio.currentTime = 0;
      } catch {
        // Safe catch
      }
    }
  }

  // 2. Chapter Transition Whoosh (chapter_transition_whoosh.wav)
  public playChapterWhoosh() {
    if (this.isMuted) return;
    if (typeof window === 'undefined') return;

    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const audio = new Audio(`${baseUrl}assets/audio/chapter_transition_whoosh.wav`);
      audio.volume = 0.35;
      audio.play().catch(() => {
        this.playWarp(); // Synthesizer fallback
      });
    } catch {
      this.playWarp();
    }
  }

  // 3. Milestone Chime (milestone_chime.wav)
  public playMilestoneChime() {
    if (this.isMuted) return;
    if (typeof window === 'undefined') return;

    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const audio = new Audio(`${baseUrl}assets/audio/milestone_chime.wav`);
      audio.volume = 0.40;
      audio.play().catch(() => {
        this.playBeaconChime(); // Synthesizer fallback
      });
    } catch {
      this.playBeaconChime();
    }
  }
}

export const SoundFX = new SoundFXEngine();
if (typeof window !== 'undefined') {
  (window as any).__SOUND_FX__ = SoundFX;
}


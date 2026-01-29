import { useRef, useCallback, useEffect } from "react";

interface AudioSynthOptions {
  masterVolume?: number;
}

export const useAudioSynth = (options: AudioSynthOptions = {}) => {
  const { masterVolume = 0.3 } = options;
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<Set<AudioNode>>(new Set());

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = masterVolume;
      masterGainRef.current.connect(audioContextRef.current.destination);
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, [masterVolume]);

  // Deep ambient drone
  const playAmbientDrone = useCallback(() => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Create a rich, layered drone
    osc1.type = "sine";
    osc1.frequency.value = 55; // A1
    osc2.type = "sine";
    osc2.frequency.value = 82.5; // E2
    osc3.type = "triangle";
    osc3.frequency.value = 110; // A2

    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // Slow frequency modulation for movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    // Fade in
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);

    osc1.start();
    osc2.start();
    osc3.start();
    lfo.start();

    activeNodesRef.current.add(osc1);
    activeNodesRef.current.add(osc2);
    activeNodesRef.current.add(osc3);
    activeNodesRef.current.add(lfo);

    return { oscillators: [osc1, osc2, osc3, lfo], gainNode };
  }, [initAudio]);

  // Whoosh transition sound
  const playWhoosh = useCallback(() => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const noise = ctx.createBufferSource();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 5;
    
    const gainNode = ctx.createGain();

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    // Sweep the filter frequency
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.3);
    filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

    noise.start();
    noise.stop(ctx.currentTime + 0.5);
  }, [initAudio]);

  // Resonant ping/chime
  const playChime = useCallback((baseFreq: number = 880) => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = baseFreq;
    osc2.type = "sine";
    osc2.frequency.value = baseFreq * 1.5; // Perfect fifth

    osc.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 1.5);
    osc2.stop(ctx.currentTime + 1.5);
  }, [initAudio]);

  // Rising tone for reveal
  const playRise = useCallback(() => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    filter.type = "lowpass";
    filter.frequency.value = 2000;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.8);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }, [initAudio]);

  // Digital blip for stats
  const playBlip = useCallback((pitch: number = 1) => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 440 * pitch;

    osc.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [initAudio]);

  // Impact/bass hit
  const playImpact = useCallback(() => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);

    osc.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, [initAudio]);

  // Stop all sounds
  const stopAll = useCallback(() => {
    activeNodesRef.current.forEach((node) => {
      if (node instanceof OscillatorNode) {
        try {
          node.stop();
        } catch (e) {
          // Already stopped
        }
      }
    });
    activeNodesRef.current.clear();
  }, []);

  // Fade out drone
  const fadeOutDrone = useCallback((droneRef: { oscillators: OscillatorNode[]; gainNode: GainNode } | null) => {
    if (!droneRef || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    droneRef.gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    
    setTimeout(() => {
      droneRef.oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      stopAll();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAll]);

  return {
    initAudio,
    playAmbientDrone,
    playWhoosh,
    playChime,
    playRise,
    playBlip,
    playImpact,
    stopAll,
    fadeOutDrone,
  };
};

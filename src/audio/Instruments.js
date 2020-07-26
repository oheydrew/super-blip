const INSTRUMENT_PRESETS = {
  MembraneLow: {
    name: 'MembraneSynth',
    volume: -12,
  },
  SynthBasic: {
    name: 'Synth',
    volume: -18,
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1,
      release: 1,
    },
    resonance: 800,
    modulationIndex: 20,
  },
  LowSaw: {
    name: 'Synth',
    volume: -18,
    oscillator: {
      type: 'sawtooth',
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1,
      release: 1,
    },
    resonance: 800,
    modulationIndex: 20,
  },
};

export { INSTRUMENT_PRESETS };

// volume: -12
// oscillator: {
//   type: 'sawtooth'
// },
// filter: {
//   Q: 2,
//   type: 'bandpass',
//   rolloff: -24
// },
// envelope: {
//   attack: 0.01,
//   decay: 0.1,
//   sustain: 0.2,
//   release: 0.6
// },
// filterEnvelope: {
//   attack: 0.02,
//   decay: 0.4,
//   sustain: 1,
//   release: 0.7,
//   releaseCurve: 'linear',
//   baseFrequency: 20,
//   octaves: 5
// }

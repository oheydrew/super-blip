const INSTRUMENT_PRESETS = [
  {
    id: 'LowSynth',
    engineType: 'MembraneSynth',
    engine: null, // initialize with Tone Instrument (Engine) here
    config: {
      volume: -10,
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
    },
  },
  {
    id: 'HighSynth',
    engineType: 'MembraneSynth',
    engine: null,
    config: {
      volume: -10,
    },
  },
  {
    id: 'MidTone',
    engineType: 'Synth',
    engine: null,
    config: {
      volume: -20,
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 1,
        release: 1,
      },
      resonance: 800,
      modulationIndex: 20,
    },
  },
  {
    id: 'HighTone',
    engineType: 'Synth',
    engine: null,
    config: {
      volume: -20,
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 1,
        release: 1,
      },
      resonance: 800,
      modulationIndex: 20,
    },
  },
  {
    id: 'LowSaw',
    engineType: 'Synth',
    engine: null,
    config: {
      volume: -20,
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
  },
];

export { INSTRUMENT_PRESETS };

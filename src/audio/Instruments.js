// Preset values for creating ToneJS Instruments.
// 'presetId' is the name of the instrument used by a Channel
// All other keys are ToneJS Specific

const INSTRUMENT_PRESETS = [
  {
    presetId: 'MembraneLow',
    name: 'MembraneSynth',
    volume: -12,
  },
  {
    presetId: 'SynthSine',
    name: 'Synth',
    volume: -18,
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1,
      release: 1,
    },
  },
  {
    presetId: 'SynthSaw',
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
  },
];

const createInstrumentFromPreset = ({ toneJs, presetId = 'MidTone' }) => {
  const preset = INSTRUMENT_PRESETS.find(preset => preset.presetId === presetId);
  const Instrument = toneJs[preset.name];
  return new Instrument(preset).toMaster();
};

const initializeInstruments = ({ toneJs }) =>
  INSTRUMENT_PRESETS.reduce((acc, { presetId }) => {
    return {
      ...acc,
      [presetId]: createInstrumentFromPreset({ toneJs, presetId: presetId }),
    };
  }, {});

export { INSTRUMENT_PRESETS, initializeInstruments, createInstrumentFromPreset };

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

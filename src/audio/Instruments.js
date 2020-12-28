// Preset values for creating ToneJS Instruments.
// 'presetId' is the name of the instrument used by a Channel
// All other keys are ToneJS Specific

const INSTRUMENT_PRESETS = [
  {
    id: 'MembraneLow',
    name: 'MembraneSynth',
    volume: -12,
  },
  {
    id: 'SynthSine',
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
    id: 'SynthSine2',
    name: 'Synth',
    volume: -18,
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1.5,
      release: 1.5,
    },
  },
  {
    id: 'SynthSaw',
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
  const preset = INSTRUMENT_PRESETS.find(preset => preset.id === presetId);
  const Instrument = toneJs[preset.name];

  return new Instrument(preset).toMaster();
};

const initializeInstruments = ({ toneJs, channels }) =>
  channels.reduce((acc, { id, presetId }) => {
    return {
      ...acc,
      [id]: createInstrumentFromPreset({ toneJs, presetId: presetId }),
    };
  }, {});

const addInstrument = ({ newInstrument, setInstruments, channelId }) =>
  setInstruments(instruments => ({ ...instruments, [channelId]: newInstrument }));

export { INSTRUMENT_PRESETS, initializeInstruments, createInstrumentFromPreset, addInstrument };

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

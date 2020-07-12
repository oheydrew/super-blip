import React, { useState, useEffect } from 'react';
import Tone from 'tone';
import { Flex } from 'rebass';

import { MainLayout } from 'layouts';
import { Button, Fader } from 'components/primitives';
import { Header } from './components/Header';

const INSTRUMENT_PRESETS = [
  {
    name: 'LowSynth',
    engineType: 'MembraneSynth',
    engine: null, // initialize with Tone Instrument (Engine) here
    note: 'C1',
    length: '16n',
    config: {
      volume: -10
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
    }
  },
  {
    name: 'HighSynth',
    engineType: 'MembraneSynth',
    engine: null,
    note: 'C4',
    length: '4n',
    config: {
      volume: -10
    }
  }
];

const PRESET_TO_TONE_INST = {
  MembraneSynth: Tone.MembraneSynth
};

const INITIAL_ARRANGEMENT = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0]
];

const initializeInstrumentEngines = presets =>
  presets.map(instrument => {
    const Synth = PRESET_TO_TONE_INST[instrument.engineType];
    return { ...instrument, engine: new Synth(instrument.config).toMaster() };
  });

const Root = () => {
  const { Master, Transport } = Tone;

  // Track / Instrument State
  const [arrangement, setArrangement] = useState(INITIAL_ARRANGEMENT);
  const [instruments, setInstruments] = useState(initializeInstrumentEngines(INSTRUMENT_PRESETS));

  // ToneJS-Controlled Values
  const [playing, setPlaying] = useState(false);
  const [playHeadPosition, setPlayHeadPosition] = useState(0);

  const [masterVolume, setMasterVolume] = useState(0);
  const [masterMute, setMasterMute] = useState(false);
  Master.mute = masterMute; // TODO: Could refs be used here instead?
  Master.volume.value = masterVolume;

  useEffect(
    () => {
      // Generates a Sequence (Loop of Events) from Tone.JS
      const sequenceLoop = new Tone.Sequence(
        (time, currentPlayStep) => {
          // Update active column for animation
          setPlayHeadPosition(currentPlayStep);

          // Loop current pattern
          arrangement.map((channel, channelIndex) => {
            // If active
            if (channel[currentPlayStep]) {
              // Play based on which channel
              const instrument = instruments[channelIndex];
              return instrument.engine.triggerAttackRelease(instrument.note, instrument.length, time);
            }

            return null;
          });
        },
        [0, 1, 2, 3, 4, 5, 6, 7], // Values to iterate over for currentPlayStep
        '8n' // Length of time between steps
      ).start(0);
      return () => sequenceLoop.dispose(); // Callback to kill sequenceLoop
    },
    [arrangement, instruments] // Retrigger when pattern changes
  );

  useEffect(() => {
    console.log({ playing });
  }, [playing]);

  useEffect(() => {
    console.log({ masterVolume });
  }, [masterVolume]);

  const handleStartButton = () => {
    Transport.toggle();
    setPlaying(playing => !playing);
  };

  const handleNoteClick = ({ channelIndex, noteIndex, noteVal }) => {
    setArrangement(oldSequence => {
      const newSequence = [...oldSequence];
      newSequence[channelIndex][noteIndex] = +!noteVal;
      return newSequence;
    });
  };

  return (
    <MainLayout header={<Header masterMute={masterMute} setMasterMute={setMasterMute} />}>
      <Flex width={1} m="0.5em" justifyContent="center">
        Hello, there!
      </Flex>

      <Button m="0.5em" id="toneStart" bg={!playing ? '#08AEEA' : '#2AF598'} onClick={handleStartButton}>
        {!playing ? "Let's Do This" : 'Yeeeah Blips!'}
      </Button>

      <Flex width={1 / 8} m="0.5em" justifyContent="center">
        <Fader
          min="-80"
          max="6"
          step={1}
          value={masterVolume}
          onChange={({ target: { value } }) => setMasterVolume(value)}
          onDoubleClick={() => setMasterVolume(0)}
        ></Fader>
      </Flex>

      {masterVolume}

      <Flex width={1} m="0.5em" justifyContent="center" flexWrap="wrap">
        {arrangement.map((channel, channelIndex) => (
          <Flex key={`channel${channelIndex}`}>
            {channel.map((noteVal, noteIndex) => (
              <Button
                key={`note${noteIndex}`}
                sx={{
                  width: '3em',
                  height: '3em',
                  m: '0.5em',
                  backgroundColor: noteVal ? '#08AEEA' : '#2AF598',
                  opacity: playHeadPosition === noteIndex ? 1 : 0.5
                }}
                onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
              ></Button>
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex width={1}></Flex>
    </MainLayout>
  );
};

export { Root };

import React, { useState, useEffect } from 'react';
import Tone from 'tone';
import { Flex } from 'rebass';

import { MainLayout } from 'layouts';
import { Button } from 'components/primitives';
import { Header } from './components/Header';

const INSTRUMENT_PRESETS = [
  {
    id: 'LowSynth',
    engineType: 'MembraneSynth',
    engine: null, // initialize with Tone Instrument (Engine) here
    note: 'C1',
    length: '16n',
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
    note: 'C4',
    length: '4n',
    config: {
      volume: -10,
    },
  },
  {
    id: 'MidTone',
    engineType: 'Synth',
    engine: null,
    note: 'C4',
    length: '8n',
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
    note: 'D#5',
    length: '16n',
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
    note: 'C1',
    length: '8n',
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

const PRESET_TO_TONE_INST = {
  MembraneSynth: Tone.MembraneSynth,
  Synth: Tone.Synth,
};

const INITIAL_CHANNELS = [
  { arrangement: [1, 0, 1, 0, 1, 0, 1, 0], instrumentId: 'LowSynth' },
  { arrangement: [0, 0, 1, 0, 0, 0, 1, 0], instrumentId: 'HighSynth' },
  { arrangement: [0, 1, 0, 1, 0, 1, 0, 1], instrumentId: 'MidTone' },
  { arrangement: [0, 1, 0, 1, 0, 1, 0, 1], instrumentId: 'HighTone' },
  { arrangement: [0, 0, 1, 1, 0, 1, 1, 1], instrumentId: 'LowSaw' },
];

const COLORS = [
  '#08AEEA',
  '#60CFFB',
  '#F57AC8',
  '#9270FF',
  '#089B59',
  '#08AEEA',
  '#60CFFB',
  '#F57AC8',
  '#9270FF',
  '#089B59',
];

const initializeInstrumentEngines = presets =>
  presets.map(instrument => {
    const Synth = PRESET_TO_TONE_INST[instrument.engineType];
    console.log(Synth);
    return { ...instrument, engine: new Synth(instrument.config).toMaster() };
  });

const Root = () => {
  const { Master, Transport } = Tone;

  // Track / Instrument State
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [instruments] = useState(() => initializeInstrumentEngines(INSTRUMENT_PRESETS));

  // ToneJS-Controlled Values
  const [playing, setPlaying] = useState(false);
  const [playHeadPosition, setPlayHeadPosition] = useState(0);

  const [masterVolume, setMasterVolume] = useState(0);
  Master.volume.value = masterVolume; // TODO: Could refs be used here instead?

  useEffect(
    () => {
      // Generates a Sequence (Loop of Events) from Tone.JS
      const sequenceLoop = new Tone.Sequence(
        (time, currentPlayStep) => {
          // Update active column for animation
          setPlayHeadPosition(currentPlayStep);

          channels.map(channel => {
            // Find note-on's from each channel's arrangement, and fire instrument
            if (channel.arrangement[currentPlayStep]) {
              const instrument = instruments.find(inst => channel.instrumentId === inst.id);

              console.log({ instrument });
              const shot = instrument.engine.triggerAttackRelease(instrument.note, instrument.length, time);
              console.log({ shot });
              return null;
            }
            return null;
          });
        },
        [0, 1, 2, 3, 4, 5, 6, 7], // Values to iterate over for currentPlayStep
        '8n' // Length of time between steps
      ).start(0);
      return () => sequenceLoop.dispose(); // Callback to kill sequenceLoop
    },
    [channels, instruments] // Retrigger when pattern changes
  );

  useEffect(() => {
    console.log({ playing });
  }, [playing]);

  useEffect(() => {
    console.log({ masterVolume });
  }, [masterVolume]);

  const handlePlayToggle = () => {
    Transport.toggle();
    setPlaying(playing => !playing);
  };

  const handleNoteClick = ({ channelIndex, noteIndex, noteVal }) => {
    setChannels(oldChannels => {
      const newChannels = [...oldChannels];
      newChannels[channelIndex].arrangement[noteIndex] = +!noteVal;
      return newChannels;
    });
  };

  const handleMoreBlips = () => {
    if (!playing) {
      return handlePlayToggle();
    }

    const randArrangement = [...Array(8)].map(() => Math.round(Math.random() - 0.2));
    const newChannel = {
      arrangement: randArrangement,
      instrumentId: instruments[Math.floor(Math.random() * instruments.length)].id,
    };

    setChannels(oldChannels => [...oldChannels, newChannel]);
  };

  const handleLessBlips = () => {
    setChannels(channels => {
      const oneLessBlip = [...channels];
      oneLessBlip.pop();
      return oneLessBlip;
    });
  };

  return (
    <MainLayout
      footer={
        <Header
          handlePlayToggle={handlePlayToggle}
          playing={playing}
          masterVolume={masterVolume}
          setMasterVolume={setMasterVolume}
        />
      }
    >
      <Flex width={1} m="0.5em" justifyContent="center" flexWrap="wrap">
        {channels.map((channel, channelIndex) => (
          <Flex key={`channel${channelIndex}`} justifyContent="center" flexWrap="wrap">
            <Flex>
              {channel.arrangement.map(
                (noteVal, noteIndex) =>
                  noteIndex < 4 && (
                    <Button
                      key={`note${noteIndex}`}
                      sx={{
                        width: ['3.5em', '4em'],
                        height: ['3.5em', '4em'],
                        p: 0,
                        m: '0.5em',
                        backgroundColor: noteVal ? COLORS[channelIndex] : '#2AF598',
                        opacity: playHeadPosition === noteIndex ? 1 : 0.5,
                      }}
                      onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
                    />
                  )
              )}
            </Flex>

            <Flex alignItems="center">
              {channel.arrangement.map(
                (noteVal, noteIndex) =>
                  noteIndex > 3 && (
                    <Button
                      key={`note${noteIndex}`}
                      sx={{
                        width: ['3.5em', '4em'],
                        height: ['3.5em', '4em'],
                        p: 0,
                        m: '0.5em',
                        backgroundColor: noteVal ? COLORS[channelIndex] : '#2AF598',
                        opacity: playHeadPosition === noteIndex ? 1 : 0.5,
                      }}
                      onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
                    />
                  )
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex alignItems="center">
        {channels.length < 9 && (
          <Button m="0.5em" id="toneStart" bg={!playing ? '#08AEEA' : '#2AF598'} onClick={handleMoreBlips}>
            {!playing ? 'Blip?' : 'Yeeeah! More Blips?'}
          </Button>
        )}

        {channels.length > 1 && (
          <Button m="0.5em" id="toneStart" bg="#e67ad4" onClick={handleLessBlips}>
            Less Blips?
          </Button>
        )}
      </Flex>
    </MainLayout>
  );
};

export { Root };

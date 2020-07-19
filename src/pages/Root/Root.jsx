import React, { useState, useEffect } from 'react';
import { Flex } from 'rebass';

import { useTone } from 'audio/contexts/ToneContext';
import { INSTRUMENT_PRESETS } from 'audio';

import { MainLayout } from 'layouts';
import { Button } from 'components';
import { Header, Channel } from './components';

const INITIAL_CHANNELS = [
  {
    arrangement: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    instrumentId: 'LowSynth',
    note: { pitch: 'C1', length: '16n' },
  },
  {
    arrangement: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    instrumentId: 'HighSynth',
    note: { pitch: 'C4', length: '4n' },
  },
  {
    arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    instrumentId: 'MidTone',
    note: { pitch: 'C4', length: '8n' },
  },
  {
    arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    instrumentId: 'HighTone',
    note: { pitch: 'D#5', length: '16n' },
  },
  {
    arrangement: [0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
    instrumentId: 'LowSaw',
    note: { pitch: 'C1', length: '8n' },
  },
];

const COLORS = ['#08AEEA', '#2AF598'];

const createInstrumentFromPreset = ({ toneJs, id, presetId = 'MidTone' }) => {
  const instrument = INSTRUMENT_PRESETS.find(ipre => ipre.id === presetId);
  const Synth = toneJs[instrument.engineType];
  return { ...instrument, id, engine: new Synth(instrument.config).toMaster() };
};

const initializeInstruments = ({ toneJs, presets }) =>
  presets.map(preset => createInstrumentFromPreset({ toneJs, id: preset.id, presetId: preset.id }));

const Root = () => {
  const Tone = useTone();
  const { Master, Transport } = Tone;

  // Track / Instrument State
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [instruments, setInstruments] = useState(() =>
    initializeInstruments({ toneJs: Tone, presets: INSTRUMENT_PRESETS })
  );

  // ToneJS-Controlled Values
  const [playing, setPlaying] = useState(false);
  const [playHeadPosition, setPlayHeadPosition] = useState(0);

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
              const shot = instrument.engine.triggerAttackRelease(
                channel.note.pitch,
                channel.note.length,
                time
              );
              console.log({ shot });
              return null;
            }
            return null;
          });
        },
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Values to iterate over for currentPlayStep
        '8n' // Length of time between steps
      ).start(0);
      return () => sequenceLoop.dispose(); // Callback to kill sequenceLoop
    },
    [channels, instruments, Tone.Sequence] // Retrigger when pattern changes
  );

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

    const newInstrument = createInstrumentFromPreset({
      toneJs: Tone,
      id: `inst${instruments.length}`,
      presetId: ['MidTone', 'LowSaw'][Math.round(Math.random())],
    });
    const randArrangement = [...Array(16)].map(() => Math.round(Math.random() - 0.2));
    const newChannel = {
      arrangement: randArrangement,
      instrumentId: newInstrument.id,
      note: { pitch: 'C4', length: '8n' },
    };

    setInstruments(oldInstruments => [...oldInstruments, newInstrument]);
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
    <MainLayout footer={<Header handlePlayToggle={handlePlayToggle} playing={playing} />}>
      <Flex width={1} m="0.5em" justifyContent="center" flexWrap="wrap">
        {channels.map((channel, channelIndex) => (
          <Channel
            width={1}
            channel={channel}
            setChannels={setChannels}
            channelIndex={channelIndex}
            instrument={instruments.find(inst => inst.id === channel.instrumentId)}
            handleNoteClick={handleNoteClick}
            totalChannels={channels.length}
            playHeadPosition={playHeadPosition}
          />
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

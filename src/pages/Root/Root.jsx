import React, { useState, useEffect, useRef } from 'react';
import { Flex } from 'rebass';

import { useTone } from 'audio/contexts/ToneContext';
import { INSTRUMENT_PRESETS, initializeInstruments, createInstrumentFromPreset, generateScale } from 'audio';

import { MainLayout } from 'layouts';
import { Button } from 'components';
import { Header, Channel } from './components';

const INITIAL_CHANNELS = [
  {
    id: 'kick',
    arrangement: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    presetId: 'MembraneLow',
    note: { root: 'C1', length: '16n' },
  },
  {
    id: 'snare',
    arrangement: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    presetId: 'MembraneLow',
    note: { root: 'C4', length: '4n' },
  },
  {
    id: 'hat',
    arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    presetId: 'SynthSine',
    note: { root: 'D#5', length: '16n' },
  },
  {
    id: 'lead',
    arrangement: [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    presetId: 'SynthSine2',
    note: { root: 'C4', length: '8n' },
    scale: generateScale({ rootNote: 'C', octave: 4, scaleType: 'Natural Minor' }),
  },
  {
    id: 'saw',
    arrangement: [0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
    presetId: 'SynthSaw',
    note: { root: 'C1', length: '8n' },
  },
];

const createSequence = ({ Sequence, channels, instruments, setPlayHeadPosition }) =>
  new Sequence(
    (time, currentPlayStep) => {
      // Update active column for animation
      setPlayHeadPosition(currentPlayStep);

      channels.map(({ id: channelId, note, scale, arrangement }, channelIndex) => {
        // Find note-on's from each channel's arrangement, and fire instrument
        if (arrangement[currentPlayStep]) {
          const instrument = instruments[channelId];

          const noteTrigger = instrument.triggerAttackRelease(
            scale ? scale[currentPlayStep] : note.root,
            note.length,
            time
          );

          console.log({ noteTrigger });
          return null;
        }
        return null;
      });
    },
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Values to iterate over for currentPlayStep
    '8n' // Length of time between steps
  );

const Root = () => {
  const Tone = useTone();
  const { Transport, Sequence } = Tone;

  // Track / Instrument State
  const initialChannels = JSON.parse(JSON.stringify(INITIAL_CHANNELS));
  const [channels, setChannels] = useState(initialChannels);
  const [instruments, setInstruments] = useState(() =>
    initializeInstruments({ toneJs: Tone, channels: initialChannels })
  );

  // ToneJS-Controlled Values
  const [playing, setPlaying] = useState(false);
  const [playHeadPosition, setPlayHeadPosition] = useState(0);

  // TODO: Functional / Data repository style Idea:
  // channel: { id, arrangement, note/scale } - Individual channel info
  // channels: { [channel.id]: channel, [channel.id]: channel, ... } - Data only: All channel storage
  // instruments: [ [channel.id]: ToneInstrument, [channel.id]: ToneInstrument, ... ] - ToneJS Instrument Instance Store
  // sequences: [ [channel.id]: ToneSequence(channel), [channel.id]: ToneSequence(channel), ...] - ToneJS Sequence Instance Store
  //
  // Channels could reference Inst and Sequence Instances via their own channel ID
  // Creating new channels could create Instances & Sequences, too - and deleting could do the same
  // New instances could still be generated from Presets
  //
  // Create a new Instrument & new Sequence for each channel.
  // Instead of useEffect, specifically update / dispose of Sequences directly when playing/editing?

  useEffect(
    () => {
      console.log('trigger');
      const sequence = createSequence({ Sequence, channels, instruments, setPlayHeadPosition }).start(0); // Generates a Sequence (Loop of Events) from Tone.JS

      return () => sequence.dispose(); // Callback to kill sequenceLoop
    },
    [channels, instruments, Sequence] // Retrigger whenever pattern changes
  );

  const mouseDown = useRef(false);

  const handlePlayToggle = () => {
    Transport.toggle();
    return setPlaying(playing => !playing);
  };

  const handleNoteClick = ({ channelIndex, noteIndex, noteVal }) => {
    setChannels(oldChannels => {
      const newChannels = [...oldChannels];
      newChannels[channelIndex].arrangement[noteIndex] = +!noteVal;
      return newChannels;
    });
  };

  const handleMoreBlips = () => {
    const newInstrument = createInstrumentFromPreset({
      toneJs: Tone,
      presetId: INSTRUMENT_PRESETS[Math.floor(Math.random() * INSTRUMENT_PRESETS.length)].id,
    });
    const instrumentId = `${newInstrument.presetId}__channel_${channels.length}`;
    const randArrangement = [...Array(16)].map(() => Math.round(Math.random() - 0.2));

    const newChannel = {
      arrangement: randArrangement,
      instrumentId: instrumentId,
      note: { root: 'C4', length: '8n' },
    };

    setInstruments(oldInstruments => ({ ...oldInstruments, [instrumentId]: newInstrument }));
    setChannels(oldChannels => [...oldChannels, newChannel]);
  };

  const handleLessBlips = () => {
    setChannels(channels => {
      const oneLessBlip = [...channels];
      oneLessBlip.pop();
      return oneLessBlip;
    });
  };

  const handleResetBlips = () => {
    const initialChannels = JSON.parse(JSON.stringify(INITIAL_CHANNELS));
    setChannels(initialChannels);
    return setInstruments(initializeInstruments({ toneJs: Tone, channels: initialChannels }));
  };

  return (
    <MainLayout footer={<Header handlePlayToggle={handlePlayToggle} playing={playing} />}>
      <Flex
        width={1}
        m="0.5em"
        justifyContent="center"
        flexWrap="wrap"
        onMouseDown={() => {
          mouseDown.current = true;
        }}
        onMouseUp={() => {
          mouseDown.current = false;
        }}
      >
        {channels.map((channel, channelIndex) => (
          <Channel
            key={`channel_${channelIndex}`}
            width={1}
            channel={channel}
            setChannels={setChannels}
            channelIndex={channelIndex}
            instrument={instruments[channel.id]}
            handleNoteClick={handleNoteClick}
            totalChannels={channels.length}
            playHeadPosition={playHeadPosition}
            mouseDown={mouseDown}
          />
        ))}
      </Flex>

      <Flex alignItems="center">
        {channels.length < 9 && (
          <Button m="0.5em" id="toneStart" bg={!playing ? '#08AEEA' : '#2AF598'} onClick={handleMoreBlips}>
            {!playing ? 'More Blip?' : 'Yeeeah! More Blips?'}
          </Button>
        )}

        {channels.length > 1 && (
          <Button m="0.5em" id="toneStart" bg="#e67ad4" onClick={handleLessBlips}>
            Less Blips?
          </Button>
        )}

        <Button m="0.5em" id="toneStart" bg="#08AEEA" onClick={handleResetBlips}>
          Reset Blips?
        </Button>
      </Flex>
    </MainLayout>
  );
};

export { Root };

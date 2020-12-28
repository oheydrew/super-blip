import React, { useState, useEffect, useRef } from 'react';
import { Flex } from 'rebass';
import chroma from 'chroma-js';
import Tone from 'tone';
import styled from 'styled-components';

import { INSTRUMENT_PRESETS, initializeInstruments, createInstrumentFromPreset, generateScale } from 'audio';
import { useTransport } from 'contexts/TransportContext';

import { MainLayout } from 'layouts';
import { Button } from 'components';
import { Header, Channel } from './components';

// 🥾 AND 🐈 AND 🐝 Bees AND https://www.youtube.com/watch?v=Nni0rTLg5B8
const INITIAL_CHANNELS = [
  {
    id: 'BOOTS 🥾',
    arrangement: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    presetId: 'MembraneLow',
    note: { root: 'C1', length: '16n' },
  },
  {
    id: 'AND 🎩',
    arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    presetId: 'SynthSine',
    note: { root: 'D#5', length: '16n' },
  },
  {
    id: 'CATS 🐈',
    arrangement: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    presetId: 'MembraneLow',
    note: { root: 'C4', length: '4n' },
  },
  {
    id: 'KNEEHIGH 👢',
    arrangement: [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    presetId: 'SynthSine2',
    note: { root: 'C4', length: '8n' },
    scale: generateScale({ rootNote: 'C', octave: 4, scaleType: 'Natural Minor' }),
  },
  {
    id: 'BEES 🐝',
    arrangement: [0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
    presetId: 'SynthSaw',
    note: { root: 'C1', length: '8n' },
  },
];

const createSequence = ({ channels, instruments, setPlayHeadPosition }) =>
  new Tone.Sequence(
    (time, currentPlayStep) => {
      // Update active column for animation
      setPlayHeadPosition(currentPlayStep);

      channels.map(({ id: channelId, note, scale, arrangement }) => {
        // Find note-on's from each channel's arrangement, and fire instrument
        if (arrangement[currentPlayStep]) {
          const instrument = instruments[channelId];
          const frequency = instrument.get('frequency')['frequency'] || null;
          console.log(channelId, frequency);

          const noteTrigger = instrument.triggerAttackRelease(
            scale ? scale[currentPlayStep] : frequency ? frequency : note.root,
            note.length,
            time
          );

          console.log(`Note: ${channelId}`, { noteTrigger });
          return null;
        }
        return null;
      });
    },
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Values to iterate over for currentPlayStep
    '8n' // Length of time between steps
  );

const Root = () => {
  // Track / Instrument State
  const initialChannels = JSON.parse(JSON.stringify(INITIAL_CHANNELS));
  const [channels, setChannels] = useState(initialChannels);
  const [instruments, setInstruments] = useState(() => initializeInstruments({ channels: initialChannels }));

  // ToneJS-Controlled React State for visual Renders, etc
  const { playing, setPlaying, setPlayHeadPosition } = useTransport();

  useEffect(
    () => {
      const sequence = createSequence({ channels, instruments, setPlayHeadPosition }).start(0); // Generates a Sequence (Loop of Events) from Tone.JS

      return () => sequence.dispose(); // Callback to kill sequenceLoop
    },
    [channels, instruments, setPlayHeadPosition] // Retrigger whenever pattern changes
  );

  const mouseDown = useRef(false);

  const handlePlayToggle = () => {
    Tone.Transport.toggle();
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
      presetId: INSTRUMENT_PRESETS[Math.floor(Math.random() * INSTRUMENT_PRESETS.length)].id,
    });
    const channelId = `channel_${channels.length}`;
    const randArrangement = [...Array(16)].map(() => Math.round(Math.random() - 0.2));

    const newChannel = {
      id: channelId,
      arrangement: randArrangement,
      note: { root: 'C4', length: '8n' },
    };

    setInstruments(oldInstruments => ({ ...oldInstruments, [channelId]: newInstrument }));
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

  const noteColors = chroma.scale(['#E67AD5', '#FFD639']).mode('lab').colors(channels.length);
  const blankColors = chroma.scale(['#2AF598', '#08AEEA']).mode('lab').colors(channels.length);

  return (
    <MainLayout footer={<Header handlePlayToggle={handlePlayToggle} playing={playing} />}>
      <Channels
        width={1}
        onMouseDown={() => {
          mouseDown.current = true;
        }}
        onMouseUp={() => {
          mouseDown.current = false;
        }}
        onTouchStart={() => {
          mouseDown.current = true;
        }}
        onTouchEnd={() => {
          mouseDown.current = false;
        }}
      >
        {channels.map((channel, channelIndex) => (
          <Channel
            width={1}
            key={`channel_${channelIndex}`}
            channel={channel}
            channelIndex={channelIndex}
            instrument={instruments[channel.id]}
            setChannels={setChannels}
            handleNoteClick={handleNoteClick}
            mouseDown={mouseDown}
            noteColor={noteColors[channelIndex]}
            blankColor={blankColors[channelIndex]}
          />
        ))}
      </Channels>

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

const Channels = styled(Flex)`
  margin: 0.5em;
  justify-content: center;
  flex-wrap: wrap;
`;

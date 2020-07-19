import React, { useState, useEffect } from 'react';
import { Flex } from 'rebass';

import { useTone } from 'audio/contexts/ToneContext';
import { INSTRUMENT_PRESETS } from 'audio';

import { MainLayout } from 'layouts';
import { Button, NoteButton } from 'components';
import { Header } from './components/Header';

const INITIAL_CHANNELS = [
  { arrangement: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], instrumentId: 'LowSynth' },
  { arrangement: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], instrumentId: 'HighSynth' },
  { arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], instrumentId: 'MidTone' },
  { arrangement: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], instrumentId: 'HighTone' },
  { arrangement: [0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1], instrumentId: 'LowSaw' },
];

const COLORS = [
  '#08AEEA',
  '#0CB6E1',
  '#10BED8',
  '#13C6CF',
  '#17CEC6',
  '#1BD5BC',
  '#1FDDB3',
  '#22E5AA',
  '#26EDA1',
  '#2AF598',
];

const initializeInstrumentEngines = ({ toneJs, presets }) =>
  presets.map(instrument => {
    const Synth = toneJs[instrument.engineType];
    return { ...instrument, engine: new Synth(instrument.config).toMaster() };
  });

const Root = () => {
  const Tone = useTone();
  const { Master, Transport } = Tone;

  // Track / Instrument State
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [instruments] = useState(() =>
    initializeInstrumentEngines({ toneJs: Tone, presets: INSTRUMENT_PRESETS })
  );

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
              {channel.arrangement.map((noteVal, noteIndex) => (
                <NoteButton
                  key={`note${noteIndex}`}
                  sx={{
                    backgroundColor: noteVal ? COLORS[channelIndex] : COLORS[7 - channelIndex],
                    opacity: playHeadPosition === noteIndex ? 1 : 0.4,
                  }}
                  onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
                />
              ))}
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

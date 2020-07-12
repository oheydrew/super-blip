import React, { useState, useEffect } from 'react';
import Tone from 'tone';
import { Box, Flex } from 'rebass';

import { MainLayout } from 'layouts';
import { Button, Fader } from 'components/primitives';
import { Header } from './components/Header';

const synth = new Tone.MembraneSynth().toMaster();
const loop = new Tone.Loop(time => {
  //triggered every eighth note.
  console.log('Time:', time);
  console.log(Tone.Transport.position);
  synth.triggerAttackRelease('C2', '2n', time);
}, '2n');

const INITIAL_SEQUENCE = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0]
];

const Root = () => {
  const [playing, setPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0);
  const [masterMute, setMasterMute] = useState(false);
  // const [currentPos, setCurrentPos] = useState(Tone.Transport.position);

  const [sequence, setSequence] = useState(INITIAL_SEQUENCE);

  const { Master, Transport } = Tone;

  Master.mute = masterMute;
  Master.volume.value = masterVolume;

  useEffect(() => {
    loop.start(0);
  }, []);

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

  const handleNoteClick = ({ instIndex, noteIndex, noteVal }) => {
    setSequence(oldSequence => {
      const newSequence = [...oldSequence];
      newSequence[instIndex][noteIndex] = +!noteVal;
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
        {sequence.map((instrument, instIndex) => (
          <Flex>
            {instrument.map((noteVal, noteIndex) => (
              <Button
                width="3em"
                height="3em"
                m="0.5em"
                bg={noteVal ? '#08AEEA' : '#2AF598'}
                onClick={() => handleNoteClick({ instIndex, noteIndex, noteVal })}
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

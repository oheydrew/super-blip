import React, { useState } from 'react';
import Tone from 'tone';
import { Flex } from 'rebass';

import { MainLayout } from 'layouts';
import { Button } from 'components/primitives';

const Root = () => {
  const [toneStarted, setToneStarted] = useState(false);

  const handleStartButton = async (event) => {
    const synth = new Tone.MembraneSynth().toMaster();

    const loop = new Tone.Loop((time) => {
      //triggered every eighth note.
      console.log('Time:', time);
      synth.triggerAttackRelease('C2', '2n');
    }, '2n').start(0);

    if (!toneStarted) {
      await Tone.Transport.start();
      setToneStarted(true);
    } else {
      await Tone.Transport.stop();
      setToneStarted(false);
    }

    console.log(toneStarted);
  };

  return (
    <MainLayout>
      <Flex width={1} p="8px" justifyContent="center">
        Hello, there!
      </Flex>

      <Flex width={1} p="8px" justifyContent="center">
        <Button bg={!toneStarted ? '#08AEEA' : '#2AF598'} onClick={handleStartButton}>
          {!toneStarted ? "Let's Do This" : 'Yeeeah!'}
        </Button>
      </Flex>

      <Flex width={1}></Flex>
    </MainLayout>
  );
};

export { Root };

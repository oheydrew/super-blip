import React, { useState, useEffect } from 'react';
import Tone from 'tone';
import { Flex } from 'rebass';

import { MainLayout } from 'layouts';
import { Button, Slider } from 'components/primitives';

const synth = new Tone.MembraneSynth().toMaster();
const loop = new Tone.Loop(time => {
  //triggered every eighth note.
  console.log('Time:', time);
  synth.triggerAttackRelease('C2', '2n');
}, '2n');

const Root = () => {
  const [transport, setTransport] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.11);
  const [masterMute, setMasterMute] = useState(false);

  const { Master, Transport } = Tone;

  useEffect(() => {
    loop.start(0);
  }, []);

  useEffect(() => {
    console.log({ transport });
    if (!transport) {
      Transport.stop();
    } else if (transport) {
      Transport.start();
    }
  }, [transport]);

  useEffect(() => {
    Master.mute = masterMute;
  }, [masterMute]);

  useEffect(() => {
    console.log({ masterVolume });
    Master.volume.value = masterVolume;
  }, [masterVolume]);

  const handleStartButton = async () => {
    setTransport(transport => !transport);
  };

  const handleMuteButton = () => setMasterMute(mute => !mute);
  const handleVolumeChange = e => setMasterVolume(e.target.value);

  return (
    <MainLayout>
      <Flex width={1} m="0.5em" justifyContent="center">
        Hello, there!
      </Flex>

      <Button m="0.5em" id="toneStart" bg={!transport ? '#08AEEA' : '#2AF598'} onClick={handleStartButton}>
        {!transport ? "Let's Do This" : 'Yeeeah Blips!'}
      </Button>

      <Button m="0.5em" id="masterMute" bg={!masterMute ? '#08AEEA' : '#2AF598'} onClick={handleMuteButton}>
        {!masterMute ? 'Unmuted' : 'Muted'}
      </Button>

      <Flex width={1 / 8} m="0.5em" justifyContent="center">
        <Slider min="-80" max="0" step={3} onChange={handleVolumeChange}></Slider>
      </Flex>

      <Flex width={1}></Flex>
    </MainLayout>
  );
};

export { Root };

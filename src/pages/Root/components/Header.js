import React, { useState } from 'react';
import { Box, Flex } from 'rebass';
import { Button, Fader } from 'components';

const Header = ({ handlePlayToggle, playing, masterVolume, setMasterVolume }) => {
  const [showVol, setShowVol] = useState(false);

  return (
    <Flex width={1} justifyContent="center" alignItems="center">
      <Box sx={{ transition: 'all .25s', opacity: showVol ? 0.5 : 0, p: '0.5em' }}>{masterVolume}</Box>

      <Fader
        width={[5 / 8, 2 / 16]}
        m="0.5em"
        min="-50"
        max="6"
        step={1}
        value={masterVolume}
        onChange={({ target: { value } }) => (value < -49 ? setMasterVolume('-99') : setMasterVolume(value))}
        onDoubleClick={() => setMasterVolume(0)}
        onMouseEnter={() => setShowVol(true)}
        onMouseLeave={() => setShowVol(false)}
        onTouchStart={() => setShowVol(true)}
        onTouchEnd={() => setShowVol(false)}
      />

      <Button m="0.5em" id="masterMute" bg={playing ? '#e67ad4' : '#2AF598'} onClick={handlePlayToggle}>
        {playing ? 'Make It Stop!' : 'Blip?'}
      </Button>
    </Flex>
  );
};

export { Header };

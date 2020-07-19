import React from 'react';
import { Flex } from 'rebass';

import { useTone } from 'audio/contexts/ToneContext';
import { Button, Fader } from 'components';

const Header = ({ handlePlayToggle, playing }) => {
  const { Master } = useTone();

  return (
    <Flex width={1} justifyContent="center" alignItems="center">
      <Fader width={[5 / 8, 2 / 16]} label="vol" toneJsProperty={Master.volume} />

      <Button m="0.5em" id="masterMute" bg={playing ? '#e67ad4' : '#2AF598'} onClick={handlePlayToggle}>
        {playing ? 'Make It Stop!' : 'Blip?'}
      </Button>
    </Flex>
  );
};

export { Header };

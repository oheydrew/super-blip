import React from 'react';
import { Flex } from 'rebass';

import { Master } from 'tone';
import { Button, ToneFader } from 'components';

const Header = ({ handlePlayToggle, playing }) => {
  return (
    <Flex width={1} justifyContent="center" alignItems="center">
      <ToneFader width={[5 / 8, 2 / 16]} label="vol" instrument={Master} property="volume" />

      <Button m="0.5em" id="masterMute" bg={playing ? '#e67ad4' : '#2AF598'} onClick={handlePlayToggle}>
        {playing ? 'Make It Stop!' : 'Blip?'}
      </Button>
    </Flex>
  );
};

export { Header };

import React from 'react';
import { Flex } from 'rebass';
import { Button } from 'components/primitives';

const Header = ({ masterMute, setMasterMute }) => (
  <Flex width={1} justifyContent="flex-end">
    <Button
      m="0.5em"
      id="masterMute"
      bg={masterMute ? '#e67ad4' : '#08AEEA'}
      onClick={() => setMasterMute(mute => !mute)}
    >
      {masterMute ? 'Muted' : 'Shh!'}
    </Button>
  </Flex>
);

export { Header };

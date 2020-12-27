import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const NoteButton = props => (
  <StyledButton
    width={['1.5em', '3em', '3em', '3em']}
    height={['1.5em', '3em', '3em', '3em']}
    m={['0.1em', '0.3em']}
    {...props}
  />
);

export { NoteButton };

const StyledButton = styled(Button)`
  padding: 0;
`;

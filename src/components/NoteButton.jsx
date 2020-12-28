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
  background: ${({ noteVal, noteColor, blankColor }) => (noteVal ? noteColor : blankColor)};
  opacity: ${({ noteActive }) => (noteActive ? 1 : 0.5)};
  &:hover {
    background: #e67ad4;
    opacity: 1;
  }
`;

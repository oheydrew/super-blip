import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const NoteButton = props => <StyledButton {...props} />;

export { NoteButton };

const StyledButton = styled(Button)`
  width: 4vw;
  height: 4vw;
  padding: 0;
  margin: 0.3em;
`;

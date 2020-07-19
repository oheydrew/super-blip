import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const NoteButton = props => <StyledButton {...props} />;

export { NoteButton };

const StyledButton = styled(Button)`
  width: 5vw;
  height: 5vw;
  padding: 0;
  margin: 0;
`;

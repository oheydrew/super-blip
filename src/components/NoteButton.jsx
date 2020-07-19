import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const NoteButton = props => <StyledButton width={['8vw', '4vw']} height={['8vw', '4vw']} {...props} />;

export { NoteButton };

const StyledButton = styled(Button)`
  padding: 0;
  margin: 0.3em;
`;

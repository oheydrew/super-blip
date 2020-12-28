import React from 'react';
import styled from 'styled-components';
import { Button as RebassButton } from 'rebass';

const Button = props => <StyledButton {...props} />;

export { Button };

const StyledButton = styled(RebassButton)`
  color: #111;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 10em;
  transition: all 0.13s;
  transition-timing-function: ease-in-out;
  outline: none;
  &:hover {
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(0, 0, 0, 0.25);
    transition: all 0.13s;
    transitiontimingfunction: 'ease-in-out';
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
  }
`;

import React from 'react';
import { Button as RebassButton } from 'rebass';

const Button = (props) => (
  <RebassButton
    {...props}
    sx={{
      color: 'black',
      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      transition: 'all .13s',
      transitionTimingFunction: 'ease-in-out',
      outline: 'none',
      '&:hover': {
        boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.25)'
      },
      '&:active': {
        backgroundColor: 'rgba(0,0,0,0.15)',
        boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.25)'
      }
    }}
  />
);

export { Button };

import React from 'react';
import { Slider as RebassSlider } from '@rebass/forms';

const Slider = (props) => (
  <RebassSlider
    {...props}
    sx={{
      color: '#111',
      boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.01)',
      border: '1px solid rgba(0,0,0,0)',
      transition: 'all .13s',
      transitionTimingFunction: 'ease-in-out',
      outline: 'none',
      '&:hover': {
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.25)',
        border: '1px solid rgba(0,0,0,0.25)',
        transition: 'all .13s',
        transitionTimingFunction: 'ease-in-out'
      },
      '&:active': {
        backgroundColor: 'rgba(0,0,0,0.15)',
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.25)'
      }
    }}
  />
);

export { Slider };

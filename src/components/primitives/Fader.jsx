import { Slider as RebassSlider } from '@rebass/forms';
import React from 'react';
import styled from 'styled-components';

const Fader = props => (
  <RebassSlider
    {...props}
    sx={{
      // General Styles
      height: '.5em',
      boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.01)',
      border: '1px solid rgba(0,0,0,0)',
      transition: 'all .13s',
      transitionTimingFunction: 'ease-in-out',
      outline: 'none',
      cursor: 'auto',
      background: 'rgba(0,0,0,0.25)',
      // Thumb Button Specific
      '&::-webkit-slider-thumb': {
        width: '.5em',
        height: '1.75em',
        background: '#08AEEA',
        border: '1px solid rgba(0,0,0,0.25)',
        borderRadius: '0.5em',
        cursor: 'pointer',
        '&:hover': {
          background: '#2AF598',
          border: '1px solid rgba(0,0,0,0.25)',
          transition: 'all .13s',
          transitionTimingFunction: 'ease-in-out'
        }
      }
    }}
  />
);

export { Fader };

// .slider {
//   -webkit-appearance: none;
//   width: 100%;
//   height: 25px;
//   background: #d3d3d3;
//   outline: none;
//   opacity: 0.7;
//   -webkit-transition: .2s;
//   transition: opacity .2s;
// }

// .slider:hover {
//   opacity: 1;
// }

// .slider::-webkit-slider-thumb {
//   -webkit-appearance: none;
//   appearance: none;
//   width: 25px;
//   height: 25px;
//   background: #4CAF50;
//   cursor: pointer;
// }

// .slider::-moz-range-thumb {
//   width: 25px;
//   height: 25px;
//   background: #4CAF50;
//   cursor: pointer;

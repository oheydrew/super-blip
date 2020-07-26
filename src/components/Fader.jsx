import React from 'react';
import { Slider as RebassSlider } from '@rebass/forms';

const Fader = props => {
  return (
    <RebassSlider
      width={[1 / 6, 1 / 8]}
      min="-50"
      max="6"
      step={1}
      sx={{
        // General Styles
        height: '0.5em',
        margin: '0.5em',
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.01)',
        border: '1px solid rgba(0,0,0,0)',
        transition: 'all .13s',
        transitionTimingFunction: 'ease-in-out',
        outline: 'none',
        cursor: 'auto',
        background: 'rgba(0,0,0,0.25)',
        // Thumb Button Specific
        '&::-webkit-slider-thumb': {
          width: ['1.5em', '1em'],
          height: '1.75em',
          background: '#2AF598',
          border: '1px solid rgba(0,0,0,0)',
          borderRadius: '0.2em',
          cursor: 'pointer',
          '&:hover': {
            background: '#08AEEA',
            border: '1px solid rgba(0,0,0,0.25)',
            transition: 'all .13s',
            transitionTimingFunction: 'ease-in-out',
          },
        },
      }}
      {...props}
    />
  );
};

export { Fader };

import React, { useState, useEffect } from 'react';
import { Slider as RebassSlider } from '@rebass/forms';
import { Box } from 'rebass';

const Fader = ({ toneJsProperty, reactState, onChange, label, ...props }) => {
  const [localValue, setLocalValue] = useState(
    toneJsProperty ? toneJsProperty.value : reactState ? reactState : 0
  );
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (!reactState) {
      return;
    }
    onChange(localValue);
  }, [localValue, onChange, reactState]);

  if (toneJsProperty && reactState) {
    throw new Error("Don't mix Tone & React State!");
  }

  if (toneJsProperty) {
    toneJsProperty.value = localValue;
  }

  const onLocalChange = ({ target: { value } }) => (value < -49 ? setLocalValue(-99) : setLocalValue(value));

  return (
    <>
      <Box sx={{ transition: 'all .25s', opacity: showLabel ? 0.5 : 0, p: '0.5em' }}>{label}</Box>
      <RebassSlider
        width={[1 / 6, 1 / 8]}
        value={localValue}
        onChange={onLocalChange}
        min="-50"
        max="6"
        step={1}
        onDoubleClick={() => setLocalValue(0)}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        onTouchStart={() => setShowLabel(true)}
        onTouchEnd={() => setShowLabel(false)}
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
    </>
  );
};

export { Fader };

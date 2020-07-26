import React, { useState, useEffect } from 'react';
import { Box } from 'rebass';

import { Fader } from './Fader';

const ToneFader = ({ label, instrument, property, ...props }) => {
  const [localValue, setLocalValue] = useState(instrument.get(property)[property] || 0);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    instrument.set({ [property]: localValue });
  }, [instrument, property, localValue]);

  const onLocalChange = ({ target: { value } }) => {
    const flatValue = property === 'volume' ? (value < -49 ? -99 : value) : value;
    return setLocalValue(flatValue);
  };

  return (
    <>
      <Box sx={{ fontSize: 16, transition: 'all .25s', opacity: showLabel ? 0.5 : 0, p: '0.25em' }}>
        {label}
      </Box>
      <Fader
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
        {...props}
      />
      <Box sx={{ fontSize: 16, transition: 'all .25s', opacity: showLabel ? 0.5 : 0, p: '0.25em' }}>
        {parseFloat(localValue).toFixed(2)}
      </Box>
    </>
  );
};

export { ToneFader };

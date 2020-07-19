import React, { useState } from 'react';
import chroma from 'chroma-js';
import { Flex } from 'rebass';

import { NoteButton, Button, Fader } from 'components';

const Channel = ({
  channel,
  setChannels,
  channelIndex,
  instrument,
  handleNoteClick,
  totalChannels,
  playHeadPosition,
  ...props
}) => {
  const [showControls, setShowControls] = useState(false);

  const noteColors = chroma.scale(['#E67AD5', '#FFD639']).mode('lab').colors(totalChannels);
  const blankColors = chroma.scale(['#2AF598', '#08AEEA']).mode('lab').colors(totalChannels);

  return (
    <Flex key={`channel${channelIndex}`} justifyContent="center" flexWrap="wrap" {...props}>
      <Flex alignItems="center">
        <Flex width={1} flexWrap="wrap">
          <Flex width={[1, 1 / 2]} justifyContent="center">
            {channel.arrangement.map(
              (noteVal, noteIndex) =>
                noteIndex < 8 && (
                  <NoteButton
                    key={`note${noteIndex}`}
                    onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
                    sx={{
                      background: noteVal ? noteColors[channelIndex] : blankColors[channelIndex],
                      opacity: playHeadPosition === noteIndex ? 1 : 0.5,
                    }}
                  />
                )
            )}
          </Flex>

          <Flex width={[1, 1 / 2]} justifyContent="center">
            {channel.arrangement.map(
              (noteVal, noteIndex) =>
                noteIndex >= 8 && (
                  <NoteButton
                    key={`note${noteIndex}`}
                    onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
                    sx={{
                      background: noteVal ? noteColors[channelIndex] : blankColors[channelIndex],
                      opacity: playHeadPosition === noteIndex ? 1 : 0.5,
                    }}
                  />
                )
            )}
          </Flex>
        </Flex>

        <Button
          ml=".5em"
          bg={showControls ? '#2AF598' : '#08AEEA'}
          onClick={() => setShowControls(sc => !sc)}
        >
          ...
        </Button>
      </Flex>

      {showControls && (
        <Flex width={[1, 6 / 8]} justifyContent="flex-end" alignItems="center" height="30px">
          {instrument.engineType === 'Synth' && (
            <Fader label="freq" min="20" max="1000" step={12} toneJsProperty={instrument.engine.frequency} />
          )}
          <Fader label="vol" toneJsProperty={instrument.engine.volume} />
        </Flex>
      )}
    </Flex>
  );
};

export { Channel };

import React, { useState } from 'react';
import { useTone } from 'audio/contexts/ToneContext';
import chroma from 'chroma-js';
import { Flex } from 'rebass';

import { NoteButton, Button, ToneFader } from 'components';

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
  const Tone = useTone();

  const [showControls, setShowControls] = useState(false);

  const noteColors = chroma.scale(['#E67AD5', '#FFD639']).mode('lab').colors(totalChannels);
  const blankColors = chroma.scale(['#2AF598', '#08AEEA']).mode('lab').colors(totalChannels);

  console.log('playhead@note', playHeadPosition);

  return (
    <Flex key={`channel${channelIndex}`} justifyContent="center" flexWrap="wrap" {...props}>
      <Flex alignItems="center">
        <Flex
          width={['14em', '30em', '30em', '60em']}
          minWidth="14em"
          justifyContent="center"
          flexWrap="wrap"
        >
          {channel.arrangement.map((noteVal, noteIndex) => (
            <NoteButton
              key={`note${noteIndex}`}
              onClick={() => handleNoteClick({ channelIndex, noteIndex, noteVal })}
              sx={{
                background: noteVal ? noteColors[channelIndex] : blankColors[channelIndex],
                opacity: playHeadPosition === noteIndex ? 1 : 0.5,
              }}
            />
          ))}
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
        <Flex width={[1, 7 / 8]} justifyContent="flex-end" alignItems="center" height="30px">
          <ToneFader
            width={[1 / 12, 1 / 16]}
            label="Atk"
            instrument={instrument.envelope}
            property="attack"
            min="0.001"
            max="2"
            step={0.01}
          />
          <ToneFader
            width={[1 / 12, 1 / 16]}
            label="Dcy"
            instrument={instrument.envelope}
            property="decay"
            min="0"
            max="2"
            step={0.01}
          />
          <ToneFader
            width={[1 / 12, 1 / 16]}
            label="Sus"
            instrument={instrument.envelope}
            property="sustain"
            min="0"
            max="2"
            step={0.01}
          />
          <ToneFader
            width={[1 / 12, 1 / 16]}
            label="Rel"
            instrument={instrument.envelope}
            property="release"
            min="0"
            max="2"
            step={0.01}
          />

          {!(instrument instanceof Tone.MembraneSynth) && (
            <ToneFader
              width={[1 / 12, 1 / 16]}
              label="freq"
              min="20"
              max="1000"
              step={12}
              instrument={instrument}
              property="frequency"
            />
          )}

          <ToneFader label="vol" instrument={instrument} property="volume" />
        </Flex>
      )}
    </Flex>
  );
};

export { Channel };

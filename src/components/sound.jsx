import React from 'react';

const Sound = () => {
  return (
    <audio volume="0.5" src="./sound/alert.mp3" autoPlay>
      It looks like your browser doesn't support audio playback through html...
    </audio>
  );
};

export default Sound;

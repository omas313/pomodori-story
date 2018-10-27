import React from 'react';

function getTimeString({ min, sec }) {
  const m = min < 10 ? `0${min}` : min;
  const s = sec < 10 ? `0${sec}` : sec;
  return `${m} : ${s}`;
}

const Time = ({ time, paused, onToggle }) => (
  <h3
    className={'time clickable' + (paused ? ' blink' : '')}
    onClick={onToggle}
  >
    {getTimeString(time)}
  </h3>
);

export default Time;

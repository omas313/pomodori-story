import React, { Component } from 'react';

class Time extends Component {
  getTimeString({ min, sec }) {
    const m = min < 10 ? `0${min}` : min;
    const s = sec < 10 ? `0${sec}` : sec;
    return `${m} : ${s}`;
  }

  render() {
    const { time, paused, onToggle } = this.props;

    return (
      <h3
        className={'time clickable' + (paused ? ' blink' : '')}
        onClick={onToggle}
      >
        {this.getTimeString(time)}
      </h3>
    );
  }
}

export default Time;

import React, { Component } from 'react';

class Time extends Component {
  getTimeString({ min, sec }) {
    const m = min < 10 ? `0${min}` : min;
    const s = sec < 10 ? `0${sec}` : sec;
    return `${m} : ${s}`;
  }

  render() {
    const { time, paused, working, onToggle } = this.props;

    let classes = 'time clickable';
    const blink = paused ? ' blink' : '',
      color = working ? ' working' : ' break';
    classes += blink + color;

    return (
      <h3 className={classes} onClick={onToggle}>
        {this.getTimeString(time)}
      </h3>
    );
  }
}

export default Time;

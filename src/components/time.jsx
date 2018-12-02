import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Time extends Component {
  getTimeString({ min, sec }) {
    const m = min < 10 ? `0${min}` : min;
    const s = sec < 10 ? `0${sec}` : sec;
    return `${m} : ${s}`;
  }

  render() {
    const { time, isPaused, isPomodoro, onToggle } = this.props;

    let classes = 'time clickable';
    const blink = isPaused ? ' blink' : '',
      color = isPomodoro ? ' working' : ' break';
    classes += blink + color;

    return (
      <h3 className={classes} onClick={onToggle}>
        {this.getTimeString(time)}
      </h3>
    );
  }
}

// TODO: change prop names
Time.propTypes = {
  time: PropTypes.shape({
    min: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired
  }).isRequired,
  isPomodoro: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Time;

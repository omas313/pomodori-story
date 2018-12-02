import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../models/time';

class Timer extends Component {
  state = {
    playing: false,
    time: new Time(0, 0),
    timer: null
  };

  componentDidMount() {
    this.setTime(this.props.currentSession, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSession !== this.props.currentSession)
      this.onNewSession();
  }

  setTime = (min, sec) => this.setState({ time: new Time(min, sec) });

  onNewSession = () => {
    this.setTime(this.props.currentSession, 0);
    this.startTimer();
  };

  handleTimerToggle = () => {
    const { playing } = this.state;

    if (playing) this.stopTimer();
    else this.startTimer();
  };

  handleSecondPassed = () => {
    const { time } = this.state;
    const { onTimerDone } = this.props;
    const nextTime = { ...time };

    if (time.sec === 0 && time.min === 0) {
      this.stopTimer();
      return onTimerDone();
    }

    if (time.sec === 0) {
      nextTime.min = time.min - 1;
      nextTime.sec = 59;
    } else {
      nextTime.sec = time.sec - 1;
    }

    this.setTime(nextTime.min, nextTime.sec);
  };

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({ timer: null, playing: false });
  }

  startTimer() {
    const { playing } = this.state;

    if (playing) this.stopTimer();

    this.setState({
      timer: setInterval(this.handleSecondPassed, 1000),
      playing: true
    });
  }

  render() {
    const { time, timer } = this.state;
    const { currentSession, isPomodoro } = this.props;

    const isPaused =
      !timer &&
      time.min !== currentSession &&
      (time.min !== 0 && time.sec !== 0);

    let classes = 'time clickable';
    const blink = isPaused ? ' blink' : '',
      color = isPomodoro ? ' working' : ' break';
    classes += blink + color;

    return (
      <h3 className={classes} onClick={this.handleTimerToggle}>
        {time.toString()}
      </h3>
    );
  }
}

Time.propTypes = {
  currentSession: PropTypes.number.isRequired,
  isPomodoro: PropTypes.bool.isRequired,
  onTimerDone: PropTypes.func.isRequired
};

export default Timer;

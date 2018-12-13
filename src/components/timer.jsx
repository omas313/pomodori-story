import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../models/time';
import Sound from './sound';

class Timer extends Component {
  state = {
    running: false,
    time: new Time(0, 0),
    timer: null
  };

  componentDidMount() {
    this.setTime(this.props.currentSessionValue, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSessionValue !== this.props.currentSessionValue)
      this.onNewSession();
  }

  setTime = (min, sec) => this.setState({ time: new Time(min, sec) });

  handleSecondPassed = () => {
    const { time } = this.state;
    const nextTime = { ...time };

    if (time.sec === 0 && time.min === 0) return this.timerFinished();

    if (time.sec === 0) {
      nextTime.min = time.min - 1;
      nextTime.sec = 59;
    } else {
      nextTime.sec = time.sec - 1;
    }

    this.setTime(nextTime.min, nextTime.sec);
  };

  handleTimerToggle = () => {
    const { running } = this.state;

    if (running) this.stopTimer();
    else this.startTimer();
  };

  stopTimer() {
    const { timer } = this.state;
    const { onTimerStop } = this.props;

    clearInterval(timer);
    this.setState({ timer: null, running: false });
    onTimerStop();
  }

  startTimer() {
    const { running } = this.state;
    const { onTimerStart } = this.props;

    if (running) this.stopTimer();

    this.setState({
      timer: setInterval(this.handleSecondPassed, 1000),
      running: true
    });
    onTimerStart();
  }

  onNewSession = () => {
    this.setTime(this.props.currentSessionValue, 0);
    this.startTimer();
  };

  timerFinished = () => {
    const { onTimerDone } = this.props;

    this.stopTimer();
    this.playSound();
    onTimerDone();
  };

  playSound() {
    this.setState({ playSound: true }, () => {
      setTimeout(() => this.setState({ playSound: false }), 5000);
    });
  }

  isPaused = () => {
    const { time, timer } = this.state;
    const { currentSessionValue } = this.props;

    return (
      !timer &&
      time.min !== currentSessionValue &&
      (time.min !== 0 && time.sec !== 0)
    );
  };

  render() {
    const { time, playSound } = this.state;
    const { isPomodoro } = this.props;

    let classes = 'time clickable';
    const blink = this.isPaused() ? ' blink' : '',
      color = isPomodoro ? ' working' : ' break';
    classes += blink + color;

    return (
      <React.Fragment>
        <h3 id="time" className={classes} onClick={this.handleTimerToggle}>
          {time.toString()}
        </h3>
        {playSound && <Sound />}
      </React.Fragment>
    );
  }
}

Time.propTypes = {
  currentSessionValue: PropTypes.number.isRequired,
  isPomodoro: PropTypes.bool.isRequired,
  onTimerStart: PropTypes.func.isRequired,
  onTimerStop: PropTypes.func.isRequired,
  onTimerDone: PropTypes.func.isRequired
};

export default Timer;

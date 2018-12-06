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
    const { onTimerToggle } = this.props;

    if (running) this.stopTimer();
    else this.startTimer();

    onTimerToggle(!running);
  };

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({ timer: null, running: false });
  }

  startTimer() {
    const { running } = this.state;

    if (running) this.stopTimer();

    this.setState({
      timer: setInterval(this.handleSecondPassed, 1000),
      running: true
    });
  }

  onNewSession = () => {
    this.setTime(this.props.currentSessionValue, 0);
    this.startTimer();
  };

  timerFinished = () => {
    const { onTimerDone } = this.props;

    this.stopTimer();
    console.log('playSound to true');
    this.setState({ playSound: true }, () => {
      setTimeout(() => {
        this.setState({ playSound: false });
        console.log('playSound to false');
      }, 5000);
    });
    onTimerDone();
  };

  render() {
    const { time, timer, playSound } = this.state;
    const { currentSessionValue, isPomodoro } = this.props;

    const isPaused =
      !timer &&
      time.min !== currentSessionValue &&
      (time.min !== 0 && time.sec !== 0);

    let classes = 'time clickable';
    const blink = isPaused ? ' blink' : '',
      color = isPomodoro ? ' working' : ' break';
    classes += blink + color;

    return (
      <React.Fragment>
        <h3 className={classes} onClick={this.handleTimerToggle}>
          {time.toString()}
        </h3>
        {playSound && <Sound />}
        <button onClick={() => this.setTime(0, 2)}>set</button>
      </React.Fragment>
    );
  }
}

Time.propTypes = {
  currentSessionValue: PropTypes.number.isRequired,
  isPomodoro: PropTypes.bool.isRequired,
  onTimerToggle: PropTypes.func.isRequired,
  onTimerDone: PropTypes.func.isRequired
};

export default Timer;

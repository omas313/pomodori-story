/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../models/time';
import Sound from './sound';
import Title from './../models/title';
import Session from '../models/session';
import { ThemeContext } from '../context/themeContext';

class Timer extends Component {
  state = {
    running: false,
    time: new Time(0, 0),
    timer: null,
    playSound: false,
    overtime: false
  };

  componentDidMount() {
    this.setTime(this.props.currentSessionValue, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSessionValue !== this.props.currentSessionValue)
      this.onNewSession();
  }

  setTime = (min, sec) =>
    this.setState({ time: new Time(min, sec) }, () =>
      Title.setTime(this.state.time.toString())
    );

  handleSecondPassed = () => {
    const { time, overtime } = this.state;

    if (overtime) return this.onOvertime();

    const nextTime = { ...time };

    if (time.sec === 0 && time.min === 0)
      if (Session.getOvertime())
        return this.setState({ overtime: true }, () => this.playSound());
      else return this.timerFinished();


    if (time.sec === 0) {
      nextTime.min = time.min - 1;
      nextTime.sec = 59;
    } else {
      nextTime.sec = time.sec - 1;
    }

    this.setTime(nextTime.min, nextTime.sec);
  };

  onOvertime = () => {
    const { time } = this.state;

    const nextTime = { ...time };

    if (time.sec === 59) {
      nextTime.min = time.min + 1;
      nextTime.sec = 0;
    } else {
      nextTime.sec = time.sec + 1;
    }

    this.setTime(nextTime.min, nextTime.sec);
  }

  handleTimerToggle = async () => {
    const { running, overtime } = this.state;

    if (overtime) this.setState({ overtime: false }, () => {
      this.props.onOvertimeDone(this.state.time.totalSeconds);
      this.timerFinished();
    });

    if (running) await this.stopTimer();
    else await this.startTimer();

    Title.setState(this.isPaused());
  };

  async stopTimer() {
    const { timer } = this.state;
    const { onTimerStop } = this.props;

    clearInterval(timer);
    await this.setState({ timer: null, running: false });
    onTimerStop();
  }

  async startTimer() {
    const { running } = this.state;
    const { onTimerStart } = this.props;

    if (running) await this.stopTimer();

    await this.setState({
      timer: setInterval(this.handleSecondPassed, 1000),
      running: true
    });
    onTimerStart();
  }

  onNewSession = () => {
    const { currentSessionValue, startOnChange } = this.props;

    this.setTime(currentSessionValue, 0);
    if (startOnChange) this.startTimer();
  };

  timerFinished = () => {
    const { onTimerDone } = this.props;

    this.stopTimer();
    if (!Session.getOvertime()) this.playSound();
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
    const { time, playSound, overtime } = this.state;
    const { isPomodoro } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          const baseStyles = css`
            margin: 1rem 1rem 2rem 1rem;
            text-align: center;
            font-size: 3rem;
            transition: color 1s;
            cursor: pointer;
            color: ${isPomodoro ? theme.primary : theme.secondary};

            @media (max-width: 575.98px) {
              font-size: 3rem !important;
            }
            @media(max-width: 991.98px) {
              font-size: 4rem;
            }
            @media (min-width: 1200px) {
              font-size: 4.5rem;
            }
          `;
          const blink = css`
            animation: blink 2s ease-in-out 0s infinite;
            -webkit-animation: blink 2s ease-in-out 0s infinite;
          `;
          const styles = [this.isPaused() ? blink : null, baseStyles];

          return (
            <React.Fragment>
              <h3 id="time" css={styles} onClick={this.handleTimerToggle}>
                {overtime ? `+${time.toString()}` : time.toString()}
              </h3>
              <Sound play={playSound} />
            </React.Fragment>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

Timer.propTypes = {
  currentSessionValue: PropTypes.number.isRequired,
  isPomodoro: PropTypes.bool.isRequired,
  startOnChange: PropTypes.bool.isRequired,
  onTimerStart: PropTypes.func.isRequired,
  onTimerStop: PropTypes.func.isRequired,
  onTimerDone: PropTypes.func.isRequired,
  onOvertimeDone: PropTypes.func.isRequired
};

export default Timer;

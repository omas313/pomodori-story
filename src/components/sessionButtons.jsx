import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SessionButtons extends Component {
  isActive = session => this.props.currentSession === session;

  render() {
    const {
      session,
      onPomodoroClick,
      onShortBreakClick,
      onLongBreakClick
    } = this.props;

    return (
      <div className="session-buttons">
        <Button
          className={
            'pomodoro-button' +
            (this.isActive(session.POMODORO) ? ' working' : '')
          }
          onClick={onPomodoroClick}
        >
          <img
            src="./img/pomodoro.png"
            alt="pomodoro"
            className="session-button-img"
          />
        </Button>
        <Button
          className={
            'break-button' +
            (this.isActive(session.SHORT_BREAK) ? ' break' : '')
          }
          onClick={onShortBreakClick}
        >
          <img
            src="./img/time-5.png"
            alt="Short break"
            className="session-button-img"
          />
        </Button>
        <Button
          className={
            'break-button' + (this.isActive(session.LONG_BREAK) ? ' break' : '')
          }
          onClick={onLongBreakClick}
        >
          <img
            src="./img/time-10.png"
            alt="Long break"
            className="session-button-img"
          />
        </Button>
      </div>
    );
  }
}

export default SessionButtons;

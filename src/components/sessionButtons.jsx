import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SessionButtons extends Component {
  isActive = session => (this.props.currentSession === session ? 'active' : '');

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
          className={this.isActive(session.POMODORO)}
          onClick={onPomodoroClick}
        >
          <img
            src="./img/pomodoro.png"
            alt="pomodoro"
            className="session-button-img"
          />
        </Button>
        <Button
          className={this.isActive(session.SHORT_BREAK)}
          onClick={onShortBreakClick}
        >
          <img
            src="./img/time-5.png"
            alt="Short break"
            className="session-button-img"
          />
        </Button>
        <Button
          className={this.isActive(session.LONG_BREAK)}
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

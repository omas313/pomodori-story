import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Session from '../models/session';

class SessionButtons extends Component {
  isActive = sess => this.props.currentSession === sess;

  getButtonClasses = sess => {
    const pomodoro = sess === Session.POMODORO;

    let classes = pomodoro ? 'pomodoro-button' : 'break-button';
    if (this.isActive(sess)) classes += pomodoro ? ' working' : ' break';

    return classes;
  };

  render() {
    const { onButtonClick } = this.props;

    return (
      <div className="session-buttons">
        <Button
          id="pomodoro-session-button"
          className={this.getButtonClasses(Session.POMODORO)}
          onClick={() => onButtonClick(Session.POMODORO)}
        >
          <img
            src="./img/pomodoro.png"
            alt="pomodoro"
            className="session-button-img"
          />
        </Button>
        <Button
          id="short-break-session-button"
          className={this.getButtonClasses(Session.SHORT_BREAK)}
          onClick={() => onButtonClick(Session.SHORT_BREAK)}
        >
          <img
            src="./img/time-5.png"
            alt="Short break"
            className="session-button-img"
          />
        </Button>
        <Button
          id="long-break-session-button"
          className={this.getButtonClasses(Session.LONG_BREAK)}
          onClick={() => onButtonClick(Session.LONG_BREAK)}
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

SessionButtons.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default SessionButtons;

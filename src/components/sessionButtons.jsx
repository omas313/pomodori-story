import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class SessionButtons extends Component {
  isActive = sess => this.props.currentSession === sess;

  getButtonClasses = sess => {
    const { session } = this.props;
    const pomodoro = sess === session.POMODORO;

    let classes = pomodoro ? 'pomodoro-button' : 'break-button';
    if (this.isActive(sess)) classes += pomodoro ? ' working' : ' break';

    return classes;
  };

  render() {
    const { session, onButtonClick } = this.props;

    return (
      <div className="session-buttons">
        <Button
          id="pomodoro-session-button"
          className={this.getButtonClasses(session.POMODORO)}
          onClick={() => onButtonClick(session.POMODORO)}
        >
          <img
            src="./img/pomodoro.png"
            alt="pomodoro"
            className="session-button-img"
          />
        </Button>
        <Button
          id="short-break-session-button"
          className={this.getButtonClasses(session.SHORT_BREAK)}
          onClick={() => onButtonClick(session.SHORT_BREAK)}
        >
          <img
            src="./img/time-5.png"
            alt="Short break"
            className="session-button-img"
          />
        </Button>
        <Button
          id="long-break-session-button"
          className={this.getButtonClasses(session.LONG_BREAK)}
          onClick={() => onButtonClick(session.LONG_BREAK)}
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
  session: PropTypes.objectOf(PropTypes.number).isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default SessionButtons;

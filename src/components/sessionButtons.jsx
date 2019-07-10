/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Session from '../models/session';
import { ThemeContext } from '../context/themeContext';

class SessionButtons extends Component {
  isActive = sess => this.props.currentSession === sess;

  render() {
    const { onButtonClick } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme, _ }) => {
          const baseStyles = css`
            text-align: center;
            
            button {
              color: ${theme.light} !important;
              width: 70px;
              height: 70px;
              margin: 3px;
            }
      
            button img {
              width: 30px;
              max-height: 35px;
            }
          `;
          const pomodoroButtonStyles = css`
            background-color: ${this.isActive(Session.POMODORO) ? theme.primary : theme.primaryDarker} !important;
            border-color: ${this.isActive(Session.POMODORO) ? theme.primary : theme.primaryDarker} !important;

            &:hover {
              background-color: ${theme.primary} !important;
              border-color: ${theme.primary} !important;
            }
          `;
          const breakButtonStyles = sess => {
            return css`
              background-color: ${this.isActive(sess) ? theme.secondary : theme.secondaryDarker} !important;
              border-color: ${this.isActive(sess) ? theme.secondary : theme.secondaryDarker} !important;

              &:hover {
                background-color: ${theme.secondary} !important;
                border-color: ${theme.secondary} !important;
              }
            `;
          }

          return (
            <div css={baseStyles}>
              <Button
                css={pomodoroButtonStyles}
                id="pomodoro-button"
                onClick={() => onButtonClick(Session.POMODORO)}
              >
                <img
                  src="./img/pomodoro.png"
                  alt="pomodoro"
                  className="session-button-img"
                />
              </Button>
              <Button
                css={breakButtonStyles(Session.SHORT_BREAK)}
                className="break-button"
                onClick={() => onButtonClick(Session.SHORT_BREAK)}
              >
                <img
                  src="./img/time-5.png"
                  alt="Short break"
                  className="session-button-img"
                />
              </Button>
              <Button
                css={breakButtonStyles(Session.LONG_BREAK)}
                className="break-button"
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
        }}
      </ThemeContext.Consumer>
    );
  }
}

SessionButtons.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default SessionButtons;

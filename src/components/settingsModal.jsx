/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import RangeInput from './rangeInput';
import Session from './../models/session';
import Checkbox from './checkbox';
import { ThemeContext, themes } from '../context/themeContext';
import settingsService from '../services/settingsService';

class SettingsModal extends Component {
  state = {
    timers: {
      pomodoro: 0,
      shortBreak: 0,
      longBreak: 0
    },
    overtime: false,
    darkMode: false
  };

  componentDidMount() {
    this.setState({
      timers: Session.getTimers(),
      overtime: Session.getOvertime(),
      darkMode: Session.getDarkMode()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen && !this.props.isOpen) this.save();
  }

  handleTimerChange = (name, value) => {
    const timers = { ...this.state.timers };
    timers[name] = value;
    this.setState({ timers });
  };

  handleOvertimeChange = value => {
    this.setState({ overtime: value });
  };

  handleToggleTheme = (value, toggle) => {
    this.setState({ darkMode: value });
    toggle()
  };

  save() {
    const { timers, overtime, darkMode } = this.state;

    if (!Session.validTimers(timers)) return;

    Session.setTimers(timers);
    Session.setOvertime(overtime);
    Session.setDarkMode(darkMode);
    settingsService.saveTimers(timers);
    settingsService.setOvertime(overtime);
    settingsService.setDarkMode(darkMode);
  }

  render() {
    const { timers, overtime } = this.state;
    const { isOpen, onToggle } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          const modalStyles = css`
            .modal-header {
              background-color: ${theme.primary};
              border: none;
            }
            .modal-content {
              background-color: ${theme.background};
              color: ${theme.foreground}
            }
            button span {
              color: ${theme.foreground}
            }
          `;

          const submitButtonStyles = css`
            background-color: ${theme.primary}
          `;

          return (
            <Modal isOpen={isOpen} toggle={onToggle} css={modalStyles}>
              <ModalHeader toggle={onToggle}>Settings</ModalHeader>
              <ModalBody>
                <div className="mb-3">
                  <strong>Timer Durations</strong>
                </div>
                <RangeInput
                  name="pomodoro"
                  label="Pomodoro"
                  min={Session.TIMER_MIN}
                  max={Session.TIMER_MAX}
                  default={timers.pomodoro}
                  onChange={this.handleTimerChange}
                />
                <RangeInput
                  name="shortBreak"
                  label="Short Break"
                  min={Session.TIMER_MIN}
                  max={Session.TIMER_MAX}
                  default={timers.shortBreak}
                  onChange={this.handleTimerChange}
                />
                <RangeInput
                  name="longBreak"
                  label="Long Break"
                  min={Session.TIMER_MIN}
                  max={Session.TIMER_MAX}
                  default={timers.longBreak}
                  onChange={this.handleTimerChange}
                />
                <Checkbox
                  label="Overtime"
                  default={overtime}
                  onChange={this.handleOvertimeChange}
                />
                <Checkbox
                  label="Dark theme"
                  default={theme === themes.dark}
                  onChange={value => this.handleToggleTheme(value, toggleTheme)}
                />
                <div style={{ textAlignLast: 'right' }}>
                  <Button
                    css={submitButtonStyles}
                    id="settings-submit-button"
                    color="danger"
                    onClick={onToggle}
                  >
                    Submit
            </Button>
                </div>
              </ModalBody>
            </Modal>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default SettingsModal;

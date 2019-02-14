import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import RangeInput from './rangeInput';
import Session from './../models/session';
import settingsService from '../services/settingsService';

class SettingsModal extends Component {
  state = {
    timers: {
      pomodoro: 0,
      shortBreak: 0,
      longBreak: 0
    }
  };

  componentDidMount() {
    this.setState({ timers: Session.getTimers() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen && !this.props.isOpen) this.save();
  }

  handleTimerChange = (name, value) => {
    const timers = { ...this.state.timers };
    timers[name] = value;
    this.setState({ timers });
  };

  save() {
    const { timers } = this.state;

    if (!Session.validTimers(timers)) return;

    Session.setTimers(timers);
    settingsService.saveTimers(timers);
  }

  render() {
    const { timers } = this.state;
    const { isOpen, onToggle } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={onToggle} className="settings-modal">
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
          <div className="settings-submit-button-container">
            <Button
              id="settings-submit-button"
              className="action-button"
              color="danger"
              onClick={onToggle}
            >
              Submit
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default SettingsModal;

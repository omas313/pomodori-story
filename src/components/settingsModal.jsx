import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen && !this.props.isOpen) this.save();
  }

  handleTimerChange = (name, value) => {
    const timers = { ...this.state.timers };
    timers[name] = value;
    this.setState({ timers });
  };

  save() {
    Session.setTimers(this.state.timers);
    settingsService.saveTimers(Session.getTimers());
  }

  render() {
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
            default={Session.POMODORO}
            onChange={this.handleTimerChange}
          />
          <RangeInput
            name="shortBreak"
            label="Short Break"
            default={Session.SHORT_BREAK}
            onChange={this.handleTimerChange}
          />
          <RangeInput
            name="longBreak"
            label="Long Break"
            default={Session.LONG_BREAK}
            onChange={this.handleTimerChange}
          />
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

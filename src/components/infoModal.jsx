import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const InfoModal = ({ isOpen, onToggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={onToggle} className="info-modal">
      <ModalHeader toggle={onToggle}>Info</ModalHeader>
      <ModalBody>
        <h5>Pomodoro, pomodori?</h5>
        <p>It is the Italian word for tomato, and the plural is pomodori.</p>

        <h5>What is this website?</h5>
        <p>
          It is a timer web application I developed to implement the Pomodoro
          Technique which also includes helpful task tracking.
        </p>

        <h5>The Pomodoro Technique</h5>
        <p>
          It is a time-management and productivity booster technique created by
          Francesco Cirillo.
          <br />
          It can help size up tasks and maintain focus throughout your work by
          diving it into time chunks.
          <br />
          You can read more about it{' '}
          <a
            href="https://francescocirillo.com/pages/pomodoro-technique"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </ModalBody>
    </Modal>
  );
};

InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InfoModal;

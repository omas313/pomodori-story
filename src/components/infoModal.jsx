/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ThemeContext } from '../context/themeContext';

const InfoModal = ({ isOpen, onToggle }) => {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        const modalStyles = css`
          max-height: 80vh !important;
          max-width: 80vw !important;
          background-color: ${theme.background} !important;
          margin: 0.5rem auto;

          a {
            color: ${theme.primary} !important;
            text-decoration: none;
          }
          a:hover {
            color: ${theme.secondary} !important;
            text-decoration: none;
          }
          .modal-header {
            background-color: ${theme.primary};
            border: none;
          }
          .modal-content {
            background-color: ${theme.background};
            color: ${theme.foreground};
            border: none;
            border-radius: 0;
            outline: none;
          }
          button span {
            color: ${theme.foreground}
          }
        `;

        return (
          <Modal css={modalStyles} isOpen={isOpen} toggle={onToggle} className="info-modal">
            <ModalHeader toggle={onToggle}>Info</ModalHeader>
            <ModalBody>
              <h5>Pomodoro, pomodori?</h5>
              <p>Pomodoro is the Italian word for tomato, and the plural is pomodori.</p>

              <h5>What is this website?</h5>
              <p>
                It is a timer web application I developed to implement the Pomodoro
                Technique.
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
      }}
    </ThemeContext.Consumer>
  );
};

InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InfoModal;

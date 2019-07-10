/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { ThemeContext } from '../context/themeContext';

const Summary = ({ taskCount, pomodoroCount, overtime, showOvertime }) => (
  <ThemeContext.Consumer>
    {({ theme, _ }) => {
      const styles = css`
      border-top: 1px solid ${theme.foreground};
      border-bottom: 1px solid ${theme.foreground};
      padding: 0.6rem;
      margin: 1rem 0 !important;
    `;
      return (
        <div css={styles}>
          <Row>
            <Col className="text-center">
              <p className="text-bold">Tasks</p>
              <p id="summary-task-count">{taskCount}</p>
            </Col>
            <Col className="text-center">
              <p className="text-bold">Pomodori</p>
              <p id="summary-pomodoro-count">{pomodoroCount}</p>
            </Col>
          </Row>
          {showOvertime && (
            <Row>
              <Col className="text-center">
                <p className="text-bold">Overtime (P)</p>
                <p id="summary-overtime-pomodoro">{overtime.pomodori}</p>
              </Col>
              <Col className="text-center">
                <p className="text-bold">Overtime (B)</p>
                <p id="summary-overtime-breaks">{overtime.breaks}</p>
              </Col>
            </Row>
          )}
        </div>
      );
    }}
  </ThemeContext.Consumer>
);


Summary.propTypes = {
  taskCount: PropTypes.number.isRequired,
  pomodoroCount: PropTypes.number.isRequired,
  overtime: PropTypes.object.isRequired,
  showOvertime: PropTypes.bool.isRequired
};

export default Summary;

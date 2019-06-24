import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Summary = ({ taskCount, pomodoroCount, overtime, showOvertime }) => {
  return (
    <Row className="summary">
      <Col className="text-center">
        <p className="text-bold">Tasks</p>
        <p id="summary-task-count">{taskCount}</p>
      </Col>
      <Col className="text-center">
        <p className="text-bold">Pomodori</p>
        <p id="summary-pomodoro-count">{pomodoroCount}</p>
      </Col>
      {showOvertime && (
        <React.Fragment>
          <Col className="text-center">
            <p className="text-bold">Overtime (P)</p>
            <p id="summary-overtime-pomodoro">{overtime.pomodori}</p>
          </Col>
          <Col className="text-center">
            <p className="text-bold">Overtime (B)</p>
            <p id="summary-overtime-breaks">{overtime.breaks}</p>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};

Summary.propTypes = {
  taskCount: PropTypes.number.isRequired,
  pomodoroCount: PropTypes.number.isRequired,
  overtime: PropTypes.object.isRequired,
  showOvertime: PropTypes.bool.isRequired
};

export default Summary;

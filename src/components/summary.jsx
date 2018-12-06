import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Summary = ({ taskCount, pomodoroCount }) => {
  return (
    <Row className="summary">
      <Col className="text-center">
        <p className="text-bold">Tasks</p>
        <p>{taskCount}</p>
      </Col>
      <Col className="text-center">
        <p className="text-bold">Pomodori</p>
        <p>{pomodoroCount}</p>
      </Col>
    </Row>
  );
};

Summary.propTypes = {
  taskCount: PropTypes.number.isRequired,
  pomodoroCount: PropTypes.number.isRequired
};

export default Summary;

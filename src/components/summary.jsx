import React from 'react';
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

export default Summary;

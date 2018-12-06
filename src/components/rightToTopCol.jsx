import React from 'react';
import { Col } from 'reactstrap';

const RightToTopCol = ({ children }) => (
  <Col lg={{ size: 4, order: 2 }} xs={{ size: 12, order: 1 }}>
    {children}
  </Col>
);

export default RightToTopCol;

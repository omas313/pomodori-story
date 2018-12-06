import React from 'react';
import { Col } from 'reactstrap';

const LeftToBottomCol = ({ children }) => (
  <Col
    lg={{ size: 8, order: 1 }}
    xs={{ size: 12, order: 2 }}
    className="left-to-bottom-column"
  >
    {children}
  </Col>
);

export default LeftToBottomCol;

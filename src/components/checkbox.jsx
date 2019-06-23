import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Input, FormGroup, Label } from 'reactstrap';

class Checkbox extends Component {
  state = {
    value: false
  };

  componentDidMount() {
    this.setState({ value: this.props.default });
  }

  handleChange = ({ currentTarget: input }) => {
    const value = input.checked;
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { label } = this.props;

    return (
      <FormGroup check>
        <Row>
          <Col>
            <Label check>
              <Input type="checkbox" checked={value} onChange={this.handleChange} />{' '}
              {label}
            </Label>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

Checkbox.propTypes = {
  default: PropTypes.bool,
  label: PropTypes.string
};

Checkbox.defaultProps = {
  default: false,
  onChange: () => null
};

export default Checkbox;

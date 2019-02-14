import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

class RangeInput extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.setState({ value: this.props.default });
  }

  handleChange = ({ currentTarget: input }) => {
    const { name, min, max, onChange } = this.props;

    if (input.value < min || input.value > max) return;

    onChange(name, Number(input.value));
    this.setState({ value: input.value });
  };

  render() {
    const { value } = this.state;
    const { name, label, min, max } = this.props;

    return (
      <FormGroup>
        <Row>
          <Col>
            <Label for={name}>{label}</Label>
          </Col>
          <Col>
            <Input
              type="number"
              min={min}
              max={max}
              name={name}
              value={value}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

RangeInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func
};

RangeInput.defaultProps = {
  name: '',
  value: 0,
  onChange: () => null
};

export default RangeInput;

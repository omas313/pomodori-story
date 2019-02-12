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
    const { name, onChange } = this.props;
    onChange(name, Number(input.value));
    this.setState({ value: input.value });
  };

  render() {
    const { value } = this.state;
    const { name, label } = this.props;

    return (
      <FormGroup>
        <Row>
          <Col>
            <Label for={name}>{label}</Label>
          </Col>
          <Col>
            <Input
              type="number"
              min="1"
              max="120"
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

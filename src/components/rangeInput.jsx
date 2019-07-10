/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';
import { ThemeContext } from '../context/themeContext';

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
            <ThemeContext.Consumer>
              {({ theme, toggleTheme }) => {
                const styles = css`
                  border: 1px solid ${theme.primary} !important;
                  font-size: 1.1rem !important;
                  transition: background-color 0.3s, border-color 0.3s;
                  background-color: ${theme.controlBackground} !important;
                  color: ${theme.controlForeground}  !important;
                  
                  &:focus {
                    background-color: ${theme.controlBackgroundFocus} !important;
                    color: ${theme.foreground}  !important;
                    box-shadow: none !important;
                  }
                `
                return (
                  <Input
                    css={styles}
                    type="number"
                    min={min}
                    max={max}
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                  />
                );
              }}
            </ThemeContext.Consumer>
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

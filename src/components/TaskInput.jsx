/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Component } from 'react'; import PropTypes from 'prop-types';
import { Input, FormGroup } from 'reactstrap';
import { ThemeContext } from '../context/themeContext';

class TaskInput extends Component {
  state = {
    text: ''
  };

  componentDidMount() {
    this.setState({ text: this.props.text });
  }

  handleChange = ({ currentTarget: input }) => {
    this.props.onChange(input.value);
    this.setState({ text: input.value });
  };

  handleKeyDown = ({ key }) => {
    const { text } = this.state;
    if (key !== 'Enter') return;

    this.handleSubmit(text);
  };

  handleSubmit = text => {
    if (!text.trim()) return;

    const { onSubmit } = this.props;

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const { placeholder } = this.props;

    return (
      <FormGroup>
        <ThemeContext.Consumer>
          {({ theme, _ }) => {
            const styles = css`
              background-color: ${theme.controlBackground};
              color: ${theme.foreground};
              border-color: ${theme.primary};
              
              &:focus {
                color: ${theme.foreground};
                background-color: ${theme.controlBackgroundFocus};
                border-color: ${theme.primary};
                outline: none;
                box-shadow: none;
              }
            `;

            return (
              <Input
                css={styles}
                name="task-input"
                placeholder={placeholder}
                value={text}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={() => this.handleSubmit(text)}
                autoFocus
              />
            );
          }}
        </ThemeContext.Consumer>

      </FormGroup>
    );
  }
}

TaskInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

TaskInput.defaultProps = {
  text: '',
  placeholder: '',
  onChange: () => null
};

export default TaskInput;

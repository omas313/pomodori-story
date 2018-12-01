import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';

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
    const { onSubmit } = this.props;

    if (key !== 'Enter' || !text.trim()) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const { placeholder } = this.props;

    return (
      <FormGroup>
        <Input
          name="task-input"
          placeholder={placeholder}
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
      </FormGroup>
    );
  }
}

TaskInput.defaultProps = {
  text: '',
  placeholder: '',
  onChange: () => null
};

export default TaskInput;

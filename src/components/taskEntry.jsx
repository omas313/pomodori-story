import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';

class TaskEntry extends Component {
  state = {
    text: ''
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ text: input.value });
  };

  handleKeyDown = ({ key }) => {
    const { text } = this.state;

    if (key !== 'Enter' || !text.trim()) return;

    this.props.onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;

    return (
      <FormGroup>
        <Input
          name="new-task"
          id="new-task"
          placeholder="Enter a task..."
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
      </FormGroup>
    );
  }
}

export default TaskEntry;

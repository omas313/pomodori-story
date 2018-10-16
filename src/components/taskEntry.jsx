import React, { Component } from 'react';

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
      <div className="form-group">
        <input
          name="new-task"
          id="new-task"
          className="form-control"
          placeholder="Enter a task..."
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
      </div>
    );
  }
}

export default TaskEntry;

import React, { Component } from 'react';

class TaskEntry extends Component {
  state = {
    text: ''
  };

  componentDidMount() {
    const { name } = this.props.task;

    this.setState({ text: name });
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ text: input.value });
  };

  handleKeyDown = ({ key }) => {
    const { text } = this.state;
    const { task, onEdit } = this.props;

    if (key !== 'Enter' || !text.trim()) return;

    onEdit(task._id, text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const { _id } = this.props.task;

    return (
      <div className="form-group">
        <input
          name={'edit-task-' + _id}
          id={'edit-task-' + _id}
          className="form-control"
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

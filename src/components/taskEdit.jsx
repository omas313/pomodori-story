import React, { Component } from 'react';

class TaskEntry extends Component {
  state = {
    text: '',
    id: ''
  };

  componentDidMount() {
    const { name: text, _id: id } = this.props.task;

    this.setState({ text, id });
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ text: input.value });
  };

  handleKeyDown = ({ key }) => {
    const { text } = this.state;
    const { task, onEdit } = this.props;

    if (key !== 'Enter' || !text.trim()) return;

    onEdit(task, text);
    this.setState({ text: '' });
  };

  render() {
    const { text, id } = this.state;

    return (
      <div className="form-group">
        <input
          name={'edit-task-' + id}
          id={'edit-task-' + id}
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

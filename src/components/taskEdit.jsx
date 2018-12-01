import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';

// TODO: refactor TaskEntry and TaskEdit to TaskInput for both cases
class TaskEdit extends Component {
  state = {
    text: ''
  };

  componentDidMount() {
    const { name } = this.props.task;

    this.setState({ text: name });
  }

  handleChange = ({ currentTarget: input }) => {
    const { onChange } = this.props;

    onChange(input.value);
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
      <FormGroup>
        <Input
          name={'edit-task-' + _id}
          id={'edit-task-' + _id}
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
      </FormGroup>
    );
  }
}

export default TaskEdit;

import React, { Component } from 'react';
import TaskEdit from './taskEdit';

class Task extends Component {
  state = {
    editing: false
  };

  handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleEditFinish = (oldTask, newName) => {
    this.setState({ editing: false });
    this.props.onEdit(oldTask, newName);
  };

  render() {
    const { task, current, onSetActiveTask, onDelete } = this.props;
    const { editing } = this.state;

    const classes = 'clickable' + (current ? ' task-current' : '');

    return (
      <div className="task">
        {editing ? (
          <TaskEdit task={task} onEdit={this.handleEditFinish} />
        ) : (
          <span className={classes} onClick={() => onSetActiveTask(task)}>
            {task.name}
          </span>
        )}
        | {task.count} |
        <button
          className="btn btn-info"
          // onClick={() => onEdit(task, `${task.name} updated`)}
          onClick={this.handleEdit}
        >
          Edit
        </button>{' '}
        |{' '}
        <button className="btn btn-danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    );
  }
}

export default Task;

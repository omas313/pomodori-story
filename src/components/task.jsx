import React, { Component } from 'react';
import TaskEdit from './taskEdit';

class Task extends Component {
  state = {
    editing: false
  };

  handleEditClick = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleEditFinish = (id, name) => {
    this.setState({ editing: false });
    this.props.onEdit(id, name);
  };

  render() {
    const { task, active, onSetActiveTask, onDelete } = this.props;
    const { editing } = this.state;

    const classes = 'task list-group-item row' + (active ? ' active' : '');
    const badgeClasses =
      'badge badge-pill badge-' + (task.count === 0 ? 'secondary' : 'primary');

    return (
      <li className={classes}>
        <div className="row">
          <div
            className="col w-100 clickable"
            onClick={() => onSetActiveTask(task)}
          >
            {editing ? (
              <TaskEdit task={this.props.task} onEdit={this.handleEditFinish} />
            ) : (
              task.name
            )}
          </div>
          <div
            className="col-2 clickable"
            onClick={() => onSetActiveTask(task)}
          >
            <span className={badgeClasses}>{task.count}</span>
          </div>
          <div className="col-3 text-right action-buttons">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={this.handleEditClick}
            >
              <img src="./img/edit.svg" alt="Edit" className="action-button" />
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onDelete(task)}
            >
              <img
                src="./img/delete.svg"
                alt="Delete"
                className="action-button"
              />
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default Task;

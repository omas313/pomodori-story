import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import TaskComponent from './taskComponent';
import { taskType } from '../types';

class TaskList extends Component {
  isActive(taskId) {
    const { currentTask } = this.props;
    return currentTask && currentTask._id === taskId;
  }

  render() {
    const { tasks, onSetActiveTask, onDelete, onEdit } = this.props;

    return (
      <ListGroup flush>
        {tasks.length === 0 && <p>Add a task and start working!</p>}
        {tasks &&
          tasks.map(task => (
            <TaskComponent
              key={task._id}
              task={task}
              isActive={this.isActive(task._id)}
              onSetActive={onSetActiveTask}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
      </ListGroup>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(taskType),
  currentTask: taskType,
  onSetActiveTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskList;

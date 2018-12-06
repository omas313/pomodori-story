import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import TaskComponent from './taskComponent';
import { taskType } from '../types';

class TaskList extends Component {
  state = {};

  render() {
    const {
      currentTask,
      tasks,
      onSetActiveTask,
      onDelete,
      onEdit
    } = this.props;

    return (
      <ListGroup flush>
        {tasks.length === 0 && <p>Add a task and start working!</p>}
        {tasks &&
          tasks.map(task => (
            <TaskComponent
              key={task._id}
              task={task}
              isActive={currentTask && currentTask._id === task._id}
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

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import Task from './task';
import { taskType } from '../types';

const Tasks = ({ currentTask, tasks, onSetActiveTask, onDelete, onEdit }) => {
  return (
    <ListGroup flush>
      {tasks.length === 0 && <p>Add a task and start working!</p>}
      {tasks &&
        tasks.map(task => (
          <Task
            key={task._id}
            task={task}
            active={currentTask && currentTask._id === task._id}
            onSetActiveTask={onSetActiveTask}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </ListGroup>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(taskType),
  currentTask: taskType,
  onSetActiveTask: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Tasks;

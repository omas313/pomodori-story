import React from 'react';
import Task from './task';

const Tasks = ({ currentTask, tasks, onSetActiveTask, onDelete, onEdit }) => {
  return (
    <ul className="tasks list-group list-group-flush">
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
    </ul>
  );
};

export default Tasks;

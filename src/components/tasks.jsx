import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskInput from './taskInput';
import TaskList from './taskList';
import taskService from '../services/taskService';
import Task from '../models/task';

class Tasks extends Component {
  state = {
    tasks: [],
    currentTask: null
  };

  componentDidMount() {
    this.initTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) this.onTasksChanged();

    if (!prevProps.pendingPomodoro && this.props.pendingPomodoro)
      this.addPomodoroToCurrentTask();
  }

  initTasks() {
    const tasks = taskService.getAll() || [Task.getDefaultTask()];

    this.setState({ tasks, currentTask: tasks[0] });
  }

  onTasksChanged() {
    const { tasks } = this.state;
    const { onTasksChanged } = this.props;

    const totalpomodori =
      tasks.length === 0 ? 0 : tasks.reduce((t, curr) => t + curr.pomodori, 0);

    onTasksChanged(tasks.length, totalpomodori);
    taskService.save(tasks);
  }

  addPomodoroToCurrentTask() {
    const { tasks: oldTasks, currentTask } = this.state;
    const { onPomodoroAssigned } = this.props;

    const tasks = [...oldTasks];
    const index = tasks.indexOf(currentTask);
    const task = new Task(
      tasks[index]._id,
      tasks[index].name,
      tasks[index].pomodori + 1
    );
    tasks[index] = task;

    this.setState({
      tasks,
      currentTask: task
    });
    onPomodoroAssigned();
  }

  handleSetActiveTask = task => {
    this.setState({ currentTask: task });
  };

  handleNewTask = (name, pomodori = 0) => {
    if (name === '>>es') return this.props.DEBUG_se_hack();

    const tasks = [...this.state.tasks];
    const task = new Task(
      `${name.length}${Math.random() * 1000000}`,
      name.trim(),
      pomodori
    );
    tasks.push(task);

    this.setState({ tasks });
  };

  handleDeleteTask = task => {
    const { tasks: oldTasks, currentTask } = this.state;

    if (
      oldTasks.length === 1 &&
      oldTasks[0].name === Task.getDefaultTask().name
    )
      return;

    let tasks = [...oldTasks];
    const updates = {};

    tasks.splice(tasks.indexOf(task), 1);
    if (tasks.length === 0) tasks = [Task.getDefaultTask()];

    updates.tasks = tasks;
    if (!currentTask || task._id === currentTask._id || tasks.length === 1)
      updates.currentTask = tasks[0];

    this.setState(updates);
  };

  handleEditTask = (id, name) => {
    const { tasks: oldTasks, currentTask } = this.state;

    const tasks = [...oldTasks];
    const index = tasks.findIndex(t => t._id === id);
    const task = new Task(tasks[index]._id, name.trim(), tasks[index].pomodori);
    tasks[index] = task;

    const updates = { tasks };
    if (task._id === currentTask._id) updates.currentTask = task;
    this.setState(updates);
  };

  render() {
    const { tasks, currentTask } = this.state;

    return (
      <React.Fragment>
        <TaskInput
          placeholder="Enter task here..."
          onSubmit={this.handleNewTask}
        />
        <TaskList
          tasks={tasks}
          currentTask={currentTask}
          onSetActiveTask={this.handleSetActiveTask}
          onEdit={this.handleEditTask}
          onDelete={this.handleDeleteTask}
        />
      </React.Fragment>
    );
  }
}

Tasks.propTypes = {
  pendingPomodoro: PropTypes.bool.isRequired,
  onTasksChanged: PropTypes.func.isRequired,
  onPomodoroAssigned: PropTypes.func.isRequired
};

export default Tasks;

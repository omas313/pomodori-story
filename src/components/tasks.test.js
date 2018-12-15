import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tasks from './tasks';
import TaskInput from './taskInput';
import TaskList from './taskList';
import Task from './../models/task';
import taskService from '../services/taskService';

configure({ adapter: new Adapter() });

jest.mock('../services/taskService');
taskService.getAll = jest
  .fn()
  .mockImplementation(() => [
    new Task('123', 'Task 123', 0),
    new Task('234', 'Task 234', 0)
  ]);
taskService.save = jest.fn();

describe('Tasks', () => {
  let tasks = null;

  beforeEach(() => {
    tasks = shallow(
      <Tasks
        pendingPomodoro={false}
        onTasksChanged={() => {}}
        onPomodoroAssigned={() => {}}
      />
    );
  });

  it('renders TaskInput and TaskList as children on root level', () => {
    const taskInput = tasks.find(TaskInput);
    const taskList = tasks.find(TaskList);

    expect(taskInput.length).toEqual(1);
    expect(taskList.length).toEqual(1);
    expect(tasks.children().find(c => c === taskInput)).toBeTruthy();
    expect(tasks.children().find(c => c === taskList)).toBeTruthy();
  });

  it('sets 2 props on rendered TaskInput component', () => {
    const { placeholder, onSubmit } = tasks.find(TaskInput).props();
    expect(placeholder).toBeTruthy();
    expect(onSubmit).toEqual(tasks.instance().handleNewTask);
  });

  it('sets 5 props on rendered TaskList component', () => {
    const task = Task.getDefaultTask();
    tasks.setState({ tasks: [task], currentTask: task });

    const {
      tasks: tasksArray,
      currentTask,
      onSetActiveTask,
      onEdit,
      onDelete
    } = tasks.find(TaskList).props();
    expect(tasksArray).toEqual(tasks.state().tasks);
    expect(currentTask).toEqual(tasks.state().currentTask);
    expect(onSetActiveTask).toEqual(tasks.instance().handleSetActiveTask);
    expect(onEdit).toEqual(tasks.instance().handleEditTask);
    expect(onDelete).toEqual(tasks.instance().handleDeleteTask);
  });

  it('initializes tasks and currentTask on mount with data received from task service', () => {
    const receivedTasks = taskService.getAll();
    expect(tasks.state().tasks.length).toEqual(receivedTasks.length);
    expect(tasks.state().currentTask._id).toEqual(receivedTasks[0]._id);
  });

  it('initializes tasks and currentTask on mount with default data when service returns nothing', () => {
    taskService.getAll.mockImplementationOnce(() => []);

    tasks = shallow(
      <Tasks
        pendingPomodoro={false}
        onTasksChanged={() => {}}
        onPomodoroAssigned={() => {}}
      />
    );

    expect(tasks.state().tasks.length).toEqual(1);
    expect(tasks.state().currentTask).toBeTruthy();
  });

  it('calls onTasksChanged prop when onTasksChanged method is called', () => {
    const onTasksChanged = jest.fn();
    tasks.setProps({ onTasksChanged });

    tasks.instance().onTasksChanged();

    const taskCount = tasks.state().tasks.length,
      totalPomodori = tasks.instance().getTotalPomodori();
    expect(onTasksChanged).toHaveBeenCalledWith(taskCount, totalPomodori);
  });

  it('calls save method on task service when onTasksChanged method is called', () => {
    tasks.instance().onTasksChanged();
    expect(taskService.save).toHaveBeenCalled();
  });

  it('adds pomodoro to current task when addPomodoroToCurrentTask is called', () => {
    const currentPomodori = tasks.state().currentTask.pomodori;

    tasks.instance().addPomodoroToCurrentTask();

    expect(tasks.state().currentTask.pomodori).toEqual(currentPomodori + 1);
  });

  it('calls onPomodoroAssigned prop when addPomodoroToCurrentTask is called', () => {
    const onPomodoroAssigned = jest.fn();
    tasks.setProps({ onPomodoroAssigned });

    tasks.instance().addPomodoroToCurrentTask();

    expect(onPomodoroAssigned).toHaveBeenCalled();
  });

  it('sets currentTask in state to task received when handleSetActiveTask is called', () => {
    const task = Task.getDefaultTask();

    tasks.instance().handleSetActiveTask(task);

    expect(tasks.state().currentTask).toEqual(task);
  });

  it('creates new task when handleNewTask is called', () => {
    const oldCount = tasks.state().tasks.length;
    const name = 'New Task';

    tasks.instance().handleNewTask(name);

    expect(tasks.state().tasks.length).toEqual(oldCount + 1);
    expect(tasks.state().tasks[oldCount].name).toEqual(name);
  });

  it('deletes task received when handleDeleteTask is called', () => {
    const task = tasks.state().tasks[0];

    tasks.instance().handleDeleteTask(task);

    expect(tasks.state().tasks.find(t => t._id === task._id)).toBeUndefined();
  });

  it('adds default task when all tasks are deleted', () => {
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);

    expect(tasks.state().tasks[0].name).toEqual(Task.getDefaultTask().name);
  });

  it('keeps default task when user attempts to delete it', () => {
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);

    expect(tasks.state().tasks[0].name).toEqual(Task.getDefaultTask().name);
  });

  it('reassigns currentTask in state when it is deleted', () => {
    const oldTaskId = tasks.state().currentTask._id;

    tasks.instance().handleDeleteTask(tasks.state().currentTask);

    expect(tasks.state().currentTask._id).not.toEqual(oldTaskId);
  });

  it('reassigns currentTask to default task in state when all tasks are deleted', () => {
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);
    tasks.instance().handleDeleteTask(tasks.state().tasks[0]);

    expect(tasks.state().currentTask._id).toEqual(Task.getDefaultTask()._id);
  });

  it('sets new name for edited task when handleEditTask is called', () => {
    const id = tasks.state().tasks[1]._id;
    const newName = 'New task name';

    tasks.instance().handleEditTask(id, newName);

    expect(tasks.state().tasks[1].name).toEqual(newName);
  });

  it("updates currentTask in state when currentTask's name is changed at handleEditTask call", () => {
    const id = tasks.state().currentTask._id;
    const newName = 'New task name';

    tasks.instance().handleEditTask(id, newName);

    expect(tasks.state().currentTask.name).toEqual(newName);
  });
});

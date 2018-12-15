import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Col, ListGroupItem } from 'reactstrap';
import TaskComponent from './taskComponent';
import TaskInput from './taskInput';
import TaskButtons from './taskButtons';
import Task from './../models/task';

configure({ adapter: new Adapter() });

describe('TaskComponent', () => {
  let taskComponent = null;
  let task = null;

  beforeEach(() => {
    task = new Task('123', 'Task 123', 0);
    taskComponent = shallow(
      <TaskComponent
        task={task}
        isActive={false}
        onSetActive={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
  });

  it('renders ListGroupItem as root component', () => {
    const listGroupItem = taskComponent.find(ListGroupItem);
    expect(listGroupItem).toEqual(taskComponent.first());
    expect(listGroupItem.length).toEqual(1);
  });

  it('renders 3 Col components', () => {
    const cols = taskComponent.find(Col);
    expect(cols.length).toEqual(3);
  });

  it('sets active class on ListGroupItem when isActive prop is true', () => {
    taskComponent.setProps({ isActive: true });

    const listGroupItem = taskComponent.find(ListGroupItem);
    expect(listGroupItem.hasClass('active')).toBeTruthy();
  });

  it('sets active class on ListGroupItem when isActive prop is false', () => {
    taskComponent.setProps({ isActive: false });

    const listGroupItem = taskComponent.find(ListGroupItem);
    expect(listGroupItem.hasClass('active')).not.toBeTruthy();
  });

  it('returns secondary badge color when task pomodori is 0', () => {
    const color = taskComponent.instance().getBadgeColor();
    expect(color).toEqual('secondary');
  });

  it('returns primary badge color when task pomodori is more than 0', () => {
    taskComponent.setProps({ task: new Task('', '', 8) });

    const color = taskComponent.instance().getBadgeColor();
    expect(color).toEqual('primary');
  });

  it('renders task name in task name column when isEditing is set to false', () => {
    taskComponent.setProps({ isEditing: false });

    const taskNameCol = taskComponent.find('.task-name');
    expect(taskNameCol.children().text()).toEqual(task.name);
  });

  it('renders a single TaskInput component in task name column when isEditing is set to true', () => {
    taskComponent.setState({ isEditing: true });

    const taskNameCol = taskComponent.find('Col.task-name');
    const taskInput = taskComponent.find(TaskInput);
    expect(taskNameCol.children()).toEqual(taskInput);
    expect(taskInput.length).toEqual(1);
  });

  it('sets 3 props on rendered TaskInput component', () => {
    taskComponent.setProps({ isEditing: true });
    taskComponent.setState({ isEditing: true });

    const { handleChange, handleEditSubmit } = taskComponent.instance();
    const { text, onChange, onSubmit } = taskComponent
      .find('TaskInput')
      .props();
    expect(text).toEqual(task.name);
    expect(onChange).toEqual(handleChange);
    expect(onSubmit).toEqual(handleEditSubmit);
  });

  it('calls onSetActive prop passing in the task when the task name col is clicked', () => {
    const onSetActive = jest.fn();
    taskComponent.setProps({ onSetActive });

    const taskNameCol = taskComponent.find('Col.task-name');
    taskNameCol.simulate('click');

    expect(onSetActive).toHaveBeenCalledWith(task);
  });

  it('renders a single TaskButtons component in the action buttons column', () => {
    const actionButtonsCol = taskComponent.find('Col.action-buttons');
    const taskButtons = taskComponent.find(TaskButtons);

    expect(actionButtonsCol.children()).toEqual(taskButtons);
    expect(taskButtons.length).toEqual(1);
  });

  it('sets props on TaskButtons component', () => {
    const { task, onDelete } = taskComponent.find(TaskButtons).props();
    const { newName, isEditing } = taskComponent.state();
    const { handleEditSubmit, handleEditClick } = taskComponent.instance();

    const taskButtonsProps = taskComponent.find(TaskButtons).props();

    expect(taskButtonsProps.task).toEqual(task);
    expect(taskButtonsProps.newName).toEqual(newName);
    expect(taskButtonsProps.isEditing).toEqual(isEditing);
    expect(taskButtonsProps.onSubmit).toEqual(handleEditSubmit);
    expect(taskButtonsProps.onEditClick).toEqual(handleEditClick);
    expect(taskButtonsProps.onDelete).toEqual(onDelete);
  });

  it('calls onEdit prop when handleEditSubmit method is called', () => {
    const onEdit = jest.fn();
    taskComponent.setProps({ onEdit });

    const nameArg = 'Task 234';
    taskComponent.instance().handleEditSubmit(nameArg);

    expect(onEdit).toHaveBeenCalledWith(task._id, nameArg);
  });

  it('toggle isEditing when handleEditClick method is called', () => {
    taskComponent.setState({ isEditing: false });

    taskComponent.instance().handleEditClick();

    expect(taskComponent.state().isEditing).toBeTruthy();
  });

  it('sets newName state to received newName when handleChange method is called', () => {
    const newName = 'Task 567';
    taskComponent.instance().handleChange(newName);

    expect(taskComponent.state().newName).toEqual(newName);
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'reactstrap';
import TaskButtons from './taskButtons';
import Task from './../models/task';

configure({ adapter: new Adapter() });

describe('TaskButtons', () => {
  let taskButtons = null;

  beforeEach(() => {
    taskButtons = shallow(
      <TaskButtons
        task={new Task('', '', 0)}
        newName={''}
        isEditing={false}
        onSubmit={() => {}}
        onEditClick={() => {}}
        onDelete={() => {}}
      />
    );
  });

  it('renders two buttons - edit & delete - when isEditing prop is false (default)', () => {
    const buttons = taskButtons.find(Button);
    expect(buttons.length).toEqual(2);

    const editButton = taskButtons.find('Button#task-edit-button');
    expect(editButton.length).toEqual(1);

    const deleteButton = taskButtons.find('Button#task-delete-button');
    expect(deleteButton.length).toEqual(1);
  });

  it('renders 1 button - submit edit - when isEditing prop is true', () => {
    taskButtons.setProps({ isEditing: true });

    const buttons = taskButtons.find(Button);
    expect(buttons.length).toEqual(1);

    const submitEditButton = taskButtons.find('Button#task-submit-edit-button');
    expect(submitEditButton.length).toEqual(1);
  });

  it('sets onClick of edit task button to received onEditClick prop', () => {
    const editButton = taskButtons.find('Button#task-edit-button');
    expect(editButton.props().onClick).toEqual(
      taskButtons.instance().props.onEditClick
    );
  });

  it('calls onDelete with the task as event arg when task delete button is clicked', () => {
    const onDelete = jest.fn();
    taskButtons.setProps({ onDelete });

    const deleteButton = taskButtons.find('Button#task-delete-button');
    deleteButton.simulate('click');

    const task = taskButtons.instance().props.task;
    expect(onDelete).toHaveBeenCalledWith(task);
  });

  it('calls onSubmit with the newName as event arg when task submit edit button is clicked', () => {
    const onSubmit = jest.fn(),
      newName = 'New Task';
    taskButtons.setProps({ isEditing: true, onSubmit, newName });

    const submitEditButton = taskButtons.find('Button#task-submit-edit-button');
    submitEditButton.simulate('click');

    expect(onSubmit).toHaveBeenCalledWith(newName);
  });
});

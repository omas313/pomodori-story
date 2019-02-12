import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ListGroup } from 'reactstrap';
import TaskList from '../components/taskList';
import TaskComponent from '../components/taskComponent';
import Task from '../models/task';

configure({ adapter: new Adapter() });

describe('TaskList', () => {
  let taskList = null;

  beforeEach(() => {
    taskList = shallow(
      <TaskList
        tasks={[]}
        currentTask={Task.getDefaultTask()}
        onSetActiveTask={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
  });

  it('renders a ListGroup as the root component', () => {
    const listGroup = taskList.find(ListGroup);
    expect(listGroup.length).toEqual(1);
    expect(listGroup).toEqual(taskList.first());
  });

  it('renders a paragraph when there are no tasks', () => {
    const p = taskList.find('p');
    expect(p.length).toEqual(1);
  });

  it("doesn't render any TaskComponents when there are no tasks", () => {
    const taskComponents = taskList.find(TaskComponent);
    expect(taskComponents.length).toEqual(0);
  });

  it('renders n TaskComponent(s) when there are n task(s)', () => {
    const tasks = [Task.getDefaultTask(), Task.getDefaultTask()];
    taskList.setProps({ tasks });

    const taskComponent = taskList.find(TaskComponent);
    expect(taskComponent.length).toEqual(tasks.length);
  });

  it("returns true when called with currentTask's id", () => {
    const task = new Task('1', '', 0);
    taskList.setProps({ currentTask: task });

    expect(taskList.instance().isActive(task._id)).toBeTruthy();
  });

  it("returns false when not called with currentTask's id", () => {
    const task = new Task('1', '', 0);
    taskList.setProps({ currentTask: task });

    expect(taskList.instance().isActive('123')).toBeFalsy();
  });

  it('sets 5 props on TaskComponent of a task', () => {
    const tasks = [Task.getDefaultTask()];
    taskList.setProps({ tasks, currentTask: tasks[0] });

    const taskComponentProps = taskList.find(TaskComponent).props();
    const { onSetActiveTask, onDelete, onEdit } = taskList.instance().props;
    expect(taskComponentProps.task).toEqual(tasks[0]);
    expect(taskComponentProps.isActive).toBeTruthy();
    expect(taskComponentProps.onSetActive).toEqual(onSetActiveTask);
    expect(taskComponentProps.onDelete).toEqual(onDelete);
    expect(taskComponentProps.onEdit).toEqual(onEdit);
  });
});

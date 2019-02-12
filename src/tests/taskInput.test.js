import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Input, FormGroup } from 'reactstrap';
import TaskInput from '../components/taskInput';

configure({ adapter: new Adapter() });

describe('TaskInput', () => {
  let taskInput = null;

  beforeEach(() => {
    taskInput = shallow(
      <TaskInput text={''} onChange={() => {}} onSubmit={() => {}} />
    );
  });

  it('renders a FormGroup as root component', () => {
    const formGroup = taskInput.find(FormGroup);
    expect(formGroup).toEqual(taskInput.first());
    expect(formGroup.length).toEqual(1);
  });

  it('renders a single Input component', () => {
    const input = taskInput.find(Input);
    expect(input.length).toEqual(1);
  });

  it('set state text to received text prop on mount', () => {
    expect(taskInput.state().text).toEqual(taskInput.instance().props.text);
  });

  it('calls onChange prop when handleChange is called', () => {
    const text = 'New Task';
    const onChange = jest.fn();
    taskInput.setProps({ onChange });

    taskInput.instance().handleChange({ currentTarget: { value: text } });

    expect(onChange).toHaveBeenCalledWith(text);
  });

  it('sets state text to received value when handleChange is called', () => {
    const text = 'New Task';
    const onChange = jest.fn();
    taskInput.setProps({ onChange });

    taskInput.instance().handleChange({ currentTarget: { value: text } });

    expect(taskInput.state().text).toEqual(text);
  });

  it('calls handleSubmit when handleKeyDown is called with Enter key', () => {
    const handleSubmit = jest.fn();
    taskInput.instance().handleSubmit = handleSubmit;

    taskInput.instance().handleKeyDown({ key: 'Enter' });
    expect(handleSubmit).toHaveBeenCalledWith(taskInput.state().text);
  });

  it("doesn't call handleSubmit when handleKeyDown is called with a non-Enter key", () => {
    const handleSubmit = jest.fn();
    taskInput.instance().handleSubmit = handleSubmit;

    taskInput.instance().handleKeyDown({ key: 'X' });
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit prop when handleSubmit receives non-empty string', () => {
    const text = 'Task 275';
    const onSubmit = jest.fn();
    taskInput.setProps({ onSubmit });

    taskInput.instance().handleSubmit(text);

    expect(onSubmit).toHaveBeenCalledWith(text);
  });

  it('sets text in state to empty string when handleSubmit receives non-empty string', () => {
    taskInput.instance().handleSubmit('Text');

    expect(taskInput.state().text).toEqual('');
  });

  it("doesn't call onSubmit prop when handleSubmit receives empty string", () => {
    const onSubmit = jest.fn();
    taskInput.setProps({ onSubmit });

    taskInput.instance().handleSubmit('');

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('set 7 props on rendered Input component', () => {
    const {
      name,
      placeholder,
      value,
      onChange,
      onKeyDown,
      onBlur,
      autoFocus
    } = taskInput.find(Input).props();

    expect(name).toEqual('task-input');
    expect(placeholder).toEqual(taskInput.instance().props.placeholder);
    expect(value).toEqual(taskInput.state().text);
    expect(onChange).toEqual(taskInput.instance().handleChange);
    expect(onKeyDown).toEqual(taskInput.instance().handleKeyDown);
    expect(onBlur).toBeTruthy();
    expect(autoFocus).toBeTruthy();
  });
});

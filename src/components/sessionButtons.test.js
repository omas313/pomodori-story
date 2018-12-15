import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'reactstrap';
import SessionButtons from './sessionButtons';

configure({ adapter: new Adapter() });

describe('SessionButtons', () => {
  let sessionButtons = null;
  const Session = {
    POMODORO: 25,
    SHORT_BREAK: 5,
    LONG_BREAK: 10
  };

  beforeEach(() => {
    sessionButtons = shallow(
      <SessionButtons
        session={Session}
        onButtonClick={() => {}}
        currentSession={Session.POMODORO}
      />
    );
  });

  it('renders a div with class session-buttons as the root element', () => {
    const div = sessionButtons.find('div');
    expect(div).toEqual(sessionButtons.first());
    expect(div.hasClass('session-buttons')).toBeTruthy();
  });

  it('renders three Button components', () => {
    const buttons = sessionButtons.find(Button);
    expect(buttons.length).toEqual(3);
  });

  it('renders three img, one in each Button', () => {
    const images = sessionButtons.find('Button img');
    expect(images.length).toEqual(3);
  });

  it('sets 1 Button with pomodoro-button class', () => {
    const button = sessionButtons.find('Button.pomodoro-button');
    expect(button.length).toEqual(1);
  });

  it('sets 2 Buttons with break-button class', () => {
    const buttons = sessionButtons.find('Button.break-button');
    expect(buttons.length).toEqual(2);
  });

  it('sets working class on Button if currentSession prop is pomodoro', () => {
    sessionButtons.setProps({ currentSession: Session.POMODORO });

    const button = sessionButtons.find('Button#pomodoro-session-button');
    expect(button.hasClass('working')).toBeTruthy();
  });

  it('sets break class on short break Button if currentSession prop is set to short break', () => {
    sessionButtons.setProps({ currentSession: Session.SHORT_BREAK });

    const button = sessionButtons.find('Button#short-break-session-button');
    expect(button.hasClass('break')).toBeTruthy();
  });

  it('sets break class on long break Button if currentSession prop is set to long break', () => {
    sessionButtons.setProps({ currentSession: Session.LONG_BREAK });

    const button = sessionButtons.find('Button#long-break-session-button');
    expect(button.hasClass('break')).toBeTruthy();
  });

  it('calls onButtonClick prop with pomodoro value when pomodoro button is clicked', () => {
    const onButtonClick = jest.fn();
    sessionButtons.setProps({ onButtonClick });

    const button = sessionButtons.find('Button#pomodoro-session-button');
    button.simulate('click');

    expect(onButtonClick).toHaveBeenCalledWith(Session.POMODORO);
  });

  it('calls onButtonClick prop with short break value when short break button is clicked', () => {
    const onButtonClick = jest.fn();
    sessionButtons.setProps({ onButtonClick });

    const button = sessionButtons.find('Button#short-break-session-button');
    button.simulate('click');

    expect(onButtonClick).toHaveBeenCalledWith(Session.SHORT_BREAK);
  });

  it('calls onButtonClick prop with long break value when long break button is clicked', () => {
    const onButtonClick = jest.fn();
    sessionButtons.setProps({ onButtonClick });

    const button = sessionButtons.find('Button#long-break-session-button');
    button.simulate('click');

    expect(onButtonClick).toHaveBeenCalledWith(Session.LONG_BREAK);
  });
});

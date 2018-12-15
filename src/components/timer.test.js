import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './timer';
import Sound from './sound';
import Time from './../models/time';

configure({ adapter: new Adapter() });

describe('Timer', () => {
  let timer = null;
  const Session = {
    POMODORO: 25,
    SHORT_BREAK: 5,
    LONG_BREAK: 10
  };

  beforeEach(() => {
    timer = shallow(
      <Timer
        currentSessionValue={0}
        isPomodoro={true}
        onTimerStart={() => {}}
        onTimerStop={() => {}}
        onTimerDone={() => {}}
      />
    );
  });

  it('sets time to a string with currentSessionValue prop when mounted', () => {
    const time = timer.find('#time');
    expect(time.text()).toEqual(new Time(0, 0).toString());
  });

  it('sets time to a string when currentSessionValue prop is updated', () => {
    timer.setProps({ currentSessionValue: Session.POMODORO });

    const timeText = timer.find('#time');
    const time = new Time(Session.POMODORO, 0);
    expect(timeText.text()).toEqual(time.toString());
  });

  it('sets correct time when given specific min and sec', () => {
    const time = new Time(11, 11);
    timer.instance().setTime(time.min, time.sec);

    const timeText = timer.find('#time');
    expect(timeText.text()).toEqual(time.toString());
  });

  it('calls onTimerStart prop when startTimer method is called', () => {
    const onTimerStart = jest.fn();
    timer.setProps({ onTimerStart });

    timer.instance().startTimer();

    expect(onTimerStart).toHaveBeenCalled();
  });

  it('calls onTimerStop prop when stopTimer method is called', () => {
    const onTimerStop = jest.fn();
    timer.setProps({ onTimerStop });

    timer.instance().stopTimer();

    expect(onTimerStop).toHaveBeenCalled();
  });

  it('calls onTimerDone prop when handleSecondPassed method is called at t=0', () => {
    const onTimerDone = jest.fn();
    timer.setProps({ onTimerDone });
    timer.instance().setTime(0, 0);

    timer.instance().handleSecondPassed();

    expect(onTimerDone).toHaveBeenCalled();
  });

  it('sets blink class on time text when timer is paused', () => {
    timer.instance().setTime(1, 1);
    timer.instance().stopTimer();

    const time = timer.find('#time');
    expect(time.hasClass('blink')).toBeTruthy();
  });

  it('sets working class on time text when isPomodoro prop is true', () => {
    timer.setProps({ isPomodoro: true });

    const time = timer.find('#time');
    expect(time.hasClass('working')).toBeTruthy();
  });

  it('sets break class on time text when isPomodoro prop is false', () => {
    timer.setProps({ isPomodoro: false });

    const time = timer.find('#time');
    expect(time.hasClass('break')).toBeTruthy();
  });

  it('sets time text onClick to handleTimerToggle', () => {
    const time = timer.find('#time');
    expect(time.props().onClick).toEqual(timer.instance().handleTimerToggle);
  });

  it('renders Sound component when timer is done', () => {
    timer.instance().timerFinished();

    const sound = timer.find(Sound);
    expect(sound.length).toEqual(1);
  });
});

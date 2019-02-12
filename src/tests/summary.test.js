import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Row, Col } from 'reactstrap';
import Summary from '../components/summary';

configure({ adapter: new Adapter() });

describe('Summary', () => {
  let summary = null;

  beforeEach(() => {
    summary = shallow(<Summary taskCount={0} pomodoroCount={0} />);
  });

  it('renders a Row as root element with class summary', () => {
    const row = summary.find(Row);
    expect(row).toEqual(summary.first());
    expect(row.hasClass('summary')).toBeTruthy();
  });

  it('renders 2 Cols', () => {
    const col = summary.find(Col);
    expect(col.length).toEqual(2);
  });

  it('renders taskCount prop', () => {
    const taskCountElement = summary.find('#summary-task-count');
    expect(taskCountElement.text()).toMatchSnapshot();
  });

  it('renders pomodoroCount prop', () => {
    const pomodoroCountElement = summary.find('#summary-pomodoro-count');
    expect(pomodoroCountElement.text()).toMatchSnapshot();
  });
});

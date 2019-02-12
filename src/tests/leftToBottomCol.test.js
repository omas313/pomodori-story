import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Col } from 'reactstrap';
import LeftToBottomCol from '../components/leftToBottomCol';

configure({ adapter: new Adapter() });

describe('LeftToBottomCol', () => {
  let ltbCol = null;

  beforeEach(() => {
    ltbCol = shallow(<LeftToBottomCol />);
  });

  it('renders a Col as the root element', () => {
    const col = ltbCol.find(Col);
    expect(col).toEqual(ltbCol.first());
    expect(col.length).toEqual(1);
  });

  it("passes children to Col's children", () => {
    const children = <h1>Hi</h1>;
    ltbCol.setProps({ children });

    const col = ltbCol.find(Col);
    expect(col.props().children).toEqual(children);
  });

  it('sets left-to-bottom-column class on Col', () => {
    const col = ltbCol.find(Col);
    expect(col.hasClass('left-to-bottom-column')).toBeTruthy();
  });
});

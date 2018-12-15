import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Col } from 'reactstrap';
import RightToTopCol from './rightToTopCol';

configure({ adapter: new Adapter() });

describe('RightToTopCol', () => {
  let rttCol = null;

  beforeEach(() => {
    rttCol = shallow(<RightToTopCol />);
  });

  it('renders a Col as the root element', () => {
    const col = rttCol.find(Col);
    expect(col).toEqual(rttCol.first());
    expect(col.length).toEqual(1);
  });

  it("passes children to Col's children", () => {
    const children = <h1>Hi</h1>;
    rttCol.setProps({ children });

    const col = rttCol.find(Col);
    expect(col.props().children).toEqual(children);
  });
});

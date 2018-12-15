import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import AppNavbar from './appNavbar';

configure({ adapter: new Adapter() });

describe('AppNavbar', () => {
  let appNavbar = null;

  beforeEach(() => {
    appNavbar = shallow(
      <AppNavbar
        title={''}
        isBreakTime={false}
        isWorking={false}
        onInfoClick={() => {}}
      />
    );
  });

  it('renders a Navbar', () => {
    const navbar = appNavbar.find(Navbar);
    expect(navbar).toBeTruthy();
  });

  it('should pass title prop as child of NavbarBrand', () => {
    const title = 'App Title';

    appNavbar.setProps({ title });

    const navbarBrand = appNavbar.find(NavbarBrand);
    expect(navbarBrand.props().children).toEqual(title);
  });

  it('renders a Collapse with prop isOpen equal to state.isOpen', () => {
    appNavbar.setState({ isOpen: true });

    const collapse = appNavbar.find(Collapse);
    expect(collapse.props().isOpen).toEqual(appNavbar.state().isOpen);
  });

  it('passes handleToggle to NavbarToggler props as onClick', () => {
    const navbarToggle = appNavbar.find(NavbarToggler);
    expect(navbarToggle.props().onClick).toEqual(
      appNavbar.instance().handleToggle
    );
  });

  it('passes in toggled state.isOpen to Collapse when handleToggle is triggered', () => {
    appNavbar.setState({ isOpen: true });

    appNavbar.instance().handleToggle();

    const collapse = appNavbar.find(Collapse);
    const passedProp = collapse.props().isOpen;
    expect(passedProp).toBeFalsy();
    expect(passedProp).toEqual(appNavbar.state().isOpen);
  });

  it('sets break-vibe class on Navbar when prop when isBreakTime prop is true', () => {
    appNavbar.setProps({ isBreakTime: true });

    const navbar = appNavbar.find(Navbar);
    expect(navbar.hasClass('break-vibe')).toBeTruthy();
  });

  it('sets animate class on Navbar when prop when isWorking prop is true', () => {
    appNavbar.setProps({ isWorking: true });

    const navbar = appNavbar.find(Navbar);
    expect(navbar.hasClass('animate')).toBeTruthy();
  });

  it('renders info NavLink with Info text passed as child', () => {
    const navLink = appNavbar.find('NavLink#info-nav-link');
    expect(navLink.props().children).toEqual('Info');
  });

  it("passes onInfoClick prop to Info NavLink's onClick prop", () => {
    const navLink = appNavbar.find('NavLink#info-nav-link');
    expect(navLink.props().onClick).toEqual(
      appNavbar.instance().props.onInfoClick
    );
  });
});

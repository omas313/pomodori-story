import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { title, breakTime, animate, onInfoClick } = this.props;

    const classes = `${breakTime ? 'break-vibe' : ''} ${
      animate ? 'animate' : ''
    }`;

    return (
      <div>
        <Navbar dark expand="md" className={classes}>
          <NavbarBrand href="/">{title}</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="clickable" onClick={onInfoClick}>
                  Info
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;

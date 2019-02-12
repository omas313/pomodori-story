import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const {
      title,
      isBreakTime,
      isWorking,
      onInfoClick,
      onSettingsClick
    } = this.props;

    const classes = `${isBreakTime ? 'break-vibe' : ''} ${
      isWorking ? 'animate' : ''
    }`;

    return (
      <div>
        <Navbar dark expand="md" className={classes}>
          <NavbarBrand href="/">{title}</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  id="info-nav-link"
                  className="clickable"
                  onClick={onInfoClick}
                >
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  id="settings-nav-link"
                  className="clickable"
                  onClick={onSettingsClick}
                >
                  Settings
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// TODO: make prop names clearer
AppNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  isBreakTime: PropTypes.bool.isRequired,
  isWorking: PropTypes.bool.isRequired,
  onInfoClick: PropTypes.func.isRequired
};

export default AppNavbar;

/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { ThemeContext } from '../context/themeContext';
import PropTypes from 'prop-types';


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


    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          const colorize = keyframes`
            0% { background-color: ${theme.primary}; }
            20% { background-color: ${theme.secondary}; }
            60% { background-color: ${theme.tertiary} }
            100% { background-color: ${theme.primary} }
          `;
          const baseStyles = css`
            background-color: ${theme.primary};
            margin-bottom: 2rem;
            transition: background-color 1s;

            a.navbar-brand, a.nav-link, .navbar-toggler-icon{
              color: ${theme.light} !important;
            }
          `;
          const breakStyles = css`
            background-color: ${theme.secondary};
            margin-bottom: 2rem;
          `;
          const workingStyle = css`
            animation: ${colorize} 10s ease-in-out 0.4s infinite;
            -webkit-animation: ${colorize} 10s ease-in-out 0.4s infinite;
          `;

          const styles = [
            baseStyles,
            isBreakTime ? breakStyles : null,
            isWorking ? workingStyle : null
          ].filter(s => s !== null);

          return (
            <div>
              <Navbar css={styles} dark expand="md">
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
        }}
      </ThemeContext.Consumer>
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

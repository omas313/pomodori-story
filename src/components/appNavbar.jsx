import React from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';

const AppNavbar = ({ title }) => (
  <Navbar dark expand="md">
    <NavbarBrand href="/">{title}</NavbarBrand>
  </Navbar>
);

export default AppNavbar;

import React from 'react';

const Navbar = ({ title }) => {
  return (
    <nav className="navbar navbar-light navbar-bg text-center mb-3">
      <div className="navbar-brand text-bold w-100 text-light">{title}</div>
    </nav>
  );
};

export default Navbar;

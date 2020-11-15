import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h3>RewardifyCMS</h3>
      <ul className="nav-links">
        <Link to="/" style={stylesNav}>
          <li>Home</li>
        </Link>
        <Link to="/users" style={stylesNav}>
          <li>Users</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;

const stylesNav = {
  color: 'white',
  textDecoration: 'none',
};

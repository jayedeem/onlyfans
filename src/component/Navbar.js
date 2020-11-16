import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={stylesNav.z4}>
      <h3>RewardifyCMS</h3>
      <ul style={stylesNav.navLinks}>
        <Link to="/" style={stylesNav.navLinks}>
          <li>Home</li>
        </Link>
        <Link to="/users" style={stylesNav.navLinks}>
          <li>Users</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;

const stylesNav = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: '10vh',
    backgroundColor: 'black',
    color: '#fff',
  },
  navLinks: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    listStyleType: 'none',
    color: '#fff',
    textDecoration: 'none',
  },
};

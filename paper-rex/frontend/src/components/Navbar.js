import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🌿 Paper<span>Rex</span>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Member</Link></li>
        <li><Link to="/view">View Members</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

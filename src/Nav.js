// src/components/Nav.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/webinar" className="hover:text-gray-300">Webinar</Link>
        </li>
        <li>
          <Link to="/module" className="hover:text-gray-300">Module</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

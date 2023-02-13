import React from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <input
        type='text'
        placeholder='Search'
        className='navSearch'
        size='100'></input>
      <ul>
        <li>
          <a href='#cash'>Cash</a>
        </li>
        <li>
          <a href='#portfolio'>Portfolio</a>
        </li>
        <li>
          <a href='#dashboard'>Dashboard</a>
        </li>
        <li>
          <i class='fa-solid fa-expand'></i>
        </li>
        <li>
          <i class='fa-solid fa-bell'></i>
        </li>
        <li>
          <i class='fa-solid fa-user'></i>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

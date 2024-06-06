// Header.js
import React from 'react';
import './Header.css'; // Make sure to create this CSS file and add your styles there
import logo from '../../assets/multiqos-logo.png'; // Make sure to replace this with the path to your logo file

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      {/* <p>Calender Demo</p> */}
    </header>
  );
};

export default Header;

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Onebox</h1>
      <div className="user-settings">
        <span>Tim's Workspace</span>
        <button className="theme-toggle">🌙</button>
      </div>
    </div>
  );
};

export default Header;

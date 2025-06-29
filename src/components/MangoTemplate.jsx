import React, { useState } from 'react';
import './MangoTemplate.css';
import { auth, logOut } from '../firebase';

const MangoTemplate = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userEmail = auth.currentUser ? auth.currentUser.email : 'Guest';

  return (
    <div className={`mango-template ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <div className="body-container">
        <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <header className="header">
            <h1>
              Mango<br />Template
            </h1>
          </header>
          <nav className="menu">
            <ul>
              <li className="menu-item active">Dashboard</li>
              <li className="menu-item">Elements</li>
              <li className="menu-item">Widgets</li>
              <li className="menu-item">Forms</li>
              <li className="menu-item">Tables</li>
              <li className="menu-item">Charts</li>
              <li className="menu-item">Pages</li>
            </ul>
          </nav>
        </aside>
        <div className="main-container">
          <div className="top-bar">
            <nav className="top-nav">
              <div className="left-controls">
                <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
                  &#9776;
                </button>
              </div>
              <div className="right-controls">
                <input type="text" className="search-input" placeholder="Search" />
                <div className="nav-icons">
                  <button className="icon-button" aria-label="Messages">✉️</button>
                  <button className="icon-button" aria-label="Notifications">🔔</button>
                </div>
                <div className="profile-menu">
                  <button className="profile-button" onClick={toggleProfileDropdown}>
                    {userEmail} ▼
                  </button>
                  {profileDropdownVisible && (
                    <div className="profile-dropdown">
                      <a href="#" className="dropdown-item">Profile</a>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
          <main className="content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MangoTemplate;

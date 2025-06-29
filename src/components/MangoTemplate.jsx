import React, { useState } from 'react';
import './MangoTemplate.css';
import { auth, logOut } from '../firebase';
import { 
  FiMenu, 
  FiSearch, 
  FiMessageSquare, 
  FiBell, 
  FiUser, 
  FiLogOut,
  FiHome,
  FiGrid,
  FiLayers,
  FiEdit,
  FiDatabase,
  FiPieChart,
  FiFile,
  FiChevronDown
} from 'react-icons/fi';

const MangoTemplate = ({ 
  children,
  appName = "Mango",
  appShortName = "Template",
  menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/" },
    { icon: <FiGrid />, label: "Elements", path: "/elements" },
    { icon: <FiLayers />, label: "Widgets", path: "/widgets" },
    { icon: <FiEdit />, label: "Forms", path: "/forms" },
    { icon: <FiDatabase />, label: "Tables", path: "/tables" },
    { icon: <FiPieChart />, label: "Charts", path: "/charts" },
    { icon: <FiFile />, label: "Pages", path: "/pages" }
  ],
  activePath = "/",
  onMenuItemClick = (path) => console.log("Navigating to:", path),
  showSearch = true,
  showMessages = true,
  showNotifications = true
}) => {
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

  const user = auth.currentUser;
  const userEmail = user ? user.email : 'Guest';
  const userPhoto = user ? user.photoURL : null;

  return (
    <div className={`mango-template ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <div className="body-container">
        <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <header className="header">
            <h1>
              <span className="logo-primary">{appName}</span>
              <span className="logo-secondary">{appShortName}</span>
            </h1>
          </header>
          <nav className="menu">
            <ul>
              {menuItems.map((item, index) => (
                <li 
                  key={index}
                  className={`menu-item ${activePath === item.path ? 'active' : ''}`}
                  onClick={() => onMenuItemClick(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="main-container">
          <div className="top-bar">
            <nav className="top-nav">
              <div className="left-controls">
                <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
                  <FiMenu />
                </button>
              </div>
              <div className="right-controls">
                {showSearch && (
                  <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input type="text" className="search-input" placeholder="Search..." />
                  </div>
                )}
                <div className="nav-icons">
                  {showMessages && (
                    <button className="icon-button" aria-label="Messages">
                      <FiMessageSquare />
                    </button>
                  )}
                  {showNotifications && (
                    <button className="icon-button" aria-label="Notifications">
                      <FiBell />
                    </button>
                  )}
                </div>
                <div className="profile-menu">
                  <button className="profile-button" onClick={toggleProfileDropdown}>
                    {userPhoto ? (
                      <img src={userPhoto} alt="Profile" className="profile-photo" />
                    ) : (
                      <div className="profile-photo-placeholder">
                        <FiUser />
                      </div>
                    )}
                    <span className="profile-email">{userEmail}</span>
                    <FiChevronDown className={`profile-chevron ${profileDropdownVisible ? 'open' : ''}`} />
                  </button>
                  {profileDropdownVisible && (
                    <div className="profile-dropdown">
                      <a href="#" className="dropdown-item">
                        <FiUser className="dropdown-icon" />
                        <span>Profile</span>
                      </a>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FiLogOut className="dropdown-icon" />
                        <span>Logout</span>
                      </button>
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
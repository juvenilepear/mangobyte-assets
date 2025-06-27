import React from 'react';
import './MangoTemplate.css';

const MangoTemplate = ({ children }) => {
  return (
    <div className="mango-template">
      <header className="header">
        <h1>MangoTemplate</h1>
      </header>
      <div className="body-container">
        <aside className="sidebar">
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
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MangoTemplate;

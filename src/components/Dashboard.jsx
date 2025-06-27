import React, { useState, useEffect } from "react";
import TemplateList from "./TemplateList";
import ComponentList from "./ComponentList";
import "./Dashboard.css";

import ComponentViewer from "./ComponentViewer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h1>Repository Dashboard</h1>
      <div className="dashboard-wrapper">
        <div className="dashboard-left">
          <div className="tabs">
            <button
              className={activeTab === "templates" ? "active" : ""}
              onClick={() => {
                setActiveTab("templates");
                setSelectedItem(null);
              }}
            >
              Templates
            </button>
            <button
              className={activeTab === "components" ? "active" : ""}
              onClick={() => {
                setActiveTab("components");
                setSelectedItem(null);
              }}
            >
              Components
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "templates" ? (
              <TemplateList onSelect={handleSelect} />
            ) : (
              <ComponentList onSelect={handleSelect} />
            )}
          </div>
        </div>
        <div className="dashboard-right">
          <ComponentViewer selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

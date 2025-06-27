import React, { useState } from "react";
import TemplateList from "./TemplateList";
import ComponentList from "./ComponentList";
import "./Dashboard.css";

import ComponentViewer from "./ComponentViewer";
import { logOut } from "../firebase";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      // Optionally, redirect or update UI after logout
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Repository Dashboard</h1>
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
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

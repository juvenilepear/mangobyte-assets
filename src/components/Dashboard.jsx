import React, { useState } from "react";

import "./Dashboard.css";

import { logOut } from "../firebase";
import MangoTemplate from "./MangoTemplate";

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
    <MangoTemplate>
      <div>
        <h1>a</h1>
      </div>
    </MangoTemplate>
  );
};

export default Dashboard;

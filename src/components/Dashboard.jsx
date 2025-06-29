import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Dashboard.css";

import { logOut } from "../firebase";
import MangoTemplate from "./MangoTemplate";

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

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <MangoTemplate
      appName="MiApp"
      appShortName="Mango"
      menuItems={[
        { icon: <FiHome />, label: "Inicio", path: "/" },
        { icon: <FiDatabase />, label: "Productos", path: "/products" },
        { icon: <FiUser />, label: "Usuarios", path: "/users" }
      ]}
      activePath={location.pathname}
      onMenuItemClick={(path) => navigate(path)}
      showNotifications={false}
    >
      {/* Contenido de la página */}
    </MangoTemplate>
  );
};

export default Dashboard;

import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Dashboard.css";

import { logOut } from "../firebase";
import MangoTemplate from "./MangoTemplate";

import * as Icons from "../assets/icons"; 
import CopyButton from "./componentlist/CopyButton/CopyButton";
import ToastContainer from "./componentlist/ToastMessage/ToastContainer";
import ImageGallery from "./componentlist/ImageGallery/ImageGallery";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedItem, setSelectedItem] = useState(null);

  const [images, setImages] = useState([
    {
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mango_-_single.jpg/960px-Mango_-_single.jpg',
      es_portada: true,
      titulo: 'Mango',
    },
  ]);

  const toastRef = useRef(null);

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

  const handleCopyToast = (message) => {
    if (toastRef.current) {
      toastRef.current.addToast(message, 'success', 3000);
    }
  };

  const handleTestToast = () => {
    if (toastRef.current) {
      toastRef.current.addToast('Este es un mensaje de prueba de ToastMessage', 'info', 3000);
    }
  };

  return (
    <MangoTemplate
      appName="MiApp"
      appShortName="Mango"
      menuItems={[
        { icon: <Icons.FiHome />, label: "Inicio", path: "/" },
        { icon: <Icons.FiDatabase />, label: "Productos", path: "/products" },
        { icon: <Icons.FiUser />, label: "Usuarios", path: "/users" }
      ]}
      activePath={location.pathname}
      onMenuItemClick={(path) => navigate(path)}
      showNotifications={false}
    >
      <h1>Dashboard</h1>
      <div className="dashboard-grid-container">
        <div className="dashboard-grid-item">
          <CopyButton textToCopy={"Mango"} onCopy={handleCopyToast} />
        </div>
        <div className="dashboard-grid-item">
          <button onClick={handleTestToast} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Probar ToastMessage
          </button>
        </div>
        <div className="dashboard-grid-item">
          <ImageGallery
            images={images}
            onChange={setImages}
            mode="display"
          />
        </div>
        <div className="dashboard-grid-break" />
        <div className="dashboard-grid-item">
          <ImageGallery
            images={images}
            onChange={setImages}
            mode="edit"
          />
        </div>
      </div>
      <ToastContainer ref={toastRef} />
      
      {/* Contenido de la página */}
    </MangoTemplate>
  );
};

export default Dashboard;

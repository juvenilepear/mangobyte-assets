import React, { useState, useRef,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Dashboard.css";

import { logOut } from "../firebase";
import MangoTemplate from "./MangoTemplate";

import * as Icons from "../assets/icons"; 
import CopyButton from "./componentlist/CopyButton/CopyButton";
import ToastContainer from "./componentlist/ToastMessage/ToastContainer";
import ImageGallery from "./componentlist/ImageGallery/ImageGallery";
import Map from "./componentlist/Map/Map";
import LoadingSpinner from "./componentlist/LoadingSpinner/LoadingSpinner";
import FloatingContactButton from "./componentlist/FloatingButton/FloatingContactButton";
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

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
      descripcion: 'Descripción 1',
    },
  ]);

  const contacts = [
    { icon: <FaWhatsapp />, color: '#25D366', link: 'https://wa.me/1234567890', action: 'link' },
    { icon: <FaFacebook />, color: '#3b5998', link: 'https://facebook.com/yourpage', action: 'link' },
    { icon: <FaInstagram />, color: '#E1306C', link: 'https://instagram.com/yourprofile', action: 'link' },
  ];

  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);
  const [showFloatingContact, setShowFloatingContact] = useState(false);

  useEffect(() => {
    const handleClickToDisable = (e) => {
      setLoading(false);
      window.removeEventListener('click', handleClickToDisable);
    };
    if (loading) {
      window.addEventListener('click', handleClickToDisable);
    }

  }, [loading]);

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
          <h4>CopyButton</h4>
          <CopyButton textToCopy={"Mango"} onCopy={handleCopyToast} />
        </div>
        <div className="dashboard-grid-item">
          <button onClick={handleTestToast} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Probar ToastMessage
          </button>
        </div>
        <div className="dashboard-grid-item">
          <button onClick={(e) => { e.stopPropagation(); setLoading(true); }} style={{ padding: '0.5rem 1rem' }}>
            Activar Loading Spinner
          </button>
          {loading && <LoadingSpinner />}
        </div>
        <div className="dashboard-grid-item">
          <button onClick={() => setShowFloatingContact(!showFloatingContact)} style={{ padding: '0.5rem 1rem' }}>
            {showFloatingContact ? 'Ocultar' : 'Mostrar'} Floating Contact Button
          </button>
          {showFloatingContact && (
            <FloatingContactButton
              contacts={contacts}
              mainText="Contacto"
              mainIcon={<FaWhatsapp color="var(--primary-color)" size="1.6em" />}
              onCopy={(message) => {
                if (toastRef.current) {
                  toastRef.current.addToast(message, 'info', 3000);
                }
              }}
            />
          )}
        </div>
        <div className="dashboard-grid-break" />

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
        <div className="dashboard-grid-break" />
        <div className="dashboard-grid-item">
          <Map
            height="400px"
            markerColor="var(--primary-color)"
            onChangeCoordinates={(coords) => console.log('Coordenadas seleccionadas:', coords)}
          />
        </div>
      </div>
      <ToastContainer ref={toastRef} />
      
      {/* Contenido de la página */}
    </MangoTemplate>
  );
};

export default Dashboard;

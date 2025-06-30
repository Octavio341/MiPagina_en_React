import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Importamos NavLink para detectar ruta activa
import 'bootstrap/dist/css/bootstrap.min.css';
import fondoImagen from './fondo_natvar.jpg'; // Ajusta la ruta según ubicación real

function NatvarUs() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  // Estilos dinámicos para NavLink según activo o no
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#66bb6a' : 'white', // verde claro si activo, blanco si no
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s, color 0.3s',
    padding: '0.5rem 0',
    display: 'block',
    borderRadius: '4px',
    userSelect: 'none',
  });

  return (
    <>
      {/* Encabezado con Bootstrap y fondo importado */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: `url(${fondoImagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '220px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="display-3 fw-bold">CADFICH</h1>
          <p className="fs-3">Modo Usuario</p>
        </div>
      </div>

      {/* Navbar sticky (fijo arriba) */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
        style={{
          borderBottom: '2px solid limegreen',
          position: 'sticky',
          top: 0,
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-0">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContenido"
            aria-controls="navbarContenido"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContenido">
            <ul className="navbar-nav nav-fill w-100">
              {[
                { to: '/collagePadre', label: 'Inicio' },
                { to: '/explorar', label: 'Explorar' },
                { to: '/estadistica', label: 'Estadísticas' },
                { to: '/contacto', label: 'Contacto' },

              ].map(({ to, label }) => (
                <li key={to} className="nav-item" style={{ flexGrow: 1, textAlign: 'center' }}>
                  <NavLink to={to} style={linkStyle} className="nav-link">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Estilos para efecto :active y hover */}
      <style>
        {`
          .nav-link:active {
            background-color: #388e3c !important; /* verde medio oscuro */
            color: white !important;
          }
          .nav-link:hover {
            background-color: #4caf50 !important; /* verde claro */
            color: white !important;
          }
        `}
      </style>
    </>
  );
}

export default NatvarUs;

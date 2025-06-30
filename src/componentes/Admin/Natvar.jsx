import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import fondoImagenAdmin from './fondo_natvar_admin.jpg'; // Ajusta la ruta si es necesario

function Natvar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#66bb6a' : 'white',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s, color 0.3s',
    padding: '0.5rem 0',
    display: 'block',
    borderRadius: '4px',
    userSelect: 'none',
  });

  return (
    <>
      {/* Encabezado con fondo e información del usuario */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: `url(${fondoImagenAdmin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '240px',
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
          {usuario && (
            <>
              <p className="fs-5 mb-1 text-warning text-capitalize">
                Rol: <strong>{usuario.rol}</strong>
              </p>
              <p className="fs-6 text-info">
                Bienvenido, <strong>{usuario.nombre}</strong>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Navbar sticky */}
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
            data-bs-target="#navbarContenidoAdmin"
            aria-controls="navbarContenidoAdmin"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContenidoAdmin">
            <ul className="navbar-nav nav-fill w-100">
              {[
                { to: '/vista', label: 'Vista' },
                { to: '/publicar', label: 'Publicar' },
                { to: '/panel', label: 'Panel Edición' },
                { to: '/perfil', label: 'Perfil' },
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

      {/* Efectos hover y active */}
      <style>
        {`
          .nav-link:active {
            background-color: #388e3c !important;
            color: white !important;
          }
          .nav-link:hover {
            background-color: #4caf50 !important;
            color: white !important;
          }
        `}
      </style>
    </>
  );
}

export default Natvar;

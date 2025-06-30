import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Header() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        borderBottom: '3px solid cyan',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link className="navbar-brand fw-bold text-info me-4" to="/" style={{ fontSize: '1.6rem' }}>
        🌐 LIUNC
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContenido"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContenido">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/perfil">
              <i className="bi bi-person-circle me-1"></i> Perfil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/publicar">
              <i className="bi bi-upload me-1"></i> Publicar
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/vista">
              <i className="bi bi-eye me-1"></i> Vista
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/panel">
              <i className="bi bi-pencil-square me-1"></i> Edición
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          {usuario ? (
            <>
              <span className="badge bg-info text-dark px-3 py-2 rounded-pill shadow-sm">
                <i className="bi bi-person-fill me-1"></i> {usuario.nombre}
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={cerrarSesion}>
                <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
              </button>
            </>
          ) : (
            <span className="text-light">No has iniciado sesión</span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

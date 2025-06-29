import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow" style={{ borderBottom: '2px solid cyan' }}>
      <Link className="navbar-brand fw-bold text-info" to="/">
        🌐 LIUNC
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContenido">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContenido">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/perfil">Perfil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/publicar">Publicar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vista">Vista</Link>
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {usuario ? (
            <>
              <span className="badge rounded-pill text-bg-info me-3">
                <i className="bi bi-person-fill"></i> {usuario.nombre}
              </span>
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

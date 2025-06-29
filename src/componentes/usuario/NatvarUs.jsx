import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NatvarUs() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow" style={{ borderBottom: '2px solid limegreen' }}>
      <Link className="navbar-brand fw-bold text-success" to="/">
        🧭 LIUNC Usuario
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContenido">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContenido">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/explorar">Explorar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mapa">Mapa</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacto">Contacto</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vistaus">Vista</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NatvarUs;


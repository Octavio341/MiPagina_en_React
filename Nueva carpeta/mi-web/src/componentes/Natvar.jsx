import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <header style={{ padding: '1rem', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {usuario ? (
          <strong>Interactuando con {usuario.nombre}</strong>
        ) : (
          <span>No has iniciado sesión</span>
        )}
      </div>
      <nav>
        <Link to="/bienvenido">Bienvenido</Link>{' | '}
        <Link to="/perfil">Perfil</Link>{' | '}
        <Link to="/">Home</Link>
        <Link to="/publicar">Publicar</Link>{' | '}
      </nav>
    </header>
  );
}

export default Header;

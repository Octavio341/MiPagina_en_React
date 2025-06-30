import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Perfil({ setModoAdmin }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
        <div className="alert alert-warning text-center shadow-lg" style={{ maxWidth: '500px' }}>
          <h4>⚠️ Acceso restringido</h4>
          <p>Debes iniciar sesión como administrador para publicar fichas.</p>
          <Link to="/sesion" className="btn btn-primary shadow">Iniciar sesión</Link>
        </div>
      </div>
    );
  }

  const cerrarSesion = () => {
    fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario.usuario }),
    })
      .then(res => res.json())
      .then(() => {
        localStorage.removeItem('usuario');
        if (setModoAdmin) setModoAdmin(false);
        navigate('/');
      })
      .catch(err => console.error('Error al cerrar sesión:', err));
  };

  return (
    <div className="w-100 h-100" style={{ backgroundColor: '#e9ebee', minHeight: '100vh' }}>
      {/* Portada completa */}
      <div
        className="w-100"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/9d/db/97/9ddb97ba6d2846c29a8ecd5f9fabb8c7.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          position: 'relative',
        }}
      >
        {/* Imagen de perfil flotante */}
       {/* Imagen de perfil flotante - ahora más grande */}
        <div
          style={{
            position: 'absolute',
            bottom: '-110px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: '8px solid white',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
          }}
        >
          <img
            src={usuario.Perfil || 'https://via.placeholder.com/220?text=Perfil'}
            alt="Perfil"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container-fluid pt-5 mt-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold">{usuario.nombre}</h1>
          <span className="badge bg-dark text-light px-3 py-2">{usuario.rol}</span>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 fs-5">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light">
                    <i className="bi bi-person-lines-fill text-primary me-2"></i>
                    <strong>Usuario:</strong> {usuario.usuario}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                    <strong>Email:</strong> {usuario.email}
                  </li>
                  <li className="list-group-item bg-light">
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    <strong>Activo:</strong> {usuario.activo ? '✅ Sí' : '❌ No'}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-calendar-event text-primary me-2"></i>
                    <strong>Fecha de creación:</strong>{' '}
                    {usuario.fecha_creacion
                      ? new Date(usuario.fecha_creacion).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Desconocido'}
                  </li>
                </ul>

                <button
                  onClick={cerrarSesion}
                  className="btn btn-danger mt-4 w-100 shadow"
                >
                  🔓 Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espacio final */}
      <div style={{ height: '100px' }}></div>
    </div>
  );
}

export default Perfil;

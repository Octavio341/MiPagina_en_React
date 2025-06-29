import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Perfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">
          <h5>⚠️ Modo Usuario</h5>
          <p>Para publicar fichas, solo para admins, inicia sesión.</p>
          <Link to="/sesion">
        <button>Ir a la sesión</button>
      </Link>
        </div>
      </div>
    );
  }

  function cerrarSesion() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario.usuario }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.mensaje);
        localStorage.removeItem('usuario');
        navigate(0); // 🔄 Fuerza recarga sin salir de SPA
      })
      .catch(err => {
        console.error('Error al cerrar sesión:', err);
      });
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-lg border-primary border-2" style={{ maxWidth: '500px', backgroundColor: '#f0f8ff' }}>
        <div className="card-body text-center">
          <h3 className="mb-3 text-primary fw-bold">
            👤 Perfil del Usuario
          </h3>

          {usuario.Perfil ? (
            <img
              src={usuario.Perfil}
              alt="Foto de perfil"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Error";
              }}
              className="rounded-circle shadow-sm mb-7 border border-3 border-info"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <p className="text-muted">No hay imagen de perfil disponible.</p>
          )}

          <ul className="list-group list-group-flush text-start mt-3">
            <li className="list-group-item">
              <i className="bi bi-person-circle me-2 text-primary"></i>
              <strong>Nombre:</strong> <span className="badge bg-secondary">{usuario.nombre}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              <strong>Usuario:</strong> {usuario.usuario}
            </li>
            <li className="list-group-item">
              <i className="bi bi-envelope-fill me-2 text-primary"></i>
              <strong>Email:</strong> <span className="text-dark">{usuario.email}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-award-fill me-2 text-primary"></i>
              <strong>Rol:</strong> <span className="badge bg-warning text-dark">{usuario.rol}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-check-circle-fill me-2 text-primary"></i>
              <strong>Activo:</strong> {usuario.activo ? '✅ Sí' : '❌ No'}
            </li>

            <li className="list-group-item">
              <i className="bi bi-calendar-check-fill me-2 text-primary"></i>
              <strong>Creado:</strong>{' '}
              {usuario && usuario.fecha_creacion
                ? new Date(usuario.fecha_creacion).toLocaleString('es-MX', {
                    timeZone: 'America/Mexico_City',
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Desconocida'}
            </li>
          </ul>

          <button
            onClick={cerrarSesion}
            className="btn btn-danger mt-4 w-100 shadow-sm"
          >
            🔓 Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;

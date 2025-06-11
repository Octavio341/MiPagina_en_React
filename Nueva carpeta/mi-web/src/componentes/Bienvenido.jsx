import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  // Obtener usuario desde localStorage y parsear JSON
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  // Si no hay usuario en localStorage
  if (!usuario) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem', color: 'red' }}>
        No hay usuario registrado. Por favor, inicia sesión.
      </p>
    );
  }
  
  
  return (
    
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1.5rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Perfil de usuario</h2>

      {usuario.Perfil && (
        <img
          src={usuario.Perfil}
          alt="Foto de perfil"
          onError={(e) => (e.target.style.display = 'none')} // Oculta si la imagen falla
          style={{
            display: 'block',
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            boxShadow: '0 0 8px rgba(0,0,0,0.2)',
          }}
        />
      )}

      

      <p><strong>Nombre:</strong> {usuario.nombre || 'No disponible'}</p>
      <p><strong>Usuario:</strong> {usuario.usuario || 'No disponible'}</p>
      <p><strong>Email:</strong> {usuario.email || 'No proporcionado'}</p>
      <p><strong>Rol:</strong> {usuario.rol || 'No asignado'}</p>
      <p><strong>Activo:</strong> {usuario.activo ? 'Sí' : 'No'}</p>
      <p><strong>ID:</strong> {usuario._id || 'Desconocido'}</p>
      <p>
        <strong>Fecha de creación:</strong>{' '}
        {usuario.fecha_creacion
          ? new Date(usuario.fecha_creacion).toLocaleString()
          : 'Desconocida'}
      </p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
      
     

    </div>
  );

  function cerrarSesion() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) return; // no hay sesión

    fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario.usuario }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.mensaje);
        // Limpia localStorage
        localStorage.removeItem('usuario');
        // Redirige a login o donde quieras
        window.location.href = '/'; 
      })
      .catch(err => {
        console.error('Error al cerrar sesión:', err);
      });
  }
}




export default Perfil;

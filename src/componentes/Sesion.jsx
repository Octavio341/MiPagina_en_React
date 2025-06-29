import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegistro() {
  const navigate = useNavigate();
  const [modoRegistro, setModoRegistro] = useState(false);

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('user');
  const [perfil, setPerfil] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    if (!usuario || !password) {
      setError('Usuario y contraseña son requeridos.');
      return;
    }

    if (modoRegistro) {
      if (!nombre || !email) {
        setError('Por favor completa todos los campos para registrarte.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            usuario,
            email,
            rol,
            password,
            activo: true,
            Perfil: perfil,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registro exitoso, ahora inicia sesión.');
          setModoRegistro(false);
          setPassword('');
          setNombre('');
          setEmail('');
          setPerfil('');
          setError('');
        } else {
          setError(data.mensaje || 'Error en el registro');
        }
      } catch (error) {
        setError('Error de conexión con el servidor');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
          console.log(JSON.parse(localStorage.getItem('usuario')));

          window.location.href = '/perfil';
        } else {
          setError(data.mensaje || 'Error en el login');
        }
      } catch (error) {
        setError('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 bg-dark text-light" style={{ width: '100%', maxWidth: '450px', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 text-info">
          {modoRegistro ? 'Registro' : 'Iniciar Sesión'}
        </h2>

        <form onSubmit={handleSubmit}>
          {modoRegistro && (
            <>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="gestor">Gestor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="URL Foto de Perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)} />
              </div>
            </>
          )}

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-outline-info w-100">
            {modoRegistro ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <p
          className="mt-3 text-center"
          style={{ cursor: 'pointer', color: '#0dcaf0' }}
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setError('');
          }}
        >
          {modoRegistro
            ? '¿Ya tienes cuenta? Inicia sesión aquí'
            : '¿No tienes cuenta? Regístrate aquí'}
        </p>

        {error && (
          <div className="alert alert-danger mt-3 p-2 text-center" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginRegistro;

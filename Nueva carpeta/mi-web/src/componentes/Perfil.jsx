import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegistro() {
  const navigate = useNavigate();
  const [modoRegistro, setModoRegistro] = useState(false); // false = login, true = registro

  // Campos comunes
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Campos registro extra
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('user');
  const [perfil, setPerfil] = useState(''); // Puede ser URL o base64 o campo para subir imagen

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario || !password) {
      setError('Usuario y contraseña son requeridos.');
      return;
    }

    if (modoRegistro) {
      // Validar datos registro
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
          // Opcional: limpiar campos o dejar usuario cargado para login rápido
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
      // Login
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, password }),
        });

        const data = await response.json();

        if (response.ok) {
          window.location.reload(); 
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
          window.location.reload(); 
          navigate('/bienvenido');
        } else {
          setError(data.mensaje || 'Error en el login');
        }
      } catch (error) {
        setError('Error de conexión con el servidor');
      }
    }
  };

  return (
    
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>{modoRegistro ? 'Registro' : 'Iniciar sesión'}</h2>
      <form onSubmit={handleSubmit}>
        {modoRegistro && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="user">Gestor</option>
              <option value="admin">Administrador</option>
            </select>
            <input
              type="text"
              placeholder="URL Foto de Perfil"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{modoRegistro ? 'Registrarse' : 'Iniciar sesión'}</button>
      </form>
      <p style={{ marginTop: '1rem', cursor: 'pointer', color: 'blue' }}
         onClick={() => {
           setModoRegistro(!modoRegistro);
           setError('');
         }}>
        {modoRegistro
          ? '¿Ya tienes cuenta? Inicia sesión aquí'
          : '¿No tienes cuenta? Regístrate aquí'}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
}

export default LoginRegistro;

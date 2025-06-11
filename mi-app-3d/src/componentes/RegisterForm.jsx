// componentes/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ setUsuario }) {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuarioInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        nombre,
        usuario,
        email,
        password
      });
      localStorage.setItem('usuario', JSON.stringify(res.data));
      setUsuario(res.data);
    } catch (error) {
      alert('Error al registrarse: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="Usuario" onChange={e => setUsuarioInput(e.target.value)} />
      <input type="email" placeholder="Correo" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;

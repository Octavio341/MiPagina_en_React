import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página Home</h1>
      <button onClick={() => navigate('/perfil')}>Ir a Perfil</button>
      <button onClick={() => navigate('/bienvenido')}>Ir a Bienvenido</button>
    </div>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Mapa from './Mapa'; // Asegúrate de que la ruta sea correcta
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Mapa/>
    </div>
  );
};

export default Home;

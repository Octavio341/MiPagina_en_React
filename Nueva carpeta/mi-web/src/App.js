import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./componentes/Home";
import Perfil from "./componentes/Perfil";
import Bienvenido from "./componentes/Bienvenido";
import Natvar from "./componentes/Natvar";
import Publicar from "./componentes/Admin/publicar"; // Asumiendo que este es el componente de publicación

function App() {
  return (
     <Router>
      <Natvar /> {/* Se muestra en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bienvenido" element={<Bienvenido />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/publicar" element={<Publicar />} /> {/* Asumiendo que Perfil maneja la publicación */}
        {/* Puedes agregar más rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
}


export default App;


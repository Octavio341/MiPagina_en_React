import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./componentes/Home";
import Sesion from "./componentes/Sesion";
import Perfil from "./componentes/Perfil";
import Natvar from "./componentes/Natvar";
import Publicar from "./componentes/Admin/publicar"; // Asumiendo que este es el componente de publicación
import Vista from './componentes/Admin/vista';

function App() {
  return (
     <Router>
      <Natvar /> {/* Se muestra en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/publicar" element={<Publicar />} /> {/* Asumiendo que Perfil maneja la publicación */}
        <Route path="/vista" element={<Vista />} /> {/* Asumiendo que Vista maneja la publicación */}
        {/* Puedes agregar más rutas aqí según sea necesario */}
      </Routes>
    </Router>
  );
}


export default App;


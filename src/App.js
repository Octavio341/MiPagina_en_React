import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Natvar from "./componentes/Admin/Natvar";
import Vista from './componentes/Admin/vista';
import Perfil from "./componentes/Admin/Perfil";
import Publicar from "./componentes/Admin/Publicar";
import Sesion from "./componentes/Admin/Sesion";

import NatvarUs from './componentes/usuario/NatvarUs';
import VistaUs from './componentes/usuario/vistaUs';
import Contacto from './componentes/usuario/Contacto';
import ExplorarUs from './componentes/usuario/ExplorarUs';
import MapaBUs from './componentes/usuario/MapaBUs';

function App() {
  const [modoAdmin, setModoAdmin] = useState(false);

  return (
    <>
      {/* Navbar */}
      {modoAdmin ? <Natvar /> : <NatvarUs />}

      {/* Botón cambiar modo */}
      <button
        onClick={() => setModoAdmin(!modoAdmin)}
        style={{ position: 'fixed', top: 50, right: 10, zIndex: 1000 }}
      >
        Cambiar a {modoAdmin ? 'Usuario' : 'Admin'}
      </button>

      {/* Rutas según modo */}
      <Routes>
        {modoAdmin ? (
          <>
            <Route path="/" element={<Vista />} />
            <Route path="/vista" element={<Vista />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/publicar" element={<Publicar />} />
            <Route path="/sesion" element={<Sesion />} />
            {/* Otras rutas admin */}
            {/* Ruta comodín: si no coincide, va a /vista */}
            <Route path="*" element={<Navigate to="/vista" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<VistaUs />} />
            <Route path="/vistaus" element={<VistaUs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/explorar" element={<ExplorarUs />} />
            <Route path="/mapa" element={<MapaBUs />} />
            {/* Otras rutas usuario */}
            {/* Ruta comodín: si no coincide, va a /explorar */}
            <Route path="*" element={<Navigate to="/vistaus" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

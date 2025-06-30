import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Natvar from "./componentes/Admin/Natvar";
import Vista from './componentes/Admin/vista';
import Perfil from "./componentes/Admin/Perfil";
import Publicar from "./componentes/Admin/Publicar";
import Sesion from "./componentes/Admin/Sesion";
import PanelSimulacion from './componentes/Admin/PanelSimulacion';

import NatvarUs from './componentes/usuario/NatvarUs';
import VistaUs from './componentes/usuario/vistaUs';
import Contacto from './componentes/usuario/Contacto';
import ExplorarUs from './componentes/usuario/ExplorarUs';
import Estadistica from './componentes/usuario/Estadistica';
import Acerca from './componentes/Acerca'; // nuevo componente
import Collage from './componentes/usuario/Collage'
import CollagePadre from './componentes/usuario/CollagePadre';

function App() {
  const [modoAdmin, setModoAdmin] = useState(false);

  return (
    <>
      {modoAdmin ? <Natvar /> : <NatvarUs />}
      <button
        onClick={() => setModoAdmin(!modoAdmin)}
        style={{ position: 'fixed', top: '50px', right: '10px', zIndex: 1000 }}
      >
        Cambiar a {modoAdmin ? 'Usuario' : 'Admin'}
      </button>

      <Routes>
        {modoAdmin ? (
          <>
            <Route path="/" element={<Vista />} />
            <Route path="/vista" element={<Vista />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/publicar" element={<Publicar />} />
            <Route path="/sesion" element={<Sesion />} />
            <Route path="/panel" element={<PanelSimulacion />} />
            <Route path="*" element={<Navigate to="/vista" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<VistaUs />} />
            <Route path="/vistaus" element={<VistaUs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/explorar" element={<ExplorarUs />} />
            <Route path="/estadistica" element={<Estadistica />} />
            <Route path="/acerca" element={<Acerca />} /> {/* nueva ruta */}
            <Route path="/collage" element={<Collage />} /> {/* nueva ruta */}
            <Route path="/collagePadre" element={<CollagePadre />} />
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

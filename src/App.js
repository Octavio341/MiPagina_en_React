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
import Acerca from './componentes/Acerca';
import Collage from './componentes/usuario/Collage';
import CollagePadre from './componentes/usuario/CollagePadre';
import Footer from './componentes/usuario/Footer';

function App() {
  const [modoAdmin, setModoAdmin] = useState(false);

  return (
    <>
      {modoAdmin ? <Natvar /> : <NatvarUs />}

      <Routes>
        {modoAdmin ? (
          <>
            <Route
              path="/"
              element={<Vista />}
            />
            <Route
              path="/vista"
              element={<Vista />}
            />
            <Route
              path="/perfil"
              element={<Perfil setModoAdmin={setModoAdmin} />} // Pasamos setModoAdmin para cerrar sesión
            />
            <Route
              path="/publicar"
              element={<Publicar />}
            />
            <Route
              path="/collage"
              element={<Collage />}
            />
            <Route
              path="/sesion"
              element={<Sesion setModoAdmin={setModoAdmin} />} // Para activar modo admin al iniciar sesión
            />
            <Route
              path="/panel"
              element={<PanelSimulacion />}
            />
            <Route
              path="*"
              element={<Navigate to="/vista" replace />}
            />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={<CollagePadre />}
            />
            <Route
              path="/contacto"
              element={<Contacto />}
            />
            <Route
              path="/explorar"
              element={<ExplorarUs />}
            />
            <Route
              path="/estadistica"
              element={<Estadistica />}
            />
            <Route
              path="/acerca"
              element={<Acerca />}
            />
            <Route
              path="/collage"
              element={<Collage />}
            />
            <Route
              path="/collagePadre"
              element={<CollagePadre />}
            />
            <Route
              path="/perfil"
              element={<Perfil />}
            />
            <Route
              path="/sesion"
              element={<Sesion setModoAdmin={setModoAdmin} />}
            />
            <Route
              path="*"
              element={<Navigate to="/collagePadre" replace />}
            />
          </>
        )}
      </Routes>

      {!modoAdmin && <Footer />}
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

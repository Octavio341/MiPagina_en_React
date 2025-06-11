
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./componentes/Navbar";
import Inicio from "./componentes/Inicio";
import FichaPlano from "./componentes/FichaPlano";
import Admin from "./componentes/Admin";
import PerfilEspacio from "./componentes/PerfilEspacio";
import Adm_inicio from "./componentes/modo admin/Adm_inicio";
import NavbarAdm from "./componentes/modo admin/NavbarAdm";
import AdminInfo from "./componentes/modo admin/AdminInfo";
import Perfil from "./componentes/modo admin/Perfil";

import "bootstrap/dist/css/bootstrap.min.css";
// Componente para rutas privadas que solo se pueden ver si el usuario está logueado
const RutaPrivada = ({ children }) => {
  // Obtenemos usuario guardado en localStorage
  const user = localStorage.getItem("usuarioLogueado");
  // Si no hay usuario, redirigimos a la página de login
  if (!user) return <Navigate to="/admin" replace />;
  // Si hay usuario, mostramos el componente hijo (contenido protegido)
  return children;
};

function App() {
  // Estado para saber si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para saber si el usuario tiene rol admin
  const [isAdmin, setIsAdmin] = useState(false);
  // Estado para guardar los datos del admin si está logueado
  const [adminData, setAdminData] = useState(null);

  // Este useEffect se ejecuta al montar el componente
  // Sirve para restaurar la sesión si ya hay usuario guardado en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      setIsLoggedIn(true);
      // Si el usuario tiene rol admin, activamos modo admin y guardamos sus datos
      if (usuarioObj.rol === "admin") {
        setIsAdmin(true);
        setAdminData(usuarioObj);
      } else {
        // Si no es admin, desactivamos modo admin y limpiamos datos
        setIsAdmin(false);
        setAdminData(null);
      }
    }
  }, []);

  // Función que se ejecuta cuando el usuario hace login correctamente
  const handleLogin = (usuario) => {
    // Guardamos la info del usuario en localStorage para persistir sesión
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
    // Actualizamos estados para indicar que está logueado
    setIsLoggedIn(true);

    // Si el rol es admin, activamos modo admin y guardamos datos
    if (usuario.rol === "admin") {
      setIsAdmin(true);
      setAdminData(usuario);
    } else {
      // Si no, modo admin desactivado y datos limpios
      setIsAdmin(false);
      setAdminData(null);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Quitamos usuario guardado
    localStorage.removeItem("usuarioLogueado");
    // Reseteamos estados
    setIsLoggedIn(false);
    setIsAdmin(false);
    setAdminData(null);
  };

  return (
    
    <Router>
      {/* Si no hay usuario logueado, mostramos solo la página de login */}
      {!isLoggedIn ? (
        
        <Routes>
             {/* Página de inicio normal */}
            <Route path="/inicio" element={<Inicio />} />
            {/* Otra página normal */}
            <Route path="/ficha" element={<FichaPlano />} />
            {/* Página de perfil normal */}
            <Route path="/admin" element={<Admin />} />
            {/* Redirige cualquier ruta desconocida a inicio */}
        </Routes>
      ) : isAdmin ? (
        // Si el usuario es admin, mostramos menú y rutas admin
        <>
          {/* Barra de navegación admin con función logout */}
          <NavbarAdm onLogout={handleLogout} />
          <Routes>
            {/* Página con información del admin */}
            <Route path="/adminInfo" element={<AdminInfo />} />
            {/* Página de inicio admin, recibe datos admin */}
            <Route path="/adm_ini" element={<Adm_inicio adminData={adminData} />} />
            {/* Ruta protegida para perfil admin */}
            <Route path="/perfil" element={
              <RutaPrivada>
                <Perfil />
              </RutaPrivada>
            } />
            {/* Cualquier otra ruta redirige a inicio admin */}
            <Route path="*" element={<Navigate to="/adm_ini" replace />} />
          </Routes>
        </>
      ) : (
        // Si está logueado pero no es admin, mostramos rutas normales
        <>
          {/* Barra de navegación normal con logout */}
          <Navbar onLogout={handleLogout} />
          <Routes>
            {/* Página de inicio normal */}
            <Route path="/inicio" element={<Inicio />} />
            {/* Otra página normal */}
            <Route path="/ficha" element={<FichaPlano />} />
            {/* Página de perfil normal */}
            <Route path="/admin" element={<Admin />} />
            {/* Redirige cualquier ruta desconocida a inicio */}
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;

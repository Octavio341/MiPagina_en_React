import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarAdm.css"// Asegúrate de tener un archivo CSS para estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🚀 Mi App</div>
      <div className="navbar-links">
        <p>Estas en modo administrador</p>
        <NavLink to="/inicio" className={({ isActive }) => isActive ? "active" : ""}>
          Inicio
        </NavLink>
        <NavLink to="/adminInfo" className={({ isActive }) => isActive ? "active" : ""}>
          Iniciar sesión
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
          aceso sesion
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

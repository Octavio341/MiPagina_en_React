import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🚀 Mi App</div>
      <div className="navbar-links">
        <p>Estas en modo Usurio</p>
        <NavLink to="/inicio" className={({ isActive }) => isActive ? "active" : ""}>
          Inicio
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
          Iniciar sesión
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
          acceso admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Perfil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUsuario(location.state.user);
      localStorage.setItem("usuarioLogueado", JSON.stringify(location.state.user));
    } else {
      const userStorage = localStorage.getItem("usuarioLogueado");
      if (userStorage) {
        setUsuario(JSON.parse(userStorage));
      } else {
        navigate("/"); // Redirige al login si no hay usuario
      }
    }
  }, [location, navigate]);

  if (!usuario) return <p>Cargando perfil...</p>;

  if (!usuario.activo) return <p>Tu cuenta no está activa. Contacta al administrador.</p>;

  return (
    <div className="container mt-5">
      <h2>Perfil de {usuario.nombre}</h2>
      <p><strong>Usuario:</strong> {usuario.usuario}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      {/* Más datos */}
    </div>
  );
};

export default Perfil;

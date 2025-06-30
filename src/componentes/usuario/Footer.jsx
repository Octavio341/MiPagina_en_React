import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  const navigate = useNavigate();

  const irModoAdmin = () => {
    navigate("/perfil"); // Navega al componente Perfil
  };

  return (
    <footer
      className="text-white pt-5 pb-3 mt-5"
      style={{
        background: "linear-gradient(135deg, #0d1117, #161b22)",
        color: "#ffffffcc",
        borderTop: "2px solid #30363d",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <div className="container-fluid px-5">
        <div className="row gy-4 text-center text-md-start">

          {/* Logo y descripción */}
          <div className="col-md-4">
            <h4 className="fw-bold text-white mb-3">🌐 MiAplicación</h4>
            <p style={{ color: "#8b949e" }}>
              Comparte conocimiento, conecta ideas y accede a contenido útil desde cualquier lugar.
            </p>
            <button
              onClick={irModoAdmin}
              className="btn btn-outline-light btn-sm mt-3"
            >
              Ir a modo Admin
            </button>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4">
            <h5 className="fw-semibold text-white mb-3">Navegación</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none" style={{ color: "#c9d1d9" }}>Inicio</a></li>
              <li><a href="/explorar" className="text-decoration-none" style={{ color: "#c9d1d9" }}>Explorar</a></li>
              <li><a href="/contacto" className="text-decoration-none" style={{ color: "#c9d1d9" }}>Contacto</a></li>
              <li><a href="/acerca" className="text-decoration-none" style={{ color: "#c9d1d9" }}>Acerca</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-4">
            <h5 className="fw-semibold text-white mb-3">Contáctanos</h5>
            <p className="mb-1" style={{ color: "#8b949e" }}>📧 li_octavio@unca.edu.mx</p>
            <p className="mb-1" style={{ color: "#8b949e" }}>📞 +52 123 456 7890</p>
            <p style={{ color: "#8b949e" }}>📍 Oaxaca, México</p>
          </div>
        </div>

        <hr className="mt-4 border-secondary" />

        <div className="text-center small" style={{ color: "#6e7681" }}>
          &copy; {new Date().getFullYear()} MiAplicación. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

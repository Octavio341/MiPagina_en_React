// src/componentes/FichaPlano.jsx
import React, { useState } from "react";
import './ficha.css';

function FichaPlano() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className={`card shadow ficha-brillante ${hovered ? "hovered" : ""}`}
        style={{ width: "50rem", transition: "0.3s" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="card-body">
          <h5 className="card-title">Ficha Interactiva Brillante</h5>
          <p className="card-text">
            Durante la práctica, el estudiante reforzará sus conocimientos en desarrollo web y React, adquiriendo experiencia valiosa.
          </p>
          <button className="btn btn-light">Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default FichaPlano;


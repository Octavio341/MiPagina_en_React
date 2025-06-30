import React, { useState } from "react";
import Inicio from "./inicio";
import Carrusel from "./Carrusel";

export default function Padre() {
  const [vista, setVista] = useState("inicio"); // 'inicio' o 'carrusel'
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);

  const abrirFicha = (ficha) => {
    setFichaSeleccionada(ficha);
    setVista("carrusel");
  };

  const cerrarCarrusel = () => {
    setFichaSeleccionada(null);
    setVista("inicio");
  };

  return (
    <div>
      {vista === "inicio" && <Inicio onAbrirFicha={abrirFicha} />}
      {vista === "carrusel" && (
        <Carrusel ficha={fichaSeleccionada} onCerrar={cerrarCarrusel} />
      )}
    </div>
  );
}

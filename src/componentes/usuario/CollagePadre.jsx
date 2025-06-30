import React, { useState } from "react";
import Collage from "./Collage";
import Carrusel from "./Carrusel";

export default function CollagePadre() {
  // Estado para controlar qué ficha está seleccionada; null significa que estamos en el collage
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);

  // Función para abrir el carrusel con la ficha seleccionada
  const abrirFicha = (ficha) => setFichaSeleccionada(ficha);

  // Función para cerrar el carrusel y volver al collage
  const cerrarCarrusel = () => setFichaSeleccionada(null);

  return (
    <>
      {/* Si no hay ficha seleccionada, mostramos el collage */}
      {!fichaSeleccionada && <Collage onAbrirFicha={abrirFicha} />}

      {/* Si hay ficha seleccionada, mostramos el carrusel */}
      {fichaSeleccionada && (
        <Carrusel ficha={fichaSeleccionada} onClose={cerrarCarrusel} />
      )}
    </>
  );
}

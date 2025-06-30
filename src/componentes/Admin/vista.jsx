import React, { useState, useEffect } from "react";
import CarruselFicha from '../usuario/Carrusel'
import Collage from "../usuario/Collage";
export default function CollagePadre() {
  // Estado para lista completa de fichas
  const [fichas, setFichas] = useState([]);
  // Estado para la ficha que se abre en detalle (carrusel)
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  // Controla si está cargando las fichas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga las fichas al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/api/fichas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar fichas");
        return res.json();
      })
      .then((data) => {
        setFichas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Función para abrir el carrusel con la ficha seleccionada
  const abrirFicha = (ficha) => {
    setFichaSeleccionada(ficha);
  };

  // Función para cerrar el carrusel y regresar al collage
  const cerrarCarrusel = () => {
    setFichaSeleccionada(null);
  };

  // Mientras carga, muestra mensaje
  if (loading) return <div className="text-center my-5">Cargando fichas...</div>;
  if (error) return <div className="text-center my-5 text-danger">Error: {error}</div>;

  return (
    <>
      {/* Si no hay ficha seleccionada, mostrar el collage con fichas */}
      {!fichaSeleccionada && (
        <Collage fichas={fichas} onAbrirFicha={abrirFicha} />
      )}

      {/* Si hay ficha seleccionada, mostrar el carrusel con esa ficha */}
      {fichaSeleccionada && (
        <CarruselFicha ficha={fichaSeleccionada} onClose={cerrarCarrusel} />
      )}
    </>
  );
}

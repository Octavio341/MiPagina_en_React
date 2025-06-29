import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ExploradorConDetalle from "./ExploradorConDetalle";

export default function Explorador() {
  const [fichas, setFichas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [orden, setOrden] = useState("fecha");
  const [empresasUnicas, setEmpresasUnicas] = useState([]);
  const [coordsSeleccionadas, setCoordsSeleccionadas] = useState([19.4326, -99.1332]);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);

  useEffect(() => {
    obtenerFichas();
  }, []);

  const obtenerFichas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/fichas");
      setFichas(res.data);
      const empresas = [...new Set(res.data.map(f => f.contactoInformacion?.titulo))];
      setEmpresasUnicas(empresas);
    } catch (err) {
      console.error("Error al cargar fichas:", err);
    }
  };

  const fichasFiltradas = fichas
    .filter(f => {
      const textoBusqueda = busqueda.toLowerCase();
      return (
        f.titulo.toLowerCase().includes(textoBusqueda) ||
        f.contenidoGeneral?.titulo?.toLowerCase().includes(textoBusqueda) ||
        f.contactoInformacion?.titulo?.toLowerCase().includes(textoBusqueda)
      );
    })
    .filter(f => (empresaFiltro ? f.contactoInformacion?.titulo === empresaFiltro : true))
    .sort((a, b) => {
      switch (orden) {
        case "calificacion":
          return (b.calificacion || 0) - (a.calificacion || 0);
        case "fecha":
          return new Date(b.fecha) - new Date(a.fecha);
        case "vistas":
          return (b.contar_vista || 0) - (a.contar_vista || 0);
        case "descargas":
          return (b.recomendaciones?.contador_descargas || 0) - (a.recomendaciones?.contador_descargas || 0);
        default:
          return 0;
      }
    });

  const seleccionarUbicacion = (ficha) => {
    const coords = ficha.contactoInformacion?.mapa?.coordinates;
    if (coords && coords.length === 2) {
      setCoordsSeleccionadas([coords[1], coords[0]]);
    }
  };

  const abrirDetalle = (ficha) => {
    setFichaSeleccionada(ficha);
  };

  const cerrarDetalle = () => {
    setFichaSeleccionada(null);
  };

  if (fichaSeleccionada) {
    return <ExploradorConDetalle ficha={fichaSeleccionada} onCerrar={cerrarDetalle} />;
  }

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Explorar Fichas</h2>
      <div className="row">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por nombre de empresa"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={empresaFiltro}
            onChange={(e) => setEmpresaFiltro(e.target.value)}
          >
            <option value="">Todas las empresas</option>
            {empresasUnicas.map((empresa, i) => (
              <option key={i} value={empresa}>
                {empresa}
              </option>
            ))}
          </select>

          <select
            className="form-select mb-3"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="fecha">Más recientes</option>
            <option value="calificacion">Mejor calificados</option>
            <option value="vistas">Más vistos</option>
            <option value="descargas">Más descargados</option>
          </select>
        </div>

        <div className="col-md-5" style={{ maxHeight: "600px", overflowY: "auto" }}>
          {fichasFiltradas.length > 0 ? (
            fichasFiltradas.map((ficha) => {
              const calificacion = ficha.calificacion || 0;
              const vistas = ficha.contar_vista || 0;
              const descargas = ficha.recomendaciones?.contador_descargas || 0;

              let bordeColor = "gray";
              if (orden === "calificacion" && calificacion < 3) bordeColor = "red";
              if (orden === "vistas" && vistas <= 100) bordeColor = "red";
              if (orden === "descargas" && descargas <= 50) bordeColor = "red";

              const imagen = ficha.imagenPortada || "https://via.placeholder.com/150";

              return (
                <div
                  key={ficha._id}
                  className="card mb-3"
                  onClick={() => seleccionarUbicacion(ficha)}
                  style={{ cursor: "pointer", borderLeft: `8px solid ${bordeColor}` }}
                >
                  <div className="row g-0">
                    {/* Imagen a la izquierda */}
                    <div className="col-md-4">
                      <img
                        src={imagen}
                        alt="Imagen de la ficha"
                        className="img-fluid rounded-start"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Texto a la derecha */}
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{ficha.titulo}</h5>
                        <p className="card-text">
                          <strong>Empresa:</strong> {ficha.contactoInformacion?.titulo || "Sin empresa"}
                          <br />
                          <strong>Calificación:</strong> ⭐ {calificacion}
                          <br />
                          <strong>Vistas:</strong> 👁️ {vistas}
                          <br />
                          <strong>Descargas:</strong> 📥 {descargas}
                          <br />
                          <strong>Fecha:</strong> 📅 {ficha.fecha?.slice(0, 10)}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirDetalle(ficha);
                          }}
                        >
                          Ver más información
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>

        <div className="col-md-4" style={{ height: "600px" }}>
          {coordsSeleccionadas ? (
            <iframe
              title="Mapa Google"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ borderRadius: "0.5rem" }}
              src={`https://maps.google.com/maps?q=${coordsSeleccionadas[0]},${coordsSeleccionadas[1]}&z=15&output=embed`}
              allowFullScreen
            />
          ) : (
            <div
              style={{
                height: "100%",
                backgroundColor: "#e9ecef",
                borderRadius: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#6c757d",
              }}
            >
              Selecciona una ubicación para mostrar el mapa
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaDownload } from "react-icons/fa"; // Asegúrate de instalar react-icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: 35,
        height: 35,
        zIndex: 2,
        left: -40,
      }}
      onClick={onClick}
      aria-label="Anterior"
    >
      <FaChevronLeft color="white" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: 35,
        height: 35,
        zIndex: 2,
        right: -40,
      }}
      onClick={onClick}
      aria-label="Siguiente"
    >
      <FaChevronRight color="white" />
    </div>
  );
}


function Portada({ ficha }) {
  const [datosActualizados, setDatosActualizados] = useState(null);

  useEffect(() => {
    if (!ficha?._id) return;

    fetch(`http://localhost:3001/api/fichas/${ficha._id}`, {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatosActualizados(data);
      })
      .catch(console.error);
  }, [ficha]);

  if (!datosActualizados)
    return <div className="text-muted text-center py-4">Cargando ficha actualizada...</div>;

  // Formatea fecha si viene en ISO o timestamp
  const fechaFormateada = datosActualizados.fecha
    ? new Date(datosActualizados.fecha).toLocaleDateString()
    : "N/D";

  return (
    <div
      className="position-relative text-white rounded overflow-hidden shadow-lg d-flex"
      style={{ width: "100%", maxWidth: "1000px", height: "400px", margin: "0 auto" }}
    >
      <img
        src={datosActualizados.imagenPortada || datosActualizados.contenidoGeneral?.imagen}
        alt="Portada"
        style={{
          width: "65%",
          height: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      />
      <div
        className="bg-dark bg-opacity-90 p-4 d-flex flex-column justify-content-center"
        style={{ width: "95%", borderTopRightRadius: "0.5rem", borderBottomRightRadius: "9.5rem" }}
      >
        <h2 className="fw-bold fs-3 mb-3">{datosActualizados.titulo || "Sin título"}</h2>
        <p className="mb-2 fs-5">
          👁️ <strong>{datosActualizados.contar_vista || 0}</strong> vistas
        </p>
        <p className="mb-2 fs-5">
          ⬇️ <strong>{datosActualizados.recomendaciones?.contador_descargas || 0}</strong>{" "}
          descargas
        </p>
        <p className="mb-2 fs-5">🕒 <strong>{fechaFormateada}</strong></p>
        <p className="mb-0 fs-5">
          ⭐ <strong>{datosActualizados.calificacion || "N/D"}</strong>
        </p>
      </div>
    </div>
  );
}
function Informacion({ ficha, token }) {
  const [datosActualizados, setDatosActualizados] = useState(null);

  useEffect(() => {
    if (!ficha?._id) return;

    const headers = {
      "Cache-Control": "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch(`http://localhost:3001/api/fichas/${ficha._id}`, { headers })
      .then((res) => res.json())
      .then((data) => setDatosActualizados(data))
      .catch(console.error);
  }, [ficha, token]);

  if (!datosActualizados)
    return (
      <div className="p-3 text-center text-muted">Cargando información...</div>
    );

  const {
    titulo,
    contenidoGeneral: { imagen, descripciones } = { descripciones: [] },
  } = datosActualizados;

  const descripcionList = (descripciones || []).filter(Boolean);

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <div
      className="bg-white rounded shadow p-4"
      style={{ maxWidth: "850px", margin: "0 auto" }}
    >
      {/* Imagen con título superpuesto */}
      <div
        className="position-relative rounded shadow-sm overflow-hidden mb-4 mx-auto"
        style={{
          maxWidth: "700px",
          height: "260px",
          borderRadius: "0.75rem",
        }}
      >
        {imagen ? (
          <>
            <img
              src={imagen}
              alt={`Información de ${titulo}`}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                borderRadius: "0.75rem",
                userSelect: "none",
              }}
              draggable={false}
            />
            <h3
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                margin: 0,
                padding: "0.75rem 1.25rem",
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                color: "white",
                fontWeight: "600",
                fontSize: "1.5rem",
                borderBottomLeftRadius: "0.75rem",
                borderBottomRightRadius: "0.75rem",
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                userSelect: "none",
              }}
            >
              {titulo || "Sin título"}
            </h3>
          </>
        ) : (
          <div
            style={{
              height: "260px",
              maxWidth: "700px",
              margin: "0 auto",
              backgroundColor: "#e9ecef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6c757d",
              fontWeight: "600",
              fontSize: "1.25rem",
              borderRadius: "0.75rem",
              userSelect: "none",
            }}
          >
            Sin imagen
          </div>
        )}
      </div>

      {/* Descripciones */}
      {descripcionList.length > 1 ? (
        <Slider {...settings}>
          {descripcionList.map((desc, i) => (
            <div key={i}>
              <p className="text-secondary fs-5">{desc}</p>
            </div>
          ))}
        </Slider>
      ) : descripcionList.length === 1 ? (
        <p className="text-secondary fs-5">{descripcionList[0]}</p>
      ) : (
        <p className="text-muted fs-5">Sin información disponible</p>
      )}
    </div>
  );
}



function Contacto({ contacto }) {
  if (!contacto) return <p className="p-3">Información de contacto no disponible</p>;

  const { telefono, sitioWeb, email, mapa } = contacto;

  return (
    <div className="row bg-white rounded shadow p-4 align-items-center">
      {/* Columna del mapa a la izquierda */}
      <div className="col-md-6 mb-3 mb-md-0">
        {mapa?.coordinates ? (
          <iframe
            title="Mapa"
            width="100%"
            height="250"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${mapa.coordinates[1]},${mapa.coordinates[0]}&z=15&output=embed`}
            allowFullScreen
            style={{ borderRadius: "0.5rem" }}
          />
        ) : (
          <div
            style={{
              height: "250px",
              backgroundColor: "#e9ecef",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#6c757d",
            }}
          >
            Mapa no disponible
          </div>
        )}
      </div>

      {/* Columna de contacto a la derecha */}
      <div className="col-md-6">
        <h3>Contacto</h3>
        <p className="mb-2">📞 <strong>Teléfono:</strong> {telefono || 'No disponible'}</p>
        <p className="mb-2">
          🌐 <strong>Sitio Web:</strong>{" "}
          {sitioWeb ? (
            <a href={sitioWeb} className="text-primary" target="_blank" rel="noopener noreferrer">
              {sitioWeb}
            </a>
          ) : (
            'No disponible'
          )}
        </p>
        <p className="mb-0">📧 <strong>Email:</strong> {email || 'No disponible'}</p>
      </div>
    </div>
  );

}

function Recomendacion({ recomendaciones = {}, fichaId }) {
  // Inicializa con el dato que ya tienes para que muestre rápido
  const [contador, setContador] = useState(recomendaciones.contador_descargas ?? 0);
  const [descargando, setDescargando] = useState(false);

  const {
    titulo = 'Sin título',
    imagen = '',
    descripcion = 'Sin descripción',
    linkDescargaPDF = '',
  } = recomendaciones;

  // Actualiza rápido con el dato más reciente del backend
 useEffect(() => {
  if (!fichaId) return;

  const interval = setInterval(() => {
    fetch(`http://localhost:3001/api/fichas/${fichaId}/descargas`)
      .then(res => res.json())
      .then(data => {
        setContador(data.contador_descargas || 0);
      })
      .catch(console.error);
  }, 5000);

  return () => clearInterval(interval);
}, [fichaId]);


  const handleDescarga = async () => {
    if (!fichaId) {
      console.error('❌ fichaId no disponible para descarga');
      return;
    }

    try {
      setDescargando(true);

      const res = await fetch(`http://localhost:3001/api/fichas/${fichaId}/descarga`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (data?.contador_descargas !== undefined) {
        setContador(data.contador_descargas);
      }

      if (linkDescargaPDF) {
        window.open(linkDescargaPDF, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('⚠️ No hay linkDescargaPDF disponible');
      }
    } catch (error) {
      console.error('Error al registrar descarga:', error);
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="row bg-white rounded shadow p-4 align-items-center">
      <div className="col-md-6 order-md-2 mb-3 mb-md-4 d-flex justify-content-center">
        {imagen ? (
          <img
            src={imagen}
            alt="recomendación"
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: 'cover', width: '100%', maxHeight: '400px' }}
          />
        ) : (
          <div className="text-muted">Sin imagen</div>
        )}
      </div>
      <div className="col-md-6 order-md-1">
        <h3>{titulo}</h3>
        <p className="text-secondary">{descripcion}</p>

        <button
          onClick={handleDescarga}
          disabled={descargando || !linkDescargaPDF}
          className="btn btn-outline-primary mt-3 d-inline-flex align-items-center"
        >
          <FaDownload className="me-2" />
          {descargando ? 'Registrando...' : 'Mas informacion'}
        </button>

        <p className="mt-2 text-muted">
          Descargas registradas: <strong>{contador}</strong>
        </p>
      </div>
    </div>
  );
}

export default function CarruselInteractivo({ ficha, onClose }) {
  const [vistaRegistrada, setVistaRegistrada] = useState(false);
  const vistaRegistradaRef = useRef(false);
  const sliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: () => {
      if (document.activeElement) document.activeElement.blur();
    },
    afterChange: (current) => {
      setSlideIndex(current);
      if (current === 1 && ficha?._id && !vistaRegistradaRef.current) {
        registrarVista(ficha._id);
        vistaRegistradaRef.current = true;
        setVistaRegistrada(true);
      }
    },
  };

  const avanzar = () => sliderRef.current?.slickNext();
  const retroceder = () => sliderRef.current?.slickPrev();

  async function registrarVista(idFicha) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/fichas/${idFicha}/vista`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("👁️ Vista registrada:", data);
      } else {
        console.error("❌ Error registrando vista:", data.mensaje || "Error desconocido");
      }
    } catch (error) {
      console.error("❌ Error de red al registrar vista:", error.message);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [onClose]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", zIndex: 1050 }}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de ficha"
    >
      <div
        className="bg-white p-4 rounded shadow-lg position-relative"
        style={{
          width: "90%",
          maxWidth: "960px",
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "fadeIn 0.3s ease",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="btn btn-outline-danger position-absolute top-0 end-0 m-2"
          style={{ borderRadius: "50%", width: "2.5rem", height: "2.5rem" }}
          aria-label="Cerrar carrusel"
        >
          ✖
        </button>

        {/* Barra de progreso */}
        <div className="mb-3">
          <div className="progress" style={{ height: "6px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${((slideIndex + 1) / 4) * 100}%` }}
              aria-valuenow={((slideIndex + 1) / 4) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* Carrusel */}
        <Slider ref={sliderRef} {...settings}>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Portada ficha={ficha} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Informacion ficha={ficha} vistaRegistrada={vistaRegistrada} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Contacto contacto={ficha.contactoInformacion} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
              <Recomendacion recomendaciones={ficha.recomendaciones} fichaId={ficha._id}  />
          </div>
        </Slider>

        {/* Navegación */}
        <div className="d-flex justify-content-between mt-4 px-3">
          <button
            onClick={retroceder}
            className="btn btn-outline-secondary px-4"
            disabled={slideIndex === 0}
          >
            ← Anterior
          </button>
          <button
            onClick={avanzar}
            className="btn btn-primary px-4"
            disabled={slideIndex === 3}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

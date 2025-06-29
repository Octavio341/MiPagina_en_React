import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaDownload } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vista.css";

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
    return <div className="text-muted">Cargando ficha actualizada...</div>;

  return (
    <div
      className="position-relative text-white rounded overflow-hidden shadow-lg d-flex"
      style={{ width: "100%", maxWidth: "1000px", height: "400px", margin: "0 auto" }}
    >
      <img
        src={datosActualizados.imagenPortada}
        alt="portada"
        style={{
          width: "65%",
          height: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      />
      <div
        className="bg-dark bg-opacity-90 p-3 d-flex flex-column justify-content-center"
        style={{ width: "95%", borderTopRightRadius: "0.5rem", borderBottomRightRadius: "9.5rem" }}
      >
        <h2 className="fw-bold fs-9">{datosActualizados.titulo}</h2>
        <p className="mb-2 fs-5">
          👁️ <strong>{datosActualizados.contar_vista}</strong> vistas
        </p>
        <p className="mb-2 fs-5">
          ⬇️ <strong>{datosActualizados.recomendaciones?.contador_descargas || 0}</strong>{" "}
          descargas
        </p>
        <p className="mb-2 fs-5">
          🕒 <strong>{datosActualizados.fecha}</strong>
        </p>
        <p className="mb-0 fs-5">
          ⭐ <strong>{datosActualizados.calificacion}</strong>
        </p>
      </div>
    </div>
  );
}

function Informacion({ ficha }) {
  if (!ficha) return <div className="p-3">Cargando ficha...</div>;

  const { titulo, imagenInfo, info1, info2, info3, info4 } = ficha;

  const descripciones = [info1, info2, info3, info4].filter(Boolean);

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className="bg-white rounded shadow p-4"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      <div
        className="position-relative rounded shadow-sm overflow-hidden mb-4"
        style={{ maxHeight: "400px" }}
      >
        {imagenInfo ? (
          <>
            <img
              src={imagenInfo}
              alt="Información"
              className="img-fluid w-100"
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
            <h3
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                margin: 0,
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                fontWeight: "bold",
                zIndex: 10,
                borderBottomRightRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
              }}
            >
              {titulo || "Sin título"}
            </h3>
          </>
        ) : (
          <div
            style={{
              height: "300px",
              width: "100%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontWeight: "bold",
              fontSize: "1.5rem",
              borderRadius: "0.5rem",
            }}
          >
            Sin imagen
          </div>
        )}
      </div>

      {descripciones.length > 1 ? (
        <Slider {...settings}>
          {descripciones.map((desc, i) => (
            <div key={i}>
              <p className="text-secondary">{desc}</p>
            </div>
          ))}
        </Slider>
      ) : descripciones.length === 1 ? (
        <p className="text-secondary">{descripciones[0]}</p>
      ) : (
        <p className="text-muted">Sin información disponible</p>
      )}
    </div>
  );
}

function Contacto({ contacto }) {
  if (!contacto) return <p className="p-3">Información de contacto no disponible</p>;

  const { telefono, sitioWeb, email, mapa } = contacto;

  return (
    <div className="row bg-white rounded shadow p-4 align-items-center">
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

      <div className="col-md-6">
        <h3>Contacto</h3>
        <p className="mb-2">
          📞 <strong>Teléfono:</strong> {telefono || "No disponible"}
        </p>
        <p className="mb-2">
          🌐 <strong>Sitio Web:</strong>{" "}
          {sitioWeb ? (
            <a
              href={sitioWeb}
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {sitioWeb}
            </a>
          ) : (
            "No disponible"
          )}
        </p>
        <p className="mb-0">
          📧 <strong>Email:</strong> {email || "No disponible"}
        </p>
      </div>
    </div>
  );
}

function Recomendacion({ recomendaciones = {}, fichaId }) {
  const [contador, setContador] = useState(recomendaciones.contador_descargas ?? 0);
  const [descargando, setDescargando] = useState(false);

  const {
    titulo = "Sin título",
    imagen = "",
    descripcion = "Sin descripción",
    linkDescargaPDF = "",
  } = recomendaciones;

  useEffect(() => {
    if (!fichaId) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:3001/api/fichas/${fichaId}/descargas`)
        .then((res) => res.json())
        .then((data) => {
          setContador(data.contador_descargas || 0);
        })
        .catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, [fichaId]);

  const handleDescarga = async () => {
    if (!fichaId) {
      console.error("❌ fichaId no disponible para descarga");
      return;
    }

    try {
      setDescargando(true);

      const res = await fetch(`http://localhost:3001/api/fichas/${fichaId}/descarga`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (data?.contador_descargas !== undefined) {
        setContador(data.contador_descargas);
      }

      if (linkDescargaPDF) {
        window.open(linkDescargaPDF, "_blank", "noopener,noreferrer");
      } else {
        console.warn("⚠️ No hay linkDescargaPDF disponible");
      }
    } catch (error) {
      console.error("Error al registrar descarga:", error);
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
            style={{ objectFit: "cover", width: "100%", maxHeight: "400px" }}
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
          {descargando ? "Registrando..." : "Abrir PDF"}
        </button>

        <p className="mt-2 text-muted">
          Descargas registradas: <strong>{contador}</strong>
        </p>
      </div>
    </div>
  );
}

export default function ExploradorConDetalle({ ficha, onCerrar }) {
  const [vistaRegistrada, setVistaRegistrada] = useState(false);
  const vistaRegistradaRef = useRef(false);

  const infoData =
    ficha && ficha.contenidoGeneral
      ? {
          titulo: ficha.contenidoGeneral.titulo,
          imagenInfo: ficha.contenidoGeneral.imagen,
          info1: ficha.contenidoGeneral.descripciones?.[0] || null,
          info2: ficha.contenidoGeneral.descripciones?.[1] || null,
          info3: ficha.contenidoGeneral.descripciones?.[2] || null,
          info4: ficha.contenidoGeneral.descripciones?.[3] || null,
        }
      : null;

  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: () => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    afterChange: (current) => {
      if (current === 1 && ficha?._id && !vistaRegistradaRef.current) {
        registrarVista(ficha._id);
        vistaRegistradaRef.current = true;
        setVistaRegistrada(true);
      }
    },
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function registrarVista(idFicha) {
    try {
      const response = await fetch(`http://localhost:3001/api/fichas/${idFicha}/vista`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

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

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1050,
        animation: "fadeIn 0.3s ease",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de ficha"
    >
      <div
        className="bg-white text-dark rounded shadow-lg p-4 position-relative"
        style={{
          width: "95%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <button
          onClick={onCerrar}
          className="btn btn-danger position-absolute top-0 end-0 m-2"
          style={{
            fontSize: "1.4rem",
            lineHeight: 1,
            zIndex: 1100,
            backgroundColor: "rgba(220, 53, 69, 0.9)",
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label="Cerrar"
        >
          ✖
        </button>

        <Slider {...settings}>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Portada ficha={ficha} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Informacion ficha={infoData} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Contacto contacto={ficha.contactoInformacion} />
          </div>
          <div style={{ width: "100%", minHeight: "300px" }}>
            <Recomendacion recomendaciones={ficha.recomendaciones} fichaId={ficha._id} />
          </div>
        </Slider>
      </div>
    </div>
  );
}

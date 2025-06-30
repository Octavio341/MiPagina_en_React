import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarruselInteractivo({ ficha, onClose }) {
  const [vistaRegistrada, setVistaRegistrada] = useState(false);
  const vistaRegistradaRef = useRef(false);
  const sliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => {
      if (current === 1 && ficha?._id && !vistaRegistradaRef.current) {
        registrarVista(ficha._id);
        vistaRegistradaRef.current = true;
        setVistaRegistrada(true);
      }
      setSlideIndex(current);
    },
  };

  const avanzar = () => sliderRef.current?.slickNext();
  const retroceder = () => sliderRef.current?.slickPrev();

  const registrarVista = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/fichas/${id}/vista`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (e) {
      console.error("Error registrando vista:", e);
    }
  };

  const contenido = ficha?.contenidoGeneral || {};
  const contacto = ficha?.contactoInformacion || {};
  const recomendaciones = ficha?.recomendaciones || {};

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
    >
      <div
        className="bg-white p-4 rounded shadow-lg position-relative"
        style={{
          width: "90%",
          maxWidth: "960px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="btn btn-outline-danger position-absolute top-0 end-0 m-2"
          style={{ borderRadius: "50%" }}
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
              style={{ width: `${(slideIndex + 1) * 25}%` }}
              aria-valuenow={(slideIndex + 1) * 25}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* Carrusel */}
        <Slider ref={sliderRef} {...settings}>
          {/* Slide 1 - Portada */}
          <div className="text-center px-3">
            <h3 className="fw-bold">{contenido.titulo || "Sin título"}</h3>
            <img
              src={contenido.imagen}
              alt="Portada"
              className="img-fluid rounded my-3"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>

          {/* Slide 2 - Información */}
          <div className="px-3">
            <h4>Información general</h4>
            {[contenido.descripciones?.[0], contenido.descripciones?.[1], contenido.descripciones?.[2], contenido.descripciones?.[3]]
              .filter(Boolean)
              .map((info, i) => (
                <p key={i} className="text-muted">{info}</p>
              ))}
            {vistaRegistrada && (
              <div className="alert alert-success mt-3">✅ Vista registrada</div>
            )}
          </div>

          {/* Slide 3 - Contacto */}
          <div className="px-3">
            <h4>Contacto</h4>
            <ul className="list-group">
              <li className="list-group-item"><strong>Nombre:</strong> {contacto.nombre || "N/D"}</li>
              <li className="list-group-item"><strong>Email:</strong> {contacto.email || "N/D"}</li>
              <li className="list-group-item"><strong>Teléfono:</strong> {contacto.telefono || "N/D"}</li>
              <li className="list-group-item"><strong>Dirección:</strong> {contacto.direccion || "N/D"}</li>
            </ul>
          </div>

          {/* Slide 4 - Recomendaciones */}
          <div className="px-3">
            <h4>Recomendaciones</h4>
            <p>{recomendaciones.texto || "No hay recomendaciones registradas."}</p>
            <p>
              <strong>Vistas:</strong> {ficha?.contar_vista || 0} |{" "}
              <strong>Descargas:</strong> {recomendaciones.contador_descargas || 0}
            </p>
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

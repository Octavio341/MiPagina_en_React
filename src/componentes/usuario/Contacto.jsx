import React, { useState } from "react";
import fondoImagen from './fondo_natvar.jpg';
import iconoIzquierda from './descarga.png';  // Imagen para el lado izquierdo
import iconoDerecha from './tiempo.png';    // Imagen para el lado derecho

function InfoBox({ title, children, icono }) {
  const estiloFondo = {
    backgroundImage: `url(${fondoImagen})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0.25rem",
    padding: "20px",
    color: "white",
    minHeight: "350px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 0 25px rgba(0,0,0,0.7)";
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 0 15px rgba(0,0,0,0.5)";
  };

  return (
    <div
      style={estiloFondo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="text-center"
    >
      <img
        src={icono}
        alt={`${title} icono`}
        style={{ width: "160px", height: "auto", marginBottom: "10px", display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
      <h5>{title}</h5>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("http://localhost:3001/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ success: true, message: "Mensaje enviado correctamente" });
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
      } else {
        const data = await res.json();
        setStatus({ success: false, message: data.message || "Error al enviar el mensaje" });
      }
    } catch (error) {
      setStatus({ success: false, message: "Error de conexión" });
    }
  };

  return (
    <div className="container-fluid mt-4 px-5">
      <h2 className="mb-4 text-center">Contacto</h2>
      <div className="row gx-5">
        {/* Izquierda */}
        <div className="col-lg-3 col-md-4 mb-4">
          <InfoBox title="Acerca del proyecto" icono={iconoIzquierda}>
            <p>
              Este proyecto busca facilitar la comunicación directa entre usuarios y nuestro equipo,
              brindando soporte y atención personalizada.
            </p>

            <h6>Objetivo</h6>
            <p>
              Ofrecer un canal eficiente para que los usuarios puedan enviar sus dudas, sugerencias o
              comentarios y recibir respuesta en tiempo oportuno.
            </p>

            <h6>Misión</h6>
            <p>
              Mejorar la experiencia del usuario mediante atención rápida y efectiva, fomentando la
              confianza y satisfacción.
            </p>
          </InfoBox>
        </div>

        {/* Centro - Formulario */}
        <div className="col-lg-6 col-md-8 mb-4">
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white rounded shadow-lg"
            style={{ minHeight: "450px" }}
          >
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="asunto" className="form-label">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                className="form-control"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="form-control"
                rows="7"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>

            {status && (
              <div className={`alert ${status.success ? "alert-success" : "alert-danger"}`} role="alert">
                {status.message}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>

        {/* Derecha */}
        <div className="col-lg-3 d-none d-lg-block">
          <InfoBox title="Tiempo de respuesta" icono={iconoDerecha}>
            <p>
              Una vez que envíes tu mensaje, nuestro equipo se compromete a responder en un plazo máximo
              de <strong>48 horas hábiles</strong>.
            </p>
            <p>
              Si tu mensaje es urgente, por favor indícalo claramente en el asunto para priorizar la atención.
            </p>
            <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
            <h6>Consejos para un contacto efectivo:</h6>
            <ul className="text-start mx-auto" style={{ maxWidth: "280px" }}>
              <li>Escribe un asunto claro y conciso.</li>
              <li>Proporciona todos los detalles necesarios en el mensaje.</li>
              <li>Verifica que tu correo electrónico sea correcto para recibir la respuesta.</li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </div>
  );
}

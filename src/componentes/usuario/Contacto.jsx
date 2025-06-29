import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>

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
            rows="5"
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

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

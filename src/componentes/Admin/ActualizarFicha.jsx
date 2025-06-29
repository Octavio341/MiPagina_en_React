import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './ActualizarFicha.css'; // Puedes reutilizar el mismo CSS

export default function ActualizarFicha({ ficha, onCancelar, onActualizado }) {
  const [formData, setFormData] = useState({
    // Inicializar con los datos que vienen de la ficha
    id: ficha._id || 1,
    imagenPortada: ficha.imagenPortada || "",
    titulo: ficha.titulo || "",
    contar_vista: ficha.contar_vista || 0,
    fecha: ficha.fecha ? ficha.fecha.slice(0, 10) : new Date().toISOString().split("T")[0],
    calificacion: ficha.calificacion || 0,
    contenidoGeneral: {
      titulo: ficha.contenidoGeneral?.titulo || "",
      imagen: ficha.contenidoGeneral?.imagen || "",
      descripciones: ficha.contenidoGeneral?.descripciones || ["", "", "", ""],
      fechaPublicacion: ficha.contenidoGeneral?.fechaPublicacion
        ? ficha.contenidoGeneral.fechaPublicacion.slice(0, 10)
        : new Date().toISOString().split("T")[0],
    },
    contactoInformacion: {
      titulo: ficha.contactoInformacion?.titulo || "",
      mapa: {
        type: "Point",
        coordinates: ficha.contactoInformacion?.mapa?.coordinates || [0, 0],
      },
      descripcion: ficha.contactoInformacion?.descripcion || "",
      telefono: ficha.contactoInformacion?.telefono || "",
      email: ficha.contactoInformacion?.email || "",
      sitioWeb: ficha.contactoInformacion?.sitioWeb || "",
    },
    recomendaciones: {
      titulo: ficha.recomendaciones?.titulo || "",
      imagen: ficha.recomendaciones?.imagen || "",
      descripcion: ficha.recomendaciones?.descripcion || "",
      linkDescargaPDF: ficha.recomendaciones?.linkDescargaPDF || "",
      contador_descargas: ficha.recomendaciones?.contador_descargas || 0,
    },
  });

  const tituloRef = useRef();
  const imagenPortadaRef = useRef();
  const calificacionRef = useRef();
  const cgTituloRef = useRef();
  const cgImagenRef = useRef();
  const cgDesc0Ref = useRef();
  const ciTituloRef = useRef();
  const ciDescripcionRef = useRef();
  const ciTelefonoRef = useRef();
  const ciEmailRef = useRef();
  const ciSitioWebRef = useRef();
  const latitudRef = useRef();
  const longitudRef = useRef();
  const recTituloRef = useRef();
  const recImagenRef = useRef();
  const recDescripcionRef = useRef();
  const recLinkPDFRef = useRef();

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);

  const sliderRef = useRef(null);

  const campoASlide = {
    titulo: 0,
    imagenPortada: 0,
    fecha: 0,
    calificacion: 0,

    cgTitulo: 1,
    cgImagen: 1,
    cgDesc0: 1,

    ciTitulo: 2,
    ciDescripcion: 2,
    ciTelefono: 2,
    ciEmail: 2,
    ciSitioWeb: 2,
    latitud: 2,
    longitud: 2,

    recTitulo: 3,
    recImagen: 3,
    recDescripcion: 3,
    recLinkPDF: 3,
  };

  const handleChange = (e, campo, index = null, coordIndex = null) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    const nuevoFormData = { ...formData };

    if (campo.includes(".")) {
      const keys = campo.split(".");
      let ref = nuevoFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }

      const finalKey = keys[keys.length - 1];

      if (coordIndex !== null && Array.isArray(ref[finalKey])) {
        const arrayClone = [...ref[finalKey]];
        arrayClone[coordIndex] = value;
        ref[finalKey] = arrayClone;
      } else if (index !== null && Array.isArray(ref[finalKey])) {
        const arrayClone = [...ref[finalKey]];
        arrayClone[index] = value;
        ref[finalKey] = arrayClone;
      } else {
        ref[finalKey] = value;
      }
    } else {
      nuevoFormData[campo] = value;
    }

    setFormData(nuevoFormData);
  };

  const handleSubmit = async () => {
    const nuevosErrores = {};

    // Validaciones (igual que en Publicar)
    if (!formData.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!formData.imagenPortada.trim())
      nuevosErrores.imagenPortada = "Falta la imagen o GIF";
    if (!formData.calificacion)
      nuevosErrores.calificacion = "Falta la calificación";

    if (!formData.contenidoGeneral.titulo.trim())
      nuevosErrores.cgTitulo = "Falta el título del contenido";
    if (!formData.contenidoGeneral.imagen.trim())
      nuevosErrores.cgImagen = "Falta la imagen del contenido";
    if (!formData.contenidoGeneral.descripciones[0]?.trim())
      nuevosErrores.cgDesc0 = "Falta la descripción 1";

    if (!formData.contactoInformacion.titulo.trim())
      nuevosErrores.ciTitulo = "Falta el título del contacto";
    if (!formData.contactoInformacion.descripcion.trim())
      nuevosErrores.ciDescripcion = "Falta la descripción del contacto";
    if (!formData.contactoInformacion.telefono.trim())
      nuevosErrores.ciTelefono = "Falta el teléfono";
    if (!formData.contactoInformacion.email.trim())
      nuevosErrores.ciEmail = "Falta el email";
    if (!formData.contactoInformacion.sitioWeb.trim())
      nuevosErrores.ciSitioWeb = "Falta el sitio web";
    if (!formData.contactoInformacion.mapa.coordinates[1])
      nuevosErrores.latitud = "Falta latitud";
    if (!formData.contactoInformacion.mapa.coordinates[0])
      nuevosErrores.longitud = "Falta longitud";

    if (!formData.recomendaciones.titulo.trim())
      nuevosErrores.recTitulo = "Falta el título de la recomendación";
    if (!formData.recomendaciones.imagen.trim())
      nuevosErrores.recImagen = "Falta la imagen de la recomendación";
    if (!formData.recomendaciones.descripcion.trim())
      nuevosErrores.recDescripcion = "Falta la descripción de la recomendación";
    if (!formData.recomendaciones.linkDescargaPDF.trim())
      nuevosErrores.recLinkPDF = "Falta el link al PDF";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      const primerCampoConError = Object.keys(nuevosErrores)[0];
      const slide = campoASlide[primerCampoConError];
      if (sliderRef.current && typeof slide === "number") {
        sliderRef.current.slickGoTo(slide);
      }

      // Focus opcional
      switch (primerCampoConError) {
        case "titulo":
          tituloRef.current?.focus();
          break;
        case "imagenPortada":
          imagenPortadaRef.current?.focus();
          break;
        case "calificacion":
          calificacionRef.current?.focus();
          break;
        case "cgTitulo":
          cgTituloRef.current?.focus();
          break;
        case "cgImagen":
          cgImagenRef.current?.focus();
          break;
        case "cgDesc0":
          cgDesc0Ref.current?.focus();
          break;
        case "ciTitulo":
          ciTituloRef.current?.focus();
          break;
        case "ciDescripcion":
          ciDescripcionRef.current?.focus();
          break;
        case "ciTelefono":
          ciTelefonoRef.current?.focus();
          break;
        case "ciEmail":
          ciEmailRef.current?.focus();
          break;
        case "ciSitioWeb":
          ciSitioWebRef.current?.focus();
          break;
        case "latitud":
          latitudRef.current?.focus();
          break;
        case "longitud":
          longitudRef.current?.focus();
          break;
        case "recTitulo":
          recTituloRef.current?.focus();
          break;
        case "recImagen":
          recImagenRef.current?.focus();
          break;
        case "recDescripcion":
          recDescripcionRef.current?.focus();
          break;
        case "recLinkPDF":
          recLinkPDFRef.current?.focus();
          break;
        default:
          break;
      }

      return; // detener submit por error
    }

    setLoading(true);
    setErrorGeneral(null);

    try {
      await fetch(`http://localhost:3001/api/fichas/${formData.id}/actualizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Ficha actualizada correctamente.");
      onActualizado();
    } catch (error) {
      setErrorGeneral("Error al actualizar ficha.");
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   <div className="container mt-5">
  <h2 className="text-center mb-4">Actualizar Ficha</h2>
  {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}
  <Slider ref={sliderRef} {...settings}>
    {/* Portada */}
    <div>
      <h4>Portada</h4>
      <input
        ref={tituloRef}
        className={`form-control my-2 ${errores.titulo ? "input-error" : ""}`}
        placeholder="Título"
        value={formData.titulo}
        onChange={(e) => handleChange(e, "titulo")}
      />

      <input
        ref={imagenPortadaRef}
        className={`form-control my-2 ${errores.imagenPortada ? "input-error" : ""}`}
        placeholder="Imagen o GIF"
        value={formData.imagenPortada}
        onChange={(e) => handleChange(e, "imagenPortada")}
      />

      <input
        type="date"
        className="form-control my-2"
        value={formData.fecha}
        onChange={(e) => handleChange(e, "fecha")}
      />

      <input
        ref={calificacionRef}
        className={`form-control my-2 ${errores.calificacion ? "input-error" : ""}`}
        type="number"
        placeholder="Calificación"
        value={formData.calificacion}
        onChange={(e) => handleChange(e, "calificacion")}
      />

     <input
  className="form-control my-2"
  type="number"
  placeholder="Número de vistas"
  value={formData.contar_vista}
  onChange={(e) => handleChange(e, "contar_vista")}
/>
<input
  className="form-control my-2"
  type="number"
  placeholder="Número de descargas"
  value={formData.recomendaciones.contador_descargas}
  onChange={(e) => handleChange(e, "recomendaciones.contador_descargas")}
/>




    </div>


    {/* Contenido General */}
    <div>
      <h4>Contenido General</h4>
      <input
        ref={cgTituloRef}
        className={`form-control my-2 ${errores.cgTitulo ? "input-error" : ""}`}
        placeholder="Título"
        value={formData.contenidoGeneral.titulo}
        onChange={(e) => handleChange(e, "contenidoGeneral.titulo")}
      />

      <input
        ref={cgImagenRef}
        className={`form-control my-2 ${errores.cgImagen ? "input-error" : ""}`}
        placeholder="Imagen"
        value={formData.contenidoGeneral.imagen}
        onChange={(e) => handleChange(e, "contenidoGeneral.imagen")}
      />

      {formData.contenidoGeneral.descripciones.map((desc, i) => (
        <textarea
          key={i}
          ref={i === 0 ? cgDesc0Ref : null}
          className={`form-control my-2 ${i === 0 && errores.cgDesc0 ? "input-error" : ""}`}
          placeholder={`Descripción ${i + 1}`}
          value={desc}
          onChange={(e) => handleChange(e, "contenidoGeneral.descripciones", i)}
          rows={4}
          style={{ resize: 'vertical' }}
        />
      ))}

      <input
        className="form-control my-2"
        type="date"
        value={formData.contenidoGeneral.fechaPublicacion}
        onChange={(e) => handleChange(e, "contenidoGeneral.fechaPublicacion")}
      />
    </div>

    {/* Contacto e Información */}
    <div>
      <h4>Contacto e Información</h4>

      <input
        ref={ciTituloRef}
        className={`form-control my-2 ${errores.ciTitulo ? "input-error" : ""}`}
        placeholder="Título"
        value={formData.contactoInformacion.titulo}
        onChange={(e) => handleChange(e, "contactoInformacion.titulo")}
      />

      <textarea
        ref={ciDescripcionRef}
        className={`form-control my-2 ${errores.ciDescripcion ? "input-error" : ""}`}
        placeholder="Descripción"
        value={formData.contactoInformacion.descripcion}
        onChange={(e) => handleChange(e, "contactoInformacion.descripcion")}
        rows={4}
        style={{ resize: 'vertical' }}
      />

      <input
        ref={ciTelefonoRef}
        className={`form-control my-2 ${errores.ciTelefono ? "input-error" : ""}`}
        placeholder="Teléfono"
        value={formData.contactoInformacion.telefono}
        onChange={(e) => handleChange(e, "contactoInformacion.telefono")}
      />

      <input
        ref={ciEmailRef}
        className={`form-control my-2 ${errores.ciEmail ? "input-error" : ""}`}
        placeholder="Email"
        value={formData.contactoInformacion.email}
        onChange={(e) => handleChange(e, "contactoInformacion.email")}
      />

      <input
        ref={ciSitioWebRef}
        className={`form-control my-2 ${errores.ciSitioWeb ? "input-error" : ""}`}
        placeholder="Sitio Web"
        value={formData.contactoInformacion.sitioWeb}
        onChange={(e) => handleChange(e, "contactoInformacion.sitioWeb")}
      />

      <div className="row">
        <div className="col">
          <input
            type="text"
            ref={latitudRef}
            className={`form-control my-2 ${errores.latitud ? "input-error" : ""}`}
            placeholder={errores.latitud || "Latitud"}
            value={formData.contactoInformacion.mapa.coordinates[1]}
            onChange={(e) => handleChange(e, "contactoInformacion.mapa.coordinates", 1)}
          />
        </div>

        <div className="col">
          <input
            type="text"
            ref={longitudRef}
            className={`form-control my-2 ${errores.longitud ? "input-error" : ""}`}
            placeholder={errores.longitud || "Longitud"}
            value={formData.contactoInformacion.mapa.coordinates[0]}
            onChange={(e) => handleChange(e, "contactoInformacion.mapa.coordinates", 0)}
          />
        </div>
      </div>
    </div>

    {/* Recomendaciones */}
    <div>
      <h4>Recomendaciones</h4>
      <input
        ref={recTituloRef}
        className={`form-control my-2 ${errores.recTitulo ? "input-error" : ""}`}
        placeholder="Título"
        value={formData.recomendaciones.titulo}
        onChange={(e) => handleChange(e, "recomendaciones.titulo")}
      />

      <input
        ref={recImagenRef}
        className={`form-control my-2 ${errores.recImagen ? "input-error" : ""}`}
        placeholder="Imagen"
        value={formData.recomendaciones.imagen}
        onChange={(e) => handleChange(e, "recomendaciones.imagen")}
      />

      <textarea
        ref={recDescripcionRef}
        className={`form-control my-2 ${errores.recDescripcion ? "input-error" : ""}`}
        placeholder="Descripción"
        value={formData.recomendaciones.descripcion}
        onChange={(e) => handleChange(e, "recomendaciones.descripcion")}
        rows={4}
        style={{ resize: 'vertical' }}
      />

      <input
        ref={recLinkPDFRef}
        className={`form-control my-2 ${errores.recLinkPDF ? "input-error" : ""}`}
        placeholder="Link PDF"
        value={formData.recomendaciones.linkDescargaPDF}
        onChange={(e) => handleChange(e, "recomendaciones.linkDescargaPDF")}
      />

      <button
        className="btn btn-primary mt-3 w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Actualizando..." : "Actualizar Ficha"}
      </button>

      <button
        className="btn btn-secondary mt-2 w-100"
        onClick={onCancelar}
        disabled={loading}
      >
        Cancelar
      </button>
    </div>
  </Slider>
</div>

  );
}

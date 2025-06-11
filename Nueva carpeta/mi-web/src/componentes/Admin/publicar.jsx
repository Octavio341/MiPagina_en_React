import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./publicar.css"; // Asegúrate de tener este archivo CSS para estilos    

const EditorDeFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Agregar o guardar edición
  const handleGuardarFicha = () => {
    if (!titulo || !imagen || !descripcion) {
      return alert("Completa todos los campos");
    }

    const fichaNueva = { titulo, imagen, descripcion };

    if (editIndex !== null) {
      // Editar ficha existente
      const nuevasFichas = [...fichas];
      nuevasFichas[editIndex] = fichaNueva;
      setFichas(nuevasFichas);
      setEditIndex(null);
    } else {
      // Agregar ficha nueva
      setFichas([fichaNueva, ...fichas]);
    }

    // Limpiar formulario
    setTitulo("");
    setImagen("");
    setDescripcion("");
  };

  // Cargar ficha en formulario para editar
  const handleEditar = (index) => {
    const ficha = fichas[index];
    setTitulo(ficha.titulo);
    setImagen(ficha.imagen);
    setDescripcion(ficha.descripcion);
    setEditIndex(index);
  };

  // Eliminar ficha
  const handleEliminar = (index) => {
    if (window.confirm("¿Seguro que quieres eliminar esta ficha?")) {
      const nuevasFichas = fichas.filter((_, i) => i !== index);
      setFichas(nuevasFichas);
      if (editIndex === index) {
        // Si estábamos editando esta ficha, limpiar formulario
        setTitulo("");
        setImagen("");
        setDescripcion("");
        setEditIndex(null);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: fichas.length > 3,
    speed: 500,
    slidesToShow: Math.min(fichas.length, 3),
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="editor-ficha-contenedor">
      <div className="formulario-editor">
        <h2>{editIndex !== null ? "Editar Ficha" : "Crear Ficha Nueva"}</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button onClick={handleGuardarFicha}>
          {editIndex !== null ? "Guardar Cambios" : "Publicar"}
        </button>
        {editIndex !== null && (
          <button
            onClick={() => {
              setTitulo("");
              setImagen("");
              setDescripcion("");
              setEditIndex(null);
            }}
            style={{ marginLeft: "10px", backgroundColor: "#aaa" }}
          >
            Cancelar
          </button>
        )}
      </div>

      {fichas.length > 0 ? (
        <div className="carrusel-fichas">
          <Slider {...settings}>
            {fichas.map((ficha, index) => (
              <div className="ficha" key={index}>
                <img src={ficha.imagen} alt="Imagen ficha" className="ficha-imagen" />
                <h2>{ficha.titulo}</h2>
                <p>{ficha.descripcion}</p>
                <div style={{ marginTop: 10 }}>
                  <button onClick={() => handleEditar(index)}>Editar</button>
                  <button
                    onClick={() => handleEliminar(index)}
                    style={{ marginLeft: "10px", backgroundColor: "#e74c3c", color: "white" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>No hay fichas publicadas.</p>
      )}
    </div>
  );
};

export default EditorDeFichas;

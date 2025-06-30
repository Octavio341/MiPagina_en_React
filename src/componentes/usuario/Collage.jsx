import React from "react";

export default function Collage({ onAbrirFicha }) {
  const cuadros = [
    { id: 1, texto: "Promoción", color: "#f8d7da", tipo: "cuadrado", imagen: "https://via.placeholder.com/350" },
    { id: 2, texto: "Noticias", color: "#d1ecf1", tipo: "rectangulo", imagen: "https://via.placeholder.com/700x350" },
    { id: 3, texto: "Eventos", color: "#d4edda", tipo: "cuadrado", imagen: "https://via.placeholder.com/350" },
    { id: 4, texto: "Galería", color: "#fff3cd", tipo: "rectangulo", imagen: "https://via.placeholder.com/700x350" },
    { id: 5, texto: "Contacto", color: "#e2e3e5", tipo: "cuadrado", imagen: "https://via.placeholder.com/350" },
    { id: 6, texto: "Testimonios", color: "#f8f9fa", tipo: "rectangulo", imagen: "https://via.placeholder.com/700x350" },
    { id: 7, texto: "Tienda", color: "#e0bbf9", tipo: "cuadrado", imagen: "https://via.placeholder.com/350" },
    { id: 8, texto: "Tutoriales", color: "#c3e6cb", tipo: "rectangulo", imagen: "https://via.placeholder.com/700x350" },
    { id: 9, texto: "Ayuda", color: "#bee5eb", tipo: "cuadrado", imagen: "https://via.placeholder.com/350" },
    { id: 10, texto: "Blog", color: "#f5c6cb", tipo: "rectangulo", imagen: "https://via.placeholder.com/700x350" },
  ];

  return (
    <>
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 350px;
          gap: 16px;
          max-width: 1600px;
          margin: 40px auto;
          grid-auto-flow: dense;
        }

        .cuadro {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          background: white;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .cuadro:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .cuadro.cuadrado {
          grid-column: span 1;
        }

        .cuadro.rectangulo {
          grid-column: span 2;
        }

        .cuadro img {
          width: 100%;
          height: 80%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .cuadro h5 {
          margin: 0;
          padding: 10px;
          font-weight: 600;
          text-align: center;
          color: #333;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="grid-container">
        {cuadros.map(({ id, texto, color, tipo, imagen }) => (
          <div
            key={id}
            className={`cuadro ${tipo}`}
            style={{ backgroundColor: color }}
            onClick={() => onAbrirFicha({ id, texto, color, tipo, imagen })}
          >
            <img src={imagen} alt={texto} />
            <h5>{texto}</h5>
          </div>
        ))}
      </div>
    </>
  );
}

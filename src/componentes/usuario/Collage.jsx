import React from "react";

export default function Collage({ fichas, onAbrirFicha }) {
  // Función para renderizar estrellas
  const renderStars = (calificacion) => {
    const max = 5;
    const fullStars = Math.floor(calificacion);
    const stars = [];

    for (let i = 0; i < max; i++) {
      if (i < fullStars) {
        stars.push(<span key={i}>★</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }

    return stars;
  };

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
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
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
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .cuadro .info {
          position: relative;
          z-index: 1;
          background: rgba(0, 0, 0, 0.55);
          color: white;
          padding: 12px;
          text-align: center;
          font-family: sans-serif;
        }

        .cuadro h5 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .cuadro .extra {
          font-size: 0.9rem;
          margin-top: 6px;
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: center;
        }

        .stars {
          color: gold;
          font-size: 1.1rem;
        }

        .views {
          font-size: 0.95rem;
          color: #ddd;
        }
      `}</style>

      <div className="grid-container">
        {fichas.map((ficha, index) => {
          const tipo = index % 2 === 0 ? "cuadrado" : "rectangulo";
          const calificacion = parseFloat(ficha.calificacion) || 0;
          const vistas = ficha.contar_vista || 0;

          return (
            <div
              key={ficha._id || ficha.id}
              className={`cuadro ${tipo}`}
              onClick={() => onAbrirFicha(ficha)}
            >
              <img src={ficha.imagenPortada} alt={ficha.titulo} />
              <div className="info">
                <h5>{ficha.titulo}</h5>
                <div className="extra">
                  <span className="stars">{renderStars(calificacion)}</span>
                  <span className="views">👁️ {vistas}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

import React from "react";

export default function Inicio({ onAbrirFicha }) {
  const fichas = [
    { id: 1, titulo: "Ficha 1" },
    { id: 2, titulo: "Ficha 2" },
    // Agrega más fichas aquí si quieres
  ];

  return (
    <div>
      <h2>Vista Collage</h2>
      <div style={{ display: "flex", gap: 15 }}>
        {fichas.map((f) => (
          <div
            key={f.id}
            style={{
              border: "1px solid black",
              padding: 20,
              cursor: "pointer",
              width: 140,
              textAlign: "center",
              userSelect: "none",
            }}
            onClick={() => onAbrirFicha(f)}
          >
            {f.titulo}
          </div>
        ))}
      </div>
    </div>
  );
}

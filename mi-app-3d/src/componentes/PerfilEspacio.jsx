// src/componentes/PerfilEspacio.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

const Espacio1 = () => (
  <Canvas>
    <ambientLight intensity={1.5} />
    <directionalLight position={[10, 10, 5]} intensity={1.5} />
    <Float>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Float>
    <OrbitControls />
  </Canvas>
);

const Espacio2 = () => (
  <div style={{ 
    height: "400px", 
    backgroundColor: "midnightblue", 
    color: "white", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    fontSize: "24px" 
  }}>
    ¡Bienvenido a un nuevo espacio completamente diferente!
  </div>
);

const PerfilEspacio = () => {
  const [espacioActual, setEspacioActual] = useState(1);

  const cambiarEspacio = () => {
    setEspacioActual(espacioActual === 1 ? 2 : 1);
  };

  return (
    <>
      <button onClick={cambiarEspacio} style={{ marginBottom: "10px" }}>
        {espacioActual === 1 ? "Entrar a nuevo espacio" : "Volver al espacio anterior"}
      </button>
      {espacioActual === 1 ? <Espacio1 /> : <Espacio2 />}
    </>
  );
};

export default PerfilEspacio;


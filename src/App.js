import Navbar from './componentes/navbar';
import Inicio from './componentes/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Incluye el comportamiento del botón

import React from 'react';


function App (){
  return (
    <>
        <Navbar/>
      
      <div style={{height:'100vh',color:'#333'}}>
        <h1>Bienvendio</h1>
        <p>Este es el contenido de tu pagina</p>
      </div>

      <div id="mi-seccion-destino" style={{height:'100vh',backgroundColor:'#eee',padding:'80px'}}>
          <h2>Seccion Destino</h2>
          <p>Has llegado aqui al hacer clic en el logo.</p>

      </div>
    </>
    
  );
};

export default App;

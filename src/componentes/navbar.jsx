import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Incluye el comportamiento del botón

import './navbar.css'
import React from 'react';
function Navbar (){
    return (
        <nav className="navbar">
            <div className="navbar-logo">Mi sitio</div>
            <ul className="navbar-links"  style={{ fontSize: '28px' }}>
                <a href="#inicio" > Inicio</a>
                <a href="#servicio"> Servicio</a>
                <a href="#acerca"> Acerca</a>
                <a href="#contacto"> Conctacto</a>

                <a href="#mi-seccion-destino"className="navbar-log0">
                    <img src="./adm.png"alt="Logo" style={{ width: '50px' }}></img>
                </a>
            </ul>
            
        </nav>
    );
}

export default Navbar;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Incluye el comportamiento del botón


import './navbar.css'
import React from 'react';
function Navbar (){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#!"> MiMarca</a>

                <button className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collanse navbar-collanse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#!">inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">Servicios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">Contacto</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
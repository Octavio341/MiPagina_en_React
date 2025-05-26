import React from "react";
import {Link} from "react-router-dom"; // solo si usas React Router 

const Navbar = () =>{
    return(
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="text-xl font-bold">Misitio</div>
            <ul className="flex space-x-4">
                <li><link to="/" className="hover:underline">inicio</link></li>
                <li><link to="/acerca" className="hover:underline">Acerca</link></li>
                <li><link to="/contacto" className="hover:underline">Contacto</link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
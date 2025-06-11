import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error en login");
        return;
      }

      const data = await response.json();
      onLogin(data.usuario);
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container text-light d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();

  const handleLogin = (user) => {
  localStorage.setItem("usuarioLogueado", JSON.stringify(user));  // Guarda localmente
  navigate("/perfil", { state: { user } });
};


  return <LoginForm onLogin={handleLogin} />;
}

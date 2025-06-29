import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const colores = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

export default function Estadistica() {
  const [fichas, setFichas] = useState([]);
  const [tipoGrafica, setTipoGrafica] = useState("bar");
  const [criterio, setCriterio] = useState("vistas");

  useEffect(() => {
    axios.get("http://localhost:3001/api/fichas")
      .then(res => setFichas(res.data))
      .catch(err => console.error("Error al obtener fichas:", err));
  }, []);

  const transformarDatos = () => {
    return fichas.map(f => ({
      nombre: f.contactoInformacion?.titulo || f.titulo,
      vistas: f.contar_vista || 0,
      calificacion: f.calificacion || 0,
      descargas: f.recomendaciones?.contador_descargas || 0,
    })).sort((a, b) => b[criterio] - a[criterio]).slice(0, 6);
  };

  const datos = transformarDatos();

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📊 Estadísticas de Empresas</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Tipo de Gráfica</label>
          <select
            className="form-select"
            value={tipoGrafica}
            onChange={(e) => setTipoGrafica(e.target.value)}
          >
            <option value="bar">Gráfica de Barras</option>
            <option value="pie">Gráfica de Pastel</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Criterio</label>
          <select
            className="form-select"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          >
            <option value="vistas">Más Vistas</option>
            <option value="calificacion">Mayor Calificación</option>
            <option value="descargas">Más Descargas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <ResponsiveContainer width="100%" height={400}>
          {tipoGrafica === "bar" ? (
            <BarChart data={datos} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
              <XAxis type="number" />
              <YAxis dataKey="nombre" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey={criterio} fill="#8884d8" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={datos}
                dataKey={criterio}
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >
                {datos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

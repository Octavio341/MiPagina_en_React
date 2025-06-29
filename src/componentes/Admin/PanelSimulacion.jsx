import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActualizarFicha from './ActualizarFicha';

export default function PanelSimulacion() {
  const [fichas, setFichas] = useState([]);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarFichas();
  }, []);

  const cargarFichas = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/api/fichas');
      console.log("Fichas cargadas:", res.data);
      setFichas(res.data);
      setError(null);
    } catch (e) {
      setError('Error al cargar fichas');
    } finally {
      setLoading(false);
    }
  };

  const eliminarFicha = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta ficha?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/fichas/${id}/delete`);
      alert('Ficha eliminada con éxito');
      cargarFichas();
    } catch {
      alert('Error al eliminar ficha');
    }
  };

  const duplicarFicha = async (id) => {
    try {
      await axios.post(`http://localhost:3001/api/fichas/${id}/duplicar`);
      alert('Ficha duplicada con éxito');
      cargarFichas();
    } catch {
      alert('Error al duplicar ficha');
    }
  };

  const onFichaActualizada = () => {
    setFichaSeleccionada(null);
    cargarFichas();
    setMensaje("✅ Ficha actualizada correctamente");
    setTimeout(() => setMensaje(""), 3000);
  };

  if (loading) return <div>Cargando fichas...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '95vw', overflowX: 'auto' }}>
      <h2>Panel de Simulación</h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {fichaSeleccionada ? (
        <ActualizarFicha
          ficha={fichaSeleccionada}
          onCancelar={() => setFichaSeleccionada(null)}
          onActualizado={onFichaActualizada}
        />
      ) : (
        <table className="table table-bordered align-middle" style={{ minWidth: '900px' }}>
          <thead>
            <tr>
              <th style={{ width: '110px', textAlign: 'center' }}>Imagen</th>
              <th style={{ width: '220px' }}>Título</th>
              <th style={{ width: '120px' }}>Fecha</th>
              <th style={{ width: '110px' }}>Calificación</th> {/* Nueva columna */}
              <th style={{ width: '90px', textAlign: 'center' }}>Vistas</th>
              <th style={{ width: '110px', textAlign: 'center' }}>Descargas</th>
              <th style={{ width: '180px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fichas.map((ficha) => (
              <tr key={ficha._id || ficha.id}>
                <td style={{ textAlign: 'center' }}>
                  {ficha.imagenPortada ? (
                    <img
                      src={`${ficha.imagenPortada}?t=${Date.now()}`} // fuerza recarga visual
                      alt={ficha.titulo}
                      style={{ maxWidth: '90px', maxHeight: '70px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <span>No imagen</span>
                  )}
                </td>
                <td>{ficha.titulo}</td>
                <td>{new Date(ficha.fecha).toLocaleDateString()}</td>
                <td style={{ textAlign: 'center' }}>{ficha.calificacion ?? '-'}</td> {/* Calificación */}
                <td style={{ textAlign: 'center' }}>{ficha.vistas ?? ficha.contar_vista ?? 0}</td>
                <td style={{ textAlign: 'center' }}>{ficha.descargas ?? ficha.recomendaciones?.contador_descargas ?? 0}</td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setFichaSeleccionada(ficha)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => eliminarFicha(ficha._id || ficha.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => duplicarFicha(ficha._id || ficha.id)}
                  >
                    Duplicar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

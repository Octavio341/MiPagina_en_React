import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

const AdminInfo = () => {
  const [admin, setAdmin] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
      setCargando(false);
      return;
    }

    // Suponiendo que en backend tienes una ruta para obtener info del usuario por id o usuario
    fetch(`http://localhost:3000/api/admin/${usuarioLogueado._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.activo) setAdmin(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar admin:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Cargando información del administrador...</p>
      </div>
    );
  }

  if (!admin) {
    return <p className="text-center mt-5">No hay información disponible o el administrador no está activo.</p>;
  }

  const { password, Perfil, ...infoSinPassword } = admin;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={Perfil || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="Foto del administrador"
                  className="rounded-circle"
                  width="120"
                  height="120"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
                <h3 className="mt-3">{admin.nombre || "Administrador"}</h3>
                <p className="text-muted">{admin.email || "Correo no disponible"}</p>
              </div>
              <hr />
              <Row>
                {Object.entries(infoSinPassword).map(([key, value]) => (
                  <Col md={6} key={key} className="mb-3">
                    <h6 className="text-uppercase text-secondary fw-bold">{key}</h6>
                    <div className="bg-light p-2 rounded">{String(value)}</div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminInfo;


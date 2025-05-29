// src/pages/PaginaPrincipal.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => (
  <div className="container text-center mt-5">
    <h1>Bienvenido al Sistema de Gestión de Equipos</h1>
    <p><Link to="/login" className="btn btn-primary">Ingresar</Link></p>
  </div>
);

export default PaginaPrincipal;
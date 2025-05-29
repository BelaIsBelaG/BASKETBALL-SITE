// src/pages/PanelEntrenador.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PanelEntrenador = () => (
  <div className="container mt-5">
    <h2>Panel del Entrenador</h2>
    <p><Link to="/nuevo-equipo" className="btn btn-primary">Registrar nuevo equipo</Link></p>
  </div>
);

export default PanelEntrenador;

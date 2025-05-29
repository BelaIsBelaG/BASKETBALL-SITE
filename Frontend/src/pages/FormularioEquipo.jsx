// src/pages/FormularioEquipo.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormularioEquipo = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:61002/api/equipos', { nombre, categoria })
      .then(() => {
        alert('Equipo registrado');
        setNombre('');
        setCategoria('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Equipo</h2>
      <form onSubmit={manejarSubmit}>
        <input type="text" placeholder="Nombre del equipo" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Categoría" className="form-control mb-3" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <button className="btn btn-success">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioEquipo;

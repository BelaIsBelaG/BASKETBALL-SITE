// src/pages/PanelPublico.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelPublico = () => {
  const [equipos, setEquipos] = useState([]);
useEffect(() => {
  axios.get('http://localhost:61002/api/equipos')
       .then(res => setEquipos(res.data))
       .catch(err => console.error('Error equipos:', err));
}, []);


  return (
    <div className="container mt-5">
      <h2>Equipos Registrados</h2>
      <ul className="list-group">
        {equipos.map((equipo, i) => (
          <li key={i} className="list-group-item">
            {equipo.nombre} - {equipo.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelPublico;
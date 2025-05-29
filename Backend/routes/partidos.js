const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/auth');

//GET /api/partidos
router.get('/', (req, res) => {
  const db = req.app.get('db');
  const sql = `
    SELECT P.*, EL.nombre AS equipo_local, EV.nombre AS equipo_visitante
    FROM Partidos P
    JOIN Equipos EL ON P.equipo_local_id = EL.id
    JOIN Equipos EV ON P.equipo_visitante_id = EV.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error obteniendo partidos' });
    res.json(results);
  });
});

// POST /api/partidos
router.post('/', verificarToken, verificarRol('Administrador', 'Entrenador'), (req, res) => {
  const db = req.app.get('db');
  const { equipo_local_id, equipo_visitante_id, fecha, lugar, resultado } = req.body;
  
  if (equipo_local_id === equipo_visitante_id)
    return res.status(400).json({ error: 'Un equipo no puede jugar contra sí mismo' });

  db.query('INSERT INTO Partidos (equipo_local_id, equipo_visitante_id, fecha, lugar, resultado) VALUES (?, ?, ?, ?, ?)',
    [equipo_local_id, equipo_visitante_id, fecha, lugar, resultado],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error creando partido' });
      res.status(201).json({ mensaje: 'Partido creado', id: result.insertId });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/auth');

// GET /api/jugadores
router.get('/', (req, res) => {
  const db = req.app.get('db');
  const sql = `SELECT J.*, E.nombre AS equipo FROM Jugadores J LEFT JOIN Equipos E ON J.equipo_id = E.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error obteniendo jugadores' });
    res.json(results);
  });
});

// POST /api/jugadores
router.post('/', verificarToken, verificarRol('Administrador', 'Entrenador'), (req, res) => {
  const db = req.app.get('db');
  const { nombre, apellido, posicion, altura, equipo_id } = req.body;
  
  if (!nombre || !apellido || !posicion || !altura || !equipo_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query('INSERT INTO Jugadores (nombre, apellido, posicion, altura, equipo_id) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, posicion, altura, equipo_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error creando jugador' });
      res.status(201).json({ mensaje: 'Jugador creado', id: result.insertId });
    });
});

module.exports = router;
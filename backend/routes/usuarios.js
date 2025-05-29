const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/auth');

// GET /api/usuarios
router.get('/', verificarToken, verificarRol('Administrador'), (req, res) => {
  const db = req.app.get('db');
  db.query('SELECT id, nombre, email, rol_id FROM Usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error obteniendo usuarios' });
    res.json(results);
  });
});

// POST /api/usuarios
router.post('/', verificarToken, verificarRol('Administrador'), (req, res) => {
  const db = req.app.get('db');
  const { nombre, email, password, rol_id } = req.body;
  db.query('INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)',
    [nombre, email, password, rol_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error creando usuario' });
      res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
    });
});

// DELETE /api/usuarios/:id
router.delete('/:id', verificarToken, verificarRol('Administrador'), (req, res) => {
  const db = req.app.get('db');
  db.query('DELETE FROM Usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Error eliminando usuario' });
    res.json({ mensaje: 'Usuario eliminado' });
  });
});

module.exports = router;

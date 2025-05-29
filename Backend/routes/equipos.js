const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary'); //Configuración de Cloudinary
const { verificarToken, verificarRol } = require('../middleware/auth');

// GET todos los equipos (público)
router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.query('SELECT * FROM Equipos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener equipos' });
    res.json(results);
  });
});

// POST para crear un nuevo equipo con imagen subida a Cloudinary
router.post(
  '/',
  verificarToken,
  verificarRol(['Administrador', 'Entrenador']),
  upload.single('logo'), //  Multer configurado con Cloudinary
  (req, res) => {
    const db = req.app.get('db');
    const { nombre, ciudad, fundacion, entrenador_id } = req.body;
    const logo_url = req.file?.path || null; // URL pública de Cloudinary

    const sql = `
      INSERT INTO Equipos (nombre, ciudad, fundacion, logo_url, entrenador_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nombre, ciudad, fundacion || null, logo_url, entrenador_id || null],
      (err, result) => {
        if (err) {
          console.error('Error al insertar el equipo:', err);
          return res.status(500).json({ error: 'Error al crear el equipo' });
        }
        res.status(201).json({ message: 'Equipo creado con éxito', id: result.insertId });
      }
    );
  }
);

// DELETE equipo por ID (solo para Administrador)
router.delete('/:id', verificarToken, verificarRol('Administrador'), (req, res) => {
  const db = req.app.get('db');
  db.query('DELETE FROM Equipos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar equipo' });
    res.json({ mensaje: 'Equipo eliminado exitosamente' });
  });
});

module.exports = router;

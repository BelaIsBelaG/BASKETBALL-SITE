const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//LOGIN
router.post('/login', (req, res) => {
  const db = req.app.get('db');
  const { email, password } = req.body;
  console.log('REQ-BODY:', email, password);

  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error de servidor' });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const usuario = results[0];
    console.log('DB-USER:', usuario.email, usuario.password);

    // Si el password es igual al guardado en la base de datos (sin hashear)
    if (password === usuario.password) {
      const payload = {
        id: usuario.id,
        rol: usuario.rol_id === 1 ? 'Administrador' : (usuario.rol_id === 2 ? 'Entrenador' : 'Publico')
      };
      const token = jwt.sign(payload, 'CLAVE_SECRETA', { expiresIn: '1h' });
      return res.json({ token });
    }

    //
    try {
      const match = await bcrypt.compare(password, usuario.password);
      if (!match) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

      const payload = {
        id: usuario.id,
        rol: usuario.rol_id === 1 ? 'Administrador' : (usuario.rol_id === 2 ? 'Entrenador' : 'Publico')
      };
      const token = jwt.sign(payload, 'CLAVE_SECRETA', { expiresIn: '1h' });
      res.json({ token });
    } catch (e) {
      return res.status(500).json({ error: 'Error comparando contraseñas' });
    }
  });
});

//REGISTER
router.post('/register', async (req, res) => {
  const db = req.app.get('db');
  const { nombre, email, password, rol_id = 3 } = req.body;

  // Evitar hashear si el password no existe
  if (!password) {
    return res.status(400).json({ error: 'La contraseña es obligatoria' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)',
      [nombre, email, hash, rol_id],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Error registrando usuario' });
        res.status(201).json({ mensaje: 'Usuario registrado', id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Error generando hash' });
  }
});

module.exports = router;

// middleware/auth.js
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ mensaje: 'Token requerido' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token malformado' });

  try {
    const decoded = jwt.verify(token, 'CLAVE_SECRETA');
    req.usuario = decoded; // cambiamos de req.user a req.usuario para mantener consistencia
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
}

function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permiso' });
    }
    next();
  };
}

module.exports = { verificarToken, verificarRol };

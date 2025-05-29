require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // <--- nuevo
const app = express();

// Middleware
const { verificarToken, verificarRol } = require('./middleware/auth');

// Rutas
const authRoutes = require('./routes/auth');
const equiposRoutes = require('./routes/equipos');
const jugadoresRoutes = require('./routes/jugadores');
const partidosRoutes = require('./routes/partidos');
const usuariosRoutes = require('./routes/usuarios');

app.use(cors()); // <--- permite peticiones desde el frontend
app.use(express.json());

// Servir archivos estáticos (por ejemplo, imágenes de logos)
app.use('/uploads', express.static('uploads')); // <--- muy importante para mostrar imágenes

// Conexión MySQL a filess.io
const connection = mysql.createConnection({
  host: '4je4t.h.filess.io',
  user: 'Basketball_maindrewon',
  password: '838c7bdda34ab4ca458a2e023cc8652c359c6250',
  database: 'Basketball_maindrewon',
  port: 61002
});

// Verificar conexión
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

// Compartir conexión a otros módulos
app.set('db', connection);

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/partidos', partidosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Levantar servidor
const port = 61002;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

// Cierre de conexión al salir
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) console.error('Error cerrando la conexión:', err);
    else console.log('Conexión MySQL cerrada.');
    process.exit();
  });
});

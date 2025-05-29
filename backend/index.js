require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware
const { verificarToken, verificarRol } = require('./middleware/auth');

// Rutas
const authRoutes = require('./routes/auth');
const equiposRoutes = require('./routes/equipos');
const jugadoresRoutes = require('./routes/jugadores');
const partidosRoutes = require('./routes/partidos');
const usuariosRoutes = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Conexión MySQL a filess.io
const connection = mysql.createConnection({
  host: '4je4t.h.filess.io',
  user: 'Basketball_maindrewon',
  password: '838c7bdda34ab4ca458a2e023cc8652c359c6250',
  database: 'Basketball_maindrewon',
  port: 61002
});

connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

app.set('db', connection);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/partidos', partidosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

// Cierre conexión
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) console.error('Error cerrando la conexión:', err);
    else console.log('Conexión MySQL cerrada.');
    process.exit();
  });
});

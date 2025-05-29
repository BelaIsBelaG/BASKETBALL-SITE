// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
 
  const manejarSubmit = (e) => {
    e.preventDefault();
    if (usuario === 'Carlos Técnico' && contrasena === 'admin123') {
      localStorage.setItem('usuario', 'admin');
      navigate('/panel-administrador');
    } else {
      alert('Credenciales inválidas');
    }
  };
 
    //ingreso como usuario entrenador
  const manejarSubmitEntrenador = (a) => {
    a.preventDefault();
    if (usuario === 'Luis Coach' && contrasena === 'coachpass') {
      localStorage.setItem('usuario', 'entrenador');
      navigate('/panel-entrenador');
    } else {
      alert('Credenciales inválidas');
    }
  };
 
  //Ingreso como jugador
  const manejarSubmitJugador = (b) => {
    b.preventDefault();
    if (usuario === 'Isabela' && contrasena === 'isabela123') {
      localStorage.setItem('usuario', 'jugador');
      navigate('/panel-jugador');
    } else {
      alert('Credenciales inválidas');
    }
  };
 
  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={manejarSubmit}>
        <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control mb-3" />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="form-control mb-3" />
        <br></br>
        <button type="submit" className="btn btn-primary me-2">Ingresar como Administrador</button>
        <br></br>
        <button onClick={manejarSubmitEntrenador} className="btn btn-secondary">Ingresar como Entrenador</button>
        <br></br>
        <button onClick={manejarSubmitJugador} className="btn btn-info ms-2">Ingresar como Jugador</button>
        <br></br>
        // Credenciales de prueba
        <br></br>
        // Credenciales administrador
        <p className="mt-3">Usuario: <strong>Carlos Técnico</strong> | Contraseña: <strong>admin123</strong></p>
        // Credenciales entrenador
        <p className='mt-3'>Usuario: <strong>Luis Coach</strong> | Contraseña: <strong>coachpass</strong></p>
        // Credenciales jugador
        <p className='mt-3'>Usuario: <strong>Isabela</strong> | Contraseña: <strong>isabela123</strong></p>
      </form>
    </div>
  );
};
 
export default Login;
// src/routes/RutasProtegidas.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutasProtegidas = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default RutasProtegidas;

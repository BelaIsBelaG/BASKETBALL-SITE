// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Login from './pages/Login';
import PanelEntrenador from './pages/PanelEntrenador';
import PanelPublico from './pages/PanelPublico';
import FormularioEquipo from './pages/FormularioEquipo';
import RutasProtegidas from './routes/RutasProtegidas';

const App = () => (
  <Routes>
    <Route path="/" element={<PaginaPrincipal />} />
    <Route path="/login" element={<Login />} />
    <Route path="/panel-publico" element={<PanelPublico />} />
    <Route element={<RutasProtegidas />}>
      <Route path="/panel-entrenador" element={<PanelEntrenador />} />
      <Route path="/nuevo-equipo" element={<FormularioEquipo />} />
    </Route>
  </Routes>
);

export default App;
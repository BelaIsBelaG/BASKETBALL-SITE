// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navbar';
import PanelPublico from './pages/PanelPublico';
import Login from './pages/Login';
import PanelAdmin from './pages/PanelAdmin';
import Inicio from './pages/Inicio';

function App() {
  return (
    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/equipos" element={<PanelPublico />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

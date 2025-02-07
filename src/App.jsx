// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router';

import MainList from './pages/MainList';
import Detail from './pages/Detail';
import './App.scss';
import Login from './pages/Login';
import Navigation from './components/Navigation';

// src/index.js 또는 src/App.jsx

function App() {
  return (
    <div >

      
      <Routes>
        <Route path="/" element={<div><Navigation /><MainList /></div>}/>
        <Route path="/detail/:id" element={<div><Navigation /><Detail /></div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}




export default App;

// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router';
import MainList from './pages/MainList';
import Detail from './pages/Detail';
import './App.scss';
// src/index.js 또는 src/App.jsx

function App() {
  return (
    <div >
      <Navigation />
      <Routes>
        <Route path="/" element={<MainList />}/>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="nav-background">
    <nav className="nav-container">
      <div className="nav-item">체스턴</div>
      <div className="nav-item" onClick={()=>{navigate('/')}}>홈</div>
      <div style={{flexGrow:1}}></div>
      <div className="nav-item">로그인</div>
      <div className="nav-item">회원가입</div>
    </nav>
    </div>
  );
}


export default App;

// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import MainList from './pages/MainList';
import Detail from './pages/Detail';

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<MainList />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

function Navigation(){
  const navigate = useNavigate();
  return(
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Cheston</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;

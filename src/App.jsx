// src/App.jsx

import React from 'react';
import './App.css';
import data from './database'; // data.js에서 data를 가져옴
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BasicTable from './pages/BasicTable';

function App() {
  console.log(data)
  return (
    <div>
      <Navigation/>
      <BasicTable data={data}/>
    </div>
  );
}

function Navigation(){
  return(
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Cheston</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}



export default App;

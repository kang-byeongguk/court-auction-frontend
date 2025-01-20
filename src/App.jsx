// src/App.jsx

import React from 'react';
import './App.css';
import data from './database'; // data.js에서 data를 가져옴
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BasicTable from './pages/BasicTable';
import { Route, Routes } from 'react-router';
import Detail from './pages/Detail';
import axios from 'axios';

function App() {
  axios.get('http://localhost:5173/detail/1').then((result)=>{console.log(result.data)})
  return (
    <div>
      <Navigation/>
      
      <Routes>
      <Route path="/" element={<BasicTable data={data}/>} />
      <Route path="/detail/:id" element={<Detail data={data}/>} />
    </Routes>
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

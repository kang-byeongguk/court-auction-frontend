// src/App.jsx

import React, { useEffect, useState } from 'react';
import './App.css';
import data from './database'; // data.js에서 data를 가져옴
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MainList from './pages/MainList';
import { Route, Routes, useNavigate } from 'react-router';
import Detail from './pages/Detail';
import axios from 'axios';


function App() {
  const [listData,setListData] = useState([]);
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/list/').then((result)=> setListData([...result.data]))
     
    
  },[])
  
  
  return (
    <div>
      <Navigation/> {/*nav바*/}
      
      <Routes>
      <Route path="/" element={<MainList data={listData}/>} />
      <Route path="/detail/:id" element={<Detail/>} />
    </Routes>
    </div>
  );
}

function Navigation(){
  let navigate = useNavigate();
  return(
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Cheston</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}



export default App;

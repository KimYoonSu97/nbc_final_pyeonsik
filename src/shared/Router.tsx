import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main';
import Layout from '../layout/Layout';
import { GlobalStyle } from '../styles/GlobalStyle';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';


const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main';
import Layout from '../layout/Layout';
import { GlobalStyle } from '../styles/GlobalStyle';
import Detail from 'src/pages/Detail';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path='/detail/:postId' element={<Detail/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

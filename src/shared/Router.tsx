import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main';
import Layout from '../layout/Layout';
import { GlobalStyle } from '../styles/GlobalStyle';
import Mypage from 'src/pages/Mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

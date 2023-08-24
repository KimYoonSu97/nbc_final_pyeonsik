import React from 'react';
import Main from '../pages/Main';
import Layout from '../layout/Layout';
import { GlobalStyle } from '../styles/GlobalStyle';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Write from 'src/pages/Write';
import Detail from 'src/pages/Detail';
import Edit from 'src/pages/Edit';
import Mypage from 'src/pages/Mypage';
import PostWriteCommon from 'src/components/post/PostWriteCommon';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<Write />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/mypage/:tab" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

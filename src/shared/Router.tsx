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
import Report from 'src/components/sidebar/Report';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
          <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />

          <Route path="/write" element={<Write />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path='/report' element={<Report/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

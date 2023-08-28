import React from 'react';
import { GlobalStyle } from '../styles/GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Layout from '../layout/Layout';
// pages
import Main from '../pages/Main';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import PasswordReset from 'src/pages/PasswordReset';
import PasswordChange from 'src/pages/PasswordChange';
import Detail from 'src/pages/Detail';
import EventProd from 'src/pages/EventProd';
import Mypage from 'src/pages/Mypage';
import Write from 'src/pages/Write';
import Edit from 'src/pages/Edit';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_reset" element={<PasswordReset />} />
          <Route path="/password_change" element={<PasswordChange />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/event" element={<EventProd />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mypage/:tab" element={<Mypage />} />
            <Route path="/write" element={<Write />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          {/* <Route path="/write" element={<Write />} />
          <Route path="/edit/:id" element={<Edit />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

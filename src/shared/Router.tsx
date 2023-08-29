import React from 'react';
import { GlobalStyle } from '../styles/GlobalStyle';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Layout from '../layout/Layout';
import LayoutWrite from 'src/layout/LayoutWrtie';
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
import SearchResult from 'src/pages/SearchResult';
import Report from 'src/components/sidebar/Report';
import PostModal from 'src/components/renderPosts/PostModal';

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let state = location.state as { backgroundLocation?: Location };

  window.addEventListener('beforeunload', (event) => {
    navigate(location.pathname);
  });

  return (
    <>
      <GlobalStyle />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_reset" element={<PasswordReset />} />
          <Route path="/password_change" element={<PasswordChange />} />
          <Route path="/report" element={<Report />} />
          <Route path="/event" element={<EventProd />} />
          <Route path="/search/:type" element={<SearchResult />} />
          <Route path="/detail/:id" element={<Detail />} />

          <Route element={<PrivateRoute />}>
            <Route path="/mypage/:tab" element={<Mypage />} />
            <Route path="/write" element={<Write />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/detail/:id" element={<PostModal />} />
        </Routes>
      )}
    </>
  );
};

export default Router;

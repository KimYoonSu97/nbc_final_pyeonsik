import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'src/styles/GlobalStyle';
import Layout from 'src/layout/Layout';
import Main from 'src/pages/Main';
import Write from 'src/pages/Write';
import Detail from 'src/pages/Detail';
import Edit from 'src/pages/Edit';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/write" element={<Write />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from 'react';
import Header from '../components/header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from 'src/components/sidebar/SideBar';

const LayoutWrite = () => {
  const location = useLocation();

  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutWrite;

const S = {};

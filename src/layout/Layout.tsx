import React from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/sidebar/SideBar';
import styled from 'styled-components';

const Layout = () => {
  return (
    <>
      <Header />
      <S.Container>
        <S.ContentsArea>
          <Outlet />
        </S.ContentsArea>
        <SideBar />
      </S.Container>
    </>
  );
};

export default Layout;

const S = {
  Container: styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 31px 16px 0 16px;
    background: var(--background, #f6f7f9);
    display: flex;
    gap: 62px;
  `,
  ContentsArea: styled.div`
    width: 100%;
    height: calc(100vh - 50px - 50px - 31px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `
};

import React from 'react';
import Header from '../components/header/Header';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from 'src/components/sidebar/SideBar';

const Layout = () => {
  const param = useParams();
  const location = useLocation();

  return (
    <>
      <Header />

      <S.BottomContainer>
        <S.Container id="scroll">
          <S.ContentsArea>
            <Outlet />
          </S.ContentsArea>
          {location.pathname === '/login' ||
          location.pathname === '/register' ||
          location.pathname.split('/')[1] === 'detail' ? (
            <></>
          ) : (
            <SideBar />
          )}
        </S.Container>
      </S.BottomContainer>
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
    justify-content: center;
  `,

  BottomContainer: styled.div`
    margin-top: 106px;
    background: var(--background, #f6f7f9);
    height: calc(100vh - 50px - 56px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  ContentsArea: styled.div`
    position: relative;
    width: 890px;
  `,

  PositionBox: styled.div`
    width: 296px;
    height: 10px;
  `
};

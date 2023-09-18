import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from 'src/components/sidebar/SideBar';
import styled, { css } from 'styled-components';
import { FlexBoxCenter, FlexBoxColum } from 'src/styles/styleBox';
import { IconTopButton } from 'src/components/icons';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const containerRef = useRef<HTMLDivElement | null>(null);

  const Top = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  console.log(containerRef);

  return (
    <>
      {path === 'write' || path === 'edit' ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <S.BottomContainer $path={path} ref={containerRef}>
            <S.Container id="scroll">
              <S.ContentsArea $path={path}>
                <Outlet />
              </S.ContentsArea>
              {path === 'login' || path === 'register' || path === 'detail' || path === 'report' ? <></> : <SideBar />}
            </S.Container>
          </S.BottomContainer>
          <S.TopButton onClick={Top}>
            {' '}
            <IconTopButton />
            위로 가기
          </S.TopButton>
        </>
      )}
    </>
  );
};

export default Layout;

interface Props {
  $path?: string;
}

const S = {
  Container: styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 31px 16px 0 16px;
    background: var(--background, #f6f7f9);
    display: flex;
    gap: 62px;
    /* justify-content: center; */
  `,

  BottomContainer: styled.div<Props>`
    margin-top: ${(props) => {
      switch (props.$path) {
        case 'write':
          return '56px';
        case 'detail':
          return '56px';
        case 'edit':
          return '56px';
        case 'report':
          return '56px';
        default:
          return '106px';
      }
    }};

    background: var(--background, #f6f7f9);
    height: ${(props) => {
      switch (props.$path) {
        case 'detail':
          return 'calc(100vh - 56px)';
        case 'report':
          return 'calc(100vh - 56px)';
        default:
          return 'calc(100vh - 50px - 56px)';
      }
    }};

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  ContentsArea: styled.div<Props>`
    position: relative;
    width: 890px;
    ${(props) => {
      if (props.$path === 'register' || props.$path === 'detail') {
        return css`
          margin: 0 auto;
        `;
      }
    }}
  `,
  PositionBox: styled.div`
    width: 296px;
    height: 10px;
  `,

  TopButton: styled(FlexBoxColum)`
    cursor: pointer;
    position: fixed;
    z-index: 999;
    right: 16px;
    bottom: 184px;

    width: 74px;
    height: 74px;
    border-radius: 60px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 160% */
  `
};

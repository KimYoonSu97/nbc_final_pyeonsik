import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import TopBarMenuContainer from './TopBarMenuContainer';
import BoardSearchContainer from './BoardSearchContainer';
import { IconLogoSymbolH22, IconWaterMarkH22 } from '../icons';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  return (
    <S.Area $path={path}>
      <S.UpperContainer>
        <S.LogoContainer onClick={() => navigate('/')}>
          <IconLogoSymbolH22 />
          <IconWaterMarkH22 />
        </S.LogoContainer>
        <TopBarMenuContainer />
      </S.UpperContainer>
      {path === 'detail' || path === 'report' ? (
        <></>
      ) : (
        <S.LowerContainer>
          <BoardSearchContainer />
        </S.LowerContainer>
      )}
    </S.Area>
  );
};

export default Header;

interface Props {
  $path?: string;
}

const S = {
  Area: styled.div<Props>`
    width: 100vw;
    height: ${(props) => {
      switch (props.$path) {
        case 'detail':
          return '56px';
        case 'report':
          return '56px';
        default:
          return '106px';
      }
    }};
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
  `,
  UpperContainer: styled.div`
    width: 1280px;
    height: 56px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
  `,
  LowerContainer: styled.div`
    width: 1280px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
  `,
  LogoContainer: styled.div`
    color: white;
    width: 80px;
    height: 22px;
    position: absolute;
    left: 16px;
  `
};

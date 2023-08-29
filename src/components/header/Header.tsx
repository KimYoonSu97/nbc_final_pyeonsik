import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import TopBarMenuContainer from './TopBarMenuContainer';
import BoardSearchContainer from './BoardSearchContainer';
import WriteHeader from './write_edit/WriteHeader';
import EditHeader from './write_edit/EditHeader';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  console.log(path);
  return (
    <S.Area $path={path}>
      <S.UpperContainer>
        <S.LogoContainer onClick={() => navigate('/')}>LOGO</S.LogoContainer>
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
    background-color: black;
    padding: 5px 13px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    position: absolute;
    left: 16px;
  `
};

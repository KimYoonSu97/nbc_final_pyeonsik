import React from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import TopBarMenuContainer from './TopBarMenuContainer';
import BoardSearchContainer from './BoardSearchContainer';

const Header = () => {
  const navigate = useNavigate();

  return (
    <S.Area className="TopbarAea">
      <S.UpperContainer>
        <S.LogoContainer onClick={() => navigate('/')}>LOGO</S.LogoContainer>
        <TopBarMenuContainer />
      </S.UpperContainer>
      <S.LowerContainer>
        <BoardSearchContainer></BoardSearchContainer>
      </S.LowerContainer>
    </S.Area>
  );
};

export default Header;

const S = {
  Area: styled.div`
    width: 100vw;
    height: 106px;
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
    /* justify-content: center; */
    align-items: center;
    position: relative;
  `,

  LowerContainer: styled.div`
    width: 1280px;
    height: 50px;

    margin: 0 auto;
    display: flex;
    /* justify-content: center; */
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

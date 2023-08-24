import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageSideBar from './mypage/MypageSideBar';
import RankSideBar from './rank/RankSideBar';
import Fotter from './Fotter';

const SideBar = () => {
  const location = useLocation();
  return (
    <S.Container>
      <S.FixedContainer>
        {location.pathname.includes('/mypage') ? <MypageSideBar /> : <RankSideBar />}
        <Fotter />
      </S.FixedContainer>
    </S.Container>
  );
};

export default SideBar;

const S = {
  Container: styled.div`
    /* width: 296px; */
    margin-left: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px - 56px - 31px);
  `,
  FixedContainer: styled.div`
    /* position: absolute; */
    margin-left: auto;
    display: flex;
    flex-direction: column;

    height: calc(100vh - 50px - 56px - 31px);
  `
};

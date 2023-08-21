import React from 'react';
import NewReview from './NewReview';
import RealTimeCombo from './RealTimeCombo';
import FetchPosts from './FetchPosts';
import Fotter from './Fotter';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import MypageSideBar from './mypage/MypageSideBar';

const SideBar = () => {
  const location = useLocation();

  return (
    <S.Container>
      {location.pathname === '/mypage' ? (
        <>
          <MypageSideBar />
        </>
      ) : (
        <>
          <FetchPosts />
          <RealTimeCombo />
          <NewReview />
        </>
      )}
      <Fotter />
    </S.Container>
  );
};

export default SideBar;

const S = {
  Container: styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px - 50px - 31px);
  `
};

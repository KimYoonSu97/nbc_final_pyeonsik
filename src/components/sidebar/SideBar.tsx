import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageSideBar from './mypage/MypageSideBar';
import RankSideBar from './rank/RankSideBar';
import Footer from './Footer';
import EventSideBar from './event/EventSideBar';

const SideBar = () => {
  const location = useLocation();

  return (
    <S.Container>
      <S.FixedContainer>
        {(() => {
          switch (location.pathname) {
            case '/':
              return <RankSideBar />;
            case '/event':
              return <EventSideBar />;
            default:
              return <MypageSideBar />;
          }
        })()}
        <Footer />
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

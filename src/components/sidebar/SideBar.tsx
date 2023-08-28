import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageSideBar from './mypage/MypageSideBar';
import RankSideBar from './rank/RankSideBar';
import Footer from './Footer';
import EventSideBar from './event/EventSideBar';

const SideBar = () => {
  const location = useLocation();

  const findPath = (str: string): string => {
    console.log(str.split('/')[1]);
    return str.split('/')[1];
  };

  return (
    <S.Container>
      <S.FixedContainer>
        {(() => {
          switch (findPath(location.pathname)) {
            case 'detail':
              return <RankSideBar />;
            case 'event':
              return <EventSideBar />;
            case 'mypage':
              return <MypageSideBar />;
            default:
              return <RankSideBar />;
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

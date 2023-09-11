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
    return str.split('/')[1];
  };

  return (
    <S.Container>
      <S.FixedContainer>
        {(() => {
          switch (findPath(location.pathname)) {
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
    position: fixed;
    right: calc(((100vw - 1280px) / 2) + 16px);
    top: 130px;
  `,

  FixedContainer: styled.div`
    margin-left: auto;
    position: relative;

    height: calc(100vh - 50px - 56px - 31px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    flex-direction: column;
  `,
  EmptyBox: styled.div`
    width: 100px;
    height: 100px;
    background: #62aaff;
  `
};

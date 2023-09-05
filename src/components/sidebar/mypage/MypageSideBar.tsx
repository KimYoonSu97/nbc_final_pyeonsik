import React from 'react';
import { styled } from 'styled-components';
import MypageSideBarInfo from './MypageSideBarInfo';
import MypageSideBarButtonTab from './MypageSideBarButtonTab';

const MypageSideBar = () => {
  return (
    <S.Container>
      <S.ContentsBox>
        <MypageSideBarInfo />
      </S.ContentsBox>
      <S.ContentsBox>
        <MypageSideBarButtonTab />
      </S.ContentsBox>
    </S.Container>
  );
};

export default MypageSideBar;

const S = {
  Container: styled.div`
    padding-bottom: 100px;
  `,

  ContentsBox: styled.div`
    background: white;
    width: 296px;
    border-radius: 10px;
    margin-bottom: 20px;
  `
};

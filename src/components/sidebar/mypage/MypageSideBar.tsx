import React from 'react';
import { styled } from 'styled-components';
import MypageSideBarInfo from './MypageSideBarInfo';

const MypageSideBar = () => {
  return (
    <S.ContentsBox>
      <MypageSideBarInfo />
    </S.ContentsBox>
  );
};

export default MypageSideBar;

const S = {
  ContentsBox: styled.div`
    background: white;
    border-radius: 10px;
  `,

  ProfileArea: styled.div`
    display: flex;
    align-items: center;

    gap: 12px;
    margin: 24px 16px 32px 16px;
    background-color: royalblue;
  `,
  ProfileImg: styled.div`
    width: 60px;
    height: 60px;
    border-radius: 75px;
    background: #d9d9d9;
  `,
  DetailArea: styled.div``,
  Level: styled.div`
    border-radius: 100px;
    /* width: 58px; */
    height: 20px;
    padding: 0px 9px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    background: #d9d9d9;
  `,
  NickName: styled.div`
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  `
};

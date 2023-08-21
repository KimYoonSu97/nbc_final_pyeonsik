import React from 'react';
import styled from 'styled-components';

const MypageSideBarInfo = () => {
  return (
    <>
      <S.ProfileArea>
        <S.ProfileImg>이미지</S.ProfileImg>
        <S.DetailArea>
          <S.Level>Lv.식신</S.Level>
          <S.NickName>닉네임 구역</S.NickName>
        </S.DetailArea>
      </S.ProfileArea>
    </>
  );
};

export default MypageSideBarInfo;

const S = {
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

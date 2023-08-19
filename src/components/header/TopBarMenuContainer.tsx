import React from 'react';
import { styled } from 'styled-components';

const TopBarMenuContainer = () => {
  const boolean = false;

  return (
    <S.TopBarMenuContainer>
      <S.TopBarListContainer>
        <S.TopBarMenu>편식 소개</S.TopBarMenu>
        <S.TopBarMenu>제품 요청</S.TopBarMenu>
        <S.TopBarMenu>행사 목록</S.TopBarMenu>
        {boolean ? <S.TopBarMenu>마이페이지</S.TopBarMenu> : <></>}
      </S.TopBarListContainer>
      <S.TopBarLogContainer>
        {/* 로그인 전 후 분기 */}
        {boolean ? (
          <>
            <S.Icon></S.Icon>
          </>
        ) : (
          <>
            <S.TopBarLogButton>로그인</S.TopBarLogButton>
            <S.TopBarLogButton>회원가입</S.TopBarLogButton>
          </>
        )}
      </S.TopBarLogContainer>
    </S.TopBarMenuContainer>
  );
};

export default TopBarMenuContainer;

const S = {
  TopBarMenuContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    position: absolute;
    right: 16px;
  `,
  TopBarListContainer: styled.ul`
    display: flex;
  `,
  TopBarMenu: styled.li`
    padding: 5px 13px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    background-color: salmon;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TopBarLogContainer: styled.ul`
    display: flex;
    gap: 12px;
  `,
  TopBarLogButton: styled.li`
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  Icon: styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
  `
};

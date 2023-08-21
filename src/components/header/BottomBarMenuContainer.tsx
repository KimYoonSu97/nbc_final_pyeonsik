import React from 'react';
import styled from 'styled-components';

const BottomBarMenuContainer = () => {
  return (
    <>
      <S.ButtonArea>
        <S.BoardButton>전체보기</S.BoardButton>
        <S.BoardButton>편식조합</S.BoardButton>
        <S.BoardButton>그르르갉</S.BoardButton>
      </S.ButtonArea>
      <S.QuickButtonArea>
        <S.QuickPostButton>나만의 편식조합 공유하기</S.QuickPostButton>
        <S.QuickPostButton>신제품 리뷰하기</S.QuickPostButton>
      </S.QuickButtonArea>
    </>
  );
};

export default BottomBarMenuContainer;

const S = {
  ButtonArea: styled.div`
    display: flex;
    margin-right: 14px;
  `,
  BoardButton: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 3px 18px;
    border-bottom: 2px solid #000;
  `,
  QuickButtonArea: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  QuickPostButton: styled.div`
    display: flex;
    align-items: center;
    border-radius: 100px;
    background-color: #f5f5f5;
    padding: 3px 18px;
    height: 34px;
  `
};

import React from 'react';
import styled from 'styled-components';

const BottomBarMenuContainer = () => {
  return (
    <S.ButtonArea>
      <S.BoardButton>전체보기</S.BoardButton>
      <S.BoardButton>편식조합</S.BoardButton>
      <S.BoardButton>그르르갉</S.BoardButton>
    </S.ButtonArea>
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
    border-bottom: 2px solid white;
    &:hover {
      border-bottom: 2px solid #000;
    }
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

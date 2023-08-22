import React, { useEffect } from 'react';
import { styled } from 'styled-components';

const MyPost = () => {
  useEffect(() => {
    console.log('보관함 컴포넌트 마운트됨');
    return () => {
      console.log('보관함 컴포넌트 언마운트됨');
    };
  });

  return (
    <>
      <S.ButtonArea>
        <S.FilterButton>저장 레시피</S.FilterButton>
        <S.FilterButton>내가 쓴 글</S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>카드 영역</S.ContentsArea>
    </>
  );
};

export default MyPost;

const S = {
  ButtonArea: styled.div`
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    position: fixed;
    top: 137px;
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 999;
  `,
  ContentsArea: styled.div`
    background-color: royalblue;
    height: 4000px;
  `,
  FilterButton: styled.button`
    padding: 5px 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  `
};

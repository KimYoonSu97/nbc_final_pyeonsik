import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { modalOpenAtom } from 'src/globalState/jotai';
import { IconWriteButton } from 'src/components/icons';
import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.FixedContainer>
        <S.WriteButton onClick={() => navigate('/write')}>
          <IconWriteButton /> 글쓰기
        </S.WriteButton>
        <S.FilterArea>
          <S.FilterButton $isSelected={true}>추천글</S.FilterButton>
          <S.FilterButton $isSelected={false}>최신글</S.FilterButton>
        </S.FilterArea>
      </S.FixedContainer>
      <PostList />
    </>
  );
};

export default Main;

interface FilterProps {
  $isSelected: boolean;
}

const S = {
  FixedContainer: styled.div`
    width: 100%;

    display: flex;
    justify-content: flex-end;
    gap: 12px;

    position: fixed;
    top: 137px;
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 9;
  `,
  WriteButton: styled.div`
    gap: 2px;
    display: flex;
    width: 80px;
    height: 26px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 100px;
    border: 1px solid var(--neutral-300, #d0d5dd);
    background: #fff;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
  `,
  FilterArea: styled.div`
    display: flex;
    gap: 5px;
  `,
  FilterButton: styled.div<FilterProps>`
    display: flex;
    width: 46px;
    height: 26px;
    border-radius: 100px;

    background: ${(props) => {
      if (props.$isSelected) {
        return 'f6f7f9';
      } else {
        return '#fff';
      }
    }};

    font-weight: ${(props) => {
      if (props.$isSelected) {
        return '400';
      } else {
        return '700';
      }
    }};

    justify-content: center;
    align-items: center;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    line-height: 16px; /* 133.333% */
  `
};

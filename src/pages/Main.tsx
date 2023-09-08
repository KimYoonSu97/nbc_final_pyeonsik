import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';
import { IconWriteButton } from 'src/components/icons';
import styled from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { writeCategorySelect } from 'src/globalState/jotai';

const Main = () => {
  const navigate = useNavigate();
  const userId = useLoginUserId();
  const [_, setWriteCategory] = useAtom(writeCategorySelect);

  return (
    <>
      <S.FixedContainer>
        <S.WriteButton
          onClick={() => {
            if (!userId) {
              toast('로그인 후 이용 가능합니다.');
              return;
            }
            setWriteCategory('');
            navigate('/write');
          }}
        >
          <IconWriteButton /> 글쓰기
        </S.WriteButton>
        <S.FilterArea>
          <S.FilterButton $isSelected={true}>추천글</S.FilterButton>
          <S.FilterButton $isSelected={false}>최신글</S.FilterButton>
        </S.FilterArea>
      </S.FixedContainer>
      <S.FixedBox></S.FixedBox>
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

    position: fixed;
    /* top: 137px; */
    padding: 20px 0 10px;
    top: 106px;
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 1;
    background: #f6f7f9;
  `,
  FixedBox: styled.div`
    width: 100%;
    height: 20px;
    position: fixed;
    top: 156px;
    background: linear-gradient(0deg, transparent 0%, #f6f7f9 50%, #f6f7f9 100%);
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 1;
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

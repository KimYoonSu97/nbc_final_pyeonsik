import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';
import { IconWriteButton } from 'src/components/icons';
import styled from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { toast } from 'react-toastify';
import { atom, useAtom } from 'jotai';
import { userAtom, writeCategorySelect } from 'src/globalState/jotai';
import { EMAIL_CHECK, NON_MEMBER, SERVICE_PREPARING } from 'src/utility/guide';
import PostSkeleton from 'src/components/skeleton/PostSkeleton';

export const isLoadingAtom = atom<Boolean>(true);

const Main = () => {
  const [isLoading] = useAtom(isLoadingAtom);
  const navigate = useNavigate();
  const userId = useLoginUserId();
  const [_, setWriteCategory] = useAtom(writeCategorySelect);
  const [userLogin, __] = useAtom(userAtom);

  return (
    <>
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </>
      )}
      <S.FixedContainer>
        <S.WriteButton
          onClick={() => {
            if (!userId && !userLogin) {
              toast(NON_MEMBER);
              return;
            }
            setWriteCategory('');
            navigate('/write');
          }}
        >
          <IconWriteButton />글 쓰기
        </S.WriteButton>
        <S.FilterArea>
          <S.FilterButton
            $isSelected={true}
            onClick={() => {
              toast(SERVICE_PREPARING);
            }}
          >
            추천순
          </S.FilterButton>
          <S.FilterButton $isSelected={false}>최신순</S.FilterButton>
        </S.FilterArea>
      </S.FixedContainer>
      <S.FixedBox />
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

    padding: 24px 0px 10px 0px;

    top: 106px;
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 2;
    background: #f6f7f9;
  `,
  FixedBox: styled.div`
    width: 100%;

    height: 7px;

    position: fixed;

    top: 160px;

    background: linear-gradient(0deg, transparent 0%, #f6f7f9 100%);

    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 2;
  `,
  WriteButton: styled.div`
    padding: 3px 15px;
    margin-right: 12px;

    gap: 2px;
    display: flex;
    height: 26px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    border-radius: 100px;
    border: 1px solid var(--neutral-300, #d0d5dd);
    background: #fff;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
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
    cursor: pointer;

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
    line-height: 16px;
  `
};

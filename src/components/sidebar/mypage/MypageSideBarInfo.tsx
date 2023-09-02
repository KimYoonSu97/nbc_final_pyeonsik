import React from 'react';
import styled from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { getMyPostsById } from 'src/api/posts';
import { getUserData } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { IconBadge, IconCommon, IconRecipe } from 'src/components/icons';

const MypageSideBarInfo = () => {
  const userId = useLoginUserId();

  const [
    { data: userData, isLoading: userIsLoading, isError: userIsError },
    { data: myPostData, isLoading: myPostIsLoading, isError: myPostIsError }
  ] = useQueries({
    queries: [
      {
        queryKey: ['loginUser'],
        queryFn: () => getUserData(userId),
        enabled: userId ? true : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false
      },
      {
        queryKey: ['MyPost'],
        queryFn: () => getMyPostsById(userId),
        enabled: userId ? true : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false
      }
    ]
  });

  if (userIsLoading || myPostIsLoading) {
    return <div>loading</div>;
  }
  if (userIsError || myPostIsError) {
    return <div>error</div>;
  }

  return (
    <>
      <S.ProfileArea>
        <S.ProfileImg $url={userData?.data?.profileImg}></S.ProfileImg>
        <S.DetailArea>
          <S.Level>
            <S.Leveltext>Lv.식신</S.Leveltext>
          </S.Level>
          <S.NickName>{userData?.data?.nickname}</S.NickName>
        </S.DetailArea>
      </S.ProfileArea>
      <S.ButtonArea>
        <S.SummaryButton>
          <S.IconArea>
            <IconRecipe />
          </S.IconArea>
          <S.Caption>편식조합</S.Caption>
          <S.Caption>
            {
              myPostData?.data?.filter((item) => {
                return item.postCategory === 'recipe';
              }).length
            }
            개
          </S.Caption>
        </S.SummaryButton>
        <S.SummaryButton>
          <S.IconArea>
            <IconCommon />
          </S.IconArea>
          <S.Caption>그르르갉</S.Caption>
          <S.Caption>
            {
              myPostData?.data?.filter((item) => {
                return item.postCategory === 'common';
              }).length
            }
            개
          </S.Caption>
        </S.SummaryButton>
        <S.SummaryButton>
          <S.IconArea>
            <IconBadge />
          </S.IconArea>
          <S.Caption>뱃지 개수</S.Caption>
          <S.Caption>15개</S.Caption>
        </S.SummaryButton>
      </S.ButtonArea>
    </>
  );
};

export default MypageSideBarInfo;

interface ImageProps {
  $url: string;
}

const S = {
  ProfileArea: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 16px 32px 16px;
  `,

  ProfileImg: styled.div<ImageProps>`
    width: 60px;
    height: 60px;
    border-radius: 75px;
    background-image: ${(props) => {
      return `url(${props.$url})`;
    }};
    background-size: contain;
    background-position: center;
  `,

  DetailArea: styled.div``,
  Level: styled.div`
    border-radius: 100px;
    border: 1px solid transparent;

    background-image: linear-gradient(#fff, #fff), linear-gradient(40deg, #ffb334, #d9d9d9);
    background-origin: border-box;
    background-clip: content-box, border-box;

    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Leveltext: styled.div`
    width: 100%;
    background: #fff;
    margin: 0 12px;
    color: var(--font-black, var(--black, #242424));
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
  `,

  NickName: styled.div`
    color: var(--font-black, var(--black, #242424));

    margin-top: 4px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  `,

  ButtonArea: styled.div`
    display: flex;
    margin: 0 16px 24px 16px;
    /* justify-content: center; */
    gap: 9px;
  `,

  SummaryButton: styled.div`
    width: 82px;
    height: 94px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  IconArea: styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100px;

    border-radius: 100px;
    border: 1px solid transparent;

    background-image: linear-gradient(#fff, #fff),
      linear-gradient(320deg, #ffcc4d -8.38%, #ffffff 75.7%, #f02826 91.27%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
  `,

  Caption: styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  `
};

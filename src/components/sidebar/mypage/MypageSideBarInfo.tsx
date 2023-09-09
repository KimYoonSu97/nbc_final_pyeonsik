import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { getMyPostsById } from 'src/api/posts';
import { getUserData } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { IconBadge, IconCommon, IconRecipe } from 'src/components/icons';
import { styleFont } from 'src/styles/styleFont';
import UserLevel from 'src/components/header/UserLevel';
import supabase from 'src/lib/supabaseClient';
import { FlexBox } from 'src/styles/styleBox';

const getUserIdBadgeCount = async (userId: string) => {
  const { data, error } = await supabase.from('badge').select('*').eq('user_id', userId);

  if (error) {
    console.error('데이터를 가져올 수 없습니다.');
    return 0;
  }

  let trueBadgeCount = 0;

  if (data && data.length > 0) {
    for (const badge of data) {
      for (const key in badge) {
        if (badge[key] === true) {
          trueBadgeCount++;
        }
      }
    }
  }
  return trueBadgeCount;
};

const MypageSideBarInfo = () => {
  const userId = useLoginUserId();
  const [badgeCount, setBadgeCount] = useState(0);

  console.log(badgeCount);

  useEffect(() => {
    const fetchBadgeCount = async () => {
      const count = await getUserIdBadgeCount(userId);
      setBadgeCount(count);
    };

    if (userId) {
      fetchBadgeCount();
    }
  }, [userId]);

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
        refetchOnMount: false,
        staleTime: Infinity
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
        <S.ProfileImg $url={userData?.data?.profileImg} />
        <S.DetailArea>
          <UserLevel level={userData?.data?.level} />
          <S.NickName>{userData?.data?.nickname}</S.NickName>
        </S.DetailArea>
      </S.ProfileArea>
      <S.ButtonArea>
        <S.SummaryButton>
          <S.IconArea>
            <IconRecipe />
          </S.IconArea>
          <S.Caption>편식조합</S.Caption>
          <S.CaptionCount>
            {
              myPostData?.data?.filter((item) => {
                return item.postCategory === 'recipe';
              }).length
            }
            개
          </S.CaptionCount>
        </S.SummaryButton>
        <S.SummaryButton>
          <S.IconArea>
            <IconCommon />
          </S.IconArea>
          <S.Caption>그르르갉</S.Caption>
          <S.CaptionCount>
            {
              myPostData?.data?.filter((item) => {
                return item.postCategory === 'common';
              }).length
            }
            개
          </S.CaptionCount>
        </S.SummaryButton>
        <S.SummaryButton>
          <S.IconArea>
            <IconBadge />
          </S.IconArea>
          <S.Caption>뱃지 개수</S.Caption>
          <S.CaptionCount>{badgeCount}개</S.CaptionCount>
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

  DetailArea: styled(FlexBox)`
    flex-direction: column;
    align-items: flex-start;
  `,

  NickName: styled.div`
    color: var(--font-black, var(--black, #242424));

    margin-top: 4px;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  `,

  ButtonArea: styled.div`
    display: flex;
    margin: 0 16px 0 16px;
    padding-bottom: 24px;
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
    ${styleFont.labelMedium}
  `,
  CaptionCount: styled.p`
    color: var(--neutral-500, #667085);

    ${styleFont.bodySmall}
  `
};

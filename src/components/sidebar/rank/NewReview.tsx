import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Post } from 'src/types/types';
import { postsAtom } from '../FetchPosts';
import { RankProps } from 'src/types/types';
import styled from 'styled-components';

const NewReview = () => {
  //Jotai의 useAtom을 사용해서 전역선언한 Posts데이터를 가져오기
  const [posts] = useAtom(postsAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //컴포넌트 마운트 시 패치해 온 posts 중 시간순으로 정렬해서 5개 디스플레이
  useEffect(() => {
    const sortedPosts = [...posts];
    //   .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    //   .slice(0, 5);
    // setFilteredPosts(sortedPosts);
  }, [posts]);

  return (
    <S.ContentsArea>
      <S.ProductName>서비스 준비중입니다.</S.ProductName>

      {/* 요기부터 하위컴포넌트를 맵으로 돌려벌입니다. */}
      {/* <S.ContentWrapper>
        <S.Img />
        <S.ProductInfo>
          <S.ProductName>서비스 준비중입니다.</S.ProductName> */}

      {/* 이건함수가 있어야해서 컴포넌트를 하나 맹글어서 프롭스로 내려줘야할거같네용 */}
      {/* <S.Result>서비스 준비중입니다.</S.Result>
        </S.ProductInfo>
      </S.ContentWrapper> */}
      {/* 요기까지 맵.. */}
    </S.ContentsArea>
  );
};

export default NewReview;

const S = {
  ContentsArea: styled.div`
    display: flex;
    width: 296px;
    padding: 8px;
    /* flex-direction: column; */
  `,
  ContentWrapper: styled.div`
    width: 100%;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  `,
  Img: styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
  `,
  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ProductName: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  Result: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `
};

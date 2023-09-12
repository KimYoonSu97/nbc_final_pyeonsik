import React from 'react';
import RealTimeCombo from './RealTimeCombo';
import NewReview from './NewReview';
import FetchPosts from '../FetchPosts';
import styled from 'styled-components';
import KakaoMap from 'src/kakaoMap/KakaoMap';

const RankSideBar = () => {
  return (
    <S.Container>
      <S.TitleArea>지금 인기있는 편식 조합</S.TitleArea>
      <S.ContentsBox>
        <FetchPosts />
        <RealTimeCombo />
      </S.ContentsBox>
      <S.TitleArea>편의점 신제품 리뷰</S.TitleArea>
      <S.ContentsBox>
        <NewReview />
        {/* <KakaoMap /> */}
      </S.ContentsBox>
    </S.Container>
  );
};

export default RankSideBar;

const S = {
  Container: styled.div`
    /* padding-bottom: 100px; */
    padding-bottom: 0px;
  `,

  ContentsBox: styled.div`
    background: white;
    border-radius: 10px;
    margin-bottom: 20px;
  `,
  TitleArea: styled.div`
    margin: 3px 0 11px 0;
    color: var(--font-black, var(--Black, #242424));

    /* title-small */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `
};

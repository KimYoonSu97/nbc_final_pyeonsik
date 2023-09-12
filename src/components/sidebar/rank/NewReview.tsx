import React from 'react';
import { SERVICE_PREPARING } from 'src/utility/guide';

import styled from 'styled-components';

const NewReview = () => {
  return (
    <S.ContentsArea>
      <S.ProductName>{SERVICE_PREPARING}</S.ProductName>

      {/* 요기부터 하위컴포넌트를 맵으로 돌려벌입니다. */}
      {/* <S.ContentWrapper>
        <S.Img />
        <S.ProductInfo>
          <S.ProductName>{SERVICE_PREPARING}</S.ProductName> */}

      {/* 이건함수가 있어야해서 컴포넌트를 하나 맹글어서 프롭스로 내려줘야할거같네용 */}
      {/* <S.Result>{SERVICE_PREPARING}</S.Result>
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

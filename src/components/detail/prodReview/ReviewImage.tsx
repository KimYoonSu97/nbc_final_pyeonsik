import React from 'react';
import styled from 'styled-components';

interface PropsType {
  type: string;
}

const ReviewImage = ({ type }: PropsType) => {
  return (
    <div>
      {type === 'like' ? (
        <S.ReviewWrap>
          <img src="/images/ReviewLike.png" alt="좋아요 이미지" draggable="false" />
          <S.ReviewText>또 사먹을래요!</S.ReviewText>
        </S.ReviewWrap>
      ) : (
        <S.ReviewWrap>
          <img src="/images/ReviewDisLike.png" alt="싫어요 이미지" draggable="false" />
          <S.ReviewText>그만 먹을래요!</S.ReviewText>
        </S.ReviewWrap>
      )}
    </div>
  );
};

export default ReviewImage;

const S = {
  ReviewWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  ReviewText: styled.h1`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -1.5px;
  `
};

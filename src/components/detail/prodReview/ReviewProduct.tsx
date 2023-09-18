import React from 'react';
import { Product } from 'src/types/types';
import { LOGO_IMAGE } from 'src/utility/guide';
import { styled } from 'styled-components';

interface ReviewProductProps {
  prod: Product;
}

const ReviewProduct = ({ prod }: ReviewProductProps) => {
  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.target.onerror = null;
    e.target.src = LOGO_IMAGE;
  };

  return (
    <S.ReviewBox key={prod.id}>
      <S.ProdImgBox>
        <S.ProdImg src={prod.prodImg} alt="상품 사진 없음" onError={onErrorImg} />
      </S.ProdImgBox>
      <div>
        <div>{prod.prodName}</div>
        <div>나의 평가: {}</div>
      </div>
      <div>
        <div>또 사먹을래요!</div>
        <div>graph</div>
        <div>percent</div>
        <div>그만 먹을래요!</div>
        <div>graph</div>
        <div>percent</div>
      </div>
    </S.ReviewBox>
  );
};

export default ReviewProduct;

const S = {
  ReviewBox: styled.div`
    background: #fff;

    width: 890px;
    height: 158px;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
  `,

  ProdImg: styled.img`
    width: 111.862px;
    height: 117.678px;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  `,

  ProdImgBox: styled.div``
};

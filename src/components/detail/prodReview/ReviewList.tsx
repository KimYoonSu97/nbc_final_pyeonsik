import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNewProd } from 'src/api/product';
import { Product } from 'src/types/types';
import { styled } from 'styled-components';
import ReviewProduct from './ReviewProduct';
import { FlexBoxAlignCenter, FlexBoxColumn } from 'src/styles/styleBox';
import { getSwiperData } from 'src/api/ReviewSwiper';
import { LOGO_IMAGE } from 'src/utility/message';

const ReviewList = () => {
  const { isLoading: lodingProd, data: dataProd } = useQuery({ queryKey: ['new_prod'], queryFn: () => getNewProd() });
  const { isLoading: lodingSwiper, data: dataSwiper } = useQuery({
    queryKey: ['swiper'],
    queryFn: () => getSwiperData()
  });

  const produts = dataProd?.data as Product[] | undefined;
  const swiper = dataSwiper?.data;

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.target.onerror = null;
    e.target.src = LOGO_IMAGE;
  };

  if (lodingProd || lodingSwiper) {
    return <p>Loading…</p>;
  }
  if (dataProd?.error || dataSwiper?.error) {
    return <p>error</p>;
  }

  return (
    <S.ReviewContainer>
      {produts?.map((product) => {
        return (
          <S.ReviewBox key={product.id}>
            <S.ProdImg src={product.prodImg} alt="상품 사진 없음" onError={onErrorImg} />
            <S.TextContainer>
              <S.ProdName>{product.prodName}</S.ProdName>
              <S.MyText>
                <S.MyEvaluation>나의 평가 : </S.MyEvaluation>
                <>😎</>
                <S.MyEvaluation>또 사먹을래요!</S.MyEvaluation>
              </S.MyText>
            </S.TextContainer>
            <div>
              <S.IsGoodText>또 사먹을래요!</S.IsGoodText>
              <div>graph</div>
              <div>percent</div>
              <S.IsGoodText>그만 먹을래요!</S.IsGoodText>
              <div>graph</div>
              <div>percent</div>
            </div>
          </S.ReviewBox>
        );
      })}
    </S.ReviewContainer>
  );
};

export default ReviewList;

const S = {
  ReviewContainer: styled(FlexBoxColumn)`
    gap: 20px;
  `,

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

    object-fit: contain;
  `,

  TextContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 4px;
  `,

  ProdName: styled.div`
    width: 306px;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px; /* 136.364% */
  `,

  MyEvaluation: styled.div`
    color: var(--neutral-500, #667085);

    /* body-large */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  `,

  MyText: styled(FlexBoxAlignCenter)`
    gap: 4px;
  `,

  IsGoodText: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* button-small */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 114.286% */
  `,

  t: styled.div``,

  r: styled.div``,

  e: styled.div``,

  w: styled.div``,

  q: styled.div``
};

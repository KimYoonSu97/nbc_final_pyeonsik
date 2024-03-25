import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProdData, getSwiperData } from 'src/api/ReviewSwiper';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { IconAllReview } from 'src/components/icons';
import { ERROR_IMG } from 'src/utility/guide';
import ProdCardSwiper from './ProdCardSwiper';
import ReviewImage from './ReviewImage';

const ReviewLocation = () => {
  const userId = useLoginUserId();
  const { id } = useParams<string>();

  const navigate = useNavigate();

  const { data: swiperData } = useQuery(['swiperData'], getSwiperData);
  const { data: prodData } = useQuery(['products'], getProdData);

  const product = prodData?.find((data) => data && data.id == id);

  const reviewedProduct = swiperData?.data?.find((prod) => {
    return prod.prodId === product?.id && prod.userId === userId;
  });

  const plusReview = swiperData?.data?.find((prod) => {
    return prod.prodId === id && prod.userId === userId;
  });

  return (
    <S.containerWrap>
      <S.containerInner>
        <S.ProdReviewWrap>
          <S.ReviewImageWrap className={reviewedProduct?.isGood === true ? 'selected' : ''}>
            <ReviewImage type={'like'} />
          </S.ReviewImageWrap>
          {reviewedProduct ? (
            <S.ProductWrap>
              <S.productInner>
                <p>
                  <img src={product?.prodImg} alt="상품 사진 없음" onError={ERROR_IMG} draggable="false" />
                </p>
                <S.blurWrap>
                  <div className="textBlur">
                    <h1>{product?.prodName}</h1>
                  </div>
                  <h3>
                    앗! 이미<span>평가한 상품이에요!</span>
                  </h3>
                </S.blurWrap>
              </S.productInner>
            </S.ProductWrap>
          ) : (
            <S.CardWrap>
              <ProdCardSwiper type={'product'} prod={product} />
            </S.CardWrap>
          )}
          <S.ReviewImageWrap className={reviewedProduct?.isGood === false ? 'selected' : ''}>
            <ReviewImage type={'disLike'} />
          </S.ReviewImageWrap>
        </S.ProdReviewWrap>
        <S.AllReviewsWrap onClick={() => navigate('/review_list')}>
          <p>
            <IconAllReview />
            <span>신상품 리뷰 보기</span>
          </p>
        </S.AllReviewsWrap>
      </S.containerInner>
    </S.containerWrap>
  );
};

export default ReviewLocation;

const S = {
  CardWrap: styled.div`
    position: relative;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 356px;
    height: 464px;
  `,
  ProductWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 356px;
    height: 464px;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #e4e7ec;
    box-shadow: 0px 0px 16px rgba(206, 212, 218, 0.1);
    div {
      width: 100%;
      text-align: center;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75%;
        border-radius: 10px;
        img {
          width: auto;
          max-width: 250px;
          height: auto;
          border-radius: 10px;
        }
      }
    }
  `,
  blurWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 25%;
    border-top: solid 2px #e4e7ec;
    overflow: hidden;
    box-sizing: border-box;
    h1 {
      display: block;
      filter: blur(6px);
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      user-select: none;
    }
    h3 {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px;
      letter-spacing: -1.5px;
      span {
        display: block;
      }
    }
    .textBlur {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #e4e7ec;
      filter: blur(7px);
    }
  `,
  ProdNameWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 25%;

    h1 {
      display: block;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      user-select: none;
    }
    div {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  `,
  productInner: styled.div`
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
  `,
  containerWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  `,
  containerInner: styled.div`
    padding: 70px 0px 74px 0px;
  `,
  ProdReviewWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
    .selected {
      border: 2px solid transparent;
      background-image: linear-gradient(#fff, #fff), linear-gradient(to right, red 0%, orange 100%);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  `,
  ReviewImageWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
  `,
  ReviewProducts: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    bottom: 0;
  `,
  ReviewEndWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: dotted 1px #111;
    border-radius: 10px;
    width: 356px;
    height: 464px;
    box-shadow: inset 0px 0px 25px 10px #f6f6f6;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button {
        letter-spacing: -2px;
      }
    }
    p {
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px;
      text-align: center;
      letter-spacing: -2px;
      margin-bottom: 16px;
      span {
        display: block;
      }
    }

    button {
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      padding: 8px 26px;
      border-radius: 100px;
      background-color: #e4e7ec;
    }
  `,
  SkipButtonWrap: styled.div`
    text-align: center;
  `,
  SkipButton: styled.button`
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    letter-spacing: -2px;
    background-color: #f9fafb;
    border-radius: 100px;
    padding: 8px 57px;
    margin-bottom: 16px;
  `,
  AllReviewsWrap: styled.button`
    display: block;
    margin: 0px auto 0px auto;
    p {
      display: flex;
      align-items: center;
      gap: 5px;
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        color: #667085;
        letter-spacing: -1px;
      }
    }
  `
};

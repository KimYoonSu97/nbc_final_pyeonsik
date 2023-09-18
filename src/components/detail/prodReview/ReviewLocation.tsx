import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getProdData, getSwiperData } from 'src/api/ReviewSwiper';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import Swipeable from 'react-swipy';
import styled from 'styled-components';
import { IconAllReview } from 'src/components/icons';
import { toast } from 'react-toastify';
import { CardSwiper } from 'react-card-rotate-swiper';
import { ERROR_IMG } from 'src/utility/guide';

const ReviewLocation = () => {
  const userId = useLoginUserId();
  const { id } = useParams<string>();

  const navigate = useNavigate();

  const { data: swiperData } = useQuery(['swiperData'], getSwiperData);
  const { data: prodData } = useQuery(['products'], getProdData);

  const product = prodData?.find((data) => {
    return data && data.id == id;
  });

  const reviewedProduct = swiperData?.data?.find((prod) => {
    return prod.prodId === product?.id && prod.userId === userId;
  });

  const onDropToLike = async (id: string | undefined) => {
    const plusReview = swiperData?.data?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (!plusReview) {
      const addReview = {
        prodId: id,
        isGood: true,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      toast('평가를 완료했어요.');
      navigate('/review_list');
    }
  };

  const onDropToDisLike = async (id: string | undefined) => {
    const plusReview = swiperData?.data?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (!plusReview) {
      const addReview = {
        prodId: id,
        isGood: false,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      toast('평가를 완료했어요.');
      navigate('/review_list');
    }
  };

  const cardsSwipe = (dir: any, id: string) => {
    if (dir === 'left') {
      onDropToLike(id);
    } else if (dir === 'right') {
      onDropToDisLike(id);
    }
  };

  const skip = () => {};
  return (
    <>
      <S.containerWrap>
        <S.containerInner>
          <S.ProdReviewWrap>
            <S.ReviewDisLike className={reviewedProduct?.isGood === true ? 'selected' : ''}>
              <div>
                <img src="/images/ReviewLike.png" draggable="false" />
                <h1>또 사먹을래요!</h1>
              </div>
            </S.ReviewDisLike>
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
              <S.Div>
                <div key={product?.id}>
                  <CardSwiper
                    onSwipe={(dir: any) => cardsSwipe(dir, product?.id)}
                    className={'card'}
                    contents={
                      <div className="cardWrap">
                        <div>
                          <img src={product?.prodImg} alt="상품 사진 없음" onError={ERROR_IMG} draggable="false" />
                        </div>
                        <h3 className="text">{product?.prodName}</h3>
                      </div>
                    }
                  ></CardSwiper>
                </div>
              </S.Div>
            )}

            <S.ReviewDisLike className={reviewedProduct?.isGood === false ? 'selected' : ''}>
              <div>
                <img src="/images/ReviewDisLike.png" draggable="false" />
                <h1>그만 먹을래요!</h1>
              </div>
            </S.ReviewDisLike>
          </S.ProdReviewWrap>
          <S.AllReviewsWrap onClick={() => navigate('/review_list')}>
            <p>
              <IconAllReview />
              <span>신상품 리뷰 보기</span>
            </p>
          </S.AllReviewsWrap>
        </S.containerInner>
      </S.containerWrap>
    </>
  );
};

export default ReviewLocation;

const S = {
  Div: styled.div`
    position: relative;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 356px;
    height: 464px;
    /* &::before {
      display: block;
      content: '';
      position: absolute;
      left: 50%;
      top: -20px;
      margin-left: -165px;
      width: 330px;
      height: 470px;
      background-color: #f9fafb;
      border: solid 1px #f2f4f7;
      border-radius: 10px;
    }
    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 50%;
      top: -10px;
      margin-left: -171px;
      width: 342px;
      height: 470px;
      background-color: #f9fafb;
      border: solid 1px #e4e7ec;
      border-radius: 10px;
    } */
    .card {
      z-index: 999;
      position: absolute;
    }
    .cardWrap {
      width: 356px;
      height: 464px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      border: 2px solid transparent;
      background-image: linear-gradient(#fff, #fff), linear-gradient(to right, red 0%, orange 100%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      div {
      }
      img {
        width: auto;
        height: auto;
        max-width: 300px;
      }
    }
    .text {
      font-weight: bolder;
      font-size: 22px;
      text-align: center;
      color: #111;
    }
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
  ReviewLike: styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -1.5px;
    }
  `,
  ReviewDisLike: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -1.5px;
    }
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

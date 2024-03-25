import React from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';
import styled from 'styled-components';
import { IconAllReview } from 'src/components/icons';
import { useNavigate } from 'react-router';
import { getProdData, getSwiperData } from 'src/api/ReviewSwiper';
import ProdCardSwiper from './ProdCardSwiper';
import { useAtom } from 'jotai';
import { swiperStep } from 'src/globalState/jotai';
import ReviewImage from './ReviewImage';
import { Product } from 'src/types/types';

const ProdReviewSwiper = () => {
  const [step, setStep] = useAtom(swiperStep);
  const userId = useLoginUserId();
  const navigate = useNavigate();

  const [{ data: swiperData, isLoading: swiperLoading }, { data: prodData, isLoading: prodIsLoading }] = useQueries({
    queries: [
      {
        queryKey: ['swiper'],
        queryFn: getSwiperData,
        keepPreviousData: true,
      },
      {
        queryKey: ['products'],
        queryFn: getProdData,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
      }
    ]
  });

  const filterprodData = prodData?.filter((prod) => {
    return !swiperData?.data?.find((swiperProd) => {
      return prod.id === swiperProd.prodId && swiperProd.userId === userId;
    });
  });

  return (
    <S.containerWrap>
      <S.ProdReviewWrap>
        <S.ReviewImageWrap>
          <ReviewImage type={'like'} />
        </S.ReviewImageWrap>
        {step === filterprodData?.length || filterprodData === undefined ? (
          <S.ReviewEndWrap>
            <div>
              <p>
                앗! 더이상 남은<span>신상품 카드가 없어요!</span>
              </p>
              <button onClick={() => navigate('/review_list')}>리뷰 보러가기</button>
            </div>
          </S.ReviewEndWrap>
        ) : (
          <S.CardWrap>
            {filterprodData?.map((prod: Product, index) => {
              return (
                <div key={prod.id}>
                  {step === index && (
                    <div>
                      <ProdCardSwiper type={'products'} prod={prod} />
                    </div>
                  )}
                </div>
              );
            })}
          </S.CardWrap>
        )}
        <S.ReviewImageWrap>
          <ReviewImage type={'disLike'} />
        </S.ReviewImageWrap>
      </S.ProdReviewWrap>
      {step !== filterprodData?.length && (
        <S.SkipButtonWrap>
          <S.SkipButton onClick={() => setStep(step + 1)}>SKIP!</S.SkipButton>
        </S.SkipButtonWrap>
      )}
      <S.AllReviewsWrap onClick={() => navigate('/review_list')}>
        <p>
          <IconAllReview />
          <span>신상품 리뷰 보기</span>
        </p>
      </S.AllReviewsWrap>
    </S.containerWrap>
  );
};

export default ProdReviewSwiper;

const S = {
  CardWrap: styled.div`
    position: relative;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 356px;
    height: 464px;
    &::before {
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
    }
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
        max-width: 250px;
        margin-bottom: 40px;
      }
    }
    .text {
      font-weight: bolder;
      font-size: 22px;
      text-align: center;
      color: #111;
    }
  `,

  containerWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
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
  ReviewDisLike: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
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
    border: 2px solid transparent;
    background-image: linear-gradient(#fff, #fff), linear-gradient(to right, red 0%, orange 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 0px 0px 16px rgba(206, 212, 218, 0.1);
    div {
      align-items: center;
      text-align: center;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75%;
      }
      img {
        width: auto;
        max-width: 350px;
        height: auto;
      }
    }
  `,
  productInner: styled.div`
    position: relative;
    height: 100%;
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

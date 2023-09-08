import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { IconBadBig, IconGoodFace } from 'src/components/icons';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';

const ProdReview = () => {
  const [review, setReview] = React.useState(0);

  const [step, setStep] = React.useState(0);
  const showPage = 5;
  const userId = useLoginUserId();

  useEffect(() => {
    getSwiperData();
  }, []);

  const getProdData = async () => {
    const { data } = await supabase.from('show_products').select('id,prodName,prodImg');
    return data;
  };

  const { data: prodData } = useQuery(['products'], getProdData);

  const getSwiperData = async () => {
    const { data } = await supabase.from('swiper').select('*');
    return data;
  };

  const { data: swiperData } = useQuery(['swiper'], getSwiperData);

  const filterprodData = prodData?.filter((prod) => {
    return !swiperData?.some((swiperProd) => {
      return prod.id === swiperProd.prodId && swiperProd.userId === userId;
    });
  });
  console.log(filterprodData);

  // const [currentIndex, setCurrentIndex] = useState(filterprodData!.length - 1);
  // console.log(currentIndex);

  const onDropToLike = async (id: string) => {
    const plusReview = swiperData?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (plusReview) {
      const updateReview = {
        ...plusReview,
        isGood: true
      };
      await supabase.from('swiper').upsert([updateReview]);
      prodNext();
    } else {
      const addReview = {
        prodId: id,
        isGood: true,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      prodNext();
    }
  };

  const onDropToDisLike = async (id: string) => {
    console.log(id);
    const plusReview = swiperData?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (plusReview) {
      const updateReview = {
        ...plusReview,
        isGood: false
      };
      const { error } = await supabase.from('swiper').upsert([updateReview]);
      if (error) {
        console.error(error);
      } else {
        prodNext();
      }
    } else {
      const addReview = {
        prodId: id,
        isGood: false,
        userId: userId
      };
      const { error } = await supabase.from('swiper').insert([addReview]);
      if (error) {
        console.error('Supabase 삽입 오류:', error);
      } else {
        prodNext();
      }
    }
  };
  const onSwipe = (direction: any, prod: any) => {
    // 스와이프 완료 시 처리 로직
    // if (direction === 'right') {
    //   return onDropToLike(prod);
    // } else {
    //   return onDropToDisLike(prod);
    // }
  };

  const onCardLeftScreen = (direction: string, prod: string) => {
    if (direction === 'right') {
      return onDropToLike(prod);
    } else {
      return onDropToDisLike(prod);
    }
  };

  const prodNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const swipe = () => {
    prodNext();
  };

  return (
    <S.containerWrap>
      <S.ProdReviewWrap>
        <S.ReviewDisLike>
          <div>
            <img src="/images/ReviewLike.png" />
            <h1>또 먹을래요!</h1>
          </div>
        </S.ReviewDisLike>
        {step === filterprodData?.length ? (
          <S.ReviewEndWrap>
            <div>
              <p>
                앗! 더이상 남은<span>신제품 카드가 없어요!</span>
              </p>
              <button>리뷰 보러가기</button>
            </div>
          </S.ReviewEndWrap>
        ) : (
          <S.ReviewProducts>
            <div className="tinderCards">
              <div className="tinderCards__cardContainer">
                {filterprodData?.map((prod, index) => (
                  <div key={index}>
                    {index === step && (
                      <TinderCard
                        className="swipe"
                        key={index}
                        preventSwipe={['up', 'down']} // 스와이프 방향 설정
                        onSwipe={(dir) => onSwipe(dir, prod.id)}
                        onCardLeftScreen={(dir) => onCardLeftScreen(dir, prod.id)}
                      >
                        <S.ProductsWrap>
                          <div>
                            <img src={prod.prodImg} draggable="false" />
                            <h3>{prod.prodName}</h3>
                          </div>
                        </S.ProductsWrap>
                      </TinderCard>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </S.ReviewProducts>
        )}
        <S.ReviewDisLike>
          <div>
            <img src="/images/ReviewLike.png" />
            <h1>그만 먹을래요!</h1>
          </div>
        </S.ReviewDisLike>
      </S.ProdReviewWrap>
      <S.SkipButtonWrap>
        <S.SkipButton onClick={swipe}>SKIP!</S.SkipButton>
      </S.SkipButtonWrap>
    </S.containerWrap>
  );
};

export default ProdReview;

const S = {
  containerWrap: styled.div`
    position: relative;
    left: 0;
    top: 0;
    border-radius: 10px;
    padding: 100px 0px;
    overflow: hidden;
    background-color: #fff;
    height: 700px;
  `,

  ProdReviewWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 28px;
  `,

  ProductsWrap: styled.div`
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

    div {
      /* padding: 40px 28px 140px 28px; */

      img {
        width: 300px;
        height: auto;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
      }
    }
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
  ProdItemWrap: styled.div`
    position: relative;
    left: 0;
    top: 0px;
    background-color: #fff;
  `,

  ReviewProducts: styled.div`
    .tinderCards__cardContainer {
      width: 356px;
      height: 464px;
      position: relative;
      left: 0;
      top: 0;
    }
    .swipe {
      position: absolute;
      left: 0;
      top: 0;

      div {
      }
    }
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
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  SkipButton: styled.button`
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    background-color: #f9fafb;
    border-radius: 100px;
    padding: 8px 57px;
  `
};

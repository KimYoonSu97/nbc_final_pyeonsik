import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import { IconGoodBig, IconAllReview } from 'src/components/icons';
import { useLocation, useNavigate } from 'react-router';
import { debounce } from 'lodash';

const ProdReview = () => {
  const [step, setStep] = useState(0);
  const userId = useLoginUserId();
  const navigate = useNavigate();

  useEffect(()=>{
    setStep(0)
  },[])

  const getProdData = async () => {
    const { data } = await supabase
      .from('show_products')
      .select('id,prodName,prodImg')
      .order('created_at', { ascending: false })
      .limit(5)
    return data;
  };

  const getSwiperData = async () => {
    const { data } = await supabase.from('swiper').select('*');
    return data;
  };

  const { data: prodData } = useQuery(['products'], getProdData);

  const { data: swiperData } = useQuery(['swiper'], getSwiperData);

  const filterprodData = prodData?.filter((prod) => {
    return !swiperData?.some((swiperProd) => {
      return prod.id === swiperProd.prodId && swiperProd.userId === userId;
    });
  });

  const onDropToLike = async (id: string) => {
    console.log(id);
    const plusReview = swiperData?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (!plusReview) {

      const addReview = {
        prodId: id,
        isGood: true,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      return;
    }
  };

  const onDropToDisLike = async (id: string) => {
    const plusReview = swiperData?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (!plusReview) {

      const addReview = {
        prodId: id,
        isGood: false,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      return;
    }
  };

  const prodNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onCardLeftScreen = (direction: string, prod: string) => {
    if (direction === 'left') {
      onDropToLike(prod);
      prodNext();
    } else if (direction === 'right') {
      onDropToDisLike(prod);
      prodNext();
    }
  };
  console.log(step);

  const skip = () => {
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
        {step !== filterprodData?.length ? (
          <S.ReviewProducts>

            <div className="tinderCards">
              <div className="tinderCards__cardContainer">
                  {filterprodData?.map((prod, index) => (
                    <div key={prod.id}>
                      {index === step && (
                        <TinderCard
                          className="swipe"
                          key={prod.id}
                          preventSwipe={['up', 'down']}
                          onCardLeftScreen={(dir) => onCardLeftScreen(dir, prod.id)}
                        >
                          <div>
                            <img src={prod.prodImg} draggable="false" />
                            <h3>{prod.prodName}</h3>
                          </div>
                        </TinderCard>
                      )}
                    </div>
                  ))}
                
              </div>
            </div>
            <S.SkipButtonWrap>
              <S.SkipButton onClick={skip}>SKIP!</S.SkipButton>
            </S.SkipButtonWrap>
          </S.ReviewProducts>
        ) : (
          <S.ReviewEndWrap>
            <div>
              <p>
                앗! 더이상 남은<span>신제품 카드가 없어요!</span>
              </p>
              <button onClick={() => navigate('/all_review')}>리뷰 보러가기</button>
            </div>
          </S.ReviewEndWrap>
        )}
        <S.ReviewDisLike>
          <div>
            <img src="/images/ReviewDisLike.png" />
            <h1>그만 먹을래요!</h1>
          </div>
        </S.ReviewDisLike>
      </S.ProdReviewWrap>

      <S.AllReviewsWrap onClick={() => navigate('/all_review')}>
        <p>
          <IconAllReview />
          <span>신제품 리뷰 보기</span>
        </p>
      </S.AllReviewsWrap>
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
    ::before {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      top: -10px;
      width: 353px;
      height: 470px;
      border-radius: 10px;
      border: 1px solid var(--neutral-200, #e4e7ec);
      background: var(--neutral-050, #f9fafb);
      z-index: -1;
    }
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
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      img {
        width: auto;
        max-width: 300px;
        height: auto;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        user-select: none;
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
    position: relative;
    left: 0;
    top: 0;

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
    display: flex;
    justify-content: center;
    align-items: flex-end;
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
    margin: 0 auto;
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

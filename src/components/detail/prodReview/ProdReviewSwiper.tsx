import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';
import { IconAllReview } from 'src/components/icons';
import { useLocation, useNavigate } from 'react-router';
import { debounce } from 'lodash';
import { getProdData, getReviewedProductData, getSwiperData } from 'src/api/ReviewSwiper';
import { CardSwiper } from 'react-card-rotate-swiper';
import { ERROR_IMG } from 'src/utility/guide';

const ProdReviewSwiper = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any[] | undefined>();
  const userId = useLoginUserId();
  const navigate = useNavigate();

  const { data: swiperData } = useQuery(['swiper'], getSwiperData);

  const { data: prodData } = useQuery(['products'], getProdData);


// const {data : filteredData} = useQuery(['filteredProducts',userId],()=>getReviewedProductData(userId))

const filterprodData = prodData?.filter((prod) => {
      return !swiperData?.data?.some((swiperProd) => {
        return prod.id === swiperProd.prodId && swiperProd.userId === userId;
      });
     });

// console.log(filteredData,"필터드데디틍ㅇㅇㅇㅇㅇㅇ")

  useEffect(() => {
    // if (swiperData && prodData) {
    //   const filterprodData = prodData.filter((prod) => {
    //     return !swiperData?.data?.some((swiperProd) => {
    //       return prod.id === swiperProd.prodId && swiperProd.userId === userId;
    //     });
    //   });
    //   console.log("필터 데이터 그냥",filterprodData)
    //   setData(filterprodData);
    // }else{
    //   console.log("그냥 필터한 데이터가 먼저 들어와버림")
    // }
    // console.log('스와이퍼데이터', swiperData?.data);
  }, [swiperData, prodData]);
  // setData(filterprodData)

  console.log(data);


  const onDropToLike = async (id: string) => {
    const addReview = {
      prodId: id,
      isGood: true,
      userId: userId
    };

    // const newData = data!.filter((prod) => prod.id !== id);
    // setData(newData);

    await supabase.from('swiper').insert([addReview]);
    setStep((pstep)=> pstep+1)
  };

  const onDropToDisLike = async (id: string) => {
    const addReview = {
      prodId: id,
      isGood: false,
      userId: userId
    };

    // const newData = data!.filter((prod) => prod.id !== id);
    // setData(newData);

    await supabase.from('swiper').insert([addReview]);
    setStep((pstep)=> pstep+1)
  };

  const cardsSwipe = (dir: any, id: string) => {
    if (dir === 'left') {
      onDropToLike(id);
    } else if (dir === 'right') {
      onDropToDisLike(id);
    }
  };

  const skip = () => {
    // const last = data?.pop();
    // console.log(last, '마지막뎅터');
    // const slice = data!.slice(0, data!.length);
    // console.log(slice, '마지막을 제외한 뎅;터ㅏ');
    // setData([last, ...slice]);
    // console.log([last, ...slice], 'datadaaaa');
    setStep((pstep)=> pstep+1)

  };

  return (
    <>
      <S.containerWrap>
        <S.containerInner>
          <S.ProdReviewWrap>
            <S.ReviewDisLike>
              <div>
                <img src="/images/ReviewLike.png" draggable="false" />
                <h1>또 사먹을래요!</h1>
              </div>
            </S.ReviewDisLike>
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
              <S.Div>
                {filterprodData?.map((prod, index) => {
                  return (
                    <div key={prod.id}>
                      {step === index && (
                        <CardSwiper
                          onSwipe={(dir: any) => cardsSwipe(dir, prod.id)}
                          className={'card'}
                          contents={
                            <div className="cardWrap">
                              <div>
                                <img src={prod.prodImg} alt="상품 사진 없음" onError={ERROR_IMG} draggable="false" />
                              </div>
                              <h3 className="text">{prod.prodName}</h3>
                            </div>
                          }
                        ></CardSwiper>
                      )}
                    </div>
                  );
                })}
              </S.Div>
            )}
            <S.ReviewDisLike>
              <div>
                <img src="/images/ReviewDisLike.png" draggable="false" />
                <h1>그만 먹을래요!</h1>
              </div>
            </S.ReviewDisLike>
          </S.ProdReviewWrap>
          
            {step !== filterprodData?.length && (
              <S.SkipButtonWrap>
                <S.SkipButton onClick={skip}>SKIP!</S.SkipButton>
              </S.SkipButtonWrap>
            )}
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

export default ProdReviewSwiper;

const S = {
  Div: styled.div`
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

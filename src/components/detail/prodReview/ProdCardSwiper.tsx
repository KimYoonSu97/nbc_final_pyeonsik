import React, { useState } from 'react';
import { CardSwiper } from 'react-card-rotate-swiper';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { ERROR_IMG } from 'src/utility/guide';
import styled from 'styled-components';
import { onDropToDisLike, onDropToLike } from './utility/CardSwipe';
import { useAtom } from 'jotai';
import { swiperStep } from 'src/globalState/jotai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Product } from 'src/types/types';

interface CardSwiper {
  prod: Product;
  type: string;
}

const ProdCardSwiper = ({ prod, type }: CardSwiper) => {
  const [step, setStep] = useAtom(swiperStep);
  const userId = useLoginUserId();
  const navigate = useNavigate();

  const onDropToProductsLikeHandle = async (id: string | undefined) => {
    await onDropToLike(id, userId);
    setStep(step + 1);
  };

  const onDropToProductLikeHandle = async (id: string | undefined) => {
    await onDropToLike(id, userId);
    toast('평가를 완료했어요.');
    navigate('/review_list');
  };

  const onDropToProductsDisLikeHandle = async (id: string | undefined) => {
    await onDropToDisLike(id, userId);
    setStep(step + 1);
  };

  const onDropToProductDisLikeHandle = async (id: string | undefined) => {
    await onDropToDisLike(id, userId);
    toast('평가를 완료했어요.');
    navigate('/review_list');
  };

  const cardsSwipe = (dir: string, id: string) => {
    if (dir === 'left') {
      if (type === 'products') {
        onDropToProductsLikeHandle(id);
      } else if (type === 'product') {
        onDropToProductLikeHandle(id);
      }
    } else if (dir === 'right') {
      if (type === 'products') {
        onDropToProductsDisLikeHandle(id);
      } else if (type === 'product') {
        onDropToProductDisLikeHandle(id);
      }
    }
  };

  return (
    <S.CardWrap>
      <CardSwiper
        onSwipe={(dir: any) => cardsSwipe(dir, prod.id)}
        className={'card'}
        contents={
          <div className="cardWrap">
            <img src={prod?.prodImg} alt="상품 사진 없음" onError={ERROR_IMG} draggable="false" />
            <h3 className="text">{prod?.prodName}</h3>
          </div>
        }
      ></CardSwiper>
    </S.CardWrap>
  );
};

export default ProdCardSwiper;
const S = {
  CardWrap: styled.div`
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
  `
};

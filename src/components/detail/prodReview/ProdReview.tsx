import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IconBadBig, IconGoodFace } from 'src/components/icons';
import styled from 'styled-components';
import ProdItem from './ProdItem';
import ReviewLike from './ReviewLike';
import ReviewDisLike from './ReviewDisLike';

const ProdReview = () => {
  const [review, setReview] = useState(0);

  const [step, setStep] = useState(0);
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
  console.log(prodData);

  const [products, setProducts] = useState();

  const getSwiperData = async () => {
    const { data } = await supabase.from('swiper').select('*');
    return data;
  };

  const { data: swiperData } = useQuery(['swiper'], getSwiperData);

  const prodId = prodData?.filter((prod) => {
    return !swiperData?.some((swiperProd) => {
      return prod.id === swiperProd.prodId && swiperProd.userId === userId;
    });
  });

  console.log('아이디', prodId);

  const prodNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleMoveItem = (draggedIndex: number, targetIndex: number) => {
    if (!prodId) return;

    const updatedProdId: any = [...prodId];
    const [draggedItem] = updatedProdId.splice(draggedIndex, 1);
    updatedProdId.splice(targetIndex, 0, draggedItem);
  };

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
    const plusReview = swiperData?.find((prod) => {
      return prod.prodId === id && prod.userId === userId;
    });
    if (plusReview) {
      const updateReview = {
        ...plusReview,
        isGood: false
      };
      await supabase.from('swiper').upsert([updateReview]);
      prodNext();
    } else {
      const addReview = {
        prodId: id,
        isGood: false,
        userId: userId
      };
      await supabase.from('swiper').insert([addReview]);
      prodNext();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <S.containerWrap>
        {step === prodId?.length ? (
          <p>신제품 리뷰 다함</p>
        ) : (
          <S.ProdReviewWrap>
            <ReviewLike onDropToLike={onDropToLike} />
            {prodId?.map((prod, index) => {
              if (step === index)
                return (
                  <S.ReviewProducts>
                    <ProdItem key={prod.id} id={prod.id} prodName={prod.prodName} prodImg={prod.prodImg} />
                  </S.ReviewProducts>
                );
            })}
            <ReviewDisLike onDropToDisLike={onDropToDisLike} />
          </S.ProdReviewWrap>
        )}
      </S.containerWrap>
    </DndProvider>
  );
};

export default ProdReview;

const S = {
  containerWrap: styled.div`
    background-color: #fff;
  `,
  ProdReviewWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  `,
  ReviewLike: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
  `,
  ReviewProducts: styled.div`
    /* background-color: red; */
    /* padding: 20px;
    border-radius: 10px;
    border: 2px solid;
    border-radius: 20px;
    background-image: linear-gradient(#fff, #fff), 
    linear-gradient(to right, red 0%,  orange 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    margin: 10px; */
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
  `
};

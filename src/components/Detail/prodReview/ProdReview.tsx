import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import ProdReviewDnd from './ProdReviewDnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

    const updatedProdId = [...prodId];
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
      <div>
        {step === prodId?.length ? (
          <p>신제품 리뷰 다함</p>
        ) : (
          <div>
            <ProdReviewDnd
              index={-1}
              id={-1}
              prodName="또 사먹을래요!"
              prodImg="like_image_url"
              handleMoveItem={handleMoveItem}
              onDropToLike={onDropToLike}
              onDropToDisLike={onDropToDisLike}
            />
            {prodId?.map((prod, index) => {
              if(step === index)
              return (
                <ProdReviewDnd
                  key={prod.id}
                  index={index}
                  id={prod.id}
                  prodName={prod.prodName}
                  prodImg={prod.prodImg}
                  handleMoveItem={handleMoveItem}
                  onDropToLike={onDropToLike}
                  onDropToDisLike={onDropToDisLike}
                />
              );
            })}
            <ProdReviewDnd
              index={-2}
              id={-2}
              prodName="그만 먹을래요!"
              prodImg="dislike_image_url"
              handleMoveItem={handleMoveItem}
              onDropToLike={onDropToLike}
              onDropToDisLike={onDropToDisLike}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ProdReview;

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';

const ProdReview = () => {
  const [review,setReview] = useState(0)
  const [step, setStep] = useState(0);
  const userId = useLoginUserId();

  useEffect(() => {
    getProdData();
    getSwiperData();
  }, []);

  const getProdData = async () => {
    const { data } = await supabase.from('products').select('id,prodName,prodImg').limit(5);
    return data;
  };





  const { data: prodData } = useQuery(['products'], getProdData);
  console.log(prodData);
  
const getSwiperData = async () => {
  const { data:swiperData } = await supabase.from('swiper-user-v').select('*')
  return swiperData
}
  

   const { data: swiperData }:any = useQuery(['swiper-user-v'], getSwiperData);
  // console.log(swiperData?.good);


  const prodNext = () => {
    setStep((prevStep)=> prevStep + 1)
  }


  const plusButton = async (id: any) => {

    const plusReview = swiperData.find((prod:any)=>{
      return prod.prodId === id
    })
    if(plusReview){
      const updateReview = {
        ...plusReview,review : plusReview.review + 1
      }
      await supabase.from('swiper-user-v').upsert([updateReview]);
      prodNext()
    }else{
      const addReview = {
        prodId : id,
        review : 1,
        userId : userId
      }
      await supabase.from('swiper-user-v').insert([addReview])
    }
    


    


      
    
  };

  const minusButton = async (id: string) => {
    const minusReview = {
      prodId: id,
      good: { userId }
    };
    await supabase.from('swiper-user-v').insert([minusReview]);
  };

  return (
    <div>
      {prodData?.map((prod,index) => {
        if(index === step)
        return (
          <div key={prod.id}>
            <img src={prod.prodImg}></img>
            <h1>{prod.prodName}</h1>
            <button onClick={() => plusButton(prod.id)}>좋아요 플러스</button>
            <button onClick={() => minusButton(prod.id)}>싫어요 마이너스</button>
          </div>
        );
      })}

      {/* <button onClick={handleSubmitButton}>제출해버리기</button> */}
    </div>
  );
};

export default ProdReview;

import React, { useState } from 'react'
import { CardSwiper } from 'react-card-rotate-swiper';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { ERROR_IMG } from 'src/utility/guide';
import styled from 'styled-components';

interface ProdType {
    id:string;
    prodImg:string;
    prodName:string;
}

const ProdCardSwiper = ({prod,index}:any) => {
    const [step, setStep] = useState(0);
    const [,setIndex] = useState(0)
    const userId = useLoginUserId();
    console.log("인덱스",index)
    console.log("스텝",step)
    // console.log(prod)

    const onDropToLike = async (id: string) => {
        const addReview = {
          prodId: id,
          isGood: true,
          userId: userId
        };
        await supabase.from('swiper').insert([addReview]);
        setStep(index +1)
        setIndex(index +1)
      };
    
      const onDropToDisLike = async (id: string) => {
        const addReview = {
          prodId: id,
          isGood: false,
          userId: userId
        };
        await supabase.from('swiper').insert([addReview]);
        setStep(index +1)
        setIndex(index +1)
      };
    
      const cardsSwipe = (dir: any, id: string) => {
        if (dir === 'left') {
          onDropToLike(id);
        } else if (dir === 'right') {
          onDropToDisLike(id);
        }
      };

  return (
    <S.CardWrap key={prod.id}>
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
  </S.CardWrap>
  )
}

export default ProdCardSwiper
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
    `,
}
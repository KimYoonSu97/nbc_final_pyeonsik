import React from 'react';
import styled from 'styled-components';
import { Product } from 'src/types/types';

interface Props {
  data: Product;
}

const ProdCard = ({ data }: Props) => {
  return (
    <S.ProdBox>
      <S.EventBar>
        <S.EventBarBrand>{data.prodBrand}</S.EventBarBrand>
        <S.EventDetail>{data.event?.type}</S.EventDetail>
      </S.EventBar>
      <S.ProdInfoBox>
        <S.ProdName>{data.prodName}</S.ProdName>
        <S.ProdPrice>{data.price}</S.ProdPrice>
      </S.ProdInfoBox>
      <S.ProdInnerBox>
        <S.ProdImg $src={data.prodImg}></S.ProdImg>
      </S.ProdInnerBox>
    </S.ProdBox>
  );
};

export default ProdCard;

const S = {
  ProdBox: styled.div`
    width: 200px;
    height: 260px;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    background-color: white;
  `,
  EventBar: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 28px;
    gap: 4px;
    background: #d9d9d9;
  `,
  EventBarBrand: styled.div`
    border-radius: 100px;
    padding: 2px 7px;
    padding-top: 4px;
    color: #000;
    text-align: center;
    /* label-small */
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    /* line-height: 16px; */
    background-color: white;
  `,
  EventDetail: styled.div`
    color: #000;
    text-align: center;
    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,

  ProdInfoBox: styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 60px;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;
    gap: 8px;
  `,
  ProdName: styled.div`
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  `,
  ProdPrice: styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
  `,
  ProdInnerBox: styled.div`
    width: 200px;
    height: 182px;
    padding: 20px;
  `,
  ProdImg: styled.div<{ $src: string }>`
    width: 100%;
    height: 100%;

    background-image: ${(props) => `url(${props.$src})`};
    background-position: center;
    background-size: contain;
  `
};

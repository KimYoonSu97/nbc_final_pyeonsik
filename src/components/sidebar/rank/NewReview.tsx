import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNewProd } from 'src/api/product';
import { Product } from 'src/types/types';
import { IMAGE_EMPTY } from 'src/utility/guide';
import { FlexBoxAlignCenter, FlexBoxCenter, FlexBoxColum } from 'src/styles/styleBox';

import styled from 'styled-components';
import { styleFont } from 'src/styles/styleFont';
import { IconGoodFace } from 'src/components/icons';
import EvaluationGood from './EvaluationGood';
import { useNavigate } from 'react-router';
import { ProgressCircle } from 'src/utility/ProgressCircle';

const NewReview = () => {
  const navigate = useNavigate();

  const { isLoading: lodingProd, data: dataProd } = useQuery({
    queryKey: ['new_prod_sidebar'],
    queryFn: () => getNewProd(),
    refetchOnReconnect: false
  });

  const products = dataProd?.data;
  const randomProducts = () => {
    let array = [] as Product[];
    for (let i = 0; array.length < 5; i++) {
      let index = Math.floor(Math.random() * dataProd?.data?.length!);
      if (!array.includes(products?.[index]!)) {
        array.push(products?.[index]!);
      } else {
        return;
      }
    }
    return array;
  };

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.target.onerror = null;
    e.target.src = IMAGE_EMPTY;
  };

  const clickNewReview = () => {
    navigate('/review_list');
  };

  if (lodingProd) {
    return (
      <p>
        <ProgressCircle />
      </p>
    );
  }
  if (dataProd?.error) {
    return <p>error</p>;
  }

  return (
    <S.ContentsArea onClick={clickNewReview}>
      {/* 요기부터 하위컴포넌트를 맵으로 돌려벌입니다.
      <S.ContentWrapper>
        <S.Img />
        <S.ProductInfo>이건함수가 있어야해서 컴포넌트를 하나 맹글어서 프롭스로 내려줘야할거같네용</S.ProductInfo>
      </S.ContentWrapper>
      요기까지 맵.. */}

      {/* review list */}
      {randomProducts()?.map((prod) => {
        return (
          <S.ReviewBox key={prod.id}>
            <S.ProdImg src={prod.prodImg} alt="상품 사진 없음" onError={onErrorImg} />
            <div>
              <S.TopContainer>
                <S.ProdBrand brand={prod.prodBrand}>{prod.prodBrand}</S.ProdBrand>
                <S.ProdName>{prod.prodName}</S.ProdName>
              </S.TopContainer>
              <S.BottomContainer>
                <S.IconGoodFaceBox>
                  <IconGoodFace />
                </S.IconGoodFaceBox>
                <EvaluationGood prodId={prod.id} />
                <S.GoodText>또 먹을래요</S.GoodText>
              </S.BottomContainer>
            </div>
          </S.ReviewBox>
        );
      })}
    </S.ContentsArea>
  );
};

export default NewReview;

const S = {
  ContentsArea: styled(FlexBoxColum)`
    cursor: pointer;

    width: 296px;
    padding: 8px;

    font-family: Pretendard;
    font-style: normal;
    text-align: center;
  `,

  ReviewBox: styled(FlexBoxAlignCenter)`
    width: 280px;
    height: 60px;
  `,

  ProdImg: styled.img`
    object-fit: contain;
    display: flex;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin: 6px 8px 6px 6px;
  `,

  TopContainer: styled(FlexBoxAlignCenter)`
    width: 216px;
    gap: 4px;
    margin: 10px 0px 2px 0px;
    color: var(--font-black, var(--Black, #242424));
  `,

  ProdBrand: styled(FlexBoxCenter)<{ brand: string }>`
    width: 54px;
    height: 14px;
    border-radius: 100px;
    background-color: ${(props) => {
      switch (props.brand) {
        case 'CU':
          return '#652F8D';
        case 'GS25':
          return '#2ABADA';
        case '이마트24':
          return '#FFB81C';
        case '세븐일레븐':
          return '#008061';
        case '미니스톱':
          return '#1864A7';
      }
    }};

    color: var(--white, #fff);
    font-size: 10px;
    font-weight: 400;
    line-height: 16px; /* 160% */
  `,

  ProdName: styled.div`
    width: 150px;
    flex-shrink: 0;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.bodyMedium}
  `,

  BottomContainer: styled(FlexBoxAlignCenter)``,

  IconGoodFaceBox: styled(FlexBoxCenter)`
    width: 10px;
    height: 10px;
  `,

  GoodText: styled.div`
    color: var(--neutral-500, #667085);
    font-size: 10px;
    font-weight: 400;
    line-height: 16px; /* 160% */
  `,

  // 주석
  ContentWrapper: styled.div`
    width: 100%;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  `,
  Img: styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
  `,
  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ProductName: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  Result: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `
};

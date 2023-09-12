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

const NewReview = () => {
  const { isLoading: lodingProd, data: dataProd } = useQuery({
    queryKey: ['new_prod_sidebar'],
    queryFn: () => getNewProd(),
    refetchOnReconnect: false
  });

  const products = dataProd?.data;
  // const randomProducts = () => {
  //   let array = [] as Product[];
  //   for (let i = 0; array.length < 5; i++) {
  //     let index = Math.floor(Math.random() * dataProd?.data?.length!);
  //     if (!array.includes(products?.[index]!)) {
  //       array.push(products?.[index]!);
  //     } else {
  //       return;
  //     }
  //   }
  //   return array;
  // };

  const randomProducts = [
    {
      id: '0af159db-ad70-4b38-b3f5-6da9061a7ce7',
      created_at: '2023-09-10T15:24:39.255482+00:00',
      prodName: '혜자로운집밥)제육볶음',
      price: '4,500원',
      prodBrand: 'GS25',
      prodCategory: '식품',
      prodImg: 'https://image.woodongs.com/imgsvr/item/GD_2700038845663_004.jpg',
      new: true,
      event: null
    },
    {
      id: '15470cbe-8a8a-4564-9e28-26da5f68833a',
      created_at: '2023-09-10T15:24:39.255482+00:00',
      prodName: '얼큰돈코츠라멘',
      price: '3,900원',
      prodBrand: 'GS25',
      prodCategory: '식품',
      prodImg: 'https://image.woodongs.com/imgsvr/item/GD_8809860730636_002.jpg',
      new: true,
      event: null
    },
    {
      id: '259a8c29-c7ee-4fcd-82fb-143fe453a994',
      created_at: '2023-09-10T15:24:39.255482+00:00',
      prodName: '반반돈까스김밥',
      price: '2,800원',
      prodBrand: 'GS25',
      prodCategory: '식품',
      prodImg: 'https://image.woodongs.com/imgsvr/item/GD_2700038848107_001.jpg',
      new: true,
      event: null
    },
    {
      id: '5e4637f8-7120-4361-9b0f-b530e0972ff2',
      created_at: '2023-09-10T13:40:51.093817+00:00',
      prodName: '샌)초당옥수수크림샌드',
      price: '3,000',
      prodBrand: 'CU',
      prodCategory: '식품',
      prodImg: '//tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771028659.jpg',
      new: true,
      event: null
    },
    {
      id: '7fd049b9-ca92-46e5-858e-44bbcb089105',
      created_at: '2023-09-10T15:24:39.255482+00:00',
      prodName: 'DP)슈넬치킨마요김밥',
      price: '2,900원',
      prodBrand: 'GS25',
      prodCategory: '식품',
      prodImg: 'https://image.woodongs.com/imgsvr/item/GD_2700038850254_001.jpg',
      new: true,
      event: null
    }
  ];

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.target.onerror = null;
    e.target.src = IMAGE_EMPTY;
  };

  if (lodingProd) {
    return <p>Loading…</p>;
  }
  if (dataProd?.error) {
    return <p>error</p>;
  }

  return (
    <S.ContentsArea>
      {/* 요기부터 하위컴포넌트를 맵으로 돌려벌입니다.
      <S.ContentWrapper>
        <S.Img />
        <S.ProductInfo>이건함수가 있어야해서 컴포넌트를 하나 맹글어서 프롭스로 내려줘야할거같네용</S.ProductInfo>
      </S.ContentWrapper>
      요기까지 맵.. */}

      {/* review list */}
      {randomProducts?.map((prod) => {
        return (
          <S.ReviewBox key={prod.id}>
            <S.ProdImg src={prod.prodImg} alt="상품 사진 없음" onError={onErrorImg} />
            <div>
              <S.TopContainer>
                <S.ProdBrand>{prod.prodBrand}</S.ProdBrand>
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

  ProdBrand: styled(FlexBoxCenter)`
    width: 54px;
    height: 14px;
    border-radius: 100px;
    background: var(--neutral-200, #e4e7ec);

    color: var(--font-black, var(--Black, #242424));
    font-size: 10px;
    font-weight: 400;
    line-height: 16px; /* 160% */
  `,

  ProdName: styled.div`
    /* width: 164px; */
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

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNewProd } from 'src/api/product';
import { getSwiperData } from 'src/api/ReviewSwiper';
import { Product, Swiper } from 'src/types/types';
import { LOGO_IMAGE } from 'src/utility/guide';
// style
import { styled } from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxCenter, FlexBoxColum } from 'src/styles/styleBox';
import { IconBad } from 'src/components/icons';
import MyEvaluation from './MyEvaluation';
import EvaluationGraph from './EvaluationGraph';

const ReviewList = () => {
  const { isLoading: lodingProd, data: dataProd } = useQuery({ queryKey: ['new_prod'], queryFn: () => getNewProd() });
  const { isLoading: lodingSwiper, data: dataSwiper } = useQuery({
    queryKey: ['swiper'],
    queryFn: () => getSwiperData()
  });

  const produts = dataProd?.data as Product[] | undefined;
  const swipers = dataSwiper?.data as Swiper[];

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.target.onerror = null;
    e.target.src = LOGO_IMAGE;
  };

  if (lodingProd || lodingSwiper) {
    return <p>Loading…</p>;
  }
  if (dataProd?.error || dataSwiper?.error) {
    return <p>error</p>;
  }

  return (
    <S.ReviewContainer>
      {produts?.map((prod) => {
        return (
          <S.ReviewBox key={prod.id}>
            <S.ProdImg src={prod.prodImg} alt="상품 사진 없음" onError={onErrorImg} />
            <S.TextContainer>
              <S.ProdName>{prod.prodName}</S.ProdName>
              <MyEvaluation swipers={swipers} prodId={prod.id} />
            </S.TextContainer>
            <S.AllEvaluation>
              <EvaluationGraph swipers={swipers} prodId={prod.id} />
              <S.GraphContainer>
                <S.IsGoodText>그만 먹을래요!</S.IsGoodText>
                <div>
                  <S.GraphBack />
                  <S.GraphFront>
                    <S.IconGoodBox>
                      <IconBad />
                    </S.IconGoodBox>
                    <S.Percent>%</S.Percent>
                  </S.GraphFront>
                </div>
              </S.GraphContainer>
            </S.AllEvaluation>
          </S.ReviewBox>
        );
      })}
    </S.ReviewContainer>
  );
};

export default ReviewList;

const S = {
  ReviewContainer: styled(FlexBoxColum)`
    gap: 20px;
  `,

  ReviewBox: styled(FlexBoxAlignCenter)`
    cursor: pointer;
    background: #fff;

    width: 890px;
    height: 158px;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
  `,

  ProdImg: styled.img`
    object-fit: contain;
    display: flex;
    width: 126px;
    height: 126px;
    margin: 16px 18px 16px 16px;
  `,

  TextContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    margin-right: 88px;
    gap: 4px;
  `,

  ProdName: styled.div`
    width: 306px;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px; /* 136.364% */
  `,

  AllEvaluation: styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  `,

  GraphContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  `,

  IsGoodText: styled.div`
    color: var(--font-black, var(--Black, #242424));

    /* button-small */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 114.286% */
  `,

  GraphBack: styled.div`
    position: absolute;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: linear-gradient(109deg, #ffb334 23.92%, #eb4335 76.3%);
  `,

  GraphFront: styled(FlexBoxAlignCenter)`
    position: relative;
    justify-content: flex-end;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: linear-gradient(to right, transparent 70%, #f2f4f7 70%);
  `,

  Percent: styled.div`
    margin-right: 9px;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
  `,

  IconGoodBox: styled(FlexBoxCenter)`
    margin-right: 4px;
  `,

  p: styled.div``
};

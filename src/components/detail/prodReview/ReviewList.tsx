import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getNewProdInfinite } from 'src/api/product';
import { getSwiperData } from 'src/api/ReviewSwiper';
import { Swiper } from 'src/types/types';
import { ERROR_IMG, IMAGE_EMPTY } from 'src/utility/guide';
import MyEvaluation from './MyEvaluation';
import EvaluationGraph from './EvaluationGraph';
import { styled } from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxCenter, FlexBoxColum } from 'src/styles/styleBox';
import { useNavigate } from 'react-router';

const ProdReviewList = () => {
  const {
    isLoading: lodingProd,
    data: dataProd,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<any>({
    queryKey: ['new_prod'],
    queryFn: ({ pageParam }) => getNewProdInfinite(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    }
  });
  const { isLoading: lodingSwiper, data: dataSwiper } = useQuery({
    queryKey: ['swiper_list'],
    queryFn: () => getSwiperData()
  });

  const products = useMemo(() => {
    return dataProd?.pages
      .map((data) => {
        return data.products;
      })
      .flat();
  }, [dataProd]);
  const swipers = dataSwiper?.data as Swiper[];
  const navigate = useNavigate();

  const { ref } = useInView({
    threshold: 0.7,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  if (lodingProd || lodingSwiper) {
    return <p>Loading…</p>;
  }
  if (dataProd?.pages?.[0].error || dataSwiper?.error) {
    return <p>error</p>;
  }

  const con = (id: string, userId: string) => {
    navigate(`/review_product/${id}`, { state: { id, userId } });
  };

  return (
    <S.ReviewContainer>
      {products?.map((prod) => {
        return (
          <S.ReviewBox key={prod.id} onClick={() => con(prod.id, prod.userId)}>
            <S.ProdImg src={prod.prodImg} alt="상품 사진 없음" onError={ERROR_IMG} />
            <S.TextContainer>
              <S.ProdName>{prod.prodName}</S.ProdName>
              <MyEvaluation swipers={swipers} prodId={prod.id} />
            </S.TextContainer>
            <S.AllEvaluation>
              <EvaluationGraph swipers={swipers} prodId={prod.id} isGood={true} />
              <EvaluationGraph swipers={swipers} prodId={prod.id} isGood={false} />
            </S.AllEvaluation>
          </S.ReviewBox>
        );
      })}
      <S.LoadingBox ref={ref} />
    </S.ReviewContainer>
  );
};

export default ProdReviewList;

const S = {
  LoadingBox: styled.div`
    width: 200px;
    height: 200px;
  `,

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
    line-height: 30px;
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

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
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
    line-height: 16px;
  `,

  IconGoodBox: styled(FlexBoxCenter)`
    margin-right: 4px;
  `,

  p: styled.div``
};

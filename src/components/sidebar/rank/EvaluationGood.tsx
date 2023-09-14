import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSwiperData } from 'src/api/ReviewSwiper';
import styled from 'styled-components';
import { FlexBoxAlignCenter } from 'src/styles/styleBox';
import ProgressCircle from 'src/components/ProgressCircle';

interface EvaluationGoodProps {
  prodId: string;
}

const EvaluationGood = ({ prodId }: EvaluationGoodProps) => {
  const { isLoading: lodingSwiper, data: dataSwiper } = useQuery({
    queryKey: ['swiper_list_sidebar'],
    queryFn: () => getSwiperData()
  });

  const prodRate = dataSwiper?.data?.filter((swiper) => swiper.prodId === prodId)!;
  const rateGood = prodRate?.filter((rate) => rate.isGood).length;
  const percentGood = Math.round((rateGood / prodRate?.length) * 1000) / 10;

  const backgroundFront = `linear-gradient(to right, #62aaff ${rateGood ? percentGood : 0}%, #d9d9d9 ${
    rateGood ? percentGood : 0
  }%)`;

  if (lodingSwiper) {
    return (
      <p>
        <ProgressCircle />
      </p>
    );
  }
  if (dataSwiper?.error) {
    return <p>error</p>;
  }
  return (
    <S.GraphContainer>
      <S.GraphFront background={backgroundFront} />
      <S.PercentText>{prodRate?.length ? percentGood : 0}%</S.PercentText>
    </S.GraphContainer>
  );
};

export default EvaluationGood;

const S = {
  GraphContainer: styled(FlexBoxAlignCenter)`
    gap: 6px;
    margin: 0px 2px 0px 4px;
  `,

  GraphFront: styled(FlexBoxAlignCenter)<{ background: string }>`
    width: 100px;
    height: 8px;
    border-radius: 100px;
    background: ${(props) => props.background};
  `,

  PercentText: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-size: 10px;
    font-weight: 600;
    line-height: 16px; /* 160% */
  `
};

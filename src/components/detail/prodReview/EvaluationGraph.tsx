import React from 'react';
import { MyeEvaluationProps as MyEvaluationProps } from './MyEvaluation';
import { IconBad, IconGood } from 'src/components/icons';
import { styled } from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';

const EvaluationGraph = ({ swipers, prodId, isGood }: MyEvaluationProps) => {
  const prodRate = swipers.filter((swiper) => swiper.prodId === prodId);
  const rateGood = prodRate.filter((rate) => rate.isGood === isGood).length;
  const percentGood = Math.round((rateGood / prodRate.length) * 1000) / 10;

  const backgroundBack =
    percentGood >= 50 ? 'linear-gradient(278deg, #FFB334 4.72%, #EB4335 92.67%)' : 'var(--neutral-300, #D0D5DD)';
  const backgroundFront = `linear-gradient(to right, transparent ${percentGood}%, #f2f4f7 ${percentGood}%)`;

  return (
    <S.GraphContainer>
      <S.IsGoodText>{isGood ? '또 사먹을래요!' : '그만 먹을래요!'}</S.IsGoodText>
      <div>
        <S.GraphBack background={backgroundBack} />
        <S.GraphFront background={backgroundFront}>
          <S.IconGoodBox>{isGood ? <IconGood /> : <IconBad />}</S.IconGoodBox>
          {prodRate.length ? percentGood : 0}%
        </S.GraphFront>
      </div>
    </S.GraphContainer>
  );
};

export default EvaluationGraph;

const S = {
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

  GraphBack: styled.div<{ background: string }>`
    position: absolute;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: ${(props) => props.background};
  `,

  GraphFront: styled(FlexBoxAlignCenter)<{ background: string }>`
    position: relative;
    justify-content: flex-end;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: ${(props) => props.background};

    padding-right: 9px;
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
  `,

  IconGoodBox: styled(FlexBoxCenter)`
    margin-right: 4px;

    svg {
      fill: var(--font-black, var(--Black, #242424));
    }
  `
};

import React from 'react';
import { MyeEvaluationProps } from './MyEvaluation';
import { IconBad, IconGood } from 'src/components/icons';
import { styled } from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';

const EvaluationGraph = ({ swipers, prodId }: MyeEvaluationProps) => {
  const prodRate = swipers.filter((swiper) => swiper.prodId === prodId);

  const rateGood = prodRate.filter((rate) => rate.isGood).length;
  //   const rateBad = prodRate.filter((rate) => !rate.isGood).length;
  const percentGood = 94;
  //   (rateGood / prodRate.length) * 100;
  //   const percentBad = (rateBad / prodRate.length) * 100;
  console.log('여기', prodRate);

  const background = `linear-gradient(to right, transparent ${percentGood}%, #f2f4f7 ${percentGood}%)`;

  return (
    <S.GraphContainer>
      <S.IsGoodText>또 사먹을래요!</S.IsGoodText>
      <div>
        <S.GraphBack background={true} />
        <S.GraphFront color={percentGood >= 95} background={background}>
          <S.IconGoodBox color={percentGood >= 95}>
            <IconGood />
          </S.IconGoodBox>
          {prodRate.length ? percentGood : 0}%
        </S.GraphFront>
      </div>
    </S.GraphContainer>
  );
};

export default EvaluationGraph;

interface GraphProps {
  color: boolean;
  background?: string;
}

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

  GraphBack: styled.div<{ background: boolean }>`
    position: absolute;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: ${(props) =>
      props.background ? 'linear-gradient(109deg, #ffb334 23.92%, #eb4335 76.3%)' : 'var(--neutral-300, #D0D5DD)'};
  `,

  GraphFront: styled(FlexBoxAlignCenter)<GraphProps>`
    position: relative;
    justify-content: flex-end;

    width: 312px;
    height: 26px;
    border-radius: 100px;
    background: ${(props) => props.background};

    padding-right: 9px;
    color: ${(props) => (props.color ? 'var(--white, #FFF)' : 'var(--font-black, var(--Black, #242424))')};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
  `,

  Percent: styled.div`
    /* margin-right: 9px;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; */
    /* 114.286% */
  `,

  IconGoodBox: styled(FlexBoxCenter)<GraphProps>`
    margin-right: 4px;

    svg {
      fill: ${(props) => (props.color ? 'var(--white, #FFF)' : 'var(--font-black, var(--Black, #242424))')};
    }
  `
};

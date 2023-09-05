import { FlexBox, FlexBoxCenter } from 'src/styles/styleBox';
import styled, { css } from 'styled-components';

interface LocationProps {
  $location: string;
}

export const S = {
  FunctionButtonBox: styled(FlexBoxCenter)<LocationProps>`
    gap: ${(props) => {
      switch (props.$location) {
        case '/':
          return '4px';
        default:
          return '6px';
      }
    }};
    flex-direction: column;
  `,

  FunctionButton: styled.button`
    background-color: transparent;
    height: 24px;
  `,

  FunctionCount: styled.div<LocationProps>`
    ${(props) => {
      if (props.$location) {
        return css`
          color: var(--neutral-500, #667085);
          text-align: center;
          font-style: normal;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px; /* 175% */
        `;
      } else {
        return css`
          color: var(--neutral-400, var(--neutral-400, #98a2b3));
          text-align: center;

          /* body-small */
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 133.333% */
        `;
      }
    }};

    color: var(--neutral-500, #667085);
    text-align: center;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px; /* 175% */
  `
};

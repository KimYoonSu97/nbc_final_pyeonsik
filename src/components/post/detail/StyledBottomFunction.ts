import { FlexBox, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
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

    &:hover .comments {
      cursor: auto;
    }
  `,

  FunctionButton: styled.button`
    background-color: transparent;
    height: 24px;

    position: relative;
    display: flex;
    justify-content: center;

    svg {
      fill: #667085;
    }
    svg:hover {
      fill: #f02826;
    }

    &:hover .dropDownLink {
      cursor: auto;

      display: flex;
      position: absolute;
    }
    .dropDownLink {
      display: none;
    }

    .linkFacebook {
      svg:hover {
        fill: #4285f4;
      }
    }
    .linkTwitter {
      svg:hover {
        fill: #242424;
      }
    }
    .linkKakao {
      svg:hover {
        fill: #472200;
      }
    }
  `,

  LinkBubble: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  LinkTail: styled.div`
    display: flex;
    margin-top: 30.9px;

    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(25px);
  `,

  LinkTailFalse: styled.div`
    z-index: 1;
    background: #fff;

    display: flex;
    margin-top: -14px;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
  `,

  LinkBox: styled.div`
    display: flex;
    gap: 16px;

    margin-top: -7.9px;
    padding: 11px 13px 11px 13px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(25px);
  `,

  LlinkButton: styled.button`
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;
    padding: 0px;
  `,

  FunctionCount: styled.div<LocationProps>`
    ${(props) => {
      if (props.$location) {
        return css`
          color: var(--neutral-500, #667085);
          text-align: center;
          font-family: Pretendard;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px; /* 175% */
        `;
      } else {
        return css`
          color: var(--neutral-400, var(--neutral-400, #98a2b3));
          text-align: center;

          ${styleFont.bodySmall}
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

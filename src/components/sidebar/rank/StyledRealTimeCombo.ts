import { css, styled } from 'styled-components';

export const S = {
  ContentsArea: styled.div`
    display: flex;
    width: 296px;
    padding: 8px;
    flex-direction: column;
  `,

  ContentWrapper: styled.div`
    width: 100%;
    padding: 6px 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 10px;

    cursor: pointer;
    &:hover {
      background: var(--neutral-100, #f2f4f7);
    }
  `,
  Img: styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
  `,

  RankNum: styled.div<{
    $isfirst?: boolean;
  }>`
    width: 18px;
    height: 18px;
    background-color: ${({ $isfirst }) => ($isfirst ? '#F02826' : 'transparent')};
    border-radius: 100px;
    ${({ $isfirst }) =>
      !$isfirst &&
      css`
        border: 1px solid #d9d9d9;
      `};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* body-small */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    color: ${({ $isfirst }) => ($isfirst ? 'white' : '#d9d9d9')};
  `,

  PostTitle: styled.div`
    width: 65%;

    overflow: hidden;
    color: var(--font-black, var(--Black, #242424));
    text-overflow: ellipsis;
    white-space: nowrap;

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `
};

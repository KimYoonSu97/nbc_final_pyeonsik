import styled from 'styled-components';

export const S = {
  FunctionBox: styled.div`
    margin: 36px 0px 140px 0px;
    gap: 50px;
    display: inline-flex;
  `,

  FunctionButtonBox: styled.div`
    gap: 6px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  FunctionButton: styled.button`
    background-color: transparent;
    height: 24px;
  `,

  FunctionCount: styled.div`
    color: var(--neutral-500, #667085);
    text-align: center;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px; /* 175% */
  `
};

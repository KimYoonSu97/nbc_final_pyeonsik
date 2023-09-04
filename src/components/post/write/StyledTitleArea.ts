import styled from 'styled-components';

export const S = {
  TitleBox: styled.div`
    background: #fff;
    width: 950px;
    margin-bottom: 12px;
    padding: 9px 20px;
    gap: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  CategoryText: styled.div`
    color: #000;
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `,
  Contour: styled.div`
    background: #f6f7f9;
    width: 2px;
    height: 18px;
    border-radius: 100px;
  `,
  Title: styled.input`
    border: none;
    outline: none;
    color: #000;
    width: 723px;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
  `,
  SelectCategory: styled.div`
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SelectIcon: styled.div`
    width: 20px;
    height: 20px;
  `,
  SelectText: styled.button`
    background-color: transparent;
    padding: 0px;
    color: var(--neutral-400, #98a2b3);
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `
};

import { styleFont } from 'src/styles/styleFont';
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
    ${styleFont.titleSmall}
    width: 50px;
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
    ${styleFont.bodyLarge}
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
    width: 50px;
    padding: 0px;
    color: var(--neutral-400, #98a2b3);
    ${styleFont.titleSmall}
  `
};

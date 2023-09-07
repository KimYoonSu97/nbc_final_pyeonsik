import styled from 'styled-components';
import { FlexBox, FlexBoxColumn } from 'src/styles/styleBox';

export const S = {
  //김윤수 추가 2
  UpDownButtonArea: styled(FlexBox)`
    flex-direction: column;
    gap: 10px;

    position: absolute;
    left: 962px;
    bottom: 20px;
  `,
  UpDownButton: styled(FlexBoxColumn)`
    border-radius: 10px;

    width: 48px;
    height: 48px;
    background-color: white;

    &:disabled {
      background-color: transparent;
      cursor: not-allowed;
    }
  `,
  // 김윤수 추가
  ButtonThumbnailArea: styled(FlexBox)`
    width: 48px;
    position: fixed;
    left: calc((100vw - 1280px) / 2 + 93px);
    z-index: 999;
    flex-direction: column;
    gap: 8px;
  `,
  SmallButton: styled.div``,
  ThumbnailImg: styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
    cursor: pointer;
  `,
  Contents: styled(FlexBox)`
    position: relative;
  `,
  ContentArea: styled.div``,
  RemoveButton: styled.button`
    width: 48px;
    height: 48px;
    position: absolute;
    left: 962px;
  `,

  AddBtn: styled.button`
    width: 48px;
    height: 48px;
  `,
  BackGroundColor: styled.div`
    width: 100vw;
    height: 100vh;
    background: var(--Background, #f6f7f9);
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  `
};

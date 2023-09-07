import styled from 'styled-components';
import { FlexBox } from 'src/styles/styleBox';

export const ArrowIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  pointer-events: none;
`;

export const S = {
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
    border-radius: 20%;
    width: 48px;
    height: 48px;
    object-fit: cover;
    cursor: pointer;
    transition: filter 0.3s ease, opacity 0.3s ease;
    &:hover {
      filter: brightness(0.6);
    }
  `,

  ThumbnailImgWrapper: styled.div`
    position: relative;
    width: 48px;
    height: 48px;
    cursor: pointer;

    &:hover {
      ${ArrowIconWrapper} {
        opacity: 1;
      }
    }
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
    margin-left: -6px;
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

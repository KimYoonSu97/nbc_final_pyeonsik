import styled from 'styled-components';

export const FlexBoxCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBoxAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexBoxJustifyCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const FlexBoxColum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SkeletonItem = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  // 이걸살려

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

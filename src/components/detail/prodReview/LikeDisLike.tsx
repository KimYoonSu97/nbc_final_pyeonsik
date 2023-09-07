import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

interface LikeDisLikeProps {

    onDropToLike: (prodId: string) => void;
    onDropToDisLike: (prodId: string) => void;

  }

const LikeDislikeArea: React.FC<LikeDisLikeProps> = ({ onDropToLike, onDropToDisLike }) => {
  const [, ref] = useDrop({
    accept: 'PRODUCT',
    drop: (item:any) => {
      if (item.isLike) {
        onDropToLike(item.id);
      } else {
        onDropToDisLike(item.id);
      }
    },
  });

  return <Container ref={ref}>좋아요 또는 싫어요 영역</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(206, 212, 218, 0.5);
`;

export default LikeDislikeArea;
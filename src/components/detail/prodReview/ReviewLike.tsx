import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

interface LikeProps {

    onDropToLike: (prodId: string) => void;

  }

const ReviewLike: React.FC<LikeProps> = ({ onDropToLike }) => {
  const [, ref] = useDrop({
    accept: 'PRODUCT',
    drop: (item:any) => {
      onDropToLike(item.id);
    },
  });

  return <Container ref={ref}>좋아요 영역</Container>;
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

export default ReviewLike;
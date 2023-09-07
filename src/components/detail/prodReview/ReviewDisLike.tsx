import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

interface DisLikeProps {

    onDropToDisLike: (prodId: string) => void;
    // handleMoveItem: (dragIndex: number, hoverIndex: number) => void;

  }

const ReviewDisLike: React.FC<DisLikeProps> = ({ onDropToDisLike }) => {
  const [, ref] = useDrop({
    accept: 'PRODUCT',
    // hover: (draggedItem: any) => {
    //     if (draggedItem.index !== index) {
    //       handleMoveItem(draggedItem.index, index);
    //       draggedItem.index = index;
    //     }
    //   },
    drop: (item:any) => {
      onDropToDisLike(item.id);
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

export default ReviewDisLike;
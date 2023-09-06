import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled, { css } from 'styled-components';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';


interface ProductItemProps {
  index: number;
  id: number;
  prodName:string;
  prodImg:string;
  handleMoveItem: (dragIndex: number, hoverIndex: number) => void;
  onDropToLike: (prodId: string) => void;
  onDropToDisLike: (prodId: string) => void;
  // styled: string;
  // children: any;
}

const ProdReviewDnd: React.FC<ProductItemProps> = ({
  index,
  id,
  prodName,
  prodImg,
  handleMoveItem,
  onDropToLike,
  onDropToDisLike,
  // styled
}) => {
  const [{ isDragging }, ref,previewPosition] = useDrag(() => ({
    type: 'PRODUCT',
    item: { index, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }));
  const [, drop] = useDrop({
    accept: 'PRODUCT',
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        handleMoveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    drop: (draggedItem) => {
      if (index === -1) {
        onDropToLike(draggedItem.id);
      } else if (index === -2) {
        onDropToDisLike(draggedItem.id);
      }
    }
  });
  previewPosition(getEmptyImage(), { captureDraggingState: true });

  return (
    <Container
      ref={(node) => {
        ref(drop(node));
        // preview(node);
      }} style={{opacity:isDragging ? "1" : "1", width:"100%"}}
    >
      <div style={{opacity:isDragging ? "1" : "1"}}>
      <img src={prodImg}/>
      <h1>{prodName}</h1>
      </div>
      {/* <DraggedItem style={{opacity:isDragging ? "0" : "1"}} className={styled}>{children}</DraggedItem> */}

    </Container>
  );
};

export default ProdReviewDnd;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* background: #fff; */
  padding: 20px;
  background-color: #fff;
  border: solid 1px #111;
`;

const DraggedItem = styled.div`

`
// const imageStyles = css`
//   width: 160px;
//   height: 160px;
//   background-color: #fff;
//   border-radius: 50%;
//   /* overflow: hidden; */
// `;

// const imageLikeStyles = css`
//   ${imageStyles};
//   /* 추가적인 스타일을 여기에 적용합니다. */
// `;

// const imageDisLikeStyles = css`
//   ${imageStyles};
//   /* 추가적인 스타일을 여기에 적용합니다. */
// `;

// const textStyles = css`
//   font-weight: bold;
//   font-size: 16px;
// `;

// const textLikeStyles = css`
//   ${textStyles};
//   /* 추가적인 스타일을 여기에 적용합니다. */
// `;

// const textDisLikeStyles = css`
//   ${textStyles};
//   /* 추가적인 스타일을 여기에 적용합니다. */
// `;

// const ProdImage = styled.img`
//   width: 300px;
//   height: 100%;
//   border-radius: 10px;
//   padding: 20px;
//   object-fit: cover; /* 이미지 비율 유지하며 채우기 */
// `;

// const ProdName = styled.h1`
//   ${textStyles};
// `;

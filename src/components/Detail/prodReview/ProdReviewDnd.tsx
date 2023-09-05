import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
interface ProductItemProps {
  index: number;
  id: number;
  prodName: string;
  prodImg: string;
  handleMoveItem: (dragIndex: number, hoverIndex: number) => void;
  onDropToLike: (prodId: string) => void;
  onDropToDisLike: (prodId: string) => void;
}

const ProdReviewDnd: React.FC<ProductItemProps> = ({
  index,
  id,
  prodName,
  prodImg,
  handleMoveItem,
  onDropToLike,
  onDropToDisLike
}) => {
  const [,ref] = useDrag(() => ({
    type: 'PRODUCT',
    item: { index, id },
  }));
  const [,drop] = useDrop({
    accept:'PRODUCT',
    hover:(draggedItem:any) => {
      if(draggedItem.index !== index){
        handleMoveItem(draggedItem.index,index);
        draggedItem.index = index;
      }
    },
    drop:(draggedItem) => {
      if(index === -1){
        onDropToLike(draggedItem.id);
      }else if (index === -2){
        onDropToDisLike(draggedItem.id)
      }
    }
  })
  return <div ref={(node)=> ref(drop(node))}><img src={prodImg}/><h1>{prodName}</h1></div>;
};

export default ProdReviewDnd;

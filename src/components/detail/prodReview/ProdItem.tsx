import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

interface ProdItemProps {
  id: number;
  prodName: string;
  prodImg: string;
}

const ProdItem: React.FC<ProdItemProps> = ({ id, prodName, prodImg }) => {
  const [{ isDragging }, ref] = useDrag(() => ({
    type: 'PRODUCT',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const containerStyle = {
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Container ref={ref} style={{cursor: isDragging ? 'grabbing' : 'grab' }}>
      <div>
        <img src={prodImg} alt={prodName} />
        <h1>{prodName}</h1>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: #fff;
  border: solid 1px #111;
  div {
    height: 380px;
    margin: 40px 20px;
  }
  img {
    width: 300px;
    height: auto;
    margin-bottom: 20px;
  }
  h1 {
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
  }
`;

export default ProdItem;

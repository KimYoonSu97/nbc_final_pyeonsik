import React from 'react';
import { SkeletonItem } from 'src/styles/styleBox';
import styled from 'styled-components';

const ProdSkeleton = () => {
  return (
    <>
      <S.Container>
        {Array.from({ length: 12 }).map((_, index) => (
          <S.EmptyBox key={index} />
        ))}
      </S.Container>
    </>
  );
};

export default ProdSkeleton;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    align-content: center;
  `,
  EmptyBox: styled(SkeletonItem)`
    width: calc(25% - 30px);
    height: 250px;
    border-radius: 10px;
    margin-bottom: 30px;
  `
};

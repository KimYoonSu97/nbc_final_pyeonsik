import React from 'react';
import PostWrite from 'src/components/post/write/PostWrite';
import styled from 'styled-components';

const Write = () => {
  return (
    <S.ViewPort>
      <S.WriteArea>
        <PostWrite />
      </S.WriteArea>
    </S.ViewPort>
  );
};

export default Write;

export const S = {
  ViewPort: styled.div`
    width: 100vw;
    height: 100vh;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: hidden;
  `,

  WriteArea: styled.div`
    background-color: #f6f7f9;
    width: 100%;
    min-height: 100%;
  `
};

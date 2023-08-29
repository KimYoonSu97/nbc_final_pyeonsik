import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { modalOpenAtom } from 'src/globalState/jotai';
import PostDetailCommon from '../post/detail/PostDetailCommon';
import PostDetailRecipe from '../post/PostDetailRecipe';
import Comment from '../Detail/comments/Comment';

const PostModal = () => {
  return (
    <>
      <S.InnerContainer></S.InnerContainer>
      <S.Container>PostModal</S.Container>
    </>
  );
};

export default PostModal;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 99999;
    top: 0;
    right: 0;
  `,
  InnerContainer: styled.div`
    width: 50%;
    height: 50%;
    background-color: royalblue;
    position: fixed;
    z-index: 999999;
  `
};

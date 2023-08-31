import React from 'react';
import PostDetail from 'src/components/post/detail/PostDetail';
import styled from 'styled-components';
import Comment from 'src/components/Detail/comments/Comment';

const PostDetailModal = () => {
  return <S.Container></S.Container>;
};

export default PostDetailModal;

const S = {
  Container: styled.div`
    height: 100%;
    overflow-y: scroll;
  `,
  PostArea: styled.div`
    width: 890px;
    background-color: royalblue;
  `
};

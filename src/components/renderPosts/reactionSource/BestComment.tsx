import React from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCommentDataByPostId } from 'src/api/comment';

interface BestCommentProps {
  postId: string;
}

const BestComment = ({ postId }: BestCommentProps) => {
  return <S.Container> 베스트댓글이 들어가게됩니다.</S.Container>;
};

export default BestComment;

const S = {
  Container: styled.div`
    background-color: royalblue;
    width: 100%;
  `
};

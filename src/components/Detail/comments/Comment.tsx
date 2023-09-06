import React from 'react';
import { useParams } from 'react-router';
import { getCommentDataByPostId } from 'src/api/comment';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import CommentForMap from './CommentForMap';
import CommentInput from './CommentInput';
import { FlexBox } from 'src/styles/styleBox';

interface CommentDataType {
  id: string;
  created_at: string;
  userId: string;
  postId: string;
  comment: string;
  users: {
    profileImg: string;
    nickname: string;
    level: string;
  };
}
//왜 안돼?

const Comment = () => {
  const { id: postId } = useParams<string>();

  //포스트 아이디와 같은 댓글만을 위한 쿼리 데이터
  const { data: commentData, isLoading: commentIsLoading } = useQuery({
    queryKey: ['comment', postId],
    queryFn: () => getCommentDataByPostId(postId!),
    enabled: postId ? true : false,
    refetchOnWindowFocus: false
  });

  if (commentIsLoading) {
    return <div>Loading</div>;
  }

  return (
    <S.CommentArea>
      <S.CommentInputArea>
        <S.CommentInPutProfile></S.CommentInPutProfile>
        <CommentInput type={'post'}></CommentInput>
      </S.CommentInputArea>
      <S.CommentRenderArea>
        {commentData?.map((comment) => {
          return <CommentForMap key={comment.id} comment={comment as CommentDataType} />;
        })}
      </S.CommentRenderArea>
    </S.CommentArea>
  );
};

export default Comment;

const S = {
  CommentArea: styled.div`
    padding: 12px 50px 0 50px;
    width: 100%;
    background-color: white;
  `,
  CommentInputArea: styled(FlexBox)`
    gap: 8px;
    margin-bottom: 30px;
  `,
  CommentInPutProfile: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100px;
    background: lightgray;
  `,
  CommentInput: styled.input`
    width: 100%;
    padding: 8px 0 8px 14px;
    margin-right: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    background: transparent;

    color: var(--neutral-500, #667085);

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  CommentRenderArea: styled(FlexBox)`
    margin-top: 30px;
    flex-direction: column;
    gap: 24px;
  `
};

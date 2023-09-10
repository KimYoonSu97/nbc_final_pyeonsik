import React, { useMemo } from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getBestCommentLikeByPostId } from 'src/api/commentLike';
import { IconBestComment } from 'src/components/icons';
import { styleFont } from 'src/styles/styleFont';
import { useLocation, useNavigate } from 'react-router';

interface BestCommentProps {
  postId: string;
}

interface BestComment {
  commentId: { comment: string; created_at: string; id: string; postId: string; userId: { nickname: string } };
  userId: { nickname: string };
}

const BestComment = ({ postId }: BestCommentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ['bestComment', postId],
    queryFn: () => getBestCommentLikeByPostId(postId)
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!data?.commentId) {
    return (
      <S.NoComment onClick={() => navigate(`/detail/${postId}`, { state: { backgroundLocation: location } })}>
        베스트 댓글이 없습니다!
      </S.NoComment>
    );
  }

  const { commentId } = data as unknown as BestComment;

  return (
    <S.Container>
      <S.ButtonContainer>
        <IconBestComment />
      </S.ButtonContainer>
      <S.CommentContainer>
        <S.UserBox>
          <S.BestBedge>BEST</S.BestBedge>
          <S.Nickname>{commentId.userId.nickname}</S.Nickname>
        </S.UserBox>
        <S.Comment>{commentId.comment}</S.Comment>
      </S.CommentContainer>
    </S.Container>
  );
};

export default BestComment;

const S = {
  Container: styled.div`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    margin-left: 50px;
    /* margin-right: 30px; */
    width: 550px;
    /* border-right: 1px solid #d9d9d9; */

    /* height: 100%; */
    /* width: 100%; */
    position: relative;
    cursor: pointer;
  `,
  ButtonContainer: styled.div``,
  CommentContainer: styled.div`
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* position: absolute; */
    /* top: 0; */
    /* left: 30px; */
  `,
  UserBox: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  BestBedge: styled.div`
    width: 46px;
    height: 20px;
    border-radius: 100px;
    background: var(--primary-500, #f02826);

    color: var(--white, #fff);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */

    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Nickname: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
  `,
  Comment: styled.div`
    width: 490px;

    overflow: hidden;
    color: var(--font-black, var(--Black, #242424));
    text-overflow: ellipsis;
    white-space: nowrap;
    ${styleFont.bodyMedium}
  `,

  NoComment: styled.div`
    margin-left: 50px;
    ${styleFont.bodyMedium}
  `
};

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getPostBookmark } from 'src/api/postBookmark';
import { getPostLike } from 'src/api/postLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
import usePostLikes from 'src/hooks/usePostLikes';
import { BottomFunctionProps, PostLike } from 'src/types/types';
import { ReactComponent as Like } from 'src/components/post/svg/Like.svg';
import { ReactComponent as Bookmark } from 'src/components/post/svg/Bookmark.svg';
import { ReactComponent as Quotation } from 'src/components/post/svg/Quotation.svg';
import { ReactComponent as Link } from 'src/components/post/svg/Link.svg';
import { ReactComponent as UnLike } from 'src/components/post/svg/UnLike.svg';
import { ReactComponent as UnBookmark } from 'src/components/post/svg/UnBookmark.svg';
import { ReactComponent as UnQuotation } from 'src/components/post/svg/UnQuotation.svg';
import { ReactComponent as UnLink } from 'src/components/post/svg/UnLink.svg';
import styled from 'styled-components';

const BottomFunction = ({ userId, post }: BottomFunctionProps) => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();

  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostBookmark(id!) });
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkData?.data?.find((bookmark) => bookmark.userId === userId);

  // 좋아요
  const clickPostLike = (postLike: PostLike) => {
    if (!postLike) {
      const newPostLike = {
        postId: post.id,
        userId
      };
      addPostLikeMutate.mutate(newPostLike);
    } else {
      deletePostLikeMutate.mutate(postLike.id);
    }
  };

  // 인용
  const clickQuotation = () => {
    navigate('/write', { state: post });
  };

  // bookmark
  const clickPostBookmark = () => {
    if (!postBookmark) {
      const newPostBookmark = {
        postId: post.id,
        userId
      };
      addPostBookmarkMutate.mutate(newPostBookmark);
    } else {
      deletePostBookmarkMutate.mutate(postBookmark.id);
    }
  };

  // clip board
  const clickCopyLink = async (pathname: string) => {
    try {
      await navigator.clipboard.writeText(`${pathname}`);
      alert('링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.FunctionBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={() => clickPostLike(postLike)}>{postLike ? <Like /> : <UnLike />}</S.FunctionButton>
        <S.FunctionCount>2,936</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickQuotation}>
          <UnQuotation />
        </S.FunctionButton>
        <S.FunctionCount>516</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickPostBookmark}>{postBookmark ? <Bookmark /> : <UnBookmark />}</S.FunctionButton>
        <S.FunctionCount>1,034</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButton onClick={() => clickCopyLink(pathname)}>
        <UnLink />
      </S.FunctionButton>
    </S.FunctionBox>
  );
};

export default BottomFunction;

export const S = {
  FunctionBox: styled.div`
    margin: 36px 0px 140px 0px;
    gap: 50px;
    display: inline-flex;
  `,

  FunctionButtonBox: styled.div`
    gap: 6px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  FunctionButton: styled.button`
    background-color: transparent;
    height: 24px;
  `,

  FunctionCount: styled.div`
    color: var(--neutral-500, #667085);
    text-align: center;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px; /* 175% */
  `
};

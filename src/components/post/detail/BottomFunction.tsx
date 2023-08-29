import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getPostBookmark } from 'src/api/postBookmark';
import { getPostLike } from 'src/api/postLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
import usePostLikes from 'src/hooks/usePostLikes';
import { BottomFunctionProps, PostLike } from 'src/types/types';

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
    <div>
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      <button onClick={clickQuotation}>인용</button>
      <button onClick={clickPostBookmark}>{postBookmark ? '북마크 취소' : '북마크'}</button>
      <button onClick={() => clickCopyLink(pathname)}>공유</button>
    </div>
  );
};

export default BottomFunction;

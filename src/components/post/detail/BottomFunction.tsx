import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getPostLike } from 'src/api/postLikes';
import { getPostBookmark } from 'src/api/postBookmark';
import { getQuotationPosts } from 'src/api/posts';
import usePostLikes from 'src/hooks/usePostLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
import { BottomFunctionProps } from 'src/types/types';
import { S } from 'src/components/post/style/StyledBottomFunction';
import {
  IconBookmark,
  IconLike,
  IconQuotation,
  IconUnBookmark,
  IconUnLike,
  IconUnLink,
  IconUnQuotation
} from 'src/components/icons';

const BottomFunction = ({ userId, post }: BottomFunctionProps) => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();

  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();

  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostBookmark(id!) });
  const { data: postQuotationData } = useQuery({ queryKey: ['post_quotation'], queryFn: () => getQuotationPosts(id!) });

  const postLikeList = postLikeData?.data;
  const postBookmarkList = postBookmarkData?.data;
  const postQuotationList = postQuotationData?.data;

  const postLike = postLikeList?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkList?.find((bookmark) => bookmark.userId === userId);
  const postQuotation = postQuotationList?.find((Quotation) => Quotation.userId === userId);

  // 좋아요
  const clickPostLike = () => {
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

  // 인용
  const clickQuotation = () => {
    navigate('/write', { state: post });
  };

  // clip board
  const clickCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://nbc-final-pyeonsik-897l29vm7-kimyoonsu97.vercel.app/${pathname}`);
      alert('주소가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.FunctionBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickPostLike}>{postLike ? <IconLike /> : <IconUnLike />}</S.FunctionButton>
        <S.FunctionCount>{postLikeList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickQuotation}>
          {postQuotation ? <IconQuotation /> : <IconUnQuotation />}
        </S.FunctionButton>
        <S.FunctionCount>{postQuotationList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickPostBookmark}>
          {postBookmark ? <IconBookmark /> : <IconUnBookmark />}
        </S.FunctionButton>
        <S.FunctionCount>{postBookmarkList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButton onClick={clickCopyLink}>
        <IconUnLink />
      </S.FunctionButton>
    </S.FunctionBox>
  );
};

export default BottomFunction;

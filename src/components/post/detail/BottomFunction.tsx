import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getPostLike } from 'src/api/postLikes';
import { getPostBookmark } from 'src/api/postBookmark';
import { getQuotationPosts } from 'src/api/posts';
import { getCommentCountDataByPostId } from 'src/api/comment';
import usePostLikes from 'src/hooks/usePostLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
import { BottomFunctionProps } from 'src/types/types';
import { NON_MEMBER } from '../../../function/alertMessage';
import { S } from 'src/components/post/detail/StyledBottomFunction';
import {
  IconBookmark,
  IconComment,
  IconLike,
  IconQuotation,
  IconUnBookmark,
  IconUnLike,
  IconUnLink,
  IconUnQuotation
} from 'src/components/icons';

const BottomFunction = ({ userId, post }: BottomFunctionProps) => {
  const navigate = useNavigate();

  // id로 main과 detail 구분 (main => 댓글 수, detail => link 복사)
  const { id } = useParams<string>();
  const { pathname } = useLocation();

  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes(post.id);
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark(post.id);

  // query key id 값 추가 (props의 post.id)
  const { data: commentCountData } = useQuery({
    queryKey: ['commentCount', post.id],
    queryFn: () => getCommentCountDataByPostId(post.id!),
    enabled: !id ? true : false
  });
  const { data: postLikeData } = useQuery({ queryKey: ['post_like', post.id], queryFn: () => getPostLike(post.id!) });
  const { data: postBookmarkData } = useQuery({
    queryKey: ['post_bookmark', post.id],
    queryFn: () => getPostBookmark(post.id!)
  });
  const { data: postQuotationData } = useQuery({
    queryKey: ['post_quotation', post.id],
    queryFn: () => getQuotationPosts(post.id!)
  });

  const postLikeList = postLikeData?.data;
  const postBookmarkList = postBookmarkData?.data;
  const postQuotationList = postQuotationData?.data;

  const postLike = postLikeList?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkList?.find((bookmark) => bookmark.userId === userId);
  const postQuotation = postQuotationList?.find((Quotation) => Quotation.userId === userId);

  // 좋아요
  const clickPostLike = () => {
    if (!userId) {
      alert(NON_MEMBER);
    } else if (!postLike) {
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
    if (!userId) {
      alert(NON_MEMBER);
    } else if (!postBookmark) {
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
    if (!userId) {
      alert(NON_MEMBER);
    } else {
      navigate('/write', { state: post });
    }
  };

  // clip board
  const clickCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://nbc-final-pyeonsik-897l29vm7-kimyoonsu97.vercel.app/${pathname}`);
      alert('주소가 복사되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!id && (
        <S.FunctionButtonBox $location={pathname}>
          <S.FunctionButton>
            <IconComment />
          </S.FunctionButton>
          <S.FunctionCount $location={pathname}>{commentCountData}</S.FunctionCount>
        </S.FunctionButtonBox>
      )}
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={clickPostLike}>{postLike ? <IconLike /> : <IconUnLike />}</S.FunctionButton>
        <S.FunctionCount $location={pathname}>{postLikeList?.length === 0 ? 0 : postLikeList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={clickQuotation}>
          {postQuotation ? <IconQuotation /> : <IconUnQuotation />}
        </S.FunctionButton>
        <S.FunctionCount $location={pathname}>
          {postQuotationList?.length === 0 ? 0 : postQuotationList?.length}
        </S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={clickPostBookmark}>
          {postBookmark ? <IconBookmark /> : <IconUnBookmark />}
        </S.FunctionButton>
        <S.FunctionCount $location={pathname}>
          {postBookmarkList?.length === 0 ? 0 : postBookmarkList?.length}
        </S.FunctionCount>
      </S.FunctionButtonBox>
      {id && (
        <S.FunctionButton onClick={clickCopyLink}>
          <IconUnLink />
        </S.FunctionButton>
      )}
    </>
  );
};

export default BottomFunction;

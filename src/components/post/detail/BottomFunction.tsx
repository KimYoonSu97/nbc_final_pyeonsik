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
import { EMAIL_CHECK } from '../../../utility/guide';
import BottomShare from './BottomShare';
import { S } from 'src/components/post/detail/StyledBottomFunction';
import { updateBookmarkBadge } from 'src/api/badge';
import {
  IconBookmark,
  IconComment,
  IconLike,
  IconQuotation,
  IconUnBookmark,
  IconUnLike,
  IconUnQuotation
} from 'src/components/icons';
import { toast } from 'react-toastify';

const BottomFunction = ({ userId, post }: BottomFunctionProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<string>();
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes(post.id);
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark(post.id);

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

  const clickFunction = (type: string) => {
    if (!userId) {
      toast(EMAIL_CHECK);
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    } else {
      const payload = {
        postId: post.id,
        userId
      };
      switch (type) {
        case 'like':
          postLike ? deletePostLikeMutate.mutate(postLike.id) : addPostLikeMutate.mutate(payload);
          break;
        case 'bookmark':
          postBookmark ? deletePostBookmarkMutate.mutate(postBookmark.id) : addPostBookmarkMutate.mutate(payload);

          updateBookmarkBadge(userId);
          break;
        case 'quotation':
          navigate('/write', { state: post });
          break;
      }
    }
  };

  return (
    <>
      {!id && (
        <S.FunctionButtonBox $location={pathname}>
          <S.FunctionButton className="comments" aria-label='댓글 갯수'>
            <IconComment />
          </S.FunctionButton>
          <S.FunctionCount $location={pathname}>{commentCountData}</S.FunctionCount>
        </S.FunctionButtonBox>
      )}
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={() => clickFunction('like')} aria-label='좋아요 버튼'>
          {postLike ? <IconLike /> : <IconUnLike />}
        </S.FunctionButton>
        <S.FunctionCount $location={pathname}>{postLikeList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={() => clickFunction('quotation')} aria-label='게시물 인용 버튼'>
          {postQuotation ? <IconQuotation /> : <IconUnQuotation />}
        </S.FunctionButton>
        <S.FunctionCount $location={pathname}>{postQuotationList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox $location={pathname}>
        <S.FunctionButton onClick={() => clickFunction('bookmark')} aria-label='북마크 버튼'>
          {postBookmark ? <IconBookmark /> : <IconUnBookmark />}
        </S.FunctionButton>
        <S.FunctionCount $location={pathname}>{postBookmarkList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      {id && (
        <BottomShare
          title={post.title}
          likeCount={postLikeList?.length}
          commentCount={commentCountData}
          sharedCount={postQuotationList?.length}
        />
      )}
    </>
  );
};

export default BottomFunction;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getPostBookmark } from 'src/api/postBookmark';
import { getPostLike } from 'src/api/postLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
import usePostLikes from 'src/hooks/usePostLikes';
import { BottomFunctionProps } from 'src/types/types';
import { ReactComponent as Like } from 'src/components/post/svg/Like.svg';
import { ReactComponent as Bookmark } from 'src/components/post/svg/Bookmark.svg';
import { ReactComponent as Quotation } from 'src/components/post/svg/Quotation.svg';
import { ReactComponent as Link } from 'src/components/post/svg/Link.svg';
import { ReactComponent as UnLike } from 'src/components/post/svg/UnLike.svg';
import { ReactComponent as UnBookmark } from 'src/components/post/svg/UnBookmark.svg';
import { ReactComponent as UnQuotation } from 'src/components/post/svg/UnQuotation.svg';
import { ReactComponent as UnLink } from 'src/components/post/svg/UnLink.svg';
import { S } from './StyledBottomFunction';
import { getQuotationPosts } from 'src/api/posts';

const BottomFunction = ({ userId, post, QuotationNum }: BottomFunctionProps) => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();

  const { data: postQuotationData } = useQuery({ queryKey: ['post_quotation'], queryFn: () => getQuotationPosts(id!) });
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostBookmark(id!) });
  const postLikeList = postLikeData?.data;
  const postLike = postLikeList?.find((like) => like.userId === userId);
  const postBookmarkList = postBookmarkData?.data;
  const postBookmark = postBookmarkList?.find((bookmark) => bookmark.userId === userId);
  console.log('인용', postQuotationData);

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
  const clickCopyLink = async () => {
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
        <S.FunctionButton onClick={clickPostLike}>{postLike ? <Like /> : <UnLike />}</S.FunctionButton>
        <S.FunctionCount>{postLikeList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickQuotation}>
          <UnQuotation />
        </S.FunctionButton>
        <S.FunctionCount>{QuotationNum}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButtonBox>
        <S.FunctionButton onClick={clickPostBookmark}>{postBookmark ? <Bookmark /> : <UnBookmark />}</S.FunctionButton>
        <S.FunctionCount>{postBookmarkList?.length}</S.FunctionCount>
      </S.FunctionButtonBox>
      <S.FunctionButton onClick={clickCopyLink}>
        <UnLink />
      </S.FunctionButton>
    </S.FunctionBox>
  );
};

export default BottomFunction;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PostBookmark, PostLike } from 'src/types/types';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
import usePostLikes from 'src/hooks/usePostLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
// api
import { getPost } from 'src/api/posts';
import { getPostLike } from 'src/api/postLikes';
import { styled } from 'styled-components';
import { getPostBookmark } from 'src/api/postBookmark';

const PostDetailCommon = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // 게시글 삭제, 좋아요, 좋아요 취소, 저장, 저장 취소
  const { deletePostMutate } = useMutate();
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const post = data?.data?.[0];
  // useQuery 취약점
  // console.log('인용한 게시글', post?.orgPostId.id);
  // const { isLoading: orgPostLoading, data: orgPostData } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => getPost('b3b81565-a1c0-42dd-b7c2-dfd3fac605b5')
  // });
  // console.log('현재 정보 가져옴', orgPostData?.data?.[0].id);
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostBookmark(id!) });
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkData?.data?.find((bookmark) => bookmark.userId === userId);
  const postUser = post?.userId;
  const orgPost = post?.orgPostId;
  const orgUserNickname = post?.orgUserId?.nickname;

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

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
    navigate('/write');
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

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    alert('잘못된 접근입니다.');
    return <Navigate to="/" />;
  }
  if (data?.data.length === 0) {
    console.log('3');
    alert('존재하지 않는 게시물입니다.');
    return <Navigate to="/" />;
  }

  console.log('2', postBookmark);

  return (
    <div>
      <img src={postUser.profileImg} />
      <div>작성자 등급</div>
      <div>{postUser.nickname}</div>
      <div>{post.created_at}</div>
      <div>{post.title}</div>
      {/* component 분리 필요 */}

      <div>
        <pre dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>

      <div>
        {userId === postUser.id && (
          <>
            <button onClick={() => clickDelete(post.id)}>delete</button>
            <button onClick={clickEdit}>edit</button>
          </>
        )}
      </div>
      {/* component 분리 필요 */}
      {/* <div>{orgPost.title}</div>
      <pre dangerouslySetInnerHTML={{ __html: orgPost.body }} />
      <div>{orgPost.userId}</div>
      <div>{orgPost.created_at}</div> */}
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      <button onClick={clickQuotation}>인용</button>
      <button onClick={clickPostBookmark}>{postBookmark ? '북마크 취소' : '북마크'}</button>
      <button onClick={() => clickCopyLink(pathname)}>공유</button>
      {orgPost && (
        <div>
          인용 게시글
          <div>{orgPost.title}</div>
          <pre dangerouslySetInnerHTML={{ __html: orgPost.body }} />
          <div>{orgUserNickname}</div>
          <div>{orgPost.created_at}</div>
        </div>
      )}
    </div>
  );
};

export default PostDetailCommon;

const S = {
  test: styled.pre``
};

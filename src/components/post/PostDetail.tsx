import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { PostLike } from 'src/types/types';
import { getPost } from 'src/api/posts';
import { getPostLike } from 'src/api/postLikes';
import useMutate from 'src/hooks/useMutate';
import usePostLikes from 'src/hooks/usePostLikes';

const PostDetail = () => {
  // user id 윤수님
  const userId = 'f3ca6e65-7572-4f63-z6wx-2555872d6a70';

  const { id } = useParams<string>();
  const navigate = useNavigate();

  // 게시글 삭제, 좋아요, 좋아요 취소
  const { deleteMutate } = useMutate('posts');
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes('post_likes');

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const post = data?.data?.[0];
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);

  // delete post
  const clickDelete = (id: string) => {
    deleteMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  // 좋아요 기능
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

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={clickEdit}>edit</button>
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      {/* <PostLikeButton id={id!} /> */}
    </div>
  );
};

export default PostDetail;

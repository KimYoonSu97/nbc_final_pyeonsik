import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { PostBookmark, PostLike } from 'src/types/types';
import { getPost } from 'src/api/posts';
import { getPostLike } from 'src/api/postLikes';
import useMutate from 'src/hooks/usePost';
import usePostLikes from 'src/hooks/usePostLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';

const PostDetail = () => {
  // user id 윤수님
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';

  const { id } = useParams<string>();
  const navigate = useNavigate();

  // 게시글 삭제, 좋아요, 좋아요 취소
  const { deletePostMutate } = useMutate();
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostLike(id!) });
  const post = data?.data?.[0];
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkData?.data?.find((bookmark) => bookmark.userId === userId);

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
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

  const clickPostBookmark = (postBookmark: PostBookmark) => {
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
      {/* component 분리 예정 */}
      {post.postCategory === 'common' ? (
        <pre dangerouslySetInnerHTML={{ __html: post.body }} />
      ) : (
        <div>{post.body}</div>
      )}
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={clickEdit}>edit</button>
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      <button onClick={() => clickPostBookmark(postBookmark)}>{postBookmark ? '북마크 취소' : '북마크'}</button>
      <button>인용하기</button>
    </div>
  );
};

export default PostDetail;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from 'src/types/types';
import { getPost } from '../../api/posts';
import useMutate from 'src/hooks/usePost';

const PostDetail = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { deleteMutate } = useMutate('posts');

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  const post = data?.data[0] as Post;

  // delete
  const clickDelete = (id: string) => {
    deleteMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={() => clickEdit()}>edit</button>
      <button>like</button>
    </div>
  );
};

export default PostDetail;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from 'src/api/posts';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';

const PostList = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({ queryKey: ['Post'], queryFn: () => getPosts() });
  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  const posts = data?.data as Post[];

  return (
    <div>
      {posts.map((post) => (
        <S.PostBox key={post.id} onClick={() => navigate(`/detail/${post.id}`)}>
          <div>{post.id}</div>
          <div>{post.title}</div>
          <div>{post.body}</div>
        </S.PostBox>
      ))}
    </div>
  );
};

export default PostList;

export const S = {
  PostBox: styled.div`
    border: 1px solid black;
  `
};
